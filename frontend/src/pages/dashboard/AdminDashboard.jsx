import React, { useState } from 'react';
import AppLayout from '../../components/layout/AppLayout';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router';
import axios from "axios";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async (plan) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/stripe/create-checkout-session", { plan });
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      toast.error("MANDATE_OS: Failed to initiate secure checkout protocol");
    } finally {
      setLoading(false);
    }
  };

  const getTierName = () => {
    if (!user) return "BASIC";
    if (user.subscriptionPlan === "pro") return "PRO";
    if (user.subscriptionPlan === "quantum") return "QUANTUM";
    return "BASIC";
  };

  const getStatusDisplay = () => {
    if (user?.subscriptionStatus === "active") return "ACTIVE";
    return "INACTIVE";
  };

  return (
    <AppLayout>
      <div className="bg-surface min-h-full pb-xl px-4 sm:px-6 md:px-8 py-6">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-outline-variant/40">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block"></span>
                <span className="font-mono text-xs uppercase font-bold text-on-surface-variant tracking-widest">
                  ADMINISTRATION &amp; BILLING
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-on-surface uppercase tracking-tight">
                Subscription &amp; Billing
              </h1>
              <p className="text-on-surface-variant text-sm max-w-xl mt-1">
                Configure usage-based tiering, audit invoice histories, and manage high-fidelity payment systems for Unit 01.
              </p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => handleCheckout("pro")}
                disabled={loading}
                className="bg-primary text-on-primary font-mono text-xs font-bold px-6 py-3 rounded-xl flex items-center gap-2 disabled:opacity-70 hover:opacity-90 active:scale-95 transition-all uppercase shadow-md cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">upgrade</span>
                {loading ? "PROCESSING..." : "UPGRADE PLAN"}
              </button>
            </div>
          </div>

          {/* Bento Grid - Usage & Tiering */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Tier Overview Card */}
            <div className="lg:col-span-8 bg-surface-container-lowest border border-outline-variant/60 p-6 sm:p-8 rounded-2xl relative overflow-hidden shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                  <div>
                    <span className="bg-tertiary-container text-on-tertiary-container font-mono text-xs font-bold px-3 py-1 rounded-full tracking-wider mb-2 inline-block border border-tertiary/20">
                      ACTIVE TIER: {getTierName()}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold text-on-surface">Usage-Based Performance</h2>
                  </div>
                  <div className="sm:text-right">
                    <p className="font-mono text-[10px] uppercase font-bold text-on-surface-variant">STATUS</p>
                    <p className="text-xl font-black text-primary font-mono">{getStatusDisplay()}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                  <div className="space-y-2 bg-surface-container-low p-4 rounded-xl border border-outline-variant/40">
                    <p className="font-mono text-xs font-bold text-on-surface-variant uppercase">API Calls</p>
                    <div className="h-2 bg-surface-container-high rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full transition-all duration-500 w-[15%]"></div>
                    </div>
                    <div className="flex justify-between font-mono text-xs text-on-surface-variant">
                      <span>1.2k</span>
                      <span>10k Limit</span>
                    </div>
                  </div>

                  <div className="space-y-2 bg-surface-container-low p-4 rounded-xl border border-outline-variant/40">
                    <p className="font-mono text-xs font-bold text-on-surface-variant uppercase">Data Processing</p>
                    <div className="h-2 bg-surface-container-high rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full transition-all duration-500 w-[5%]"></div>
                    </div>
                    <div className="flex justify-between font-mono text-xs text-on-surface-variant">
                      <span>0.1 TB</span>
                      <span>2 TB Limit</span>
                    </div>
                  </div>

                  <div className="space-y-2 bg-surface-container-low p-4 rounded-xl border border-outline-variant/40">
                    <p className="font-mono text-xs font-bold text-on-surface-variant uppercase">Active Agents</p>
                    <div className="h-2 bg-surface-container-high rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full transition-all duration-500 w-[50%]"></div>
                    </div>
                    <div className="flex justify-between font-mono text-xs text-on-surface-variant">
                      <span>1 Active</span>
                      <span>2 Total</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 border-t border-outline-variant/40 pt-4 text-xs text-on-surface-variant">
                <span className="material-symbols-outlined text-base text-primary">verified_user</span>
                <p>Your usage is well within your current tier's enterprise allocation limits.</p>
              </div>
            </div>

            {/* Payment Method Card */}
            <div className="lg:col-span-4 bg-gradient-to-br from-primary to-primary/80 text-on-primary p-6 sm:p-8 rounded-2xl flex flex-col justify-between shadow-lg relative overflow-hidden min-h-[260px]">
              <div className="absolute -right-8 -top-8 w-36 h-36 bg-white/5 rounded-full pointer-events-none"></div>
              <div>
                <div className="flex justify-between items-center mb-8">
                  <span className="font-mono text-[11px] uppercase font-bold tracking-widest text-on-primary/80">PRIMARY PAYMENT</span>
                  <span className="material-symbols-outlined text-2xl text-on-primary/90">contactless</span>
                </div>
                <p className="font-mono text-xl sm:text-2xl tracking-[0.25em] mb-6 text-on-primary font-bold">•••• •••• •••• 4242</p>
                <div className="flex justify-between text-xs text-on-primary/80 font-mono">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-on-primary/60">CARDHOLDER</p>
                    <p className="font-bold text-on-primary uppercase">{user?.name || "WORKSPACE ADMIN"}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-on-primary/60">EXPIRY</p>
                    <p className="font-bold text-on-primary">12 / 28</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => window.location.href = "https://billing.stripe.com/p/login/test_8wMaF75p7a0d1eEbII"} 
                className="w-full bg-white/10 hover:bg-white/20 text-on-primary border border-white/20 font-mono text-xs font-bold py-3 rounded-xl mt-6 transition-all uppercase tracking-wider cursor-pointer text-center"
              >
                MANAGE PAYMENT METHODS
              </button>
            </div>
          </div>

          {/* Bottom Bento row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface-container-lowest border border-outline-variant/60 p-6 sm:p-8 rounded-2xl flex flex-col justify-between shadow-sm min-h-[200px]">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-lg text-primary">domain</span>
                  <h4 className="font-mono text-xs uppercase font-bold text-on-surface">BILLING ENTITY</h4>
                </div>
                <p className="text-sm font-medium text-on-surface">{user?.name || "Global Nexus Operations Ltd."}</p>
                <p className="text-xs text-on-surface-variant mt-0.5">{user?.email}</p>
                <p className="text-xs text-on-surface-variant/80 mt-2 font-mono">Tax ID: US-EIN-992014819</p>
              </div>
              <button className="font-mono text-xs font-bold text-primary self-start hover:underline pt-4 uppercase cursor-pointer flex items-center gap-1">
                EDIT ENTITY <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant/60 p-6 sm:p-8 rounded-2xl flex flex-col justify-between shadow-sm min-h-[200px]">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-lg text-primary">notifications_active</span>
                  <h4 className="font-mono text-xs uppercase font-bold text-on-surface">NOTIFICATION PREFERENCES</h4>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium text-on-surface block">Monthly Invoice PDF</span>
                      <span className="text-xs text-on-surface-variant">Send billing statements to billing email</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium text-on-surface block">Usage Threshold Alert (80%)</span>
                      <span className="text-xs text-on-surface-variant">Alert admins when quota approaches ceiling</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>
              </div>
              <p className="font-mono text-[10px] uppercase font-bold text-on-surface-variant/80 mt-4">AUTONOMOUS DISPATCH ENABLED</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default AdminDashboard;
