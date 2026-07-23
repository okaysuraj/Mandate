import React from "react";
import AppLayout from "../../components/layout/AppLayout";

const EndOfDayReviewPage = () => {
  return (
    <AppLayout>
      <div className="space-y-lg">
        <div>
          <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">Reflection Layer</p>
          <h1 className="font-headline-lg text-headline-lg text-primary">End of Day Review</h1>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant p-lg">
          <h2 className="font-headline-lg text-primary mb-md">Daily Summary</h2>
          <ul className="list-disc list-inside text-on-surface-variant space-y-sm">
            <li>Completed 5 high-value actions</li>
            <li>Blocked 2 tasks requiring follow-up</li>
            <li>Maintained a healthy pacing window</li>
          </ul>
        </div>
      </div>
    </AppLayout>
  );
};

export default EndOfDayReviewPage;
