import React, { useState, useEffect } from "react";
import AppLayout from "../../components/layout/AppLayout";
import KanbanBoard from "../../components/core/KanbanBoard";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useDataStore } from "../../store/useDataStore";
import { deleteTask as apiDeleteTask } from "../../services/taskService";

const KanbanPage = () => {
  const { tasks, loading, loadTasks, moveTask } = useDataStore();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      loadTasks();
    }
  }, [user, loadTasks]);

  const handleEdit = (task) => {
    navigate(`/tasks/${task._id}`);
  };

  const handleDelete = async (taskId) => {
    try {
      await apiDeleteTask(taskId);
      loadTasks();
      toast.success("Task deleted");
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await moveTask(taskId, newStatus);
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const openCreateModal = () => {
    // Navigate to create task or open modal
    toast("Create mandate clicked (modal placeholder)");
  };

  return (
    <AppLayout>
      <div className="space-y-lg">
        {/* Board Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-md mb-md">
          <div>
            <p className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-xs">Task Pipeline</p>
            <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight font-black uppercase">Kanban Board</h1>
            <p className="font-body-md text-on-surface-variant">Core Infrastructure Deployment Pipeline · Interactive Workflow</p>
          </div>
          <div className="flex items-center gap-md">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full border-2 border-background overflow-hidden bg-surface-container">
                <div className="w-full h-full bg-secondary-container"></div>
              </div>
              <div className="w-8 h-8 rounded-full border-2 border-background overflow-hidden bg-surface-container">
                <div className="w-full h-full bg-surface-dim"></div>
              </div>
              <div className="w-8 h-8 rounded-full border-2 border-background bg-primary-container text-on-primary-container flex items-center justify-center font-label-caps text-[10px]">+4</div>
            </div>
            <button className="flex items-center gap-sm px-md py-sm border border-outline-variant rounded-full text-on-surface font-body-md hover:bg-surface-container-low transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[18px]">filter_list</span>
              Filter
            </button>
            <button className="flex items-center gap-sm px-md py-sm bg-primary text-on-primary rounded-full font-body-md hover:opacity-90 transition-all cursor-pointer">
              <span className="material-symbols-outlined text-[18px]">share</span>
              Export
            </button>
          </div>
        </div>

        {/* Kanban Columns Container */}
        {loading && tasks.length === 0 ? (
          <div className="flex items-center justify-center py-2xl">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="w-full overflow-x-auto pb-lg scrollbar-thin">
            <KanbanBoard 
              tasks={tasks} 
              setTasks={() => {}} 
              onEdit={handleEdit} 
              onDelete={handleDelete} 
              onStatusChange={handleStatusChange} 
              openCreateModal={openCreateModal} 
            />
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default KanbanPage;
