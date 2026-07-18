import React from "react";
import AppLayout from "../components/AppLayout";

const ReleaseNotesPage = () => {
  return (
    <AppLayout>
      <div className="space-y-lg">
        <div>
          <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">Delivery Layer</p>
          <h1 className="font-headline-lg text-headline-lg text-primary">Release Notes</h1>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant p-lg">
          <div className="space-y-sm">
            {['Version 2.4 — faster planning', 'Version 2.3 — AI summaries', 'Version 2.2 — better exports'].map((item) => (
              <div key={item} className="border border-outline-variant p-md">{item}</div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ReleaseNotesPage;
