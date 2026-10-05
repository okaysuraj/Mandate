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
      const response = await getTasks({ limit: 200 });
      const rawTasks = Array.isArray(response) 
        ? response 
        : (Array.isArray(response?.data) ? response.data : (Array.isArray(response?.tasks) ? response.tasks : []));
      set({ tasks: rawTasks, loading: false });
    } catch (error) {
      console.error("Failed to load tasks", error);
      set({ tasks: [], loading: false });
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

  reorderTasks: (newTasks) => {
    set({ tasks: newTasks });
  },

  moveTask: async (taskId, newStatus) => {
    // Optimistic UI update
    const previousTasks = get().tasks;
    set((state) => ({
      tasks: state.tasks.map(t => (t._id === taskId || t.id === taskId) ? { ...t, status: newStatus } : t)
    }));
    
    // Background sync
    try {
      // Skip backend network call for client-side demo tasks
      if (String(taskId).startsWith("650a1111") || String(taskId).startsWith("demo-") || String(taskId).startsWith("task-")) {
        return;
      }
      await updateTask(taskId, { status: newStatus });
    } catch (error) {
      // Revert on error
      set({ tasks: previousTasks });
      throw error;
    }
  }
}));
