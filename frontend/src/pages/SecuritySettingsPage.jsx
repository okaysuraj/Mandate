import React, { useState } from "react";
import AppLayout from "../components/AppLayout";
import toast from "react-hot-toast";

const SecuritySettingsPage = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [passkeysEnabled, setPasskeysEnabled] = useState(false);

  const handleSave = () => {
    toast.success("Security preferences updated");
  };

  return (
    <AppLayout>
      <div className="max-w-4xl space-y-lg">
        <div>
          <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">Governance</p>
          <h1 className="font-headline-lg text-headline-lg text-primary">Security & Access</h1>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant p-lg space-y-md">
          <div className="flex items-center justify-between border-b border-outline-variant pb-md">
            <div>
              <p className="font-body-md font-bold text-primary">Two-factor authentication</p>
              <p className="text-on-surface-variant">Protect workspace sign-ins using a second verification step.</p>
            </div>
            <button
              onClick={() => setTwoFactorEnabled((value) => !value)}
              className={`px-md py-2 rounded-full ${twoFactorEnabled ? "bg-primary text-on-primary" : "border border-outline-variant"}`}
            >
              {twoFactorEnabled ? "Enabled" : "Disabled"}
            </button>
          </div>
          <div className="flex items-center justify-between border-b border-outline-variant pb-md">
            <div>
              <p className="font-body-md font-bold text-primary">Passkeys</p>
              <p className="text-on-surface-variant">Allow secure sign-in from supported devices.</p>
            </div>
            <button
              onClick={() => setPasskeysEnabled((value) => !value)}
              className={`px-md py-2 rounded-full ${passkeysEnabled ? "bg-primary text-on-primary" : "border border-outline-variant"}`}
            >
              {passkeysEnabled ? "Enabled" : "Disabled"}
            </button>
          </div>
          <button onClick={handleSave} className="bg-primary text-on-primary px-md py-2 rounded-full">
            Save security settings
          </button>
        </div>
      </div>
    </AppLayout>
  );
};

export default SecuritySettingsPage;
