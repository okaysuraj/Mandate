import React from "react";
import AppLayout from "../../components/layout/AppLayout";
import { Link } from "react-router";

const FocusSummaryPage = () => {
  const stats = [
    { label: "DEEP WORK MINUTES", value: "180", unit: "MIN", icon: "timer" },
    { label: "INTERRUPTIONS MITIGATED", value: "3", unit: "EVENTS", icon: "shield" },
    { label: "COGNITIVE PULSE SCORE", value: "8.7", unit: "/10", icon: "psychology" },
  ];

  return (
    <AppLayout>
      <div className="space-y-6 sm:space-y-8 pb-16 px-4 sm:px-6 md:px-8 py-6 max-w-5xl mx-auto">
        <div className="border-b border-outline-variant/40 pb-6">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block"></span>
            <span className="font-mono text-xs uppercase font-bold text-on-surface-variant tracking-widest">
              ATTENTION METRICS
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-on-surface uppercase tracking-tight">
            Focus Summary
          </h1>
          <p className="text-sm text-on-surface-variant max-w-xl mt-1">
            Telemetry from completed focus intervals, attention depth, and flow preservation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((item) => (
            <div key={item.label} className="bg-surface-container-lowest border border-outline-variant/60 p-6 sm:p-8 rounded-2xl shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-bold text-on-surface-variant uppercase">{item.label}</span>
                <span className="material-symbols-outlined text-primary text-xl">{item.icon}</span>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-black text-on-surface font-mono">{item.value}</span>
                <span className="font-mono text-xs font-bold text-on-surface-variant ml-1.5 uppercase">{item.unit}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-2">
          <Link
            to="/focus"
            className="px-6 py-3 bg-primary text-on-primary rounded-xl font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all shadow-md"
          >
            START NEW FOCUS SESSION
          </Link>
        </div>
      </div>
    </AppLayout>
  );
};

export default FocusSummaryPage;
