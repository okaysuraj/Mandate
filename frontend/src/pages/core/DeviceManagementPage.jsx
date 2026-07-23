import React from "react";
import AppLayout from "../../components/layout/AppLayout";

const DeviceManagementPage = () => {
  return (
    <AppLayout>
      <div className="space-y-lg">
        <div>
          <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">Operations Layer</p>
          <h1 className="font-headline-lg text-headline-lg text-primary">Device Management</h1>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant p-lg">
          <div className="space-y-sm">
            {['Laptop 01 — healthy', 'Tablet 03 — update pending', 'Phone 02 — synced'].map((device) => (
              <div key={device} className="border border-outline-variant p-md">{device}</div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default DeviceManagementPage;
