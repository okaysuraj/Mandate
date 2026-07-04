import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Blocks, ArrowLeft, Loader2, CheckCircle, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

const IntegrationsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [integrations, setIntegrations] = useState({
    slack: false,
    google_calendar: false,
    github: false,
  });
  const [loading, setLoading] = useState(false);

  // In a real app, this would fetch from /api/integrations
  // For MVP, we use local state or a mock endpoint
  
  const handleConnect = async (service) => {
    setLoading(true);
    // Mocking OAuth latency
    setTimeout(() => {
      setIntegrations({ ...integrations, [service]: !integrations[service] });
      setLoading(false);
      toast.success(integrations[service] ? `${service} disconnected` : `Connected to ${service}!`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#050505] text-black dark:text-white transition-colors duration-300">
      <div className="max-w-5xl mx-auto p-8">
        <button onClick={() => navigate(-1)} className="flex items-center text-sm font-semibold text-zinc-500 hover:text-black dark:hover:text-white transition mb-8">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Home
        </button>

        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2 flex items-center">
            <Blocks className="w-8 h-8 mr-3 text-orange-500" /> 
            Integrations
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400">Connect Mandate to your favorite tools.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Slack */}
          <div className="bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 p-6 rounded-2xl flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 bg-[#4A154B] rounded-xl flex items-center justify-center font-bold text-white text-xl">#</div>
              {integrations.slack && <CheckCircle className="text-green-500 w-5 h-5" />}
            </div>
            <h3 className="text-xl font-bold mb-2">Slack</h3>
            <p className="text-sm text-zinc-500 mb-6 flex-1">Receive mandate updates and @mentions directly in your Slack channels.</p>
            <button 
              onClick={() => handleConnect('slack')}
              disabled={loading}
              className={`w-full py-2 rounded-xl font-bold text-sm transition ${integrations.slack ? 'bg-red-50 text-red-600 dark:bg-red-500/10' : 'bg-black text-white dark:bg-white dark:text-black'}`}
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : integrations.slack ? 'Disconnect' : 'Connect'}
            </button>
          </div>

          {/* Google Calendar */}
          <div className="bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 p-6 rounded-2xl flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center font-bold text-white text-xl">31</div>
              {integrations.google_calendar && <CheckCircle className="text-green-500 w-5 h-5" />}
            </div>
            <h3 className="text-xl font-bold mb-2">Google Calendar</h3>
            <p className="text-sm text-zinc-500 mb-6 flex-1">Sync your mandates with your calendar. Auto-schedule focus blocks.</p>
            <button 
              onClick={() => handleConnect('google_calendar')}
              disabled={loading}
              className={`w-full py-2 rounded-xl font-bold text-sm transition ${integrations.google_calendar ? 'bg-red-50 text-red-600 dark:bg-red-500/10' : 'bg-black text-white dark:bg-white dark:text-black'}`}
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : integrations.google_calendar ? 'Disconnect' : 'Connect'}
            </button>
          </div>

          {/* Developer API */}
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-col text-white">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center font-mono text-xl">{`{ }`}</div>
            </div>
            <h3 className="text-xl font-bold mb-2">Developer API</h3>
            <p className="text-sm text-zinc-400 mb-6 flex-1">Build custom integrations with the Mandate REST API and Webhooks.</p>
            <button className="w-full py-2 bg-zinc-800 rounded-xl font-bold text-sm hover:bg-zinc-700 transition flex items-center justify-center">
              View Docs <ExternalLink className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationsPage;
