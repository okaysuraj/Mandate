import React from "react";
import { Link } from "react-router";
import AppLayout from "../../components/layout/AppLayout";

const SmartReschedulingPage = () => {
  const recommendations = [
    { title: 'Move review block to 10:30 AM', reason: 'Resolves calendar conflict with sprint retrospective', delta: '+45 min buffer', impact: 'OPTIMAL' },
    { title: 'Shift reporting to tomorrow', reason: 'Deep work block protected from mid-day context switching', delta: 'Preserves 2h focus', impact: 'RECOMMENDED' },
    { title: 'Preserve deep work block', reason: 'Lock 2:00 PM - 5:00 PM focus corridor against spontaneous invites', delta: 'Zero interruptions', impact: 'LOCKED' }
  ];

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto w-full px-4 md:px-6 py-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant pb-5">
          <div>
            <p className="font-label-caps text-xs text-on-surface-variant uppercase tracking-wider">AI Layer</p>
            <h1 className="font-headline-lg text-2xl md:text-3xl font-extrabold text-on-surface tracking-tight">Smart Rescheduling</h1>
            <p className="text-xs md:text-sm text-on-surface-variant font-mono mt-1">DYNAMIC CALENDAR &amp; CONFLICT RESOLUTION ENGINE</p>
          </div>
          <Link
            to="/calendar"
            className="min-h-[44px] px-4 py-2.5 bg-primary text-on-primary font-label-caps text-xs rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-base">calendar_month</span>
            VIEW CALENDAR
          </Link>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant p-5 md:p-6 rounded-2xl shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono font-bold uppercase text-on-surface-variant tracking-wider">AI Schedule Optimizations</h2>
            <span className="text-xs font-mono text-on-surface-variant">3 SUGGESTIONS</span>
          </div>
          <div className="space-y-3">
            {recommendations.map((item) => (
              <div 
                key={item.title} 
                className="bg-surface-container/60 hover:bg-surface-container border border-outline-variant p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-on-surface">{item.title}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant border border-outline-variant">
                      {item.impact}
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-1">{item.reason}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-tertiary">{item.delta}</span>
                  <button className="min-h-[36px] text-xs font-mono font-semibold py-1.5 px-3 rounded-lg bg-primary text-on-primary hover:opacity-90 transition-opacity">
                    APPLY
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default SmartReschedulingPage;
