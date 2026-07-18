import React from "react";
import AppLayout from "../components/AppLayout";

const CapacityPlanningPage = () => {
  return (
    <AppLayout>
      <div className="space-y-lg">
        <div>
          <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">Operations Layer</p>
          <h1 className="font-headline-lg text-headline-lg text-primary">Capacity Planning</h1>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant p-lg">
          <div className="space-y-sm">
            {['Team bandwidth overview', 'Upcoming workload peaks', 'Hiring recommendations'].map((item) => (
              <div key={item} className="border border-outline-variant p-md">{item}</div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default CapacityPlanningPage;
