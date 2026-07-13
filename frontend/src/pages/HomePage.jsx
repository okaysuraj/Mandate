import React, { useState, useEffect } from "react";
import AppLayout from "../components/AppLayout";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useSocket } from "../context/SocketContext";
import { Link, useNavigate } from "react-router";

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { socket } = useSocket();
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/tasks", { params: { limit: 100 } });
      setTasks(data.data || []);
      
      // const burnoutRes = await axios.get("/api/ai/burnout");
      // setBurnoutData(burnoutRes.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchTasks();
  }, [user]);

  useEffect(() => {
    if (!socket) return;
    socket.on("task:created", fetchTasks);
    socket.on("task:updated", fetchTasks);
    socket.on("task:deleted", fetchTasks);
    return () => {
      socket.off("task:created", fetchTasks);
      socket.off("task:updated", fetchTasks);
      socket.off("task:deleted", fetchTasks);
    };
  }, [socket]);

  // Compute metrics from tasks
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === "completed").length;
  const efficiency = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100 * 10) / 10 : 0;
  const activeTasks = tasks.filter(t => t.status !== "completed");
  
  // Recent activity from tasks (sorted by updatedAt)
  const recentActivity = [...tasks]
    .sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt))
    .slice(0, 5);

  const formatTime = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <AppLayout>
      {/* Section Header */}
      <div className="flex justify-between items-end mb-lg">
        <div>
          <h1 className="font-display-lg text-display-lg text-primary">Command Center</h1>
          <p className="text-on-surface-variant font-label-caps uppercase tracking-widest mt-sm">System Status: Operational // Nexus Prime</p>
        </div>
        <div className="flex gap-sm">
          <div className="bg-surface-container px-md py-sm rounded-full flex items-center gap-sm">
            <div className="w-2 h-2 rounded-full bg-tertiary-fixed-dim animate-pulse"></div>
            <span className="font-label-caps text-on-tertiary-container">LIVE CONNECTED</span>
          </div>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="bento-grid">
        {/* Metrics Row */}
        <div className="col-span-12 md:col-span-4 bento-module group hover:border-primary transition-colors">
          <div className="flex justify-between items-start mb-lg">
            <span className="font-label-caps text-on-surface-variant">Efficiency</span>
            <span className="material-symbols-outlined text-outline">query_stats</span>
          </div>
          <div className="flex items-baseline gap-sm">
            <span className="font-display-lg text-headline-lg font-black">{loading ? "—" : efficiency}<span className="text-headline-lg-mobile font-medium">%</span></span>
          </div>
          <div className="mt-md w-full bg-surface-container h-1 rounded-full overflow-hidden">
            <div className="bg-primary h-full transition-all duration-1000" style={{ width: `${loading ? 0 : efficiency}%` }}></div>
          </div>
          <p className="mt-md text-[11px] font-label-sm text-on-tertiary-container">+2.1% from previous cycle</p>
        </div>

        <div className="col-span-12 md:col-span-4 bento-module group hover:border-primary transition-colors">
          <div className="flex justify-between items-start mb-lg">
            <span className="font-label-caps text-on-surface-variant">Nodes Active</span>
            <span className="material-symbols-outlined text-outline">hub</span>
          </div>
          <div className="flex items-baseline gap-sm">
            <span className="font-display-lg text-headline-lg font-black">{loading ? "—" : totalTasks}</span>
          </div>
          <div className="flex gap-xs mt-md">
            <div className="h-2 w-full bg-primary"></div>
            <div className="h-2 w-full bg-primary"></div>
            <div className="h-2 w-full bg-primary"></div>
            <div className="h-2 w-full bg-surface-variant"></div>
          </div>
          <p className="mt-md text-[11px] font-label-sm text-on-surface-variant">Cluster capacity at 75%</p>
        </div>

        <div className="col-span-12 md:col-span-4 bento-module group hover:border-primary transition-colors">
          <div className="flex justify-between items-start mb-lg">
            <span className="font-label-caps text-on-surface-variant">Throughput</span>
            <span className="material-symbols-outlined text-outline">speed</span>
          </div>
          <div className="flex items-baseline gap-sm">
            <span className="font-display-lg text-headline-lg font-black">4.2<span className="text-headline-lg-mobile font-medium">TB/s</span></span>
          </div>
          <div className="flex items-end gap-1 h-8 mt-md">
            <div className="bg-primary-container w-1 h-[20%]"></div>
            <div className="bg-primary-container w-1 h-[40%]"></div>
            <div className="bg-primary-container w-1 h-[35%]"></div>
            <div className="bg-primary-container w-1 h-[60%]"></div>
            <div className="bg-primary-container w-1 h-[80%]"></div>
            <div className="bg-primary w-1 h-[95%]"></div>
            <div className="bg-primary w-1 h-[90%]"></div>
          </div>
          <p className="mt-md text-[11px] font-label-sm text-on-surface-variant">Stable peer-to-peer sync</p>
        </div>

        {/* System Pulse Visualization */}
        <div className="col-span-12 md:col-span-8 bento-module h-[400px] relative overflow-hidden flex flex-col">
          <div className="flex justify-between items-center mb-lg relative z-10">
            <h3 className="font-label-caps text-primary font-bold">System Pulse</h3>
            <div className="flex gap-md">
              <span className="text-[10px] font-label-caps text-on-surface-variant">Uptime: 2,401:12:09</span>
              <span className="text-[10px] font-label-caps text-primary">LIVE DATA STREAM</span>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col md:flex-row gap-gutter">
            {/* Visualizer Placeholder */}
            <div className="flex-1 bg-surface-container-low rounded-lg relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 border border-outline-variant rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite]">
                    <div className="w-24 h-24 border-2 border-primary border-t-transparent rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Logs */}
            <div className="w-full md:w-64 flex flex-col gap-sm overflow-y-auto pr-sm">
              {recentActivity.map((task) => (
                <div key={task._id} className={`p-sm text-[10px] font-label-sm border-l-2 transition-all ${
                  task.priority === 'urgent' ? 'bg-error-container/20 border-on-error-container' :
                  task.status === 'completed' ? 'bg-tertiary-container/10 border-on-tertiary-container' :
                  'bg-surface-container-lowest border-outline-variant'
                }`}>
                  <p className="text-on-surface font-bold">[{formatTime(task.updatedAt || task.createdAt)}] TASK_{task.status === 'completed' ? 'DONE' : 'UP'}</p>
                  <p className="text-on-surface-variant truncate">{task.title}</p>
                </div>
              ))}
              {recentActivity.length === 0 && !loading && (
                <div className="p-sm bg-surface-container-lowest text-[10px] font-label-sm border-l-2 border-outline-variant">
                  <p className="text-on-surface font-bold">[{formatTime(new Date())}] SYS_IDLE</p>
                  <p className="text-on-surface-variant">Awaiting incoming directives</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Pinned Mandates */}
        <div className="col-span-12 md:col-span-4 bento-module flex flex-col">
          <div className="flex justify-between items-center mb-lg">
            <h3 className="font-label-caps text-primary font-bold">Pinned Mandates</h3>
            <Link to="/today" className="text-[10px] font-label-caps text-outline hover:text-primary transition-colors">VIEW ALL</Link>
          </div>
          
          <div className="flex flex-col gap-md flex-1 overflow-y-auto pr-sm pb-md">
            {activeTasks.slice(0, 3).map(task => (
              <div 
                key={task._id} 
                onClick={() => navigate(`/focus/${task._id}`)}
                className="p-md border border-surface-variant hover:border-primary transition-all cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-sm">
                  <span className={`px-sm py-1 text-[9px] font-label-caps ${
                    task.priority === 'urgent' || task.priority === 'high' 
                      ? 'bg-primary text-on-primary' 
                      : 'bg-surface-container text-on-surface-variant'
                  }`}>
                    PRIORITY {task.priority === 'urgent' ? 'S' : task.priority === 'high' ? 'A' : task.priority === 'medium' ? 'B' : 'C'}
                  </span>
                  <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors text-[18px]">push_pin</span>
                </div>
                <h4 className="font-body-md font-bold mb-xs truncate">{task.title}</h4>
                <p className="text-on-surface-variant text-xs mb-md truncate">{task.description || "No description provided."}</p>
                <div className="flex justify-between items-center">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full border-2 border-white bg-surface-variant"></div>
                    <div className="w-6 h-6 rounded-full border-2 border-white bg-primary-container"></div>
                  </div>
                  <span className="text-[10px] font-label-sm text-outline">
                    {task.dueDate ? `Due: ${new Date(task.dueDate).toLocaleDateString()}` : 'No due date'}
                  </span>
                </div>
              </div>
            ))}
            
            {activeTasks.length === 0 && !loading && (
              <div className="p-md border border-surface-variant border-dashed text-center opacity-50">
                <p className="font-label-caps text-[10px]">NO ACTIVE MANDATES</p>
              </div>
            )}
          </div>
          
          <Link to="/today" className="mt-auto w-full py-md border-t border-surface-variant text-center text-[11px] font-label-caps text-on-surface-variant hover:text-primary transition-colors inline-block block">
            + ADD NEW MANDATE
          </Link>
        </div>

        {/* Infrastructure Health (Wide) */}
        <div className="col-span-12 bento-module">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-md mb-xl">
            <div>
              <h3 className="font-label-caps text-primary font-bold">Infrastructure Health</h3>
              <p className="text-xs text-on-surface-variant">Global distributed network analysis</p>
            </div>
            <div className="flex gap-gutter">
              <div className="text-center">
                <p className="text-[10px] font-label-caps text-on-surface-variant">LATENCY</p>
                <p className="font-bold text-headline-lg-mobile">12ms</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-label-caps text-on-surface-variant">ERRORS</p>
                <p className="font-bold text-headline-lg-mobile">0.003%</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-label-caps text-on-surface-variant">BANDWIDTH</p>
                <p className="font-bold text-headline-lg-mobile">92%</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
            <div className="space-y-md">
              <div className="flex justify-between items-center text-[11px] font-label-caps">
                <span>EU-WEST-1</span>
                <span className="text-on-tertiary-container">ACTIVE</span>
              </div>
              <div className="h-24 w-full bg-surface-container-low relative overflow-hidden rounded">
                <div className="absolute bottom-0 left-0 w-full bg-primary h-[85%] opacity-10"></div>
                <div className="absolute inset-0 flex items-end">
                  <div className="flex w-full h-full items-end gap-px">
                    <div className="flex-1 bg-primary opacity-20 h-[60%]"></div>
                    <div className="flex-1 bg-primary opacity-30 h-[70%]"></div>
                    <div className="flex-1 bg-primary opacity-40 h-[65%]"></div>
                    <div className="flex-1 bg-primary opacity-50 h-[80%]"></div>
                    <div className="flex-1 bg-primary opacity-60 h-[85%]"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-md">
              <div className="flex justify-between items-center text-[11px] font-label-caps">
                <span>US-EAST-2</span>
                <span className="text-on-tertiary-container">ACTIVE</span>
              </div>
              <div className="h-24 w-full bg-surface-container-low relative overflow-hidden rounded">
                <div className="absolute bottom-0 left-0 w-full bg-primary h-[70%] opacity-10"></div>
                <div className="absolute inset-0 flex items-end">
                  <div className="flex w-full h-full items-end gap-px">
                    <div className="flex-1 bg-primary opacity-20 h-[40%]"></div>
                    <div className="flex-1 bg-primary opacity-30 h-[50%]"></div>
                    <div className="flex-1 bg-primary opacity-40 h-[45%]"></div>
                    <div className="flex-1 bg-primary opacity-50 h-[60%]"></div>
                    <div className="flex-1 bg-primary opacity-60 h-[70%]"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-md">
              <div className="flex justify-between items-center text-[11px] font-label-caps">
                <span>ASIA-SOUTH-1</span>
                <span className="text-on-tertiary-container">ACTIVE</span>
              </div>
              <div className="h-24 w-full bg-surface-container-low relative overflow-hidden rounded">
                <div className="absolute bottom-0 left-0 w-full bg-primary h-[92%] opacity-10"></div>
                <div className="absolute inset-0 flex items-end">
                  <div className="flex w-full h-full items-end gap-px">
                    <div className="flex-1 bg-primary opacity-20 h-[80%]"></div>
                    <div className="flex-1 bg-primary opacity-30 h-[85%]"></div>
                    <div className="flex-1 bg-primary opacity-40 h-[90%]"></div>
                    <div className="flex-1 bg-primary opacity-50 h-[88%]"></div>
                    <div className="flex-1 bg-primary opacity-60 h-[92%]"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-md">
              <div className="flex justify-between items-center text-[11px] font-label-caps">
                <span>AU-EAST-1</span>
                <span className="text-on-error-container">DEGRADED</span>
              </div>
              <div className="h-24 w-full bg-error-container relative overflow-hidden rounded">
                <div className="absolute bottom-0 left-0 w-full bg-error h-[40%] opacity-10"></div>
                <div className="absolute inset-0 flex items-end">
                  <div className="flex w-full h-full items-end gap-px">
                    <div className="flex-1 bg-error opacity-20 h-[30%]"></div>
                    <div className="flex-1 bg-error opacity-30 h-[25%]"></div>
                    <div className="flex-1 bg-error opacity-40 h-[10%]"></div>
                    <div className="flex-1 bg-error opacity-50 h-[35%]"></div>
                    <div className="flex-1 bg-error opacity-60 h-[40%]"></div>
                  </div>
                </div>
              </div>
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
