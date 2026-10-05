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
      <div className="max-w-4xl mx-auto w-full px-4 md:px-6 py-6 space-y-6 pb-20">
        <div className="border-b border-outline-variant pb-5">
          <p className="font-label-caps text-xs text-on-surface-variant uppercase tracking-widest mb-1">Preferences</p>
          <h1 className="font-headline-lg text-2xl md:text-3xl font-extrabold text-on-surface tracking-tight">Security &amp; Login</h1>
          <p className="text-xs md:text-sm text-on-surface-variant mt-1">Multi-factor authorization and biometric sign-in keys.</p>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant p-5 md:p-6 rounded-2xl shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant/60 pb-5">
            <div className="space-y-0.5">
              <p className="font-body-md font-bold text-sm text-on-surface">Two-Factor Authentication (2FA)</p>
              <p className="text-on-surface-variant text-xs">Protect workspace sign-ins using an authenticator app TOTP code.</p>
            </div>
            <button
              onClick={() => setTwoFactorEnabled((value) => !value)}
              className={`min-h-[40px] px-4 rounded-xl font-label-caps text-xs font-bold transition-all cursor-pointer ${
                twoFactorEnabled 
                  ? "bg-tertiary-container text-on-tertiary-container border border-outline-variant" 
                  : "bg-surface-container border border-outline-variant text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {twoFactorEnabled ? "Active / Enabled" : "Disabled"}
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant/60 pb-5">
            <div className="space-y-0.5">
              <p className="font-body-md font-bold text-sm text-on-surface">Passkeys &amp; Hardware Security Keys</p>
              <p className="text-on-surface-variant text-xs">Allow passwordless sign-in from WebAuthn, Touch ID, or FIDO2 keys.</p>
            </div>
            <button
              onClick={() => setPasskeysEnabled((value) => !value)}
              className={`min-h-[40px] px-4 rounded-xl font-label-caps text-xs font-bold transition-all cursor-pointer ${
                passkeysEnabled 
                  ? "bg-tertiary-container text-on-tertiary-container border border-outline-variant" 
                  : "bg-surface-container border border-outline-variant text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {passkeysEnabled ? "Active / Enabled" : "Disabled"}
            </button>
          </div>

          <div className="flex justify-end pt-2">
            <button 
              onClick={handleSave} 
              className="min-h-[44px] px-6 py-2.5 bg-primary text-on-primary rounded-xl font-label-caps text-xs font-bold shadow-xs hover:opacity-90 active:scale-95 transition-all cursor-pointer"
            >
              Save Security Settings
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default SecuritySettingsPage;
