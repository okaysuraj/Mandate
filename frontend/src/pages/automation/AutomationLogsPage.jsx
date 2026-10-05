import React from "react";
import { Link } from "react-router";
import AppLayout from "../../components/layout/AppLayout";

const AutomationLogsPage = () => {
  const logEntries = [
    { time: '10:05:22 UTC', rule: 'Rule fired: assignment sync', status: 'SUCCESS', target: 'MANDATE-884' },
    { time: '09:40:11 UTC', rule: 'Rule fired: reminder batch', status: 'SUCCESS', target: '4 Recipient Nodes' },
    { time: '09:15:02 UTC', rule: 'Rule fired: priority escalation', status: 'SUCCESS', target: 'MANDATE-912' },
    { time: '08:00:00 UTC', rule: 'Rule fired: daily rollover checkpoint', status: 'SUCCESS', target: 'System Broadcaster' }
  ];

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto w-full px-4 md:px-6 py-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant pb-5">
          <div>
            <p className="font-label-caps text-xs text-on-surface-variant uppercase tracking-wider">Automation Layer</p>
            <h1 className="font-headline-lg text-2xl md:text-3xl font-extrabold text-on-surface tracking-tight">Automation Logs</h1>
            <p className="text-xs md:text-sm text-on-surface-variant font-mono mt-1">TELEMETRY &amp; DISPATCH AUDIT TRAIL</p>
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
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono font-bold uppercase text-on-surface-variant tracking-wider">Recent Executions</h2>
            <span className="text-xs font-mono text-tertiary flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-ping" />
              STREAMING
            </span>
          </div>
          <div className="space-y-2.5">
            {logEntries.map((entry, idx) => (
              <div 
                key={idx} 
                className="bg-surface-container/60 hover:bg-surface-container border border-outline-variant p-3.5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 transition-colors font-mono text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-on-surface-variant opacity-75">{entry.time}</span>
                  <span className="text-primary font-bold">&bull;</span>
                  <span className="text-on-surface font-semibold">{entry.rule}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-on-surface-variant bg-surface-container px-2 py-0.5 rounded border border-outline-variant text-[11px]">
                    {entry.target}
                  </span>
                  <span className="px-2 py-0.5 bg-tertiary-container text-on-tertiary-container border border-outline-variant rounded-full text-[10px] font-bold">
                    {entry.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default AutomationLogsPage;
