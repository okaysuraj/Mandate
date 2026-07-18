import React from "react";
import AppLayout from "../components/AppLayout";

const DailyPlanningPage = () => {
  return (
    <AppLayout>
      <div className="space-y-lg">
        <div>
          <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">Planning Layer</p>
          <h1 className="font-headline-lg text-headline-lg text-primary">Daily Planning</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
          <div className="bg-surface-container-lowest border border-outline-variant p-lg">
            <h2 className="font-headline-lg text-primary mb-md">Focus Blocks</h2>
            <div className="space-y-sm">
              {['Deep work', 'Admin review', 'Follow-ups'].map((item) => (
                <div key={item} className="border border-outline-variant p-md">{item}</div>
              ))}
            </div>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant p-lg">
            <h2 className="font-headline-lg text-primary mb-md">Calendar Sync</h2>
            <p className="text-on-surface-variant">Your top three priorities are aligned with today’s schedule.</p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default DailyPlanningPage;
