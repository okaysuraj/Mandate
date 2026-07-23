import React from "react";
import AppLayout from "../../components/layout/AppLayout";

const SavedViewsPage = () => {
  return (
    <AppLayout>
      <div className="space-y-lg">
        <div>
          <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">Workspace Layer</p>
          <h1 className="font-headline-lg text-headline-lg text-primary">Saved Views</h1>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant p-lg">
          <div className="space-y-sm">
            {['Today focus', 'Priority backlog', 'Critical projects'].map((view) => (
              <div key={view} className="border border-outline-variant p-md">{view}</div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default SavedViewsPage;
