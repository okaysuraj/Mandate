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
      <div className="max-w-4xl space-y-lg">
        <div>
          <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">Subscription</p>
          <h1 className="font-headline-lg text-headline-lg text-primary">Billing & Plans</h1>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant p-lg">
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-lg">
            <div>
              <h2 className="font-headline-lg text-primary">Mandate Pro</h2>
              <p className="text-on-surface-variant mt-sm">Unlock advanced automation, expanded analytics, and premium workspace controls.</p>
            </div>
            <div className="border border-outline-variant p-md">
              <p className="font-label-caps text-label-caps text-on-surface-variant">Current Plan</p>
              <p className="font-display-lg text-headline-lg text-primary">Pro</p>
            </div>
          </div>

          <div className="mt-lg grid grid-cols-1 md:grid-cols-2 gap-lg">
            <div className="border border-outline-variant p-md">
              <p className="font-label-caps text-label-caps text-on-surface-variant">Available Plans</p>
              <select
                value={plan}
                onChange={(event) => setPlan(event.target.value)}
                className="mt-sm w-full rounded-none border border-outline-variant bg-surface p-md"
              >
                <option value="free">Free</option>
                <option value="pro">Pro</option>
                <option value="enterprise">Enterprise</option>
              </select>
            </div>
            <div className="border border-outline-variant p-md">
              <p className="font-label-caps text-label-caps text-on-surface-variant">Billing Summary</p>
              <p className="font-body-md mt-sm">$24/month • Annual billing available</p>
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="mt-md w-full bg-primary text-on-primary px-md py-2 rounded-full"
              >
                {loading ? "Preparing…" : "Upgrade plan"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default BillingPage;
