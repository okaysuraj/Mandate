import React, { useState, useEffect } from "react";
import AppLayout from "../components/AppLayout";
import { useParams, useNavigate } from "react-router";
import { getTaskById } from "../services/taskService";
import toast from "react-hot-toast";

const TaskDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const data = await getTaskById(id);
        setTask(data.data || data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load task details");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchTask();
  }, [id]);

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-full font-label-caps text-label-caps text-on-surface-variant">
          LOADING TELEMETRY...
        </div>
      </AppLayout>
    );
  }

  if (!task) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center h-full gap-md">
          <span className="font-label-caps text-label-caps text-error">CRITICAL ERROR: RECORD NOT FOUND</span>
          <button onClick={() => navigate(-1)} className="px-lg py-sm border border-outline text-primary font-label-caps rounded-full hover:bg-surface-container-low transition-colors">
            RETURN TO DIRECTIVES
          </button>
        </div>
      </AppLayout>
    );
  }

  const progress = task.status === 'completed' ? 100 : task.status === 'in-progress' ? 84.2 : 12.5;

  return (
    <AppLayout>
      <div className="flex-1 flex flex-col gap-lg pb-xl w-full">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-md">
          <div>
            <div className="flex items-center gap-sm mb-xs">
              <span className={`font-label-caps text-label-caps px-sm py-xs rounded-sm ${
                task.status === 'completed' ? 'bg-primary-container text-on-primary-container' : 'bg-primary text-on-primary'
              }`}>
                {task.status === 'completed' ? 'COMPLETED' : 'ACTIVE'}
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                Initiated: {new Date(task.createdAt || Date.now()).toLocaleDateString('en-GB', { month: 'short', day: '2-digit', year: 'numeric' })} | 08:42 UTC
              </span>
            </div>
            <h2 className="font-display-lg text-display-lg text-primary uppercase">MND-{String(task._id || task.id || "0000").slice(-4).toUpperCase()}</h2>
            <p className="font-headline-lg text-headline-lg text-on-surface-variant max-w-2xl">{task.title}</p>
            {task.description && <p className="font-body-md text-on-surface-variant mt-sm max-w-3xl">{task.description}</p>}
          </div>
          <div className="flex gap-sm">
            <button className="px-md py-sm border border-outline text-primary rounded-full font-label-sm flex items-center gap-sm hover:bg-surface-container-low transition-all">
              <span className="material-symbols-outlined text-[18px]">share</span>
              Export Manifest
            </button>
            <button 
              onClick={() => navigate(`/focus/${task._id}`)}
              className="px-md py-sm bg-primary text-on-primary rounded-full font-label-sm flex items-center gap-sm hover:opacity-90 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">bolt</span>
              Execute Override
            </button>
          </div>
        </div>

        {/* Bento Grid - Telemetry & Status */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {/* Main Status Visualizer */}
          <div className="md:col-span-8 bg-surface border border-outline-variant p-lg flex flex-col justify-between relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-xl">
                <div>
                  <p className="font-label-caps text-label-caps text-on-surface-variant mb-xs">Operational Progress</p>
                  <span className="text-[48px] font-bold leading-tight">{progress.toFixed(1)}%</span>
                </div>
                <div className="text-right">
                  <p className="font-label-caps text-label-caps text-on-surface-variant mb-xs">Priority Index</p>
                  <span className="font-label-sm text-label-sm bg-surface-container-high px-sm py-1 rounded uppercase">{task.priority || "MEDIUM"}</span>
                </div>
              </div>
              
              {/* Mini Charts Simulation */}
              <div className="flex items-end gap-1 h-32 w-full mb-md">
                <div className="bg-primary-container w-full h-[60%] opacity-20"></div>
                <div className="bg-primary w-full h-[70%]"></div>
                <div className="bg-primary w-full h-[45%]"></div>
                <div className="bg-primary-container w-full h-[90%] opacity-20"></div>
                <div className="bg-primary w-full h-[85%]"></div>
                <div className="bg-primary w-full h-[30%]"></div>
                <div className="bg-primary w-full h-[65%]"></div>
                <div className="bg-primary-container w-full h-[40%] opacity-20"></div>
                <div className="bg-primary w-full h-[75%]"></div>
                <div className="bg-primary w-full h-[55%]"></div>
                <div className="bg-primary w-full h-[95%]"></div>
                <div className="bg-primary-container w-full h-[10%] opacity-20"></div>
              </div>
              
              <div className="flex justify-between font-label-sm text-on-surface-variant text-[10px] uppercase tracking-wider">
                <span>00:00</span>
                <span>Phase 02: Thermal Mapping</span>
                <span>Current</span>
              </div>
            </div>
            {/* Subtle Background Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
          </div>

          {/* Environmental Telemetry */}
          <div className="md:col-span-4 grid grid-cols-1 gap-gutter">
            <div className="bg-surface border border-outline-variant p-lg flex flex-col justify-between">
              <div className="flex justify-between items-center mb-md">
                <span className="font-label-caps text-label-caps text-on-surface-variant">Core Temp</span>
                <span className="material-symbols-outlined text-tertiary">thermostat</span>
              </div>
              <div>
                <span className="text-headline-lg font-bold">42.8°C</span>
                <p className="text-label-sm text-on-tertiary-container mt-xs flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">trending_up</span>
                  +0.4% Nominal
                </p>
              </div>
            </div>
            
            <div className="bg-surface border border-outline-variant p-lg flex flex-col justify-between">
              <div className="flex justify-between items-center mb-md">
                <span className="font-label-caps text-label-caps text-on-surface-variant">Pressure Differential</span>
                <span className="material-symbols-outlined text-primary">compress</span>
              </div>
              <div>
                <span className="text-headline-lg font-bold">1,014 hPa</span>
                <p className="text-label-sm text-on-surface-variant mt-xs">Stable Environment</p>
              </div>
            </div>
          </div>

          {/* Active Operators */}
          <div className="md:col-span-4 bg-surface border border-outline-variant p-lg">
            <h3 className="font-label-caps text-label-caps text-primary mb-lg">Active Operators (3)</h3>
            <div className="space-y-md">
              <div className="flex items-center gap-md p-sm hover:bg-surface-container-low transition-all cursor-pointer border border-transparent hover:border-outline-variant">
                <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center font-bold text-sm">VK</div>
                <div className="flex-1">
                  <p className="font-label-sm text-label-sm font-bold">V. Kholodov</p>
                  <p className="text-[10px] text-on-surface-variant uppercase">Remote Pilot • Node 04</p>
                </div>
                <div className="w-2 h-2 rounded-full bg-tertiary-fixed-dim shadow-[0_0_8px_#3ce36a]"></div>
              </div>
              <div className="flex items-center gap-md p-sm hover:bg-surface-container-low transition-all cursor-pointer border border-transparent hover:border-outline-variant">
                <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center font-bold text-sm">AC</div>
                <div className="flex-1">
                  <p className="font-label-sm text-label-sm font-bold">A. Chen</p>
                  <p className="text-[10px] text-on-surface-variant uppercase">Data Architect • Node 12</p>
                </div>
                <div className="w-2 h-2 rounded-full bg-tertiary-fixed-dim shadow-[0_0_8px_#3ce36a]"></div>
              </div>
              <div className="flex items-center gap-md p-sm hover:bg-surface-container-low transition-all cursor-pointer border border-transparent hover:border-outline-variant">
                <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center font-bold text-sm">MJ</div>
                <div className="flex-1">
                  <p className="font-label-sm text-label-sm font-bold">M. Jenson</p>
                  <p className="text-[10px] text-on-surface-variant uppercase">Site Field Tech • Area G</p>
                </div>
                <div className="w-2 h-2 rounded-full bg-surface-dim"></div>
              </div>
            </div>
          </div>

          {/* Operational Log */}
          <div className="md:col-span-8 bg-surface border border-outline-variant p-lg">
            <div className="flex justify-between items-center mb-lg">
              <h3 className="font-label-caps text-label-caps text-primary">Operational Log</h3>
              <div className="flex gap-sm">
                <button className="material-symbols-outlined text-on-surface-variant text-sm border border-outline-variant p-xs">filter_list</button>
                <button className="material-symbols-outlined text-on-surface-variant text-sm border border-outline-variant p-xs">search</button>
              </div>
            </div>
            
            <div className="space-y-0 max-h-[320px] overflow-y-auto custom-scrollbar pr-sm">
              <div className="grid grid-cols-12 gap-md py-sm border-b border-surface-container-high items-center">
                <span className="col-span-2 font-label-sm text-on-surface-variant">09:14:02</span>
                <span className="col-span-2 font-label-caps text-[10px] text-tertiary">SYSTEM</span>
                <p className="col-span-8 font-label-sm text-on-surface">Thermal sensor calibration sequence initiated successfully.</p>
              </div>
              <div className="grid grid-cols-12 gap-md py-sm border-b border-surface-container-high items-center bg-surface-container-lowest">
                <span className="col-span-2 font-label-sm text-on-surface-variant">09:12:45</span>
                <span className="col-span-2 font-label-caps text-[10px] text-primary">CHEN</span>
                <p className="col-span-8 font-label-sm text-on-surface">Manual override of Zone B relay accepted. Latency within specs (14ms).</p>
              </div>
              <div className="grid grid-cols-12 gap-md py-sm border-b border-surface-container-high items-center">
                <span className="col-span-2 font-label-sm text-on-surface-variant">09:10:11</span>
                <span className="col-span-2 font-label-caps text-[10px] text-error">ALARM</span>
                <p className="col-span-8 font-label-sm text-on-surface">Minor oscillation detected in Cooling Unit 03. Auto-balancing active.</p>
              </div>
              <div className="grid grid-cols-12 gap-md py-sm border-b border-surface-container-high items-center">
                <span class="col-span-2 font-label-sm text-on-surface-variant">09:05:33</span>
                <span class="col-span-2 font-label-caps text-[10px] text-tertiary">SYSTEM</span>
                <p class="col-span-8 font-label-sm text-on-surface">Asset verification for inventory batch #902-X complete. No discrepancies.</p>
              </div>
              <div className="grid grid-cols-12 gap-md py-sm border-b border-surface-container-high items-center">
                <span className="col-span-2 font-label-sm text-on-surface-variant">08:58:20</span>
                <span className="col-span-2 font-label-caps text-[10px] text-primary">KHOLODOV</span>
                <p className="col-span-8 font-label-sm text-on-surface">Node 04 link stabilized. Remote pilot authorization granted.</p>
              </div>
            </div>
            
            <div className="mt-md flex justify-center">
              <button className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-all">View Full Operational History</button>
            </div>
          </div>
        </div>

        {/* Visual Context Map/Diagram Placeholder */}
        <div className="bg-surface border border-outline-variant h-[400px] relative overflow-hidden group">
          <div className="absolute top-lg left-lg z-10 p-md bg-surface/80 backdrop-blur-md border border-outline-variant max-w-xs">
            <p className="font-label-caps text-label-caps mb-xs">Spatial Context</p>
            <p className="font-label-sm text-label-sm text-on-surface-variant">Real-time overlay of Mandate MND-{String(task._id || task.id || "0000").slice(-4).toUpperCase()} across Facility West. Hover for node details.</p>
          </div>
          <div className="w-full h-full bg-surface-container-low flex items-center justify-center">
            <div className="w-full h-full bg-cover bg-center grayscale opacity-60 mix-blend-multiply group-hover:scale-105 transition-transform duration-1000" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')" }}></div>
          </div>
          {/* Interactive Markers simulated */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/3 left-1/2 w-4 h-4 bg-tertiary rounded-full animate-ping opacity-50"></div>
            <div className="absolute top-1/3 left-1/2 w-2 h-2 bg-tertiary rounded-full"></div>
            <div className="absolute top-2/3 left-1/4 w-2 h-2 bg-primary rounded-full"></div>
            <div className="absolute top-1/4 left-3/4 w-2 h-2 bg-primary rounded-full"></div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default TaskDetailPage;
