import React, { useState } from "react";
import AppLayout from "../../components/layout/AppLayout";
import toast from "react-hot-toast";

const SecuritySettingsPage = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [passkeysEnabled, setPasskeysEnabled] = useState(false);

  const handleSave = () => {
    toast.success("Security preferences updated");
  };

  return (
    <AppLayout>
      <div className="max-w-4xl pt-xl md:pt-2xl space-y-xl pb-2xl">
        <div>
          <p className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-xs">Preferences</p>
          <h1 className="font-headline-lg text-headline-lg text-primary font-black uppercase">Security & Login</h1>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant p-xl space-y-lg">
          <div className="flex items-center justify-between border-b border-outline-variant pb-md">
            <div>
              <p className="font-body-md font-bold text-primary">Two-Factor Authentication</p>
              <p className="text-on-surface-variant text-sm">Protect workspace sign-ins using a second verification step.</p>
            </div>
            <button
              onClick={() => setTwoFactorEnabled((value) => !value)}
              className={`px-md py-2 rounded-full font-label-caps text-xs transition-colors cursor-pointer ${twoFactorEnabled ? "bg-primary text-on-primary" : "border border-outline-variant text-on-surface-variant"}`}
            >
              {twoFactorEnabled ? "Enabled" : "Disabled"}
            </button>
          </div>

          <div className="flex items-center justify-between border-b border-outline-variant pb-md">
            <div>
              <p className="font-body-md font-bold text-primary">Passkeys & Security Keys</p>
              <p className="text-on-surface-variant text-sm">Allow passwordless sign-in from supported biometric devices.</p>
            </div>
            <button
              onClick={() => setPasskeysEnabled((value) => !value)}
              className={`px-md py-2 rounded-full font-label-caps text-xs transition-colors cursor-pointer ${passkeysEnabled ? "bg-primary text-on-primary" : "border border-outline-variant text-on-surface-variant"}`}
            >
              {passkeysEnabled ? "Enabled" : "Disabled"}
            </button>
          </div>

          <button onClick={handleSave} className="bg-primary text-on-primary px-xl py-md rounded-full font-label-caps text-label-caps hover:opacity-90 cursor-pointer">
            Save Security Settings
          </button>
        </div>
      </div>
    </AppLayout>
  );
};

export default SecuritySettingsPage;
