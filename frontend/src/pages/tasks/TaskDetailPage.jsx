import React, { useState, useEffect } from "react";
import AppLayout from "../../components/layout/AppLayout";
import { useParams, useNavigate } from "react-router";
import { getTaskById, updateTask, deleteTask, getCommentsForTask, addComment, createTask, getTasks } from "../../services/taskService";
import toast from "react-hot-toast";

const TaskDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Editable fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  
  // Subtasks & Comments
  const [subtasks, setSubtasks] = useState([]);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState("");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [postingComment, setPostingComment] = useState(false);

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        setLoading(true);
        const data = await getTaskById(id);
        const t = data.data || data;
        setTask(t);
        setTitle(t.title || "");
        setDescription(t.description || t.content || "");
        setStatus(t.status || "pending");
        setPriority(t.priority || "medium");
        setDueDate(t.dueDate ? new Date(t.dueDate).toISOString().split("T")[0] : "");

        // Fetch subtasks
        try {
          const subtaskRes = await getTasks({ parentTaskId: id });
          setSubtasks(subtaskRes.data || (Array.isArray(subtaskRes) ? subtaskRes : []));
        } catch (e) {
          console.warn("Could not load subtasks", e);
        }

        // Fetch comments
        try {
          const commentsRes = await getCommentsForTask(id);
          setComments(Array.isArray(commentsRes) ? commentsRes : []);
        } catch (e) {
          console.warn("Could not load comments", e);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to load task details");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchTaskData();
  }, [id]);

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    try {
      setSaving(true);
      const updated = await updateTask(id, {
        title,
        description,
        status,
        priority,
        dueDate: dueDate ? new Date(dueDate) : null
      });
      setTask(updated);
      toast.success("Mandate updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update mandate");
    } finally {
      setSaving(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    setStatus(newStatus);
    try {
      const updated = await updateTask(id, { status: newStatus });
      setTask(updated);
      toast.success(`Status updated to ${newStatus}`);
    } catch (err) {
      toast.error("Status update failed");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await deleteTask(id);
      toast.success("Task deleted");
      navigate("/tasks");
    } catch (err) {
      toast.error("Failed to delete mandate");
    }
  };

  const handleAddSubtask = async (e) => {
    e.preventDefault();
    if (!newSubtaskTitle.trim()) return;
    try {
      const newSub = await createTask({
        title: newSubtaskTitle.trim(),
        parentTaskId: id,
        workspaceId: task.workspaceId,
        priority: "medium",
        status: "pending"
      });
      setSubtasks([...subtasks, newSub]);
      setNewSubtaskTitle("");
      toast.success("Subtask added");
    } catch (err) {
      toast.error("Failed to add subtask");
    }
  };

  const handleToggleSubtask = async (subtaskId, currentStatus) => {
    const nextStatus = currentStatus === "completed" ? "pending" : "completed";
    try {
      await updateTask(subtaskId, { status: nextStatus });
      setSubtasks(subtasks.map(s => s._id === subtaskId ? { ...s, status: nextStatus } : s));
    } catch (err) {
      toast.error("Failed to toggle subtask");
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      setPostingComment(true);
      const created = await addComment(id, { content: newComment.trim() });
      setComments([created, ...comments]);
      setNewComment("");
      toast.success("Comment posted");
    } catch (err) {
      toast.error("Failed to post comment");
    } finally {
      setPostingComment(false);
    }
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-full font-mono text-sm tracking-widest text-on-surface-variant animate-pulse">
          LOADING TASK DETAILS...
        </div>
      </AppLayout>
    );
  }

  if (!task) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center h-full gap-4">
          <span className="font-mono text-xs font-bold text-red-500 uppercase tracking-widest">TASK NOT FOUND</span>
          <button onClick={() => navigate(-1)} className="px-6 py-2 border border-outline text-primary text-xs font-bold tracking-widest uppercase rounded hover:bg-surface-container-low transition-colors">
            BACK TO DASHBOARD
          </button>
        </div>
      </AppLayout>
    );
  }

  const completedSubtasksCount = subtasks.filter(s => s.status === "completed").length;
  const progressPercent = subtasks.length > 0 
    ? Math.round((completedSubtasksCount / subtasks.length) * 100)
    : (status === "completed" ? 100 : status === "in-progress" ? 50 : 0);

  return (
    <AppLayout>
      <div className="flex-1 flex flex-col gap-6 pb-12 w-full max-w-6xl mx-auto">
        
        {/* Top Header Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-outline-variant pb-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
              <span className="font-mono text-xs px-2.5 py-1 bg-surface-container-high border border-outline-variant text-on-surface font-bold rounded-lg uppercase">
                #MND-{String(task._id).slice(-4).toUpperCase()}
              </span>
              <span className={`text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border ${
                status === "completed" ? "bg-tertiary-container text-on-tertiary-container border-outline-variant" :
                status === "in-progress" ? "bg-surface-container-highest text-primary border-primary" :
                status === "archived" ? "bg-surface-container-high text-on-surface-variant border-outline-variant" :
                "bg-secondary-container text-on-secondary-container border-outline-variant"
              }`}>
                {status}
              </span>
              <span className="text-xs text-on-surface-variant font-mono">
                CREATED: {new Date(task.createdAt || Date.now()).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-on-surface font-sans">
              {title}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button 
              type="button" 
              onClick={handleSave} 
              disabled={saving}
              className="px-5 py-2.5 bg-primary text-on-primary text-xs font-mono font-bold uppercase tracking-wider rounded-lg hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-sm disabled:opacity-50"
            >
              {saving ? "SAVING..." : "SAVE MANDATE"}
            </button>
            <button 
              type="button" 
              onClick={handleDelete} 
              className="px-4 py-2.5 border border-error text-error bg-error-container/30 hover:bg-error-container text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
            >
              DELETE
            </button>
          </div>
        </div>

        {/* Main Grid: Parameters on Left, Subtasks & Comments on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          
          {/* Left Column (7 cols): Parameters & Directives */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Task Details Card */}
            <div className="bg-surface-container-lowest border border-outline-variant p-5 sm:p-6 rounded-xl shadow-sm space-y-4">
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-on-surface-variant">TASK DETAILS</h2>
              
              <div>
                <label className="text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-wider block mb-1.5">TASK TITLE</label>
                <input 
                  type="text" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  className="w-full bg-surface-container-low border border-outline-variant px-3.5 py-2.5 text-sm text-on-surface rounded-lg focus:outline-none focus:border-primary font-sans transition-colors"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-wider block mb-1.5">INSTRUCTIONS & CONTEXT</label>
                <textarea 
                  rows={5} 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  placeholder="Specify operating procedures, criteria for completion, or dependencies..."
                  className="w-full bg-surface-container-low border border-outline-variant p-3.5 text-sm text-on-surface rounded-lg focus:outline-none focus:border-primary font-sans resize-y transition-colors leading-relaxed placeholder:text-on-surface-variant/50"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-1">
                <div>
                  <label className="text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-wider block mb-1.5">STATUS</label>
                  <select 
                    value={status} 
                    onChange={(e) => handleStatusChange(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant px-3 py-2 text-xs font-bold text-on-surface rounded-lg uppercase focus:outline-none focus:border-primary transition-colors cursor-pointer"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In-Progress</option>
                    <option value="completed">Completed</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-wider block mb-1.5">PRIORITY</label>
                  <select 
                    value={priority} 
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant px-3 py-2 text-xs font-bold text-on-surface rounded-lg uppercase focus:outline-none focus:border-primary transition-colors cursor-pointer"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-wider block mb-1.5">TARGET DEADLINE</label>
                  <input 
                    type="date" 
                    value={dueDate} 
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant px-3 py-2 text-xs text-on-surface rounded-lg focus:outline-none focus:border-primary transition-colors cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Operational Progress Bar Card */}
            <div className="bg-surface-container-lowest border border-outline-variant p-5 sm:p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-2.5">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-on-surface-variant">EXECUTION VELOCITY</span>
                <span className="font-mono text-sm font-bold text-on-surface">{progressPercent}%</span>
              </div>
              <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-primary h-full transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="text-[11px] text-on-surface-variant mt-2.5 font-mono">
                {completedSubtasksCount} of {subtasks.length} subtasks completed.
              </p>
            </div>

            {/* Attachments Section */}
            {task.attachments && task.attachments.length > 0 && (
              <div className="bg-surface-container-lowest border border-outline-variant p-5 sm:p-6 rounded-xl shadow-sm space-y-3">
                <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-on-surface-variant">ATTACHED MANIFESTS</h2>
                <div className="space-y-2">
                  {task.attachments.map((att, idx) => {
                    const downloadUrl = att.url?.startsWith("http")
                      ? att.url
                      : `${(import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "")}${att.url?.startsWith("/") ? "" : "/"}${att.url}`;
                    return (
                      <div key={idx} className="flex justify-between items-center bg-surface-container-low border border-outline-variant p-3 rounded-lg">
                        <span className="text-xs font-mono text-on-surface truncate max-w-xs">{att.name}</span>
                        <a 
                          href={downloadUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-xs font-bold font-mono text-primary hover:underline uppercase tracking-wider"
                        >
                          ACCESS FILE
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Column (5 cols): Subtasks & Live Communications */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Subtasks Section */}
            <div className="bg-surface-container-lowest border border-outline-variant p-5 sm:p-6 rounded-xl shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-on-surface-variant">SUBTASK PHASES</h2>
                <span className="text-xs font-mono font-bold text-on-surface">{completedSubtasksCount}/{subtasks.length}</span>
              </div>

              {/* Add Subtask Input */}
              <form onSubmit={handleAddSubtask} className="flex gap-2">
                <input 
                  type="text" 
                  value={newSubtaskTitle} 
                  onChange={(e) => setNewSubtaskTitle(e.target.value)} 
                  placeholder="Append operational subtask..."
                  className="flex-1 bg-surface-container-low border border-outline-variant px-3 py-2 text-xs text-on-surface rounded-lg focus:outline-none focus:border-primary placeholder:text-on-surface-variant/50 transition-colors"
                />
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-primary text-on-primary text-xs font-mono font-bold uppercase tracking-wider rounded-lg hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-sm"
                >
                  ADD
                </button>
              </form>

              {/* Subtasks List */}
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1 custom-scrollbar">
                {subtasks.length === 0 ? (
                  <p className="text-xs text-on-surface-variant font-mono italic">No subtask phases initialized.</p>
                ) : (
                  subtasks.map((sub) => (
                    <div 
                      key={sub._id} 
                      onClick={() => handleToggleSubtask(sub._id, sub.status)}
                      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                        sub.status === "completed" 
                          ? "bg-surface-container-low/60 border-outline-variant/60 opacity-60 line-through" 
                          : "bg-surface-container-low border-outline-variant hover:border-primary"
                      }`}
                    >
                      <input 
                        type="checkbox" 
                        checked={sub.status === "completed"} 
                        onChange={() => {}} 
                        className="rounded cursor-pointer text-primary focus:ring-primary w-4 h-4"
                      />
                      <span className="text-xs font-mono text-on-surface flex-1">{sub.title}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Real Communications / Comments Stream */}
            <div className="bg-surface-container-lowest border border-outline-variant p-5 sm:p-6 rounded-xl shadow-sm space-y-4">
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-on-surface-variant">MISSION LOGS & COMMUNICATIONS</h2>
              
              <form onSubmit={handleAddComment} className="flex flex-col gap-2">
                <textarea 
                  rows={2}
                  value={newComment} 
                  onChange={(e) => setNewComment(e.target.value)} 
                  placeholder="Record an operational log or update..."
                  className="w-full bg-surface-container-low border border-outline-variant p-3 text-xs text-on-surface rounded-lg focus:outline-none focus:border-primary placeholder:text-on-surface-variant/50 transition-colors resize-y"
                />
                <div className="flex justify-end">
                  <button 
                    type="submit" 
                    disabled={postingComment || !newComment.trim()}
                    className="px-4 py-2 bg-primary text-on-primary text-xs font-mono font-bold uppercase tracking-wider rounded-lg hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 cursor-pointer shadow-sm"
                  >
                    {postingComment ? "POSTING..." : "POST COMMENT"}
                  </button>
                </div>
              </form>

              <div className="space-y-3 max-h-80 overflow-y-auto pr-1 custom-scrollbar">
                {comments.length === 0 ? (
                  <p className="text-xs text-on-surface-variant font-mono italic">No comments recorded yet.</p>
                ) : (
                  comments.map((c) => (
                    <div key={c._id} className="bg-surface-container-low border border-outline-variant p-3.5 rounded-lg space-y-1">
                      <div className="flex justify-between items-center text-[10px] text-on-surface-variant font-mono">
                        <span className="font-bold text-on-surface">{c.user?.name || "Team Member"}</span>
                        <span>{new Date(c.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <p className="text-xs text-on-surface font-sans leading-relaxed">{c.content}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </AppLayout>
  );
};

export default TaskDetailPage;
