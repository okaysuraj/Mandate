import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast";

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
      const { data } = await axios.get("/api/workspaces");
      setWorkspaces(data);
      
      if (user.activeWorkspace) {
        const active = data.find(w => w._id === user.activeWorkspace);
        setActiveWorkspace(active || data[0]);
      } else if (data.length > 0) {
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
      const { data } = await axios.post("/api/workspaces", { name });
      setWorkspaces([...workspaces, data]);
      toast.success("Workspace created");
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create workspace");
      throw error;
    }
  };

  const switchWorkspace = async (id) => {
    try {
      const { data } = await axios.put(`/api/workspaces/${id}/active`);
      const newActive = workspaces.find(w => w._id === data.activeWorkspace);
      setActiveWorkspace(newActive);
      updateUser({ activeWorkspace: data.activeWorkspace });
      toast.success(`Switched to ${newActive.name}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to switch workspace");
    }
  };

  return (
    <WorkspaceContext.Provider value={{ workspaces, activeWorkspace, loading, createWorkspace, switchWorkspace, fetchWorkspaces }}>
      {children}
    </WorkspaceContext.Provider>
  );
};
