import React from "react";
import AppLayout from "../../components/layout/AppLayout";

const TaskBreakdownPage = () => {
  return (
    <AppLayout>
      <div className="space-y-lg">
        <div>
          <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">AI Layer</p>
          <h1 className="font-headline-lg text-headline-lg text-primary">Task Breakdown</h1>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant p-lg">
          <div className="space-y-sm">
            {['Capture requirements', 'Outline design draft', 'Validate with stakeholders'].map((item) => (
              <div key={item} className="border border-outline-variant p-md">{item}</div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default TaskBreakdownPage;
