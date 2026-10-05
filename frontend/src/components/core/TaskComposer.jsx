import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Calendar, Flag, Folder, Zap, 
  ChevronDown, ChevronUp, Clock, Battery, Sparkles 
} from 'lucide-react';
import api from '../../lib/axios';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
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
      
      toast.success('Mandate registered');
      if (onTaskCreated) onTaskCreated(res.data);
      onClose();
    } catch (error) {
      console.error('Failed to create task:', error);
      toast.error('Failed to register mandate');
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
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        />
        
        {/* Modal */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          className="relative w-full max-w-2xl bg-surface-container-lowest border border-outline-variant rounded-t-2xl sm:rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-on-surface"
          onKeyDown={handleKeyDown}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-3.5 md:p-4 border-b border-outline-variant bg-surface-container flex-shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-primary rounded-full inline-block"></span>
              <h3 className="font-mono text-xs md:text-sm font-black text-primary uppercase tracking-wider">
                Initiate New Mandate / Protocol
              </h3>
            </div>
            <button 
              onClick={onClose} 
              className="w-8 h-8 rounded-full border border-outline-variant hover:border-primary flex items-center justify-center text-on-surface hover:text-primary transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Form */}
          <div className="p-4 md:p-6 overflow-y-auto custom-scrollbar space-y-5">
            {/* Title & AI Parse */}
            <div className="relative">
              <input 
                ref={titleInputRef}
                type="text" 
                placeholder="Directive Title or Command (e.g. Deploy v2.4 to staging #infra p1)"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full bg-transparent text-xl md:text-2xl font-mono font-bold text-on-surface placeholder:text-outline focus:outline-none pr-10 border-b border-outline-variant pb-2"
              />
              <button 
                onClick={handleParse}
                disabled={isParsing || !title.trim()}
                title="Smart AI Directive Parse"
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-xl border border-outline-variant bg-surface-container hover:bg-surface-container-high text-primary transition-all disabled:opacity-40 cursor-pointer shadow-xs"
              >
                <Sparkles className="w-4 h-4" />
              </button>
            </div>

            {/* Strategic Intent */}
            <div>
              <label className="flex items-center text-xs font-mono font-bold text-primary mb-1.5 uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5 mr-1" />
                Strategic Intent / Objective (Why)
              </label>
              <textarea 
                placeholder="Detail purpose, expected outcome, or operational motivation..."
                value={intent}
                onChange={e => setIntent(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant rounded-xl p-3 text-xs md:text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary min-h-[70px] resize-y font-body-md transition-colors"
              />
            </div>

            {/* Core Fields Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Due Date */}
              <div className="flex items-center bg-surface-container-low rounded-xl border border-outline-variant p-2.5">
                <Calendar className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                <input 
                  type="date" 
                  value={dueDate}
                  onChange={e => setDueDate(e.target.value)}
                  className="bg-transparent text-xs font-mono text-on-surface focus:outline-none w-full"
                />
              </div>

              {/* Priority */}
              <div className="flex items-center bg-surface-container-low rounded-xl border border-outline-variant p-2.5">
                <Flag className={`w-4 h-4 mr-2 flex-shrink-0 ${priority === 'high' ? 'text-error' : priority === 'medium' ? 'text-tertiary' : 'text-on-surface-variant'}`} />
                <select 
                  value={priority}
                  onChange={e => setPriority(e.target.value)}
                  className="bg-transparent text-xs font-mono uppercase text-on-surface focus:outline-none w-full cursor-pointer"
                >
                  <option value="low" className="bg-surface-container text-on-surface">Low Priority</option>
                  <option value="medium" className="bg-surface-container text-on-surface">Medium Priority</option>
                  <option value="high" className="bg-surface-container text-on-surface">High Priority (Urgent)</option>
                </select>
              </div>

              {/* Tags */}
              <div className="flex items-center bg-surface-container-low rounded-xl border border-outline-variant p-2.5">
                <span className="text-primary font-mono font-bold mr-2 text-xs">#</span>
                <input 
                  type="text" 
                  placeholder="tags (comma separated)"
                  value={tags}
                  onChange={e => setTags(e.target.value)}
                  className="bg-transparent text-xs font-mono text-on-surface focus:outline-none w-full placeholder:text-on-surface-variant/60"
                />
              </div>

              {/* Assignee */}
              {workspaceMembers.length > 0 && (
                <div className="flex items-center bg-surface-container-low rounded-xl border border-outline-variant p-2.5">
                  <UserIcon className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                  <select 
                    value={assigneeId}
                    onChange={e => setAssigneeId(e.target.value)}
                    className="bg-transparent text-xs font-mono text-on-surface focus:outline-none w-full cursor-pointer"
                  >
                    <option value="" className="bg-surface-container text-on-surface">Unassigned</option>
                    {workspaceMembers.map(m => (
                      <option key={m.user._id} value={m.user._id} className="bg-surface-container text-on-surface">
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
              className="flex items-center text-xs font-mono uppercase font-bold text-on-surface-variant hover:text-primary transition-colors cursor-pointer py-1"
            >
              {showAdvanced ? <ChevronUp className="w-4 h-4 mr-1" /> : <ChevronDown className="w-4 h-4 mr-1" />}
              Additional Parameters
            </button>

            {/* Advanced Fields */}
            <AnimatePresence>
              {showAdvanced && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden space-y-3 pt-1"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="flex items-center text-[10px] font-mono font-bold text-on-surface-variant mb-1 uppercase">
                        <Clock className="w-3 h-3 mr-1 text-primary" /> Est. Duration (mins)
                      </label>
                      <input 
                        type="number" 
                        value={timeEstimate}
                        onChange={e => setTimeEstimate(e.target.value)}
                        placeholder="e.g. 45"
                        className="w-full bg-surface-container-low border border-outline-variant rounded-xl p-2.5 text-xs font-mono text-on-surface focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label className="flex items-center text-[10px] font-mono font-bold text-on-surface-variant mb-1 uppercase">
                        <Battery className="w-3 h-3 mr-1 text-primary" /> Energy Requirement
                      </label>
                      <select 
                        value={energyLevel}
                        onChange={e => setEnergyLevel(e.target.value)}
                        className="w-full bg-surface-container-low border border-outline-variant rounded-xl p-2.5 text-xs font-mono text-on-surface focus:outline-none focus:border-primary uppercase cursor-pointer transition-colors"
                      >
                        <option value="" className="bg-surface-container">Any Energy</option>
                        <option value="high" className="bg-surface-container">High Focus</option>
                        <option value="medium" className="bg-surface-container">Standard</option>
                        <option value="low" className="bg-surface-container">Low Routine</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-3 md:p-4 border-t border-outline-variant bg-surface-container flex-shrink-0">
            <div className="text-[11px] text-outline font-mono hidden sm:flex items-center">
              <span className="border border-outline-variant px-1 mr-1">⌘/Ctrl</span>
              <span className="border border-outline-variant px-1 mr-1.5">Enter</span>
              to save
            </div>
            
            <div className="flex gap-2 ml-auto">
              <button 
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider text-on-surface-variant hover:text-on-surface border border-outline-variant hover:border-primary rounded-md transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button 
                type="button"
                onClick={handleSubmit}
                disabled={loading || !title.trim()}
                className="px-5 py-2 text-xs font-mono font-bold uppercase tracking-wider bg-primary text-on-primary border border-primary hover:opacity-90 rounded-md transition-opacity disabled:opacity-40 cursor-pointer shadow-sm"
              >
                {loading ? 'Saving...' : 'Deploy Mandate'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TaskComposer;
