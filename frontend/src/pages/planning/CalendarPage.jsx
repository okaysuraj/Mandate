import React, { useState, useEffect, useMemo } from "react";
import AppLayout from "../../components/layout/AppLayout";
import TaskComposer from "../../components/core/TaskComposer";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import { useDataStore } from "../../store/useDataStore";
import { 
  format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, 
  eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, isToday 
} from "date-fns";

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [composerDueDate, setComposerDueDate] = useState("");
  
  const { user } = useAuth();
  const navigate = useNavigate();
  const { tasks, loading, loadTasks } = useDataStore();

  useEffect(() => {
    if (user) {
      loadTasks();
    }
  }, [user, loadTasks]);

  const safeTasks = Array.isArray(tasks) ? tasks : [];

  // Compute days for calendar grid (Monday start)
  const daysInGrid = useMemo(() => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });
    return eachDayOfInterval({ start: startDate, end: endDate });
  }, [currentDate]);

  // Map tasks to dates
  const tasksByDate = useMemo(() => {
    const map = new Map();
    safeTasks.forEach(task => {
      if (!task.dueDate) return;
      const d = new Date(task.dueDate);
      if (isNaN(d.getTime())) return;
      const key = format(d, "yyyy-MM-dd");
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(task);
    });
    return map;
  }, [safeTasks]);

  const selectedKey = format(selectedDate, "yyyy-MM-dd");
  const selectedDayTasks = tasksByDate.get(selectedKey) || [];

  const handlePrevMonth = () => setCurrentDate(prev => subMonths(prev, 1));
  const handleNextMonth = () => setCurrentDate(prev => addMonths(prev, 1));
  const handleToday = () => {
    const now = new Date();
    setCurrentDate(now);
    setSelectedDate(now);
  };

  const openComposerForDate = (date) => {
    setComposerDueDate(format(date, "yyyy-MM-dd"));
    setIsComposerOpen(true);
  };

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "urgent":
        return {
          pill: "bg-error-container text-error border border-error font-bold",
          dot: "bg-error",
          label: "CRITICAL"
        };
      case "high":
        return {
          pill: "bg-surface-container-highest text-primary border border-primary font-bold",
          dot: "bg-primary",
          label: "HIGH"
        };
      case "medium":
        return {
          pill: "bg-tertiary-container text-on-tertiary-container border border-outline-variant font-medium",
          dot: "bg-tertiary",
          label: "MEDIUM"
        };
      default:
        return {
          pill: "bg-surface-container text-on-surface-variant border border-outline-variant",
          dot: "bg-outline",
          label: "ROUTINE"
        };
    }
  };

  // Metrics
  const totalTasksCount = safeTasks.length;
  const completedCount = safeTasks.filter(t => t.status === "completed").length;
  const highPriorityCount = safeTasks.filter(t => t.priority === "urgent" || t.priority === "high").length;
  const completionRate = totalTasksCount > 0 ? Math.round((completedCount / totalTasksCount) * 100) : 0;

  return (
    <AppLayout>
      <div className="space-y-6 pb-8">
        {/* Header Section */}
        <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-4 border-b border-outline-variant">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>
              <p className="font-mono text-on-surface-variant uppercase tracking-widest text-[11px] font-semibold">
                SYSTEM TEMPORAL TIMELINE · STRATEGIC HORIZON
              </p>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-on-surface uppercase tracking-tight">
              {format(currentDate, "MMMM yyyy")}
            </h1>
            <p className="text-xs md:text-sm text-on-surface-variant mt-0.5">
              {safeTasks.length} total directive cycles registered in temporal pipeline.
            </p>
          </div>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button 
              onClick={handleToday}
              className="px-3.5 py-1.5 bg-surface-container-lowest border border-outline-variant hover:border-primary text-on-surface font-mono text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
            >
              Today
            </button>
            <div className="flex items-center border border-outline-variant bg-surface-container-lowest rounded-lg overflow-hidden">
              <button 
                onClick={handlePrevMonth}
                title="Previous Month"
                className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors cursor-pointer border-r border-outline-variant"
              >
                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
              </button>
              <button 
                onClick={handleNextMonth}
                title="Next Month"
                className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
            <button 
              onClick={() => openComposerForDate(selectedDate)}
              className="flex items-center gap-1.5 px-4 py-2 bg-primary text-on-primary rounded-lg font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span>Schedule Mandate</span>
            </button>
          </div>
        </section>

        {/* Main Calendar Grid and Schedule */}
        <div className="grid grid-cols-12 gap-6 items-start">
          {/* Calendar View Area */}
          <div className="col-span-12 lg:col-span-8 xl:col-span-9 bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
            {/* Weekday Labels (Responsive: single-letter on mobile, 3-letter on desktop) */}
            <div className="grid grid-cols-7 border-b border-outline-variant bg-surface-container-low">
              {[
                { full: "Mon", short: "M" },
                { full: "Tue", short: "T" },
                { full: "Wed", short: "W" },
                { full: "Thu", short: "T" },
                { full: "Fri", short: "F" },
                { full: "Sat", short: "S" },
                { full: "Sun", short: "S" },
              ].map((day, idx) => (
                <div 
                  key={day.full} 
                  className={`py-2.5 text-center font-mono text-[11px] font-bold uppercase tracking-wider ${
                    idx >= 5 ? 'text-on-surface-variant/70 bg-surface-container-high/30' : 'text-on-surface'
                  } border-r border-outline-variant last:border-r-0`}
                >
                  <span className="hidden sm:inline">{day.full}</span>
                  <span className="sm:hidden">{day.short}</span>
                </div>
              ))}
            </div>
            
            {/* Calendar Days Grid */}
            <div className="grid grid-cols-7">
              {daysInGrid.map((day, cellIdx) => {
                const dayKey = format(day, "yyyy-MM-dd");
                const dayTasks = tasksByDate.get(dayKey) || [];
                const isCurrentMonth = isSameMonth(day, currentDate);
                const isSelected = isSameDay(day, selectedDate);
                const isCurrentToday = isToday(day);

                return (
                  <div 
                    key={dayKey} 
                    onClick={() => setSelectedDate(day)}
                    className={`min-h-[72px] sm:min-h-[105px] md:min-h-[125px] p-1.5 md:p-2.5 relative group cursor-pointer transition-colors border-r border-b border-outline-variant select-none ${
                      cellIdx % 7 === 6 ? 'border-r-0' : ''
                    } ${
                      !isCurrentMonth 
                        ? 'bg-surface-container-low/40 text-on-surface-variant/40' 
                        : isSelected 
                        ? 'bg-surface-container-high/50 ring-1 ring-inset ring-primary' 
                        : 'bg-surface-container-lowest hover:bg-surface-container-low'
                    }`}
                  >
                    {/* Top Row: Date Number and Count */}
                    <div className="flex items-center justify-between mb-1">
                      <span className={`inline-flex items-center justify-center font-mono text-xs font-bold rounded-full ${
                        isCurrentToday 
                          ? 'w-6 h-6 bg-primary text-on-primary' 
                          : isSelected
                          ? 'w-6 h-6 border border-primary text-primary font-bold'
                          : isCurrentMonth
                          ? 'text-on-surface'
                          : 'text-on-surface-variant/40'
                      }`}>
                        {format(day, "d")}
                      </span>

                      {dayTasks.length > 0 && (
                        <span className="font-mono text-[9px] px-1.5 py-0.2 bg-surface-container text-on-surface-variant border border-outline-variant rounded-full font-bold">
                          {dayTasks.length}
                        </span>
                      )}
                    </div>

                    {/* Task Chips on Cell (Desktop view) */}
                    <div className="hidden sm:flex flex-col gap-1 overflow-hidden max-h-[72px]">
                      {dayTasks.slice(0, 2).map((t, idx) => {
                        const pri = getPriorityStyle(t.priority);
                        const isDone = t.status === "completed";
                        return (
                          <div 
                            key={idx}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedDate(day);
                              if (t._id && !String(t._id).startsWith("650a1111")) {
                                navigate(`/tasks/${t._id}`);
                              }
                            }}
                            className={`px-1.5 py-0.5 rounded text-[9px] font-mono uppercase truncate flex items-center gap-1 border transition-all ${pri.pill} ${
                              isDone ? 'line-through opacity-50' : 'hover:border-primary'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${pri.dot}`}></span>
                            <span className="truncate">{t.title}</span>
                          </div>
                        );
                      })}
                      {dayTasks.length > 2 && (
                        <div className="font-mono text-[9px] text-on-surface-variant font-bold pl-0.5">
                          +{dayTasks.length - 2} more
                        </div>
                      )}
                    </div>

                    {/* Mobile Compact Indicators */}
                    <div className="sm:hidden flex flex-wrap gap-1 mt-1">
                      {dayTasks.slice(0, 3).map((t, idx) => {
                        const pri = getPriorityStyle(t.priority);
                        return (
                          <span 
                            key={idx} 
                            className={`w-2 h-2 rounded-full inline-block ${pri.dot}`}
                            title={t.title}
                          />
                        );
                      })}
                      {dayTasks.length > 3 && (
                        <span className="font-mono text-[8px] text-on-surface-variant font-bold">
                          +{dayTasks.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Quick Add Hover Button */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        openComposerForDate(day);
                      }}
                      title="Schedule directive on this date"
                      className="opacity-0 group-hover:opacity-100 absolute bottom-1.5 right-1.5 w-6 h-6 rounded-md bg-primary text-on-primary hover:opacity-90 flex items-center justify-center transition-all cursor-pointer shadow-sm"
                    >
                      <span className="material-symbols-outlined text-[14px]">add</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Sidebar: Selected Date Agenda */}
          <div className="col-span-12 lg:col-span-4 xl:col-span-3 flex flex-col gap-4">
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 sm:p-5 flex flex-col gap-3 shadow-sm">
              <div className="flex justify-between items-start border-b border-outline-variant pb-3 bg-surface-container-low -m-4 sm:-m-5 mb-0 p-4 sm:p-5 rounded-t-xl">
                <div>
                  <span className="font-mono text-[10px] text-on-surface-variant uppercase font-bold tracking-widest block">
                    {format(selectedDate, "EEEE")}
                  </span>
                  <h3 className="font-mono text-base font-black text-on-surface uppercase">
                    {format(selectedDate, "MMMM d, yyyy")}
                  </h3>
                </div>
                <button 
                  onClick={() => openComposerForDate(selectedDate)}
                  className="w-8 h-8 rounded-lg border border-outline-variant hover:border-primary bg-surface-container-lowest text-on-surface flex items-center justify-center cursor-pointer transition-colors"
                  title="Add Mandate for this Day"
                >
                  <span className="material-symbols-outlined text-[18px]">add</span>
                </button>
              </div>

              {selectedDayTasks.length > 0 ? (
                <div className="space-y-2.5 max-h-[380px] overflow-y-auto custom-scrollbar pr-1 pt-2">
                  {selectedDayTasks.map((task, idx) => {
                    const pri = getPriorityStyle(task.priority);
                    const isDone = task.status === "completed";
                    const idStr = String(task._id || task.id || "0000");
                    const refCode = idStr.length >= 4 ? idStr.slice(-4).toUpperCase() : idStr.toUpperCase();

                    return (
                      <div 
                        key={idx}
                        onClick={() => {
                          if (task._id && !String(task._id).startsWith("650a1111")) {
                            navigate(`/tasks/${task._id}`);
                          }
                        }}
                        className={`p-3.5 rounded-lg border transition-all cursor-pointer ${
                          isDone 
                            ? 'bg-surface-container-low/40 border-outline-variant/40 opacity-70' 
                            : 'bg-surface-container-low hover:bg-surface-container border-outline-variant hover:border-primary'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1 mb-1.5">
                          <span className="font-mono text-[9px] font-bold text-on-surface-variant tracking-wider bg-surface-container px-1.5 py-0.5 rounded border border-outline-variant">
                            #MND-{refCode}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase border ${pri.pill}`}>
                            {pri.label}
                          </span>
                        </div>
                        <h4 className={`font-mono text-xs font-bold text-on-surface line-clamp-1 mb-1 ${
                          isDone ? 'line-through text-on-surface-variant' : ''
                        }`}>
                          {task.title}
                        </h4>
                        {task.description && (
                          <p className="font-body-md text-[11px] text-on-surface-variant line-clamp-2 leading-relaxed">
                            {task.description}
                          </p>
                        )}
                        <div className="flex items-center justify-between text-[10px] text-on-surface-variant font-mono mt-2 pt-1.5 border-t border-outline-variant">
                          <span className="uppercase text-[9px] tracking-wider">{task.status || "Pending"}</span>
                          <span className="material-symbols-outlined text-[13px] text-on-surface-variant">arrow_forward</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center text-on-surface-variant">
                  <span className="material-symbols-outlined text-[32px] text-on-surface-variant/40 mb-2">event_available</span>
                  <p className="font-mono text-xs font-bold uppercase tracking-wider text-on-surface">
                    Horizon Clear
                  </p>
                  <p className="text-xs text-on-surface-variant mt-1 max-w-[200px]">
                    No directives scheduled for this cycle date.
                  </p>
                  <button 
                    onClick={() => openComposerForDate(selectedDate)}
                    className="mt-4 px-3.5 py-1.5 bg-surface-container border border-outline-variant hover:border-primary text-primary rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                  >
                    + Assign Directive
                  </button>
                </div>
              )}
            </div>

            {/* Severity Legend */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-3.5 shadow-sm">
              <h4 className="font-mono text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-2">
                Operational Severity Index
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2 p-2 rounded-lg bg-surface-container-low border border-outline-variant">
                  <span className="w-2 h-2 rounded-full bg-error"></span>
                  <span className="font-mono text-[10px] text-on-surface uppercase">Critical</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-surface-container-low border border-outline-variant">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <span className="font-mono text-[10px] text-on-surface uppercase">High</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-surface-container-low border border-outline-variant">
                  <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                  <span className="font-mono text-[10px] text-on-surface uppercase">Medium</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-surface-container-low border border-outline-variant">
                  <span className="w-2 h-2 rounded-full bg-surface-container-highest"></span>
                  <span className="font-mono text-[10px] text-on-surface uppercase">Completed</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Operational Metrics Bento */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="material-symbols-outlined text-primary text-[20px]">calendar_month</span>
              <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">
                Scheduled Volume
              </span>
            </div>
            <div className="text-2xl md:text-3xl font-black text-on-surface font-mono">{totalTasksCount}</div>
            <p className="text-xs text-on-surface-variant mt-1">
              Total directives tracked in tactical pipeline
            </p>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="material-symbols-outlined text-tertiary text-[20px]">task_alt</span>
              <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">
                Resolution Ratio
              </span>
            </div>
            <div className="text-2xl md:text-3xl font-black text-on-surface font-mono">{completionRate}%</div>
            <div className="w-full bg-surface-container-high h-2.5 mt-3 rounded-full overflow-hidden">
              <div 
                className="bg-primary h-full transition-all duration-500 rounded-full"
                style={{ width: `${completionRate}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="material-symbols-outlined text-error text-[20px]">priority_high</span>
              <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">
                Critical Density
              </span>
            </div>
            <div className="text-2xl md:text-3xl font-black text-error font-mono">{highPriorityCount}</div>
            <p className="text-xs text-on-surface-variant mt-1">
              Directives requiring priority executive focus
            </p>
          </div>
        </section>

        {/* Floating Action Button */}
        <button 
          onClick={() => openComposerForDate(new Date())}
          title="Schedule New Directive"
          aria-label="Schedule New Directive"
          className="fixed bottom-20 right-4 md:bottom-8 md:right-8 w-12 h-12 md:w-14 md:h-14 bg-primary text-on-primary rounded-full shadow-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 z-40 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[24px]">edit_calendar</span>
        </button>
      </div>

      {/* Task Composer Modal */}
      <TaskComposer 
        isOpen={isComposerOpen} 
        onClose={() => setIsComposerOpen(false)} 
        onTaskCreated={() => {
          setIsComposerOpen(false);
          loadTasks();
        }} 
      />
    </AppLayout>
  );
};

export default CalendarPage;
