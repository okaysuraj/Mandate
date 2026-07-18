import React from "react";
import AppLayout from "../components/AppLayout";

const FocusModePage = () => {
  return (
    <AppLayout>
      <div className="space-y-lg">
        <div>
          <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">Attention Layer</p>
          <h1 className="font-headline-lg text-headline-lg text-primary">Focus Mode</h1>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant p-lg">
          <p className="text-on-surface-variant">A distraction-light workspace for deep work with time-boxed sessions and priority cues.</p>
        </div>
      </div>
    </AppLayout>
  );
};

export default FocusModePage;
