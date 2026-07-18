import React from "react";
import AppLayout from "../components/AppLayout";

const PersonalizedInsightsPage = () => {
  return (
    <AppLayout>
      <div className="space-y-lg">
        <div>
          <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">Insights Layer</p>
          <h1 className="font-headline-lg text-headline-lg text-primary">Personalized Insights</h1>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant p-lg">
          <div className="space-y-sm">
            {['Your focus trend is improving.', 'You are most productive before noon.', 'Three actions are likely to unblock your week.'].map((insight) => (
              <div key={insight} className="border border-outline-variant p-md">{insight}</div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default PersonalizedInsightsPage;
