import { createContext, useContext, useState, useEffect } from "react";
import { getWorkspaces, createWorkspace as apiCreateWorkspace, switchActiveWorkspace } from "../services/workspaceService";
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
      const data = await getWorkspaces();
      setWorkspaces(Array.isArray(data) ? data : []);
      
      if (user.activeWorkspace) {
        const active = (Array.isArray(data) ? data : []).find(w => w._id === user.activeWorkspace);
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
      const data = await apiCreateWorkspace({ name });
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
      const data = await switchActiveWorkspace(id);
      const newActive = workspaces.find(w => w._id === data.activeWorkspace);
      setActiveWorkspace(newActive);
      updateUser({ activeWorkspace: data.activeWorkspace });
      toast.success(`Switched to ${newActive?.name || 'workspace'}`);
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
