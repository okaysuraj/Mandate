import React from 'react';
import { Link } from 'react-router';
import Navbar from '../components/Navbar';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/Button';

const PricingPage = () => {
  return (
    <div className="min-h-screen bg-[#F9F9FB] dark:bg-[#050505] text-[#1A1A1A] dark:text-white font-sans selection:bg-[#1A1A1A] dark:selection:bg-white selection:text-white dark:selection:text-black transition-colors duration-300">
      <Navbar />
      
      <section className="max-w-[1200px] mx-auto px-8 pt-24 pb-16 flex flex-col items-center text-center">
        <h2 className="small-caps mb-4 text-gray-500 dark:text-gray-400 tracking-widest">PRICING</h2>
        <h1 className="text-5xl md:text-7xl font-bold leading-none tracking-tighter mb-6 uppercase text-[#1A1A1A] dark:text-white font-['Space_Grotesk']">
          Simple. Transparent.
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 tracking-wide max-w-xl mx-auto font-['Space_Grotesk']">
          Invest in precision tools that scale with your ambitions. No hidden fees, just value.
        </p>
      </section>

      <section className="max-w-[1000px] mx-auto px-8 pb-32 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Free Tier */}
        <div className="bg-white dark:bg-[#0f0f0f] rounded-[32px] p-10 flex flex-col justify-between mandate-card shadow-sm h-full border border-[#D9DADC] dark:border-white/10 transition-colors">
          <div>
            <h3 className="text-3xl font-bold text-[#1A1A1A] dark:text-white font-['Space_Grotesk'] mb-2 tracking-tight">Standard</h3>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-5xl font-bold text-[#1A1A1A] dark:text-white tracking-tighter">₹0</span>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">/ forever</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
              Perfect for individuals looking to gain control over their daily tasks.
            </p>
            
            <ul className="flex flex-col gap-4 mb-10">
              <li className="flex items-start gap-3 text-sm font-medium text-[#1A1A1A] dark:text-gray-300">
                <CheckCircle2 size={18} className="text-[#1A1A1A] dark:text-white mt-0.5 shrink-0" />
                Up to 100 active tasks
              </li>
              <li className="flex items-start gap-3 text-sm font-medium text-[#1A1A1A] dark:text-gray-300">
                <CheckCircle2 size={18} className="text-[#1A1A1A] dark:text-white mt-0.5 shrink-0" />
                Basic categorization
              </li>
              <li className="flex items-start gap-3 text-sm font-medium text-[#1A1A1A] dark:text-gray-300">
                <CheckCircle2 size={18} className="text-[#1A1A1A] dark:text-white mt-0.5 shrink-0" />
                Standard sync across devices
              </li>
            </ul>
          </div>
          <Link to="/register">
            <Button variant="secondary" className="w-full h-12 uppercase tracking-widest text-[10px] font-bold border-[#D9DADC] dark:border-white/20 dark:text-white hover:border-[#1A1A1A] dark:hover:border-white">
              Get Started
            </Button>
          </Link>
        </div>

        {/* 99 Rupees Tier */}
        <div className="bg-[#1A1A1A] dark:bg-white/5 rounded-[32px] p-10 flex flex-col justify-between shadow-2xl h-full relative overflow-hidden transition-colors border border-transparent dark:border-blue-500/30">
          {/* Subtle gradient effect */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 opacity-20 rounded-full blur-3xl -mr-20 -mt-20"></div>
          
          <div className="relative z-10">
            <div className="inline-block px-3 py-1 bg-white/10 text-white text-[10px] uppercase tracking-widest font-bold rounded-full mb-6">
              Recommended
            </div>
            <h3 className="text-3xl font-bold text-white font-['Space_Grotesk'] mb-2 tracking-tight">Pro</h3>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-5xl font-bold text-white tracking-tighter">₹99</span>
              <span className="text-sm font-medium text-gray-400">/ month</span>
            </div>
            <p className="text-gray-400 text-sm mb-8">
              For professionals who demand the absolute best out of their workflow.
            </p>
            
            <ul className="flex flex-col gap-4 mb-10">
              <li className="flex items-start gap-3 text-sm font-medium text-white">
                <CheckCircle2 size={18} className="text-white mt-0.5 shrink-0" />
                Unlimited tasks & projects
              </li>
              <li className="flex items-start gap-3 text-sm font-medium text-white">
                <CheckCircle2 size={18} className="text-white mt-0.5 shrink-0" />
                Advanced analytics & insights
              </li>
              <li className="flex items-start gap-3 text-sm font-medium text-white">
                <CheckCircle2 size={18} className="text-white mt-0.5 shrink-0" />
                Priority support
              </li>
              <li className="flex items-start gap-3 text-sm font-medium text-white">
                <CheckCircle2 size={18} className="text-white mt-0.5 shrink-0" />
                Custom themes
              </li>
            </ul>
          </div>
          <Link to="/register" className="relative z-10">
            <Button variant="ghost" className="w-full h-12 bg-white text-[#1A1A1A] hover:bg-gray-200 uppercase tracking-widest text-[10px] font-bold">
              Upgrade to Pro
            </Button>
          </Link>
        </div>

      </section>

    </div>
  );
};

export default PricingPage;
