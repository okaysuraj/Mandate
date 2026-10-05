import React from "react";
import AppLayout from "../../components/layout/AppLayout";
import { Link } from "react-router";

const TeamHealthPage = () => {
  const metrics = [
    { label: "CONFIDENCE PULSE", score: "8.8 / 10", trend: "+0.4 this sprint", status: "Optimal", color: "text-primary" },
    { label: "BURNOUT RESISTANCE", score: "92%", trend: "Stable", status: "Healthy", color: "text-tertiary" },
    { label: "CROSS-POD ALIGNMENT", score: "86%", trend: "+5% vs Q2", status: "Improving", color: "text-primary" },
    { label: "FOCUS TIME RATIO", score: "68%", trend: "3.4h/day avg", status: "Nominal", color: "text-on-surface" },
  ];

  const teamFeedback = [
    {
      category: "DELIVERY CONFIDENCE",
      level: "High (94%)",
      summary: "Sprint commitments are realistic and dependencies across backend/frontend teams are clear.",
      trend: "upward",
    },
    {
      category: "WORKLOAD DISTRIBUTION",
      level: "Balanced",
      summary: "No single engineer currently exceeds 85% allocated capacity. Peer reviews evenly distributed.",
      trend: "stable",
    },
    {
      category: "WELLNESS & PSYCHOLOGICAL SAFETY",
      level: "Strong",
      summary: "Retrospectives show high constructive feedback engagement with zero unaddressed friction reports.",
      trend: "upward",
    },
    {
      category: "MEETING LOAD HYGIENE",
      level: "Moderate",
      summary: "No-meeting Thursdays actively protected. 91% adherence across product and engineering groups.",
      trend: "stable",
    },
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
                CULTURE &amp; SUSTAINABILITY
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-on-surface uppercase tracking-tight">
              Team Health &amp; Pulse
            </h1>
            <p className="text-sm text-on-surface-variant max-w-xl mt-1">
              Holistic insights into team velocity, cognitive load, psychological safety, and sustainability.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/workspace"
              className="px-5 py-2.5 border border-outline-variant rounded-xl font-mono text-xs font-bold text-on-surface hover:bg-surface-container transition-colors block text-center"
            >
              WORKSPACE ROSTER
            </Link>
            <Link
              to="/team"
              className="px-5 py-2.5 bg-primary text-on-primary rounded-xl font-mono text-xs font-bold shadow-md hover:opacity-90 active:scale-95 transition-all block text-center uppercase"
            >
              WORKLOAD METRICS
            </Link>
          </div>
        </div>

        {/* Top Metric Gauges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {metrics.map((m) => (
            <div key={m.label} className="bg-surface-container-lowest border border-outline-variant/60 p-5 sm:p-6 rounded-2xl shadow-sm flex flex-col justify-between">
              <span className="font-mono text-xs font-bold text-on-surface-variant uppercase">{m.label}</span>
              <div className="my-3">
                <span className={`text-2xl sm:text-3xl font-black font-mono ${m.color}`}>{m.score}</span>
                <span className="block text-xs font-medium text-on-surface-variant mt-1">{m.trend}</span>
              </div>
              <div className="pt-3 border-t border-outline-variant/40 flex items-center justify-between text-[11px] font-mono uppercase">
                <span className="text-on-surface-variant">Status</span>
                <span className="font-bold text-primary">{m.status}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Health Dimensions Bento */}
        <div className="bg-surface-container-lowest border border-outline-variant/60 p-6 sm:p-8 rounded-2xl shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-on-surface">Health Pulse Dimensions</h2>
              <p className="text-xs text-on-surface-variant mt-0.5">Bi-weekly anonymous pulse survey aggregations</p>
            </div>
            <span className="font-mono text-xs text-primary font-bold bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
              HEALTHY COHORT
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-2">
            {teamFeedback.map((item) => (
              <div key={item.category} className="p-5 bg-surface-container-low border border-outline-variant/60 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-primary uppercase">{item.category}</span>
                  <span className="text-xs font-bold text-on-surface bg-surface-container-high px-2.5 py-0.5 rounded-full border border-outline-variant">
                    {item.level}
                  </span>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed">{item.summary}</p>
                <div className="flex items-center gap-1.5 text-xs text-primary font-mono pt-1">
                  <span className="material-symbols-outlined text-base">trending_up</span>
                  <span>Positive trajectory across past 3 retrospectives</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default TeamHealthPage;
