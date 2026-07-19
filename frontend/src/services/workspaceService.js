import api from '../lib/axios';

export const getWorkspaces = async () => {
  const { data } = await api.get('/workspaces');
  return data;
};

export const getWorkspaceById = async (id) => {
  const { data } = await api.get(`/workspaces/${id}`);
  return data;
};

export const createWorkspace = async (workspaceData) => {
  const { data } = await api.post('/workspaces', workspaceData);
  return data;
};

export const updateWorkspace = async (id, workspaceData) => {
  const { data } = await api.put(`/workspaces/${id}`, workspaceData);
  return data;
};
