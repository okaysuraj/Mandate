import React, { useState } from "react";
import AppLayout from "../../components/layout/AppLayout";
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
      <div className="max-w-4xl mx-auto w-full px-4 md:px-6 py-6 space-y-6 pb-20">
        <div className="border-b border-outline-variant pb-5">
          <p className="font-label-caps text-xs text-on-surface-variant uppercase tracking-widest mb-1">Preferences</p>
          <h1 className="font-headline-lg text-2xl md:text-3xl font-extrabold text-on-surface tracking-tight">Notification Preferences</h1>
          <p className="text-xs md:text-sm text-on-surface-variant mt-1">Configure email signals, instant push notifications, and daily summaries.</p>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant p-5 md:p-6 rounded-2xl shadow-xs space-y-6">
          {[
            { key: "email", label: "Email Updates", description: "Receive task assignments, mentions, and weekly summary emails.", icon: "mail" },
            { key: "push", label: "Push Notifications", description: "Receive instant alert notifications on mobile and desktop devices.", icon: "notifications" },
            { key: "digest", label: "Daily Summary Briefing", description: "A concise morning recap of your due tasks and daily team agenda.", icon: "summarize" },
          ].map((item) => (
            <div key={item.key} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant/60 pb-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-xl">{item.icon}</span>
                </div>
                <div>
                  <p className="font-body-md font-bold text-sm text-on-surface">{item.label}</p>
                  <p className="text-on-surface-variant text-xs mt-0.5">{item.description}</p>
                </div>
              </div>
              <button
                onClick={() => toggle(item.key)}
                className={`min-h-[40px] px-4 rounded-xl font-label-caps text-xs font-bold transition-all cursor-pointer ${
                  options[item.key] 
                    ? "bg-tertiary-container text-on-tertiary-container border border-outline-variant" 
                    : "bg-surface-container border border-outline-variant text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {options[item.key] ? "Active / On" : "Muted / Off"}
              </button>
            </div>
          ))}

          <div className="flex justify-end pt-2">
            <button 
              onClick={() => toast.success("Notification preferences saved")} 
              className="min-h-[44px] px-6 py-2.5 bg-primary text-on-primary rounded-xl font-label-caps text-xs font-bold shadow-xs hover:opacity-90 active:scale-95 transition-all cursor-pointer"
            >
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default NotificationsSettingsPage;
