import { create } from 'zustand';
import { getTasks, updateTask } from '../services/taskService';
import api from '../services/api';

const normalizeTaskList = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.tasks)) return data.tasks;
  return [];
};

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
      const rawTasks = normalizeTaskList(response);
      set({ tasks: rawTasks, loading: false });
    } catch (error) {
      console.error("Failed to load tasks", error);
      set({ tasks: [], loading: false });
    }
  },

  loadNotifications: async () => {
    try {
      const res = await api.get('/notifications');
      const list = normalizeTaskList(res?.data);
      set({ notifications: list });
    } catch (error) {
      console.warn('Failed to load notifications', error);
      set({ notifications: [] });
    }
  },

  markNotificationRead: async (id) => {
    set((state) => {
      const current = Array.isArray(state.notifications) ? state.notifications : [];
      return {
        notifications: current.map((n) => ((n._id === id || n.id === id) ? { ...n, isRead: true } : n))
      };
    });
    try {
      await api.patch(`/notifications/${id}/read`);
    } catch (e) {
      console.warn('Failed to mark notification read', e);
    }
  },

  subscribeToSocket: (socket) => {
    if (!socket || typeof socket.on !== "function") return;
    
    const handleCreated = (t) => set((state) => {
      const current = normalizeTaskList(state.tasks);
      return { tasks: [t, ...current] };
    });
    const handleUpdated = (t) => set((state) => {
      const current = normalizeTaskList(state.tasks);
      return { tasks: current.map((x) => ((x._id === t._id || x.id === t.id) ? t : x)) };
    });
    const handleDeleted = (id) => set((state) => {
      const current = normalizeTaskList(state.tasks);
      return { tasks: current.filter((x) => (x._id !== id && x.id !== id)) };
    });
    const handleNotification = (n) => set((state) => {
      const current = Array.isArray(state.notifications) ? state.notifications : [];
      return { notifications: [n, ...current] };
    });

    socket.on("task:created", handleCreated);
    socket.on("task:updated", handleUpdated);
    socket.on("task:deleted", handleDeleted);
    socket.on("notification:created", handleNotification);

    return () => {
      if (typeof socket.off === "function") {
        socket.off("task:created", handleCreated);
        socket.off("task:updated", handleUpdated);
        socket.off("task:deleted", handleDeleted);
        socket.off("notification:created", handleNotification);
      }
    };
  },

  moveTask: async (taskId, newStatus) => {
    const prevTasks = normalizeTaskList(get().tasks);
    // Optimistic UI update
    set({
      tasks: prevTasks.map(t => ((t._id === taskId || t.id === taskId) ? { ...t, status: newStatus } : t))
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
