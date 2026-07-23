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
        return { label: "COMPLETED", class: "bg-primary-container text-on-primary-container" };
      case "active": 
        return { label: "ACTIVE", class: "bg-tertiary-container text-on-tertiary-container" };
      default: 
        return { label: "PENDING", class: "bg-surface-container text-on-surface-variant" };
    }
  };

  const getProgress = (goal) => {
    if (goal.status === "achieved") return 100;
    if (goal.status === "active") return 45;
    return 10;
  };

  return (
    <AppLayout>
      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-lg w-full">
        {/* Page Header & CTA */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-md">
          <div>
            <span className="font-label-caps text-label-caps text-secondary tracking-widest block mb-xs">STRATEGIC_LAYER_V4</span>
            <h2 className="font-display-lg text-display-lg text-primary">Goals List</h2>
          </div>
          <button 
            onClick={() => setIsCreating(true)}
            className="bg-primary text-on-primary px-lg py-md rounded-full flex items-center gap-sm font-label-caps text-label-caps hover:opacity-80 transition-opacity active:scale-95 duration-150"
          >
            <span className="material-symbols-outlined">add</span>
            INITIALIZE_GOAL
          </button>
        </section>

        {isCreating && (
          <form onSubmit={handleCreateGoal} className="p-lg bg-surface-container-low border border-outline-variant rounded-lg mb-lg">
            <input 
              type="text" 
              placeholder="STRATEGIC OBJECTIVE..."
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              className="w-full bg-transparent text-headline-lg-mobile font-bold outline-none mb-md border-b border-outline-variant pb-2 focus:border-primary transition-colors"
              autoFocus
            />
            <div className="flex justify-end gap-sm">
              <button type="button" onClick={() => setIsCreating(false)} className="px-lg py-sm text-label-caps font-label-caps text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors">CANCEL</button>
              <button type="submit" disabled={!newTitle.trim()} className="px-lg py-sm text-label-caps font-label-caps bg-primary text-on-primary rounded-full disabled:opacity-50 hover:opacity-90 transition-opacity">COMMIT</button>
            </div>
          </form>
        )}

        {/* Bento Dashboard Metrics */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
          <div className="bg-surface-container-lowest border border-outline-variant p-lg flex flex-col justify-between h-40">
            <span className="font-label-caps text-label-caps text-secondary">ACTIVE_OBJECTIVES</span>
            <div className="flex items-baseline gap-sm">
              <span className="font-headline-lg text-[48px]">{activeCount}</span>
              <span className="font-label-sm text-tertiary-fixed-dim text-label-sm">+1</span>
            </div>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant p-lg flex flex-col justify-between h-40">
            <span className="font-label-caps text-label-caps text-secondary">SYSTEM_EFFICIENCY</span>
            <div className="flex items-baseline gap-sm">
              <span className="font-headline-lg text-[48px]">{systemEfficiency}%</span>
            </div>
            <div className="w-full bg-surface-container h-1 rounded-full overflow-hidden">
              <div className="bg-primary h-full transition-all duration-1000" style={{ width: `${systemEfficiency}%` }}></div>
            </div>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant p-lg flex flex-col justify-between h-40">
            <span className="font-label-caps text-label-caps text-secondary">URGENT_DIRECTIVES</span>
            <div className="flex items-baseline gap-sm">
              <span className="font-headline-lg text-[48px] text-error">00</span>
            </div>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant p-lg flex flex-col justify-between h-40">
            <span className="font-label-caps text-label-caps text-secondary">MEAN_TIME_RESOLUTION</span>
            <div className="flex items-baseline gap-sm">
              <span className="font-headline-lg text-[48px]">4.2<span className="text-body-md font-normal ml-xs">DAYS</span></span>
            </div>
          </div>
        </section>

        {/* Main Ledger Table */}
        <section className="bg-surface-container-lowest border border-outline-variant overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low border-b border-outline-variant">
                  <th className="px-lg py-md font-label-caps text-label-caps text-secondary uppercase tracking-tighter w-32">Goal ID</th>
                  <th className="px-lg py-md font-label-caps text-label-caps text-secondary uppercase tracking-tighter">Strategic Objective</th>
                  <th className="px-lg py-md font-label-caps text-label-caps text-secondary uppercase tracking-tighter">Status</th>
                  <th className="px-lg py-md font-label-caps text-label-caps text-secondary uppercase tracking-tighter">System Progress</th>
                  <th className="px-lg py-md font-label-caps text-label-caps text-secondary uppercase tracking-tighter">Created Date</th>
                  <th className="px-lg py-md font-label-caps text-label-caps text-secondary uppercase tracking-tighter w-16"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-lg py-lg text-center font-label-sm text-label-sm text-on-surface-variant">LOADING DIRECTIVES...</td>
                  </tr>
                ) : goals.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-lg py-lg text-center font-label-sm text-label-sm text-on-surface-variant">NO OBJECTIVES FOUND</td>
                  </tr>
                ) : (
                  goals.map((goal, i) => {
                    const status = getStatusChip(goal.status);
                    const progress = getProgress(goal);
                    return (
                      <tr key={goal._id} className="hover:bg-surface-container-low transition-colors group cursor-pointer">
                        <td className="px-lg py-lg font-label-sm text-label-sm text-on-surface-variant">#G-{String(8812 + i).padStart(4, '0')}</td>
                        <td className="px-lg py-lg">
                          <div className="flex flex-col">
                            <span className="font-body-md text-primary font-bold">{goal.title}</span>
                            <span className="font-label-sm text-label-sm text-secondary">{goal.linkedTasks?.length || 0} linked tasks.</span>
                          </div>
                        </td>
                        <td className="px-lg py-lg">
                          <span className={`inline-flex items-center px-sm py-xs font-label-caps text-[10px] rounded-full uppercase tracking-widest font-bold ${status.class}`}>
                            {status.label}
                          </span>
                        </td>
                        <td className="px-lg py-lg w-64">
                          <div className="flex flex-col gap-xs">
                            <div className="flex justify-between font-label-sm text-label-sm">
                              <span>{progress}%</span>
                            </div>
                            <div className="w-full bg-surface-container-high h-[2px]">
                              <div className="bg-primary h-full transition-all duration-1000" style={{ width: `${progress}%` }}></div>
                            </div>
                          </div>
                        </td>
                        <td className="px-lg py-lg font-label-sm text-label-sm text-on-surface-variant uppercase">
                          {new Date(goal.createdAt).toLocaleDateString('en-GB', { month: 'short', day: '2-digit', year: 'numeric' }).replace(/ /g, '_')}
                        </td>
                        <td className="px-lg py-lg text-right">
                          <button className="material-symbols-outlined opacity-0 group-hover:opacity-100 transition-opacity p-xs hover:bg-surface-container rounded-full">more_vert</button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          <div className="p-lg bg-surface-container-lowest border-t border-outline-variant flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-secondary uppercase">DISPLAYING {goals.length > 0 ? 1 : 0}-{Math.min(10, goals.length)} OF {goals.length} SYSTEM OBJECTIVES</span>
            <div className="flex gap-sm">
              <button className="material-symbols-outlined p-sm hover:bg-surface-container-low border border-outline-variant rounded-full disabled:opacity-50" disabled>chevron_left</button>
              <button className="material-symbols-outlined p-sm hover:bg-surface-container-low border border-outline-variant rounded-full">chevron_right</button>
            </div>
          </div>
        </section>

        {/* Decorative Technical Visual */}
        <section className="h-48 relative overflow-hidden border border-outline-variant bg-black group mb-xl">
          <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity">
            <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <p className="font-label-caps text-label-caps text-tertiary-fixed-dim animate-pulse">STRATEGIC_OVERVIEW_FEED_ACTIVE</p>
              <p className="font-label-sm text-label-sm text-on-primary-fixed-variant mt-xs">ENCRYPTED_DATA_TUNNEL_ESTABLISHED</p>
            </div>
          </div>
          <div className="absolute bottom-md right-md flex gap-xs">
            <div className="w-unit h-unit bg-tertiary-fixed-dim rounded-full"></div>
            <div className="w-unit h-unit bg-tertiary-fixed-dim rounded-full opacity-50"></div>
            <div className="w-unit h-unit bg-tertiary-fixed-dim rounded-full opacity-20"></div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
};

export default GoalsPage;
