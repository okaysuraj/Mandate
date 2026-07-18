import React from "react";
import AppLayout from "../components/AppLayout";

const WorkspaceAuditPage = () => {
  return (
    <AppLayout>
      <div className="space-y-lg">
        <div>
          <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">Governance Layer</p>
          <h1 className="font-headline-lg text-headline-lg text-primary">Workspace Audit</h1>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant p-lg">
          <div className="space-y-sm">
            {['Access review complete', 'Stale automations flagged', 'Security recommendations ready'].map((item) => (
              <div key={item} className="border border-outline-variant p-md">{item}</div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default WorkspaceAuditPage;
