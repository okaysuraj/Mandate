import React from "react";
import { Link } from "react-router";
import AppLayout from "../../components/layout/AppLayout";

const AutomationCenterPage = () => {
  const centers = [
    { title: 'Auto-prioritize tasks', desc: 'Dynamically recompute task priorities based on deadline proximity and blocker dependencies.', icon: 'auto_graph' },
    { title: 'Reminder flows', desc: 'Trigger periodic nudges for overdue and stalled action items across Slack, Email, and Push.', icon: 'notifications_active' },
    { title: 'Sync with calendar', desc: 'Harmonize schedule blocks with Google Calendar, Outlook, and Apple iCal in real time.', icon: 'sync' }
  ];

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto w-full px-4 md:px-6 py-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant pb-5">
          <div>
            <p className="font-label-caps text-xs text-on-surface-variant uppercase tracking-wider">Automation Layer</p>
            <h1 className="font-headline-lg text-2xl md:text-3xl font-extrabold text-on-surface tracking-tight">Automation Center</h1>
            <p className="text-xs md:text-sm text-on-surface-variant font-mono mt-1">CENTRAL INTEGRATION &amp; WORKFLOW COMMAND</p>
          </div>
          <Link
            to="/automations"
            className="min-h-[44px] px-4 py-2.5 bg-primary text-on-primary font-label-caps text-xs rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-base">settings_suggest</span>
            MANAGE PROTOCOLS
          </Link>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant p-5 md:p-6 rounded-2xl shadow-xs space-y-4">
          <h2 className="text-xs font-mono font-bold uppercase text-on-surface-variant tracking-wider">Core Workflow Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {centers.map((item) => (
              <div 
                key={item.title} 
                className="bg-surface-container/60 hover:bg-surface-container border border-outline-variant p-5 rounded-xl flex flex-col justify-between gap-3 transition-colors"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-surface-container-high border border-outline-variant flex items-center justify-center text-primary mb-3">
                    <span className="material-symbols-outlined">{item.icon}</span>
                  </div>
                  <h3 className="font-mono text-sm font-bold text-on-surface">{item.title}</h3>
                  <p className="text-xs text-on-surface-variant mt-1.5">{item.desc}</p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-outline-variant/50">
                  <span className="text-[10px] font-mono text-on-surface-variant uppercase">MODULE ACTIVE</span>
                  <span className="w-2 h-2 rounded-full bg-tertiary" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default AutomationCenterPage;
