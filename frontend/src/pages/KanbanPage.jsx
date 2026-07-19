import React, { useState, useEffect } from "react";
import AppLayout from "../components/AppLayout";
import KanbanBoard from "../components/KanbanBoard";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useDataStore } from "../store/useDataStore";
import { deleteTask as apiDeleteTask } from "../services/taskService";

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
      <main className="flex-1 overflow-x-auto overflow-y-hidden bg-background p-lg custom-scrollbar h-full">
        <div className="flex flex-col h-full gap-lg min-w-max">
          {/* Board Header */}
          <div className="flex items-center justify-between min-w-[1200px]">
            <div>
              <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">Kanban Board</h1>
              <p className="font-body-md text-on-surface-variant">Core Infrastructure Deployment Pipeline · Sprint 24.2</p>
            </div>
            <div className="flex items-center gap-md">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full border-2 border-background overflow-hidden bg-surface-container">
                  <div className="w-full h-full bg-secondary-container"></div>
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-background overflow-hidden bg-surface-container">
                  <div className="w-full h-full bg-surface-dim"></div>
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-background overflow-hidden bg-surface-container">
                  <div className="w-full h-full bg-surface-variant"></div>
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-background bg-primary-container text-on-primary-container flex items-center justify-center font-label-caps text-[10px]">+4</div>
              </div>
              <button className="flex items-center gap-sm px-md py-sm border border-outline-variant rounded-full text-on-surface font-body-md hover:bg-surface-container-low transition-colors">
                <span className="material-symbols-outlined text-[18px]">filter_list</span>
                Filter
              </button>
              <button className="flex items-center gap-sm px-md py-sm bg-primary text-on-primary rounded-full font-body-md hover:opacity-90 transition-all">
                <span className="material-symbols-outlined text-[18px]">share</span>
                Export
              </button>
            </div>
          </div>

          {/* Kanban Columns */}
          {loading ? (
            <div className="flex items-center justify-center h-full w-full">
              <span className="font-label-caps text-on-surface-variant text-label-caps uppercase">Loading board data...</span>
            </div>
          ) : (
            <KanbanBoard 
              tasks={tasks} 
              setTasks={() => {}} // Local state override not needed since reorder calls loadTasks
              onEdit={handleEdit} 
              onDelete={handleDelete} 
              onStatusChange={handleStatusChange} 
              openCreateModal={openCreateModal} 
            />
          )}
        </div>
      </main>
    </AppLayout>
  );
};

export default KanbanPage;
