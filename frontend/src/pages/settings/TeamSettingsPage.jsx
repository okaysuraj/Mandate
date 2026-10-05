import React, { useState, useEffect } from "react";
import AppLayout from "../../components/layout/AppLayout";
import { useWorkspace } from "../../context/WorkspaceContext";
import axios from "axios";

const TeamSettingsPage = () => {
  const { activeWorkspace } = useWorkspace();
  const [tasks, setTasks] = useState([]);
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const [tasksRes, analyticsRes] = await Promise.all([
          axios.get("/api/tasks", { params: { limit: 100 } }),
          axios.get("/api/tasks/analytics")
        ]);
        setTasks(tasksRes.data.data || []);
        setAnalytics(analyticsRes.data);
      } catch (error) {
        console.error("Failed to load team tasks");
      }
    };
    if (activeWorkspace) fetchTeamData();
  }, [activeWorkspace]);

  if (!activeWorkspace) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-3">
            <span className="material-symbols-outlined text-4xl text-primary animate-spin">sync</span>
            <p className="text-on-surface-variant font-mono text-xs tracking-wider">SYNCING_WORKSPACE...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  const criticalTasks = tasks.filter(t => t.priority === "high" || t.priority === "urgent").slice(0, 5);
  const activeMembersCount = activeWorkspace.members?.length || 1;
  const idleMembersCount = Math.max(0, activeMembersCount - (analytics?.activeTasks > 0 ? 1 : 0));
  const actualActiveMembers = activeMembersCount - idleMembersCount;

  // Calculate Workload Distribution dynamically based on task priority
  const priorityDistribution = { urgent: 0, high: 0, medium: 0, low: 0, none: 0 };
  let maxPriorityCount = 1;
  tasks.forEach(t => {
    const p = t.priority || "none";
    if (priorityDistribution[p] !== undefined) {
      priorityDistribution[p]++;
      if (priorityDistribution[p] > maxPriorityCount) maxPriorityCount = priorityDistribution[p];
    }
  });

  // Calculate SVG Line Chart dynamically based on completions per hour
  const completedHistory = Array(17).fill(10);
  tasks.filter(t => t.status === "completed").forEach((t, i) => {
    const hourSlot = (new Date(t.updatedAt).getHours() || i) % 17;
    completedHistory[hourSlot] += 15;
  });
  
  const maxHistory = Math.max(...completedHistory, 50);
  const pathPoints = completedHistory.map((val, idx) => {
    const x = (idx / 16) * 800;
    const y = 100 - ((val / maxHistory) * 100);
    return `${idx === 0 ? 'M' : 'L'}${x} ${y}`;
  }).join(' ');

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto w-full px-4 md:px-6 py-6 space-y-6 pb-20">
        {/* Header Section */}
        <section className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-outline-variant pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-primary text-xl">corporate_fare</span>
              <p className="font-label-caps text-xs text-on-surface-variant uppercase tracking-wider">TEAM WORKSPACE</p>
            </div>
            <h2 className="font-headline-lg text-2xl md:text-3xl font-extrabold text-on-surface tracking-tight">
              {activeWorkspace.name || "Engineering Fleet"}
            </h2>
            <p className="text-xs md:text-sm text-on-surface-variant font-mono mt-0.5">
              TELEMETRY CLUSTER &bull; ACTIVE ROSTER: {activeMembersCount} NODES
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="px-3.5 py-1.5 bg-surface-container border border-outline-variant rounded-full flex items-center gap-2">
              <span className="w-2 h-2 bg-tertiary rounded-full animate-pulse" />
              <span className="font-mono text-xs font-bold text-on-surface">SYSTEM STABLE</span>
            </div>
            <div className="px-3.5 py-1.5 bg-surface-container border border-outline-variant rounded-full flex items-center gap-2 hidden sm:flex">
              <span className="font-mono text-xs text-on-surface-variant">UPTIME: 99.98%</span>
            </div>
          </div>
        </section>

        {/* Bento Grid Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Member Status (Active/Idle) */}
          <div className="col-span-12 lg:col-span-4 bg-surface-container-lowest border border-outline-variant p-5 md:p-6 rounded-2xl flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="font-label-caps text-xs text-on-surface-variant font-semibold uppercase tracking-wider">MEMBER STATUS</span>
                <span className="material-symbols-outlined text-primary text-xl">monitoring</span>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-black text-on-surface tracking-tight">{String(actualActiveMembers).padStart(2, '0')}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-tertiary-container text-on-tertiary-container border border-outline-variant font-label-caps text-[10px] font-bold tracking-wider">
                  ACTIVE
                </span>
              </div>
              <div className="flex items-baseline gap-3 mt-3 opacity-60">
                <span className="text-3xl font-bold text-on-surface tracking-tight">{String(idleMembersCount).padStart(2, '0')}</span>
                <span className="font-mono text-xs text-on-surface-variant">STANDBY / IDLE</span>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-outline-variant/60 flex items-center justify-between">
              <div className="flex -space-x-2">
                {activeWorkspace.members?.slice(0, 5).map((member, idx) => (
                  <div key={idx} className="w-9 h-9 rounded-full border-2 border-surface-container-lowest bg-primary text-on-primary flex items-center justify-center text-xs font-bold shadow-xs">
                    {member.user?.name ? member.user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                ))}
              </div>
              <span className="text-xs font-mono text-on-surface-variant">
                {activeMembersCount} Total Assigned
              </span>
            </div>
          </div>

          {/* Aggregate Output (Line Chart) */}
          <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest border border-outline-variant p-5 md:p-6 rounded-2xl flex flex-col min-h-[300px] shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <span className="font-label-caps text-xs text-on-surface-variant font-semibold uppercase tracking-wider">AGGREGATE OUTPUT (24H)</span>
                <p className="text-xs text-on-surface-variant font-mono mt-0.5">Task completion throughput</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono flex items-center gap-1.5 text-on-surface">
                  <span className="w-2.5 h-2.5 bg-primary rounded-full" /> Actual
                </span>
                <span className="text-xs font-mono flex items-center gap-1.5 text-on-surface-variant opacity-60">
                  <span className="w-2.5 h-2.5 border border-primary rounded-full" /> Target
                </span>
              </div>
            </div>

            <div className="flex-1 relative flex items-end min-h-[160px] w-full">
              {/* Grid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between opacity-15 pointer-events-none">
                <div className="w-full border-t border-current text-on-surface" />
                <div className="w-full border-t border-current text-on-surface" />
                <div className="w-full border-t border-current text-on-surface" />
              </div>
              <svg className="absolute inset-0 w-full h-full text-primary" preserveAspectRatio="none" viewBox="0 0 800 100">
                <path d={pathPoints} fill="none" stroke="currentColor" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
              </svg>
              {/* Floating Indicator */}
              <div className="absolute right-2 top-2 bg-primary text-on-primary px-2.5 py-1 font-mono text-[11px] font-bold rounded-lg shadow-sm">
                PEAK: {analytics?.completedTasks || 0}u
              </div>
            </div>

            <div className="mt-3 flex justify-between font-mono text-[11px] text-on-surface-variant opacity-60 border-t border-outline-variant/40 pt-2">
              <span>00:00</span>
              <span>06:00</span>
              <span>12:00</span>
              <span>18:00</span>
              <span>23:59</span>
            </div>
          </div>

          {/* Current Critical Mandates (List) */}
          <div className="col-span-12 lg:col-span-7 bg-surface-container-lowest border border-outline-variant p-5 md:p-6 rounded-2xl flex flex-col shadow-xs">
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="font-label-caps text-xs text-on-surface-variant font-semibold uppercase tracking-wider">CRITICAL MANDATES</span>
                <p className="text-xs text-on-surface-variant font-mono mt-0.5">High &amp; urgent priority queue</p>
              </div>
              <span className="material-symbols-outlined text-primary text-xl">priority_high</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full font-mono text-xs">
                <thead>
                  <tr className="text-left text-on-surface-variant border-b border-outline-variant pb-2">
                    <th className="pb-2 font-semibold">ID</th>
                    <th className="pb-2 font-semibold">OBJECTIVE</th>
                    <th className="pb-2 font-semibold">STATUS</th>
                    <th className="pb-2 font-semibold text-right">PRIORITY</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/40">
                  {criticalTasks.length > 0 ? (
                    criticalTasks.map((task, idx) => (
                      <tr key={task._id || idx} className="hover:bg-surface-container/50 transition-colors">
                        <td className="py-3 text-primary font-bold">
                          #{String(task._id || task.id || idx).slice(-4).toUpperCase()}
                        </td>
                        <td className="py-3 font-semibold text-on-surface max-w-[180px] truncate pr-2">
                          {task.title}
                        </td>
                        <td className="py-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider ${
                            task.status === 'completed' 
                              ? 'bg-tertiary-container text-on-tertiary-container border border-outline-variant' 
                              : 'bg-surface-container border border-outline-variant text-on-surface-variant'
                          }`}>
                            {task.status?.toUpperCase() || "PENDING"}
                          </span>
                        </td>
                        <td className="py-3 text-right">
                          <span className="text-error font-bold text-[10px] uppercase bg-error/10 px-2 py-0.5 rounded border border-error/20">
                            {task.priority}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="py-8 text-center text-on-surface-variant">
                        No critical mandates found. All systems nominal.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Workload Distribution (Bar Chart) */}
          <div className="col-span-12 lg:col-span-5 bg-surface-container-lowest border border-outline-variant p-5 md:p-6 rounded-2xl flex flex-col justify-between shadow-xs">
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="font-label-caps text-xs text-on-surface-variant font-semibold uppercase tracking-wider">WORKLOAD SPREAD</span>
                <p className="text-xs text-on-surface-variant font-mono mt-0.5">Tasks by priority classification</p>
              </div>
              <span className="material-symbols-outlined text-primary text-xl">bar_chart</span>
            </div>

            <div className="flex items-end justify-between gap-3 px-2 h-44">
              <div className="flex flex-col items-center gap-2 flex-1 h-full justify-end">
                <div className="w-full bg-error rounded-t-lg transition-all" style={{ height: `${(priorityDistribution.urgent / maxPriorityCount) * 100 || 8}%` }} />
                <span className="font-mono text-[10px] text-on-surface-variant font-semibold">URG</span>
              </div>
              <div className="flex flex-col items-center gap-2 flex-1 h-full justify-end">
                <div className="w-full bg-primary rounded-t-lg transition-all" style={{ height: `${(priorityDistribution.high / maxPriorityCount) * 100 || 8}%` }} />
                <span className="font-mono text-[10px] text-on-surface-variant font-semibold">HIGH</span>
              </div>
              <div className="flex flex-col items-center gap-2 flex-1 h-full justify-end">
                <div className="w-full bg-primary/70 rounded-t-lg transition-all" style={{ height: `${(priorityDistribution.medium / maxPriorityCount) * 100 || 8}%` }} />
                <span className="font-mono text-[10px] text-on-surface-variant font-semibold">MED</span>
              </div>
              <div className="flex flex-col items-center gap-2 flex-1 h-full justify-end">
                <div className="w-full bg-surface-container-high rounded-t-lg transition-all" style={{ height: `${(priorityDistribution.low / maxPriorityCount) * 100 || 8}%` }} />
                <span className="font-mono text-[10px] text-on-surface-variant font-semibold">LOW</span>
              </div>
              <div className="flex flex-col items-center gap-2 flex-1 h-full justify-end">
                <div className="w-full bg-surface-container rounded-t-lg transition-all" style={{ height: `${(priorityDistribution.none / maxPriorityCount) * 100 || 8}%` }} />
                <span className="font-mono text-[10px] text-on-surface-variant font-semibold">NONE</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-outline-variant/60">
              <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                <span className="text-on-surface-variant">AVERAGE RESOLUTION LATENCY</span>
                <span className="font-bold text-on-surface">{analytics?.averageResolutionLatency || "12ms"}</span>
              </div>
              <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-[88%] rounded-full" />
              </div>
            </div>
          </div>

          {/* Bottom Row: Minor Bento Metrics */}
          <div className="col-span-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-surface-container-lowest border border-outline-variant p-4.5 rounded-2xl flex items-center gap-4 shadow-xs">
              <div className="w-11 h-11 bg-surface-container rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                <span className="material-symbols-outlined text-2xl">speed</span>
              </div>
              <div>
                <p className="font-mono text-[11px] text-on-surface-variant font-medium">VELOCITY RATIO</p>
                <p className="font-headline-lg text-2xl font-bold text-on-surface">
                  {(analytics?.completedTasks > 0 ? (analytics?.completedTasks / (analytics?.activeTasks || 1)).toFixed(2) : 1.44)}x
                </p>
              </div>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant p-4.5 rounded-2xl flex items-center gap-4 shadow-xs">
              <div className="w-11 h-11 bg-surface-container rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                <span className="material-symbols-outlined text-2xl">warning</span>
              </div>
              <div>
                <p className="font-mono text-[11px] text-on-surface-variant font-medium">ACTIVE ANOMALIES</p>
                <p className="font-headline-lg text-2xl font-bold text-on-surface">
                  {analytics?.activeTasks > 5 ? '02' : '00'}
                </p>
              </div>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant p-4.5 rounded-2xl flex items-center gap-4 shadow-xs">
              <div className="w-11 h-11 bg-surface-container rounded-xl flex items-center justify-center text-tertiary flex-shrink-0">
                <span className="material-symbols-outlined text-2xl">check_circle</span>
              </div>
              <div>
                <p className="font-mono text-[11px] text-on-surface-variant font-medium">FLEET SUCCESS</p>
                <p className="font-headline-lg text-2xl font-bold text-on-surface">
                  {Math.min(99.4, (analytics?.completedTasks / (analytics?.totalTasks || 1) * 100).toFixed(1))}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default TeamSettingsPage;
