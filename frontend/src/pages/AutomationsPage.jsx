import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import AppLayout from '../components/AppLayout';
import toast from 'react-hot-toast';

const AutomationsPage = () => {
  const { user } = useAuth();
  const [automations, setAutomations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  
  // Form state
  const [name, setName] = useState('');
  const [trigger, setTrigger] = useState('status_changed');
  const [action, setAction] = useState('change_priority');
  const [actionValue, setActionValue] = useState('high');

  const fetchAutomations = async () => {
    if (!user?.activeWorkspace) return;
    try {
      const { data } = await axios.get('/api/automations', {
        params: { workspaceId: user.activeWorkspace }
      });
      setAutomations(data);
    } catch (error) {
      console.error('Failed to load automations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAutomations();
  }, [user]);

  const handleCreateAutomation = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      const { data } = await axios.post('/api/automations', {
        name,
        trigger,
        action,
        actionValue,
        workspaceId: user.activeWorkspace
      });
      setAutomations([...automations, data]);
      setName('');
      setIsCreating(false);
      toast.success('MANDATE_OS: Protocol Injected');
    } catch (error) {
      toast.error('Failed to inject protocol');
    }
  };

  const toggleStatus = async (automation) => {
    try {
      const { data } = await axios.put(`/api/automations/${automation._id}`, { isActive: !automation.isActive });
      setAutomations(automations.map(a => a._id === data._id ? data : a));
    } catch (error) {
      toast.error('Failed to update protocol status');
    }
  };

  const deleteAutomation = async (id) => {
    try {
      await axios.delete(`/api/automations/${id}`);
      setAutomations(automations.filter(a => a._id !== id));
      toast.success('MANDATE_OS: Protocol Purged');
    } catch (error) {
      toast.error('Failed to purge protocol');
    }
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[80vh]">
          <span className="font-label-caps text-label-caps text-on-surface-variant animate-pulse">INITIATING_SYSTEMS...</span>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="bg-surface min-h-full pb-xl flex flex-col">
        {/* Page Header Section */}
        <div className="max-w-5xl mx-auto w-full mb-xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-md">
            <div>
              <h1 className="font-headline-lg text-headline-lg text-primary uppercase tracking-tight">Automation Rules</h1>
              <p className="font-label-sm text-label-sm text-on-surface-variant mt-2 opacity-70">DIRECTORY: /SYSTEM/CORE/AUTOMATION_PROTOCOLS</p>
            </div>
            <div className="flex gap-sm">
              <button 
                onClick={() => setIsCreating(!isCreating)}
                className="px-md py-sm bg-primary text-on-primary font-label-caps text-label-caps hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[16px]">{isCreating ? "close" : "add"}</span>
                {isCreating ? "CANCEL" : "NEW_PROTOCOL"}
              </button>
            </div>
          </div>
        </div>

        {isCreating && (
          <div className="max-w-5xl mx-auto w-full mb-xl bg-surface-container-lowest border border-outline-variant p-lg rounded-none">
            <h3 className="font-label-caps text-label-caps text-primary mb-md uppercase tracking-widest border-b border-outline-variant pb-xs">INJECT_NEW_PROTOCOL</h3>
            <form onSubmit={handleCreateAutomation} className="space-y-lg">
              <div>
                <label className="font-label-caps text-label-caps text-on-surface-variant block mb-2">PROTOCOL_IDENTIFIER (NAME)</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant p-sm font-body-md text-primary focus:ring-1 focus:ring-primary focus:border-primary rounded-none"
                  placeholder="e.g. ESCALATE_OVERDUE_TASKS"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                <div>
                  <label className="font-label-caps text-label-caps text-on-surface-variant block mb-2">TRIGGER_CONDITION</label>
                  <select 
                    value={trigger} 
                    onChange={e => setTrigger(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant p-sm font-label-sm text-label-sm focus:ring-1 focus:ring-primary focus:border-primary rounded-none"
                  >
                    <option value="status_changed">EVENT: STATUS_MUTATION</option>
                    <option value="task_created">EVENT: ENTITY_CREATION</option>
                    <option value="priority_changed">EVENT: PRIORITY_SHIFT</option>
                  </select>
                </div>
                
                <div>
                  <label className="font-label-caps text-label-caps text-on-surface-variant block mb-2">EXECUTION_ACTION</label>
                  <div className="flex gap-sm">
                    <select 
                      value={action} 
                      onChange={e => setAction(e.target.value)}
                      className="flex-1 bg-surface-container-low border border-outline-variant p-sm font-label-sm text-label-sm focus:ring-1 focus:ring-primary focus:border-primary rounded-none"
                    >
                      <option value="change_priority">MUTATE_PRIORITY</option>
                      <option value="change_status">MUTATE_STATUS</option>
                      <option value="add_tag">APPEND_TAG</option>
                    </select>
                    <input 
                      type="text"
                      value={actionValue}
                      onChange={e => setActionValue(e.target.value)}
                      placeholder="TARGET_VALUE"
                      className="w-1/3 bg-surface-container-low border border-outline-variant p-sm font-body-md text-primary focus:ring-1 focus:ring-primary focus:border-primary rounded-none"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-sm border-t border-outline-variant">
                <button type="submit" disabled={!name.trim()} className="px-lg py-sm bg-primary text-on-primary font-label-caps text-label-caps hover:opacity-90 disabled:opacity-50 transition-opacity">COMPILE_AND_SAVE</button>
              </div>
            </form>
          </div>
        )}

        {/* Rules Table Container */}
        <div className="max-w-5xl mx-auto w-full flex-1">
          <div className="bg-surface-container-lowest border border-outline-variant overflow-hidden">
            {/* Filters Bar */}
            <div className="border-b border-outline-variant p-md flex flex-wrap items-center gap-lg">
              <div className="flex items-center gap-sm">
                <span className="font-label-caps text-label-caps text-on-surface-variant opacity-60">SHOW:</span>
                <select className="bg-transparent border-none font-label-sm text-label-sm focus:ring-0 cursor-pointer p-0">
                  <option>ALL_RULES</option>
                  <option>ACTIVE_ONLY</option>
                  <option>PAUSED_ONLY</option>
                </select>
              </div>
              <div className="ml-auto text-on-surface-variant font-label-sm text-label-sm">
                TOTAL: <span className="text-primary font-bold">{automations.length}_PROTOCOLS</span>
              </div>
            </div>
            
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left font-['JetBrains_Mono'] border-collapse">
                <thead>
                  <tr className="bg-surface-container-low border-b border-outline-variant">
                    <th className="px-md py-sm font-label-caps text-label-caps text-on-surface-variant opacity-60">RULE_ID</th>
                    <th className="px-md py-sm font-label-caps text-label-caps text-on-surface-variant opacity-60">PROTOCOL_NAME</th>
                    <th className="px-md py-sm font-label-caps text-label-caps text-on-surface-variant opacity-60">TRIGGER_SOURCE</th>
                    <th className="px-md py-sm font-label-caps text-label-caps text-on-surface-variant opacity-60">STATUS</th>
                    <th className="px-md py-sm font-label-caps text-label-caps text-on-surface-variant opacity-60 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/30">
                  {automations.map((automation, idx) => (
                    <tr key={automation._id} className="hover:bg-surface-container-low transition-colors group">
                      <td className="px-md py-md text-primary font-bold text-sm">#AC-{(automation._id || String(idx)).substring(0,4).toUpperCase()}</td>
                      <td className="px-md py-md">
                        <div className="font-bold text-sm uppercase">{automation.name}</div>
                        <div className="text-[10px] text-on-surface-variant opacity-60 font-label-caps mt-1">ACTION: {automation.action} -&gt; {automation.actionValue}</div>
                      </td>
                      <td className="px-md py-md">
                        <span className="flex items-center gap-2 text-sm">
                          <span className="material-symbols-outlined text-[16px] text-on-surface-variant">bolt</span>
                          {automation.trigger.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-md py-md">
                        {automation.isActive ? (
                          <span className="px-sm py-xs bg-tertiary-container text-on-tertiary-container text-[10px] font-bold tracking-widest uppercase">ACTIVE</span>
                        ) : (
                          <span className="px-sm py-xs bg-surface-dim text-on-surface-variant text-[10px] font-bold tracking-widest uppercase">PAUSED</span>
                        )}
                      </td>
                      <td className="px-md py-md text-right">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex justify-end gap-2">
                          <button onClick={() => toggleStatus(automation)} className="material-symbols-outlined text-primary hover:scale-110" title={automation.isActive ? "Pause" : "Activate"}>
                            {automation.isActive ? "pause" : "play_arrow"}
                          </button>
                          <button onClick={() => deleteAutomation(automation._id)} className="material-symbols-outlined text-error hover:scale-110" title="Delete">delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {automations.length === 0 && (
                    <tr>
                      <td colSpan="5" className="px-md py-xl text-center font-label-sm text-on-surface-variant">NO_PROTOCOLS_FOUND. AWAITING_INJECTION.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Dashboard Modules (Bento Style) */}
          <div className="mt-lg grid grid-cols-1 md:grid-cols-3 gap-lg">
            <div className="bg-surface-container-lowest border border-outline-variant p-lg flex flex-col gap-md rounded-none">
              <div className="flex justify-between items-start">
                <div className="font-label-caps text-label-caps text-on-surface-variant opacity-60">EXECUTION_VELOCITY</div>
                <span className="material-symbols-outlined text-primary">speed</span>
              </div>
              <div className="font-headline-lg text-headline-lg">1.2ms</div>
              <div className="flex items-center gap-2 text-on-tertiary-container font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[14px]">arrow_downward</span>
                14% FROM BASELINE
              </div>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant p-lg flex flex-col gap-md rounded-none">
              <div className="flex justify-between items-start">
                <div className="font-label-caps text-label-caps text-on-surface-variant opacity-60">SUCCESS_RATE</div>
                <span className="material-symbols-outlined text-primary">check_circle</span>
              </div>
              <div className="font-headline-lg text-headline-lg">99.98%</div>
              <div className="flex items-center gap-2 text-on-tertiary-container font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[14px]">trending_up</span>
                STABLE STATE
              </div>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant p-lg flex flex-col gap-md rounded-none">
              <div className="flex justify-between items-start">
                <div className="font-label-caps text-label-caps text-on-surface-variant opacity-60">ACTIVE_INSTANCES</div>
                <span className="material-symbols-outlined text-primary">lan</span>
              </div>
              <div className="font-headline-lg text-headline-lg">{automations.length * 12}</div>
              <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[14px]">sensors</span>
                {automations.length} NODES RESPONDING
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default AutomationsPage;
