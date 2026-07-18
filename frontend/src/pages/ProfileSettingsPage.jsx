import React, { useState } from "react";
import AppLayout from "../components/AppLayout";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";

const ProfileSettingsPage = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: user?.bio || "Operations lead",
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await axios.put("/api/users/profile", { name: formData.name, email: formData.email, bio: formData.bio });
      toast.success("Profile updated");
    } catch (error) {
      toast.error("Unable to save profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-4xl space-y-lg">
        <div>
          <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">Identity</p>
          <h1 className="font-headline-lg text-headline-lg text-primary">Profile Settings</h1>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant p-lg space-y-md">
          <div>
            <label className="block text-label-caps text-on-surface-variant mb-2">Display Name</label>
            <input
              value={formData.name}
              onChange={(event) => setFormData({ ...formData, name: event.target.value })}
              className="w-full border border-outline-variant bg-surface p-md"
            />
          </div>
          <div>
            <label className="block text-label-caps text-on-surface-variant mb-2">Email</label>
            <input
              value={formData.email}
              onChange={(event) => setFormData({ ...formData, email: event.target.value })}
              className="w-full border border-outline-variant bg-surface p-md"
            />
          </div>
          <div>
            <label className="block text-label-caps text-on-surface-variant mb-2">Bio</label>
            <textarea
              value={formData.bio}
              onChange={(event) => setFormData({ ...formData, bio: event.target.value })}
              className="w-full border border-outline-variant bg-surface p-md min-h-24"
            />
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-primary text-on-primary px-md py-2 rounded-full"
          >
            {saving ? "Saving…" : "Save profile"}
          </button>
        </div>
      </div>
    </AppLayout>
  );
};

export default ProfileSettingsPage;
