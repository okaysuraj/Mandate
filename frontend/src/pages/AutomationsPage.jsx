import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Settings2, Plus, ArrowLeft, Loader2, Zap } from 'lucide-react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

const AutomationsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
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
      toast.error('Failed to load automations');
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
      toast.success('Automation rule created!');
    } catch (error) {
      toast.error('Failed to create automation');
    }
  };

  const toggleStatus = async (automation) => {
    try {
      const { data } = await axios.put(`/api/automations/${automation._id}`, { isActive: !automation.isActive });
      setAutomations(automations.map(a => a._id === data._id ? data : a));
    } catch (error) {
      toast.error('Failed to update automation');
    }
  };

  const deleteAutomation = async (id) => {
    try {
      await axios.delete(`/api/automations/${id}`);
      setAutomations(automations.filter(a => a._id !== id));
      toast.success('Automation deleted');
    } catch (error) {
      toast.error('Failed to delete automation');
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-zinc-50 dark:bg-[#050505]"><Loader2 className="w-8 h-8 animate-spin" /></div>;
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#050505] text-black dark:text-white transition-colors duration-300">
      <div className="max-w-5xl mx-auto p-8">
        <button onClick={() => navigate(-1)} className="flex items-center text-sm font-semibold text-zinc-500 hover:text-black dark:hover:text-white transition mb-8">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Home
        </button>

        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-2 flex items-center">
              <Settings2 className="w-8 h-8 mr-3 text-indigo-500" /> 
              Rule Engine
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400">If-this-then-that automations for your workspace.</p>
          </div>
          <button 
            onClick={() => setIsCreating(true)}
            className="flex items-center px-4 py-2 bg-black text-white dark:bg-white dark:text-black font-semibold rounded-xl hover:scale-105 transition-transform"
          >
            <Plus className="w-5 h-5 mr-1" /> New Rule
          </button>
        </div>

        {isCreating && (
          <form onSubmit={handleCreateAutomation} className="mb-8 p-6 bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-2xl shadow-sm space-y-4">
            <h3 className="text-lg font-bold">Create New Automation</h3>
            
            <div>
              <label className="block text-xs font-bold text-zinc-500 mb-1 uppercase tracking-wider">Rule Name</label>
              <input 
                type="text" 
                placeholder="e.g. Auto-prioritize overdue tasks"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-zinc-100 dark:bg-zinc-800 border-none rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-500 mb-1 uppercase tracking-wider">When this happens (Trigger)</label>
                <select 
                  value={trigger} 
                  onChange={e => setTrigger(e.target.value)}
                  className="w-full bg-zinc-100 dark:bg-zinc-800 border-none rounded-lg p-3 text-sm focus:outline-none"
                >
                  <option value="status_changed">Task Status is Changed</option>
                  <option value="task_created">Task is Created</option>
                  <option value="priority_changed">Task Priority is Changed</option>
                </select>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-zinc-500 mb-1 uppercase tracking-wider">Do this (Action)</label>
                <div className="flex gap-2">
                  <select 
                    value={action} 
                    onChange={e => setAction(e.target.value)}
                    className="flex-1 bg-zinc-100 dark:bg-zinc-800 border-none rounded-lg p-3 text-sm focus:outline-none"
                  >
                    <option value="change_priority">Change Priority</option>
                    <option value="change_status">Change Status</option>
                    <option value="add_tag">Add Tag</option>
                  </select>
                  <input 
                    type="text"
                    value={actionValue}
                    onChange={e => setActionValue(e.target.value)}
                    placeholder="Value (e.g. 'high')"
                    className="w-1/3 bg-zinc-100 dark:bg-zinc-800 border-none rounded-lg p-3 text-sm focus:outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <button type="button" onClick={() => setIsCreating(false)} className="px-4 py-2 text-sm font-semibold text-zinc-500">Cancel</button>
              <button type="submit" disabled={!name.trim()} className="px-4 py-2 text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg disabled:opacity-50">Save Rule</button>
            </div>
          </form>
        )}

        <div className="space-y-4">
          {automations.map(automation => (
            <div key={automation._id} className="flex items-center justify-between bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 p-6 rounded-2xl shadow-sm hover:border-indigo-500/50 transition-colors group">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${automation.isActive ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400' : 'bg-zinc-100 text-zinc-400 dark:bg-white/5'}`}>
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className={`text-lg font-bold ${!automation.isActive && 'text-zinc-400 line-through'}`}>{automation.name}</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    If <span className="font-semibold">{automation.trigger}</span>, then <span className="font-semibold">{automation.action}</span> to '{automation.actionValue}'
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => toggleStatus(automation)}
                  className={`px-3 py-1 rounded-full text-xs font-bold ${automation.isActive ? 'bg-green-100 text-green-700' : 'bg-zinc-200 text-zinc-600'}`}
                >
                  {automation.isActive ? 'ON' : 'OFF'}
                </button>
                <button 
                  onClick={() => deleteAutomation(automation._id)}
                  className="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity text-sm font-semibold"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {automations.length === 0 && !isCreating && (
            <div className="py-20 text-center text-zinc-500">
              No automations set up yet. Create a rule to save time!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AutomationsPage;
