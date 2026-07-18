import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import AppLayout from "../components/AppLayout";
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
      <div className="space-y-lg">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-md">
          <div>
            <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">Project Registry</p>
            <h1 className="font-headline-lg text-headline-lg text-primary">{project.name}</h1>
            <p className="text-on-surface-variant mt-sm">{project.description || "Operational project overview"}</p>
          </div>
          <button onClick={() => navigate(-1)} className="px-md py-2 border border-outline-variant rounded-full">
            Back to projects
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
          <div className="bg-surface-container-lowest border border-outline-variant p-lg">
            <p className="font-label-caps text-label-caps text-on-surface-variant">Status</p>
            <p className="font-headline-lg text-primary mt-sm">{project.status || "active"}</p>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant p-lg">
            <p className="font-label-caps text-label-caps text-on-surface-variant">Priority</p>
            <p className="font-headline-lg text-primary mt-sm">{project.priority || "medium"}</p>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant p-lg">
            <p className="font-label-caps text-label-caps text-on-surface-variant">Tasks</p>
            <p className="font-headline-lg text-primary mt-sm">{tasks.length}</p>
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant p-lg">
          <h2 className="font-headline-lg text-primary mb-md">Recent Work</h2>
          <div className="space-y-sm">
            {tasks.length === 0 ? <p className="text-on-surface-variant">No task activity yet.</p> : tasks.map((task) => (
              <div key={task._id} className="border border-outline-variant p-md">
                <p className="font-body-md font-bold text-primary">{task.title}</p>
                <p className="text-sm text-on-surface-variant">{task.status || "pending"}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ProjectDetailPage;
