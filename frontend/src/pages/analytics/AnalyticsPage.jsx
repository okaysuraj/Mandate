import React, { useState, useEffect } from "react";
import AppLayout from "../../components/layout/AppLayout";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const AnalyticsPage = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [tasksRes, analyticsRes] = await Promise.all([
          axios.get("/api/tasks", { params: { limit: 100 } }),
          axios.get("/api/tasks/analytics")
        ]);
        setTasks(tasksRes.data.data || []);
        setAnalytics(analyticsRes.data);
      } catch (error) {
        console.error("Failed to load analytics");
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchAnalytics();
  }, [user]);

  return (
    <AppLayout>
      <div className="bento-grid-bg min-h-full">
        {/* Header Section */}
        <header className="mb-xl flex justify-between items-end">
          <div>
            <h1 className="font-display-lg text-headline-lg text-primary mb-xs">Command Center</h1>
            <p className="font-label-caps text-label-sm text-outline uppercase">Real-time productivity intelligence telemetry</p>
          </div>
          <div className="flex gap-md">
            <div className="bg-surface border border-outline-variant px-md py-sm rounded-full flex items-center gap-sm">
              <span className="font-label-caps text-label-caps text-outline">UPTIME:</span>
              <span className="font-label-caps text-label-caps text-primary font-label-sm">142:31:04</span>
            </div>
            <div className="bg-on-tertiary-container/10 px-md py-sm rounded-full flex items-center gap-sm">
              <span className="w-2 h-2 rounded-full bg-on-tertiary-container"></span>
              <span className="font-label-caps text-label-caps text-on-tertiary-container">SYSTEM_OPTIMAL</span>
            </div>
          </div>
        </header>

        {/* Bento Grid */}
        <div className="grid grid-cols-12 gap-lg">
          {/* Output vs Capacity (Primary Chart) */}
          <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest border border-outline-variant p-lg rounded-none relative overflow-hidden group">
            <div className="flex justify-between items-start mb-lg relative z-10">
              <div>
                <h2 className="font-headline-lg text-primary">Output vs. Capacity</h2>
                <p className="font-label-sm text-outline">Dual-axis efficiency distribution</p>
              </div>
              <div className="flex gap-md">
                <span className="flex items-center gap-xs font-label-caps text-[10px] text-primary"><span className="w-3 h-0.5 bg-primary"></span>OUTPUT</span>
                <span className="flex items-center gap-xs font-label-caps text-[10px] text-outline"><span className="w-3 h-0.5 bg-outline"></span>CAPACITY</span>
              </div>
            </div>
            {/* Simplified Visual Representation of a Dual Axis Chart */}
            <div className="h-64 w-full flex items-end gap-xs group">
              <div className="flex-1 flex flex-col justify-end gap-1">
                <div className="w-full bg-surface-container h-32 relative">
                  <div className="absolute bottom-0 left-0 w-full bg-primary/20 h-24 hover:bg-primary/40 transition-all"></div>
                  <div className="absolute bottom-0 left-1/4 w-[2px] bg-primary h-40"></div>
                </div>
                <span className="font-label-caps text-[8px] text-center mt-xs text-outline">08:00</span>
              </div>
              <div className="flex-1 flex flex-col justify-end gap-1">
                <div className="w-full bg-surface-container h-40 relative">
                  <div className="absolute bottom-0 left-0 w-full bg-primary/20 h-36 hover:bg-primary/40 transition-all"></div>
                  <div className="absolute bottom-0 left-1/4 w-[2px] bg-primary h-44"></div>
                </div>
                <span className="font-label-caps text-[8px] text-center mt-xs text-outline">10:00</span>
              </div>
              <div className="flex-1 flex flex-col justify-end gap-1">
                <div className="w-full bg-surface-container h-48 relative">
                  <div className="absolute bottom-0 left-0 w-full bg-primary/20 h-44 hover:bg-primary/40 transition-all"></div>
                  <div className="absolute bottom-0 left-1/4 w-[2px] bg-primary h-52"></div>
                </div>
                <span className="font-label-caps text-[8px] text-center mt-xs text-outline">12:00</span>
              </div>
              <div className="flex-1 flex flex-col justify-end gap-1">
                <div className="w-full bg-surface-container h-32 relative">
                  <div className="absolute bottom-0 left-0 w-full bg-primary/20 h-16 hover:bg-primary/40 transition-all"></div>
                  <div className="absolute bottom-0 left-1/4 w-[2px] bg-primary h-24"></div>
                </div>
                <span className="font-label-caps text-[8px] text-center mt-xs text-outline">14:00</span>
              </div>
              <div className="flex-1 flex flex-col justify-end gap-1">
                <div className="w-full bg-surface-container h-56 relative">
                  <div className="absolute bottom-0 left-0 w-full bg-primary/20 h-52 hover:bg-primary/40 transition-all"></div>
                  <div className="absolute bottom-0 left-1/4 w-[2px] bg-primary h-60"></div>
                </div>
                <span className="font-label-caps text-[8px] text-center mt-xs text-outline">16:00</span>
              </div>
              <div className="flex-1 flex flex-col justify-end gap-1">
                <div className="w-full bg-surface-container h-40 relative">
                  <div className="absolute bottom-0 left-0 w-full bg-primary/20 h-32 hover:bg-primary/40 transition-all"></div>
                  <div className="absolute bottom-0 left-1/4 w-[2px] bg-primary h-36"></div>
                </div>
                <span className="font-label-caps text-[8px] text-center mt-xs text-outline">18:00</span>
              </div>
            </div>
          </div>

          {/* Deep Work Ratio */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-surface-container-lowest border border-outline-variant p-lg rounded-none flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-sm">
                <h2 className="font-headline-lg text-primary">Deep Work Ratio</h2>
                <span className="material-symbols-outlined text-primary">bolt</span>
              </div>
              <p className="font-label-sm text-outline">Synchronous focus telemetry</p>
            </div>
            <div className="relative py-xl flex items-center justify-center">
              <svg className="w-48 h-48 transform -rotate-90">
                <circle className="text-surface-container" cx="96" cy="96" fill="transparent" r="80" stroke="currentColor" strokeWidth="4"></circle>
                <circle className="text-primary transition-all duration-1000 ease-out" cx="96" cy="96" fill="transparent" r="80" stroke="currentColor" strokeDasharray="502.6" strokeDashoffset={502.6 - (502.6 * (analytics?.deepWorkRatio || 0) / 100)} strokeWidth="12"></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display-lg text-headline-lg text-primary font-label-sm">{analytics?.deepWorkRatio || 0}%</span>
                <span className="font-label-caps text-[10px] text-on-tertiary-container">+4.2% INTRA-DAY</span>
              </div>
            </div>
            <div className="space-y-sm">
              <div className="flex justify-between font-label-sm border-b border-surface-container-high pb-xs">
                <span className="text-outline">TARGET</span>
                <span className="text-primary font-label-sm">85.0%</span>
              </div>
              <div className="flex justify-between font-label-sm border-b border-surface-container-high pb-xs">
                <span className="text-outline">PEAK</span>
                <span className="text-primary font-label-sm">{(analytics?.deepWorkRatio || 0) + 15}%</span>
              </div>
            </div>
          </div>

          {/* Task Resolution Latency */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-surface-container-lowest border border-outline-variant p-lg rounded-none relative">
            <div className="mb-lg">
              <h2 className="font-headline-lg text-primary">Task Latency</h2>
              <p className="font-label-sm text-outline">Mean resolution time per ticket</p>
            </div>
            <div className="space-y-md">
              <div className="p-md bg-surface border border-outline-variant">
                <div className="flex justify-between mb-xs">
                  <span className="font-label-caps text-[10px] text-outline">AVERAGE_LATENCY</span>
                  <span className="font-label-caps text-[10px] text-primary">{analytics?.averageResolutionLatency || "0h 0m"}</span>
                </div>
                <div className="w-full bg-surface-container-high h-1.5 overflow-hidden">
                  <div className="bg-primary h-full w-[45%]"></div>
                </div>
              </div>
            </div>
            <div className="mt-lg pt-md border-t border-surface-container-high">
              <div className="flex items-center gap-sm">
                <span className="material-symbols-outlined text-on-error">warning</span>
                <span className="font-label-caps text-[10px] text-error">CRITICAL_LAG detected in NORMAL queue.</span>
              </div>
            </div>
          </div>

          {/* Strategic Overview */}
          <div className="col-span-12 lg:col-span-8 grid grid-cols-2 gap-lg">
            {/* Dynamic Workloads */}
            <div className="bg-surface-container-low border border-outline-variant p-lg rounded-none">
              <div className="flex items-center justify-between mb-lg">
                <h3 className="font-label-caps text-label-caps text-primary">Dynamic Workloads</h3>
                <span className="material-symbols-outlined text-outline">stacks</span>
              </div>
              <div className="space-y-lg">
                <div className="flex items-center gap-md">
                  <div className="w-12 h-12 bg-primary flex items-center justify-center text-on-primary font-display-lg text-headline-lg">01</div>
                  <div>
                    <p className="font-label-caps text-label-caps text-primary">Core Mandate Analysis</p>
                    <p className="font-label-sm text-outline">Active / {analytics?.completedTasks || 0} Complete</p>
                  </div>
                </div>
                <div className="flex items-center gap-md">
                  <div className="w-12 h-12 bg-outline-variant flex items-center justify-center text-on-surface-variant font-display-lg text-headline-lg">02</div>
                  <div>
                    <p className="font-label-caps text-label-caps text-primary">System Refinement</p>
                    <p className="font-label-sm text-outline">Queued / {analytics?.activeTasks || 0} Critical</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Atmospheric Data Viz */}
            <div className="bg-primary-container p-lg rounded-none flex flex-col justify-between overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-on-tertiary-container/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
              <div>
                <h3 className="font-label-caps text-label-caps text-on-primary-container">Cognitive Load</h3>
                <p className="font-headline-lg text-on-primary">Stable Environment</p>
              </div>
              <div className="h-16 flex items-end gap-1">
                <div className="w-1 bg-on-tertiary-container h-4 animate-[bounce_1.2s_infinite]"></div>
                <div className="w-1 bg-on-tertiary-container h-8 animate-[bounce_1.5s_infinite]"></div>
                <div className="w-1 bg-on-tertiary-container h-6 animate-[bounce_1s_infinite]"></div>
                <div className="w-1 bg-on-tertiary-container h-10 animate-[bounce_1.8s_infinite]"></div>
                <div className="w-1 bg-on-tertiary-container h-4 animate-[bounce_1.4s_infinite]"></div>
                <div className="w-1 bg-on-tertiary-container h-12 animate-[bounce_2s_infinite]"></div>
                <div className="w-1 bg-on-tertiary-container h-7 animate-[bounce_1.3s_infinite]"></div>
              </div>
              <p className="font-label-sm text-on-primary-container">Noise Floor: -42dB</p>
            </div>
          </div>

          {/* Recent Resolution Log */}
          <div className="col-span-12 lg:col-span-12 bg-surface-container-lowest border border-outline-variant overflow-hidden mb-xl">
            <div className="p-lg border-b border-outline-variant flex justify-between items-center">
              <h2 className="font-headline-lg text-primary">Resolution Log</h2>
              <button className="font-label-caps text-[10px] text-outline hover:text-primary transition-colors">VIEW_FULL_LOG</button>
            </div>
            <div className="divide-y divide-surface-container">
              {tasks.slice(0, 3).map((task, idx) => (
                <div key={task._id} className="p-md hover:bg-surface-container-low transition-colors flex items-center gap-lg group cursor-pointer">
                  <span className="font-label-caps text-label-caps text-outline w-24">14:{22 - idx}:{String(idx * 14).padStart(2, '0')}</span>
                  <span className={`material-symbols-outlined text-body-md ${task.status === 'completed' ? 'text-on-tertiary-container' : 'text-on-secondary-container'}`}>
                    {task.status === 'completed' ? 'check_circle' : 'pause_circle'}
                  </span>
                  <div className="flex-1">
                    <p className="font-label-caps text-label-caps text-primary">{task.title}</p>
                    <p className="font-label-sm text-outline">{task.status === 'completed' ? 'Resolved successfully' : 'Pending resolution'}</p>
                  </div>
                  <span className="font-label-caps text-[10px] text-primary px-sm py-xs bg-surface-container rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    VIEW
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default AnalyticsPage;
