import React, { useState, useEffect } from "react";
import AppLayout from "../components/AppLayout";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const BacklogPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cmdPaletteOpen, setCmdPaletteOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await axios.get("/api/tasks", { params: { limit: 100 } });
        setTasks(data.data || []);
      } catch (error) {
        toast.error("Failed to load backlog");
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchTasks();
  }, [user]);

  // CMD+K handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCmdPaletteOpen(true);
      }
      if (e.key === 'Escape') {
        setCmdPaletteOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const activeCount = tasks.filter(t => t.status !== "completed").length;
  const urgentCount = tasks.filter(t => t.priority === "urgent" || t.priority === "high").length;

  const getStatusChip = (status) => {
    switch (status) {
      case "completed": return { label: "COMPLETE", class: "status-chip-complete", dotClass: "bg-on-tertiary-container" };
      case "in-progress": return { label: "ACTIVE", class: "status-chip-active", dotClass: "bg-on-tertiary-container animate-pulse" };
      default: return { label: "PENDING", class: "status-chip-pending", dotClass: "bg-outline" };
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case "urgent": return { label: "URGENT", class: "text-error" };
      case "high": return { label: "CRITICAL", class: "text-primary border-b-2 border-primary" };
      case "medium": return { label: "MEDIUM", class: "text-secondary" };
      default: return { label: "ROUTINE", class: "text-secondary" };
    }
  };

  return (
    <AppLayout>
      <section className="flex-grow overflow-hidden flex flex-col p-lg max-w-[1440px] mx-auto w-full gap-lg">
        {/* Backlog Header */}
        <div className="flex items-end justify-between border-b-2 border-primary pb-sm">
          <div className="flex flex-col">
            <span className="font-label-caps text-label-caps text-on-primary-container mb-xs">CORE DATABASE / V.24</span>
            <h2 className="font-display-lg text-headline-lg font-extrabold uppercase tracking-tighter">SYSTEM BACKLOG</h2>
          </div>
          <div className="flex items-center gap-md font-label-caps text-label-caps text-secondary mb-xs">
            <div className="flex items-center gap-sm">
              <span className="w-sm h-sm rounded-full bg-primary"></span>
              <span>{activeCount} ACTIVE ENTITIES</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter h-32 shrink-0">
          <div className="bg-surface-container-lowest border border-outline-variant p-lg flex flex-col justify-center">
            <span className="font-label-caps text-label-caps text-secondary">LOAD_FACTOR</span>
            <span className="font-headline-lg text-headline-lg font-bold">
              {loading ? "—" : `${tasks.length > 0 ? Math.round((activeCount / tasks.length) * 100) : 0}%`}
            </span>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant p-lg flex flex-col justify-center">
            <span className="font-label-caps text-label-caps text-secondary">QUEUE_LATENCY</span>
            <span className="font-headline-lg text-headline-lg font-bold">12ms</span>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant p-lg flex flex-col justify-center">
            <span className="font-label-caps text-label-caps text-secondary">PRIORITY_ALERTS</span>
            <span className="font-headline-lg text-headline-lg font-bold text-error">
              {loading ? "—" : String(urgentCount).padStart(2, '0')}
            </span>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant p-lg flex flex-col justify-center">
            <span className="font-label-caps text-label-caps text-secondary">UPTIME_METRIC</span>
            <span className="font-headline-lg text-headline-lg font-bold">99.9%</span>
          </div>
        </div>

        {/* Main Table */}
        <div className="flex-grow bg-surface-container-lowest border border-outline-variant overflow-hidden flex flex-col">
          {/* Table Head */}
          <div className="hidden md:grid grid-cols-[100px_1fr_140px_120px_100px] gap-gutter px-lg py-md bg-surface-container-low border-b border-outline-variant font-label-caps text-label-caps text-on-surface-variant sticky top-0 z-10">
            <div>UID</div>
            <div>PROJECT NAME / DESCRIPTION</div>
            <div>STATUS</div>
            <div>PRIORITY</div>
            <div className="text-right">ACTIONS</div>
          </div>

          {/* Table Body */}
          <div className="flex-grow overflow-y-auto custom-scrollbar">
            {loading ? (
              <div className="p-lg text-center font-label-caps text-label-caps text-on-surface-variant">LOADING DATA...</div>
            ) : tasks.length === 0 ? (
              <div className="p-lg text-center font-label-caps text-label-caps text-on-surface-variant">NO ENTITIES FOUND</div>
            ) : (
              tasks.map((task, i) => {
                const status = getStatusChip(task.status);
                const priority = getPriorityLabel(task.priority);
                return (
                  <div key={task._id} className="grid grid-cols-1 md:grid-cols-[100px_1fr_140px_120px_100px] gap-gutter px-lg py-md border-b border-surface-container hover:bg-surface-container-low transition-colors items-center group">
                    <div className="font-label-sm text-label-sm text-secondary">
                      #MN-{String(9000 - i).padStart(4, '0')}
                    </div>
                    <div className="flex flex-col gap-xs">
                      <span className="font-bold text-primary font-body-md">{task.title}</span>
                      <span className="text-label-sm text-on-surface-variant truncate">{task.description || "No description"}</span>
                    </div>
                    <div>
                      <span className={`status-chip ${status.class}`}>
                        <span className={`w-sm h-sm rounded-full ${status.dotClass}`}></span>
                        {status.label}
                      </span>
                    </div>
                    <div>
                      <span className={`font-label-caps text-label-caps ${priority.class}`}>{priority.label}</span>
                    </div>
                    <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="material-symbols-outlined text-secondary hover:text-primary">more_horiz</button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Table Footer */}
          <div className="flex justify-between items-center px-lg py-sm bg-surface border-t border-outline-variant font-label-caps text-[10px] text-secondary">
            <div className="flex gap-lg">
              <span>PAGE: 01</span>
              <span>ENTRIES: {tasks.length}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Command Palette */}
      {cmdPaletteOpen && (
        <div
          className="fixed inset-0 bg-primary/20 backdrop-blur-sm z-50 flex items-start justify-center pt-[153px]"
          onClick={(e) => e.target === e.currentTarget && setCmdPaletteOpen(false)}
        >
          <div className="bg-surface w-full max-w-xl border border-primary overflow-hidden">
            <div className="flex items-center gap-md px-lg py-md border-b border-outline-variant">
              <span className="material-symbols-outlined text-primary">terminal</span>
              <input
                className="flex-grow bg-transparent border-none outline-none focus:ring-0 font-label-caps text-headline-lg-mobile placeholder:text-outline-variant"
                placeholder="EXECUTE COMMAND..."
                autoFocus
              />
              <span className="font-label-caps text-[10px] text-secondary">ESC TO CANCEL</span>
            </div>
            <div className="p-md bg-surface-container-low">
              <div className="flex flex-col gap-xs">
                <div className="flex justify-between items-center px-md py-sm hover:bg-primary hover:text-on-primary transition-colors cursor-pointer group">
                  <span className="font-label-caps text-label-sm">/FILTER: PRIORITY_URGENT</span>
                  <span className="text-[10px] text-secondary group-hover:text-on-primary">CMD + 1</span>
                </div>
                <div className="flex justify-between items-center px-md py-sm hover:bg-primary hover:text-on-primary transition-colors cursor-pointer group">
                  <span className="font-label-caps text-label-sm">/EXPORT: CSV_FORMAT</span>
                  <span className="text-[10px] text-secondary group-hover:text-on-primary">CMD + E</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
};

export default BacklogPage;
