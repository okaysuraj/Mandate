import React from "react";
import AppLayout from "../components/AppLayout";

const SmartReschedulingPage = () => {
  return (
    <AppLayout>
      <div className="space-y-lg">
        <div>
          <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">AI Layer</p>
          <h1 className="font-headline-lg text-headline-lg text-primary">Smart Rescheduling</h1>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant p-lg">
          <div className="space-y-sm">
            {['Move review block to 10:30 AM', 'Shift reporting to tomorrow', 'Preserve the deep work block'].map((item) => (
              <div key={item} className="border border-outline-variant p-md">{item}</div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default SmartReschedulingPage;
