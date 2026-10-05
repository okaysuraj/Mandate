import React, { useState } from "react";
import AppLayout from "../../components/layout/AppLayout";
import axios from "axios";
import toast from "react-hot-toast";

const BillingPage = () => {
  const [plan, setPlan] = useState("pro");
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/stripe/create-checkout-session", { plan });
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.success("Billing portal ready");
      }
    } catch (error) {
      toast.error("Could not start checkout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto w-full px-4 md:px-6 py-6 space-y-6 pb-20">
        <div className="border-b border-outline-variant pb-5">
          <p className="font-label-caps text-xs text-on-surface-variant uppercase tracking-widest mb-1">Subscription &amp; Licensing</p>
          <h1 className="font-headline-lg text-2xl md:text-3xl font-extrabold text-on-surface tracking-tight">Billing &amp; Plans</h1>
          <p className="text-xs md:text-sm text-on-surface-variant mt-1">Manage seat limits, quotas, and invoice receipts.</p>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant p-5 md:p-6 rounded-2xl shadow-xs space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 items-center border-b border-outline-variant/60 pb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-primary text-xl">workspace_premium</span>
                <span className="font-label-caps text-xs text-primary font-bold uppercase tracking-wider">ACTIVE TIER</span>
              </div>
              <h2 className="font-headline-lg text-2xl font-bold text-on-surface">Mandate Pro Workspace</h2>
              <p className="text-on-surface-variant text-xs md:text-sm mt-1.5 leading-relaxed">
                Full protocol automation engine, priority queue dispatching, multi-cluster analytics, and unlimited teammate seats.
              </p>
            </div>
            <div className="bg-surface-container border border-outline-variant p-4 rounded-xl text-center">
              <p className="font-label-caps text-xs text-on-surface-variant font-semibold">CURRENT STATUS</p>
              <p className="font-headline-lg text-2xl font-black text-primary mt-1">Pro Plan</p>
              <span className="inline-block mt-1 text-[11px] font-mono text-tertiary font-bold bg-tertiary-container px-2.5 py-0.5 rounded-full border border-outline-variant">
                Active &bull; Renews Oct 2026
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-surface-container/40 border border-outline-variant p-4.5 rounded-xl space-y-3">
              <label className="font-label-caps text-xs text-on-surface-variant block font-medium">Select Plan Tier</label>
              <select
                value={plan}
                onChange={(event) => setPlan(event.target.value)}
                className="w-full rounded-xl border border-outline-variant bg-surface-container px-3.5 py-2.5 text-sm font-mono text-on-surface focus:outline-none focus:border-primary cursor-pointer"
              >
                <option value="free">Free Starter (Up to 3 members)</option>
                <option value="pro">Pro Workspace ($24/seat/mo)</option>
                <option value="enterprise">Enterprise Custom (SLA &amp; Audit Logs)</option>
              </select>
              <p className="text-[11px] text-on-surface-variant font-mono">
                Changes take effect immediately on next renewal cycle.
              </p>
            </div>

            <div className="bg-surface-container/40 border border-outline-variant p-4.5 rounded-xl flex flex-col justify-between space-y-4">
              <div>
                <p className="font-label-caps text-xs text-on-surface-variant font-medium">Billing Summary</p>
                <p className="font-headline-lg text-xl font-bold text-on-surface mt-1">$24 / seat / month</p>
                <p className="text-xs text-on-surface-variant mt-0.5">Annual billing automatically saves 20%</p>
              </div>
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full min-h-[44px] bg-primary text-on-primary px-4 py-2.5 rounded-xl font-label-caps text-xs font-bold shadow-xs hover:opacity-90 disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <span className="material-symbols-outlined text-base animate-spin">sync</span>
                    Connecting to Stripe...
                  </>
                ) : (
                  "Upgrade or Manage Billing"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default BillingPage;
