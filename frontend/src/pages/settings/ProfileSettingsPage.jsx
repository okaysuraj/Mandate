import React, { useState, useEffect } from "react";
import AppLayout from "../../components/layout/AppLayout";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import api from "../../lib/axios";

const PRESET_AVATARS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
];

const ProfileSettingsPage = () => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
  });
  const [saving, setSaving] = useState(false);

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
        email: formData.email,
        avatar: formData.avatar,
      });
      if (updateUser) {
        updateUser(data);
      }
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Save profile error:", error);
      toast.error("Unable to save profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto w-full px-4 md:px-6 py-6 space-y-6 pb-20">
        <div className="border-b border-outline-variant pb-5">
          <p className="font-label-caps text-xs text-on-surface-variant uppercase tracking-widest mb-1">Preferences</p>
          <h1 className="font-headline-lg text-2xl md:text-3xl font-extrabold text-on-surface tracking-tight">Profile Settings</h1>
          <p className="text-xs md:text-sm text-on-surface-variant mt-1">Manage your identity, avatar, and contact info.</p>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant p-5 md:p-6 rounded-2xl shadow-xs space-y-6">
          {/* Avatar Preview */}
          <div className="flex items-center gap-4 border-b border-outline-variant/60 pb-5">
            <div className="w-20 h-20 rounded-2xl bg-surface-container-high border-2 border-primary/40 overflow-hidden flex items-center justify-center flex-shrink-0 shadow-sm">
              {formData.avatar ? (
                <img src={formData.avatar} alt="Profile Avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="font-display-lg text-2xl font-bold text-primary">
                  {formData.name ? formData.name.charAt(0).toUpperCase() : "U"}
                </span>
              )}
            </div>
            <div>
              <p className="font-body-md font-bold text-base text-on-surface">{formData.name || "User Profile"}</p>
              <p className="text-xs font-mono text-on-surface-variant">{formData.email}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block font-label-caps text-xs text-on-surface-variant mb-1.5 font-medium">Display Name</label>
              <input
                value={formData.name}
                onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                className="w-full border border-outline-variant bg-surface-container px-3.5 py-2.5 text-sm rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-on-surface transition-colors"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="block font-label-caps text-xs text-on-surface-variant mb-1.5 font-medium">Email Address</label>
              <input
                value={formData.email}
                onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                className="w-full border border-outline-variant bg-surface-container px-3.5 py-2.5 text-sm rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-on-surface transition-colors font-mono"
                placeholder="name@company.com"
              />
            </div>

            <div>
              <label className="block font-label-caps text-xs text-on-surface-variant mb-1.5 font-medium">Profile Picture URL</label>
              <input
                value={formData.avatar}
                onChange={(event) => setFormData({ ...formData, avatar: event.target.value })}
                placeholder="https://example.com/photo.jpg"
                className="w-full border border-outline-variant bg-surface-container px-3.5 py-2.5 text-xs rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-on-surface font-mono transition-colors"
              />
              <div className="flex flex-wrap items-center gap-2 mt-3">
                {PRESET_AVATARS.map((url, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setFormData({ ...formData, avatar: url })}
                    className={`w-9 h-9 rounded-xl border-2 overflow-hidden cursor-pointer transition-all ${
                      formData.avatar === url ? "border-primary scale-110 shadow-sm ring-2 ring-primary/20" : "border-outline-variant opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={url} alt={`Preset ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-outline-variant/60 flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving}
              className="min-h-[44px] px-6 py-2.5 bg-primary text-on-primary rounded-xl font-label-caps text-xs font-bold shadow-xs hover:opacity-90 disabled:opacity-50 transition-all cursor-pointer flex items-center gap-2"
            >
              {saving ? (
                <>
                  <span className="material-symbols-outlined text-base animate-spin">sync</span>
                  Saving…
                </>
              ) : (
                "Save Profile"
              )}
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ProfileSettingsPage;
