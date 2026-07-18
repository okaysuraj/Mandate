import React from "react";
import { useParams } from "react-router";
import AppLayout from "../components/AppLayout";

const GoalDetailPage = () => {
  const { id } = useParams();

  return (
    <AppLayout>
      <div className="space-y-lg">
        <div>
          <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">Strategic Detail</p>
          <h1 className="font-headline-lg text-headline-lg text-primary">Goal Overview</h1>
          <p className="text-on-surface-variant mt-sm">Viewing goal {id}</p>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant p-lg">
          <h2 className="font-headline-lg text-primary mb-md">Milestones</h2>
          <div className="space-y-sm">
            {['Set up success metrics', 'Align team owners', 'Review quarterly progress'].map((item) => (
              <div key={item} className="border border-outline-variant p-md">{item}</div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default GoalDetailPage;
