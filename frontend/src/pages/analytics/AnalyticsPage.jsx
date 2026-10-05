import React, { useState, useEffect } from "react";
import AppLayout from "../../components/layout/AppLayout";
import api from "../../lib/axios";
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
          api.get("/tasks", { params: { limit: 100 } }),
          api.get("/tasks/analytics")
        ]);
        setTasks(tasksRes.data.data || []);
        setAnalytics(analyticsRes.data);
      } catch (error) {
        console.error("Failed to load analytics", error);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchAnalytics();
  }, [user]);

  // Compute 6 dynamic buckets for Output vs Capacity based on real tasks
  const completedTasks = tasks.filter(t => t.status === "completed");
  const activeTasks = tasks.filter(t => t.status !== "completed");
  const totalCount = tasks.length || 1;

  const buckets = [
    { label: "URGENT", total: tasks.filter(t => t.priority === "urgent").length, done: completedTasks.filter(t => t.priority === "urgent").length },
    { label: "HIGH", total: tasks.filter(t => t.priority === "high").length, done: completedTasks.filter(t => t.priority === "high").length },
    { label: "MEDIUM", total: tasks.filter(t => t.priority === "medium").length, done: completedTasks.filter(t => t.priority === "medium").length },
    { label: "LOW", total: tasks.filter(t => t.priority === "low").length, done: completedTasks.filter(t => t.priority === "low").length },
    { label: "PLANNED", total: tasks.filter(t => !!t.dueDate).length, done: completedTasks.filter(t => !!t.dueDate).length },
    { label: "UNSCHEDULED", total: tasks.filter(t => !t.dueDate).length, done: completedTasks.filter(t => !t.dueDate).length },
  ];

  return (
    <AppLayout>
      <div className="min-h-full space-y-6 pb-12 w-full max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-4 border-b border-outline-variant">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>
              <p className="font-mono text-xs uppercase font-bold text-on-surface-variant tracking-widest">
                PRODUCTIVITY INTELLIGENCE · REALTIME TELEMETRY
              </p>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-on-surface uppercase tracking-tight">Command Center</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="bg-surface-container-lowest border border-outline-variant px-3.5 py-1.5 rounded-lg flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase font-bold text-on-surface-variant">DIRECTIVES:</span>
              <span className="font-mono text-xs text-on-surface font-bold">{tasks.length} LOGGED</span>
            </div>
            <div className="bg-tertiary-container border border-outline-variant px-3.5 py-1.5 rounded-lg flex items-center gap-2 text-on-tertiary-container">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
              <span className="font-mono text-xs font-bold uppercase tracking-wider">SYSTEM_OPTIMAL</span>
            </div>
          </div>
        </header>

        {/* Bento Grid */}
        <div className="grid grid-cols-12 gap-4 sm:gap-6">
          {/* Output vs Capacity (Primary Chart) */}
          <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest border border-outline-variant p-5 sm:p-6 rounded-xl shadow-sm relative overflow-hidden group">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6">
              <div>
                <h2 className="text-base sm:text-lg font-bold font-mono uppercase tracking-tight text-on-surface">Output vs. Capacity</h2>
                <p className="text-xs text-on-surface-variant">Dual-axis workstream distribution (Done vs Total in Queue)</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 font-mono text-[10px] text-on-surface font-bold"><span className="w-3 h-1 bg-primary rounded-full"></span>OUTPUT</span>
                <span className="flex items-center gap-1.5 font-mono text-[10px] text-on-surface-variant"><span className="w-3 h-1 bg-surface-container-high rounded-full"></span>CAPACITY</span>
              </div>
            </div>
            
            {/* Dynamic Visual Representation of Dual Axis Workstream Breakdown */}
            <div className="h-56 sm:h-64 w-full flex items-end gap-2 sm:gap-4 pt-4">
              {buckets.map((b) => {
                const maxVal = Math.max(...buckets.map(x => x.total), 5);
                const capacityHeight = Math.max(Math.round((b.total / maxVal) * 100), 12);
                const outputHeight = b.total > 0 ? Math.round((b.done / b.total) * capacityHeight) : 0;

                return (
                  <div key={b.label} className="flex-1 flex flex-col justify-end gap-1.5">
                    <div className="w-full bg-surface-container-low border border-outline-variant relative rounded-lg overflow-hidden" style={{ height: `${capacityHeight}%` }}>
                      <div 
                        className="absolute bottom-0 left-0 w-full bg-primary/40 transition-all duration-500 rounded-b-lg" 
                        style={{ height: `${outputHeight}%` }}
                      ></div>
                      <div className="absolute top-1.5 left-1.5 font-mono text-[9px] text-on-surface font-bold">
                        {b.done}/{b.total}
                      </div>
                    </div>
                    <span className="font-mono text-[9px] text-center text-on-surface-variant truncate uppercase font-bold" title={b.label}>
                      {b.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Deep Work Ratio */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-surface-container-lowest border border-outline-variant p-5 sm:p-6 rounded-xl shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <h2 className="text-base sm:text-lg font-bold font-mono uppercase tracking-tight text-on-surface">Deep Work Ratio</h2>
                <span className="material-symbols-outlined text-primary text-[20px]">bolt</span>
              </div>
              <p className="text-xs text-on-surface-variant font-mono">Synchronous focus telemetry</p>
            </div>
            
            <div className="relative py-4 flex items-center justify-center">
              <svg className="w-40 h-40 sm:w-44 sm:h-44 transform -rotate-90">
                <circle className="text-surface-container-high" cx="88" cy="88" fill="transparent" r="72" stroke="currentColor" strokeWidth="6"></circle>
                <circle className="text-primary transition-all duration-1000 ease-out" cx="88" cy="88" fill="transparent" r="72" stroke="currentColor" strokeDasharray="452.4" strokeDashoffset={452.4 - (452.4 * (analytics?.deepWorkRatio || 0) / 100)} strokeWidth="10" strokeLinecap="round"></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl sm:text-3xl font-black font-mono text-on-surface">{analytics?.deepWorkRatio || 0}%</span>
                <span className="font-mono text-[9px] uppercase tracking-wider text-tertiary font-bold mt-0.5">ACTIVE METRIC</span>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-outline-variant">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-on-surface-variant uppercase">TARGET</span>
                <span className="text-on-surface font-bold">80.0%</span>
              </div>
              <div className="flex justify-between text-xs font-mono">
                <span className="text-on-surface-variant uppercase">TOTAL RESOLVED</span>
                <span className="text-on-surface font-bold">{analytics?.completedTasks || 0}</span>
              </div>
            </div>
          </div>

          {/* Task Resolution Latency */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-surface-container-lowest border border-outline-variant p-5 sm:p-6 rounded-xl shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold font-mono uppercase tracking-tight text-on-surface mb-1">Task Latency</h2>
              <p className="text-xs text-on-surface-variant font-mono">Mean resolution time per ticket</p>
            </div>
            
            <div className="p-4 bg-surface-container-low border border-outline-variant rounded-lg space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="uppercase text-on-surface-variant font-bold text-[10px]">AVERAGE LATENCY</span>
                <span className="text-on-surface font-bold">{analytics?.averageResolutionLatency || "0h 0m"}</span>
              </div>
              <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-[85%] rounded-full"></div>
              </div>
            </div>

            <div className="pt-2 border-t border-outline-variant">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[18px]">schedule</span>
                <span className="font-mono text-[10px] text-on-surface-variant">Live telemetry from audit logs</span>
              </div>
            </div>
          </div>

          {/* Strategic Overview */}
          <div className="col-span-12 lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Dynamic Workloads */}
            <div className="bg-surface-container-lowest border border-outline-variant p-5 sm:p-6 rounded-xl shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-mono text-xs uppercase font-bold text-on-surface">Dynamic Workloads</h3>
                <span className="material-symbols-outlined text-on-surface-variant text-[20px]">stacks</span>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-surface-container-high border border-outline-variant flex items-center justify-center text-on-surface font-mono text-sm font-bold">01</div>
                  <div>
                    <p className="font-mono text-xs font-bold text-on-surface uppercase">Core Directives</p>
                    <p className="text-xs text-on-surface-variant font-mono">Total Logged: {tasks.length}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-surface-container-high border border-outline-variant flex items-center justify-center text-on-surface font-mono text-sm font-bold">02</div>
                  <div>
                    <p className="font-mono text-xs font-bold text-on-surface uppercase">Execution Queue</p>
                    <p className="text-xs text-on-surface-variant font-mono">{analytics?.activeTasks || 0} Pending</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* System Balance */}
            <div className="bg-surface-container-high border border-outline-variant p-5 sm:p-6 rounded-xl shadow-sm flex flex-col justify-between space-y-4">
              <div>
                <h3 className="font-mono text-xs uppercase font-bold text-on-surface-variant mb-1">System Balance</h3>
                <p className="text-lg font-bold text-on-surface">Active Telemetry</p>
              </div>
              <div className="space-y-1 font-mono text-xs text-on-surface-variant">
                <p>Active Directives: <span className="font-bold text-on-surface">{analytics?.activeTasks || 0}</span></p>
                <p>Resolved Directives: <span className="font-bold text-on-surface">{analytics?.completedTasks || 0}</span></p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-tertiary font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                Status: Live Synchronized
              </div>
            </div>
          </div>

          {/* Recent Resolution Log */}
          <div className="col-span-12 bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
            <div className="p-4 sm:p-5 border-b border-outline-variant flex justify-between items-center">
              <h2 className="text-base font-bold font-mono uppercase tracking-wider text-on-surface">Resolution Log</h2>
              <button className="font-mono text-xs font-bold text-primary uppercase hover:underline cursor-pointer">VIEW FULL LOG</button>
            </div>
            <div className="divide-y divide-outline-variant">
              {tasks.slice(0, 3).map((task, idx) => (
                <div key={task._id} className="p-4 hover:bg-surface-container-low transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-on-surface-variant w-16">14:{22 - idx}:{String(idx * 14).padStart(2, '0')}</span>
                    <span className={`material-symbols-outlined text-[20px] ${task.status === 'completed' ? 'text-tertiary' : 'text-on-surface-variant'}`}>
                      {task.status === 'completed' ? 'check_circle' : 'pause_circle'}
                    </span>
                    <div>
                      <p className="font-bold text-xs uppercase text-on-surface">{task.title}</p>
                      <p className="text-[11px] text-on-surface-variant">{task.status === 'completed' ? 'Resolved successfully' : 'Pending resolution'}</p>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] text-primary px-2.5 py-1 bg-surface-container border border-outline-variant rounded self-start sm:self-auto opacity-0 group-hover:opacity-100 transition-opacity">
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
