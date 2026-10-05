import React, { createContext, useContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import { useAuth } from "./AuthContext";
import api from "../services/api";

const WorkspaceContext = createContext();

export const useWorkspace = () => useContext(WorkspaceContext);

export const WorkspaceProvider = ({ children }) => {
  const { user, updateUser } = useAuth();
  const [workspaces, setWorkspaces] = useState([]);
  const [activeWorkspace, setActiveWorkspace] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchWorkspaces();
    } else {
      setWorkspaces([]);
      setActiveWorkspace(null);
      setLoading(false);
    }
  }, [user]);

  const fetchWorkspaces = async () => {
    try {
      const { data } = await api.get("/workspaces");
      setWorkspaces(data || []);

      if (user?.activeWorkspace) {
        const active = (data || []).find((w) => w._id === user.activeWorkspace);
        setActiveWorkspace(active || data?.[0] || null);
      } else if (data?.length > 0) {
        setActiveWorkspace(data[0]);
      }
    } catch (error) {
      console.error("Failed to fetch workspaces", error);
    } finally {
      setLoading(false);
    }
  };

  const createWorkspace = async (name) => {
    try {
      const { data } = await api.post("/workspaces", { name });
      setWorkspaces([...workspaces, data]);
      Alert.alert("Success", "Workspace created");
      return data;
    } catch (error) {
      Alert.alert("Error", error.response?.data?.message || "Failed to create workspace");
      throw error;
    }
  };

  const switchWorkspace = async (id) => {
    try {
      const { data } = await api.put(`/workspaces/${id}/active`);
      const newActive = workspaces.find((w) => w._id === data.activeWorkspace);
      if (newActive) setActiveWorkspace(newActive);
      await updateUser({ activeWorkspace: data.activeWorkspace });
      Alert.alert("Success", `Switched to ${newActive?.name || "workspace"}`);
    } catch (error) {
      Alert.alert("Error", error.response?.data?.message || "Failed to switch workspace");
    }
  };

  return (
    <WorkspaceContext.Provider
      value={{ workspaces, activeWorkspace, loading, createWorkspace, switchWorkspace, fetchWorkspaces }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};
