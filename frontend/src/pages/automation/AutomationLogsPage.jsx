import React from "react";
import AppLayout from "../../components/layout/AppLayout";

const AutomationLogsPage = () => {
  return (
    <AppLayout>
      <div className="space-y-lg">
        <div>
          <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">Automation Layer</p>
          <h1 className="font-headline-lg text-headline-lg text-primary">Automation Logs</h1>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant p-lg">
          <div className="space-y-sm">
            {['09:15 — Rule fired: priority escalation', '09:40 — Rule fired: reminder batch', '10:05 — Rule fired: assignment sync'].map((entry) => (
              <div key={entry} className="border border-outline-variant p-md">{entry}</div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default AutomationLogsPage;
