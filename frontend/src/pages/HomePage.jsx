import React, { useState, useEffect } from "react";
import AppLayout from "../components/AppLayout";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useSocket } from "../context/SocketContext";
import { Link, useNavigate } from "react-router";

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { socket } = useSocket();
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/tasks", { params: { limit: 100 } });
      setTasks(data.data || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchTasks();
  }, [user]);

  useEffect(() => {
    if (!socket) return;
    socket.on("task:created", fetchTasks);
    socket.on("task:updated", fetchTasks);
    socket.on("task:deleted", fetchTasks);
    return () => {
      socket.off("task:created", fetchTasks);
      socket.off("task:updated", fetchTasks);
      socket.off("task:deleted", fetchTasks);
    };
  }, [socket]);

  // Compute metrics from tasks
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === "completed").length;
  const efficiency = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100 * 10) / 10 : 0;
  const activeTasks = tasks.filter(t => t.status !== "completed");
  const highPriorityCount = tasks.filter(t => t.priority === "high" || t.priority === "urgent").length;

  // Recent activity from tasks (sorted by updatedAt)
  const recentActivity = [...tasks]
    .sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt))
    .slice(0, 4);

  const formatTime = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const getProjectIcon = (index) => {
    const icons = ["precision_manufacturing", "conveyor_belt", "solar_power", "settings_input_component"];
    return icons[index % icons.length];
  };

  return (
    <AppLayout>
      <section className="flex-grow p-lg max-w-[1440px] mx-auto w-full">
        {/* Breadcrumbs & Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-md mb-xl">
          <div>
            <div className="flex items-center gap-xs font-label-sm text-label-sm text-on-surface-variant mb-unit">
              <span>SYSTEMS</span>
              <span className="material-symbols-outlined text-[12px]">chevron_right</span>
              <span className="text-primary font-bold">OPERATIONS_DASHBOARD</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-primary uppercase tracking-tight">Precision Metrics</h1>
          </div>
          <Link
            to="/today"
            className="px-lg py-md bg-primary text-on-primary rounded-full font-label-caps text-label-caps flex items-center gap-sm hover:opacity-90 transition-opacity"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            NEW TASK
          </Link>
        </header>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {/* Performance Metrics Strip */}
          <section className="md:col-span-12 bento-card p-lg rounded-lg flex flex-col md:flex-row justify-between items-center gap-lg">
            <div className="flex-1 w-full">
              <p className="font-label-caps text-label-caps text-on-surface-variant mb-sm">SYSTEM EFFICIENCY</p>
              <div className="flex items-baseline gap-sm">
                <span className="font-label-caps text-[48px] font-bold text-primary">
                  {loading ? "—" : efficiency}
                  <span className="text-headline-lg text-on-surface-variant">%</span>
                </span>
                {!loading && (
                  <span className="text-on-tertiary-container flex items-center font-label-sm text-label-sm">
                    <span className="material-symbols-outlined text-[14px]">arrow_upward</span> 2.1%
                  </span>
                )}
              </div>
            </div>
            <div className="flex-1 w-full md:border-l md:border-outline-variant md:pl-lg">
              <p className="font-label-caps text-label-caps text-on-surface-variant mb-sm">ACTIVE NODES</p>
              <span className="font-label-caps text-[48px] font-bold text-primary">
                {loading ? "—" : totalTasks}
              </span>
            </div>
            <div className="flex-1 w-full md:border-l md:border-outline-variant md:pl-lg">
              <p className="font-label-caps text-label-caps text-on-surface-variant mb-sm">HIGH PRIORITY</p>
              <span className="font-label-caps text-[48px] font-bold text-primary">
                {loading ? "—" : highPriorityCount}
              </span>
            </div>
            <div className="w-full md:w-64 h-24 relative overflow-hidden rounded-md bg-surface-container-low">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="font-label-caps text-label-caps text-on-surface-variant">REAL-TIME TELEMETRY</span>
              </div>
            </div>
          </section>

          {/* Active Projects */}
          <section className="md:col-span-8 bento-card rounded-lg overflow-hidden flex flex-col">
            <div className="p-lg border-b border-outline-variant flex justify-between items-center">
              <h2 className="font-label-caps text-label-caps text-primary">ACTIVE PROJECTS</h2>
              <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary transition-colors">filter_list</span>
            </div>
            <div className="divide-y divide-surface-container">
              {loading ? (
                <div className="p-lg text-center">
                  <span className="font-label-caps text-label-caps text-on-surface-variant">LOADING...</span>
                </div>
              ) : activeTasks.length === 0 ? (
                <div className="p-lg text-center">
                  <span className="font-label-caps text-label-caps text-on-surface-variant">NO ACTIVE TASKS</span>
                </div>
              ) : (
                activeTasks.slice(0, 5).map((task, i) => (
                  <div
                    key={task._id}
                    className="p-lg flex items-center justify-between hover:bg-surface-container-low transition-colors duration-200 group cursor-pointer"
                    onClick={() => navigate(`/focus/${task._id}`)}
                  >
                    <div className="flex items-center gap-md">
                      <div className="w-12 h-12 bg-surface-container-highest flex items-center justify-center rounded">
                        <span className="material-symbols-outlined text-primary">{getProjectIcon(i)}</span>
                      </div>
                      <div>
                        <p className="font-label-sm text-label-sm font-bold text-primary uppercase">{task.title}</p>
                        <p className="font-label-sm text-label-sm text-on-surface-variant">
                          Priority: {task.priority || "Medium"} • {task.dueDate ? `Due ${new Date(task.dueDate).toLocaleDateString()}` : "No due date"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-lg">
                      <div className="hidden sm:block text-right">
                        <p className="font-label-caps text-[10px] text-on-surface-variant mb-unit">STATUS</p>
                        <span className={`status-chip text-[10px] ${
                          task.status === "in-progress" ? "status-chip-active" : "status-chip-pending"
                        }`}>
                          {(task.status || "pending").toUpperCase()}
                        </span>
                      </div>
                      <span className="material-symbols-outlined text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">more_vert</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Activity Log */}
          <section className="md:col-span-4 bento-card rounded-lg p-lg flex flex-col">
            <h2 className="font-label-caps text-label-caps text-primary mb-lg">ACTIVITY_LOG</h2>
            <div className="flex flex-col gap-lg relative">
              {/* Timeline Line */}
              <div className="absolute left-[11px] top-2 bottom-2 w-[1px] bg-outline-variant"></div>
              {recentActivity.length === 0 ? (
                <p className="font-label-sm text-label-sm text-on-surface-variant">No recent activity</p>
              ) : (
                recentActivity.map((task, i) => (
                  <div key={task._id} className="flex gap-md relative">
                    <div className={`w-6 h-6 rounded-full border-4 border-surface-container-lowest z-10 ${
                      i === 0 ? "bg-primary" : task.priority === "urgent" ? "bg-error" : "bg-surface-dim"
                    }`}></div>
                    <div>
                      <p className="font-label-sm text-label-sm font-bold text-primary uppercase">
                        {task.title?.substring(0, 30)}
                      </p>
                      <p className="font-label-sm text-label-sm text-on-surface-variant mb-sm">
                        {task.description?.substring(0, 50) || "Task updated"}
                      </p>
                      <span className="font-label-caps text-[9px] text-on-surface-variant px-sm py-unit bg-surface-container rounded uppercase">
                        {formatTime(task.updatedAt || task.createdAt)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Facility View */}
          <section className="md:col-span-12 bento-card h-64 rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-surface-container-high opacity-40"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent"></div>
            <div className="absolute bottom-lg left-lg">
              <h3 className="font-headline-lg text-headline-lg text-primary tracking-tighter">FACILITY_VIEW_BRAVO</h3>
              <p className="font-label-sm text-label-sm text-on-surface-variant">Live feed secure • Encrypted tunnel active</p>
            </div>
            <div className="absolute top-lg right-lg flex gap-sm">
              <span className="flex items-center gap-xs px-sm py-unit bg-primary text-on-primary font-label-caps text-[10px] rounded-full">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span> LIVE
              </span>
            </div>
          </section>
        </div>
      </section>
    </AppLayout>
  );
};

export default HomePage;
