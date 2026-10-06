import useVisibleTasks from '../../hooks/useVisibleTasks';
import React, { useState, useEffect, useCallback, useRef } from "react";
import AppLayout from "../../components/layout/AppLayout";
import api from "../../lib/axios";
import {useDataStore} from "../../store/useDataStore";
import {useWorkspace} from "../../context/WorkspaceContext";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { useSocket } from "../../context/SocketContext";
import { Link, useNavigate } from "react-router";
import {subscribeRefresh} from '../../../../shared/socketRefresh';

const HomePage = () => {
  const tasks = useVisibleTasks();
  const loadTasks = useDataStore(state => state.loadTasks);
  const storeWorkspaceId = useDataStore(state => state.workspaceId);
  const {activeWorkspace}=useWorkspace();
  const workspaceId=activeWorkspace?._id;
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { socket } = useSocket();
  const navigate = useNavigate();

  const dashboardRequest=useRef(null);
  useEffect(()=>()=>dashboardRequest.current?.abort(),[workspaceId]);
  const [analytics, setAnalytics] = useState(null);
  useEffect(()=>setAnalytics(null),[workspaceId]);

  const fetchTasks = useCallback(async () => {
    dashboardRequest.current?.abort();const controller=new AbortController();dashboardRequest.current=controller;
    if(!workspaceId)return;
    try {
      setLoading(true);
      const [, analyticsRes] = await Promise.all([
        loadTasks(),
        api.get("/tasks/analytics",{params:{workspaceId},signal:controller.signal})
      ]);
      if(!controller.signal.aborted)setAnalytics(analyticsRes.data);
    } catch (error) {
      console.error(error.name);
      if(!controller.signal.aborted)toast.error('Failed to load dashboard data');
    } finally {
      if(!controller.signal.aborted)setLoading(false);
    }
  },[loadTasks,workspaceId]);

  useEffect(() => {
    if (user && storeWorkspaceId) fetchTasks();
  }, [user,fetchTasks,storeWorkspaceId]);

  useEffect(()=>subscribeRefresh(socket,fetchTasks),[socket,fetchTasks]);

  // Compute metrics from tasks
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === "completed").length;
  const efficiency = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100 * 10) / 10 : 0;
  const activeTasks = tasks.filter(t => !["completed","archived"].includes(t.status));
  const urgentCount = activeTasks.filter(t => t.priority === "urgent").length;
  const highCount = activeTasks.filter(t => t.priority === "high").length;
  const mediumCount = activeTasks.filter(t => t.priority === "medium").length;
  const lowCount = activeTasks.filter(t => t.priority === "low" || !t.priority).length;

  // Recent activity from tasks (sorted by updatedAt)
  const recentActivity = [...tasks]
    .sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt))
    .slice(0, 5);

  const formatTime = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const deepWorkRatio = analytics?.highPriorityTaskPercentage ?? 0;
  const avgLatency = analytics?.averageResolutionLatency ?? "Unavailable";

  return (
    <AppLayout>
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-3 mb-6">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight uppercase">Dashboard</h1>
          <p className="text-on-surface-variant font-label-caps uppercase tracking-widest text-xs mt-1">
            Workspace: {user?.activeWorkspace ? "Active Workspace" : "Personal"} • Live Updates
          </p>
        </div>
        <div className="flex gap-2">
          <div className="bg-surface-container-low px-3 py-1.5 rounded-full border border-outline-variant flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-on-tertiary-container animate-pulse"></div>
            <span className="font-mono text-xs font-bold text-on-tertiary-container">{socket?.connected?'Connected':'Disconnected'}</span>
          </div>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="bento-grid">
        {/* Metrics Row */}
        <div className="col-span-12 md:col-span-4 bento-card p-5 rounded-lg group hover:border-primary transition-colors">
          <div className="flex justify-between items-start mb-4">
            <span className="font-mono text-xs uppercase tracking-wider text-on-surface-variant font-bold">Efficiency</span>
            <span className="material-symbols-outlined text-outline">query_stats</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-3xl md:text-4xl font-black text-primary">{loading ? "—" : efficiency}<span className="text-lg font-medium">%</span></span>
          </div>
          <div className="mt-3 w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
            <div className="bg-primary h-full transition-all duration-1000" style={{ width: `${loading ? 0 : efficiency}%` }}></div>
          </div>
          <p className="mt-3 text-xs font-mono text-on-surface-variant">
            {completedTasks} of {totalTasks} tasks completed
          </p>
        </div>

        <div className="col-span-12 md:col-span-4 bento-card p-5 rounded-lg group hover:border-primary transition-colors">
          <div className="flex justify-between items-start mb-4">
            <span className="font-mono text-xs uppercase tracking-wider text-on-surface-variant font-bold">Active Tasks</span>
            <span className="material-symbols-outlined text-outline">hub</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-3xl md:text-4xl font-black text-primary">{loading ? "—" : activeTasks.length}</span>
          </div>
          <div className="flex gap-1.5 mt-3">
            <div className="h-2 w-full bg-primary rounded-xs" style={{ opacity: activeTasks.length > 0 ? 1 : 0.2 }}></div>
            <div className="h-2 w-full bg-primary rounded-xs" style={{ opacity: activeTasks.length > 3 ? 1 : 0.2 }}></div>
            <div className="h-2 w-full bg-primary rounded-xs" style={{ opacity: activeTasks.length > 6 ? 1 : 0.2 }}></div>
            <div className="h-2 w-full bg-surface-container rounded-xs"></div>
          </div>
          <p className="mt-3 text-xs font-mono text-on-surface-variant">
            {urgentCount} critical, {highCount} high priority
          </p>
        </div>

        <div className="col-span-12 md:col-span-4 bento-card p-5 rounded-lg group hover:border-primary transition-colors">
          <div className="flex justify-between items-start mb-4">
            <span className="font-mono text-xs uppercase tracking-wider text-on-surface-variant font-bold">High priority tasks</span>
            <span className="material-symbols-outlined text-outline">speed</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-3xl md:text-4xl font-black text-primary">{loading ? "—" : deepWorkRatio}<span className="text-lg font-medium">%</span></span>
          </div>
          <div className="mt-3 w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
            <div className="bg-primary h-full transition-all duration-1000" style={{ width: `${loading ? 0 : deepWorkRatio}%` }}></div>
          </div>
          <p className="mt-3 text-xs font-mono text-on-surface-variant">Avg latency: {avgLatency}</p>
        </div>

        {/* System Pulse Visualization */}
        <div className="col-span-12 md:col-span-8 bento-card p-5 rounded-lg min-h-[380px] relative overflow-hidden flex flex-col">
          <div className="flex justify-between items-center mb-4 relative z-10">
            <h3 className="font-mono text-xs font-bold text-primary uppercase tracking-wider">Recent Task Updates</h3>
            <div className="flex gap-2">
              <span className="text-[10px] font-mono text-on-tertiary-container bg-tertiary-container px-2 py-0.5 rounded-full border border-outline-variant font-bold">{socket?.connected?'Live updates':'Connection unavailable'}</span>
            </div>
          </div>

          <div className="flex-1 flex flex-col md:flex-row gap-4">
            {/* Visualizer Placeholder */}
            <div className="flex-1 bg-surface-container-low rounded-lg relative overflow-hidden min-h-[180px]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-28 h-28 border border-outline-variant rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite]">
                    <div className="w-20 h-20 border-2 border-primary border-t-transparent rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Logs */}
            <div className="w-full md:w-64 flex flex-col gap-2 overflow-y-auto pr-1 max-h-60 md:max-h-none">
              {recentActivity.map((task) => (
                <div key={task._id} className="p-2.5 text-[11px] font-mono rounded-lg border border-outline-variant/60 bg-surface-container-low transition-all hover:bg-surface-container">
                  <div className="flex items-center gap-1.5 font-bold mb-0.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      task.priority === 'urgent' ? 'bg-error' :
                      task.status === 'completed' ? 'bg-tertiary' : 'bg-primary'
                    }`} />
                    <span className="text-on-surface">[{formatTime(task.updatedAt || task.createdAt)}] TASK_{task.status === 'completed' ? 'DONE' : 'UP'}</span>
                  </div>
                  <p className="text-on-surface-variant truncate pl-3">{task.title}</p>
                </div>
              ))}
              {recentActivity.length === 0 && !loading && (
                <div className="p-3 bg-surface-container-low text-[11px] font-mono border border-outline-variant/60 rounded-lg">
                  <p className="text-on-surface font-bold">No task updates</p>
                  <p className="text-on-surface-variant">No recent activity recorded</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Priority Tasks */}
        <div className="col-span-12 md:col-span-4 bento-card p-5 rounded-lg flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-mono text-xs font-bold text-primary uppercase tracking-wider">Priority Tasks</h3>
            <Link to="/today" className="text-[10px] font-mono text-outline hover:text-primary transition-colors uppercase font-bold">VIEW ALL</Link>
          </div>

          <div className="flex flex-col gap-3 flex-1 overflow-y-auto pr-1 pb-2">
            {activeTasks.slice(0, 3).map(task => (
              <div
                key={task._id}
                onClick={() => navigate(`/focus/${task._id}`)}
                className="p-3 bg-surface-container-low border border-outline-variant hover:border-primary rounded-md transition-all cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-1.5">
                  <span className={`px-2 py-0.5 text-[9px] font-mono font-bold rounded-full ${
                    task.priority === 'urgent' || task.priority === 'high'
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container text-on-surface-variant border border-outline-variant'
                  }`}>
                    PRIORITY {task.priority === 'urgent' ? 'S' : task.priority === 'high' ? 'A' : task.priority === 'medium' ? 'B' : 'C'}
                  </span>
                  <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors text-[18px]">push_pin</span>
                </div>
                <h4 className="font-mono text-xs font-bold mb-1 truncate text-on-surface group-hover:text-primary transition-colors">{task.title}</h4>
                <p className="text-on-surface-variant text-xs mb-2 truncate">{task.description || "No description provided."}</p>
                <div className="flex justify-between items-center">
                  <div className="flex -space-x-1.5">
                    <div className="w-5 h-5 rounded-full border border-surface-container-lowest bg-surface-container"></div>
                    <div className="w-5 h-5 rounded-full border border-surface-container-lowest bg-primary-container"></div>
                  </div>
                  <span className="text-[10px] font-mono text-outline">
                    {task.dueDate ? `Due: ${new Date(task.dueDate).toLocaleDateString([], { month: 'short', day: 'numeric' })}` : 'No due date'}
                  </span>
                </div>
              </div>
            ))}

            {activeTasks.length === 0 && !loading && (
              <div className="p-4 border border-outline-variant border-dashed text-center rounded-md">
                <p className="font-mono text-xs text-on-surface-variant">NO ACTIVE TASKS</p>
              </div>
            )}
          </div>

          <Link to="/today" className="mt-auto w-full py-2.5 border-t border-outline-variant text-center text-xs font-mono text-on-surface-variant hover:text-primary transition-colors uppercase font-bold block">
            + ADD NEW TASK
          </Link>
        </div>

        {/* Task Priority Distribution & Health */}
        <div className="col-span-12 bento-card p-5 rounded-lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h3 className="font-mono text-xs font-bold text-primary uppercase tracking-wider">Execution Health & Workstreams</h3>
              <p className="text-xs text-on-surface-variant mt-0.5">Active tasks categorized by execution priority</p>
            </div>
            <div className="flex gap-6">
              <div className="text-center">
                <p className="text-[10px] font-mono uppercase text-on-surface-variant">TOTAL TASKS</p>
                <p className="font-mono font-bold text-xl text-primary">{totalTasks}</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-mono uppercase text-on-surface-variant">RESOLVED</p>
                <p className="font-mono font-bold text-xl text-on-tertiary-container">{completedTasks}</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-mono uppercase text-on-surface-variant">ACTIVE QUEUE</p>
                <p className="font-mono font-bold text-xl text-primary">{activeTasks.length}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-3 p-4 bg-surface-container-low border border-outline-variant rounded-md">
              <div className="flex justify-between items-center text-[11px] font-mono">
                <span className="font-bold text-error uppercase">URGENT</span>
                <span className="text-error font-bold">{urgentCount} ACTIVE</span>
              </div>
              <div className="h-16 w-full bg-surface-container relative overflow-hidden rounded flex items-end">
                <div
                  className="w-full bg-error transition-all duration-700"
                  style={{ height: `${activeTasks.length > 0 ? Math.round((urgentCount / activeTasks.length) * 100) : 0}%` }}
                ></div>
              </div>
              <p className="text-[10px] font-mono text-on-surface-variant">Immediate action required</p>
            </div>

            <div className="space-y-3 p-4 bg-surface-container-low border border-outline-variant rounded-md">
              <div className="flex justify-between items-center text-[11px] font-mono">
                <span className="font-bold text-primary uppercase">HIGH</span>
                <span className="text-primary font-bold">{highCount} ACTIVE</span>
              </div>
              <div className="h-16 w-full bg-surface-container relative overflow-hidden rounded flex items-end">
                <div
                  className="w-full bg-primary transition-all duration-700"
                  style={{ height: `${activeTasks.length > 0 ? Math.round((highCount / activeTasks.length) * 100) : 0}%` }}
                ></div>
              </div>
              <p className="text-[10px] font-mono text-on-surface-variant">Key milestone deliverables</p>
            </div>

            <div className="space-y-3 p-4 bg-surface-container-low border border-outline-variant rounded-md">
              <div className="flex justify-between items-center text-[11px] font-mono">
                <span className="font-bold text-on-surface uppercase">MEDIUM</span>
                <span className="text-on-surface-variant font-bold">{mediumCount} ACTIVE</span>
              </div>
              <div className="h-16 w-full bg-surface-container relative overflow-hidden rounded flex items-end">
                <div
                  className="w-full bg-primary-container transition-all duration-700"
                  style={{ height: `${activeTasks.length > 0 ? Math.round((mediumCount / activeTasks.length) * 100) : 0}%` }}
                ></div>
              </div>
              <p className="text-[10px] font-mono text-on-surface-variant">Standard workflow progress</p>
            </div>

            <div className="space-y-3 p-4 bg-surface-container-low border border-outline-variant rounded-md">
              <div className="flex justify-between items-center text-[11px] font-mono">
                <span className="font-bold text-outline uppercase">LOW</span>
                <span className="text-outline font-bold">{lowCount} ACTIVE</span>
              </div>
              <div className="h-16 w-full bg-surface-container relative overflow-hidden rounded flex items-end">
                <div
                  className="w-full bg-surface-variant transition-all duration-700"
                  style={{ height: `${activeTasks.length > 0 ? Math.round((lowCount / activeTasks.length) * 100) : 0}%` }}
                ></div>
              </div>
              <p className="text-[10px] font-mono text-on-surface-variant">Backlog & deferred tasks</p>
            </div>
          </div>
        </div>

        {/* Footer spacer */}
        <div className="h-24 col-span-12"></div>
      </div>
    </AppLayout>
  );
};

export default HomePage;
