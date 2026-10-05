import React, { useState, useEffect } from 'react';
import AppLayout from '../../components/layout/AppLayout';
import { useWorkspace } from '../../context/WorkspaceContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const IntegrationsPage = () => {
  const { activeWorkspace } = useWorkspace();
  const [integrations, setIntegrations] = useState({
    slack: false,
    googleCalendar: false,
    github: false,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeWorkspace?.integrations) {
      setIntegrations({
        ...integrations,
        slack: !!activeWorkspace.integrations.slack,
        googleCalendar: !!activeWorkspace.integrations.googleCalendar,
      });
    }
  }, [activeWorkspace]);
  
  const handleConnect = async (service) => {
    if (!activeWorkspace) return;
    
    setLoading(true);
    try {
      const newState = !integrations[service];
      const { data } = await axios.put(`/api/workspaces/${activeWorkspace._id}/integrations`, {
        integration: service,
        state: newState
      });
      setIntegrations(prev => ({ ...prev, [service]: newState }));
      toast.success(newState ? `MANDATE_OS: ${service.toUpperCase()} LINK ESTABLISHED` : `MANDATE_OS: ${service.toUpperCase()} LINK SEVERED`);
    } catch (error) {
      toast.error(error.response?.data?.message || `MANDATE_OS: FAILED TO CONFIGURE ${service.toUpperCase()}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="bg-surface min-h-full pb-xl px-4 sm:px-6 md:px-8 py-6">
        <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-outline-variant/40 pb-6">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block"></span>
                <span className="font-mono text-xs uppercase font-bold text-on-surface-variant tracking-widest">
                  EXTERNAL ECOSYSTEM
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-on-surface uppercase tracking-tight">
                External Linkages
              </h1>
              <p className="text-sm text-on-surface-variant max-w-xl mt-1">
                Configure APIs, webhooks, and third-party data synchronization protocols.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Slack */}
            <div className="bg-surface-container-lowest border border-outline-variant/60 p-6 sm:p-8 rounded-2xl flex flex-col justify-between shadow-sm hover:border-primary/40 transition-all">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center font-bold text-on-primary text-xl shadow-xs">#</div>
                  {integrations.slack && (
                    <span className="flex items-center gap-1 font-mono text-[10px] uppercase font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">
                      <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                      LINKED
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-on-surface uppercase mb-1">Slack</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed mb-6">Receive mandate updates, sprint completions, and @mentions directly in designated Slack channels.</p>
              </div>
              <button 
                onClick={() => handleConnect('slack')}
                disabled={loading}
                className={`w-full py-3 rounded-xl font-mono text-xs font-bold tracking-wider transition-all cursor-pointer uppercase ${integrations.slack ? 'bg-error-container text-on-error-container hover:bg-error hover:text-on-error' : 'bg-primary text-on-primary hover:opacity-90 active:scale-95 shadow-sm'}`}
              >
                {loading ? "PROCESSING..." : integrations.slack ? 'SEVER LINK' : 'ESTABLISH LINK'}
              </button>
            </div>

            {/* Google Calendar */}
            <div className="bg-surface-container-lowest border border-outline-variant/60 p-6 sm:p-8 rounded-2xl flex flex-col justify-between shadow-sm hover:border-primary/40 transition-all">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-surface-container-high rounded-xl border border-outline-variant/80 flex items-center justify-center font-mono text-base font-bold text-primary shadow-xs">31</div>
                  {integrations.googleCalendar && (
                    <span className="flex items-center gap-1 font-mono text-[10px] uppercase font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">
                      <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                      LINKED
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-on-surface uppercase mb-1">Google Calendar</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed mb-6">Sync your deadlines with calendar timelines. Auto-schedule deep work sessions into daily slots.</p>
              </div>
              <button 
                onClick={() => handleConnect('googleCalendar')}
                disabled={loading}
                className={`w-full py-3 rounded-xl font-mono text-xs font-bold tracking-wider transition-all cursor-pointer uppercase ${integrations.googleCalendar ? 'bg-error-container text-on-error-container hover:bg-error hover:text-on-error' : 'bg-primary text-on-primary hover:opacity-90 active:scale-95 shadow-sm'}`}
              >
                {loading ? "PROCESSING..." : integrations.googleCalendar ? 'SEVER LINK' : 'ESTABLISH LINK'}
              </button>
            </div>

            {/* Developer API */}
            <div className="bg-gradient-to-br from-primary to-primary/80 text-on-primary p-6 sm:p-8 rounded-2xl flex flex-col justify-between shadow-lg relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-28 h-28 bg-white/5 rounded-full pointer-events-none"></div>
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-xl border border-white/20 bg-white/10 flex items-center justify-center font-mono text-sm font-bold">{`{ }`}</div>
                </div>
                <h3 className="text-lg font-bold uppercase mb-1">Developer API</h3>
                <p className="text-xs text-on-primary/80 leading-relaxed mb-6">Build programmatic integrations and dispatch events with the Mandate REST endpoints and Webhooks.</p>
              </div>
              <button className="w-full py-3 font-mono text-xs font-bold tracking-wider bg-white/10 hover:bg-white/20 text-on-primary border border-white/20 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer uppercase">
                DOCUMENTATION <span className="material-symbols-outlined text-sm">open_in_new</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default IntegrationsPage;
