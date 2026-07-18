import React from "react";
import AppLayout from "../components/AppLayout";

const IncidentLogPage = () => {
  return (
    <AppLayout>
      <div className="space-y-lg">
        <div>
          <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">Operations Layer</p>
          <h1 className="font-headline-lg text-headline-lg text-primary">Incident Log</h1>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant p-lg">
          <div className="space-y-sm">
            {['Latency spike resolved', 'Recovering from sync issue', 'Monitoring alerts normalized'].map((item) => (
              <div key={item} className="border border-outline-variant p-md">{item}</div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default IncidentLogPage;
