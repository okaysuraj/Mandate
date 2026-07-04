import React, { useState, useEffect } from "react";
import AppLayout from "../components/AppLayout";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

const TodayPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await axios.get("/api/tasks", { params: { limit: 50 } });
        setTasks(data.data || []);
      } catch (error) {
        toast.error("Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchTasks();
  }, [user]);

  const today = new Date();
  const dayStr = today.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

  const completedCount = tasks.filter(t => t.status === "completed").length;
  const totalCount = tasks.length;
  const loadPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const focusTask = tasks.find(t => t.status !== "completed" && (t.priority === "high" || t.priority === "urgent"))
    || tasks.find(t => t.status !== "completed");

  const scheduledTasks = tasks
    .filter(t => t.status !== "completed")
    .sort((a, b) => new Date(a.dueDate || 0) - new Date(b.dueDate || 0));

  return (
    <AppLayout>
      <div className="flex-1 max-w-[1440px] mx-auto px-lg md:px-xl py-xl overflow-y-auto">
        {/* Header */}
        <header className="mb-xl flex justify-between items-end">
          <div>
            <p className="font-label-caps text-label-caps text-secondary tracking-[0.2em] mb-sm uppercase">{dayStr}</p>
            <h1 className="font-display-lg text-display-lg text-primary uppercase">TODAY</h1>
          </div>
        </header>

        {/* Bento Grid */}
        <div className="bento-grid">
          {/* Focus Task Hero */}
          <section className="col-span-12 lg:col-span-8 bg-surface-container-lowest border border-outline-variant p-lg flex flex-col justify-between relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center gap-sm mb-lg">
                <span className="w-xs h-xs bg-error rounded-full"></span>
                <span className="font-label-caps text-label-caps text-primary tracking-widest">ACTIVE FOCUS</span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-primary max-w-2xl mb-md">
                {focusTask ? focusTask.title : "No active task — create one to begin"}
              </h2>
              <p className="font-body-md text-body-md text-secondary max-w-xl">
                {focusTask?.description || "Prioritize your most important work and enter focus mode."}
              </p>
            </div>
            <div className="mt-xl flex items-center gap-lg relative z-10">
              {focusTask && (
                <button
                  onClick={() => navigate(`/focus/${focusTask._id}`)}
                  className="bg-primary text-on-primary px-xl py-md rounded-full font-label-caps text-label-caps hover:scale-[1.02] transition-transform flex items-center gap-md"
                >
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                  START SESSION
                </button>
              )}
              <div className="flex items-center gap-sm">
                <span className="font-label-sm text-label-sm text-secondary">EST. DURATION:</span>
                <span className="font-label-sm text-label-sm font-bold text-primary">
                  {focusTask?.estimatedDuration || "25:00"}
                </span>
              </div>
            </div>
            {/* Decorative circle */}
            <div className="absolute top-[-20px] right-[-20px] w-64 h-64 border-[1px] border-outline-variant/30 rounded-full pointer-events-none"></div>
          </section>

          {/* Quick Metrics */}
          <section className="col-span-12 lg:col-span-4 bg-surface-container border border-outline-variant p-lg flex flex-col justify-between">
            <div>
              <h3 className="font-label-caps text-label-caps text-secondary mb-lg">LOAD CAPACITY</h3>
              <div className="flex items-end gap-xs mb-sm">
                <span className="text-[48px] font-bold leading-none">{loading ? "—" : loadPercent}</span>
                <span className="text-[20px] font-bold text-secondary mb-sm">%</span>
              </div>
              <div className="w-full bg-outline-variant h-[2px]">
                <div className="bg-primary h-full transition-all duration-1000" style={{ width: `${loadPercent}%` }}></div>
              </div>
            </div>
            <div className="mt-lg">
              <p className="font-label-sm text-label-sm text-secondary">{completedCount} of {totalCount} Tasks completed</p>
              <div className="flex gap-xs mt-sm">
                {Array.from({ length: Math.min(totalCount, 12) }, (_, i) => (
                  <div key={i} className={`h-xs flex-1 ${i < completedCount ? 'bg-primary' : 'bg-outline-variant'}`}></div>
                ))}
              </div>
            </div>
          </section>

          {/* Task List */}
          <section className="col-span-12 mt-xl">
            <div className="flex items-center justify-between mb-lg border-b border-outline-variant pb-md">
              <h3 className="font-label-caps text-label-caps text-primary tracking-widest">SCHEDULED PROTOCOLS</h3>
              <div className="flex gap-md">
                <span className="font-label-sm text-label-sm text-secondary">FILTER: ALL</span>
                <span className="font-label-sm text-label-sm text-secondary">SORT: CHRONO</span>
              </div>
            </div>
            <div className="space-y-xs">
              {loading ? (
                <div className="p-md text-center font-label-caps text-label-caps text-on-surface-variant">LOADING...</div>
              ) : scheduledTasks.length === 0 ? (
                <div className="p-md text-center font-label-caps text-label-caps text-on-surface-variant">NO SCHEDULED TASKS</div>
              ) : (
                scheduledTasks.map((task, i) => (
                  <div
                    key={task._id}
                    className={`task-card group ${task.status === "completed" ? "opacity-50" : ""} bg-surface-container-low hover:bg-surface-container transition-all cursor-pointer p-md border border-transparent hover:border-outline-variant`}
                    onClick={() => task.status !== "completed" && navigate(`/focus/${task._id}`)}
                  >
                    <div className="flex items-center gap-xl">
                      <span className="font-label-sm text-label-sm text-secondary w-20">
                        {task.dueDate ? new Date(task.dueDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : `${String(9 + i).padStart(2, '0')}:00`}
                      </span>
                      <div className="flex-1">
                        <h4 className={`font-body-md text-body-md font-bold text-primary group-hover:translate-x-2 transition-transform ${task.status === "completed" ? "line-through" : ""}`}>
                          {task.title}
                        </h4>
                        {task.status !== "completed" && (
                          <div className="task-detail mt-md">
                            <p className="text-secondary font-body-md text-[14px]">{task.description}</p>
                            {task.tags && task.tags.length > 0 && (
                              <div className="flex gap-sm mt-md">
                                {task.tags.map(tag => (
                                  <span key={tag} className="px-md py-xs bg-surface-container-high font-label-sm text-[10px] rounded-full">{tag.toUpperCase()}</span>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      {task.status === "completed" ? (
                        <span className="material-symbols-outlined text-on-tertiary-container" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      ) : (
                        <>
                          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">
                            P{String(i + 1).padStart(2, '0')}
                          </span>
                          <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">expand_more</span>
                        </>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </AppLayout>
  );
};

export default TodayPage;
