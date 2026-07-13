import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const PricingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async (plan) => {
    if (!user) {
      navigate('/login');
      return;
    }
    
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

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <Navbar />
      
      <section className="max-w-container-max mx-auto px-gutter pt-24 pb-16 flex flex-col items-center text-center">
        <h2 className="font-label-caps text-label-caps mb-sm text-outline tracking-widest border-b border-outline-variant pb-1 inline-block uppercase">LICENSING_MODELS</h2>
        <h1 className="font-display-lg text-display-lg tracking-tighter mb-md uppercase text-primary">
          Simple. Transparent.
        </h1>
        <p className="font-body-md text-on-surface-variant max-w-xl mx-auto">
          Invest in precision tools that scale with your ambitions. No hidden fees, just value.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-gutter pb-32 grid grid-cols-1 md:grid-cols-2 gap-gutter">
        
        {/* Free Tier */}
        <div className="bg-surface-container-lowest border border-outline-variant p-xl flex flex-col justify-between rounded-none hover:border-primary transition-colors">
          <div>
            <h3 className="font-headline-lg text-headline-lg text-primary uppercase mb-xs tracking-tight">Standard_Edition</h3>
            <div className="flex items-baseline gap-2 mb-lg pb-lg border-b border-outline-variant">
              <span className="font-display-lg text-display-lg text-primary tracking-tighter">₹0</span>
              <span className="font-label-caps text-label-caps text-on-surface-variant">/ FOREVER</span>
            </div>
            <p className="font-body-md text-on-surface-variant mb-xl">
              Perfect for individuals looking to gain control over their daily tasks.
            </p>
            
            <ul className="flex flex-col gap-md mb-xl">
              <li className="flex items-start gap-3 font-label-sm text-label-sm text-primary uppercase tracking-wider">
                <span className="material-symbols-outlined text-[18px]" style={{fontVariationSettings: "'FILL' 1"}}>check_box</span>
                Up to 100 active tasks
              </li>
              <li className="flex items-start gap-3 font-label-sm text-label-sm text-primary uppercase tracking-wider">
                <span className="material-symbols-outlined text-[18px]" style={{fontVariationSettings: "'FILL' 1"}}>check_box</span>
                Basic categorization
              </li>
              <li className="flex items-start gap-3 font-label-sm text-label-sm text-primary uppercase tracking-wider">
                <span className="material-symbols-outlined text-[18px]" style={{fontVariationSettings: "'FILL' 1"}}>check_box</span>
                Standard sync across devices
              </li>
            </ul>
          </div>
          <Link to="/register" className="w-full">
            <button className="w-full h-12 bg-surface-container border border-outline-variant text-primary font-label-caps text-label-caps uppercase tracking-widest hover:bg-surface-dim transition-colors">
              INITIALIZE_FREE
            </button>
          </Link>
        </div>

        {/* 99 Rupees Tier */}
        <div className="bg-primary border border-primary p-xl flex flex-col justify-between rounded-none relative overflow-hidden group">
          <div className="relative z-10">
            <div className="inline-block px-3 py-1 bg-surface-container-lowest/20 text-on-primary font-label-caps text-[10px] uppercase tracking-widest border border-on-primary/30 mb-lg">
              RECOMMENDED_TIER
            </div>
            <h3 className="font-headline-lg text-headline-lg text-on-primary uppercase mb-xs tracking-tight">Pro_Workspace</h3>
            <div className="flex items-baseline gap-2 mb-lg pb-lg border-b border-on-primary/30">
              <span className="font-display-lg text-display-lg text-on-primary tracking-tighter">₹99</span>
              <span className="font-label-caps text-label-caps text-on-primary/70">/ MONTH</span>
            </div>
            <p className="font-body-md text-on-primary/80 mb-xl">
              For professionals who demand the absolute best out of their workflow.
            </p>
            
            <ul className="flex flex-col gap-md mb-xl">
              <li className="flex items-start gap-3 font-label-sm text-label-sm text-on-primary uppercase tracking-wider">
                <span className="material-symbols-outlined text-[18px] text-tertiary-fixed" style={{fontVariationSettings: "'FILL' 1"}}>check_box</span>
                Unlimited tasks & projects
              </li>
              <li className="flex items-start gap-3 font-label-sm text-label-sm text-on-primary uppercase tracking-wider">
                <span className="material-symbols-outlined text-[18px] text-tertiary-fixed" style={{fontVariationSettings: "'FILL' 1"}}>check_box</span>
                Advanced analytics & insights
              </li>
              <li className="flex items-start gap-3 font-label-sm text-label-sm text-on-primary uppercase tracking-wider">
                <span className="material-symbols-outlined text-[18px] text-tertiary-fixed" style={{fontVariationSettings: "'FILL' 1"}}>check_box</span>
                Priority support via secure channel
              </li>
              <li className="flex items-start gap-3 font-label-sm text-label-sm text-on-primary uppercase tracking-wider">
                <span className="material-symbols-outlined text-[18px] text-tertiary-fixed" style={{fontVariationSettings: "'FILL' 1"}}>check_box</span>
                Custom themes & interfaces
              </li>
            </ul>
          </div>
          <div className="relative z-10">
            <button 
              className="w-full h-12 bg-on-primary text-primary font-label-caps text-label-caps uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all disabled:opacity-50"
              onClick={() => handleCheckout("pro")}
              disabled={loading}
            >
              {loading ? "PROCESSING_PAYMENT..." : "UPGRADE_TO_PRO"}
            </button>
          </div>
        </div>

      </section>

    </div>
  );
};

export default PricingPage;
