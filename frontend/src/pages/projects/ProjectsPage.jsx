import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import AppLayout from "../../components/layout/AppLayout";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { getProjects } from "../../services/projectService";

const ProjectsPage = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("active");
  const { user } = useAuth();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects({ workspaceId: user?.activeWorkspace });
        setProjects(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchProjects();
  }, [user]);

  const activeCount = projects.filter(project => project.status !== "completed" && project.status !== "archived").length;
  const completedCount = projects.filter(project => project.status === "completed").length;
  const systemHealth = projects.length > 0 ? ((completedCount / projects.length) * 100).toFixed(1) : "0.0";
  const criticalCount = projects.filter(project => project.status === "active" && (project.priority === "urgent" || project.priority === "high")).length;

  const getStatusChip = (status) => {
    switch (status) {
      case "completed": 
        return { label: "COMPLETED", class: "bg-surface-container-highest text-on-surface-variant border border-outline-variant", dot: "bg-tertiary" };
      case "active": 
        return { label: "ACTIVE", class: "bg-tertiary-container text-on-tertiary-container border border-outline-variant", dot: "bg-tertiary" };
      case "archived": 
        return { label: "ARCHIVED", class: "bg-surface-container-high text-on-surface-variant border border-outline-variant", dot: "bg-outline" };
      default: 
        return { label: "STALLED", class: "bg-surface-container-high text-on-surface-variant border border-outline-variant", dot: "bg-outline" };
    }
  };

  const getProgress = (project) => {
    if (project.status === "completed") return 100;
    if (typeof project.progress === "number") return project.progress;
    if (project.taskCount > 0) {
      return Math.round(((project.completedTaskCount || 0) / project.taskCount) * 100);
    }
    if (project.status === "archived") return 100;
    return 0;
  };

  const filteredProjects = projects.filter(project => {
    if (filter === "active") return project.status !== "completed" && project.status !== "archived";
    if (filter === "archived") return project.status === "completed" || project.status === "archived";
    return true;
  });

  return (
    <AppLayout>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-4 border-b border-outline-variant">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>
            <span className="font-mono text-xs uppercase font-bold text-on-surface-variant tracking-widest block">
              REGISTRY OVERVIEW · PORTFOLIO MATRIX
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-on-surface uppercase tracking-tight">Industrial Projects</h1>
        </div>
        <div className="flex gap-2">
          <div className="flex bg-surface-container-low rounded-xl p-1 border border-outline-variant">
            <button 
              onClick={() => setFilter("active")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                filter === "active" ? "bg-primary text-on-primary shadow-sm" : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              Active ({activeCount})
            </button>
            <button 
              onClick={() => setFilter("archived")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                filter === "archived" ? "bg-primary text-on-primary shadow-sm" : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              Archived ({completedCount})
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard Modules (Bento style summaries) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-surface-container-lowest border border-outline-variant p-5 sm:p-6 rounded-xl shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <p className="font-mono text-[10px] uppercase font-bold text-on-surface-variant mb-1">SYSTEM HEALTH</p>
            <h3 className="text-3xl font-black text-on-surface font-mono">{systemHealth}<span className="text-lg opacity-40">%</span></h3>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 flex-1 bg-surface-container-high rounded-full overflow-hidden">
              <div className="h-full bg-primary transition-all duration-500 rounded-full" style={{ width: `${systemHealth}%` }}></div>
            </div>
            <span className="text-xs font-mono font-bold text-tertiary">+0.2%</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant p-5 sm:p-6 rounded-xl shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <p className="font-mono text-[10px] uppercase font-bold text-on-surface-variant mb-1">ACTIVE OPERATORS</p>
            <h3 className="text-3xl font-black text-on-surface font-mono">142</h3>
          </div>
          <p className="text-on-surface-variant font-mono text-xs">Across 18 regional hubs</p>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant p-5 sm:p-6 rounded-xl shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <p className="font-mono text-[10px] uppercase font-bold text-on-surface-variant mb-1">CRITICAL BLOCKS</p>
            <h3 className="text-3xl font-black text-on-surface font-mono">{String(criticalCount).padStart(2, '0')}</h3>
          </div>
          <div>
            {criticalCount > 0 ? (
              <span className="px-2.5 py-1 bg-error-container text-error text-[10px] font-mono font-bold rounded-full border border-error">
                REQUIRES ATTENTION
              </span>
            ) : (
              <span className="px-2.5 py-1 bg-tertiary-container text-on-tertiary-container text-[10px] font-mono font-bold rounded-full border border-outline-variant">
                NOMINAL
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Filters & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 border-b border-outline-variant pb-3">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-on-surface-variant font-bold uppercase">Criticality:</span>
            <select className="bg-surface-container-low border border-outline-variant rounded-md text-xs font-bold text-on-surface px-2.5 py-1 focus:outline-none cursor-pointer">
              <option>All Levels</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-on-surface-variant font-bold uppercase">Sector:</span>
            <select className="bg-surface-container-low border border-outline-variant rounded-md text-xs font-bold text-on-surface px-2.5 py-1 focus:outline-none cursor-pointer">
              <option>All Sectors</option>
              <option>Energy</option>
              <option>Manufacturing</option>
              <option>Logistics</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-outline-variant rounded-lg text-xs font-mono font-bold uppercase hover:bg-surface-container text-on-surface transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-[16px]">filter_list</span> Filter
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-outline-variant rounded-lg text-xs font-mono font-bold uppercase hover:bg-surface-container text-on-surface transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-[16px]">sort</span> Sort
          </button>
        </div>
      </div>

      {/* Mobile Card List */}
      <div className="md:hidden space-y-3 mb-8">
        {loading ? (
          <div className="p-8 text-center font-mono text-xs uppercase tracking-wider text-on-surface-variant bg-surface-container-lowest border border-outline-variant rounded-xl">
            LOADING REGISTRY...
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="p-8 text-center font-mono text-xs uppercase tracking-wider text-on-surface-variant bg-surface-container-lowest border border-outline-variant rounded-xl">
            NO PROJECTS MATCHING CRITERIA
          </div>
        ) : (
          filteredProjects.map((project, i) => {
            const status = getStatusChip(project.status);
            const progress = getProgress(project);
            return (
              <div 
                key={project._id || i}
                onClick={() => navigate(`/projects/${project._id}`)}
                className="bg-surface-container-lowest border border-outline-variant p-4 rounded-xl shadow-sm hover:border-primary transition-all cursor-pointer space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] text-on-surface-variant font-bold bg-surface-container px-2 py-0.5 rounded border border-outline-variant">
                    #PRJ-{String(2400 + i).padStart(4, '0')}
                  </span>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${status.class}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`}></span> {status.label}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-on-surface uppercase tracking-tight">
                  {project.name || project.title || "Untitled Project"}
                </h3>
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-mono text-on-surface-variant">
                    <span>Progress</span>
                    <span className="font-bold text-on-surface">{progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                    <div className={`h-full ${progress < 50 ? 'bg-error' : 'bg-primary'} rounded-full`} style={{ width: `${progress}%` }}></div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-outline-variant text-[11px] font-mono text-on-surface-variant">
                  <span>DUE: {project.dueDate ? new Date(project.dueDate).toLocaleDateString('en-GB') : "UNSCHEDULED"}</span>
                  <span className="material-symbols-outlined text-[16px] text-primary">arrow_forward</span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Desktop High-Density Table */}
      <div className="hidden md:block bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden mb-8 shadow-sm">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant">
                <th className="p-4 font-mono text-[10px] uppercase font-bold text-on-surface-variant w-32">PROJECT ID</th>
                <th className="p-4 font-mono text-[10px] uppercase font-bold text-on-surface-variant">NAME</th>
                <th className="p-4 font-mono text-[10px] uppercase font-bold text-on-surface-variant">STATUS</th>
                <th className="p-4 font-mono text-[10px] uppercase font-bold text-on-surface-variant">HEALTH INDEX</th>
                <th className="p-4 font-mono text-[10px] uppercase font-bold text-on-surface-variant text-center">PRIORITY</th>
                <th className="p-4 font-mono text-[10px] uppercase font-bold text-on-surface-variant">DUE DATE</th>
                <th className="p-4 font-mono text-[10px] uppercase font-bold text-on-surface-variant w-16"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {loading ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-xs font-mono uppercase text-on-surface-variant">LOADING REGISTRY...</td>
                </tr>
              ) : filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-xs font-mono uppercase text-on-surface-variant">NO PROJECTS MATCHING CRITERIA</td>
                </tr>
              ) : (
                filteredProjects.map((project, i) => {
                  const status = getStatusChip(project.status);
                  const progress = getProgress(project);
                  return (
                    <tr 
                      key={project._id || i} 
                      onClick={() => navigate(`/projects/${project._id}`)}
                      className="hover:bg-surface-container-low transition-colors group cursor-pointer"
                    >
                      <td className="p-4 font-mono text-xs text-on-surface-variant">#PRJ-{String(2400 + i).padStart(4, '0')}</td>
                      <td className="p-4 font-bold text-sm text-on-surface truncate max-w-xs">{project.name || project.title || "Untitled Project"}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${status.class}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`}></span> {status.label}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-on-surface">{progress}%</span>
                          <div className="w-24 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                            <div className={`h-full ${progress < 50 ? 'bg-error' : 'bg-primary'} rounded-full`} style={{ width: `${progress}%` }}></div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-center font-mono text-xs uppercase text-on-surface">{project.priority || "MEDIUM"}</td>
                      <td className="p-4 font-mono text-xs uppercase text-on-surface-variant">
                        {project.dueDate ? new Date(project.dueDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : "UNSCHEDULED"}
                      </td>
                      <td className="p-4">
                        <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-surface-container">
                          <span className="material-symbols-outlined text-on-surface-variant hover:text-primary text-[18px]">more_vert</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-outline-variant flex items-center justify-between bg-surface-container-lowest">
          <p className="text-xs font-mono text-on-surface-variant">Showing {filteredProjects.length > 0 ? 1 : 0}-{Math.min(12, filteredProjects.length)} of {filteredProjects.length} projects</p>
          <div className="flex gap-1.5">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant hover:bg-surface-container transition-colors text-on-surface cursor-pointer">
              <span className="material-symbols-outlined text-[16px]">chevron_left</span>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-primary bg-primary text-on-primary text-xs font-mono font-bold">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant hover:bg-surface-container transition-colors text-xs font-mono font-bold text-on-surface cursor-pointer">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant hover:bg-surface-container transition-colors text-on-surface cursor-pointer">
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Contextual Insight (Bento Bottom) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8">
        <div className="bg-surface-container-lowest border border-outline-variant p-5 sm:p-6 rounded-xl shadow-sm space-y-4">
          <h4 className="font-mono text-xs font-bold uppercase text-on-surface-variant border-b border-outline-variant pb-2">CRITICAL TIMELINE</h4>
          <div className="space-y-3">
            {projects.filter(project => project.priority === "urgent" || project.priority === "high").slice(0, 3).map((project) => (
              <div key={project._id} className="flex items-start gap-3 p-3 rounded-lg bg-surface-container-low border border-outline-variant">
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${project.priority === "urgent" ? "bg-error" : "bg-primary"}`}></div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-on-surface uppercase truncate">{project.title || project.name}</p>
                  <p className="text-xs text-on-surface-variant truncate">{project.description || "No description provided."}</p>
                </div>
              </div>
            ))}
            {projects.filter(project => project.priority === "urgent" || project.priority === "high").length === 0 && (
              <p className="text-xs font-mono text-on-surface-variant py-2">No critical timeline items found.</p>
            )}
          </div>
        </div>
        
        <div className="bg-surface-container-lowest border border-outline-variant p-5 sm:p-6 rounded-xl shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <h4 className="font-mono text-xs font-bold uppercase text-on-surface-variant border-b border-outline-variant pb-2">SECTOR ALLOCATION</h4>
            <div className="flex flex-col sm:flex-row items-center gap-6 mt-4">
              <div className="w-24 h-24 rounded-full border-8 border-primary border-r-outline-variant border-b-tertiary rotate-45 shrink-0"></div>
              <div className="space-y-2 w-full">
                <div className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                    <span className="text-on-surface">Energy</span>
                  </div>
                  <span className="font-bold text-on-surface">62%</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-outline-variant"></div>
                    <span className="text-on-surface">Manufacturing</span>
                  </div>
                  <span className="font-bold text-on-surface">28%</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-tertiary"></div>
                    <span className="text-on-surface">Logistics</span>
                  </div>
                  <span className="font-bold text-on-surface">10%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ProjectsPage;
