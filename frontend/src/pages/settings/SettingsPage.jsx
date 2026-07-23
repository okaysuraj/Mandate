import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import AppLayout from "../../components/layout/AppLayout";
import { useAuth } from "../../context/AuthContext";
import api from "../../lib/axios";
import toast from "react-hot-toast";

const PRESET_AVATARS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
];

const SettingsPage = () => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
  });
  const [saving, setSaving] = useState(false);
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [digestEnabled, setDigestEnabled] = useState(false);
  const [signalsEnabled, setSignalsEnabled] = useState(true);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        avatar: user.avatar || "",
      });
    }
  }, [user]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const { data } = await api.put("/users/profile", {
        name: formData.name,
        avatar: formData.avatar,
      });
      if (updateUser) {
        updateUser(data);
      }
      toast.success("Settings saved successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AppLayout>
      <div className="bg-surface min-h-full pb-2xl">
        {/* Generous spacing above Account Settings heading */}
        <header className="pt-xl md:pt-2xl mb-xl max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-md border-b border-outline-variant/30 pb-lg">
            <div>
              <p className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-xs">
                Preferences
              </p>
              <h1 className="font-headline-lg text-headline-lg md:text-[36px] text-primary uppercase font-black tracking-tight">
                Account Settings
              </h1>
              <p className="font-body-md text-on-surface-variant max-w-xl mt-xs">
                Manage your profile details, login credentials, team preferences, and notification settings.
              </p>
            </div>
            <div className="flex gap-md pt-md md:pt-0">
              <button
                onClick={() =>
                  setFormData({
                    name: user?.name || "",
                    email: user?.email || "",
                    avatar: user?.avatar || "",
                  })
                }
                className="px-6 py-2.5 border border-outline-variant rounded-full font-label-caps text-label-caps hover:bg-surface-container-low transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-2.5 bg-primary text-on-primary rounded-full font-label-caps text-label-caps shadow-md hover:opacity-90 disabled:opacity-70 transition-all cursor-pointer active:scale-95"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-5xl mx-auto space-y-xl">
          {/* LinkedIn Style Profile Picture & Identity */}
          <div className="bg-surface-container-lowest border border-outline-variant p-xl">
            <h3 className="font-label-caps text-label-sm text-outline mb-lg uppercase tracking-widest flex items-center">
              <span className="material-symbols-outlined mr-2 text-base">account_circle</span>
              Profile Photo & Public Details
            </h3>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-xl">
              {/* Photo Preview Frame */}
              <div className="relative group flex-shrink-0">
                <div className="w-28 h-28 rounded-full bg-surface-container-high border-2 border-primary overflow-hidden flex items-center justify-center shadow-lg">
                  {formData.avatar ? (
                    <img
                      src={formData.avatar}
                      alt={formData.name || "User Avatar"}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "";
                      }}
                    />
                  ) : (
                    <span className="font-display-lg text-headline-lg font-bold text-primary">
                      {formData.name ? formData.name.charAt(0).toUpperCase() : "U"}
                    </span>
                  )}
                </div>
              </div>

              {/* Photo Input Controls */}
              <div className="flex-1 w-full space-y-md">
                <div>
                  <label className="font-label-caps text-label-caps text-on-surface-variant block mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-surface border border-outline-variant p-md rounded-sm font-body-md text-on-surface focus:border-primary outline-none transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="font-label-caps text-label-caps text-on-surface-variant block mb-1">
                    Profile Picture URL
                  </label>
                  <input
                    type="url"
                    value={formData.avatar}
                    onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                    className="w-full bg-surface border border-outline-variant p-md rounded-sm font-body-md text-on-surface focus:border-primary outline-none transition-colors text-xs"
                    placeholder="https://example.com/avatar.jpg"
                  />
                </div>

                {/* Preset Avatar Selector */}
                <div>
                  <span className="text-xs text-on-surface-variant block mb-xs">Or select a professional avatar preset:</span>
                  <div className="flex gap-sm">
                    {PRESET_AVATARS.map((url, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setFormData({ ...formData, avatar: url })}
                        className={`w-10 h-10 rounded-full border-2 overflow-hidden transition-all cursor-pointer ${
                          formData.avatar === url ? "border-primary scale-110 shadow-md" : "border-transparent opacity-70 hover:opacity-100"
                        }`}
                      >
                        <img src={url} alt={`Preset ${idx + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                    {formData.avatar && (
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, avatar: "" })}
                        className="px-sm py-xs text-[10px] font-label-caps text-error border border-error/30 rounded hover:bg-error/10 transition-colors"
                      >
                        Remove Photo
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Account Credentials */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-lg">
            <div className="md:col-span-8 bg-surface-container-lowest border border-outline-variant p-lg">
              <h3 className="font-label-caps text-label-sm text-outline mb-md uppercase tracking-widest flex items-center">
                <span className="material-symbols-outlined mr-2 text-sm">key</span>
                Account Credentials
              </h3>
              <div className="space-y-lg">
                <div className="group">
                  <label className="font-label-caps text-label-caps text-on-surface-variant block mb-2">Email Address</label>
                  <div className="flex items-center gap-md border-b border-outline-variant pb-2 group-focus-within:border-primary transition-colors">
                    <input
                      className="flex-1 bg-transparent border-none p-0 focus:ring-0 font-body-md text-primary outline-none"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <span className="bg-tertiary-fixed text-on-tertiary-fixed font-label-caps text-[10px] px-2 py-0.5 rounded">Verified</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
                  <div>
                    <label className="font-label-caps text-label-caps text-on-surface-variant block mb-2">Password</label>
                    <div className="border-b border-outline-variant pb-2">
                      <input className="bg-transparent border-none p-0 focus:ring-0 font-body-md text-primary w-full outline-none" readOnly type="password" value="••••••••••••" />
                    </div>
                    <p className="text-[11px] mt-2 text-outline-variant font-label-caps">Last updated recently</p>
                  </div>
                  <div className="flex items-end">
                    <button className="w-full py-2 border border-outline rounded-full font-label-caps text-label-caps text-primary hover:bg-primary hover:text-on-primary transition-all cursor-pointer">
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-4 bg-surface-container-low border border-outline-variant p-lg flex flex-col justify-between">
              <div>
                <h3 className="font-label-caps text-label-sm text-outline mb-md uppercase tracking-widest">Account Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-outline-variant/30 pb-2">
                    <span className="font-label-caps text-label-caps text-on-surface-variant">Role</span>
                    <span className="font-body-md font-bold">Team Manager</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-outline-variant/30 pb-2">
                    <span className="font-label-caps text-label-caps text-on-surface-variant">Plan</span>
                    <span className="font-body-md font-bold text-tertiary-fixed-dim">Pro Plan</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-outline-variant/30 pb-2">
                    <span className="font-label-caps text-label-caps text-on-surface-variant">Member Since</span>
                    <span className="font-body-md font-bold">2024</span>
                  </div>
                </div>
              </div>
              <Link to="/team-workspace" className="w-full mt-lg py-2 bg-surface-container-highest border border-outline-variant font-label-caps text-label-caps text-center hover:bg-outline-variant transition-colors block">
                View Workspace
              </Link>
            </div>
          </div>

          {/* Teams & Workspace Structure */}
          <div className="bg-surface-container-lowest border border-outline-variant p-lg">
            <h3 className="font-label-caps text-label-sm text-outline mb-lg uppercase tracking-widest flex items-center">
              <span className="material-symbols-outlined mr-2 text-sm">hub</span>
              My Teams
            </h3>
            <div className="space-y-0 border-t border-outline-variant">
              <div className="flex items-center justify-between py-4 border-b border-surface-container hover:bg-surface-container-low transition-colors px-2">
                <div className="flex items-center gap-lg">
                  <div className="w-10 h-10 bg-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-on-primary">groups</span>
                  </div>
                  <div>
                    <h4 className="font-body-md font-bold">Productivity Team</h4>
                    <p className="font-label-caps text-label-caps text-outline-variant">12 Members</p>
                  </div>
                </div>
                <div className="flex items-center gap-lg">
                  <span className="font-label-caps text-label-caps text-on-tertiary-container bg-tertiary-container/10 px-3 py-1">Active</span>
                  <span className="material-symbols-outlined text-outline cursor-pointer">more_vert</span>
                </div>
              </div>
              <div className="flex items-center justify-between py-4 border-b border-surface-container hover:bg-surface-container-low transition-colors px-2 opacity-60">
                <div className="flex items-center gap-lg">
                  <div className="w-10 h-10 bg-surface-container-highest flex items-center justify-center">
                    <span className="material-symbols-outlined text-on-surface-variant">architecture</span>
                  </div>
                  <div>
                    <h4 className="font-body-md font-bold">Design Team</h4>
                    <p className="font-label-caps text-label-caps text-outline-variant">4 Members</p>
                  </div>
                </div>
                <div className="flex items-center gap-lg">
                  <span className="font-label-caps text-label-caps text-outline bg-surface-container-highest px-3 py-1">Invite Only</span>
                  <span className="material-symbols-outlined text-outline cursor-pointer">more_vert</span>
                </div>
              </div>
              <div className="flex items-center justify-between py-4 border-b border-surface-container hover:bg-surface-container-low transition-colors px-2">
                <div className="flex items-center gap-lg">
                  <div className="w-10 h-10 bg-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-on-primary">terminal</span>
                  </div>
                  <div>
                    <h4 className="font-body-md font-bold">Development Team</h4>
                    <p className="font-label-caps text-label-caps text-outline-variant">32 Members</p>
                  </div>
                </div>
                <div className="flex items-center gap-lg">
                  <span className="font-label-caps text-label-caps text-on-tertiary-container bg-tertiary-container/10 px-3 py-1">Active</span>
                  <span className="material-symbols-outlined text-outline cursor-pointer">more_vert</span>
                </div>
              </div>
            </div>
          </div>

          {/* Submenu Quick Links */}
          <div className="pt-md">
            <h2 className="font-label-caps text-label-caps text-outline uppercase tracking-widest mb-md">
              Settings Navigation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
              <Link to="/profile-settings" className="bg-surface-container-lowest border border-outline-variant p-lg hover:bg-surface-container-low transition-colors">
                <h3 className="font-label-caps text-label-sm text-outline mb-sm uppercase tracking-widest">Profile Details</h3>
                <p className="font-body-md text-primary">Update display name and photo</p>
              </Link>
              <Link to="/security-settings" className="bg-surface-container-lowest border border-outline-variant p-lg hover:bg-surface-container-low transition-colors">
                <h3 className="font-label-caps text-label-sm text-outline mb-sm uppercase tracking-widest">Security & Login</h3>
                <p className="font-body-md text-primary">Manage password and security options</p>
              </Link>
              <Link to="/notifications-settings" className="bg-surface-container-lowest border border-outline-variant p-lg hover:bg-surface-container-low transition-colors">
                <h3 className="font-label-caps text-label-sm text-outline mb-sm uppercase tracking-widest">Notification Preferences</h3>
                <p className="font-body-md text-primary">Customize email and push alerts</p>
              </Link>
            </div>
          </div>

          {/* Notification Toggles & Account Deletion */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-lg pt-md">
            <div className="bg-surface-container-lowest border border-outline-variant p-lg">
              <h3 className="font-label-caps text-label-sm text-outline mb-md uppercase tracking-widest">Notification Settings</h3>
              <div className="space-y-md">
                <div className="flex items-center justify-between">
                  <span className="font-body-md">Important Task Reminders</span>
                  <div
                    onClick={() => setAlertsEnabled(!alertsEnabled)}
                    className={`w-10 h-5 rounded-full relative cursor-pointer ${alertsEnabled ? "bg-primary" : "bg-surface-container-highest border border-outline-variant"}`}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full ${alertsEnabled ? "right-0.5 bg-on-primary" : "left-0.5 bg-outline"}`}></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-body-md">Daily Summary Email</span>
                  <div
                    onClick={() => setDigestEnabled(!digestEnabled)}
                    className={`w-10 h-5 rounded-full relative cursor-pointer ${digestEnabled ? "bg-primary" : "bg-surface-container-highest border border-outline-variant"}`}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full ${digestEnabled ? "right-0.5 bg-on-primary" : "left-0.5 bg-outline"}`}></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-body-md">Team Activity Updates</span>
                  <div
                    onClick={() => setSignalsEnabled(!signalsEnabled)}
                    className={`w-10 h-5 rounded-full relative cursor-pointer ${signalsEnabled ? "bg-primary" : "bg-surface-container-highest border border-outline-variant"}`}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full ${signalsEnabled ? "right-0.5 bg-on-primary" : "left-0.5 bg-outline"}`}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant p-lg">
              <h3 className="font-label-caps text-label-sm text-error mb-md uppercase tracking-widest">Delete Account</h3>
              <p className="font-body-md text-on-surface-variant mb-lg">
                Deleting your account will permanently remove your tasks, lists, and personal workspace data.
              </p>
              <button className="w-full py-2 border border-error text-error font-label-caps text-label-caps hover:bg-error hover:text-on-error transition-all rounded-none uppercase cursor-pointer">
                Delete My Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default SettingsPage;
