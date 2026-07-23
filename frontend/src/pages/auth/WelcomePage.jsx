import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import axios from 'axios';
import toast from 'react-hot-toast';
import Footer from '../../components/layout/Footer';

const WelcomePage = () => {
  const navigate = useNavigate();

  // Preferences state
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('18:00');
  
  const [criticalAlerts, setCriticalAlerts] = useState(true);
  const [reports, setReports] = useState(true);
  const [teamActivity, setTeamActivity] = useState(false);
  
  const [workspaceType, setWorkspaceType] = useState('personal');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await axios.put('/api/users/profile', {
        preferences: {
          operationalWindow: { start: startTime, end: endTime },
          notifications: { criticalAlerts, reports, teamActivity },
          workspaceType
        }
      });

      toast.success("Configuration Saved.");
      setTimeout(() => {
        navigate('/first-mandate'); // Navigate to the next onboarding step
      }, 1000);

    } catch (error) {
      console.error(error);
      toast.error("Error saving preferences. Skipping...");
      navigate('/dashboard');
    } finally {
      // In a real app we wait for the navigation, but we'll reset loading just in case
    }
  };

  return (
    <div className="font-body-md text-body-md overflow-x-hidden min-h-screen flex flex-col bg-background text-on-surface scanline-effect">
      {/* Hero Background Animation Shell */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30"></div>

      {/* Main Navigation */}
      <header className="relative z-50 w-full px-lg py-md flex justify-between items-center bg-surface border-b border-outline-variant">
        <div className="text-headline-lg font-headline-lg font-black tracking-tighter text-primary">
          MANDATE
        </div>
        <div className="font-label-caps text-label-caps text-on-surface-variant flex items-center gap-sm">
          SYSTEMS ONBOARDING <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
        </div>
      </header>

      <main className="relative z-10 max-w-screen-xl mx-auto px-gutter py-xl flex-grow flex flex-col justify-center w-full">
        {/* Onboarding Header */}
        <div className="mb-xl max-w-2xl">
          <h1 className="font-display-lg text-display-lg mb-md">System Calibration</h1>
          <p className="text-on-surface-variant max-w-md">Configure your operational environment. These settings define how MANDATE optimizes your workflow density and alert priority.</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center gap-xs mb-lg">
          <div className="h-1 w-12 bg-primary"></div>
          <div className="h-1 w-12 bg-outline-variant"></div>
          <div className="h-1 w-12 bg-outline-variant"></div>
          <span className="ml-md font-label-caps text-label-caps text-primary">STEP 01 / 03</span>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
          
          {/* SECTION 1: WORK HOURS (Left Column) */}
          <section className="md:col-span-4 bento-card p-lg rounded-none h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-sm mb-md">
                <span className="material-symbols-outlined text-primary">schedule</span>
                <h2 className="font-label-caps text-label-caps text-primary">01. OPERATIONAL WINDOW</h2>
              </div>
              <p className="text-on-surface-variant font-label-sm text-label-sm mb-lg">Define your start and end times for synchronized reporting and workspace updates.</p>
              
              <div className="space-y-md">
                <div className="group">
                  <label className="font-label-caps text-[10px] text-on-surface-variant block mb-xs">START_TIME</label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full bg-surface-container-low border-b-2 border-outline-variant focus:border-primary outline-none py-sm px-2 font-label-caps text-label-caps transition-all"
                  />
                </div>
                <div className="group">
                  <label className="font-label-caps text-[10px] text-on-surface-variant block mb-xs">END_TIME</label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full bg-surface-container-low border-b-2 border-outline-variant focus:border-primary outline-none py-sm px-2 font-label-caps text-label-caps transition-all"
                  />
                </div>
              </div>
            </div>
            <div className="mt-xl pt-md border-t border-surface-dim">
              <p className="font-label-sm text-label-sm text-on-surface-variant italic">System will suppress non-critical telemetry outside these hours.</p>
            </div>
          </section>

          {/* SECTION 2: NOTIFICATIONS (Center Column) */}
          <section className="md:col-span-4 bento-card p-lg rounded-none h-full">
            <div className="flex items-center gap-sm mb-md">
              <span className="material-symbols-outlined text-primary">notifications_active</span>
              <h2 className="font-label-caps text-label-caps text-primary">02. ALERT PROTOCOLS</h2>
            </div>
            <p className="text-on-surface-variant font-label-sm text-label-sm mb-lg">Manage notification density to maintain high-focus operational states.</p>
            
            <div className="space-y-gutter">
              {/* Critical Alerts */}
              <div className="flex justify-between items-start gap-md">
                <div>
                  <h3 className="font-body-md text-body-md font-bold mb-xs">Critical Alerts</h3>
                  <p className="text-on-surface-variant text-[13px] leading-snug">Immediate system interruptions for hardware/software failures.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={criticalAlerts}
                    onChange={(e) => setCriticalAlerts(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-outline-variant peer-checked:bg-primary rounded-full p-1 transition-colors">
                    <div className={`w-3 h-3 bg-white rounded-full shadow-sm transition-transform ${criticalAlerts ? 'translate-x-5' : ''}`}></div>
                  </div>
                </label>
              </div>
              
              {/* Reports */}
              <div className="flex justify-between items-start gap-md">
                <div>
                  <h3 className="font-body-md text-body-md font-bold mb-xs">Reports</h3>
                  <p className="text-on-surface-variant text-[13px] leading-snug">Daily and weekly digest summaries of workspace metrics.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={reports}
                    onChange={(e) => setReports(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-outline-variant peer-checked:bg-primary rounded-full p-1 transition-colors">
                    <div className={`w-3 h-3 bg-white rounded-full shadow-sm transition-transform ${reports ? 'translate-x-5' : ''}`}></div>
                  </div>
                </label>
              </div>

              {/* Team Activity */}
              <div className="flex justify-between items-start gap-md">
                <div>
                  <h3 className="font-body-md text-body-md font-bold mb-xs">Team Activity</h3>
                  <p className="text-on-surface-variant text-[13px] leading-snug">Real-time pings for collaboration and shared workspace edits.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={teamActivity}
                    onChange={(e) => setTeamActivity(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-outline-variant peer-checked:bg-primary rounded-full p-1 transition-colors">
                    <div className={`w-3 h-3 bg-white rounded-full shadow-sm transition-transform ${teamActivity ? 'translate-x-5' : ''}`}></div>
                  </div>
                </label>
              </div>
            </div>
          </section>

          {/* SECTION 3: WORKSPACE TYPE (Right Column) */}
          <section className="md:col-span-4 flex flex-col gap-gutter">
            <div className="bento-card p-lg rounded-none">
              <div className="flex items-center gap-sm mb-md">
                <span className="material-symbols-outlined text-primary">hub</span>
                <h2 className="font-label-caps text-label-caps text-primary">03. WORKSPACE TYPE</h2>
              </div>
              <div className="space-y-sm">
                <label className="block cursor-pointer group">
                  <input
                    type="radio"
                    name="workspace"
                    value="personal"
                    checked={workspaceType === 'personal'}
                    onChange={() => setWorkspaceType('personal')}
                    className="sr-only peer"
                  />
                  <div className="p-md border border-outline-variant peer-checked:border-primary peer-checked:bg-primary-container peer-checked:text-on-primary transition-all flex items-center justify-between">
                    <div>
                      <span className="font-label-caps text-label-caps block">PERSONAL</span>
                      <span className="text-[12px] opacity-70">Dedicated single-user environment.</span>
                    </div>
                    <span className={`material-symbols-outlined text-sm ${workspaceType === 'personal' ? 'block' : 'hidden'}`}>check_circle</span>
                  </div>
                </label>
                
                <label className="block cursor-pointer group">
                  <input
                    type="radio"
                    name="workspace"
                    value="team"
                    checked={workspaceType === 'team'}
                    onChange={() => setWorkspaceType('team')}
                    className="sr-only peer"
                  />
                  <div className="p-md border border-outline-variant peer-checked:border-primary peer-checked:bg-primary-container peer-checked:text-on-primary transition-all flex items-center justify-between">
                    <div>
                      <span className="font-label-caps text-label-caps block">TEAM</span>
                      <span className="text-[12px] opacity-70">Collaborative multi-user environment.</span>
                    </div>
                    <span className={`material-symbols-outlined text-sm ${workspaceType === 'team' ? 'block' : 'hidden'}`}>check_circle</span>
                  </div>
                </label>
              </div>
            </div>
            
            <div className="relative overflow-hidden h-40 bento-card border-none rounded-none">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAa3WzOyvC24ZSfQXSZpCQAHwOIwNOXi1JSPkobB1HEI7p_9gRvlJX3iFxKRg6RKn3kePJ7wr9w_y-YlfRv5LJ33nvPfZV44EIOTHwDJHKwoaLJpxYwYYsnNGhfi7USmXMNnHXZx5NU4ZbczgYBNfqJe6xI0cNnoZqH7AIF55Q4wk5Z87M4lcrqU_5CRgsCsqilw_MFNcuK3UIc_J_F1q4_s3zQFEJDzRvfWI8WAfzg7Bmxw6DhHIusjQ"
                alt="System Preview"
                className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-md flex items-end">
                <p className="font-label-caps text-[10px] text-white">SYSTEM_PREVIEW_01</p>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-lg font-label-caps text-label-caps rounded-full flex items-center justify-center gap-md transition-all active:scale-[0.98] ${loading ? 'bg-on-tertiary-container text-white cursor-not-allowed' : 'bg-primary text-on-primary hover:opacity-90'}`}
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined animate-spin-slow">progress_activity</span>
                  CONFIGURING...
                </>
              ) : (
                <>
                  SAVE CONFIGURATION
                  <span className="material-symbols-outlined">arrow_forward</span>
                </>
              )}
            </button>
          </section>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default WelcomePage;
