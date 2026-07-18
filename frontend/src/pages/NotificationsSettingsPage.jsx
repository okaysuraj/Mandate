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
      <div className="max-w-4xl space-y-lg">
        <div>
          <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">Communication</p>
          <h1 className="font-headline-lg text-headline-lg text-primary">Notifications</h1>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant p-lg space-y-md">
          {[
            { key: "email", label: "Email updates", description: "Receive transactional and weekly summary emails." },
            { key: "push", label: "Push notifications", description: "Alerts on mobile and desktop." },
            { key: "digest", label: "Daily digest", description: "A concise recap of your agenda each morning." },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between border-b border-outline-variant pb-md">
              <div>
                <p className="font-body-md font-bold text-primary">{item.label}</p>
                <p className="text-on-surface-variant">{item.description}</p>
              </div>
              <button
                onClick={() => toggle(item.key)}
                className={`px-md py-2 rounded-full ${options[item.key] ? "bg-primary text-on-primary" : "border border-outline-variant"}`}
              >
                {options[item.key] ? "On" : "Off"}
              </button>
            </div>
          ))}
          <button onClick={() => toast.success("Notification settings saved")} className="bg-primary text-on-primary px-md py-2 rounded-full">
            Save preferences
          </button>
        </div>
      </div>
    </AppLayout>
  );
};

export default NotificationsSettingsPage;
