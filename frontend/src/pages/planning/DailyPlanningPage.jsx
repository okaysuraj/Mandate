import React from "react";
import AppLayout from "../../components/layout/AppLayout";
import { Link } from "react-router";

const DailyPlanningPage = () => {
  return (
    <AppLayout>
      <div className="space-y-6 sm:space-y-8 pb-16 px-4 sm:px-6 md:px-8 py-6 max-w-5xl mx-auto">
        <div className="border-b border-outline-variant/40 pb-6">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block"></span>
            <span className="font-mono text-xs uppercase font-bold text-on-surface-variant tracking-widest">
              SCHEDULE &amp; TIME-BOXING
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-on-surface uppercase tracking-tight">
            Daily Planning
          </h1>
          <p className="text-sm text-on-surface-variant max-w-xl mt-1">
            Map out time-boxed focus windows, sync calendar commitments, and establish top priorities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-surface-container-lowest border border-outline-variant/60 p-6 sm:p-8 rounded-2xl shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-outline-variant/30">
              <h2 className="text-sm font-bold text-on-surface uppercase font-mono tracking-wider">
                TIME-BOXED FOCUS BLOCKS
              </h2>
              <span className="font-mono text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                3 BLOCKS
              </span>
            </div>
            <div className="space-y-3">
              {[
                { time: "09:00 - 11:30", label: "Deep Work: Core Architecture Sprint" },
                { time: "13:00 - 14:00", label: "Admin & Async Slack Reviews" },
                { time: "15:30 - 17:00", label: "Code Review & Quality Gateways" },
              ].map((item) => (
                <div key={item.time} className="p-4 bg-surface-container-low border border-outline-variant/60 rounded-xl space-y-1">
                  <span className="font-mono text-[10px] uppercase font-bold text-primary">{item.time}</span>
                  <p className="text-xs font-bold text-on-surface">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant/60 p-6 sm:p-8 rounded-2xl shadow-sm space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-outline-variant/30">
                <h2 className="text-sm font-bold text-on-surface uppercase font-mono tracking-wider">
                  CALENDAR &amp; CADENCE SYNC
                </h2>
                <span className="material-symbols-outlined text-primary text-base">sync</span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed mt-4">
                Your top 3 strategic priorities are harmoniously scheduled with your external calendar, allocating zero conflicting meetings during designated flow state windows.
              </p>
            </div>
            <Link
              to="/calendar"
              className="w-full py-3 bg-primary text-on-primary rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-center block hover:opacity-90 active:scale-95 transition-all shadow-xs"
            >
              OPEN FULL CALENDAR
            </Link>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default DailyPlanningPage;
