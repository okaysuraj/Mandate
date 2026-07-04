import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

const SettingsPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("ACCOUNT");
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    jobTitle: "",
    timezone: "UTC -05:00 Eastern Time",
    criticalAlerts: true,
    weeklyReports: false,
    dataRetention: "90",
  });

  const tabs = ["ACCOUNT", "SECURITY", "WORKSPACE", "BILLING"];

  const handleSave = async () => {
    try {
      await axios.put("/api/users/profile", { name: formData.name });
      toast.success("Settings saved");
    } catch (error) {
      toast.error("Failed to save settings");
    }
  };

  return (
    <div className="font-body-md text-body-md flex flex-col min-h-screen bg-surface">
      <Navbar variant="landing" />

      <main className="flex-grow pt-32 pb-xl px-lg max-w-[1440px] mx-auto w-full">
        <div className="mb-xl">
          <h1 className="font-headline-lg text-headline-lg mb-sm">Settings</h1>
          <p className="text-on-surface-variant font-body-md">Manage your account preferences and workspace configurations.</p>
        </div>

        <div className="settings-grid">
          {/* Sidebar Tabs */}
          <aside className="space-y-xs">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left px-md py-sm rounded-md font-label-caps text-label-caps transition-all ${
                  activeTab === tab
                    ? "bg-surface-container-low text-primary font-bold border-l-4 border-primary"
                    : "text-on-surface-variant hover:bg-surface-container-low hover:text-primary"
                }`}
              >
                {tab}
              </button>
            ))}
          </aside>

          {/* Form Canvas */}
          <section className="max-w-2xl">
            {/* Profile Section */}
            <div className="mb-xl">
              <h2 className="font-label-caps text-label-caps text-on-primary-container mb-lg">PROFILE IDENTITY</h2>
              <div className="flex items-center gap-lg mb-lg">
                <div className="w-24 h-24 rounded-full bg-surface-container overflow-hidden border border-outline-variant relative group">
                  <div className="w-full h-full flex items-center justify-center bg-surface-container-high">
                    <span className="material-symbols-outlined text-[40px] text-on-surface-variant">person</span>
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                    <span className="material-symbols-outlined text-white">edit</span>
                  </div>
                </div>
                <div>
                  <button className="px-md py-xs bg-surface-container-high border border-outline-variant rounded-full font-label-caps text-label-sm hover:bg-surface-dim transition-colors">UPDATE PHOTO</button>
                  <p className="mt-xs font-label-sm text-on-surface-variant opacity-70">JPG or PNG. Max 5MB.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                <div className="space-y-xs">
                  <label className="block font-label-caps text-label-caps text-on-surface-variant">FULL NAME</label>
                  <input
                    className="mandate-input"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-xs">
                  <label className="block font-label-caps text-label-caps text-on-surface-variant">JOB TITLE</label>
                  <input
                    className="mandate-input"
                    type="text"
                    value={formData.jobTitle}
                    onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                    placeholder="Senior Systems Architect"
                  />
                </div>
                <div className="space-y-xs md:col-span-2">
                  <label className="block font-label-caps text-label-caps text-on-surface-variant">EMAIL ADDRESS</label>
                  <input
                    className="mandate-input"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="mb-xl pt-lg border-t border-surface-container-high">
              <h2 className="font-label-caps text-label-caps text-on-primary-container mb-lg">SYSTEM NOTIFICATIONS</h2>
              <div className="space-y-md">
                <div className="flex items-center justify-between p-md bg-surface-container-lowest border border-outline-variant rounded-md">
                  <div>
                    <h3 className="font-bold font-body-md">Critical Alerts</h3>
                    <p className="text-on-surface-variant font-label-sm">Immediate notification for system failures.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={formData.criticalAlerts}
                      onChange={(e) => setFormData({ ...formData, criticalAlerts: e.target.checked })}
                    />
                    <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-md bg-surface-container-lowest border border-outline-variant rounded-md">
                  <div>
                    <h3 className="font-bold font-body-md">Weekly Reports</h3>
                    <p className="text-on-surface-variant font-label-sm">Digest of workspace activity every Monday.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={formData.weeklyReports}
                      onChange={(e) => setFormData({ ...formData, weeklyReports: e.target.checked })}
                    />
                    <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Workspace Preferences */}
            <div className="mb-xl pt-lg border-t border-surface-container-high">
              <h2 className="font-label-caps text-label-caps text-on-primary-container mb-lg">WORKSPACE PREFERENCES</h2>
              <div className="space-y-md">
                <div className="space-y-xs">
                  <label className="block font-label-caps text-label-caps text-on-surface-variant">DEFAULT TIMEZONE</label>
                  <select
                    className="mandate-input appearance-none"
                    value={formData.timezone}
                    onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                  >
                    <option>UTC -05:00 Eastern Time</option>
                    <option>UTC +00:00 Greenwich Mean Time</option>
                    <option>UTC +01:00 Central European Time</option>
                    <option>UTC +05:30 India Standard Time</option>
                  </select>
                </div>
                <div className="space-y-xs">
                  <label className="block font-label-caps text-label-caps text-on-surface-variant">DATA RETENTION POLICY</label>
                  <div className="flex gap-sm">
                    {["90", "180", "365"].map(days => (
                      <button
                        key={days}
                        onClick={() => setFormData({ ...formData, dataRetention: days })}
                        className={`px-md py-sm border rounded-md font-label-sm transition-colors ${
                          formData.dataRetention === days
                            ? "border-primary bg-primary text-on-primary"
                            : "border-outline-variant hover:border-primary"
                        }`}
                      >
                        {days} DAYS
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Save */}
            <div className="flex justify-end pt-xl">
              <button
                onClick={handleSave}
                className="px-xl py-md bg-primary text-on-primary rounded-full font-label-caps text-label-caps font-bold hover:opacity-80 transition-opacity flex items-center gap-sm"
              >
                SAVE CHANGES
                <span className="material-symbols-outlined text-sm">check_circle</span>
              </button>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SettingsPage;
