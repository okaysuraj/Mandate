import { useState, useEffect } from "react";
import { Button } from "./Button";
import { Input } from "./Input";
import { useAuth } from "../../context/AuthContext";
import { useWorkspace } from "../../context/WorkspaceContext";
import { useSocket } from "../../context/SocketContext";
import { motion } from "framer-motion";
import api from "../../lib/axios";
import { getCommentsForTask, addComment } from "../../services/taskService";
import toast from "react-hot-toast";
import { X, Plus, MessageSquare, Paperclip, CheckSquare, Square } from "lucide-react";

const TodoModal = ({ isOpen, onClose, onSave, initialData = null }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState("medium");
  const [status, setStatus] = useState("pending");
  const [dueDate, setDueDate] = useState("");
  const [project, setProject] = useState("Inbox");
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [assignees, setAssignees] = useState([]);
  const [subtasks, setSubtasks] = useState([]);
  const [newSubtask, setNewSubtask] = useState("");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [recurrenceRule, setRecurrenceRule] = useState("");
  const [snoozedUntil, setSnoozedUntil] = useState("");
  const [uploading, setUploading] = useState(false);

  const { user } = useAuth();
  const { activeWorkspace } = useWorkspace();
  const { socket } = useSocket();

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setContent(initialData.description || initialData.content || "");
      setPriority(initialData.priority || "medium");
      setStatus(initialData.status || "pending");
      setProject(initialData.project || (initialData.projectId ? (typeof initialData.projectId === 'object' ? initialData.projectId.name : initialData.projectId) : "Inbox"));
      setDueDate(initialData.dueDate ? new Date(initialData.dueDate).toISOString().split('T')[0] : "");
      setTags(initialData.tags || []);
      setAssignees(initialData.assignees || []);
      setSubtasks(initialData.subtasks || []);
      setAttachments(initialData.attachments || []);
      setRecurrenceRule(initialData.recurrenceRule || "");
      setSnoozedUntil(initialData.snoozedUntil ? new Date(initialData.snoozedUntil).toISOString().split('T')[0] : "");
      fetchComments();
    } else {
      setTitle("");
      setContent("");
      setPriority("medium");
      setStatus("pending");
      setProject("Inbox");
      setDueDate("");
      setTags([]);
      setAssignees([]);
      setSubtasks([]);
      setComments([]);
      setAttachments([]);
      setRecurrenceRule("");
      setSnoozedUntil("");
    }
  }, [initialData, isOpen]);

  const fetchComments = async () => {
    if (!initialData?._id) return;
    try {
      const data = await getCommentsForTask(initialData._id);
      setComments(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch comments", error);
    }
  };

  useEffect(() => {
    if (!socket || !initialData) return;

    const handleCommentCreated = (newComment) => {
      if (newComment.todoId === initialData._id) {
        setComments((prev) => [newComment, ...prev]);
      }
    };

    const handleCommentDeleted = ({ commentId, todoId }) => {
      if (todoId === initialData._id) {
        setComments((prev) => prev.filter(c => c._id !== commentId));
      }
    };

    socket.on("comment_created", handleCommentCreated);
    socket.on("comment_deleted", handleCommentDeleted);

    return () => {
      socket.off("comment_created", handleCommentCreated);
      socket.off("comment_deleted", handleCommentDeleted);
    };
  }, [socket, initialData]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !initialData) return;
    try {
      const data = await addComment(initialData._id, { content: newComment });
      setComments([data, ...comments]);
      setNewComment("");
    } catch (error) {
      toast.error("Failed to add comment");
    }
  };

  const handleAddSubtask = () => {
    if (!newSubtask.trim()) return;
    setSubtasks([...subtasks, { title: newSubtask, isCompleted: false }]);
    setNewSubtask("");
  };

  const handleToggleSubtask = (idx) => {
    const updated = [...subtasks];
    updated[idx].isCompleted = !updated[idx].isCompleted;
    setSubtasks(updated);
  };

  const handleRemoveSubtask = (idx) => {
    setSubtasks(subtasks.filter((_, i) => i !== idx));
  };

  const handleAddTag = (e) => {
    if (e.key === "Enter" && newTag.trim()) {
      e.preventDefault();
      if (!tags.includes(newTag.trim())) {
        setTags([...tags, newTag.trim()]);
      }
      setNewTag("");
    }
  };

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      title,
      description: content,
      content,
      priority,
      status,
      dueDate,
      project,
      tags,
      assignees,
      subtasks,
      attachments,
      recurrenceRule,
      snoozedUntil,
      workspaceId: activeWorkspace?._id || user?.activeWorkspace
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    setUploading(true);
    try {
      const { data } = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setAttachments([...attachments, data]);
      toast.success("File uploaded");
    } catch (error) {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-sm overflow-y-auto"
    >
      <motion.div 
        initial={{ scale: 0.98, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.98, opacity: 0, y: 30 }}
        className="bg-surface-container-lowest border border-outline-variant w-full max-w-4xl p-4 sm:p-6 md:p-8 rounded-t-2xl sm:rounded-xl shadow-2xl flex flex-col md:flex-row gap-6 max-h-[92vh] overflow-y-auto text-on-surface"
      >
        <div className="flex-1 flex flex-col gap-5">
          <div className="flex justify-between items-start pb-3 border-b border-outline-variant">
            <div>
              <h2 className="text-[10px] font-mono font-bold text-outline tracking-widest uppercase">MANDATE PROTOCOL</h2>
              <h2 className="text-xl md:text-2xl font-mono font-black uppercase tracking-tight text-primary">
                {initialData ? "Edit Directive" : "Initiate Directive"}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full border border-outline-variant hover:border-primary flex items-center justify-center text-on-surface transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input 
              label="Directive Title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
              placeholder="Enter directive title..."
            />
            
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono font-bold text-outline uppercase tracking-widest">Description & Requirements</label>
              <textarea
                className="w-full min-h-[100px] resize-y bg-surface-container-low border border-outline-variant rounded-md p-2.5 text-xs text-on-surface focus:outline-none focus:border-primary font-body-md"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Operational instructions, scope, criteria..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono font-bold text-outline uppercase tracking-widest">Priority</label>
                <select 
                  className="w-full bg-surface-container-low border border-outline-variant rounded-md p-2 text-xs font-mono uppercase text-on-surface focus:outline-none focus:border-primary"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono font-bold text-outline uppercase tracking-widest">Project Cluster</label>
                <select 
                  className="w-full bg-surface-container-low border border-outline-variant rounded-md p-2 text-xs font-mono uppercase text-on-surface focus:outline-none focus:border-primary"
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                >
                  <option value="Inbox">Inbox</option>
                  {user?.projects?.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono font-bold text-outline uppercase tracking-widest">Execution Date</label>
                <input 
                  type="date"
                  className="w-full bg-surface-container-low border border-outline-variant rounded-md p-2 text-xs font-mono text-on-surface focus:outline-none focus:border-primary"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono font-bold text-outline uppercase tracking-widest">Recurrence</label>
                <select 
                  className="w-full bg-surface-container-low border border-outline-variant rounded-md p-2 text-xs font-mono uppercase text-on-surface focus:outline-none focus:border-primary"
                  value={recurrenceRule}
                  onChange={(e) => setRecurrenceRule(e.target.value)}
                >
                  <option value="">None (Single)</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-widest">Classification Tags</label>
              <div className="flex flex-wrap gap-1.5 mb-1">
                {tags.map(tag => (
                  <span key={tag} className="flex items-center gap-1.5 bg-surface-container text-xs font-mono px-2.5 py-1 rounded-full border border-outline-variant">
                    #{tag}
                    <button type="button" onClick={() => setTags(tags.filter(t => t !== tag))} className="text-on-surface-variant hover:text-error cursor-pointer">
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
              <input 
                type="text" 
                placeholder="Type and press enter to add tag"
                className="w-full bg-surface-container-low border border-outline-variant rounded-xl p-2.5 text-xs font-mono text-on-surface focus:outline-none focus:border-primary transition-colors"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={handleAddTag}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-widest">Attachments</label>
              <div className="border-2 border-dashed border-outline-variant/60 rounded-xl p-4 flex flex-col items-center justify-center gap-1.5 bg-surface-container-low/40 hover:bg-surface-container-low transition-colors">
                <Paperclip size={20} className="text-primary" />
                <label className="cursor-pointer text-xs font-mono uppercase font-bold text-primary hover:underline">
                  {uploading ? "Uploading payload..." : "Attach File"}
                  <input type="file" className="hidden" onChange={handleFileUpload} disabled={uploading} />
                </label>
              </div>
              {attachments.length > 0 && (
                <div className="flex flex-col gap-1.5 mt-1">
                  {attachments.map((att, i) => {
                    const fileUrl = att.url?.startsWith("http")
                      ? att.url
                      : `${(import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "")}${att.url?.startsWith("/") ? "" : "/"}${att.url}`;
                    return (
                      <div key={i} className="text-xs flex justify-between bg-surface-container p-2.5 rounded-xl border border-outline-variant/60">
                        <a href={fileUrl} target="_blank" rel="noreferrer" className="text-primary underline truncate font-mono">{att.name}</a>
                        <button type="button" onClick={() => setAttachments(attachments.filter((_, idx) => idx !== i))} className="text-on-surface-variant hover:text-error cursor-pointer"><X size={12}/></button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 mt-2 pt-3 border-t border-outline-variant">
              <Button variant="secondary" type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                {initialData ? "Save Changes" : "Deploy Directive"}
              </Button>
            </div>
          </form>
        </div>

        {/* Sidebar for Subtasks and Comments */}
        {initialData && (
          <div className="w-full md:w-80 shrink-0 border-t md:border-t-0 md:border-l-2 border-outline-variant pt-4 md:pt-0 md:pl-6 flex flex-col gap-6">
            {/* Subtasks */}
            <div>
              <h3 className="text-xs font-mono font-bold mb-3 flex items-center gap-1.5 uppercase tracking-wider text-primary">
                <CheckSquare size={14} /> Sub-Directives
              </h3>
              <div className="flex flex-col gap-1.5 mb-3 max-h-40 overflow-y-auto custom-scrollbar">
                {subtasks.map((st, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-1.5 bg-surface-container border border-outline-variant rounded-md group">
                    <button 
                      type="button" 
                      onClick={() => handleToggleSubtask(idx)}
                      className="text-on-surface hover:text-primary cursor-pointer"
                    >
                      {st.isCompleted ? <CheckSquare size={14} className="text-on-tertiary-container" /> : <Square size={14} />}
                    </button>
                    <span className={`text-xs flex-1 font-mono ${st.isCompleted ? 'line-through text-outline' : 'text-on-surface'}`}>{st.title}</span>
                    <button onClick={() => handleRemoveSubtask(idx)} className="opacity-0 group-hover:opacity-100 text-outline hover:text-error cursor-pointer"><X size={13} /></button>
                  </div>
                ))}
              </div>
              <div className="flex gap-1.5">
                <input 
                  type="text" 
                  value={newSubtask} 
                  onChange={(e) => setNewSubtask(e.target.value)} 
                  placeholder="New subtask..."
                  className="flex-1 bg-surface-container-low border border-outline-variant rounded-md px-2 py-1 text-xs font-mono text-on-surface focus:outline-none focus:border-primary"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddSubtask()}
                />
                <Button type="button" variant="secondary" onClick={handleAddSubtask} className="px-2.5 py-1 rounded-md"><Plus size={14} /></Button>
              </div>
            </div>

            {/* Comments */}
            <div className="flex-1 flex flex-col min-h-[220px]">
              <h3 className="text-xs font-mono font-bold mb-3 flex items-center gap-1.5 uppercase tracking-wider text-primary">
                <MessageSquare size={14} /> Mission Notes
              </h3>
              <div className="flex-1 overflow-y-auto flex flex-col gap-2 mb-3 max-h-44 custom-scrollbar">
                {comments.length === 0 ? (
                  <p className="text-xs text-outline font-mono">No telemetry or notes yet.</p>
                ) : (
                  comments.map(c => (
                    <div key={c._id} className="bg-surface-container p-2.5 rounded-md border border-outline-variant">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] font-mono font-bold text-primary uppercase">{c.user?.name || "Operative"}</span>
                        <span className="text-[9px] font-mono text-outline">{new Date(c.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-xs text-on-surface-variant font-body-md">{c.content}</p>
                    </div>
                  ))
                )}
              </div>
              <form onSubmit={handleAddComment} className="mt-auto">
                <textarea 
                  className="w-full bg-surface-container-low border border-outline-variant rounded-md p-2 text-xs font-body-md text-on-surface focus:outline-none focus:border-primary mb-1.5"
                  rows="2"
                  placeholder="Record comment or log..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <Button type="submit" className="w-full text-xs py-2 rounded-md">Submit Note</Button>
              </form>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default TodoModal;
