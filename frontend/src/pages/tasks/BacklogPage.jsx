import React, { useState, useEffect } from "react";
import AppLayout from "../../components/layout/AppLayout";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";

const BacklogPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await axios.get("/api/tasks", { params: { limit: 100 } });
        setTasks(data.data || []);
      } catch (error) {
        toast.error("Failed to load backlog");
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchTasks();
  }, [user]);

  const activeCount = tasks.filter(t => t.status !== "completed").length;
  const criticalCount = tasks.filter(t => t.status !== "completed" && (t.priority === "urgent" || t.priority === "high")).length;
  const stablePercentage = tasks.length > 0 ? Math.round(((tasks.length - criticalCount) / tasks.length) * 100) : 100;
  
  const filteredTasks = tasks.filter(t => t.title.toLowerCase().includes(search.toLowerCase()) || (t.description && t.description.toLowerCase().includes(search.toLowerCase())));

  const getStatusChip = (task) => {
    if (task.status === "completed") {
      return (
        <span className="px-2.5 py-0.5 bg-surface-container-highest text-on-surface-variant text-[10px] font-mono font-bold rounded-full border border-outline-variant uppercase">
          COMPLETED
        </span>
      );
    }
    if (task.priority === "urgent" || task.priority === "high") {
      return (
        <span className="px-2.5 py-0.5 bg-error-container text-error text-[10px] font-mono font-bold rounded-full border border-error uppercase">
          CRITICAL
        </span>
      );
    }
    if (task.status === "in-progress") {
      return (
        <span className="px-2.5 py-0.5 bg-tertiary-container text-on-tertiary-container text-[10px] font-mono font-bold rounded-full border border-outline-variant uppercase flex items-center gap-1.5 w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span>
          ACTIVE
        </span>
      );
    }
    return (
      <span className="px-2.5 py-0.5 bg-secondary-container text-on-secondary-container text-[10px] font-mono font-bold rounded-full border border-outline-variant uppercase">
        PENDING
      </span>
    );
  };

  return (
    <AppLayout>
      <main className="flex-1 max-w-container-max mx-auto w-full flex flex-col h-full space-y-6 pb-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-4 border-b border-outline-variant">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>
              <p className="font-mono text-on-surface-variant uppercase tracking-widest text-[11px] font-semibold">
                SYSTEM INVENTORY · REGISTRY LEDGER
              </p>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-on-surface uppercase tracking-tight">List View</h1>
            <p className="text-xs md:text-sm text-on-surface-variant max-w-2xl mt-0.5">
              High-density operational overview. Manage system backlogs, critical path items, and scheduled maintenance tasks with industrial precision.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full md:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
              <input 
                type="text" 
                placeholder="Query mandates..." 
                className="bg-surface-container-lowest border border-outline-variant focus:outline-none focus:border-primary text-xs pl-9 pr-4 py-2 w-full sm:w-56 rounded-lg text-on-surface placeholder:text-on-surface-variant/60 transition-colors"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="px-3.5 py-2 border border-outline-variant text-xs font-mono font-bold uppercase rounded-lg hover:bg-surface-container text-on-surface transition-all flex items-center gap-1.5 cursor-pointer">
              <span className="material-symbols-outlined text-[16px]">filter_list</span>
              Filter
            </button>
            <button className="px-3.5 py-2 border border-outline-variant text-xs font-mono font-bold uppercase rounded-lg hover:bg-surface-container text-on-surface transition-all flex items-center gap-1.5 cursor-pointer">
              <span className="material-symbols-outlined text-[16px]">download</span>
              Export
            </button>
          </div>
        </div>

        {/* Dashboard Summary Bento */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-surface-container-lowest border border-outline-variant/60 p-4 sm:p-5 rounded-2xl shadow-xs transition-all hover:border-primary/40">
            <p className="font-mono text-[10px] uppercase font-bold text-on-surface-variant mb-1">ACTIVE_TASKS</p>
            <p className="text-2xl sm:text-3xl font-black text-on-surface font-mono">{loading ? "—" : activeCount}</p>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant/60 p-4 sm:p-5 rounded-2xl shadow-xs transition-all hover:border-error/50">
            <p className="font-mono text-[10px] uppercase font-bold text-error mb-1">CRITICAL_PATH</p>
            <p className="text-2xl sm:text-3xl font-black text-on-surface font-mono">{loading ? "—" : criticalCount}</p>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant/60 p-4 sm:p-5 rounded-2xl shadow-xs transition-all hover:border-tertiary/50">
            <p className="font-mono text-[10px] uppercase font-bold text-tertiary mb-1">STABLE_STATE</p>
            <p className="text-2xl sm:text-3xl font-black text-on-surface font-mono">{loading ? "—" : stablePercentage}%</p>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant/60 p-4 sm:p-5 rounded-2xl shadow-xs transition-all hover:border-primary/40">
            <p className="font-mono text-[10px] uppercase font-bold text-on-surface-variant mb-1">OPERATOR_LOAD</p>
            <p className="text-2xl sm:text-3xl font-black text-on-surface font-mono">72<span className="text-xs font-normal text-on-surface-variant">/hr</span></p>
          </div>
        </div>

        {/* Mobile View: Stacked Cards */}
        <div className="md:hidden space-y-3">
          {loading ? (
            <div className="p-8 text-center font-mono text-xs uppercase tracking-wider text-on-surface-variant bg-surface-container-lowest border border-outline-variant rounded-xl">
              LOADING DATA...
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="p-8 text-center font-mono text-xs uppercase tracking-wider text-on-surface-variant bg-surface-container-lowest border border-outline-variant rounded-xl">
              NO ENTITIES FOUND
            </div>
          ) : (
            filteredTasks.map((task, i) => {
              const taskId = task._id || task.id;
              const refCode = String(taskId || i).slice(-5).toUpperCase();
              return (
                <div 
                  key={taskId || i} 
                  onClick={() => navigate(`/tasks/${taskId}`)}
                  className="bg-surface-container-lowest border border-outline-variant p-4 rounded-xl shadow-sm hover:border-primary transition-all cursor-pointer space-y-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] text-on-surface-variant font-bold bg-surface-container px-2 py-0.5 rounded border border-outline-variant">
                      #CX-{refCode}
                    </span>
                    {getStatusChip(task)}
                  </div>
                  <h3 className="font-bold text-sm text-on-surface uppercase tracking-tight">
                    {task.title}
                  </h3>
                  {task.description && (
                    <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                      {task.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between pt-2 border-t border-outline-variant text-[11px] text-on-surface-variant font-mono">
                    <span>{new Date(task.createdAt || Date.now()).toLocaleDateString('en-GB')}</span>
                    <span className="material-symbols-outlined text-[16px] text-primary">arrow_forward</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Desktop View: Industrial Table */}
        <div className="hidden md:flex bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm flex-col">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant bg-surface-container-low">
                <th className="px-5 py-3.5 font-mono text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">UID</th>
                <th className="px-5 py-3.5 font-mono text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">STATUS</th>
                <th className="px-5 py-3.5 font-mono text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">TASK_DESCRIPTION</th>
                <th className="px-5 py-3.5 font-mono text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">ASSIGNED_UNIT</th>
                <th className="px-5 py-3.5 font-mono text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">TIMESTAMP</th>
                <th className="px-5 py-3.5 font-mono text-[10px] uppercase font-bold text-on-surface-variant tracking-wider text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-5 py-12 text-center font-mono text-xs uppercase tracking-wider text-on-surface-variant">
                    LOADING DATA...
                  </td>
                </tr>
              ) : filteredTasks.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-5 py-12 text-center font-mono text-xs uppercase tracking-wider text-on-surface-variant">
                    NO ENTITIES FOUND
                  </td>
                </tr>
              ) : (
                filteredTasks.map((task, i) => (
                  <tr 
                    key={task._id || i} 
                    className="hover:bg-surface-container-low transition-colors group cursor-pointer" 
                    onClick={() => navigate(`/tasks/${task._id}`)}
                  >
                    <td className="px-5 py-4 font-mono text-xs text-on-surface-variant">
                      #CX-{String(88900 + i).padStart(5, '0')}
                    </td>
                    <td className="px-5 py-4">
                      {getStatusChip(task)}
                    </td>
                    <td className="px-5 py-4 font-bold text-on-surface max-w-xs truncate text-sm">
                      {task.title}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-surface-container-high border border-outline-variant flex items-center justify-center text-[10px] font-bold text-on-surface">
                          OP
                        </div>
                        <span className="text-xs font-mono text-on-surface">System_Op</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 font-mono text-xs text-on-surface-variant">
                      {new Date(task.createdAt || Date.now()).toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.')} {new Date(task.createdAt || Date.now()).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-5 py-4 text-right opacity-60 group-hover:opacity-100 transition-opacity">
                      <div className="flex items-center justify-end gap-1">
                        <button 
                          className="p-1 rounded hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors cursor-pointer" 
                          onClick={(e) => { e.stopPropagation(); }}
                          title="Edit"
                        >
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button 
                          className="p-1 rounded hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors cursor-pointer" 
                          onClick={(e) => { e.stopPropagation(); navigate(`/tasks/${task._id}`); }}
                          title="View"
                        >
                          <span className="material-symbols-outlined text-[18px]">visibility</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center bg-surface-container-lowest px-4 sm:px-5 py-3 border border-outline-variant rounded-xl gap-3 shadow-sm">
          <p className="text-xs font-mono text-on-surface-variant uppercase">PAGE_SEQUENCE: 1 OF 1</p>
          <div className="flex gap-1.5">
            <button className="w-8 h-8 flex items-center justify-center border border-outline-variant rounded-lg hover:bg-surface-container text-on-surface transition-all cursor-pointer">
              <span className="material-symbols-outlined text-[16px]">chevron_left</span>
            </button>
            <button className="w-8 h-8 flex items-center justify-center border border-primary bg-primary text-on-primary font-bold text-xs rounded-lg">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center border border-outline-variant rounded-lg hover:bg-surface-container text-on-surface transition-all text-xs opacity-50 cursor-not-allowed" disabled>
              2
            </button>
            <button className="w-8 h-8 flex items-center justify-center border border-outline-variant rounded-lg hover:bg-surface-container text-on-surface transition-all cursor-pointer">
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-on-surface-variant uppercase">ENTRIES:</span>
            <select className="bg-surface-container-low border border-outline-variant rounded-md text-xs font-bold text-on-surface px-2 py-1 focus:outline-none">
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>
          </div>
        </div>
      </main>
    </AppLayout>
  );
};

export default BacklogPage;
