import React from "react";
import AppLayout from "../components/AppLayout";

const CustomerJourneyPage = () => {
  return (
    <AppLayout>
      <div className="space-y-lg">
        <div>
          <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">Customer Layer</p>
          <h1 className="font-headline-lg text-headline-lg text-primary">Customer Journey</h1>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant p-lg">
          <div className="space-y-sm">
            {['Discovery', 'Onboarding', 'Adoption', 'Expansion'].map((item) => (
              <div key={item} className="border border-outline-variant p-md">{item}</div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default CustomerJourneyPage;
