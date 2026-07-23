import React from "react";
import AppLayout from "../../components/layout/AppLayout";

const MaintenanceDowntimePage = () => {
  return (
    <AppLayout>
      <div className="space-y-lg">
        <div>
          <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">Reliability Layer</p>
          <h1 className="font-headline-lg text-headline-lg text-primary">Maintenance & Downtime</h1>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant p-lg">
          <div className="space-y-sm">
            {['Scheduled patch — 22:00 UTC', 'Maintenance window — 45 mins', 'No active incidents'].map((item) => (
              <div key={item} className="border border-outline-variant p-md">{item}</div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default MaintenanceDowntimePage;
