import React from "react";
import AppLayout from "../../components/layout/AppLayout";

const ReminderSettingsPage = () => {
  return (
    <AppLayout>
      <div className="space-y-lg">
        <div>
          <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">Communication Layer</p>
          <h1 className="font-headline-lg text-headline-lg text-primary">Reminder Settings</h1>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant p-lg">
          <div className="space-y-sm">
            {['Early morning recap', '15-minute pre-start', 'End-of-day summary'].map((reminder) => (
              <div key={reminder} className="flex items-center justify-between border border-outline-variant p-md">
                <span>{reminder}</span>
                <span className="text-label-sm text-on-surface-variant">Enabled</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ReminderSettingsPage;
