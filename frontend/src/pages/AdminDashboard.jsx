import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Shield, ArrowLeft, Users, CreditCard, Activity, TrendingUp, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('analytics');

  const stats = [
    { label: "Active Users", value: "24", change: "+12%" },
    { label: "Tasks Completed", value: "1,204", change: "+4%" },
    { label: "Storage Used", value: "1.2 GB", change: "42%" },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#050505] text-black dark:text-white transition-colors duration-300">
      <div className="max-w-6xl mx-auto p-8">
        <button onClick={() => navigate(-1)} className="flex items-center text-sm font-semibold text-zinc-500 hover:text-black dark:hover:text-white transition mb-8">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Home
        </button>

        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2 flex items-center">
            <Shield className="w-8 h-8 mr-3 text-rose-500" /> 
            Admin Dashboard
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400">Manage billing, view analytics, and configure workspace settings.</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-zinc-200 dark:border-white/10 pb-4">
          <button 
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center font-bold px-4 py-2 rounded-xl transition ${activeTab === 'analytics' ? 'bg-black text-white dark:bg-white dark:text-black' : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-white/5'}`}
          >
            <Activity className="w-4 h-4 mr-2" /> Analytics
          </button>
          <button 
            onClick={() => setActiveTab('billing')}
            className={`flex items-center font-bold px-4 py-2 rounded-xl transition ${activeTab === 'billing' ? 'bg-black text-white dark:bg-white dark:text-black' : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-white/5'}`}
          >
            <CreditCard className="w-4 h-4 mr-2" /> Billing
          </button>
          <button 
            onClick={() => setActiveTab('team')}
            className={`flex items-center font-bold px-4 py-2 rounded-xl transition ${activeTab === 'team' ? 'bg-black text-white dark:bg-white dark:text-black' : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-white/5'}`}
          >
            <Users className="w-4 h-4 mr-2" /> Team Management
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((s, i) => (
                <div key={i} className="bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 p-6 rounded-2xl shadow-sm">
                  <p className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-2">{s.label}</p>
                  <div className="flex items-end gap-4">
                    <span className="text-4xl font-bold">{s.value}</span>
                    <span className="flex items-center text-sm font-bold text-green-500 mb-1">
                      <TrendingUp className="w-3 h-3 mr-1" /> {s.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 h-80 rounded-2xl p-6 flex flex-col items-center justify-center shadow-sm">
               {/* Mock Chart Area */}
               <Activity className="w-16 h-16 text-zinc-200 dark:text-zinc-800 mb-4" />
               <p className="text-zinc-400 font-medium">Activity graph will be rendered here (Chart.js)</p>
            </div>
          </div>
        )}

        {activeTab === 'billing' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 p-8 rounded-2xl shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <span className="px-3 py-1 bg-black text-white dark:bg-white dark:text-black text-xs font-bold rounded-full">CURRENT PLAN</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Pro Workspace</h3>
              <p className="text-zinc-500 mb-6">$12 / user / month</p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-sm font-medium"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Unlimited Tasks & Projects</li>
                <li className="flex items-center text-sm font-medium"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Full AI Integration (GPT-4o)</li>
                <li className="flex items-center text-sm font-medium"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Advanced Rule Engine</li>
              </ul>
              
              <button className="w-full py-3 bg-zinc-100 hover:bg-zinc-200 dark:bg-white/10 dark:hover:bg-white/20 font-bold rounded-xl transition">Manage Subscription (Stripe)</button>
            </div>

            <div className="bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold mb-6">Payment Methods</h3>
              <div className="flex items-center p-4 border border-zinc-200 dark:border-white/10 rounded-xl mb-4">
                <CreditCard className="w-6 h-6 mr-4 text-zinc-400" />
                <div>
                  <p className="font-bold">Visa ending in 4242</p>
                  <p className="text-xs text-zinc-500">Expires 12/28</p>
                </div>
              </div>
              <button className="text-sm font-bold text-rose-500 hover:text-rose-600 transition">+ Add payment method</button>
            </div>
          </div>
        )}

        {activeTab === 'team' && (
          <div className="bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 p-8 rounded-2xl shadow-sm">
            <h3 className="text-xl font-bold mb-6">Workspace Members</h3>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center justify-between p-4 border border-zinc-100 dark:border-white/5 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center font-bold">
                      U{i}
                    </div>
                    <div>
                      <p className="font-bold">Team Member {i}</p>
                      <p className="text-xs text-zinc-500">user{i}@company.com</p>
                    </div>
                  </div>
                  <select className="bg-zinc-100 dark:bg-zinc-800 border-none rounded-lg p-2 text-sm focus:outline-none">
                    <option>Admin</option>
                    <option>Editor</option>
                    <option>Viewer</option>
                  </select>
                </div>
              ))}
            </div>
            <button className="mt-6 px-4 py-2 bg-black text-white dark:bg-white dark:text-black font-bold rounded-xl text-sm transition">Invite Member</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
