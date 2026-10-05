import { create } from 'zustand';
import { getTasks, updateTask } from '../services/taskService';
import api from '../services/api';

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

  loadNotifications: async () => {
    try {
      const res = await api.get('/notifications');
      set({ notifications: res.data || [] });
    } catch (error) {
      console.warn('Failed to load notifications', error);
    }
  },

  markNotificationRead: async (id) => {
    set((state) => ({
      notifications: state.notifications.map((n) => (n._id === id || n.id === id) ? { ...n, isRead: true } : n)
    }));
    try {
      await api.patch(`/notifications/${id}/read`);
    } catch (e) {
      console.warn('Failed to mark notification read', e);
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
    const handleNotification = (n) => set((state) => ({ notifications: [n, ...state.notifications] }));

    socket.on("task:created", handleCreated);
    socket.on("task:updated", handleUpdated);
    socket.on("task:deleted", handleDeleted);
    socket.on("notification:created", handleNotification);

    return () => {
      socket.off("task:created", handleCreated);
      socket.off("task:updated", handleUpdated);
      socket.off("task:deleted", handleDeleted);
      socket.off("notification:created", handleNotification);
    };
  },

  moveTask: async (taskId, newStatus) => {
    const prevTasks = get().tasks;
    // Optimistic UI update
    set({
      tasks: prevTasks.map(t => (t._id === taskId || t.id === taskId) ? { ...t, status: newStatus } : t)
    });
    
    // Background sync with rollback on failure
    try {
      await updateTask(taskId, { status: newStatus });
    } catch (error) {
      console.warn('Failed to update task status in DB, reverting state');
      set({ tasks: prevTasks });
    }
  }
}));
