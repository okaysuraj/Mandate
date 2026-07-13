import React, { useState } from 'react';
import AppLayout from '../components/AppLayout';
import { useAuth } from '../context/AuthContext';
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
      <div className="bg-surface min-h-full pb-xl">
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="mb-xl flex flex-col md:flex-row md:items-end justify-between gap-md">
            <div>
              <h1 className="font-headline-lg text-headline-lg text-primary mb-xs uppercase">Subscription & Billing</h1>
              <p className="text-on-surface-variant font-body-md max-w-xl">Configure usage-based tiering, audit invoice histories, and manage high-fidelity payment systems for Unit 01.</p>
            </div>
            <div className="flex gap-md">
              <button 
                onClick={() => handleCheckout("pro")}
                disabled={loading}
                className="bg-primary text-on-primary font-label-caps text-label-caps px-lg py-md rounded-full flex items-center gap-sm disabled:opacity-70 hover:opacity-90 transition-opacity uppercase"
              >
                <span className="material-symbols-outlined text-sm">upgrade</span> {loading ? "PROCESSING..." : "UPGRADE_PLAN"}
              </button>
            </div>
          </div>

          {/* Bento Grid - Usage & Tiering */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-lg mb-xl">
            {/* Tier Overview Card */}
            <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest border border-outline-variant p-lg rounded-none relative overflow-hidden">
              <div className="flex justify-between items-start mb-lg">
                <div>
                  <span className="bg-tertiary-fixed text-on-tertiary-container font-label-caps text-[10px] px-2 py-0.5 rounded-full tracking-wider mb-sm inline-block">ACTIVE TIER: {getTierName()}</span>
                  <h2 className="font-headline-lg text-headline-lg-mobile text-primary">Usage-Based Performance</h2>
                </div>
                <div className="text-right">
                  <p className="font-label-caps text-label-caps text-outline">STATUS</p>
                  <p className="font-headline-lg text-headline-lg text-primary">{getStatusDisplay()}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-lg mb-lg">
                <div className="space-y-xs">
                  <p className="font-label-caps text-label-caps text-on-surface-variant">API CALLS</p>
                  <div className="h-1 bg-surface-container-high rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[15%]"></div>
                  </div>
                  <div className="flex justify-between font-label-sm text-label-sm text-outline">
                    <span>1.2k</span>
                    <span>10k</span>
                  </div>
                </div>
                <div className="space-y-xs">
                  <p className="font-label-caps text-label-caps text-on-surface-variant">DATA PROCESSING</p>
                  <div className="h-1 bg-surface-container-high rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[5%]"></div>
                  </div>
                  <div className="flex justify-between font-label-sm text-label-sm text-outline">
                    <span>0.1 TB</span>
                    <span>2 TB</span>
                  </div>
                </div>
                <div className="space-y-xs">
                  <p className="font-label-caps text-label-caps text-on-surface-variant">ACTIVE AGENTS</p>
                  <div className="h-1 bg-surface-container-high rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[50%]"></div>
                  </div>
                  <div className="flex justify-between font-label-sm text-label-sm text-outline">
                    <span>1 / 2</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-md border-t border-outline-variant pt-lg">
                <span className="material-symbols-outlined text-outline">info</span>
                <p className="font-body-md text-label-sm text-on-surface-variant">Your usage is well within your current tier's limits.</p>
              </div>
            </div>

            {/* Payment Method Card */}
            <div className="col-span-12 lg:col-span-4 bg-primary text-on-primary p-lg rounded-none flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-xl">
                  <span className="font-label-caps text-label-caps opacity-60">PRIMARY_PAYMENT</span>
                  <span className="material-symbols-outlined">contactless</span>
                </div>
                <p className="font-label-caps text-headline-lg-mobile tracking-[0.2em] mb-md">•••• •••• •••• ----</p>
                <div className="flex justify-between">
                  <div>
                    <p className="font-label-caps text-[10px] opacity-60">CARDHOLDER</p>
                    <p className="font-label-caps text-label-sm uppercase">{user?.name || "SYSTEM_ADMIN_01"}</p>
                  </div>
                  <div>
                    <p className="font-label-caps text-[10px] opacity-60">EXPIRY</p>
                    <p className="font-label-caps text-label-sm">-- / --</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => window.location.href = "https://billing.stripe.com/p/login/test_8wMaF75p7a0d1eEbII"} 
                className="w-full border border-on-primary font-label-caps text-label-caps py-md rounded-full mt-xl hover:bg-on-primary hover:text-primary transition-colors uppercase"
              >
                MANAGE_METHODS
              </button>
            </div>
          </div>

          {/* Bottom Bento row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
            <div className="bg-surface-container-low border border-outline-variant p-lg rounded-none flex flex-col justify-between min-h-[200px]">
              <div>
                <h4 className="font-label-caps text-label-sm text-primary mb-sm">BILLING_ENTITY</h4>
                <p className="font-body-md text-on-surface-variant">{user?.name || "Global Nexus Operations Ltd."}<br/>{user?.email}<br/></p>
              </div>
              <button className="font-label-caps text-label-caps text-primary self-start border-b border-primary pt-md uppercase">EDIT_ENTITY</button>
            </div>
            <div className="bg-surface-container-low border border-outline-variant p-lg rounded-none flex flex-col justify-between min-h-[200px]">
              <div>
                <h4 className="font-label-caps text-label-sm text-primary mb-sm">NOTIFICATION_PREFERENCES</h4>
                <div className="flex items-center justify-between mb-sm">
                  <span className="font-label-sm text-on-surface-variant">Monthly Invoice PDF</span>
                  <div className="w-10 h-5 bg-primary rounded-full relative p-0.5 flex items-center justify-end cursor-pointer">
                    <div className="w-4 h-4 bg-on-primary rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-on-surface-variant">Usage Threshold Alert (80%)</span>
                  <div className="w-10 h-5 bg-primary rounded-full relative p-0.5 flex items-center justify-end cursor-pointer">
                    <div className="w-4 h-4 bg-on-primary rounded-full"></div>
                  </div>
                </div>
              </div>
              <p className="font-label-caps text-[10px] text-outline mt-md">AUTO_SAVE_ENABLED</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default AdminDashboard;
