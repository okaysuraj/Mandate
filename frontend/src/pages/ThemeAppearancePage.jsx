import React from "react";
import AppLayout from "../components/AppLayout";

const ThemeAppearancePage = () => {
  return (
    <AppLayout>
      <div className="space-y-lg">
        <div>
          <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">Experience Layer</p>
          <h1 className="font-headline-lg text-headline-lg text-primary">Theme & Appearance</h1>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant p-lg">
          <div className="flex items-center justify-between border border-outline-variant p-md">
            <span>Dark mode</span>
            <span className="text-label-sm text-on-surface-variant">Enabled</span>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ThemeAppearancePage;
