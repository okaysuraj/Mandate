import toast from "react-hot-toast";
import { useState, useRef, useEffect } from "react";
import { useWorkspace } from "../../context/WorkspaceContext";
import { ChevronDown, Building, Plus } from "lucide-react";
import { Button } from "./Button";

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
    try{await createWorkspace(newWorkspaceName);}catch(error){toast.error(error.response?.data?.message||'Could not create workspace');return;}
    setNewWorkspaceName("");
    setIsCreating(false);
  };

  if (loading) return <div className="w-32 h-9 bg-surface-container animate-pulse rounded-xl border border-outline-variant/60"></div>;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-surface-container-lowest hover:bg-surface-container rounded-xl transition-all border border-outline-variant hover:border-primary text-on-surface cursor-pointer shadow-xs"
      >
        <Building size={14} className="text-primary" />
        <span className="text-xs font-mono font-bold max-w-[120px] truncate uppercase">
          {activeWorkspace?.name || "Workspace"}
        </span>
        <ChevronDown size={14} className="text-on-surface-variant" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-surface-container-lowest border border-outline-variant/80 rounded-2xl shadow-2xl overflow-hidden z-50">
          <div className="p-3 border-b border-outline-variant/40 bg-surface-container-low">
            <p className="text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-widest px-1 mb-1.5">
              Active Workspaces
            </p>
            <div className="max-h-48 overflow-y-auto space-y-1 custom-scrollbar">
              {workspaces.map((ws) => (
                <button
                  key={ws._id}
                  onClick={async () => {
                    try{await switchWorkspace(ws._id);}catch(error){toast.error(error.response?.data?.message||'Could not switch workspace');return;}
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs font-mono uppercase rounded-xl flex items-center justify-between border transition-all cursor-pointer ${
                    activeWorkspace?._id === ws._id
                      ? "bg-primary text-on-primary border-primary font-bold shadow-xs"
                      : "border-transparent text-on-surface hover:bg-surface-container"
                  }`}
                >
                  <span className="truncate">{ws.name}</span>
                  {activeWorkspace?._id === ws._id && (
                    <span className="w-2 h-2 rounded-full bg-on-primary"></span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 bg-surface-container-lowest">
            {isCreating ? (
              <form onSubmit={handleCreate} className="flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="New workspace title..."
                  className="w-full text-xs font-mono px-3 py-2 border border-outline-variant rounded-xl bg-surface-container-low text-on-surface focus:outline-none focus:border-primary transition-colors"
                  value={newWorkspaceName}
                  onChange={(e) => setNewWorkspaceName(e.target.value)}
                  autoFocus
                />
                <div className="flex gap-2">
                  <Button type="button" variant="ghost" className="flex-1 text-[10px] py-1.5 rounded-lg" onClick={() => setIsCreating(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1 text-[10px] py-1.5 rounded-lg">
                    Create
                  </Button>
                </div>
              </form>
            ) : (
              <button
                onClick={() => setIsCreating(true)}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-mono uppercase text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-xl transition-all border border-transparent hover:border-outline-variant cursor-pointer"
              >
                <Plus size={14} />
                <span>Create Cluster</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkspaceSwitcher;
