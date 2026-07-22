import React, { useState } from "react";
import AppLayout from "../components/AppLayout";
import toast from "react-hot-toast";

const NotificationsSettingsPage = () => {
  const [options, setOptions] = useState({
    email: true,
    push: true,
    digest: false,
  });

  const toggle = (key) => {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <AppLayout>
      <div className="max-w-4xl pt-xl md:pt-2xl space-y-xl pb-2xl">
        <div>
          <p className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-xs">Preferences</p>
          <h1 className="font-headline-lg text-headline-lg text-primary font-black uppercase">Notification Preferences</h1>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant p-xl space-y-lg">
          {[
            { key: "email", label: "Email Updates", description: "Receive task assignments, mentions, and weekly summary emails." },
            { key: "push", label: "Push Notifications", description: "Receive instant alert notifications on mobile and desktop." },
            { key: "digest", label: "Daily Summary Email", description: "A concise morning recap of your due tasks and daily agenda." },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between border-b border-outline-variant pb-md">
              <div>
                <p className="font-body-md font-bold text-primary">{item.label}</p>
                <p className="text-on-surface-variant text-sm">{item.description}</p>
              </div>
              <button
                onClick={() => toggle(item.key)}
                className={`px-md py-2 rounded-full font-label-caps text-xs transition-colors cursor-pointer ${options[item.key] ? "bg-primary text-on-primary" : "border border-outline-variant text-on-surface-variant"}`}
              >
                {options[item.key] ? "On" : "Off"}
              </button>
            </div>
          ))}
          <button onClick={() => toast.success("Notification preferences saved")} className="bg-primary text-on-primary px-xl py-md rounded-full font-label-caps text-label-caps hover:opacity-90 cursor-pointer">
            Save Preferences
          </button>
        </div>
      </div>
    </AppLayout>
  );
};

export default NotificationsSettingsPage;
