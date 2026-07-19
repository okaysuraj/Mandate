import { create } from 'zustand';
import { getTasks, updateTask } from '../services/taskService';

export const useDataStore = create((set, get) => ({
  tasks: [],
  notifications: [],
  loading: false,
  unsubscribeTasks: null,
  unsubscribeNotifications: null,

  loadTasks: async () => {
    set({ loading: true });
    try {
      const data = await getTasks();
      set({ tasks: data || [], loading: false });
    } catch (error) {
      console.error("Failed to load tasks", error);
      set({ loading: false });
    }
  },

  subscribeToSocket: (socket) => {
    if (!socket) return;
    
    const handleCreated = (t) => set((state) => ({ tasks: [t, ...state.tasks] }));
    const handleUpdated = (t) => set((state) => ({ 
      tasks: state.tasks.map((x) => (x._id === t._id ? t : x)) 
    }));
    const handleDeleted = (id) => set((state) => ({ 
      tasks: state.tasks.filter((x) => x._id !== id) 
    }));

    // Notification handlers could go here too

    socket.on("task:created", handleCreated);
    socket.on("task:updated", handleUpdated);
    socket.on("task:deleted", handleDeleted);

    return () => {
      socket.off("task:created", handleCreated);
      socket.off("task:updated", handleUpdated);
      socket.off("task:deleted", handleDeleted);
    };
  },

  moveTask: async (taskId, newStatus) => {
    // Optimistic UI update
    set((state) => ({
      tasks: state.tasks.map(t => t._id === taskId ? { ...t, status: newStatus } : t)
    }));
    
    // Background sync
    try {
      await updateTask(taskId, { status: newStatus });
    } catch (error) {
      // Revert if error (simplified)
      console.warn('Failed to update task status in DB');
    }
  }
}));
