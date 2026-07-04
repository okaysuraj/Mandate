import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Target, Plus, ArrowLeft, Loader2, CheckCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

const GoalsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const fetchGoals = async () => {
    if (!user?.activeWorkspace) return;
    try {
      const { data } = await axios.get('/api/goals', {
        params: { workspaceId: user.activeWorkspace }
      });
      setGoals(data);
    } catch (error) {
      toast.error('Failed to load goals');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, [user]);

  const handleCreateGoal = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    try {
      const { data } = await axios.post('/api/goals', {
        title: newTitle,
        workspaceId: user.activeWorkspace
      });
      setGoals([data, ...goals]);
      setNewTitle('');
      setIsCreating(false);
      toast.success('Goal created!');
    } catch (error) {
      toast.error('Failed to create goal');
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
              <Target className="w-8 h-8 mr-3 text-purple-500" /> 
              Goals & OKRs
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400">Map high-level objectives to actionable tasks.</p>
          </div>
          <button 
            onClick={() => setIsCreating(true)}
            className="flex items-center px-4 py-2 bg-black text-white dark:bg-white dark:text-black font-semibold rounded-xl hover:scale-105 transition-transform"
          >
            <Plus className="w-5 h-5 mr-1" /> New Goal
          </button>
        </div>

        {isCreating && (
          <form onSubmit={handleCreateGoal} className="mb-8 p-6 bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-2xl shadow-sm">
            <input 
              type="text" 
              placeholder="What do you want to achieve?"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              className="w-full bg-transparent text-xl font-bold outline-none mb-4"
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setIsCreating(false)} className="px-4 py-2 text-sm font-semibold text-zinc-500">Cancel</button>
              <button type="submit" disabled={!newTitle.trim()} className="px-4 py-2 text-sm font-semibold bg-black text-white dark:bg-white dark:text-black rounded-lg disabled:opacity-50">Create</button>
            </div>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goals.map(goal => (
            <div key={goal._id} className="bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 p-6 rounded-2xl shadow-sm hover:border-purple-500/50 transition-colors group">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold group-hover:text-purple-500 transition-colors">{goal.title}</h3>
                <span className={`px-2 py-1 text-xs font-bold uppercase rounded-full ${
                  goal.status === 'active' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400' :
                  goal.status === 'achieved' ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' :
                  'bg-zinc-100 text-zinc-700 dark:bg-zinc-500/20 dark:text-zinc-400'
                }`}>
                  {goal.status}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
                <div className="flex items-center"><CheckCircle className="w-4 h-4 mr-1" /> {goal.linkedTasks?.length || 0} Tasks</div>
                <div className="flex items-center"><Clock className="w-4 h-4 mr-1" /> {new Date(goal.createdAt).toLocaleDateString()}</div>
              </div>
            </div>
          ))}
          {goals.length === 0 && !isCreating && (
            <div className="col-span-full py-20 text-center text-zinc-500">
              No goals set yet. Aim high and create one!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoalsPage;
