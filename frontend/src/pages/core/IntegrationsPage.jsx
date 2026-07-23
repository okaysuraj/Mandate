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
      <div className="bg-surface min-h-full pb-xl">
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="mb-xl flex flex-col md:flex-row md:items-end justify-between gap-md">
            <div>
              <h1 className="font-headline-lg text-headline-lg text-primary uppercase tracking-tight mb-xs">External Linkages</h1>
              <p className="font-body-md text-on-surface-variant max-w-xl">Configure APIs, webhooks, and third-party data synchronization protocols.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-lg">
            {/* Slack */}
            <div className="col-span-12 md:col-span-4 bg-surface-container-lowest border border-outline-variant p-lg rounded-none flex flex-col h-full">
              <div className="flex justify-between items-start mb-lg">
                <div className="w-12 h-12 bg-primary flex items-center justify-center font-bold text-on-primary text-xl border border-outline-variant">#</div>
                {integrations.slack && <span className="material-symbols-outlined text-tertiary-fixed-dim" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>}
              </div>
              <h3 className="font-headline-lg text-headline-lg-mobile text-primary uppercase mb-xs">Slack</h3>
              <p className="font-body-md text-label-sm text-on-surface-variant mb-xl flex-1">Receive mandate updates and @mentions directly in your Slack channels.</p>
              <button 
                onClick={() => handleConnect('slack')}
                disabled={loading}
                className={`w-full py-md font-label-caps text-label-caps tracking-widest border transition-colors ${integrations.slack ? 'bg-error-container border-error-container text-on-error-container hover:bg-error hover:text-on-error' : 'bg-primary border-primary text-on-primary hover:opacity-90'}`}
              >
                {loading ? "PROCESSING..." : integrations.slack ? 'SEVER_LINK' : 'ESTABLISH_LINK'}
              </button>
            </div>

            {/* Google Calendar */}
            <div className="col-span-12 md:col-span-4 bg-surface-container-lowest border border-outline-variant p-lg rounded-none flex flex-col h-full">
              <div className="flex justify-between items-start mb-lg">
                <div className="w-12 h-12 bg-surface-container-high border border-outline-variant flex items-center justify-center font-label-caps text-label-caps text-primary">31</div>
                {integrations.googleCalendar && <span className="material-symbols-outlined text-tertiary-fixed-dim" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>}
              </div>
              <h3 className="font-headline-lg text-headline-lg-mobile text-primary uppercase mb-xs">G_Calendar</h3>
              <p className="font-body-md text-label-sm text-on-surface-variant mb-xl flex-1">Sync your mandates with your calendar. Auto-schedule focus blocks.</p>
              <button 
                onClick={() => handleConnect('googleCalendar')}
                disabled={loading}
                className={`w-full py-md font-label-caps text-label-caps tracking-widest border transition-colors ${integrations.googleCalendar ? 'bg-error-container border-error-container text-on-error-container hover:bg-error hover:text-on-error' : 'bg-primary border-primary text-on-primary hover:opacity-90'}`}
              >
                {loading ? "PROCESSING..." : integrations.googleCalendar ? 'SEVER_LINK' : 'ESTABLISH_LINK'}
              </button>
            </div>

            {/* Developer API */}
            <div className="col-span-12 md:col-span-4 bg-primary text-on-primary border border-on-primary p-lg rounded-none flex flex-col h-full">
              <div className="flex justify-between items-start mb-lg">
                <div className="w-12 h-12 border border-outline-variant flex items-center justify-center font-label-caps text-label-caps">{`{ }`}</div>
              </div>
              <h3 className="font-headline-lg text-headline-lg-mobile uppercase mb-xs">API_Access</h3>
              <p className="font-body-md text-label-sm opacity-70 mb-xl flex-1">Build custom integrations with the Mandate REST API and Webhooks.</p>
              <button className="w-full py-md font-label-caps text-label-caps tracking-widest border border-outline-variant hover:bg-on-primary hover:text-primary transition-colors flex items-center justify-center gap-2">
                VIEW_DOCUMENTATION <span className="material-symbols-outlined text-[16px]">open_in_new</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default IntegrationsPage;
