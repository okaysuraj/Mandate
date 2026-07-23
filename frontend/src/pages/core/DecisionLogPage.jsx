import React from "react";
import AppLayout from "../../components/layout/AppLayout";

const DecisionLogPage = () => {
  return (
    <AppLayout>
      <div className="space-y-lg">
        <div>
          <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">Alignment Layer</p>
          <h1 className="font-headline-lg text-headline-lg text-primary">Decision Log</h1>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant p-lg">
          <div className="space-y-sm">
            {['Escalated launch scope', 'Adopted AI triage workflow', 'Reprioritized onboarding roadmap'].map((item) => (
              <div key={item} className="border border-outline-variant p-md">{item}</div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default DecisionLogPage;
