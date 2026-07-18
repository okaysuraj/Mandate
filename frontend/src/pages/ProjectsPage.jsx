import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import AppLayout from "../components/AppLayout";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const ProjectsPage = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("active");
  const { user } = useAuth();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get("/api/projects", { params: { workspaceId: user?.activeWorkspace } });
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
        return { label: "COMPLETED", class: "bg-primary-container text-on-primary-container", dot: "bg-on-primary-container" };
      case "active": 
        return { label: "ACTIVE", class: "bg-tertiary-container text-on-tertiary-container", dot: "bg-on-tertiary-container" };
      case "archived": 
        return { label: "ARCHIVED", class: "bg-surface-container-high text-on-secondary-container", dot: "bg-on-secondary-container" };
      default: 
        return { label: "STALLED", class: "bg-surface-container-high text-on-secondary-container", dot: "bg-on-secondary-container" };
    }
  };

  const getProgress = (project) => {
    if (project.status === "completed") return 100;
    if (project.status === "archived") return 70;
    return 32;
  };

  const filteredProjects = projects.filter(project => {
    if (filter === "active") return project.status !== "completed" && project.status !== "archived";
    if (filter === "archived") return project.status === "completed" || project.status === "archived";
    return true;
  });

  return (
    <AppLayout>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-md mb-xl">
        <div>
          <span className="font-label-caps text-label-caps text-on-surface-variant opacity-50 block mb-xs">REGISTRY OVERVIEW</span>
          <h2 className="font-headline-lg text-headline-lg">Industrial Projects</h2>
        </div>
        <div className="flex gap-sm">
          <div className="flex bg-surface-container-low rounded-full p-1 border border-outline-variant">
            <button 
              onClick={() => setFilter("active")}
              className={`px-md py-1.5 rounded-full text-label-sm font-label-sm transition-colors ${filter === "active" ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container-high"}`}
            >
              Active ({activeCount})
            </button>
            <button 
              onClick={() => setFilter("archived")}
              className={`px-md py-1.5 rounded-full text-label-sm font-label-sm transition-colors ${filter === "archived" ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container-high"}`}
            >
              Archived ({completedCount})
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard Modules (Bento style summaries) */}
      <div className="bento-grid mb-xl">
        <div className="col-span-12 md:col-span-4 bg-surface border border-outline-variant p-lg flex flex-col justify-between">
          <div>
            <p className="font-label-caps text-label-caps text-on-surface-variant mb-md">SYSTEM HEALTH</p>
            <h3 className="font-display-lg text-display-lg">{systemHealth}<span className="text-headline-lg opacity-40">%</span></h3>
          </div>
          <div className="mt-lg flex items-center gap-2">
            <div className="h-1 flex-1 bg-surface-container-highest rounded-full overflow-hidden">
              <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${systemHealth}%` }}></div>
            </div>
            <span className="text-xs font-label-sm text-on-tertiary-container">+0.2%</span>
          </div>
        </div>
        <div className="col-span-12 md:col-span-4 bg-surface border border-outline-variant p-lg flex flex-col justify-between">
          <div>
            <p className="font-label-caps text-label-caps text-on-surface-variant mb-md">ACTIVE OPERATORS</p>
            <h3 className="font-display-lg text-display-lg">142</h3>
          </div>
          <p className="text-on-surface-variant font-body-md text-sm mt-lg">Across 18 regional hubs</p>
        </div>
        <div className="col-span-12 md:col-span-4 bg-surface border border-outline-variant p-lg flex flex-col justify-between">
          <div>
            <p className="font-label-caps text-label-caps text-on-surface-variant mb-md">CRITICAL BLOCKS</p>
            <h3 className="font-display-lg text-display-lg">{String(criticalCount).padStart(2, '0')}</h3>
          </div>
          <div className="mt-lg flex gap-2">
            {criticalCount > 0 ? (
              <span className="px-2 py-0.5 bg-error-container text-on-error-container text-[10px] font-label-caps rounded-sm">REQUIRES ATTENTION</span>
            ) : (
              <span className="px-2 py-0.5 bg-tertiary-container text-on-tertiary-container text-[10px] font-label-caps rounded-sm">NOMINAL</span>
            )}
          </div>
        </div>
      </div>

      {/* Filters & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-md mb-md border-b border-outline-variant pb-md">
        <div className="flex gap-md">
          <div className="flex items-center gap-2">
            <span className="text-label-sm font-label-sm text-on-surface-variant">Criticality:</span>
            <select className="bg-transparent border-none font-bold text-label-sm focus:ring-0 cursor-pointer outline-none">
              <option>All Levels</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-label-sm font-label-sm text-on-surface-variant">Sector:</span>
            <select className="bg-transparent border-none font-bold text-label-sm focus:ring-0 cursor-pointer outline-none">
              <option>All Sectors</option>
              <option>Energy</option>
              <option>Manufacturing</option>
              <option>Logistics</option>
            </select>
          </div>
        </div>
        <div className="flex gap-sm">
          <button className="flex items-center gap-2 px-md py-2 border border-outline-variant rounded-full text-label-sm font-label-sm hover:bg-surface-container-high transition-colors">
            <span className="material-symbols-outlined text-[18px]">filter_list</span> Filter
          </button>
          <button className="flex items-center gap-2 px-md py-2 border border-outline-variant rounded-full text-label-sm font-label-sm hover:bg-surface-container-high transition-colors">
            <span className="material-symbols-outlined text-[18px]">sort</span> Sort
          </button>
        </div>
      </div>

      {/* High-Density Table */}
      <div className="bg-surface-container-lowest border border-outline-variant overflow-hidden mb-xl">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container border-b border-outline-variant">
                <th className="p-md font-label-caps text-label-caps text-on-surface-variant w-32">PROJECT ID</th>
                <th className="p-md font-label-caps text-label-caps text-on-surface-variant">NAME</th>
                <th className="p-md font-label-caps text-label-caps text-on-surface-variant">STATUS</th>
                <th className="p-md font-label-caps text-label-caps text-on-surface-variant">HEALTH INDEX</th>
                <th className="p-md font-label-caps text-label-caps text-on-surface-variant text-center">PRIORITY</th>
                <th className="p-md font-label-caps text-label-caps text-on-surface-variant">DUE DATE</th>
                <th className="p-md font-label-caps text-label-caps text-on-surface-variant w-16"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {loading ? (
                <tr>
                  <td colSpan={7} className="p-md text-center text-label-sm font-label-sm text-on-surface-variant">LOADING REGISTRY...</td>
                </tr>
              ) : filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-md text-center text-label-sm font-label-sm text-on-surface-variant">NO PROJECTS MATCHING CRITERIA</td>
                </tr>
              ) : (
                filteredProjects.map((project, i) => {
                  const status = getStatusChip(project.status);
                  const progress = getProgress(project);
                  return (
                    <tr 
                      key={project._id} 
                      onClick={() => navigate(`/projects/${project._id}`)}
                      className="hover:bg-surface-container-low transition-colors group cursor-pointer"
                    >
                      <td className="p-md font-label-sm text-label-sm text-on-surface-variant">#PRJ-{String(2400 + i).padStart(4, '0')}</td>
                      <td className="p-md font-bold text-body-md truncate max-w-xs">{project.name || project.title || "Untitled Project"}</td>
                      <td className="p-md">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-label-caps ${status.class}`}>
                          <span className={`w-1 h-1 rounded-full ${status.dot}`}></span> {status.label}
                        </span>
                      </td>
                      <td className="p-md">
                        <div className="flex items-center gap-2">
                          <span className="font-label-sm text-label-sm font-bold">{progress}%</span>
                          <div className="w-24 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                            <div className={`h-full w-[${progress}%] ${progress < 50 ? 'bg-error' : 'bg-primary'}`} style={{ width: `${progress}%` }}></div>
                          </div>
                        </div>
                      </td>
                      <td className="p-md text-center font-label-sm text-label-sm uppercase">{project.priority || "MEDIUM"}</td>
                      <td className="p-md font-label-sm text-label-sm uppercase">
                        {project.dueDate ? new Date(project.dueDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : "UNSCHEDULED"}
                      </td>
                      <td className="p-md">
                        <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="material-symbols-outlined text-on-surface-variant hover:text-primary">more_vert</span>
                        </button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-md border-t border-outline-variant flex items-center justify-between bg-surface-container-low">
          <p className="text-label-sm font-label-sm text-on-surface-variant">Showing {filteredProjects.length > 0 ? 1 : 0}-{Math.min(12, filteredProjects.length)} of {filteredProjects.length} projects</p>
          <div className="flex gap-unit">
            <button className="w-8 h-8 flex items-center justify-center rounded-sm border border-outline-variant hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-sm border border-primary bg-primary text-on-primary text-xs font-bold">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-sm border border-outline-variant hover:bg-surface-container-high transition-colors text-xs font-bold">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-sm border border-outline-variant hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Contextual Insight (Bento Bottom) */}
      <div className="mt-xl grid grid-cols-1 md:grid-cols-2 gap-xl mb-xl">
        <div className="bg-surface border border-outline-variant p-lg">
          <h4 className="font-label-caps text-label-caps mb-lg border-b border-outline-variant pb-2">CRITICAL TIMELINE</h4>
          <div className="space-y-md mt-lg">
            {projects.filter(project => project.priority === "urgent" || project.priority === "high").slice(0, 2).map((project) => (
              <div key={project._id} className="flex items-start gap-md">
                <div className={`w-2 h-2 rounded-full mt-2 ${project.priority === "urgent" ? "bg-error" : "bg-primary"}`}></div>
                <div>
                  <p className="text-sm font-bold">{task.title}</p>
                  <p className="text-xs text-on-surface-variant truncate w-64">{task.description || "No description provided."}</p>
                </div>
              </div>
            ))}
            {tasks.filter(t => t.priority === "urgent" || t.priority === "high").length === 0 && (
              <p className="text-xs text-on-surface-variant">No critical timeline items found.</p>
            )}
          </div>
        </div>
        <div className="bg-surface border border-outline-variant p-lg flex flex-col justify-between">
          <div>
            <h4 className="font-label-caps text-label-caps mb-lg border-b border-outline-variant pb-2">SECTOR ALLOCATION</h4>
            <div className="flex items-center gap-lg mt-md">
              <div className="w-24 h-24 rounded-full border-8 border-primary border-r-transparent rotate-45"></div>
              <div className="space-y-unit">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary"></div>
                  <span className="text-xs font-label-sm">Energy (62%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-outline-variant"></div>
                  <span className="text-xs font-label-sm">Manuf. (28%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-surface-container-high"></div>
                  <span className="text-xs font-label-sm">Logistics (10%)</span>
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
