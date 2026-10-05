import React, { useState, useEffect } from "react";
import AppLayout from "../../components/layout/AppLayout";
import KanbanBoard from "../../components/core/KanbanBoard";
import TaskComposer from "../../components/core/TaskComposer";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useDataStore } from "../../store/useDataStore";
import { deleteTask as apiDeleteTask } from "../../services/taskService";

const KanbanPage = () => {
  const { tasks, loading, loadTasks, moveTask, reorderTasks } = useDataStore();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [targetStatus, setTargetStatus] = useState("pending");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (user) {
      loadTasks();
    }
  }, [user, loadTasks]);

  const handleEdit = (task) => {
    const id = task._id || task.id;
    if (id && !String(id).startsWith("650a1111")) {
      navigate(`/tasks/${id}`);
    } else {
      toast("Sample preview mandate - create a new mandate to edit full details", { icon: "ℹ️" });
    }
  };

  const handleDelete = async (taskId) => {
    try {
      if (String(taskId).startsWith("650a1111") || String(taskId).startsWith("demo-")) {
        reorderTasks(tasks.filter(t => (t._id || t.id) !== taskId));
        toast.success("Mandate removed");
        return;
      }
      await apiDeleteTask(taskId);
      loadTasks();
      toast.success("Mandate deleted");
    } catch (error) {
      toast.error("Failed to delete mandate");
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await moveTask(taskId, newStatus);
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const openCreateModal = (status = "pending") => {
    setTargetStatus(status);
    setIsComposerOpen(true);
  };

  const filteredTasks = searchQuery.trim() 
    ? tasks.filter(t => 
        (t.title && t.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (t.description && t.description.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : tasks;

  return (
    <AppLayout fullWidth>
      <div className="space-y-6 pb-6">
        {/* Board Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-outline-variant">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>
              <p className="font-mono text-on-surface-variant uppercase tracking-widest text-[11px] font-semibold">
                EXECUTION PIPELINE · REALTIME INTERACTIVE
              </p>
            </div>
            <h1 className="text-2xl md:text-3xl text-on-surface tracking-tight font-black uppercase">
              Kanban Board
            </h1>
            <p className="text-on-surface-variant text-xs md:text-sm mt-0.5">
              Strategic directive workflow across development and deployment states.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Quick search input */}
            <div className="relative">
              <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
                search
              </span>
              <input
                type="text"
                placeholder="Filter mandates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-7 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg text-on-surface text-xs placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary transition-colors w-44 sm:w-56"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface text-[14px] cursor-pointer"
                >
                  close
                </button>
              )}
            </div>

            <button 
              onClick={() => openCreateModal("pending")}
              className="flex items-center gap-1.5 px-4 py-2 bg-primary text-on-primary rounded-lg font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span>New Mandate</span>
            </button>
          </div>
        </div>

        {/* Kanban Board Container */}
        {loading && tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="font-mono text-xs text-on-surface-variant uppercase tracking-wider">Loading Mandates...</p>
          </div>
        ) : (
          <div className="w-full">
            <KanbanBoard 
              tasks={filteredTasks} 
              setTasks={reorderTasks} 
              onEdit={handleEdit} 
              onDelete={handleDelete} 
              onStatusChange={handleStatusChange} 
              openCreateModal={openCreateModal} 
            />
          </div>
        )}
      </div>

      {/* Task Composer Modal */}
      <TaskComposer 
        isOpen={isComposerOpen} 
        onClose={() => setIsComposerOpen(false)} 
        onTaskCreated={() => {
          setIsComposerOpen(false);
          loadTasks();
        }} 
      />
    </AppLayout>
  );
};

export default KanbanPage;
