import api from '../lib/axios';

export const getTasks = async (params) => {
  const { data } = await api.get('/tasks', { params });
  return data;
};

export const getTaskById = async (id) => {
  const { data } = await api.get(`/tasks/${id}`);
  return data;
};

export const createTask = async (taskData) => {
  const { data } = await api.post('/tasks', taskData);
  return data;
};

export const updateTask = async (id, taskData) => {
  const { data } = await api.put(`/tasks/${id}`, taskData);
  return data;
};

export const deleteTask = async (id) => {
  const { data } = await api.delete(`/tasks/${id}`);
  return data;
};

export const addComment = async (taskId, commentData) => {
  const { data } = await api.post(`/comments`, { ...commentData, targetId: taskId, targetType: 'Task' });
  return data;
};

export const getCommentsForTask = async (taskId) => {
  const { data } = await api.get(`/comments`, { params: { targetId: taskId, targetType: 'Task' } });
  return data;
};
