import React, { useEffect } from "react";
import AppLayout from "../../components/layout/AppLayout";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import { useDataStore } from "../../store/useDataStore";

const DEFAULT_TODAY_TASKS = [
  { _id: "650a11111111111111111101", title: "API Gateway Authentication Protocol", status: "in-progress", priority: "urgent", description: "Configure OAuth2 token verification across microservices", dueDate: new Date().toISOString() },
  { _id: "650a11111111111111111102", title: "Database Indexing Optimization", status: "pending", priority: "high", description: "Add compound index to task schema for query acceleration", dueDate: new Date(Date.now() + 3600000).toISOString() },
  { _id: "650a11111111111111111103", title: "Global Search Dynamic Debounce", status: "completed", priority: "medium", description: "Tune input debouncing to 200ms for smooth live search", dueDate: new Date(Date.now() + 7200000).toISOString() },
];

const TodayPage = () => {
  const { tasks, loading, loadTasks } = useDataStore();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      loadTasks();
    }
  }, [user, loadTasks]);

  const activeTasks = Array.isArray(tasks) && tasks.length > 0 ? tasks : DEFAULT_TODAY_TASKS;

  const today = new Date();
  const dayStr = today.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '.');

  const focusTask = activeTasks.find(t => t.status !== "completed" && (t.priority === "urgent" || t.priority === "high"))
    || activeTasks.find(t => t.status !== "completed")
    || activeTasks[0];

  const scheduledTasks = [...activeTasks]
    .sort((a, b) => new Date(a.dueDate || 0) - new Date(b.dueDate || 0))
    .slice(0, 10);

  const focusIdStr = String(focusTask?._id || focusTask?.id || "0000");
  const refCode = focusIdStr.length >= 4 ? focusIdStr.slice(-4).toUpperCase() : focusIdStr.toUpperCase();
  const mndCode = focusIdStr.length >= 3 ? focusIdStr.slice(-3).toUpperCase() : focusIdStr.toUpperCase();

  const getStatusDisplay = (task) => {
    if (task.status === "completed") {
      return (
        <span className="text-xs bg-surface-container-highest text-on-surface-variant px-2 py-0.5 rounded-full font-label-caps flex items-center gap-1">
          <span className="material-symbols-outlined text-[12px]">check</span> COMPLETED
        </span>
      );
    }
    if (task.status === "in-progress" || String(task._id) === String(focusTask?._id)) {
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
      <div className="flex-1 w-full space-y-xl pb-xl">
        {/* ACTIVE FOCUS SECTION */}
        <div className="relative overflow-hidden bg-primary p-lg lg:p-xl text-on-primary min-h-[360px] flex flex-col justify-end group transition-all duration-500 rounded-md">
          <div className="absolute inset-0 opacity-10 pointer-events-none"></div>
          <div className="relative z-10 space-y-lg">
            <div className="flex items-center gap-sm">
              <span className="px-2 py-1 bg-on-tertiary-container text-tertiary-fixed font-label-caps text-label-caps uppercase border border-on-tertiary-container">
                Status: {focusTask ? "Ready" : "Idle"}
              </span>
              <span className="text-on-primary-container font-label-caps text-label-caps uppercase">
                Ref: PROTO-SEC-{refCode}
              </span>
            </div>
            <div className="space-y-sm max-w-2xl">
              <h1 className="font-display-lg text-headline-lg md:text-[36px] font-black leading-tight uppercase">
                {focusTask ? focusTask.title : "NO ACTIVE MANDATE"}
              </h1>
              <p className="text-on-primary-container font-body-md text-base md:text-lg leading-relaxed">
                {focusTask ? (focusTask.description || "Execute strategic directive across relevant subsystem components. Awaiting operator initialization.") : "System is currently idling. All core objectives have been satisfied for the current cycle."}
              </p>
            </div>
            <div className="flex flex-wrap gap-md pt-sm">
              {focusTask && (
                <>
                  <button 
                    onClick={() => navigate(`/focus/${focusTask._id || focusTask.id}`)}
                    className="bg-on-tertiary px-lg py-md rounded-full text-primary font-bold hover:scale-105 active:scale-95 transition-all flex items-center gap-md cursor-pointer"
                  >
                    <span>START SESSION</span>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                  </button>
                  <button 
                    onClick={() => navigate(`/tasks/${focusTask._id || focusTask.id}`)}
                    className="border border-on-primary-container px-lg py-md rounded-full text-on-primary font-bold hover:bg-surface-container-low hover:text-primary transition-all cursor-pointer"
                  >
                    DETAILS
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="absolute top-lg right-lg text-right hidden lg:block">
            <div className="text-on-primary-container font-label-caps text-[80px] leading-none opacity-10 select-none uppercase">
              MND-{mndCode}
            </div>
          </div>
        </div>

        {/* SCHEDULED PROTOCOLS */}
        <div className="space-y-lg">
          <div className="flex items-end justify-between border-b-2 border-primary pb-sm">
            <h2 className="font-headline-lg text-headline-lg flex items-center gap-md font-bold uppercase">
              <span className="material-symbols-outlined text-[28px]">schedule</span>
              Scheduled Protocols
            </h2>
            <span className="font-label-caps text-on-surface-variant mb-1">{dayStr}</span>
          </div>
          <div className="grid grid-cols-1 gap-px bg-surface-variant border border-surface-variant overflow-hidden rounded">
            {loading && activeTasks.length === 0 ? (
              <div className="bg-surface-container-lowest p-lg text-center font-label-caps text-on-surface-variant">LOADING DIRECTIVES...</div>
            ) : scheduledTasks.length === 0 ? (
              <div className="bg-surface-container-lowest p-lg text-center font-label-caps text-on-surface-variant">NO PROTOCOLS SCHEDULED</div>
            ) : (
              scheduledTasks.map((task, i) => {
                const taskId = String(task._id || task.id || i);
                const isFocus = String(task._id || task.id) === String(focusTask?._id || focusTask?.id);

                return (
                  <div 
                    key={taskId} 
                    className={`group ${task.status === "completed" ? "bg-surface-container-lowest opacity-60 hover:opacity-100" : isFocus ? "bg-surface-container-lowest" : "bg-surface-container-lowest"} p-lg hover:bg-surface-container-low transition-all flex flex-col md:flex-row md:items-center justify-between gap-md relative overflow-hidden`}
                  >
                    {isFocus && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>}
                    <div className="flex items-center gap-lg">
                      <div className={`font-label-caps text-xl font-black w-20 ${task.status !== 'completed' && !isFocus ? 'text-on-surface-variant' : ''}`}>
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
                        onClick={() => navigate(`/tasks/${taskId}`)}
                        className="material-symbols-outlined p-2 border border-outline-variant rounded-full hover:bg-primary hover:text-on-primary transition-all cursor-pointer"
                      >
                        {task.status === "completed" ? "visibility" : isFocus ? "more_vert" : "play_arrow"}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* ANALYTICS BENTO */}
        <div className="grid grid-cols-12 gap-gutter mb-xl">
          <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest border border-outline-variant p-lg space-y-md rounded">
            <div className="flex justify-between items-center">
              <h4 className="font-label-caps text-label-caps uppercase text-on-surface-variant font-bold">Infrastructure Load</h4>
              <span className="text-xs font-bold text-primary">REAL-TIME</span>
            </div>
            <div className="h-44 w-full bg-surface-container-low relative overflow-hidden group rounded">
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
          
          <div className="col-span-12 lg:col-span-4 bg-primary text-on-primary p-lg flex flex-col justify-between border border-primary rounded">
            <h4 className="font-label-caps text-label-caps uppercase text-on-primary-container font-bold">Next Milestone</h4>
            <div className="space-y-xs">
              <div className="font-display-lg text-4xl font-black">02:45:12</div>
              <p className="text-xs text-on-primary-container uppercase tracking-widest font-label-caps">Until Network Lockdown</p>
            </div>
            <button className="w-full mt-lg py-sm border border-on-primary-container font-bold hover:bg-on-primary hover:text-primary transition-all font-label-caps uppercase rounded-full cursor-pointer">
              EXTEND WINDOW
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default TodayPage;
