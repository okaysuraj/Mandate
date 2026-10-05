import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import toast from 'react-hot-toast';
import Footer from '../../components/layout/Footer';

const FirstMandatePage = () => {
  const navigate = useNavigate();
  const [taskTitle, setTaskTitle] = useState('');
  const [priority, setPriority] = useState('alpha');
  const [deploymentDate, setDeploymentDate] = useState('');
  const [allocation, setAllocation] = useState(75);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!taskTitle) {
      toast.error('Mandate Name is required.');
      return;
    }

    setLoading(true);
    try {
      await axios.post('/api/tasks', {
        title: taskTitle,
        intent: "Initial Mandate",
        priority: priority === 'alpha' ? 'high' : priority === 'beta' ? 'medium' : 'low',
        dueDate: deploymentDate ? new Date(deploymentDate).toISOString() : new Date().toISOString()
      });
      
      setTimeout(() => {
        navigate('/splash');
      }, 1000);

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong initializing the mandate.");
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col antialiased">
      <header className="relative z-50 w-full px-6 py-4 flex justify-between items-center bg-surface border-b border-outline-variant">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center font-black text-sm">
            M
          </div>
          <span className="font-mono text-sm font-bold text-on-surface tracking-wider">MANDATE</span>
        </div>
        <div className="font-mono text-xs text-on-surface-variant flex items-center gap-2">
          <span>INITIALIZATION</span>
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center py-8 md:py-14 px-4 md:px-6">
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column: Branding & Animation */}
          <div className="hidden md:flex md:col-span-5 bg-surface-container-lowest border border-outline-variant rounded-3xl p-8 flex-col justify-between shadow-sm relative overflow-hidden">
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold text-primary px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                STEP 02 OF 03
              </span>
              <h1 className="font-headline-lg text-2xl font-black text-on-surface tracking-tight mt-3">
                First Mandate
              </h1>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Mandates are the core unit of work in Mandate. Defining your initial mandate primes your schedule and telemetry streams.
              </p>
            </div>
            
            {/* Native Brand Box */}
            <div className="my-6 p-6 rounded-2xl bg-surface-container border border-outline-variant/60 flex flex-col items-center text-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-sm">
                <span className="material-symbols-outlined text-3xl">task_alt</span>
              </div>
              <span className="font-mono text-xs font-bold text-on-surface uppercase">WORKSPACE NEURAL NET</span>
              <span className="text-[11px] font-mono text-on-surface-variant">READY FOR DIRECTIVE BINDING</span>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-on-surface-variant pt-2 border-t border-outline-variant/50">
              <span>CORE SYSTEM</span>
              <span className="text-tertiary">STABLE 100%</span>
            </div>
          </div>
          
          {/* Right Column: Mandatory Form */}
          <div className="col-span-12 md:col-span-7 bg-surface-container-lowest border border-outline-variant rounded-3xl p-6 md:p-8 shadow-sm space-y-5">
            <div>
              <div className="md:hidden flex items-center gap-2 mb-3">
                <span className="font-mono text-xs font-bold text-primary px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                  STEP 02 OF 03
                </span>
              </div>
              <h2 className="font-headline-lg text-2xl font-bold text-on-surface tracking-tight">Deploy First Mandate</h2>
              <p className="text-xs md:text-sm text-on-surface-variant mt-1">Specify your first milestone objective</p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Mandate Name */}
              <div className="space-y-1.5">
                <label className="font-label-caps text-xs text-on-surface-variant font-medium block">
                  Mandate Objective (Title)
                </label>
                <input
                  type="text"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  placeholder="e.g. SHIP_V2_AUTH_SYSTEM"
                  className="w-full bg-surface-container border border-outline-variant px-3.5 py-2.5 rounded-xl font-mono text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  disabled={loading}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Priority */}
                <div className="space-y-1.5">
                  <label className="font-label-caps text-xs text-on-surface-variant font-medium block">
                    Priority Tier
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    <button
                      type="button"
                      onClick={() => setPriority('alpha')}
                      className={`min-h-[38px] py-1.5 px-2 border font-mono text-xs font-bold rounded-xl transition-all cursor-pointer ${
                        priority === 'alpha' 
                          ? 'bg-primary text-on-primary border-primary shadow-xs' 
                          : 'border-outline-variant bg-surface-container text-on-surface-variant hover:text-on-surface'
                      }`}
                      disabled={loading}
                    >
                      ALPHA
                    </button>
                    <button
                      type="button"
                      onClick={() => setPriority('beta')}
                      className={`min-h-[38px] py-1.5 px-2 border font-mono text-xs font-bold rounded-xl transition-all cursor-pointer ${
                        priority === 'beta' 
                          ? 'bg-primary text-on-primary border-primary shadow-xs' 
                          : 'border-outline-variant bg-surface-container text-on-surface-variant hover:text-on-surface'
                      }`}
                      disabled={loading}
                    >
                      BETA
                    </button>
                    <button
                      type="button"
                      onClick={() => setPriority('gamma')}
                      className={`min-h-[38px] py-1.5 px-2 border font-mono text-xs font-bold rounded-xl transition-all cursor-pointer ${
                        priority === 'gamma' 
                          ? 'bg-primary text-on-primary border-primary shadow-xs' 
                          : 'border-outline-variant bg-surface-container text-on-surface-variant hover:text-on-surface'
                      }`}
                      disabled={loading}
                    >
                      GAMMA
                    </button>
                  </div>
                </div>
                
                {/* Schedule */}
                <div className="space-y-1.5">
                  <label className="font-label-caps text-xs text-on-surface-variant font-medium block">
                    Target Due Date
                  </label>
                  <input
                    type="date"
                    value={deploymentDate}
                    onChange={(e) => setDeploymentDate(e.target.value)}
                    className="w-full bg-surface-container border border-outline-variant px-3.5 py-2 rounded-xl font-mono text-xs text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    disabled={loading}
                  />
                </div>
              </div>
              
              {/* Resource Allocation */}
              <div className="space-y-2 pt-1">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-on-surface-variant font-medium">CAPACITY ALLOCATION</span>
                  <span className="font-bold text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">{allocation}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={allocation}
                  onChange={(e) => setAllocation(e.target.value)}
                  className="w-full h-2 bg-surface-container rounded-lg accent-primary appearance-none cursor-pointer"
                  disabled={loading}
                />
              </div>
              
              {/* Status Display */}
              <div className="bg-surface-container/60 p-3.5 rounded-xl flex items-center justify-between border border-outline-variant/60">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-tertiary animate-pulse" />
                  <div>
                    <p className="font-mono text-[10px] text-on-surface-variant uppercase font-semibold">Workspace Readiness</p>
                    <p className="font-mono text-xs font-bold text-on-surface uppercase">PREPPED FOR {priority} EXECUTION</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant text-lg">monitor_heart</span>
              </div>
              
              {/* Primary Action */}
              <button
                type="submit"
                disabled={loading}
                className="w-full min-h-[44px] py-2.5 px-4 font-label-caps text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] bg-primary text-on-primary hover:opacity-90 disabled:opacity-50 shadow-xs cursor-pointer"
              >
                {loading ? (
                  <>
                    <span className="material-symbols-outlined text-base animate-spin">sync</span>
                    DEPLOYING MANDATE...
                  </>
                ) : (
                  <>
                    DEPLOY MANDATE
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FirstMandatePage;
