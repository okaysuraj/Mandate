import axios from "axios";
import { API_URL } from "../config";

export const fetchTasks = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/api/tasks`, {
      params: { page: 1, limit: 100 },
    });
    // The backend might return data.data for pagination
    const tasks = data.data || data;
    return { data: tasks, error: null };
  } catch (error) {
    console.error("fetchTasks Error", error);
    return { data: null, error };
  }
};

export const createTask = async (taskData) => {
  try {
    const { data } = await axios.post(`${API_URL}/api/tasks`, taskData);
    return { data, error: null };
  } catch (error) {
    console.error("createTask Error", error);
    return { data: null, error };
  }
};

export const updateTaskStatus = async (taskId, newStatus) => {
  try {
    const { data } = await axios.put(`${API_URL}/api/tasks/${taskId}`, { status: newStatus });
    return { data, error: null };
  } catch (error) {
    console.error("updateTaskStatus Error", error);
    return { data: null, error };
  }
};
