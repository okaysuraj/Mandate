import React from "react";
import AppLayout from "../../components/layout/AppLayout";

const OfflineModePage = () => {
  return (
    <AppLayout>
      <div className="space-y-6 sm:space-y-8 pb-16 px-4 sm:px-6 md:px-8 py-6 max-w-5xl mx-auto">
        <div className="border-b border-outline-variant/40 pb-6">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block"></span>
            <span className="font-mono text-xs uppercase font-bold text-on-surface-variant tracking-widest">
              LOCAL RESILIENCE &amp; CACHE
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-on-surface uppercase tracking-tight">
            Offline Mode
          </h1>
          <p className="text-sm text-on-surface-variant max-w-xl mt-1">
            Offline mode caches your recent workspaces locally and replays mutations upon network reconnection.
          </p>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant/60 p-6 sm:p-8 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-2xl">cloud_sync</span>
            <div>
              <h2 className="text-sm font-bold text-on-surface uppercase font-mono">AUTONOMOUS OFFLINE REPLAY</h2>
              <p className="text-xs text-on-surface-variant mt-0.5">Tasks created, status transitions, and note edits are held in IndexedDB storage.</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default OfflineModePage;
