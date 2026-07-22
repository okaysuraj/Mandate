import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import axios from 'axios';
import toast from 'react-hot-toast';
import Footer from '../components/Footer';

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
      }, 1500);

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong initializing the mandate.");
      setLoading(false);
    }
  };

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen flex flex-col selection:bg-primary-container selection:text-on-primary-container">
      {/* Top Navigation Shell (Hidden on Onboarding) */}
      <main className="flex-grow flex items-center justify-center py-xl px-md">
        <div className="max-w-screen-lg w-full grid grid-cols-1 md:grid-cols-12 gap-xl">
          
          {/* Left Column: Branding & Animation */}
          <div className="md:col-span-5 flex flex-col justify-center space-y-lg">
            <div className="space-y-md">
              <span className="font-label-caps text-label-caps text-on-surface-variant tracking-widest uppercase">System Initialization</span>
              <h1 className="font-headline-lg text-headline-lg font-black tracking-tighter text-primary">
                INITIALIZE FIRST MANDATE
              </h1>
              <p className="font-body-md text-on-surface-variant max-w-md">
                Mandates are the core unit of work in the Industrial Ecosystem. Defining your first mandate activates the workspace neural net and begins resource calibration.
              </p>
            </div>
            
            {/* Abstract Visual Representation */}
            <div className="relative w-full aspect-square bg-surface-container rounded-lg overflow-hidden border border-outline-variant">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)]" style={{ backgroundSize: '20px 20px' }}></div>
              <div className="absolute inset-0 bg-cover bg-center mix-blend-multiply opacity-80" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB6SJ4EsG3TAiTWU503sr8wMpKvJKT_XSpdZN0JDLjNj-12V_5rY9GsZE-YOGJx73nNUoQSZHUobU6GfgkBmJ-A0Myzsw7mam3sfjJWsofKq99BmxZhtXHsncFDB6KMRqchpL3Iw2mkclDiNbn-K3DVIJjxslG8BtLmdZ4XlQZ0Pv6yU28wvWnjOgjayMiSOfJFUTc4_Iya1KcYL6FsmtZtxn5kWAj_7b3p32GWsgRla3K-FUP4oQW1wg')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
              
              {/* Atmospheric Detail */}
              <div className="absolute bottom-md left-md">
                <div className="flex items-center gap-sm">
                  <span className="material-symbols-outlined text-primary text-[20px]">settings_input_component</span>
                  <span className="font-label-sm text-label-sm text-primary">CORE_SYSTEM_READY</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column: Mandatory Form (Bento Style) */}
          <div className="md:col-span-7 bg-surface-container-lowest border border-outline-variant rounded-lg p-lg space-y-lg">
            <form className="space-y-lg" onSubmit={handleSubmit}>
              
              {/* Mandate Name */}
              <div className="space-y-xs group">
                <label className="flex items-center gap-xs font-label-caps text-label-caps text-on-surface-variant">
                  Mandate Name
                  <div className="relative inline-block cursor-help group/tip">
                    <span className="material-symbols-outlined text-[14px]">help</span>
                    <div className="absolute hidden group-hover/tip:block bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-sm bg-primary-container text-on-primary font-label-sm text-label-sm rounded shadow-lg z-10 pointer-events-none">
                      A unique identifier for this operational directive.
                    </div>
                  </div>
                </label>
                <input
                  type="text"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  placeholder="E.G. PROJECT_AETHER_SHIELD"
                  className="w-full bg-surface-container-low border-b-2 border-outline-variant focus:border-primary px-sm py-md font-label-sm text-label-sm transition-all outline-none"
                  disabled={loading}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-lg">
                {/* Priority */}
                <div className="space-y-xs">
                  <label className="flex items-center gap-xs font-label-caps text-label-caps text-on-surface-variant">
                    Priority Classification
                    <div className="relative inline-block cursor-help group/tip">
                      <span className="material-symbols-outlined text-[14px]">help</span>
                      <div className="absolute hidden group-hover/tip:block bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-sm bg-primary-container text-on-primary font-label-sm text-label-sm rounded shadow-lg z-10 pointer-events-none">
                        Alpha (Critical), Beta (Standard), Gamma (Maintenance).
                      </div>
                    </div>
                  </label>
                  <div className="flex gap-sm">
                    <button
                      type="button"
                      onClick={() => setPriority('alpha')}
                      className={`flex-1 py-sm px-md border font-label-sm text-label-sm rounded-full transition-colors text-center ${priority === 'alpha' ? 'bg-primary text-on-primary border-primary' : 'border-outline-variant text-on-surface-variant hover:bg-surface-container-high'}`}
                      disabled={loading}
                    >
                      ALPHA
                    </button>
                    <button
                      type="button"
                      onClick={() => setPriority('beta')}
                      className={`flex-1 py-sm px-md border font-label-sm text-label-sm rounded-full transition-colors text-center ${priority === 'beta' ? 'bg-primary text-on-primary border-primary' : 'border-outline-variant text-on-surface-variant hover:bg-surface-container-high'}`}
                      disabled={loading}
                    >
                      BETA
                    </button>
                    <button
                      type="button"
                      onClick={() => setPriority('gamma')}
                      className={`flex-1 py-sm px-md border font-label-sm text-label-sm rounded-full transition-colors text-center ${priority === 'gamma' ? 'bg-primary text-on-primary border-primary' : 'border-outline-variant text-on-surface-variant hover:bg-surface-container-high'}`}
                      disabled={loading}
                    >
                      GAMMA
                    </button>
                  </div>
                </div>
                
                {/* Schedule */}
                <div className="space-y-xs">
                  <label className="flex items-center gap-xs font-label-caps text-label-caps text-on-surface-variant">
                    Deployment Schedule
                  </label>
                  <input
                    type="date"
                    value={deploymentDate}
                    onChange={(e) => setDeploymentDate(e.target.value)}
                    className="w-full bg-surface-container-low border-b-2 border-outline-variant focus:border-primary px-sm py-sm font-label-sm text-label-sm transition-all outline-none"
                    disabled={loading}
                  />
                </div>
              </div>
              
              {/* Resource Allocation */}
              <div className="space-y-md">
                <div className="flex justify-between items-center">
                  <label className="flex items-center gap-xs font-label-caps text-label-caps text-on-surface-variant">
                    Resource Allocation
                    <div className="relative inline-block cursor-help group/tip">
                      <span className="material-symbols-outlined text-[14px]">help</span>
                      <div className="absolute hidden group-hover/tip:block bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-sm bg-primary-container text-on-primary font-label-sm text-label-sm rounded shadow-lg z-10 pointer-events-none">
                        Percentage of workspace compute dedicated to this mandate.
                      </div>
                    </div>
                  </label>
                  <span className="font-label-sm text-label-sm text-primary font-bold">{allocation}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={allocation}
                  onChange={(e) => setAllocation(e.target.value)}
                  className="w-full h-1 bg-surface-container-high accent-primary appearance-none cursor-pointer"
                  disabled={loading}
                />
              </div>
              
              {/* Status Display (Bento Detail) */}
              <div className="bg-surface-container-low p-md rounded-md flex items-center justify-between border border-outline-variant/30">
                <div className="flex items-center gap-md">
                  <div className="w-xs h-md bg-tertiary-fixed-dim animate-pulse"></div>
                  <div>
                    <p className="font-label-caps text-[10px] text-on-surface-variant">Workspace Status</p>
                    <p className="font-label-sm text-label-sm text-primary uppercase">READY_FOR_{priority}_DEPLOYMENT</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-outline-variant">monitor_heart</span>
              </div>
              
              {/* Primary Action */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-md font-label-caps text-label-caps rounded-full flex items-center justify-center gap-sm transition-all ${loading ? 'bg-tertiary-container text-on-tertiary-container opacity-80' : 'bg-primary text-on-primary hover:scale-[1.01] active:scale-95 group'}`}
              >
                {loading ? (
                  <>
                    <span className="material-symbols-outlined animate-spin">sync</span> DEPLOYING...
                  </>
                ) : (
                  <>
                    DEPLOY MANDATE
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
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
