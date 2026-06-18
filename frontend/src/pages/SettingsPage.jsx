import React from 'react';
import Navbar from '../components/Navbar';
import { User, Laptop } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router';
import { Inbox, Calendar, CalendarDays, Settings } from 'lucide-react';

const SettingsPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] font-sans text-[#1A1A1A] dark:text-white flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-[1400px] w-full mx-auto px-8 py-16 flex flex-col md:flex-row gap-12 lg:gap-24 relative">
        {/* Left Sidebar (same as HomePage for navigation) */}
        <aside className="w-full md:w-56 shrink-0 flex flex-col gap-10 mt-2 hidden md:flex">
          <nav className="flex flex-col gap-5">
            <Link to="/dashboard" className="flex items-center gap-4 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-[#1A1A1A] dark:hover:text-white transition-colors">
              <Inbox size={18} /> Inbox
            </Link>
            <Link to="/dashboard" className="flex items-center gap-4 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-[#1A1A1A] dark:hover:text-white transition-colors">
              <Calendar size={18} /> Today
            </Link>
            <Link to="/dashboard" className="flex items-center gap-4 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-[#1A1A1A] dark:hover:text-white transition-colors">
              <CalendarDays size={18} /> Upcoming
            </Link>
            <button className="flex items-center gap-4 text-sm font-bold text-[#1A1A1A] dark:text-white relative mt-4">
              <span className="absolute -left-6 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#1A1A1A] dark:bg-white rounded-full"></span>
              <Settings size={18} /> Settings
            </button>
          </nav>
        </aside>

        {/* Settings Content */}
        <div className="flex-1 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase text-[#1A1A1A] dark:text-white font-['Space_Grotesk'] leading-none mb-12">
            Settings
          </h1>

          <div className="flex flex-col md:flex-row gap-12">
            {/* Settings Sidebar */}
            <aside className="w-full md:w-48 shrink-0">
              <nav className="flex flex-col gap-4">
                <button className="text-left text-sm font-bold text-[#1A1A1A] dark:text-white py-2 border-l-2 border-[#1A1A1A] dark:border-white pl-4">
                  Profile
                </button>
                <button className="text-left text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-[#1A1A1A] dark:hover:text-white transition-colors py-2 pl-4 border-l-2 border-transparent">
                  Preferences
                </button>
                <button className="text-left text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-[#1A1A1A] dark:hover:text-white transition-colors py-2 pl-4 border-l-2 border-transparent">
                  Security
                </button>
                <button className="text-left text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-[#1A1A1A] dark:hover:text-white transition-colors py-2 pl-4 border-l-2 border-transparent">
                  Notifications
                </button>
              </nav>
            </aside>

            {/* Settings Panels */}
            <div className="flex-1 flex flex-col gap-12">
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <User size={20} className="text-gray-400" />
                  <h2 className="text-lg font-bold font-['Space_Grotesk'] tracking-tight">Profile Information</h2>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-2">Display Name</label>
                    <input type="text" placeholder="John Doe" className="w-full px-4 py-3 bg-[#F9F9FB] dark:bg-[#1A1A1A] border border-[#EDEDF0] dark:border-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] dark:focus:ring-white transition-all disabled:opacity-50" disabled />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-2">Email Address</label>
                    <input type="email" placeholder="john@example.com" className="w-full px-4 py-3 bg-[#F9F9FB] dark:bg-[#1A1A1A] border border-[#EDEDF0] dark:border-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] dark:focus:ring-white transition-all disabled:opacity-50" disabled />
                  </div>
                  <Button disabled>Save Changes</Button>
                </div>
              </section>

              <div className="w-full h-px bg-[#F0F0F0] dark:bg-gray-800"></div>

              <section>
                <div className="flex items-center gap-3 mb-6">
                  <Laptop size={20} className="text-gray-400" />
                  <h2 className="text-lg font-bold font-['Space_Grotesk'] tracking-tight">System Preferences</h2>
                </div>
                <div className="space-y-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Settings implementation pending future update. For now, use the Dark Mode toggle in the profile menu.</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
