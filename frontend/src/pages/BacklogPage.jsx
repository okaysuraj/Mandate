import React, { useState, useEffect } from "react";
import AppLayout from "../components/AppLayout";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

const BacklogPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

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

  const activeCount = tasks.filter(t => t.status !== "completed").length;
  const criticalCount = tasks.filter(t => t.status !== "completed" && (t.priority === "urgent" || t.priority === "high")).length;
  const stablePercentage = tasks.length > 0 ? Math.round(((tasks.length - criticalCount) / tasks.length) * 100) : 100;
  
  const filteredTasks = tasks.filter(t => t.title.toLowerCase().includes(search.toLowerCase()) || (t.description && t.description.toLowerCase().includes(search.toLowerCase())));

  const getStatusChip = (task) => {
    if (task.status === "completed") {
      return <span className="px-sm py-1 bg-surface-container-high text-on-surface-variant text-[10px] font-label-caps rounded-sm border border-outline-variant uppercase">COMPLETED</span>;
    }
    if (task.priority === "urgent" || task.priority === "high") {
      return <span className="px-sm py-1 bg-error-container text-on-error-container text-[10px] font-label-caps rounded-sm border border-error uppercase">CRITICAL</span>;
    }
    if (task.status === "in-progress") {
      return <span className="px-sm py-1 bg-tertiary-fixed text-on-tertiary-fixed-variant text-[10px] font-label-caps rounded-sm border border-on-tertiary-container uppercase">ACTIVE</span>;
    }
    return <span className="px-sm py-1 bg-surface-container-highest text-on-surface-variant text-[10px] font-label-caps rounded-sm border border-outline-variant uppercase">PENDING</span>;
  };

  return (
    <AppLayout>
      <main className="flex-1 p-lg max-w-container-max mx-auto overflow-hidden w-full flex flex-col h-full">
        <div className="mb-xl flex flex-col md:flex-row justify-between items-start md:items-end gap-md">
          <div>
            <h1 className="font-display-lg text-headline-lg text-primary mb-xs uppercase">List View</h1>
            <p className="text-on-surface-variant max-w-2xl">High-density operational overview. Manage system backlogs, critical path items, and scheduled maintenance tasks with industrial precision.</p>
          </div>
          <div className="flex gap-sm">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
              <input 
                type="text" 
                placeholder="QUERY_ID..." 
                className="bg-surface-container-low border-none focus:ring-2 focus:ring-primary text-label-sm pl-9 pr-4 py-2 w-48 rounded-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="px-md py-2 border border-outline-variant text-label-sm font-bold rounded-full hover:bg-surface-container-low transition-all flex items-center gap-sm">
              <span className="material-symbols-outlined text-[18px]">filter_list</span>
              Filter
            </button>
            <button className="px-md py-2 border border-outline-variant text-label-sm font-bold rounded-full hover:bg-surface-container-low transition-all flex items-center gap-sm">
              <span className="material-symbols-outlined text-[18px]">download</span>
              Export
            </button>
          </div>
        </div>

        {/* Dashboard Summary Bento */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-md mb-xl">
          <div className="bg-surface-container-lowest border border-surface-variant p-md">
            <p className="font-label-caps text-label-caps text-on-surface-variant mb-xs">ACTIVE_TASKS</p>
            <p className="font-headline-lg text-primary">{loading ? "—" : activeCount}</p>
          </div>
          <div className="bg-surface-container-lowest border border-surface-variant p-md border-l-4 border-l-error">
            <p className="font-label-caps text-label-caps text-error mb-xs">CRITICAL_PATH</p>
            <p className="font-headline-lg text-primary">{loading ? "—" : criticalCount}</p>
          </div>
          <div className="bg-surface-container-lowest border border-surface-variant p-md border-l-4 border-l-tertiary-fixed-dim">
            <p className="font-label-caps text-label-caps text-on-tertiary-container mb-xs">STABLE_STATE</p>
            <p className="font-headline-lg text-primary">{loading ? "—" : stablePercentage}%</p>
          </div>
          <div className="bg-surface-container-lowest border border-surface-variant p-md">
            <p className="font-label-caps text-label-caps text-on-surface-variant mb-xs">OPERATOR_LOAD</p>
            <p className="font-headline-lg text-primary">72<span className="text-body-md font-normal text-on-surface-variant">/hr</span></p>
          </div>
        </div>

        {/* Industrial List Container */}
        <div className="bg-surface-container-lowest border border-surface-variant overflow-x-auto flex-1 flex flex-col min-h-0">
          <table className="w-full text-left border-collapse relative">
            <thead className="sticky top-0 z-10">
              <tr className="border-b border-surface-variant bg-surface-container-low">
                <th className="px-md py-4 font-label-caps text-label-caps text-on-surface-variant">UID</th>
                <th className="px-md py-4 font-label-caps text-label-caps text-on-surface-variant">STATUS</th>
                <th className="px-md py-4 font-label-caps text-label-caps text-on-surface-variant">TASK_DESCRIPTION</th>
                <th className="px-md py-4 font-label-caps text-label-caps text-on-surface-variant">ASSIGNED_UNIT</th>
                <th className="px-md py-4 font-label-caps text-label-caps text-on-surface-variant">TIMESTAMP</th>
                <th className="px-md py-4 font-label-caps text-label-caps text-on-surface-variant text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container overflow-y-auto">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-md py-8 text-center font-label-caps text-label-caps text-on-surface-variant">LOADING DATA...</td>
                </tr>
              ) : filteredTasks.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-md py-8 text-center font-label-caps text-label-caps text-on-surface-variant">NO ENTITIES FOUND</td>
                </tr>
              ) : (
                filteredTasks.map((task, i) => (
                  <tr key={task._id} className="hover:bg-surface-container-low transition-colors group cursor-pointer" onClick={() => navigate(`/tasks/${task._id}`)}>
                    <td className="px-md py-4 font-label-sm text-on-surface-variant">#CX-{String(88900 + i).padStart(5, '0')}</td>
                    <td className="px-md py-4">
                      {getStatusChip(task)}
                    </td>
                    <td className="px-md py-4 font-bold text-primary max-w-xs truncate">{task.title}</td>
                    <td className="px-md py-4">
                      <div className="flex items-center gap-sm">
                        <div className="w-6 h-6 rounded bg-secondary-fixed flex items-center justify-center text-[10px] font-bold">OP</div>
                        <span className="text-label-sm">System_Op</span>
                      </div>
                    </td>
                    <td className="px-md py-4 font-label-sm text-on-surface-variant">
                      {new Date(task.createdAt || Date.now()).toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.')} {new Date(task.createdAt || Date.now()).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </td>
                    <td className="px-md py-4 text-right opacity-40 group-hover:opacity-100 transition-opacity">
                      <button className="p-1 hover:text-primary transition-colors" onClick={(e) => { e.stopPropagation(); }}><span className="material-symbols-outlined text-[20px]">edit</span></button>
                      <button className="p-1 hover:text-primary transition-colors" onClick={(e) => { e.stopPropagation(); navigate(`/tasks/${task._id}`); }}><span className="material-symbols-outlined text-[20px]">visibility</span></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination Industrial */}
        <div className="mt-md flex justify-between items-center bg-surface-container-low px-md py-3 border border-surface-variant border-t-0">
          <p className="text-label-sm text-on-surface-variant uppercase">PAGE_SEQUENCE: 1 OF 1</p>
          <div className="flex gap-xs">
            <button className="w-8 h-8 flex items-center justify-center border border-outline-variant hover:bg-white transition-all"><span className="material-symbols-outlined text-[18px]">chevron_left</span></button>
            <button className="w-8 h-8 flex items-center justify-center border border-primary bg-primary text-on-primary font-bold text-label-sm">1</button>
            <button className="w-8 h-8 flex items-center justify-center border border-outline-variant hover:bg-white transition-all text-label-sm opacity-50" disabled>2</button>
            <button className="w-8 h-8 flex items-center justify-center border border-outline-variant hover:bg-white transition-all"><span className="material-symbols-outlined text-[18px]">chevron_right</span></button>
          </div>
          <div className="flex items-center gap-sm">
            <span className="text-label-sm text-on-surface-variant">ENTRIES_PER_VIEW:</span>
            <select className="bg-transparent border-none focus:ring-0 text-label-sm font-bold p-0 pr-4">
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>
          </div>
        </div>

        {/* Atmospheric Shader Area (Minimalist subtle texture) */}
        <div className="mt-xl h-24 shrink-0 relative rounded overflow-hidden border border-surface-variant opacity-20 pointer-events-none mb-xl">
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="font-label-caps text-label-caps text-primary tracking-[1em]">SYSTEM_COHESION_MONITOR</p>
          </div>
        </div>
      </main>
    </AppLayout>
  );
};

export default BacklogPage;
