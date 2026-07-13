import React, { useState, useEffect } from "react";
import AppLayout from "../components/AppLayout";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const CalendarPage = () => {
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());
  const [tasks, setTasks] = useState([]);
  const { user } = useAuth();
  
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  // Generate days (simplified)
  const prevDays = [26, 27, 28, 29, 30];
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await axios.get("/api/tasks", { params: { limit: 100 } });
        setTasks(data.data || []);
      } catch (error) {
        console.error("Failed to fetch tasks", error);
      }
    };
    if (user) fetchTasks();
  }, [user]);

  const events = {};
  
  tasks.forEach(task => {
    if (task.dueDate) {
      const taskDate = new Date(task.dueDate);
      // only consider tasks in current month for simplicity
      if (taskDate.getMonth() === currentDate.getMonth() && taskDate.getFullYear() === currentDate.getFullYear()) {
        const day = taskDate.getDate();
        if (!events[day]) events[day] = [];
        let type = "default";
        if (task.priority === "high" || task.priority === "urgent") type = "error";
        else if (task.priority === "medium") type = "primary";
        
        events[day].push({ label: task.title, type, task });
      }
    }
  });

  const getEventClass = (type) => {
    switch (type) {
      case "primary": return "bg-primary text-on-primary";
      case "error": return "bg-error-container text-on-error-container";
      case "outline": return "border border-outline-variant text-on-secondary-container";
      default: return "bg-surface-variant border border-outline text-on-surface-variant";
    }
  };

  const selectedTasks = events[selectedDay] || [];

  return (
    <AppLayout>
      {/* Calendar Header / Controls */}
      <section className="mb-lg flex flex-col md:flex-row justify-between items-end gap-md">
        <div>
          <h2 className="font-display-lg text-headline-lg text-primary">{currentMonth}</h2>
          <p className="font-body-md text-on-surface-variant mt-xs">{tasks.length} Critical Mandates Scheduled</p>
        </div>
        <div className="flex items-center gap-sm">
          <div className="flex border border-outline-variant rounded-full overflow-hidden">
            <button className="px-md py-xs bg-surface-container-high font-bold border-r border-outline-variant">Month</button>
            <button className="px-md py-xs hover:bg-surface-container-low transition-colors">Week</button>
          </div>
          <div className="flex gap-xs">
            <button className="p-xs border border-outline-variant rounded-full hover:bg-surface-container-low"><span className="material-symbols-outlined">chevron_left</span></button>
            <button className="p-xs border border-outline-variant rounded-full hover:bg-surface-container-low"><span className="material-symbols-outlined">chevron_right</span></button>
          </div>
        </div>
      </section>

      {/* Bento Calendar Grid */}
      <div className="bento-grid">
        {/* Legend / Status Chips */}
        <div className="col-span-12 flex gap-md mb-xs">
          <div className="flex items-center gap-xs">
            <span className="w-3 h-3 rounded-full bg-primary"></span>
            <span className="font-label-caps text-label-caps">Mandate</span>
          </div>
          <div className="flex items-center gap-xs">
            <span className="w-3 h-3 rounded-full bg-surface-variant border border-outline"></span>
            <span className="font-label-caps text-label-caps">Maintenance</span>
          </div>
          <div className="flex items-center gap-xs">
            <span className="w-3 h-3 rounded-full bg-tertiary-fixed-dim"></span>
            <span className="font-label-caps text-label-caps">System Cycle</span>
          </div>
        </div>

        {/* Calendar View */}
        <div className="col-span-12 lg:col-span-9 bg-white border border-outline-variant rounded-none overflow-hidden">
          {/* Day Headers */}
          <div className="grid grid-cols-7 border-b border-outline-variant">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(day => (
              <div key={day} className="p-md text-center font-label-caps text-label-caps border-r border-outline-variant last:border-r-0">{day}</div>
            ))}
          </div>
          
          {/* Calendar Cells */}
          <div className="grid grid-cols-7">
            {prevDays.map(day => (
              <div key={`prev-${day}`} className="min-h-[140px] p-sm border-r border-b border-outline-variant bg-surface-container-low opacity-40">
                <span className="font-label-sm text-label-sm">{day}</span>
              </div>
            ))}
            
            {days.map(day => (
              <div 
                key={day} 
                onClick={() => setSelectedDay(day)}
                className={`min-h-[140px] p-sm border-r border-b border-outline-variant relative group cursor-pointer transition-colors hover:bg-surface-container-low ${selectedDay === day ? 'border-primary border-2 z-20' : ''}`}
              >
                <span className={`font-label-sm text-label-sm ${selectedDay === day ? 'font-bold' : ''}`}>{String(day).padStart(2, '0')}</span>
                {events[day] && (
                  <div className="mt-xs flex flex-col gap-xs">
                    {events[day].map((evt, i) => (
                      <div key={i} className={`p-xs rounded-sm text-[10px] font-label-caps truncate ${getEventClass(evt.type)}`}>
                        {evt.label}
                      </div>
                    ))}
                  </div>
                )}
                <button className="add-task opacity-0 group-hover:opacity-100 absolute bottom-sm right-sm transition-opacity">
                  <span className="material-symbols-outlined text-sm">add_circle</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar Bento Column */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-md">
          {/* Task Details Card */}
          <div className="bg-white border border-outline-variant p-lg flex flex-col gap-md h-full">
            <div className="flex justify-between items-start">
              <h3 className="font-label-caps text-label-caps text-on-surface-variant">Selected Schedule</h3>
              <span className="material-symbols-outlined text-on-surface-variant cursor-pointer">close</span>
            </div>
            
            {selectedTasks.length > 0 ? (
              <div className="flex flex-col gap-md h-full">
                <div className="py-md border-b border-surface-variant">
                  <div className="flex items-center gap-sm mb-xs">
                    <span className="px-sm py-1 bg-primary text-on-primary text-[10px] font-label-caps rounded-sm">MANDATE</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">ID: {String(selectedTasks[0].task._id).substring(18).toUpperCase()}</span>
                  </div>
                  <h4 className="font-headline-lg text-primary text-xl">{selectedTasks[0].label}</h4>
                </div>
                <div className="space-y-md">
                  <div className="flex items-center gap-md">
                    <span className="material-symbols-outlined text-on-surface-variant">schedule</span>
                    <div>
                      <p className="font-label-sm text-label-sm font-bold text-primary">
                        {selectedDay} {currentMonth}, {selectedTasks[0].task.dueDate ? new Date(selectedTasks[0].task.dueDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "All Day"}
                      </p>
                      <p className="font-label-sm text-label-sm text-on-surface-variant">Duration: N/A</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-md">
                    <span className="material-symbols-outlined text-on-surface-variant">person</span>
                    <div>
                      <p className="font-label-sm text-label-sm font-bold text-primary">Operative {user?.name || "OP-942"}</p>
                      <p className="font-label-sm text-label-sm text-on-surface-variant">Assigned Lead</p>
                    </div>
                  </div>
                </div>
                <div className="mt-auto pt-lg space-y-sm">
                  <button className="w-full py-md bg-primary text-on-primary rounded-full font-bold transition-transform active:scale-95">Execute Now</button>
                  <button className="w-full py-md border border-outline-variant text-primary rounded-full font-bold hover:bg-surface-container-low transition-colors">Reschedule</button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-md">calendar_today</span>
                <p className="font-label-sm text-label-sm text-on-surface-variant">No active mandates for {String(selectedDay).padStart(2, '0')} {currentMonth}</p>
                <div className="mt-auto pt-lg w-full">
                  <button className="w-full py-md bg-primary text-on-primary rounded-full font-bold hover:opacity-90 transition-opacity flex justify-center items-center gap-2">
                    <span className="material-symbols-outlined text-[16px]">add</span>
                    Insert Protocol
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Upcoming Maintenance Mini-list */}
          <div className="bg-surface-container-lowest border border-outline-variant p-md">
            <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-md">System Cycles</h3>
            <div className="space-y-sm">
              <div className="flex items-center justify-between p-sm border-b border-surface-container-high">
                <div className="flex items-center gap-sm">
                  <div className="w-2 h-2 rounded-full bg-tertiary-fixed-dim"></div>
                  <span className="font-body-md text-body-md">Log Cleanup</span>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant">08:00 AM</span>
              </div>
              <div className="flex items-center justify-between p-sm border-b border-surface-container-high">
                <div className="flex items-center gap-sm">
                  <div className="w-2 h-2 rounded-full bg-tertiary-fixed-dim"></div>
                  <span className="font-body-md text-body-md">Node Rebalance</span>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant">11:30 AM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Operational Insights (Bottom Bento) */}
      <section className="mt-xl grid grid-cols-1 md:grid-cols-3 gap-lg">
        <div className="bg-white border border-outline-variant p-lg">
          <div className="flex justify-between items-center mb-md">
            <span className="material-symbols-outlined text-primary">analytics</span>
            <span className="font-label-caps text-label-caps text-on-surface-variant">Load Factor</span>
          </div>
          <div className="text-4xl font-black text-primary">82%</div>
          <div className="w-full bg-surface-container-high h-1 mt-md overflow-hidden">
            <div className="bg-primary h-full w-[82%]"></div>
          </div>
        </div>
        <div className="bg-white border border-outline-variant p-lg">
          <div className="flex justify-between items-center mb-md">
            <span className="material-symbols-outlined text-primary">warning</span>
            <span className="font-label-caps text-label-caps text-on-surface-variant">Conflicts</span>
          </div>
          <div className="text-4xl font-black text-error">03</div>
          <p className="text-xs text-on-surface-variant mt-md">Requires manual override intervention</p>
        </div>
        <div className="bg-white border border-outline-variant p-lg">
          <div className="flex justify-between items-center mb-md">
            <span className="material-symbols-outlined text-primary">update</span>
            <span className="font-label-caps text-label-caps text-on-surface-variant">Efficiency</span>
          </div>
          <div className="text-4xl font-black text-on-tertiary-container">+14%</div>
          <p className="text-xs text-on-surface-variant mt-md">Compared to Q3 operational cycle</p>
        </div>
      </section>

      {/* Floating Action Button (FAB) */}
      <button className="fixed bottom-lg right-lg w-16 h-16 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110 active:scale-95 z-50">
        <span className="material-symbols-outlined text-2xl">edit_calendar</span>
      </button>
    </AppLayout>
  );
};

export default CalendarPage;
