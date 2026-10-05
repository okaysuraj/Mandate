import React from "react";
import { Link } from "react-router";
import AppLayout from "../../components/layout/AppLayout";

const AutomationRulesPage = () => {
  const rules = [
    { title: 'Auto-assign urgent tasks', desc: 'When priority changes to CRITICAL, dispatch to lead engineer', active: true, tag: 'TRIGGER: PRIORITY' },
    { title: 'Escalate overdue items', desc: 'When due date passes by >24h, elevate priority to HIGH', active: true, tag: 'TRIGGER: TIME_DELTA' },
    { title: 'Notify on blocker state', desc: 'Broadcast alert to workspace channel when status moves to BLOCKED', active: false, tag: 'TRIGGER: STATUS' }
  ];

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto w-full px-4 md:px-6 py-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant pb-5">
          <div>
            <p className="font-label-caps text-xs text-on-surface-variant uppercase tracking-wider">Automation Layer</p>
            <h1 className="font-headline-lg text-2xl md:text-3xl font-extrabold text-on-surface tracking-tight">Automation Rules</h1>
            <p className="text-xs md:text-sm text-on-surface-variant font-mono mt-1">SYSTEM TRIGGER &amp; DISPATCH DIRECTORY</p>
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
          <h2 className="text-xs font-mono font-bold uppercase text-on-surface-variant tracking-wider">Active Execution Rules</h2>
          <div className="space-y-3">
            {rules.map((rule) => (
              <div 
                key={rule.title} 
                className="bg-surface-container/60 hover:bg-surface-container border border-outline-variant p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-on-surface">{rule.title}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant border border-outline-variant">
                      {rule.tag}
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-1">{rule.desc}</p>
                </div>
                <div>
                  {rule.active ? (
                    <span className="px-2.5 py-1 bg-tertiary-container text-on-tertiary-container border border-outline-variant rounded-full text-[10px] font-bold tracking-widest uppercase">
                      ACTIVE
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 bg-surface-container-high text-on-surface-variant border border-outline-variant rounded-full text-[10px] font-bold tracking-widest uppercase">
                      INACTIVE
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default AutomationRulesPage;
