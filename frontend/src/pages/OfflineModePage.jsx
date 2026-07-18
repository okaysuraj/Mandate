import React from "react";
import AppLayout from "../components/AppLayout";

const OfflineModePage = () => {
  return (
    <AppLayout>
      <div className="space-y-lg">
        <div>
          <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">Reliability Layer</p>
          <h1 className="font-headline-lg text-headline-lg text-primary">Offline Mode</h1>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant p-lg">
          <p className="text-on-surface-variant">Offline mode keeps your recent actions available locally and syncs when you reconnect.</p>
        </div>
      </div>
    </AppLayout>
  );
};

export default OfflineModePage;
