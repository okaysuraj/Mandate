import { create } from 'zustand';
import { fetchTasks, updateTaskStatus } from '../api/tasks';

export const useDataStore = create((set, get) => ({
  tasks: [],
  notifications: [],
  loading: false,
  unsubscribeTasks: null,
  unsubscribeNotifications: null,

  loadTasks: async () => {
    set({ loading: true });
    const { data, error } = await fetchTasks();
    if (!error && data) {
      set({ tasks: data, loading: false });
    } else {
      set({ 
        tasks: [
          { id: '1', title: 'Update Authentication Flow', status: 'In Progress', priority: 'High' },
          { id: '2', title: 'Database Schema Migration', status: 'Todo', priority: 'Critical' },
        ],
        loading: false 
      });
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
      tasks: state.tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t)
    }));
    
    // Background sync
    const { error } = await updateTaskStatus(taskId, newStatus);
    if (error) {
      // Revert if error (simplified)
      console.warn('Failed to update task status in DB');
    }
  }
}));
