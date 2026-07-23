import React from "react";
import AppLayout from "../../components/layout/AppLayout";

const PriorityRecommendationsPage = () => {
  return (
    <AppLayout>
      <div className="space-y-lg">
        <div>
          <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">AI Layer</p>
          <h1 className="font-headline-lg text-headline-lg text-primary">Priority Recommendations</h1>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant p-lg">
          <div className="space-y-sm">
            {['Review the customer escalation first.', 'Batch support replies before noon.', 'Wrap the project handoff before 4 PM.'].map((recommendation) => (
              <div key={recommendation} className="border border-outline-variant p-md">{recommendation}</div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default PriorityRecommendationsPage;
