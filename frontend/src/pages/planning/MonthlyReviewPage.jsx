import React from "react";
import AppLayout from "../../components/layout/AppLayout";

const MonthlyReviewPage = () => {
  return (
    <AppLayout>
      <div className="space-y-lg">
        <div>
          <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">Reflection Layer</p>
          <h1 className="font-headline-lg text-headline-lg text-primary">Monthly Review</h1>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant p-lg">
          <div className="space-y-sm">
            {['Completed 18 goals', 'Reduced blockers by 20%', 'Prepared next month plan'].map((item) => (
              <div key={item} className="border border-outline-variant p-md">{item}</div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default MonthlyReviewPage;
