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
        navigate('/first-mandate');
      }, 800);

    } catch (error) {
      console.error(error);
      toast.error("Error saving preferences. Skipping...");
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-body-md text-body-md overflow-x-hidden min-h-screen flex flex-col bg-surface text-on-surface antialiased">
      {/* Main Navigation */}
      <header className="relative z-50 w-full px-6 py-4 flex justify-between items-center bg-surface border-b border-outline-variant">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center font-black text-sm">
            M
          </div>
          <span className="font-mono text-sm font-bold text-on-surface tracking-wider">MANDATE</span>
        </div>
        <div className="font-mono text-xs text-on-surface-variant flex items-center gap-2">
          <span>ONBOARDING</span>
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12 flex-grow flex flex-col justify-center w-full space-y-6">
        {/* Onboarding Header */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-xs font-bold text-primary px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20">
              STEP 01 OF 03
            </span>
          </div>
          <h1 className="font-display-lg text-3xl md:text-4xl font-black text-on-surface tracking-tight">System Calibration</h1>
          <p className="text-xs md:text-sm text-on-surface-variant max-w-lg mt-1.5 leading-relaxed">
            Configure your operational environment. These settings define how Mandate optimizes your focus corridors and notification density.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
          
          {/* SECTION 1: WORK HOURS (Left Column) */}
          <section className="md:col-span-4 bg-surface-container-lowest border border-outline-variant p-5 md:p-6 rounded-2xl shadow-xs flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-primary text-xl">schedule</span>
                <h2 className="font-mono text-xs font-bold text-on-surface uppercase tracking-wider">01. FOCUS WINDOW</h2>
              </div>
              <p className="text-on-surface-variant text-xs mb-4">Define your start and end times for synchronized team reporting.</p>
              
              <div className="space-y-3.5">
                <div>
                  <label className="font-mono text-[11px] text-on-surface-variant block mb-1 font-semibold">START TIME</label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full bg-surface-container border border-outline-variant rounded-xl py-2 px-3 font-mono text-sm text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="font-mono text-[11px] text-on-surface-variant block mb-1 font-semibold">END TIME</label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full bg-surface-container border border-outline-variant rounded-xl py-2 px-3 font-mono text-sm text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            </div>
            <div className="pt-3 border-t border-outline-variant/60">
              <p className="text-[11px] font-mono text-on-surface-variant italic">System suppresses non-critical telemetry outside these operational hours.</p>
            </div>
          </section>

          {/* SECTION 2: NOTIFICATIONS (Center Column) */}
          <section className="md:col-span-4 bg-surface-container-lowest border border-outline-variant p-5 md:p-6 rounded-2xl shadow-xs space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-primary text-xl">notifications_active</span>
              <h2 className="font-mono text-xs font-bold text-on-surface uppercase tracking-wider">02. ALERT PROTOCOLS</h2>
            </div>
            <p className="text-on-surface-variant text-xs mb-3">Manage alert density to maintain uninterrupted deep work blocks.</p>
            
            <div className="space-y-4">
              {/* Critical Alerts */}
              <div className="flex justify-between items-center gap-3 py-1">
                <div>
                  <h3 className="font-mono text-xs font-bold text-on-surface">Critical Alerts</h3>
                  <p className="text-on-surface-variant text-[11px] mt-0.5">Direct system blocker alerts</p>
                </div>
                <button
                  type="button"
                  onClick={() => setCriticalAlerts(!criticalAlerts)}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${criticalAlerts ? 'bg-primary' : 'bg-surface-container border border-outline-variant'}`}
                >
                  <span className={`block w-4 h-4 rounded-full bg-on-primary transition-transform ${criticalAlerts ? 'translate-x-6' : 'translate-x-1 bg-on-surface-variant'}`} />
                </button>
              </div>

              {/* Reports */}
              <div className="flex justify-between items-center gap-3 py-1">
                <div>
                  <h3 className="font-mono text-xs font-bold text-on-surface">Daily Reports</h3>
                  <p className="text-on-surface-variant text-[11px] mt-0.5">Morning digest briefings</p>
                </div>
                <button
                  type="button"
                  onClick={() => setReports(!reports)}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${reports ? 'bg-primary' : 'bg-surface-container border border-outline-variant'}`}
                >
                  <span className={`block w-4 h-4 rounded-full bg-on-primary transition-transform ${reports ? 'translate-x-6' : 'translate-x-1 bg-on-surface-variant'}`} />
                </button>
              </div>

              {/* Team Activity */}
              <div className="flex justify-between items-center gap-3 py-1">
                <div>
                  <h3 className="font-mono text-xs font-bold text-on-surface">Team Activity</h3>
                  <p className="text-on-surface-variant text-[11px] mt-0.5">Real-time collaboration nudges</p>
                </div>
                <button
                  type="button"
                  onClick={() => setTeamActivity(!teamActivity)}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${teamActivity ? 'bg-primary' : 'bg-surface-container border border-outline-variant'}`}
                >
                  <span className={`block w-4 h-4 rounded-full bg-on-primary transition-transform ${teamActivity ? 'translate-x-6' : 'translate-x-1 bg-on-surface-variant'}`} />
                </button>
              </div>
            </div>
          </section>

          {/* SECTION 3: WORKSPACE TYPE (Right Column) */}
          <section className="md:col-span-4 bg-surface-container-lowest border border-outline-variant p-5 md:p-6 rounded-2xl shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-primary text-xl">hub</span>
                <h2 className="font-mono text-xs font-bold text-on-surface uppercase tracking-wider">03. WORKSPACE TOPOLOGY</h2>
              </div>
              <p className="text-on-surface-variant text-xs mb-3">Select your environment structure.</p>
              
              <div className="space-y-2.5">
                <label className="block cursor-pointer">
                  <input
                    type="radio"
                    name="workspace"
                    value="personal"
                    checked={workspaceType === 'personal'}
                    onChange={() => setWorkspaceType('personal')}
                    className="sr-only"
                  />
                  <div className={`p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                    workspaceType === 'personal'
                      ? 'border-primary bg-primary/10 text-on-surface'
                      : 'border-outline-variant bg-surface-container/40 text-on-surface-variant hover:bg-surface-container'
                  }`}>
                    <div>
                      <span className="font-mono text-xs font-bold block text-on-surface">PERSONAL NODE</span>
                      <span className="text-[11px] opacity-75">Dedicated single-operator hub</span>
                    </div>
                    {workspaceType === 'personal' && (
                      <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                    )}
                  </div>
                </label>
                
                <label className="block cursor-pointer">
                  <input
                    type="radio"
                    name="workspace"
                    value="team"
                    checked={workspaceType === 'team'}
                    onChange={() => setWorkspaceType('team')}
                    className="sr-only"
                  />
                  <div className={`p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                    workspaceType === 'team'
                      ? 'border-primary bg-primary/10 text-on-surface'
                      : 'border-outline-variant bg-surface-container/40 text-on-surface-variant hover:bg-surface-container'
                  }`}>
                    <div>
                      <span className="font-mono text-xs font-bold block text-on-surface">TEAM FLEET</span>
                      <span className="text-[11px] opacity-75">Collaborative multi-user cluster</span>
                    </div>
                    {workspaceType === 'team' && (
                      <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                    )}
                  </div>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full min-h-[44px] py-2.5 px-4 font-label-caps text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] bg-primary text-on-primary hover:opacity-90 disabled:opacity-50 shadow-xs cursor-pointer"
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined text-base animate-spin">sync</span>
                  CONFIGURING...
                </>
              ) : (
                <>
                  CONFIRM &amp; CONTINUE
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
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
