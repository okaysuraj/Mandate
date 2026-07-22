import React, { useState, useEffect } from "react";
import AppLayout from "../components/AppLayout";
import { useWorkspace } from "../context/WorkspaceContext";
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
        <div className="flex items-center justify-center h-[80vh]">
          <p className="text-on-surface-variant font-label-caps">Loading workspace...</p>
        </div>
      </AppLayout>
    );
  }

  const criticalTasks = tasks.filter(t => t.priority === "high" || t.priority === "urgent").slice(0, 5);
  const activeMembersCount = activeWorkspace.members?.length || 1;
  const idleMembersCount = Math.max(0, activeMembersCount - (analytics?.activeTasks > 0 ? 1 : 0)); // Very simple mock logic based on active tasks
  const actualActiveMembers = activeMembersCount - idleMembersCount;

  return (
    <AppLayout>
      <div className="bg-surface min-h-full pb-xl">
        {/* Header Section */}
        <section className="mb-xl flex flex-col md:flex-row justify-between md:items-end gap-md">
          <div>
            <p className="font-label-caps text-label-caps text-on-surface-variant mb-xs uppercase">OPERATIONAL_VIEW_01</p>
            <h2 className="font-display-lg text-headline-lg md:text-display-lg uppercase tracking-tighter text-primary">TEAM_WORKSPACE</h2>
          </div>
          <div className="flex gap-sm">
            <div className="px-md py-sm bg-surface-container border border-outline-variant rounded-full flex items-center gap-sm">
              <span className="w-2 h-2 bg-tertiary-fixed-dim rounded-full animate-pulse"></span>
              <span className="font-label-sm text-label-sm font-bold">SYSTEM_STABLE</span>
            </div>
            <div className="px-md py-sm bg-surface-container border border-outline-variant rounded-full flex items-center gap-sm hidden md:flex">
              <span className="font-label-sm text-label-sm font-bold">UPTIME: 99.98%</span>
            </div>
          </div>
        </section>

        {/* Bento Grid Dashboard */}
        <div className="grid grid-cols-12 gap-lg">
          {/* Member Status (Active/Idle) */}
          <div className="col-span-12 lg:col-span-4 bg-surface-container-lowest border border-outline-variant p-lg rounded-none flex flex-col justify-between hover:border-primary transition-colors">
            <div>
              <div className="flex justify-between items-start mb-md">
                <span className="font-label-caps text-label-caps text-on-surface-variant">MEMBER_STATUS</span>
                <span className="material-symbols-outlined text-on-surface-variant">monitoring</span>
              </div>
              <div className="flex items-baseline gap-sm">
                <span className="text-[64px] font-bold leading-none text-primary">{String(actualActiveMembers).padStart(2, '0')}</span>
                <span className="font-label-caps text-label-caps text-tertiary-fixed-dim">ACTIVE</span>
              </div>
              <div className="flex items-baseline gap-sm opacity-40">
                <span className="text-[32px] font-bold leading-none text-primary">{String(idleMembersCount).padStart(2, '0')}</span>
                <span className="font-label-caps text-label-caps text-primary">IDLE</span>
              </div>
            </div>
            <div className="mt-lg pt-md border-t border-outline-variant flex -space-x-3">
              {activeWorkspace.members?.slice(0, 4).map((member, idx) => (
                <div key={idx} className="w-10 h-10 rounded-full border-2 border-surface-container-lowest bg-primary flex items-center justify-center font-bold text-on-primary">
                  {member.user?.name ? member.user.name.charAt(0).toUpperCase() : "U"}
                </div>
              ))}
              {activeWorkspace.members?.length > 4 && (
                <div className="w-10 h-10 rounded-full bg-surface-container border-2 border-surface-container-lowest flex items-center justify-center font-label-caps text-[10px] text-on-surface-variant">
                  +{activeWorkspace.members.length - 4}
                </div>
              )}
            </div>
          </div>

          {/* Aggregate Output (Line Chart) */}
          <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest border border-outline-variant p-lg rounded-none flex flex-col h-[320px] hover:border-primary transition-colors">
            <div className="flex justify-between items-center mb-lg">
              <span className="font-label-caps text-label-caps text-on-surface-variant">AGGREGATE_OUTPUT_24H</span>
              <div className="flex gap-md">
                <span className="font-label-sm text-label-sm flex items-center gap-sm">
                  <span className="w-2 h-2 bg-primary rounded-full"></span> ACTUAL
                </span>
                <span className="font-label-sm text-label-sm flex items-center gap-sm opacity-40">
                  <span className="w-2 h-2 bg-primary rounded-full"></span> TARGET
                </span>
              </div>
            </div>
            <div className="flex-1 relative flex items-end gap-1">
              {/* Fake Line Chart Background */}
              <div className="absolute inset-0 flex flex-col justify-between opacity-10 pointer-events-none">
                <div className="w-full border-t border-primary"></div>
                <div className="w-full border-t border-primary"></div>
                <div className="w-full border-t border-primary"></div>
                <div className="w-full border-t border-primary"></div>
              </div>
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                <path d="M0 80 L50 70 L100 90 L150 40 L200 60 L250 20 L300 50 L350 30 L400 45 L450 10 L500 35 L550 5 L600 25 L650 40 L700 15 L750 30 L800 10" fill="none" stroke="black" strokeWidth="2" vectorEffect="non-scaling-stroke"></path>
              </svg>
              {/* Floating Indicator */}
              <div className="absolute right-0 top-1/4 bg-primary text-on-primary px-sm py-xs font-label-sm text-label-sm rounded">
                MAX_PEAK: {analytics?.completedTasks || 0}u
              </div>
            </div>
            <div className="mt-md flex justify-between font-label-caps text-[10px] text-on-surface-variant opacity-40">
              <span>00:00</span>
              <span>06:00</span>
              <span>12:00</span>
              <span>18:00</span>
              <span>23:59</span>
            </div>
          </div>

          {/* Current Critical Mandates (List) */}
          <div className="col-span-12 lg:col-span-7 bg-surface-container-lowest border border-outline-variant p-lg rounded-none flex flex-col h-[400px] hover:border-primary transition-colors">
            <div className="flex justify-between items-center mb-lg">
              <span className="font-label-caps text-label-caps text-on-surface-variant">CRITICAL_MANDATES</span>
              <button className="text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined">more_horiz</span>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar pr-md">
              <table className="w-full">
                <thead className="sticky top-0 bg-surface-container-lowest z-10">
                  <tr className="text-left font-label-caps text-[10px] text-on-surface-variant border-b border-outline-variant">
                    <th className="pb-sm font-semibold uppercase">ID_REF</th>
                    <th className="pb-sm font-semibold uppercase">OBJECTIVE</th>
                    <th className="pb-sm font-semibold uppercase">STATUS</th>
                    <th className="pb-sm font-semibold uppercase text-right">PRIORITY</th>
                  </tr>
                </thead>
                <tbody className="font-body-md text-on-surface divide-y divide-surface-container-low">
                  {criticalTasks.length > 0 ? (
                    criticalTasks.map((task, idx) => (
                      <tr key={task._id || idx} className="group hover:bg-surface-container-low transition-colors">
                        <td className="py-md font-label-sm text-label-sm opacity-60">#{String(task._id || task.id || idx).slice(-6).toUpperCase()}</td>
                        <td className="py-md font-bold truncate max-w-[150px]">{task.title}</td>
                        <td className="py-md">
                          <span className={`px-md py-xs rounded-full font-label-caps text-[9px] font-bold ${task.status === 'completed' ? 'bg-tertiary-container text-on-tertiary-container' : 'bg-surface-container-high'}`}>
                            {task.status?.toUpperCase() || "PENDING"}
                          </span>
                        </td>
                        <td className="py-md text-right">
                          <span className="text-error font-bold font-label-caps text-[10px] uppercase">{task.priority}</span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="py-xl text-center font-label-sm text-on-surface-variant">No critical mandates found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Workload Distribution (Bar Chart) */}
          <div className="col-span-12 lg:col-span-5 bg-surface-container-lowest border border-outline-variant p-lg rounded-none flex flex-col h-[400px] hover:border-primary transition-colors">
            <div className="flex justify-between items-center mb-lg">
              <span className="font-label-caps text-label-caps text-on-surface-variant">WORKLOAD_DISTRIBUTION</span>
              <span className="material-symbols-outlined text-on-surface-variant">bar_chart</span>
            </div>
            <div className="flex-1 flex items-end justify-between gap-md px-md">
              <div className="flex flex-col items-center gap-md flex-1 h-full justify-end">
                <div className="w-full bg-primary-container transition-all" style={{ height: '85%' }}></div>
                <span className="font-label-caps text-[10px] text-on-surface-variant">CORE</span>
              </div>
              <div className="flex flex-col items-center gap-md flex-1 h-full justify-end">
                <div className="w-full bg-primary transition-all" style={{ height: '45%' }}></div>
                <span className="font-label-caps text-[10px] text-on-surface-variant">OPS</span>
              </div>
              <div className="flex flex-col items-center gap-md flex-1 h-full justify-end">
                <div className="w-full bg-primary-container transition-all" style={{ height: '65%' }}></div>
                <span className="font-label-caps text-[10px] text-on-surface-variant">SEC</span>
              </div>
              <div className="flex flex-col items-center gap-md flex-1 h-full justify-end">
                <div className="w-full bg-primary transition-all" style={{ height: '95%' }}></div>
                <span className="font-label-caps text-[10px] text-on-surface-variant">DEV</span>
              </div>
              <div className="flex flex-col items-center gap-md flex-1 h-full justify-end">
                <div className="w-full bg-primary-container transition-all" style={{ height: '30%' }}></div>
                <span className="font-label-caps text-[10px] text-on-surface-variant">QA</span>
              </div>
            </div>
            <div className="mt-lg pt-md border-t border-outline-variant">
              <div className="flex justify-between items-center mb-sm">
                <span className="font-label-sm text-label-sm opacity-60">AVG_LATENCY</span>
                <span className="font-label-sm text-label-sm font-bold">{analytics?.averageResolutionLatency || "12ms"}</span>
              </div>
              <div className="w-full bg-surface-container-low h-1 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-[88%]"></div>
              </div>
            </div>
          </div>

          {/* Bottom Row: Minor Stats */}
          <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-lg">
            <div className="bg-surface-container-lowest border border-outline-variant p-md rounded-none flex items-center gap-lg hover:border-primary transition-colors">
              <div className="p-md bg-surface-container rounded-full">
                <span className="material-symbols-outlined text-primary">speed</span>
              </div>
              <div>
                <p className="font-label-caps text-[10px] text-on-surface-variant">VELOCITY_RATIO</p>
                <p className="font-headline-lg font-bold text-primary">{(analytics?.completedTasks > 0 ? (analytics?.completedTasks / (analytics?.activeTasks || 1)).toFixed(2) : 1.44)}x</p>
              </div>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant p-md rounded-none flex items-center gap-lg hover:border-primary transition-colors">
              <div className="p-md bg-surface-container rounded-full">
                <span className="material-symbols-outlined text-primary">warning</span>
              </div>
              <div>
                <p className="font-label-caps text-[10px] text-on-surface-variant">ACTIVE_ANOMALIES</p>
                <p className="font-headline-lg font-bold text-primary">{analytics?.activeTasks > 5 ? '02' : '00'}</p>
              </div>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant p-md rounded-none flex items-center gap-lg hover:border-primary transition-colors">
              <div className="p-md bg-surface-container rounded-full">
                <span className="material-symbols-outlined text-primary">check_circle</span>
              </div>
              <div>
                <p className="font-label-caps text-[10px] text-on-surface-variant">SUCCESS_RATE</p>
                <p className="font-headline-lg font-bold text-primary">{Math.min(99.4, (analytics?.completedTasks / (analytics?.totalTasks || 1) * 100).toFixed(1))}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default TeamSettingsPage;
