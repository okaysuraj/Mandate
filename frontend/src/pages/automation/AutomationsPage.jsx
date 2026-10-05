import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import AppLayout from '../../components/layout/AppLayout';
import toast from 'react-hot-toast';

const AutomationsPage = () => {
  const { user } = useAuth();
  const [automations, setAutomations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [filter, setFilter] = useState('ALL_RULES');
  
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
      setAutomations(data || []);
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
      toast.success(data.isActive ? 'Protocol Activated' : 'Protocol Paused');
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

  const filteredAutomations = automations.filter(a => {
    if (filter === 'ACTIVE_ONLY') return a.isActive;
    if (filter === 'PAUSED_ONLY') return !a.isActive;
    return true;
  });

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-3">
            <span className="material-symbols-outlined text-4xl text-primary animate-spin">sync</span>
            <span className="font-label-caps text-label-caps text-on-surface-variant tracking-widest animate-pulse">INITIATING_SYSTEMS...</span>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto w-full px-4 md:px-6 py-6 space-y-6">
        {/* Page Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-primary text-xl">smart_toy</span>
              <span className="font-label-caps text-label-caps text-on-surface-variant tracking-wider uppercase">Automation Layer</span>
            </div>
            <h1 className="font-headline-lg text-2xl md:text-3xl font-extrabold text-on-surface tracking-tight">Automation Rules</h1>
            <p className="text-xs md:text-sm text-on-surface-variant font-mono mt-1">WORKSPACE PROTOCOL DIRECTORY: /CORE/AUTOMATION</p>
          </div>
          <div className="flex items-center gap-2.5">
            <button 
              onClick={() => setIsCreating(!isCreating)}
              className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 bg-primary text-on-primary font-label-caps text-xs tracking-wider rounded-xl font-semibold hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <span className="material-symbols-outlined text-lg">{isCreating ? "close" : "add"}</span>
              {isCreating ? "CANCEL" : "NEW PROTOCOL"}
            </button>
          </div>
        </div>

        {/* Create Protocol Drawer / Form */}
        {isCreating && (
          <div className="bg-surface-container-lowest border border-outline-variant p-5 md:p-6 rounded-2xl shadow-sm space-y-5 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between border-b border-outline-variant pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-base">terminal</span>
                <h3 className="font-label-caps text-xs font-bold text-on-surface uppercase tracking-widest">INJECT_NEW_PROTOCOL</h3>
              </div>
              <button onClick={() => setIsCreating(false)} className="text-on-surface-variant hover:text-on-surface">
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
            <form onSubmit={handleCreateAutomation} className="space-y-4">
              <div>
                <label className="font-label-caps text-xs text-on-surface-variant block mb-1.5 font-medium">PROTOCOL_IDENTIFIER (NAME)</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-surface-container border border-outline-variant px-3.5 py-2.5 text-sm font-mono text-on-surface rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  placeholder="e.g. ESCALATE_OVERDUE_TASKS"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-label-caps text-xs text-on-surface-variant block mb-1.5 font-medium">TRIGGER_CONDITION</label>
                  <select 
                    value={trigger} 
                    onChange={e => setTrigger(e.target.value)}
                    className="w-full bg-surface-container border border-outline-variant px-3.5 py-2.5 text-sm font-mono text-on-surface rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors cursor-pointer"
                  >
                    <option value="status_changed">EVENT: STATUS_MUTATION</option>
                    <option value="task_created">EVENT: ENTITY_CREATION</option>
                    <option value="priority_changed">EVENT: PRIORITY_SHIFT</option>
                  </select>
                </div>
                
                <div>
                  <label className="font-label-caps text-xs text-on-surface-variant block mb-1.5 font-medium">EXECUTION_ACTION</label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <select 
                      value={action} 
                      onChange={e => setAction(e.target.value)}
                      className="flex-1 bg-surface-container border border-outline-variant px-3.5 py-2.5 text-sm font-mono text-on-surface rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors cursor-pointer"
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
                      className="sm:w-1/3 bg-surface-container border border-outline-variant px-3.5 py-2.5 text-sm font-mono text-on-surface rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-outline-variant">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2.5 border border-outline-variant text-on-surface text-xs font-semibold rounded-xl hover:bg-surface-container transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={!name.trim()} 
                  className="px-5 py-2.5 bg-primary text-on-primary font-label-caps text-xs font-bold rounded-xl hover:opacity-90 disabled:opacity-50 transition-all shadow-xs"
                >
                  COMPILE &amp; INJECT
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Filter and Count Bar */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-3 md:p-4 flex flex-wrap items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="font-label-caps text-xs text-on-surface-variant font-medium">FILTER:</span>
            <select 
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="bg-surface-container border border-outline-variant rounded-lg px-2.5 py-1.5 text-xs font-mono text-on-surface focus:outline-none cursor-pointer"
            >
              <option value="ALL_RULES">ALL RULES ({automations.length})</option>
              <option value="ACTIVE_ONLY">ACTIVE ONLY</option>
              <option value="PAUSED_ONLY">PAUSED ONLY</option>
            </select>
          </div>
          <div className="text-xs font-mono text-on-surface-variant">
            ACTIVE FLEET: <span className="font-bold text-on-surface">{automations.filter(a => a.isActive).length}/{automations.length}</span>
          </div>
        </div>

        {/* Protocols Display: Mobile Cards (< md) */}
        <div className="block md:hidden space-y-3">
          {filteredAutomations.map((automation, idx) => (
            <div 
              key={automation._id}
              className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 space-y-3 shadow-xs"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono text-primary font-bold px-2 py-0.5 rounded-full bg-surface-container border border-outline-variant">
                    #AC-{String(automation._id || idx).slice(-4).toUpperCase()}
                  </span>
                  <h4 className="font-bold text-sm text-on-surface uppercase mt-1.5">{automation.name}</h4>
                </div>
                {automation.isActive ? (
                  <span className="px-2.5 py-0.5 bg-tertiary-container text-on-tertiary-container border border-outline-variant rounded-full text-[10px] font-bold tracking-wider uppercase">
                    ACTIVE
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 bg-surface-container-high text-on-surface-variant border border-outline-variant rounded-full text-[10px] font-bold tracking-wider uppercase">
                    PAUSED
                  </span>
                )}
              </div>

              <div className="bg-surface-container/60 border border-outline-variant/60 rounded-lg p-2.5 text-xs font-mono space-y-1">
                <div className="flex items-center gap-1.5 text-on-surface">
                  <span className="material-symbols-outlined text-sm text-primary">bolt</span>
                  <span className="text-on-surface-variant">Trigger:</span>
                  <span className="font-bold">{automation.trigger.toUpperCase()}</span>
                </div>
                <div className="flex items-center gap-1.5 text-on-surface">
                  <span className="material-symbols-outlined text-sm text-on-surface-variant">arrow_forward</span>
                  <span className="text-on-surface-variant">Action:</span>
                  <span className="font-bold">{automation.action} &rarr; {automation.actionValue}</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-outline-variant/50">
                <button
                  onClick={() => toggleStatus(automation)}
                  className={`min-h-[38px] px-3 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    automation.isActive 
                      ? 'border-outline-variant text-on-surface-variant hover:bg-surface-container' 
                      : 'border-primary text-primary hover:bg-primary/10'
                  }`}
                >
                  <span className="material-symbols-outlined text-base">
                    {automation.isActive ? 'pause' : 'play_arrow'}
                  </span>
                  {automation.isActive ? 'Pause' : 'Activate'}
                </button>
                <button
                  onClick={() => deleteAutomation(automation._id)}
                  className="min-h-[38px] px-3 rounded-lg border border-error/30 text-error hover:bg-error/10 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <span className="material-symbols-outlined text-base">delete</span>
                  Purge
                </button>
              </div>
            </div>
          ))}

          {filteredAutomations.length === 0 && (
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 text-center text-on-surface-variant text-sm font-mono">
              NO_PROTOCOLS_MATCH_QUERY.
            </div>
          )}
        </div>

        {/* Protocols Display: Desktop Table (md+) */}
        <div className="hidden md:block bg-surface-container-lowest border border-outline-variant rounded-2xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono border-collapse">
              <thead>
                <tr className="bg-surface-container-low border-b border-outline-variant">
                  <th className="px-4 py-3 font-label-caps text-xs text-on-surface-variant uppercase tracking-wider font-semibold">RULE_ID</th>
                  <th className="px-4 py-3 font-label-caps text-xs text-on-surface-variant uppercase tracking-wider font-semibold">PROTOCOL_NAME</th>
                  <th className="px-4 py-3 font-label-caps text-xs text-on-surface-variant uppercase tracking-wider font-semibold">TRIGGER_SOURCE</th>
                  <th className="px-4 py-3 font-label-caps text-xs text-on-surface-variant uppercase tracking-wider font-semibold">STATUS</th>
                  <th className="px-4 py-3 font-label-caps text-xs text-on-surface-variant uppercase tracking-wider font-semibold text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/60">
                {filteredAutomations.map((automation, idx) => (
                  <tr key={automation._id} className="hover:bg-surface-container/50 transition-colors">
                    <td className="px-4 py-3.5 text-primary font-bold text-xs">
                      #AC-{String(automation._id || idx).slice(-4).toUpperCase()}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="font-bold text-sm text-on-surface uppercase tracking-tight">{automation.name}</div>
                      <div className="text-[11px] text-on-surface-variant font-mono mt-0.5">
                        ACTION: <span className="font-semibold text-on-surface">{automation.action}</span> &rarr; {automation.actionValue}
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="inline-flex items-center gap-1.5 text-xs text-on-surface bg-surface-container px-2.5 py-1 rounded-lg border border-outline-variant">
                        <span className="material-symbols-outlined text-[15px] text-primary">bolt</span>
                        {automation.trigger.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      {automation.isActive ? (
                        <span className="px-2.5 py-1 bg-tertiary-container text-on-tertiary-container border border-outline-variant rounded-full text-[10px] font-bold tracking-widest uppercase">
                          ACTIVE
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 bg-surface-container-high text-on-surface-variant border border-outline-variant rounded-full text-[10px] font-bold tracking-widest uppercase">
                          PAUSED
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button 
                          onClick={() => toggleStatus(automation)} 
                          className="p-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
                          title={automation.isActive ? "Pause Protocol" : "Activate Protocol"}
                        >
                          <span className="material-symbols-outlined text-lg">
                            {automation.isActive ? "pause_circle" : "play_circle"}
                          </span>
                        </button>
                        <button 
                          onClick={() => deleteAutomation(automation._id)} 
                          className="p-1.5 rounded-lg text-on-surface-variant hover:text-error hover:bg-error/10 transition-colors"
                          title="Purge Protocol"
                        >
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredAutomations.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-4 py-12 text-center font-mono text-sm text-on-surface-variant">
                      NO_PROTOCOLS_FOUND. AWAITING_INJECTION.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bento Dashboard Modules */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
          <div className="bg-surface-container-lowest border border-outline-variant p-5 rounded-2xl flex flex-col justify-between shadow-xs">
            <div className="flex justify-between items-start mb-2">
              <span className="font-label-caps text-xs text-on-surface-variant uppercase tracking-wider font-semibold">EXECUTION_VELOCITY</span>
              <span className="material-symbols-outlined text-primary text-xl">speed</span>
            </div>
            <div className="font-headline-lg text-3xl font-bold text-on-surface">1.2ms</div>
            <div className="flex items-center gap-1.5 text-xs text-on-tertiary-container mt-2 font-mono">
              <span className="material-symbols-outlined text-sm">arrow_downward</span>
              <span>14% FASTER THAN BASELINE</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant p-5 rounded-2xl flex flex-col justify-between shadow-xs">
            <div className="flex justify-between items-start mb-2">
              <span className="font-label-caps text-xs text-on-surface-variant uppercase tracking-wider font-semibold">FLEET_SUCCESS_RATE</span>
              <span className="material-symbols-outlined text-tertiary text-xl">check_circle</span>
            </div>
            <div className="font-headline-lg text-3xl font-bold text-on-surface">99.98%</div>
            <div className="flex items-center gap-1.5 text-xs text-on-tertiary-container mt-2 font-mono">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              <span>NOMINAL EXECUTION STABLE</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant p-5 rounded-2xl flex flex-col justify-between shadow-xs sm:col-span-2 md:col-span-1">
            <div className="flex justify-between items-start mb-2">
              <span className="font-label-caps text-xs text-on-surface-variant uppercase tracking-wider font-semibold">ACTIVE_INSTANCES</span>
              <span className="material-symbols-outlined text-primary text-xl">lan</span>
            </div>
            <div className="font-headline-lg text-3xl font-bold text-on-surface">{automations.length * 12}</div>
            <div className="flex items-center gap-1.5 text-xs text-on-surface-variant mt-2 font-mono">
              <span className="material-symbols-outlined text-sm">sensors</span>
              <span>{automations.length} PROTOCOL DISPATCHERS READY</span>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default AutomationsPage;
