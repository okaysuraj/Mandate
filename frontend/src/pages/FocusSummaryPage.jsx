import React from "react";
import AppLayout from "../components/AppLayout";

const FocusSummaryPage = () => {
  return (
    <AppLayout>
      <div className="space-y-lg">
        <div>
          <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">Focus Layer</p>
          <h1 className="font-headline-lg text-headline-lg text-primary">Focus Summary</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
          {[
            { label: 'Deep Work Minutes', value: '180' },
            { label: 'Interruptions', value: '3' },
            { label: 'Mood Score', value: '8.7/10' },
          ].map((item) => (
            <div key={item.label} className="bg-surface-container-lowest border border-outline-variant p-lg">
              <p className="font-label-caps text-label-caps text-on-surface-variant">{item.label}</p>
              <p className="font-headline-lg text-primary mt-sm">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default FocusSummaryPage;
