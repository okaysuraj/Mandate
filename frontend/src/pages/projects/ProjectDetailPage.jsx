import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import AppLayout from "../../components/layout/AppLayout";
import axios from "axios";
import toast from "react-hot-toast";

const ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const [projectRes, tasksRes] = await Promise.all([
          axios.get(`/api/projects/${id}`),
          axios.get("/api/tasks", { params: { limit: 6 } }),
        ]);
        setProject(projectRes.data || null);
        setTasks(tasksRes.data?.data || []);
      } catch (error) {
        toast.error("Failed to load project details");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProject();
  }, [id]);

  if (loading) {
    return <AppLayout><div className="p-lg">Loading project details…</div></AppLayout>;
  }

  if (!project) {
    return <AppLayout><div className="p-lg">Project not found.</div></AppLayout>;
  }

  return (
    <AppLayout>
      <div className="space-y-6 pb-12 w-full max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-outline-variant">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>
              <p className="font-mono text-on-surface-variant uppercase tracking-widest text-[11px] font-semibold">
                PROJECT REGISTRY · DIRECTIVE ARCHIVE
              </p>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-on-surface uppercase tracking-tight">{project.name}</h1>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-1 max-w-2xl">{project.description || "Operational project overview and directive telemetry."}</p>
          </div>
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-1.5 px-4 py-2 border border-outline-variant rounded-lg text-xs font-mono font-bold uppercase text-on-surface hover:bg-surface-container transition-colors cursor-pointer self-start md:self-auto"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Back to projects
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-surface-container-lowest border border-outline-variant p-4 sm:p-5 rounded-xl shadow-sm">
            <p className="font-mono text-[10px] uppercase font-bold text-on-surface-variant mb-1">Status</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-tertiary"></span>
              <p className="text-xl sm:text-2xl font-black text-on-surface font-mono uppercase">{project.status || "active"}</p>
            </div>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant p-4 sm:p-5 rounded-xl shadow-sm">
            <p className="font-mono text-[10px] uppercase font-bold text-on-surface-variant mb-1">Priority</p>
            <p className="text-xl sm:text-2xl font-black text-on-surface font-mono uppercase mt-1">{project.priority || "medium"}</p>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant p-4 sm:p-5 rounded-xl shadow-sm">
            <p className="font-mono text-[10px] uppercase font-bold text-on-surface-variant mb-1">Assigned Mandates</p>
            <p className="text-xl sm:text-2xl font-black text-on-surface font-mono mt-1">{tasks.length}</p>
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant p-5 sm:p-6 rounded-xl shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-outline-variant pb-3">
            <h2 className="text-base font-bold font-mono uppercase tracking-wider text-on-surface">Recent Work Directives</h2>
            <span className="text-xs font-mono text-on-surface-variant">{tasks.length} Directives</span>
          </div>
          <div className="space-y-2.5">
            {tasks.length === 0 ? (
              <p className="text-xs font-mono text-on-surface-variant py-4 text-center">No task activity logged yet.</p>
            ) : (
              tasks.map((task) => (
                <div 
                  key={task._id} 
                  onClick={() => navigate(`/tasks/${task._id}`)}
                  className="border border-outline-variant bg-surface-container-low hover:bg-surface-container p-3.5 rounded-lg transition-colors cursor-pointer flex items-center justify-between gap-4"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-xs text-on-surface uppercase tracking-tight truncate">{task.title}</p>
                    <span className="text-[10px] font-mono uppercase text-on-surface-variant mt-0.5 block">
                      Status: {task.status || "pending"}
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-[18px] text-on-surface-variant">arrow_forward</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ProjectDetailPage;
