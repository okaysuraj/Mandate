import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { useAuth } from '../../context/AuthContext';
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
      toast.error("Failed to initiate checkout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      <Navbar variant="landing" />
      
      <main className="flex-1 pt-24 sm:pt-32 pb-16 px-4 sm:px-6 md:px-8">
        <section className="max-w-4xl mx-auto pb-12 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 font-mono text-[11px] font-bold text-primary uppercase tracking-widest mb-4">
            TRANSPARENT VALUE
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight mb-4 uppercase text-on-surface">
            Simple. Transparent. Scalable.
          </h1>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-xl mx-auto">
            Invest in precision productivity tools engineered to elevate team focus and execution velocity.
          </p>
        </section>

        <section className="max-w-5xl mx-auto pb-16 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          
          {/* Free Tier */}
          <div className="bg-surface-container-lowest border border-outline-variant/60 p-6 sm:p-8 flex flex-col justify-between rounded-3xl shadow-sm hover:border-primary/40 transition-all">
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-mono text-sm uppercase font-bold text-on-surface-variant tracking-wider">STANDARD EDITION</h3>
              </div>
              <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-outline-variant/40">
                <span className="text-4xl sm:text-5xl font-black text-on-surface font-mono tracking-tight">₹0</span>
                <span className="font-mono text-xs font-bold text-on-surface-variant">/ FOREVER</span>
              </div>
              <p className="text-sm text-on-surface-variant mb-6">
                Perfect for individuals looking to gain complete control over their daily tasks and personal commitments.
              </p>
              
              <ul className="flex flex-col gap-3.5 mb-8">
                <li className="flex items-start gap-3 text-xs font-medium text-on-surface">
                  <span className="material-symbols-outlined text-[18px] text-primary" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                  Up to 100 active tasks &amp; projects
                </li>
                <li className="flex items-start gap-3 text-xs font-medium text-on-surface">
                  <span className="material-symbols-outlined text-[18px] text-primary" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                  Today queue &amp; Kanban view access
                </li>
                <li className="flex items-start gap-3 text-xs font-medium text-on-surface">
                  <span className="material-symbols-outlined text-[18px] text-primary" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                  Standard cross-device synchronization
                </li>
              </ul>
            </div>
            <Link to="/register" className="w-full">
              <button className="w-full h-12 bg-surface-container hover:bg-surface-container-high border border-outline-variant text-on-surface font-mono text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer">
                SIGNUP FOR FREE
              </button>
            </Link>
          </div>

          {/* 99 Rupees Tier */}
          <div className="bg-surface-container-low border-2 border-primary p-6 sm:p-8 flex flex-col justify-between rounded-3xl relative overflow-hidden shadow-lg group hover:bg-surface-container transition-all">
            <div className="relative z-10">
              <div className="inline-block px-3 py-1 bg-primary/10 text-primary font-mono text-[10px] font-bold uppercase tracking-widest rounded-full border border-primary/30 mb-4">
                RECOMMENDED TIER
              </div>
              <h3 className="font-mono text-sm uppercase font-bold text-primary tracking-wider mb-2">PRO WORKSPACE</h3>
              <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-outline-variant/40">
                <span className="text-4xl sm:text-5xl font-black text-on-surface font-mono tracking-tight">₹99</span>
                <span className="font-mono text-xs font-bold text-on-surface-variant">/ MONTH</span>
              </div>
              <p className="text-sm text-on-surface-variant mb-6">
                For professionals and teams who demand the absolute highest execution velocity and analytics depth.
              </p>
              
              <ul className="flex flex-col gap-3.5 mb-8">
                <li className="flex items-start gap-3 text-xs font-medium text-on-surface">
                  <span className="material-symbols-outlined text-[18px] text-primary" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                  Unlimited tasks, projects &amp; sub-milestones
                </li>
                <li className="flex items-start gap-3 text-xs font-medium text-on-surface">
                  <span className="material-symbols-outlined text-[18px] text-primary" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                  Advanced team workspaces &amp; RBAC controls
                </li>
                <li className="flex items-start gap-3 text-xs font-medium text-on-surface">
                  <span className="material-symbols-outlined text-[18px] text-primary" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                  Autonomous playbook triggers &amp; Slack integration
                </li>
                <li className="flex items-start gap-3 text-xs font-medium text-on-surface">
                  <span className="material-symbols-outlined text-[18px] text-primary" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                  Priority support &amp; telemetry exports
                </li>
              </ul>
            </div>
            <div className="relative z-10">
              <button 
                className="w-full h-12 bg-primary text-on-primary font-mono text-xs font-bold uppercase tracking-wider rounded-xl hover:opacity-90 active:scale-95 transition-all shadow-md cursor-pointer disabled:opacity-50"
                onClick={() => handleCheckout("pro")}
                disabled={loading}
              >
                {loading ? "PROCESSING PAYMENT..." : "UPGRADE TO PRO"}
              </button>
            </div>
          </div>

        </section>
      </main>

      <Footer />
    </div>
  );
};
export default PricingPage;
