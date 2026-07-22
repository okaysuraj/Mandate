import React, { useState, useEffect } from "react";
import AppLayout from "../components/AppLayout";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import api from "../lib/axios";

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
      <div className="max-w-4xl pt-xl md:pt-2xl space-y-xl pb-2xl">
        <div>
          <p className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-xs">Preferences</p>
          <h1 className="font-headline-lg text-headline-lg text-primary font-black uppercase">Profile Settings</h1>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant p-xl space-y-lg">
          {/* Avatar Preview */}
          <div className="flex items-center gap-lg border-b border-outline-variant/30 pb-lg">
            <div className="w-20 h-20 rounded-full bg-surface-container-high border-2 border-primary overflow-hidden flex items-center justify-center flex-shrink-0">
              {formData.avatar ? (
                <img src={formData.avatar} alt="Profile Avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="font-display-lg text-headline-lg font-bold text-primary">
                  {formData.name ? formData.name.charAt(0).toUpperCase() : "U"}
                </span>
              )}
            </div>
            <div>
              <p className="font-body-md font-bold text-on-surface">{formData.name || "User Profile"}</p>
              <p className="text-xs text-on-surface-variant">{formData.email}</p>
            </div>
          </div>

          <div>
            <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2">Display Name</label>
            <input
              value={formData.name}
              onChange={(event) => setFormData({ ...formData, name: event.target.value })}
              className="w-full border border-outline-variant bg-surface p-md font-body-md rounded-sm outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2">Email Address</label>
            <input
              value={formData.email}
              onChange={(event) => setFormData({ ...formData, email: event.target.value })}
              className="w-full border border-outline-variant bg-surface p-md font-body-md rounded-sm outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2">Profile Picture URL</label>
            <input
              value={formData.avatar}
              onChange={(event) => setFormData({ ...formData, avatar: event.target.value })}
              placeholder="https://example.com/photo.jpg"
              className="w-full border border-outline-variant bg-surface p-md text-xs rounded-sm outline-none focus:border-primary"
            />
            <div className="flex gap-sm mt-md">
              {PRESET_AVATARS.map((url, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setFormData({ ...formData, avatar: url })}
                  className={`w-10 h-10 rounded-full border-2 overflow-hidden cursor-pointer transition-all ${
                    formData.avatar === url ? "border-primary scale-110 shadow" : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={url} alt={`Preset ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-primary text-on-primary px-xl py-md rounded-full font-label-caps text-label-caps hover:opacity-90 transition-opacity cursor-pointer"
          >
            {saving ? "Saving…" : "Save Profile"}
          </button>
        </div>
      </div>
    </AppLayout>
  );
};

export default ProfileSettingsPage;
