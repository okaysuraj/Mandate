import React from "react";
import AppLayout from "../components/AppLayout";

const GoalTimelinePage = () => {
  return (
    <AppLayout>
      <div className="space-y-lg">
        <div>
          <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">Strategy Layer</p>
          <h1 className="font-headline-lg text-headline-lg text-primary">Goal Timeline</h1>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant p-lg">
          <div className="space-y-sm">
            {['Q3 launch milestones', 'Customer onboarding checkpoints', 'Quarterly review cadence'].map((item) => (
              <div key={item} className="border border-outline-variant p-md">{item}</div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default GoalTimelinePage;
