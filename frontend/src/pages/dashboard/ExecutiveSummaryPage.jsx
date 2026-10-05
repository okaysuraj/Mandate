import React from "react";
import AppLayout from "../../components/layout/AppLayout";
import { Link } from "react-router";

const ExecutiveSummaryPage = () => {
  const kpis = [
    { label: "DELIVERY VELOCITY", value: "94.2%", change: "+3.8%", positive: true, icon: "speed" },
    { label: "STRATEGIC ALIGNMENT", value: "98.0%", change: "+1.2%", positive: true, icon: "target" },
    { label: "ACTIVE RISK INDEX", value: "LOW (02)", change: "-1 risk", positive: true, icon: "shield" },
    { label: "CAPACITY UTILIZATION", value: "82.5%", change: "Nominal", positive: true, icon: "pie_chart" },
  ];

  const strategicPriorities = [
    {
      title: "Q3 Core Infrastructure Migration",
      owner: "Elena Rostova",
      deadline: "Oct 15, 2026",
      progress: 88,
      status: "ON TRACK",
      statusClass: "bg-tertiary-container text-on-tertiary-container",
    },
    {
      title: "Real-Time WebSocket Protocol Layer",
      owner: "Alex Chen",
      deadline: "Oct 22, 2026",
      progress: 65,
      status: "IN PROGRESS",
      statusClass: "bg-primary/10 text-primary border border-primary/20",
    },
    {
      title: "Automated Governance & Compliance Audit",
      owner: "Sarah Jenkins",
      deadline: "Nov 01, 2026",
      progress: 40,
      status: "IN REVIEW",
      statusClass: "bg-secondary-container text-on-secondary-container",
    },
  ];

  const highlights = [
    { type: "WIN", title: "Sub-100ms sync latency milestone reached across all production regions.", time: "2 hours ago" },
    { type: "DECISION", title: "Architecture board approved unified GraphQL/gRPC data federation pipeline.", time: "Yesterday" },
    { type: "SIGNAL", title: "Enterprise seat allocation hit 85% capacity threshold for West Coast cluster.", time: "2 days ago" },
  ];

  return (
    <AppLayout>
      <div className="space-y-6 sm:space-y-8 pb-16 px-4 sm:px-6 md:px-8 py-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-outline-variant/40 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block"></span>
              <span className="font-mono text-xs uppercase font-bold text-on-surface-variant tracking-widest">
                LEADERSHIP &amp; STRATEGY
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-on-surface uppercase tracking-tight">
              Executive Summary
            </h1>
            <p className="text-sm text-on-surface-variant max-w-xl mt-1">
              High-level telemetry on organizational mandates, strategic health, and operational velocity.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/goals"
              className="px-5 py-2.5 border border-outline-variant rounded-xl font-mono text-xs font-bold text-on-surface hover:bg-surface-container transition-colors block text-center"
            >
              STRATEGIC GOALS
            </Link>
            <Link
              to="/team"
              className="px-5 py-2.5 bg-primary text-on-primary rounded-xl font-mono text-xs font-bold shadow-md hover:opacity-90 active:scale-95 transition-all block text-center uppercase"
            >
              TEAM HEALTH
            </Link>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="bg-surface-container-lowest border border-outline-variant/60 p-5 sm:p-6 rounded-2xl shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-bold text-on-surface-variant uppercase">{kpi.label}</span>
                <span className="material-symbols-outlined text-primary text-xl">{kpi.icon}</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl sm:text-3xl font-black text-on-surface font-mono">{kpi.value}</span>
                <span className={`font-mono text-xs font-bold ${kpi.positive ? 'text-primary' : 'text-error'}`}>
                  {kpi.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bento Grid: Priorities & Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Strategic Priorities */}
          <div className="lg:col-span-8 bg-surface-container-lowest border border-outline-variant/60 p-6 sm:p-8 rounded-2xl shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-on-surface">Top Strategic Mandates</h2>
                <p className="text-xs text-on-surface-variant mt-0.5">Critical-path deliverables for the current execution cycle</p>
              </div>
              <span className="font-mono text-xs text-primary font-bold">{strategicPriorities.length} ACTIVE</span>
            </div>

            <div className="space-y-4">
              {strategicPriorities.map((item) => (
                <div key={item.title} className="p-4 sm:p-5 bg-surface-container-low border border-outline-variant/60 rounded-xl space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-sm font-bold text-on-surface">{item.title}</span>
                    <span className={`font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase self-start sm:self-auto ${item.statusClass}`}>
                      {item.status}
                    </span>
                  </div>
                  <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: `${item.progress}%` }}></div>
                  </div>
                  <div className="flex justify-between items-center text-xs text-on-surface-variant font-mono">
                    <span>Owner: {item.owner}</span>
                    <span>Due: {item.deadline} ({item.progress}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Wins & Highlights */}
          <div className="lg:col-span-4 bg-surface-container-lowest border border-outline-variant/60 p-6 sm:p-8 rounded-2xl shadow-sm space-y-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-primary text-xl">insights</span>
                <h3 className="text-xl font-bold text-on-surface">Operational Signals</h3>
              </div>
              <p className="text-xs text-on-surface-variant">Real-time decisions and breakthrough moments</p>

              <div className="space-y-4 mt-6">
                {highlights.map((h, i) => (
                  <div key={i} className="p-3.5 bg-surface-container-low border border-outline-variant/40 rounded-xl space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase font-bold text-primary px-2 py-0.5 bg-primary/10 rounded-full">
                        {h.type}
                      </span>
                      <span className="text-[10px] text-on-surface-variant/70 font-mono">{h.time}</span>
                    </div>
                    <p className="text-xs text-on-surface font-medium pt-1 leading-snug">{h.title}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-outline-variant/40">
              <Link to="/reports" className="w-full py-2.5 bg-surface-container-high hover:bg-surface-container-highest text-primary border border-outline-variant/60 rounded-xl font-mono text-xs font-bold uppercase transition-colors flex items-center justify-center gap-2">
                FULL BRIEFING DOSSIER <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ExecutiveSummaryPage;
