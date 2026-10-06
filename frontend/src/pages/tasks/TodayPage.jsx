import useVisibleTasks from '../../hooks/useVisibleTasks';
import { todaySchedule, activeFocusTask } from '../../../../shared/taskSchedule';
import React, { useEffect } from "react";
import AppLayout from "../../components/layout/AppLayout";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import { useDataStore } from "../../store/useDataStore";

const TodayPage = () => {
  const storeWorkspaceId = useDataStore(state => state.workspaceId);
  const tasks = useVisibleTasks();
  const loading = useDataStore(state => state.loading);
  const loadTasks = useDataStore(state => state.loadTasks);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && storeWorkspaceId) {
      loadTasks();
    }
  }, [user, loadTasks, storeWorkspaceId]);

  const activeTasks = Array.isArray(tasks) ? tasks : [];

  const today = new Date();
  const dayStr = today.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '.');

  const focusTask = activeFocusTask(activeTasks);
  const scheduledTasks = todaySchedule(activeTasks, user?.timezone || 'UTC');

  const focusIdStr = String(focusTask?._id || focusTask?.id || "");
  const refCode = focusIdStr.length >= 4 ? focusIdStr.slice(-4).toUpperCase() : focusIdStr.toUpperCase();
  const mndCode = focusIdStr.length >= 3 ? focusIdStr.slice(-3).toUpperCase() : focusIdStr.toUpperCase();

  const getStatusDisplay = (task) => {
    if (task.status === "completed") {
      return (
        <span className="text-xs bg-surface-container-highest text-on-surface-variant px-2.5 py-0.5 rounded-full font-label-caps font-semibold flex items-center gap-1.5 border border-outline-variant">
          <span className="material-symbols-outlined text-[12px]">check</span> COMPLETED
        </span>
      );
    }
    if (task.status === "in-progress" || String(task._id) === String(focusTask?._id)) {
      return (
        <span className="text-xs bg-tertiary-container text-on-tertiary-container px-2.5 py-0.5 rounded-full font-label-caps font-semibold flex items-center gap-1.5 border border-outline-variant">
          <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span> ACTIVE
        </span>
      );
    }
    return (
      <span className="text-xs bg-secondary-container text-on-secondary-container px-2.5 py-0.5 rounded-full font-label-caps font-semibold border border-outline-variant">
        PENDING
      </span>
    );
  };

  return (
    <AppLayout>
      <div className="flex-1 w-full space-y-6 lg:space-y-8 pb-12">
        {/* ACTIVE FOCUS SECTION */}
        <div className="relative overflow-hidden bg-surface-container-lowest border border-outline-variant p-6 sm:p-8 lg:p-10 text-on-surface min-h-[300px] sm:min-h-[340px] flex flex-col justify-end group transition-all duration-300 rounded-xl shadow-xs">
          <div className="absolute inset-0 bg-gradient-to-tr from-surface-container-highest/20 to-transparent pointer-events-none"></div>
          <div className="relative z-10 space-y-4 sm:space-y-6">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="px-2.5 py-1 bg-tertiary-container text-on-tertiary-container font-label-caps text-xs uppercase font-bold rounded-full border border-outline-variant flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                Status: {focusTask ? "Ready" : "Idle"}
              </span>
              <span className="text-on-surface-variant font-mono text-xs uppercase tracking-wider px-2 py-0.5 bg-surface-container rounded border border-outline-variant">
                Task #{refCode}
              </span>
            </div>
            <div className="space-y-2 max-w-2xl">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight uppercase tracking-tight text-on-surface">
                {focusTask ? focusTask.title : "NO ACTIVE TASK"}
              </h1>
              <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed line-clamp-3">
                {focusTask ? (focusTask.description || "Focus on your most important task for today, or select one from your task list.") : "All clear! You have completed all scheduled tasks for today."}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {focusTask && (
                <>
                  <button
                    onClick={() => navigate(`/focus/${focusTask._id || focusTask.id}`)}
                    className="bg-primary text-on-primary px-5 sm:px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                  >
                    <span>START SESSION</span>
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                  </button>
                  <button
                    onClick={() => navigate(`/tasks/${focusTask._id || focusTask.id}`)}
                    className="border border-outline-variant bg-surface-container-low text-on-surface px-5 sm:px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-surface-container hover:text-primary transition-all cursor-pointer"
                  >
                    DETAILS
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="absolute top-6 right-6 text-right hidden sm:block pointer-events-none select-none">
            <div className="text-on-surface-variant/15 font-black text-6xl lg:text-8xl leading-none uppercase font-mono">
              MND-{mndCode}
            </div>
          </div>
        </div>

        {/* SCHEDULED TASKS */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-outline-variant pb-3">
            <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2 uppercase tracking-tight text-on-surface">
              <span className="material-symbols-outlined text-primary">schedule</span>
              Today's Schedule
            </h2>
            <span className="text-xs font-mono font-medium text-on-surface-variant">{dayStr}</span>
          </div>
          <div className="border border-outline-variant divide-y divide-outline-variant overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm">
            {loading && activeTasks.length === 0 ? (
              <div className="p-8 text-center font-mono text-xs uppercase tracking-wider text-on-surface-variant">LOADING TASKS...</div>
            ) : scheduledTasks.length === 0 ? (
              <div className="p-8 text-center font-mono text-xs uppercase tracking-wider text-on-surface-variant">NO TASKS SCHEDULED</div>
            ) : (
              scheduledTasks.map((task, i) => {
                const taskId = String(task._id || task.id || i);
                const isFocus = String(task._id || task.id) === String(focusTask?._id || focusTask?.id);

                return (
                  <div
                    key={taskId}
                    className={`group p-4 sm:p-5 hover:bg-surface-container-low transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 relative ${task.status === "completed" ? "opacity-60 hover:opacity-100" : ""}`}
                  >
                    {isFocus && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>}
                    <div className="flex items-start sm:items-center gap-4 min-w-0">
                      <div className="font-mono text-xs sm:text-sm font-bold text-on-surface-variant w-14 sm:w-16 shrink-0 pt-0.5 sm:pt-0">
                        {task.dueDate ? new Date(task.dueDate).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) : 'No due time'}
                      </div>
                      <div className="space-y-1 min-w-0 flex-1">
                        <h3 className={`font-bold text-sm sm:text-base uppercase tracking-tight text-on-surface truncate ${task.status === "completed" ? "line-through text-on-surface-variant" : ""}`}>
                          {task.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2">
                          {getStatusDisplay(task)}
                          {task.status !== "completed" && (
                            <span className="text-[10px] text-on-surface-variant font-mono uppercase tracking-wider bg-surface-container px-2 py-0.5 rounded border border-outline-variant">
                              PRIORITY: {task.priority || "MEDIUM"}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-end gap-2 shrink-0">
                      <button
                        onClick={() => navigate(`/tasks/${taskId}`)}
                        aria-label="View task details"
                        className="w-9 h-9 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary transition-all cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-sm">
                          {task.status === "completed" ? "visibility" : isFocus ? "more_vert" : "play_arrow"}
                        </span>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* ANALYTICS BENTO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          <div className="lg:col-span-8 bg-surface-container-lowest border border-outline-variant p-5 sm:p-6 space-y-4 rounded-xl shadow-sm">
            <div className="flex justify-between items-center">
              <h4 className="font-label-caps text-xs uppercase tracking-wider text-on-surface-variant font-bold">Today's Execution Progress</h4>
              <span className="text-xs font-mono font-bold text-primary">
                {scheduledTasks.filter(t => t.status === "completed").length} / {scheduledTasks.length} COMPLETED
              </span>
            </div>
            <div className="bg-surface-container-low border border-outline-variant rounded-lg p-4 space-y-3">
              <div className="w-full bg-surface-container-high h-3 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-full transition-all duration-500 rounded-full"
                  style={{ width: `${scheduledTasks.length > 0 ? Math.round((scheduledTasks.filter(t => t.status === "completed").length / scheduledTasks.length) * 100) : 0}%` }}
                ></div>
              </div>
              <div className="flex justify-between items-center text-xs font-mono text-on-surface-variant">
                <span>0% Initiated</span>
                <span className="font-bold text-primary text-sm">
                  {scheduledTasks.length > 0 ? Math.round((scheduledTasks.filter(t => t.status === "completed").length / scheduledTasks.length) * 100) : 0}%
                </span>
                <span>100% Target</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-surface-container-high border border-outline-variant p-5 sm:p-6 flex flex-col justify-between rounded-xl shadow-sm space-y-4">
            <div>
              <h4 className="font-label-caps text-xs uppercase tracking-wider text-on-surface-variant font-bold mb-2">Priority Focus</h4>
              <div className="space-y-1">
                <div className="text-lg sm:text-xl font-bold text-on-surface truncate">
                  {focusTask ? focusTask.title : "All Tasks Clear"}
                </div>
                <p className="text-[11px] text-on-surface-variant uppercase tracking-wider font-mono">
                  Priority: {focusTask?.priority?.toUpperCase() || "Unassigned"} • Status: {focusTask?.status?.toUpperCase() || "IDLE"}
                </p>
              </div>
            </div>
            {focusTask ? (
              <button
                onClick={() => navigate(`/focus/${focusTask._id || focusTask.id}`)}
                className="w-full py-2.5 bg-primary text-on-primary font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-all rounded-full cursor-pointer shadow-sm"
              >
                ENTER FOCUS MODE
              </button>
            ) : (
              <button
                onClick={() => navigate("/kanban")}
                className="w-full py-2.5 border border-outline-variant bg-surface-container-low text-on-surface font-bold text-xs uppercase tracking-wider hover:bg-surface-container hover:text-primary transition-all rounded-full cursor-pointer"
              >
                VIEW KANBAN
              </button>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default TodayPage;
