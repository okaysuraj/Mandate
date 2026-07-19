import React, { useState, useEffect } from "react";
import AppLayout from "../components/AppLayout";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { useDataStore } from "../store/useDataStore";

const TodayPage = () => {
  const { tasks, loading, loadTasks } = useDataStore();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      loadTasks();
    }
  }, [user, loadTasks]);

  const today = new Date();
  const dayStr = today.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '.');

  const focusTask = tasks.find(t => t.status !== "completed" && (t.priority === "urgent" || t.priority === "high"))
    || tasks.find(t => t.status !== "completed");

  const scheduledTasks = tasks
    .sort((a, b) => new Date(a.dueDate || 0) - new Date(b.dueDate || 0))
    .slice(0, 10); // Show only top 10

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "urgent": return "bg-tertiary-container text-tertiary-fixed";
      case "high": return "bg-secondary-container text-on-secondary-container";
      default: return "bg-secondary-container text-on-secondary-container";
    }
  };

  const getStatusDisplay = (task) => {
    if (task.status === "completed") {
      return (
        <span className="text-xs bg-surface-container-highest text-on-surface-variant px-2 py-0.5 rounded-full font-label-caps flex items-center gap-1">
          <span className="material-symbols-outlined text-[12px]">check</span> COMPLETED
        </span>
      );
    }
    if (task.status === "in-progress" || task._id === focusTask?._id) {
      return (
        <span className="text-xs bg-tertiary-container text-tertiary-fixed px-2 py-0.5 rounded-full font-label-caps flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed animate-pulse"></span> ACTIVE
        </span>
      );
    }
    return (
      <span className="text-xs bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full font-label-caps">
        PENDING
      </span>
    );
  };

  return (
    <AppLayout>
      <div className="flex-1 w-full space-y-xl pb-xl overflow-y-auto custom-scrollbar">
        {/* ACTIVE FOCUS SECTION */}
        <div className="relative overflow-hidden bg-primary p-lg lg:p-xl text-on-primary min-h-[400px] flex flex-col justify-end group transition-all duration-500">
          <div className="absolute inset-0 opacity-10 pointer-events-none"></div>
          <div className="relative z-10 space-y-lg">
            <div className="flex items-center gap-sm">
              <span className="px-2 py-1 bg-on-tertiary-container text-tertiary-fixed font-label-caps text-label-caps uppercase border border-on-tertiary-container">
                Status: {focusTask ? "Ready" : "Idle"}
              </span>
              <span className="text-on-primary-container font-label-caps text-label-caps uppercase">
                Ref: {focusTask ? `PROTO-SEC-${focusTask._id.substring(focusTask._id.length - 4)}` : "STANDBY"}
              </span>
            </div>
            <div className="space-y-sm max-w-2xl">
              <h1 className="font-display-lg text-display-lg leading-none uppercase">
                {focusTask ? focusTask.title : "NO ACTIVE MANDATE"}
              </h1>
              <p className="text-on-primary-container font-body-md text-lg leading-relaxed">
                {focusTask ? (focusTask.description || "Execute strategic directive across relevant subsystem components. Awaiting operator initialization.") : "System is currently idling. All core objectives have been satisfied for the current cycle."}
              </p>
            </div>
            <div className="flex flex-wrap gap-md">
              {focusTask && (
                <>
                  <button 
                    onClick={() => navigate(`/focus/${focusTask._id}`)}
                    className="bg-on-tertiary px-lg py-md rounded-full text-primary font-bold hover:scale-105 active:scale-95 transition-all flex items-center gap-md"
                  >
                    <span>START SESSION</span>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                  </button>
                  <button 
                    onClick={() => navigate(`/tasks/${focusTask._id}`)}
                    className="border border-on-primary-container px-lg py-md rounded-full text-on-primary font-bold hover:bg-surface-container-low hover:text-primary transition-all"
                  >
                    DETAILS
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="absolute top-lg right-lg text-right hidden lg:block">
            <div className="text-on-primary-container font-label-caps text-[80px] leading-none opacity-10 select-none uppercase">
              {focusTask ? `MND-${focusTask._id.substring(focusTask._id.length - 3)}` : "IDLE"}
            </div>
          </div>
        </div>

        {/* SCHEDULED PROTOCOLS */}
        <div className="space-y-lg">
          <div className="flex items-end justify-between border-b-2 border-primary pb-sm">
            <h2 className="font-headline-lg text-headline-lg flex items-center gap-md">
              <span className="material-symbols-outlined text-[32px]">schedule</span>
              SCHEDULED PROTOCOLS
            </h2>
            <span className="font-label-caps text-on-surface-variant mb-1">{dayStr}</span>
          </div>
          <div className="grid grid-cols-1 gap-px bg-surface-variant border border-surface-variant overflow-hidden">
            {loading ? (
              <div className="bg-surface-container-lowest p-lg text-center font-label-caps text-on-surface-variant">LOADING DIRECTIVES...</div>
            ) : scheduledTasks.length === 0 ? (
              <div className="bg-surface-container-lowest p-lg text-center font-label-caps text-on-surface-variant">NO PROTOCOLS SCHEDULED</div>
            ) : (
              scheduledTasks.map((task, i) => (
                <div 
                  key={task._id} 
                  className={`group ${task.status === "completed" ? "bg-white opacity-60 hover:opacity-100" : task._id === focusTask?._id ? "bg-surface-container-lowest" : "bg-white"} p-lg hover:bg-surface-container-low transition-all flex flex-col md:flex-row md:items-center justify-between gap-md relative overflow-hidden`}
                >
                  {task._id === focusTask?._id && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>}
                  <div className="flex items-center gap-lg">
                    <div className={`font-label-caps text-xl font-black w-20 ${task.status !== 'completed' && task._id !== focusTask?._id ? 'text-on-surface-variant' : ''}`}>
                      {task.dueDate ? new Date(task.dueDate).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) : `${String(8 + i).padStart(2, '0')}:00`}
                    </div>
                    <div className="space-y-xs">
                      <h3 className={`font-bold text-lg uppercase tracking-tight ${task.status === "completed" ? "line-through text-on-surface-variant" : ""}`}>
                        {task.title}
                      </h3>
                      <div className="flex items-center gap-md">
                        {getStatusDisplay(task)}
                        {task.status !== "completed" && (
                          <span className="text-xs text-on-surface-variant font-label-sm uppercase">PRIORITY: {task.priority || "MEDIUM"}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-md">
                    <button 
                      onClick={() => navigate(`/tasks/${task._id}`)}
                      className="material-symbols-outlined p-2 border border-outline-variant rounded-full hover:bg-primary hover:text-on-primary transition-all"
                    >
                      {task.status === "completed" ? "visibility" : task._id === focusTask?._id ? "more_vert" : "play_arrow"}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ASYMMETRIC ANALYTICS BENTO */}
        <div className="grid grid-cols-12 gap-gutter mb-xl">
          <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest border border-outline-variant p-lg space-y-md">
            <div className="flex justify-between items-center">
              <h4 className="font-label-caps text-label-caps uppercase text-on-surface-variant">Infrastructure Load</h4>
              <span className="text-xs font-bold text-primary">REAL-TIME</span>
            </div>
            <div className="h-48 w-full bg-surface-container-low relative overflow-hidden group">
              <div className="absolute inset-0 flex items-end justify-between px-md gap-1">
                <div className="bg-primary-container w-full h-[60%] group-hover:h-[80%] transition-all duration-700"></div>
                <div className="bg-primary w-full h-[40%] group-hover:h-[60%] transition-all duration-700 delay-75"></div>
                <div className="bg-primary-container w-full h-[70%] group-hover:h-[50%] transition-all duration-700 delay-100"></div>
                <div className="bg-primary w-full h-[30%] group-hover:h-[90%] transition-all duration-700 delay-150"></div>
                <div className="bg-primary-container w-full h-[55%] group-hover:h-[45%] transition-all duration-700 delay-200"></div>
                <div className="bg-primary w-full h-[85%] group-hover:h-[65%] transition-all duration-700 delay-300"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display-lg text-4xl font-black opacity-20">78.4%</span>
              </div>
            </div>
          </div>
          
          <div className="col-span-12 lg:col-span-4 bg-primary text-on-primary p-lg flex flex-col justify-between border border-primary">
            <h4 className="font-label-caps text-label-caps uppercase text-on-primary-container">Next Milestone</h4>
            <div className="space-y-xs">
              <div className="font-display-lg text-4xl">02:45:12</div>
              <p className="text-xs text-on-primary-container uppercase tracking-widest font-label-caps">Until Network Lockdown</p>
            </div>
            <button className="w-full mt-lg py-sm border border-on-primary-container font-bold hover:bg-on-primary hover:text-primary transition-all font-label-caps uppercase">
              EXTEND WINDOW
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default TodayPage;
