import React, { useState, useEffect } from "react";
import AppLayout from "../../components/layout/AppLayout";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const GoalsPage = () => {
  const { user } = useAuth();
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const fetchGoals = async () => {
    if (!user?.activeWorkspace) return;
    try {
      const { data } = await axios.get("/api/goals", {
        params: { workspaceId: user.activeWorkspace }
      });
      setGoals(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load goals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, [user]);

  const handleCreateGoal = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    try {
      const { data } = await axios.post("/api/goals", {
        title: newTitle,
        workspaceId: user.activeWorkspace
      });
      setGoals([data, ...goals]);
      setNewTitle("");
      setIsCreating(false);
      toast.success("Goal created!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create goal");
    }
  };

  const activeCount = goals.filter(g => g.status !== "achieved").length;
  const completedCount = goals.filter(g => g.status === "achieved").length;
  const systemEfficiency = goals.length > 0 ? Math.round((completedCount / goals.length) * 100) : 0;
  
  const getStatusChip = (status) => {
    switch (status) {
      case "achieved": 
        return { label: "COMPLETED", class: "bg-surface-container-highest text-on-surface-variant border border-outline-variant" };
      case "active": 
        return { label: "ACTIVE", class: "bg-tertiary-container text-on-tertiary-container border border-outline-variant" };
      default: 
        return { label: "PENDING", class: "bg-secondary-container text-on-secondary-container border border-outline-variant" };
    }
  };

  const getProgress = (goal) => {
    if (goal.status === "achieved") return 100;
    if (goal.status === "active") return 45;
    return 10;
  };

  return (
    <AppLayout>
      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-6 w-full pb-12">
        {/* Page Header & CTA */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-outline-variant">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>
              <span className="font-mono text-xs uppercase font-bold text-on-surface-variant tracking-widest block">
                STRATEGIC LAYER · OBJECTIVES MATRIX
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-on-surface uppercase tracking-tight">Goals List</h1>
          </div>
          <button 
            onClick={() => setIsCreating(true)}
            className="bg-primary text-on-primary px-5 py-2.5 rounded-lg flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all shadow-sm cursor-pointer self-start md:self-auto"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            INITIALIZE GOAL
          </button>
        </section>

        {isCreating && (
          <form onSubmit={handleCreateGoal} className="p-5 sm:p-6 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm space-y-4">
            <input 
              type="text" 
              placeholder="STRATEGIC OBJECTIVE..."
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 text-sm font-bold text-on-surface outline-none focus:border-primary transition-colors"
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button 
                type="button" 
                onClick={() => setIsCreating(false)} 
                className="px-4 py-2 text-xs font-mono font-bold uppercase text-on-surface-variant hover:bg-surface-container rounded-lg transition-colors cursor-pointer"
              >
                CANCEL
              </button>
              <button 
                type="submit" 
                disabled={!newTitle.trim()} 
                className="px-5 py-2 text-xs font-mono font-bold uppercase bg-primary text-on-primary rounded-lg disabled:opacity-50 hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
              >
                COMMIT
              </button>
            </div>
          </form>
        )}

        {/* Bento Dashboard Metrics */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-surface-container-lowest border border-outline-variant p-4 sm:p-5 rounded-xl shadow-sm flex flex-col justify-between h-36">
            <span className="font-mono text-[10px] uppercase font-bold text-on-surface-variant">ACTIVE OBJECTIVES</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black font-mono text-on-surface">{activeCount}</span>
              <span className="font-mono text-xs text-tertiary font-bold">+1</span>
            </div>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant p-4 sm:p-5 rounded-xl shadow-sm flex flex-col justify-between h-36">
            <span className="font-mono text-[10px] uppercase font-bold text-on-surface-variant">SYSTEM EFFICIENCY</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black font-mono text-on-surface">{systemEfficiency}%</span>
            </div>
            <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
              <div className="bg-primary h-full transition-all duration-500 rounded-full" style={{ width: `${systemEfficiency}%` }}></div>
            </div>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant p-4 sm:p-5 rounded-xl shadow-sm flex flex-col justify-between h-36">
            <span className="font-mono text-[10px] uppercase font-bold text-on-surface-variant">URGENT DIRECTIVES</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black font-mono text-error">00</span>
            </div>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant p-4 sm:p-5 rounded-xl shadow-sm flex flex-col justify-between h-36">
            <span className="font-mono text-[10px] uppercase font-bold text-on-surface-variant">MEAN RESOLUTION</span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black font-mono text-on-surface">4.2</span>
              <span className="font-mono text-xs text-on-surface-variant uppercase">DAYS</span>
            </div>
          </div>
        </section>

        {/* Mobile View: Stacked Cards */}
        <div className="md:hidden space-y-3">
          {loading ? (
            <div className="p-8 text-center font-mono text-xs uppercase tracking-wider text-on-surface-variant bg-surface-container-lowest border border-outline-variant rounded-xl">
              LOADING DIRECTIVES...
            </div>
          ) : goals.length === 0 ? (
            <div className="p-8 text-center font-mono text-xs uppercase tracking-wider text-on-surface-variant bg-surface-container-lowest border border-outline-variant rounded-xl">
              NO OBJECTIVES FOUND
            </div>
          ) : (
            goals.map((goal, i) => {
              const status = getStatusChip(goal.status);
              const progress = getProgress(goal);
              return (
                <div 
                  key={goal._id || i}
                  className="bg-surface-container-lowest border border-outline-variant p-4 rounded-xl shadow-sm space-y-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] text-on-surface-variant font-bold bg-surface-container px-2 py-0.5 rounded border border-outline-variant">
                      #G-{String(8812 + i).padStart(4, '0')}
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 font-mono text-[10px] rounded-full uppercase tracking-wider font-bold ${status.class}`}>
                      {status.label}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-on-surface uppercase tracking-tight">{goal.title}</h3>
                    <span className="text-[11px] font-mono text-on-surface-variant">{goal.linkedTasks?.length || 0} linked directives</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono text-on-surface-variant">
                      <span>Progress</span>
                      <span className="font-bold text-on-surface">{progress}%</span>
                    </div>
                    <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                      <div className="bg-primary h-full transition-all duration-500 rounded-full" style={{ width: `${progress}%` }}></div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Desktop Main Ledger Table */}
        <section className="hidden md:block bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low border-b border-outline-variant">
                  <th className="px-5 py-3.5 font-mono text-[10px] text-on-surface-variant uppercase tracking-wider w-32">Goal ID</th>
                  <th className="px-5 py-3.5 font-mono text-[10px] text-on-surface-variant uppercase tracking-wider">Strategic Objective</th>
                  <th className="px-5 py-3.5 font-mono text-[10px] text-on-surface-variant uppercase tracking-wider">Status</th>
                  <th className="px-5 py-3.5 font-mono text-[10px] text-on-surface-variant uppercase tracking-wider">System Progress</th>
                  <th className="px-5 py-3.5 font-mono text-[10px] text-on-surface-variant uppercase tracking-wider">Created Date</th>
                  <th className="px-5 py-3.5 font-mono text-[10px] text-on-surface-variant uppercase tracking-wider w-16"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-12 text-center font-mono text-xs text-on-surface-variant uppercase">LOADING DIRECTIVES...</td>
                  </tr>
                ) : goals.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-12 text-center font-mono text-xs text-on-surface-variant uppercase">NO OBJECTIVES FOUND</td>
                  </tr>
                ) : (
                  goals.map((goal, i) => {
                    const status = getStatusChip(goal.status);
                    const progress = getProgress(goal);
                    return (
                      <tr key={goal._id || i} className="hover:bg-surface-container-low transition-colors group cursor-pointer">
                        <td className="px-5 py-4 font-mono text-xs text-on-surface-variant">#G-{String(8812 + i).padStart(4, '0')}</td>
                        <td className="px-5 py-4">
                          <div className="flex flex-col">
                            <span className="font-bold text-sm text-on-surface">{goal.title}</span>
                            <span className="font-mono text-xs text-on-surface-variant">{goal.linkedTasks?.length || 0} linked tasks.</span>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 font-mono text-[10px] rounded-full uppercase tracking-wider font-bold ${status.class}`}>
                            {status.label}
                          </span>
                        </td>
                        <td className="px-5 py-4 w-64">
                          <div className="flex flex-col gap-1.5">
                            <span className="font-mono text-xs font-bold text-on-surface">{progress}%</span>
                            <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                              <div className="bg-primary h-full transition-all duration-500 rounded-full" style={{ width: `${progress}%` }}></div>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 font-mono text-xs text-on-surface-variant uppercase">
                          {new Date(goal.createdAt || Date.now()).toLocaleDateString('en-GB', { month: 'short', day: '2-digit', year: 'numeric' })}
                        </td>
                        <td className="px-5 py-4 text-right">
                          <button className="material-symbols-outlined opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-surface-container rounded-lg text-on-surface-variant hover:text-primary text-[18px]">more_vert</button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          <div className="p-4 bg-surface-container-lowest border-t border-outline-variant flex items-center justify-between">
            <span className="font-mono text-xs text-on-surface-variant uppercase">DISPLAYING {goals.length > 0 ? 1 : 0}-{Math.min(10, goals.length)} OF {goals.length} SYSTEM OBJECTIVES</span>
            <div className="flex gap-1.5">
              <button className="material-symbols-outlined p-1.5 hover:bg-surface-container border border-outline-variant rounded-lg text-on-surface disabled:opacity-40 cursor-pointer text-[16px]" disabled>chevron_left</button>
              <button className="material-symbols-outlined p-1.5 hover:bg-surface-container border border-outline-variant rounded-lg text-on-surface cursor-pointer text-[16px]">chevron_right</button>
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
};

export default GoalsPage;
