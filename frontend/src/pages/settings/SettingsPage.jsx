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
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 md:px-8 py-8 space-y-8 pb-24">
        {/* Header Section */}
        <header className="border-b border-outline-variant/70 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>
                <p className="font-mono text-on-surface-variant uppercase tracking-widest text-[11px] font-semibold">
                  WORKSPACE PREFERENCES · SECURITY & IDENTITY
                </p>
              </div>
              <h1 className="font-headline-lg text-2xl md:text-3xl font-extrabold text-on-surface tracking-tight">
                Account Settings
              </h1>
              <p className="text-xs md:text-sm text-on-surface-variant max-w-xl mt-1 leading-relaxed">
                Manage your profile identity, credentials, active organization teams, and system notification signals.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    name: user?.name || "",
                    email: user?.email || "",
                    avatar: user?.avatar || "",
                  })
                }
                className="flex-1 sm:flex-initial min-h-[44px] px-5 py-2.5 border border-outline-variant/70 rounded-xl font-label-caps text-xs font-semibold text-on-surface-variant hover:text-on-surface hover:bg-surface-container/60 transition-colors cursor-pointer"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="flex-1 sm:flex-initial min-h-[44px] px-6 py-2.5 bg-primary text-on-primary rounded-xl font-label-caps text-xs font-bold shadow-xs hover:opacity-90 disabled:opacity-50 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                {saving ? (
                  <>
                    <span className="material-symbols-outlined text-base animate-spin">sync</span>
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Profile Details & Photo Card */}
        <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-6 sm:p-7 shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-outline-variant/50 pb-4">
            <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-xl">account_circle</span>
            </div>
            <div>
              <h3 className="font-label-caps text-xs font-bold text-on-surface uppercase tracking-wider">
                Profile Photo &amp; Public Identity
              </h3>
              <p className="text-[11px] text-on-surface-variant font-mono mt-0.5">
                Customize how your identity appears across mandates and boards
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pt-1">
            {/* Avatar Frame */}
            <div className="relative flex-shrink-0">
              <div className="w-24 h-24 rounded-2xl bg-surface-container-high border-2 border-primary/30 overflow-hidden flex items-center justify-center shadow-xs">
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
                  <span className="font-display-lg text-2xl font-bold text-primary">
                    {formData.name ? formData.name.charAt(0).toUpperCase() : "U"}
                  </span>
                )}
              </div>
            </div>

            {/* Inputs */}
            <div className="flex-1 w-full space-y-4">
              <div>
                <label className="font-label-caps text-xs text-on-surface-variant block mb-1.5 font-medium">
                  Display Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-surface-container/60 border border-outline-variant/70 px-4 py-2.5 rounded-xl font-body-md text-sm text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="font-label-caps text-xs text-on-surface-variant block mb-1.5 font-medium">
                  Avatar Image URL
                </label>
                <input
                  type="url"
                  value={formData.avatar}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                  className="w-full bg-surface-container/60 border border-outline-variant/70 px-4 py-2.5 rounded-xl text-xs font-mono text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>

              {/* Avatar Presets */}
              <div className="pt-1.5">
                <span className="text-xs text-on-surface-variant block mb-2 font-mono">Or pick an avatar preset:</span>
                <div className="flex flex-wrap items-center gap-3">
                  {PRESET_AVATARS.map((url, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setFormData({ ...formData, avatar: url })}
                      className={`w-10 h-10 rounded-xl border-2 overflow-hidden transition-all cursor-pointer ${
                        formData.avatar === url 
                          ? "border-primary scale-110 shadow-sm ring-2 ring-primary/25" 
                          : "border-outline-variant/60 opacity-70 hover:opacity-100 hover:border-outline-variant"
                      }`}
                    >
                      <img src={url} alt={`Preset ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                  {formData.avatar && (
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, avatar: "" })}
                      className="min-h-[38px] px-3.5 text-xs font-mono text-error hover:bg-error/10 border border-error/25 rounded-xl transition-colors cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Credentials & Summary Bento */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8 bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-6 sm:p-7 shadow-xs space-y-5">
            <div className="flex items-center gap-3 border-b border-outline-variant/50 pb-4">
              <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-xl">key</span>
              </div>
              <div>
                <h3 className="font-label-caps text-xs font-bold text-on-surface uppercase tracking-wider">
                  Account Credentials
                </h3>
                <p className="text-[11px] text-on-surface-variant font-mono mt-0.5">
                  Sign-in email, password status, and authentication security
                </p>
              </div>
            </div>
            
            <div className="space-y-4 pt-1">
              <div>
                <label className="font-label-caps text-xs text-on-surface-variant block mb-1.5 font-medium">Email Address</label>
                <div className="flex items-center gap-2.5 bg-surface-container/60 border border-outline-variant/70 rounded-xl px-4 py-2.5">
                  <input
                    className="flex-1 bg-transparent border-none p-0 focus:ring-0 text-sm font-mono text-on-surface outline-none"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  <span className="bg-tertiary-container text-on-tertiary-container border border-outline-variant/60 font-label-caps text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    Verified
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="font-label-caps text-xs text-on-surface-variant block mb-1.5 font-medium">Password</label>
                  <div className="bg-surface-container/60 border border-outline-variant/70 rounded-xl px-4 py-2.5">
                    <input className="bg-transparent border-none p-0 focus:ring-0 text-sm text-on-surface w-full outline-none" readOnly type="password" value="••••••••••••" />
                  </div>
                  <p className="text-[11px] mt-1.5 text-on-surface-variant font-mono">Managed via OAuth/Credentials</p>
                </div>
                <div className="flex items-end">
                  <Link
                    to="/security-settings"
                    className="w-full min-h-[44px] border border-outline-variant/70 rounded-xl font-label-caps text-xs font-semibold text-on-surface hover:bg-surface-container/60 transition-colors flex items-center justify-center"
                  >
                    Change Password
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-6 sm:p-7 shadow-xs flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center gap-3 border-b border-outline-variant/50 pb-4 mb-4">
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-xl">badge</span>
                </div>
                <div>
                  <h3 className="font-label-caps text-xs font-bold text-on-surface uppercase tracking-wider">Account Tier</h3>
                  <p className="text-[11px] text-on-surface-variant font-mono mt-0.5">Active plan &amp; role</p>
                </div>
              </div>
              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center py-2 border-b border-outline-variant/40">
                  <span className="text-on-surface-variant">Role</span>
                  <span className="font-bold text-on-surface">Team Manager</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-outline-variant/40">
                  <span className="text-on-surface-variant">Current Plan</span>
                  <span className="font-bold text-primary px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/25">Pro Tier</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-outline-variant/40">
                  <span className="text-on-surface-variant">Member Since</span>
                  <span className="font-bold text-on-surface">2024</span>
                </div>
              </div>
            </div>
            <Link 
              to="/team-workspace" 
              className="w-full min-h-[44px] bg-surface-container/60 border border-outline-variant/70 rounded-xl font-label-caps text-xs font-semibold text-center text-on-surface hover:bg-surface-container transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-base">groups</span>
              View Workspace
            </Link>
          </div>
        </div>

        {/* Teams Structure Card */}
        <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-6 sm:p-7 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-outline-variant/50 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-xl">hub</span>
              </div>
              <div>
                <h3 className="font-label-caps text-xs font-bold text-on-surface uppercase tracking-wider">
                  My Teams
                </h3>
                <p className="text-[11px] text-on-surface-variant font-mono mt-0.5">
                  Assigned squad spaces and operational units
                </p>
              </div>
            </div>
            <Link to="/team-workspace" className="text-xs font-mono text-primary hover:underline flex items-center gap-1 font-bold">
              Manage Teams &rarr;
            </Link>
          </div>

          <div className="space-y-3 pt-1">
            {[
              { name: "Productivity Team", members: "12 Members", icon: "groups", status: "Active" },
              { name: "Design Team", members: "4 Members", icon: "architecture", status: "Invite Only" },
              { name: "Development Team", members: "32 Members", icon: "terminal", status: "Active" },
            ].map((team, idx) => (
              <div 
                key={idx}
                className="flex items-center justify-between p-4 rounded-xl border border-outline-variant/50 bg-surface-container/30 hover:bg-surface-container/60 transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-xl">{team.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-on-surface">{team.name}</h4>
                    <p className="text-xs font-mono text-on-surface-variant mt-0.5">{team.members}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className={`px-2.5 py-0.5 rounded-full font-label-caps text-[10px] font-bold ${
                    team.status === "Active" 
                      ? "bg-tertiary-container text-on-tertiary-container border border-outline-variant/60" 
                      : "bg-surface-container-high text-on-surface-variant border border-outline-variant/60"
                  }`}>
                    {team.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Settings Navigation */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-outline-variant inline-block"></span>
            <h2 className="font-label-caps text-xs text-on-surface-variant uppercase tracking-widest font-semibold">
              Settings Navigation
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Link 
              to="/profile-settings" 
              className="bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-5 hover:border-primary/50 hover:bg-surface-container/30 transition-all shadow-xs group"
            >
              <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary mb-3 group-hover:scale-105 transition-transform border border-outline-variant/50">
                <span className="material-symbols-outlined text-xl">person</span>
              </div>
              <h3 className="font-mono text-sm font-bold text-on-surface group-hover:text-primary transition-colors">Profile Details</h3>
              <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">Update display name, avatar, and contact channels</p>
            </Link>

            <Link 
              to="/security-settings" 
              className="bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-5 hover:border-primary/50 hover:bg-surface-container/30 transition-all shadow-xs group"
            >
              <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary mb-3 group-hover:scale-105 transition-transform border border-outline-variant/50">
                <span className="material-symbols-outlined text-xl">shield</span>
              </div>
              <h3 className="font-mono text-sm font-bold text-on-surface group-hover:text-primary transition-colors">Security &amp; Login</h3>
              <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">Two-factor auth, passkeys, and session controls</p>
            </Link>

            <Link 
              to="/notifications-settings" 
              className="bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-5 hover:border-primary/50 hover:bg-surface-container/30 transition-all shadow-xs group"
            >
              <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary mb-3 group-hover:scale-105 transition-transform border border-outline-variant/50">
                <span className="material-symbols-outlined text-xl">notifications</span>
              </div>
              <h3 className="font-mono text-sm font-bold text-on-surface group-hover:text-primary transition-colors">Notifications</h3>
              <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">Configure email digests, push signals, and reminders</p>
            </Link>
          </div>
        </div>

        {/* Notification Switches & Danger Zone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
          <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-6 sm:p-7 shadow-xs space-y-5">
            <div className="flex items-center gap-3 border-b border-outline-variant/50 pb-4">
              <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-xl">tune</span>
              </div>
              <div>
                <h3 className="font-label-caps text-xs font-bold text-on-surface uppercase tracking-wider">
                  Quick Preferences
                </h3>
                <p className="text-[11px] text-on-surface-variant font-mono mt-0.5">Toggle instant alert streams</p>
              </div>
            </div>
            <div className="space-y-4 pt-1">
              {[
                { label: "Important Task Reminders", value: alertsEnabled, toggle: () => setAlertsEnabled(!alertsEnabled) },
                { label: "Daily Summary Email", value: digestEnabled, toggle: () => setDigestEnabled(!digestEnabled) },
                { label: "Team Activity Updates", value: signalsEnabled, toggle: () => setSignalsEnabled(!signalsEnabled) },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between py-1">
                  <span className="font-body-md text-sm text-on-surface font-medium">{item.label}</span>
                  <button
                    type="button"
                    onClick={item.toggle}
                    className={`w-12 h-6.5 rounded-full transition-colors relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                      item.value ? "bg-primary" : "bg-surface-container-high border border-outline-variant/70"
                    }`}
                  >
                    <span 
                      className={`block w-4.5 h-4.5 rounded-full bg-on-primary transition-transform shadow-xs ${
                        item.value ? "translate-x-6.5" : "translate-x-1 bg-on-surface-variant"
                      }`} 
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-error/30 rounded-2xl p-6 sm:p-7 shadow-xs flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center gap-3 border-b border-error/20 pb-4 mb-3">
                <div className="w-9 h-9 rounded-xl bg-error/10 text-error flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-xl">warning</span>
                </div>
                <div>
                  <h3 className="font-label-caps text-xs font-bold text-error uppercase tracking-wider">
                    Danger Zone
                  </h3>
                  <p className="text-[11px] text-on-surface-variant font-mono mt-0.5">Irreversible workspace actions</p>
                </div>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed pt-1">
                Deleting your account will permanently wipe your mandates, activity telemetry, personal workspace lists, and access tokens. This action cannot be reversed.
              </p>
            </div>
            <button 
              type="button"
              className="w-full min-h-[44px] border border-error/40 text-error hover:bg-error hover:text-on-error font-label-caps text-xs font-bold rounded-xl transition-all uppercase cursor-pointer active:scale-95"
            >
              Delete My Account
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default SettingsPage;
