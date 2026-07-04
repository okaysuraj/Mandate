import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const ProjectsPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await axios.get("/api/tasks", { params: { limit: 100 } });
        setTasks(data.data || []);
      } catch (error) {
        toast.error("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchTasks();
  }, [user]);

  const activeCount = tasks.filter(t => t.status !== "completed").length;
  const completedCount = tasks.filter(t => t.status === "completed").length;
  const throughput = tasks.length > 0 ? ((completedCount / tasks.length) * 100).toFixed(1) : "0.0";

  const getStatusChip = (status) => {
    switch (status) {
      case "completed": return { label: "COMPLETE", class: "bg-on-tertiary-container text-white" };
      case "in-progress": return { label: "ACTIVE", class: "bg-surface-container-high text-on-surface-variant border border-outline-variant" };
      default: return { label: "PENDING", class: "bg-surface-container-high text-on-surface-variant border border-outline-variant" };
    }
  };

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col">
      {/* Top NavBar */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-lg py-md bg-surface border-b border-outline-variant">
        <Navbar variant="landing" />
      </header>

      <main className="mt-xl pt-xl px-lg pb-xl max-w-[1440px] mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-xl gap-md">
          <div className="space-y-sm">
            <h1 className="font-display-lg text-display-lg tracking-tighter uppercase">Project Ledger</h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
              Active industrial deployments and workspace synchronizations across the Mandate network.
            </p>
          </div>
          <div className="flex gap-sm">
            <button className="px-lg py-sm rounded-full border border-outline text-primary font-label-caps text-label-caps hover:bg-surface-container-low transition-all duration-300">
              Export CSV
            </button>
            <button className="px-lg py-sm rounded-full bg-primary text-on-primary font-label-caps text-label-caps hover:opacity-80 transition-all duration-300">
              + New Project
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-xl">
          <div className="bg-surface-container-lowest border border-outline-variant p-lg">
            <p className="font-label-caps text-label-caps text-on-surface-variant mb-md">ACTIVE NODES</p>
            <div className="flex items-baseline gap-sm">
              <span className="font-display-lg text-headline-lg">{loading ? "—" : activeCount}</span>
              <span className="text-on-tertiary-container font-label-sm text-label-sm">+2% vs prev</span>
            </div>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant p-lg">
            <p className="font-label-caps text-label-caps text-on-surface-variant mb-md">THROUGHPUT</p>
            <div className="flex items-baseline gap-sm">
              <span className="font-display-lg text-headline-lg">{loading ? "—" : `${throughput}%`}</span>
              <span className="text-on-surface-variant font-label-sm text-label-sm">Nominal</span>
            </div>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant p-lg">
            <p className="font-label-caps text-label-caps text-on-surface-variant mb-md">SYSTEM LOAD</p>
            <span className="font-display-lg text-headline-lg">Low</span>
          </div>
        </div>

        {/* Projects Table */}
        <div className="w-full overflow-x-auto bg-surface-container-lowest border border-outline-variant">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-outline-variant">
                <th className="px-lg py-md font-label-caps text-label-caps text-primary bg-surface-container-low">UID</th>
                <th className="px-lg py-md font-label-caps text-label-caps text-primary bg-surface-container-low">PROJECT NAME</th>
                <th className="px-lg py-md font-label-caps text-label-caps text-primary bg-surface-container-low">STATUS</th>
                <th className="px-lg py-md font-label-caps text-label-caps text-primary bg-surface-container-low">PRIORITY</th>
                <th className="px-lg py-md font-label-caps text-label-caps text-primary bg-surface-container-low text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {loading ? (
                <tr><td colSpan={5} className="px-lg py-lg text-center font-label-caps text-label-caps text-on-surface-variant">LOADING...</td></tr>
              ) : tasks.length === 0 ? (
                <tr><td colSpan={5} className="px-lg py-lg text-center font-label-caps text-label-caps text-on-surface-variant">NO PROJECTS</td></tr>
              ) : (
                tasks.map((task, i) => {
                  const status = getStatusChip(task.status);
                  return (
                    <tr key={task._id} className="group hover:bg-surface-container-low transition-colors duration-200">
                      <td className="px-lg py-lg font-label-sm text-label-sm text-on-surface-variant">
                        #MP-{String(8821 + i).padStart(4, '0')}
                      </td>
                      <td className="px-lg py-lg">
                        <div className="font-headline-lg-mobile text-headline-lg-mobile font-bold tracking-tight">{task.title}</div>
                        <div className="text-label-sm text-on-surface-variant">{task.description?.substring(0, 40) || "—"}</div>
                      </td>
                      <td className="px-lg py-lg">
                        <span className={`px-md py-xs rounded-full font-label-caps text-[9px] tracking-widest ${status.class}`}>
                          {status.label}
                        </span>
                      </td>
                      <td className="px-lg py-lg">
                        <span className="font-label-caps text-label-caps text-secondary uppercase">{task.priority || "medium"}</span>
                      </td>
                      <td className="px-lg py-lg text-right">
                        <div className="flex justify-end gap-sm opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="px-md py-xs rounded-full border border-outline-variant text-on-surface-variant font-label-caps text-[10px] hover:border-primary hover:text-primary transition-all">ARCHIVE</button>
                          <button className="px-md py-xs rounded-full border border-outline-variant text-on-surface-variant font-label-caps text-[10px] hover:border-primary hover:text-primary transition-all">EXPORT</button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-lg flex justify-between items-center">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
            Displaying {tasks.length} active entries
          </span>
          <div className="flex gap-xs">
            <button className="w-10 h-10 flex items-center justify-center border border-outline-variant hover:bg-primary hover:text-on-primary transition-all">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="w-10 h-10 flex items-center justify-center border border-outline-variant bg-primary text-on-primary">1</button>
            <button className="w-10 h-10 flex items-center justify-center border border-outline-variant hover:bg-surface-container-high transition-all">2</button>
            <button className="w-10 h-10 flex items-center justify-center border border-outline-variant hover:bg-primary hover:text-on-primary transition-all">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectsPage;
