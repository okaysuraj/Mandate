import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Calendar, Flag, Folder, Zap, 
  ChevronDown, ChevronUp, Clock, Battery, Sparkles 
} from 'lucide-react';
import api from '../lib/axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { User as UserIcon } from 'lucide-react';

const TaskComposer = ({ isOpen, onClose, onTaskCreated, parentTaskId }) => {
  const [title, setTitle] = useState('');
  const [intent, setIntent] = useState('');
  const [tags, setTags] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');
  const [projectId, setProjectId] = useState('');
  const [assigneeId, setAssigneeId] = useState('');
  const [workspaceMembers, setWorkspaceMembers] = useState([]);
  
  const { user } = useAuth();
  
  // Advanced fields
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [recurrence, setRecurrence] = useState('');
  const [timeEstimate, setTimeEstimate] = useState('');
  const [energyLevel, setEnergyLevel] = useState('');

  const [loading, setLoading] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const titleInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => titleInputRef.current?.focus(), 100);
      // Reset form
      setTitle('');
      setIntent('');
      setTags('');
      setDueDate('');
      setPriority('medium');
      setAssigneeId('');
      setShowAdvanced(false);
      
      // Fetch members
      if (user?.activeWorkspace) {
        api.get(`/workspaces/${user.activeWorkspace}/members`)
          .then(res => setWorkspaceMembers(res.data))
          .catch(err => console.error(err));
      }
    }
  }, [isOpen, user]);

  const handleParse = async () => {
    if (!title.trim()) return;
    setIsParsing(true);
    toast.loading('AI is parsing your input...', { id: 'parse-toast' });
    try {
      const { data } = await api.post('/ai/parse-task', { input: title });
      setTitle(data.title || title);
      if (data.tags?.length > 0) setTags(data.tags.join(', '));
      if (data.priority) setPriority(data.priority);
      if (data.intent) setIntent(data.intent);
      toast.success('Parsed successfully!', { id: 'parse-toast' });
    } catch (error) {
      toast.error('Failed to parse input', { id: 'parse-toast' });
    } finally {
      setIsParsing(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    try {
      const res = await api.post('/tasks', {
        title,
        intent,
        dueDate: dueDate || undefined,
        priority,
        projectId: projectId || undefined,
        recurrenceRule: recurrence || undefined,
        timeEstimate: timeEstimate ? parseInt(timeEstimate, 10) : undefined,
        energyLevel: energyLevel || undefined,
        parentTaskId: parentTaskId || undefined,
        assigneeId: assigneeId || undefined,
        tags: tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : undefined,
      });
      
      toast.success('Task created successfully');
      if (onTaskCreated) onTaskCreated(res.data);
      onClose();
    } catch (error) {
      console.error('Failed to create task:', error);
      toast.error('Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  // Keyboard shortcut to submit
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSubmit(e);
    }
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        
        {/* Modal */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-white dark:bg-[#0f0f0f] border border-zinc-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] transition-colors"
          onKeyDown={handleKeyDown}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-white/10">
            <h3 className="text-lg font-semibold text-black dark:text-white">Create Mandate</h3>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-white/10 text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <div className="p-6 overflow-y-auto custom-scrollbar">
            <div className="relative mb-6">
              <input 
                ref={titleInputRef}
                type="text" 
                placeholder="What needs to be done? (e.g. Call John tomorrow #sales p1)"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full bg-transparent text-3xl font-bold text-black dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none pr-12"
              />
              <button 
                onClick={handleParse}
                disabled={isParsing || !title.trim()}
                title="Smart Parse with AI"
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition disabled:opacity-50"
              >
                <Sparkles className="w-5 h-5" />
              </button>
            </div>

            {/* Differentiator: Why */}
            <div className="mb-6 group">
              <label className="flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">
                <Zap className="w-4 h-4 mr-1.5" />
                Why is this important? (Intent)
              </label>
              <textarea 
                placeholder="Connecting this task to a clear purpose helps you stay committed..."
                value={intent}
                onChange={e => setIntent(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-xl p-3 text-black dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all min-h-[80px] resize-y"
              />
            </div>

            {/* Core Fields */}
            <div className="flex flex-wrap gap-3 mb-6">
              {/* Due Date */}
              <div className="flex items-center bg-zinc-50 dark:bg-white/5 rounded-lg border border-zinc-200 dark:border-white/10 p-1 px-3">
                <Calendar className="w-4 h-4 text-zinc-500 dark:text-zinc-400 mr-2" />
                <input 
                  type="date" 
                  value={dueDate}
                  onChange={e => setDueDate(e.target.value)}
                  className="bg-transparent text-sm text-black dark:text-white focus:outline-none"
                />
              </div>

              {/* Tags */}
              <div className="flex items-center bg-zinc-50 dark:bg-white/5 rounded-lg border border-zinc-200 dark:border-white/10 p-1 px-3">
                <span className="text-zinc-500 dark:text-zinc-400 font-bold mr-2">#</span>
                <input 
                  type="text" 
                  placeholder="tags (comma separated)"
                  value={tags}
                  onChange={e => setTags(e.target.value)}
                  className="bg-transparent text-sm text-black dark:text-white focus:outline-none"
                />
              </div>

              {/* Priority */}
              <div className="flex items-center bg-zinc-50 dark:bg-white/5 rounded-lg border border-zinc-200 dark:border-white/10 p-1 px-3">
                <Flag className={`w-4 h-4 mr-2 ${priority === 'high' ? 'text-red-500 dark:text-red-400' : priority === 'medium' ? 'text-yellow-500 dark:text-yellow-400' : 'text-green-500 dark:text-green-400'}`} />
                <select 
                  value={priority}
                  onChange={e => setPriority(e.target.value)}
                  className="bg-transparent text-sm text-black dark:text-white focus:outline-none appearance-none pr-4"
                >
                  <option value="low" className="bg-white dark:bg-[#0f0f0f]">Low Priority</option>
                  <option value="medium" className="bg-white dark:bg-[#0f0f0f]">Medium Priority</option>
                  <option value="high" className="bg-white dark:bg-[#0f0f0f]">High Priority</option>
                </select>
              </div>

              {/* Project (Mocked for now) */}
              <div className="flex items-center bg-zinc-50 dark:bg-white/5 rounded-lg border border-zinc-200 dark:border-white/10 p-1 px-3">
                <Folder className="w-4 h-4 text-zinc-500 dark:text-zinc-400 mr-2" />
                <select 
                  value={projectId}
                  onChange={e => setProjectId(e.target.value)}
                  className="bg-transparent text-sm text-black dark:text-white focus:outline-none appearance-none pr-4"
                >
                  <option value="" className="bg-white dark:bg-[#0f0f0f]">No Project</option>
                  {/* Dynamic projects would go here */}
                </select>
              </div>

              {/* Assignee */}
              {workspaceMembers.length > 0 && (
                <div className="flex items-center bg-zinc-50 dark:bg-white/5 rounded-lg border border-zinc-200 dark:border-white/10 p-1 px-3">
                  <UserIcon className="w-4 h-4 text-zinc-500 dark:text-zinc-400 mr-2" />
                  <select 
                    value={assigneeId}
                    onChange={e => setAssigneeId(e.target.value)}
                    className="bg-transparent text-sm text-black dark:text-white focus:outline-none appearance-none pr-4"
                  >
                    <option value="" className="bg-white dark:bg-[#0f0f0f]">Unassigned</option>
                    {workspaceMembers.map(m => (
                      <option key={m.user._id} value={m.user._id} className="bg-white dark:bg-[#0f0f0f]">
                        {m.user.name} ({m.role})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Advanced Toggle */}
            <button 
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center text-sm text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition mb-4"
            >
              {showAdvanced ? <ChevronUp className="w-4 h-4 mr-1" /> : <ChevronDown className="w-4 h-4 mr-1" />}
              Advanced Options
            </button>

            {/* Advanced Fields */}
            <AnimatePresence>
              {showAdvanced && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center text-xs font-semibold text-zinc-500 mb-1.5 uppercase">
                        <Clock className="w-3 h-3 mr-1" /> Time Estimate (mins)
                      </label>
                      <input 
                        type="number" 
                        value={timeEstimate}
                        onChange={e => setTimeEstimate(e.target.value)}
                        placeholder="e.g. 45"
                        className="w-full bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-lg p-2 text-sm text-black dark:text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="flex items-center text-xs font-semibold text-zinc-500 mb-1.5 uppercase">
                        <Battery className="w-3 h-3 mr-1" /> Energy Level
                      </label>
                      <select 
                        value={energyLevel}
                        onChange={e => setEnergyLevel(e.target.value)}
                        className="w-full bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-lg p-2.5 text-sm text-black dark:text-white focus:outline-none appearance-none"
                      >
                        <option value="" className="bg-white dark:bg-[#0f0f0f]">Any</option>
                        <option value="high" className="bg-white dark:bg-[#0f0f0f]">High Energy</option>
                        <option value="medium" className="bg-white dark:bg-[#0f0f0f]">Medium Energy</option>
                        <option value="low" className="bg-white dark:bg-[#0f0f0f]">Low Energy</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-4 border-t border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-black/20">
            <div className="text-xs text-zinc-500 flex items-center">
              <span className="border border-zinc-300 dark:border-zinc-700 rounded px-1.5 py-0.5 mr-1 font-mono">⌘</span>
              <span className="border border-zinc-300 dark:border-zinc-700 rounded px-1.5 py-0.5 mr-2 font-mono">Enter</span>
              to save
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition"
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmit}
                disabled={loading || !title.trim()}
                className="px-6 py-2 text-sm font-semibold bg-black text-white dark:bg-white dark:text-black rounded-lg hover:bg-zinc-800 dark:hover:bg-gray-200 transition disabled:opacity-50 flex items-center shadow-sm dark:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
              >
                {loading ? 'Saving...' : 'Create Task'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TaskComposer;
