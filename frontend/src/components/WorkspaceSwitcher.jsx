import { useState, useRef, useEffect } from "react";
import { useWorkspace } from "../context/WorkspaceContext";
import { ChevronDown, Building, Plus } from "lucide-react";
import { Button } from "./ui/Button";

const WorkspaceSwitcher = () => {
  const { workspaces, activeWorkspace, switchWorkspace, createWorkspace, loading } = useWorkspace();
  const [isOpen, setIsOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setIsCreating(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newWorkspaceName.trim()) return;
    await createWorkspace(newWorkspaceName);
    setNewWorkspaceName("");
    setIsCreating(false);
  };

  if (loading) return <div className="w-32 h-8 bg-gray-200 animate-pulse rounded"></div>;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 bg-[#F3F3F5] hover:bg-[#EAEAEB] dark:bg-[#1A1A1A] dark:hover:bg-[#2A2A2A] rounded-md transition-colors border border-[#EDEDF0] dark:border-gray-800"
      >
        <Building size={16} className="text-gray-500" />
        <span className="text-sm font-semibold max-w-[120px] truncate">
          {activeWorkspace?.name || "Select Workspace"}
        </span>
        <ChevronDown size={14} className="text-gray-500" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-[#1A1A1A] border border-[#EDEDF0] dark:border-gray-800 rounded-lg shadow-xl overflow-hidden z-50">
          <div className="p-2 border-b border-[#EDEDF0] dark:border-gray-800">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 mb-2">
              Workspaces
            </p>
            <div className="max-h-48 overflow-y-auto">
              {workspaces.map((ws) => (
                <button
                  key={ws._id}
                  onClick={() => {
                    switchWorkspace(ws._id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-sm rounded-md flex items-center justify-between ${
                    activeWorkspace?._id === ws._id
                      ? "bg-[#1A1A1A] text-white dark:bg-white dark:text-black font-semibold"
                      : "hover:bg-[#F3F3F5] dark:hover:bg-gray-800"
                  }`}
                >
                  {ws.name}
                  {activeWorkspace?._id === ws._id && (
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  )}
                </button>
              ))}
            </div>
          </div>
          
          <div className="p-2 bg-[#F9F9FB] dark:bg-[#111]">
            {isCreating ? (
              <form onSubmit={handleCreate} className="flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="Workspace name..."
                  className="w-full text-sm px-3 py-2 border border-[#EDEDF0] dark:border-gray-800 rounded bg-white dark:bg-black focus:outline-none focus:border-blue-500"
                  value={newWorkspaceName}
                  onChange={(e) => setNewWorkspaceName(e.target.value)}
                  autoFocus
                />
                <div className="flex gap-2">
                  <Button type="button" variant="ghost" className="flex-1 text-xs py-1" onClick={() => setIsCreating(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1 text-xs py-1">
                    Create
                  </Button>
                </div>
              </form>
            ) : (
              <button
                onClick={() => setIsCreating(true)}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-500 hover:text-[#1A1A1A] dark:hover:text-white hover:bg-white dark:hover:bg-gray-800 rounded-md transition-colors"
              >
                <Plus size={16} />
                Create Workspace
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkspaceSwitcher;
