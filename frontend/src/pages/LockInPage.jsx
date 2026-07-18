import React from "react";
import AppLayout from "../components/AppLayout";

const LockInPage = () => {
  return (
    <AppLayout>
      <div className="space-y-lg">
        <div>
          <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">Execution Layer</p>
          <h1 className="font-headline-lg text-headline-lg text-primary">Lock In</h1>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant p-lg">
          <h2 className="font-headline-lg text-primary mb-md">Current Sprint</h2>
          <div className="space-y-sm">
            {['Review costs', 'Prepare handoff', 'Send updates'].map((item) => (
              <div key={item} className="flex items-center justify-between border border-outline-variant p-md">
                <span>{item}</span>
                <span className="text-label-sm text-on-surface-variant">Ready</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default LockInPage;
