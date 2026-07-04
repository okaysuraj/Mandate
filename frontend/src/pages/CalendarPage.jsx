import React, { useState } from "react";
import AppLayout from "../components/AppLayout";

const CalendarPage = () => {
  const [selectedDay, setSelectedDay] = useState(2);
  const currentMonth = "October 2024";

  // Generate days (simplified)
  const prevDays = [28, 29, 30];
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const events = {
    1: [{ label: "SYS_CHECK_04", type: "default" }],
    2: [{ label: "CALIBRATION_X", type: "primary" }, { label: "MECH_VAL", type: "default" }],
    4: [{ label: "LOG_AUDIT", type: "outline" }],
    11: [{ label: "MAINT_WINDOW", type: "error" }],
  };

  const getEventClass = (type) => {
    switch (type) {
      case "primary": return "bg-primary text-on-primary";
      case "error": return "bg-error-container text-on-error-container";
      case "outline": return "border border-outline-variant text-on-secondary-container";
      default: return "bg-surface-container-high text-on-secondary-container";
    }
  };

  return (
    <AppLayout>
      <div className="flex-1 flex overflow-hidden">
        {/* Calendar Grid Area */}
        <section className="flex-1 overflow-y-auto p-lg custom-scrollbar">
          <div className="flex justify-between items-end mb-lg">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-primary">{currentMonth}</h2>
              <p className="font-label-caps text-label-caps text-on-secondary-container">Protocol Schedule: Phase 04</p>
            </div>
            <div className="flex gap-sm">
              <button className="p-2 border border-outline-variant rounded-full hover:bg-surface-container-low transition-colors">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="p-2 border border-outline-variant rounded-full hover:bg-surface-container-low transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
              <button className="px-md py-sm border border-outline-variant rounded-full font-label-caps text-label-caps hover:bg-surface-container-low transition-colors">
                Today
              </button>
            </div>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 border-b border-outline-variant mb-2">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(day => (
              <div key={day} className="py-2 text-center font-label-caps text-label-caps text-on-primary-container">{day}</div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="calendar-grid border-l border-t border-outline-variant bg-outline-variant gap-[1px]">
            {/* Previous month days */}
            {prevDays.map(d => (
              <div key={`prev-${d}`} className="bg-surface-container-low p-md flex flex-col">
                <span className="font-label-sm text-label-sm text-on-primary-container opacity-50">{d}</span>
              </div>
            ))}
            {/* Current month days */}
            {days.map(day => (
              <div
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`bg-surface-container-lowest p-md flex flex-col gap-sm cursor-pointer transition-colors hover:bg-surface-container ${
                  selectedDay === day ? "border-2 border-primary relative z-10" : ""
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className={`font-label-sm text-label-sm text-primary ${selectedDay === day ? "font-bold" : ""}`}>{String(day).padStart(2, '0')}</span>
                  {events[day] && (
                    <div className="flex gap-1">
                      {events[day].map((_, i) => (
                        <span key={i} className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                      ))}
                    </div>
                  )}
                </div>
                {events[day] && (
                  <div className="flex flex-col gap-xs">
                    {events[day].map((evt, i) => (
                      <div key={i} className={`px-2 py-0.5 rounded text-[10px] font-label-caps truncate ${getEventClass(evt.type)}`}>
                        {evt.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Details Sidebar */}
        <aside className="hidden lg:flex w-80 bg-surface border-l border-outline-variant p-lg flex-col gap-lg custom-scrollbar overflow-y-auto">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-headline-lg text-[20px] text-primary">
                {new Date(2024, 9, selectedDay).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: '2-digit' })}
              </h3>
              <p className="font-label-caps text-label-caps text-on-primary-container">Industrial Lifecycle: Active</p>
            </div>
          </div>

          {/* Scheduled Operations */}
          <div>
            <h4 className="font-label-caps text-label-caps text-on-secondary-container mb-md flex items-center gap-2">
              <span className="w-1 h-1 bg-primary rounded-full"></span>
              Scheduled Operations
            </h4>
            <div className="flex flex-col gap-md">
              {events[selectedDay] ? (
                events[selectedDay].map((evt, i) => (
                  <div key={i} className="p-md bg-surface-container-lowest border border-outline-variant rounded-md">
                    <div className="flex justify-between items-start mb-xs">
                      <span className="font-label-caps text-[10px] text-on-primary-container">08:00 — 10:30</span>
                      <span className="font-label-caps text-[10px] px-1.5 py-0.5 bg-primary-fixed-dim text-on-primary-fixed rounded">CRITICAL</span>
                    </div>
                    <h5 className="font-body-md font-bold text-primary mb-1">{evt.label} Protocol</h5>
                    <p className="font-label-sm text-label-sm text-on-secondary-container">Standard alignment and verification procedure.</p>
                  </div>
                ))
              ) : (
                <p className="font-label-sm text-label-sm text-on-surface-variant">No operations scheduled</p>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-auto pt-lg border-t border-outline-variant">
            <button className="w-full py-md px-md bg-surface-container-low border border-outline-variant rounded-full font-label-caps text-label-caps text-primary hover:bg-surface-container transition-colors mb-sm flex justify-center items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">edit</span>
              Edit Schedule
            </button>
            <button className="w-full py-md px-md bg-primary text-on-primary rounded-full font-label-caps text-label-caps hover:opacity-90 transition-opacity flex justify-center items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">add</span>
              Insert Protocol
            </button>
          </div>
        </aside>
      </div>
    </AppLayout>
  );
};

export default CalendarPage;
