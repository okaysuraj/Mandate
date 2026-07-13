import React, { useState } from "react";
import AppLayout from "../components/AppLayout";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

const SettingsPage = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || "admin@mandate.os",
    email: user?.email || "admin@mandate.os",
  });
  const [saving, setSaving] = useState(false);
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [digestEnabled, setDigestEnabled] = useState(false);
  const [signalsEnabled, setSignalsEnabled] = useState(true);

  const handleSave = async () => {
    setSaving(true);
    try {
      await axios.put("/api/users/profile", { name: formData.name });
      toast.success("MANDATE_OS: Update Executed Successfully");
    } catch (error) {
      toast.error("Failed to execute update");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AppLayout>
      <div className="bg-surface min-h-full pb-xl">
        <header className="mb-xl max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-md">
            <div>
              <h1 className="font-headline-lg text-headline-lg text-primary uppercase">Identity & Governance</h1>
              <p className="font-body-md text-on-surface-variant max-w-xl">Configure account credentials, organizational authority levels, and communication protocols for UNIT_01.</p>
            </div>
            <div className="flex gap-md">
              <button className="px-6 py-2 border border-outline-variant rounded-full font-label-caps text-label-caps hover:bg-surface-container-low transition-colors">RESET_CHANGES</button>
              <button 
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-2 bg-primary text-on-primary rounded-full font-label-caps text-label-caps shadow-sm hover:opacity-90 disabled:opacity-70 transition-opacity"
              >
                {saving ? "EXECUTING..." : "EXECUTE_UPDATE"}
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-5xl mx-auto space-y-lg">
          {/* Bento Section: Credential Management */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-lg">
            <div className="md:col-span-8 bg-surface-container-lowest border border-outline-variant p-lg rounded-none">
              <h3 className="font-label-caps text-label-sm text-outline mb-md uppercase tracking-widest flex items-center">
                <span className="material-symbols-outlined mr-2 text-sm">key</span>
                Credential Control
              </h3>
              <div className="space-y-lg">
                <div className="group">
                  <label className="font-label-caps text-label-caps text-on-surface-variant block mb-2">PRIMARY_EMAIL_STUB</label>
                  <div className="flex items-center gap-md border-b border-outline-variant pb-2 group-focus-within:border-primary transition-colors">
                    <input 
                      className="flex-1 bg-transparent border-none p-0 focus:ring-0 font-body-md text-primary" 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <span className="bg-tertiary-fixed text-on-tertiary-fixed font-label-caps text-[10px] px-2 py-0.5 rounded">VERIFIED</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
                  <div>
                    <label className="font-label-caps text-label-caps text-on-surface-variant block mb-2">AUTH_KEY_ROTATION</label>
                    <div className="border-b border-outline-variant pb-2">
                      <input className="bg-transparent border-none p-0 focus:ring-0 font-body-md text-primary w-full" readOnly type="password" value="••••••••••••"/>
                    </div>
                    <p className="text-[11px] mt-2 text-outline-variant font-label-caps">LAST ROTATED: 12.04.2024</p>
                  </div>
                  <div className="flex items-end">
                    <button className="w-full py-2 border border-outline rounded-full font-label-caps text-label-caps text-primary hover:bg-primary hover:text-on-primary transition-all">INITIALIZE_ROTATION</button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-4 bg-surface-container-low border border-outline-variant p-lg flex flex-col justify-between">
              <div>
                <h3 className="font-label-caps text-label-sm text-outline mb-md uppercase tracking-widest">Hierarchy Status</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-outline-variant/30 pb-2">
                    <span className="font-label-caps text-label-caps text-on-surface-variant">RANK</span>
                    <span className="font-body-md font-bold">L-09 DIRECTOR</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-outline-variant/30 pb-2">
                    <span class="font-label-caps text-label-caps text-on-surface-variant">CLEARANCE</span>
                    <span className="font-body-md font-bold text-tertiary-fixed-dim">OMEGA</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-outline-variant/30 pb-2">
                    <span className="font-label-caps text-label-caps text-on-surface-variant">TENURE</span>
                    <span className="font-body-md font-bold">4.2 YEARS</span>
                  </div>
                </div>
              </div>
              <button className="w-full mt-lg py-2 bg-surface-container-highest border border-outline-variant font-label-caps text-label-caps hover:bg-outline-variant transition-colors">VIEW_ORG_CHART</button>
            </div>
          </div>

          {/* Organizational Hierarchy & Teams */}
          <div className="bg-surface-container-lowest border border-outline-variant p-lg">
            <h3 className="font-label-caps text-label-sm text-outline mb-lg uppercase tracking-widest flex items-center">
              <span className="material-symbols-outlined mr-2 text-sm">hub</span>
              Organizational Structure
            </h3>
            <div className="space-y-0 border-t border-outline-variant">
              <div className="flex items-center justify-between py-4 border-b border-surface-container hover:bg-surface-container-low transition-colors px-2">
                <div className="flex items-center gap-lg">
                  <div className="w-10 h-10 bg-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-on-primary">groups</span>
                  </div>
                  <div>
                    <h4 className="font-body-md font-bold">CORE_OPERATIONS</h4>
                    <p className="font-label-caps text-label-caps text-outline-variant">DIRECT_HIERARCHY | 12 NODES</p>
                  </div>
                </div>
                <div className="flex items-center gap-lg">
                  <span className="font-label-caps text-label-caps text-on-tertiary-container bg-tertiary-container/10 px-3 py-1">ACTIVE</span>
                  <span className="material-symbols-outlined text-outline cursor-pointer">more_vert</span>
                </div>
              </div>
              <div className="flex items-center justify-between py-4 border-b border-surface-container hover:bg-surface-container-low transition-colors px-2 opacity-60">
                <div className="flex items-center gap-lg">
                  <div className="w-10 h-10 bg-surface-container-highest flex items-center justify-center">
                    <span className="material-symbols-outlined text-on-surface-variant">architecture</span>
                  </div>
                  <div>
                    <h4 className="font-body-md font-bold">DESIGN_SYSTEMS</h4>
                    <p className="font-label-caps text-label-caps text-outline-variant">CROSS_DEPARTMENTAL | 4 NODES</p>
                  </div>
                </div>
                <div className="flex items-center gap-lg">
                  <span className="font-label-caps text-label-caps text-outline bg-surface-container-highest px-3 py-1">RESTRICTED</span>
                  <span className="material-symbols-outlined text-outline cursor-pointer">more_vert</span>
                </div>
              </div>
              <div className="flex items-center justify-between py-4 border-b border-surface-container hover:bg-surface-container-low transition-colors px-2">
                <div className="flex items-center gap-lg">
                  <div className="w-10 h-10 bg-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-on-primary">terminal</span>
                  </div>
                  <div>
                    <h4 className="font-body-md font-bold">SECURITY_VANGUARD</h4>
                    <p className="font-label-caps text-label-caps text-outline-variant">GOVERNANCE | 32 NODES</p>
                  </div>
                </div>
                <div className="flex items-center gap-lg">
                  <span className="font-label-caps text-label-caps text-on-tertiary-container bg-tertiary-container/10 px-3 py-1">ACTIVE</span>
                  <span className="material-symbols-outlined text-outline cursor-pointer">more_vert</span>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Communication Protocols */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
            <div className="bg-surface-container-lowest border border-outline-variant p-lg">
              <h3 className="font-label-caps text-label-sm text-outline mb-md uppercase tracking-widest">Communication Uplink</h3>
              <div className="space-y-md">
                <div className="flex items-center justify-between">
                  <span className="font-body-md">System Alerts (Critical)</span>
                  <div 
                    onClick={() => setAlertsEnabled(!alertsEnabled)}
                    className={`w-10 h-5 rounded-full relative cursor-pointer ${alertsEnabled ? 'bg-primary' : 'bg-surface-container-highest border border-outline-variant'}`}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full ${alertsEnabled ? 'right-0.5 bg-on-primary' : 'left-0.5 bg-outline'}`}></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-body-md">Daily Manifest Digest</span>
                  <div 
                    onClick={() => setDigestEnabled(!digestEnabled)}
                    className={`w-10 h-5 rounded-full relative cursor-pointer ${digestEnabled ? 'bg-primary' : 'bg-surface-container-highest border border-outline-variant'}`}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full ${digestEnabled ? 'right-0.5 bg-on-primary' : 'left-0.5 bg-outline'}`}></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-body-md">Peer Performance Signals</span>
                  <div 
                    onClick={() => setSignalsEnabled(!signalsEnabled)}
                    className={`w-10 h-5 rounded-full relative cursor-pointer ${signalsEnabled ? 'bg-primary' : 'bg-surface-container-highest border border-outline-variant'}`}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full ${signalsEnabled ? 'right-0.5 bg-on-primary' : 'left-0.5 bg-outline'}`}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-surface-container-lowest border border-outline-variant p-lg">
              <h3 className="font-label-caps text-label-sm text-outline mb-md uppercase tracking-widest">System Termination</h3>
              <p className="font-body-md text-on-surface-variant mb-lg">Deactivating UNIT_01 will purge all local mandate logs and revoke operational clearance immediately.</p>
              <button className="w-full py-2 border border-error text-error font-label-caps text-label-caps hover:bg-error hover:text-on-error transition-all rounded-none uppercase">DEACTIVATE_IDENTITY</button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default SettingsPage;
