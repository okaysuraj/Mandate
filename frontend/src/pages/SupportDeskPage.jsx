import React from "react";
import AppLayout from "../components/AppLayout";

const SupportDeskPage = () => {
  return (
    <AppLayout>
      <div className="space-y-lg">
        <div>
          <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">Service Layer</p>
          <h1 className="font-headline-lg text-headline-lg text-primary">Support Desk</h1>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant p-lg">
          <div className="space-y-sm">
            {['Open tickets', 'Pending follow-up', 'Resolved today'].map((item) => (
              <div key={item} className="border border-outline-variant p-md">{item}</div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default SupportDeskPage;
