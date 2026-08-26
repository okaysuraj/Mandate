import api from './api';

export const getGoals = async (params) => {
  const { data } = await api.get('/goals', { params });
  return data;
};

export const getGoalById = async (id) => {
  const { data } = await api.get(`/goals/${id}`);
  return data;
};

export const createGoal = async (goalData) => {
  const { data } = await api.post('/goals', goalData);
  return data;
};

export const updateGoal = async (id, goalData) => {
  const { data } = await api.put(`/goals/${id}`, goalData);
  return data;
};

export const deleteGoal = async (id) => {
  const { data } = await api.delete(`/goals/${id}`);
  return data;
};
