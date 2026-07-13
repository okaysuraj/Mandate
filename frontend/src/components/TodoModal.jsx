import { useState, useEffect } from "react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { useAuth } from "../context/AuthContext";
import { useWorkspace } from "../context/WorkspaceContext";
import { useSocket } from "../context/SocketContext";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import { X, Plus, MessageSquare, Paperclip, CheckSquare } from "lucide-react";

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
      setTitle(initialData.title);
      setContent(initialData.content || "");
      setPriority(initialData.priority);
      setStatus(initialData.status);
      setProject(initialData.project || "Inbox");
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
      const { data } = await axios.get(`/api/comments/task/${initialData._id}`);
      setComments(data);
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
      const { data } = await axios.post(`/api/comments/task/${initialData._id}`, { content: newComment });
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
    onSave({ title, content, priority, status, dueDate, project, tags, assignees, subtasks, attachments, recurrenceRule, snoozedUntil });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    setUploading(true);
    try {
      // requires user authentication token in a real scenario
      const { data } = await axios.post("/api/upload", formData, {
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm overflow-y-auto"
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-white dark:bg-[#1A1A1A] w-full max-w-4xl p-8 rounded-xl shadow-2xl flex flex-col md:flex-row gap-8 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex-1 flex flex-col gap-6">
          <div className="mb-4 pb-4 border-b border-[#D9DADC] dark:border-gray-800">
            <h2 className="text-xs font-bold mb-2 text-gray-500 tracking-widest uppercase">Mandate</h2>
            <h2 className="text-3xl font-bold uppercase tracking-tight text-[#1A1A1A] dark:text-white font-['Space_Grotesk']">
              {initialData ? "Edit Task" : "Create Task"}
            </h2>
          </div>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <Input 
              label="Title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
              placeholder="Enter task title"
            />
            
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Description</label>
              <textarea
                className="w-full min-h-[120px] resize-y bg-[#F9F9FB] dark:bg-[#111] border border-[#EDEDF0] dark:border-gray-800 rounded-lg p-3 text-sm focus:outline-none focus:border-[#1A1A1A] dark:focus:border-white transition-colors dark:text-white"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Task details and instructions..."
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Priority</label>
                <select 
                  className="w-full bg-[#F9F9FB] dark:bg-[#111] border border-[#EDEDF0] dark:border-gray-800 rounded-lg p-3 text-sm focus:outline-none dark:text-white"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Project</label>
                <select 
                  className="w-full bg-[#F9F9FB] dark:bg-[#111] border border-[#EDEDF0] dark:border-gray-800 rounded-lg p-3 text-sm focus:outline-none dark:text-white"
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                >
                  <option value="Inbox">Inbox</option>
                  {user?.projects?.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex flex-col gap-2 col-span-2 md:col-span-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Due Date</label>
                <input 
                  type="date"
                  className="w-full bg-[#F9F9FB] dark:bg-[#111] border border-[#EDEDF0] dark:border-gray-800 rounded-lg p-3 text-sm focus:outline-none dark:text-white"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2 col-span-2 md:col-span-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Assignees</label>
                <select 
                  multiple
                  className="w-full bg-[#F9F9FB] dark:bg-[#111] border border-[#EDEDF0] dark:border-gray-800 rounded-lg p-3 text-sm focus:outline-none dark:text-white"
                  value={assignees}
                  onChange={(e) => setAssignees(Array.from(e.target.selectedOptions, option => option.value))}
                >
                  {activeWorkspace?.members?.map(m => (
                    <option key={m.user._id} value={m.user._id}>{m.user.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2 col-span-2 md:col-span-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Recurrence</label>
                <select 
                  className="w-full bg-[#F9F9FB] dark:bg-[#111] border border-[#EDEDF0] dark:border-gray-800 rounded-lg p-3 text-sm focus:outline-none dark:text-white"
                  value={recurrenceRule}
                  onChange={(e) => setRecurrenceRule(e.target.value)}
                >
                  <option value="">None</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              <div className="flex flex-col gap-2 col-span-2 md:col-span-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Snooze Until</label>
                <input 
                  type="date"
                  className="w-full bg-[#F9F9FB] dark:bg-[#111] border border-[#EDEDF0] dark:border-gray-800 rounded-lg p-3 text-sm focus:outline-none dark:text-white"
                  value={snoozedUntil}
                  onChange={(e) => setSnoozedUntil(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Tags</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map(tag => (
                  <span key={tag} className="flex items-center gap-1 bg-gray-200 dark:bg-gray-800 text-xs px-2 py-1 rounded-full">
                    {tag}
                    <button type="button" onClick={() => setTags(tags.filter(t => t !== tag))}><X size={12} /></button>
                  </span>
                ))}
              </div>
              <input 
                type="text"
                placeholder="Type and press enter to add tags"
                className="w-full bg-[#F9F9FB] dark:bg-[#111] border border-[#EDEDF0] dark:border-gray-800 rounded-lg p-3 text-sm focus:outline-none dark:text-white"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={handleAddTag}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Attachments</label>
              <div className="border border-dashed border-[#EDEDF0] dark:border-gray-800 rounded-lg p-4 flex flex-col items-center justify-center gap-2">
                <Paperclip size={24} className="text-gray-400" />
                <label className="cursor-pointer text-sm text-primary hover:underline">
                  {uploading ? "Uploading..." : "Click to upload file"}
                  <input type="file" className="hidden" onChange={handleFileUpload} disabled={uploading} />
                </label>
              </div>
              {attachments.length > 0 && (
                <div className="flex flex-col gap-1 mt-2">
                  {attachments.map((att, i) => (
                    <div key={i} className="text-xs flex justify-between bg-gray-100 dark:bg-gray-800 p-2 rounded">
                      <a href={`http://localhost:5001${att.url}`} target="_blank" rel="noreferrer" className="text-blue-500 underline truncate">{att.name}</a>
                      <button type="button" onClick={() => setAttachments(attachments.filter((_, idx) => idx !== i))}><X size={12}/></button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-4 mt-4">
              <Button variant="secondary" type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                {initialData ? "Save Changes" : "Create Task"}
              </Button>
            </div>
          </form>
        </div>

        {/* Sidebar for Subtasks and Comments */}
        {initialData && (
          <div className="w-full md:w-80 shrink-0 border-l border-[#D9DADC] dark:border-gray-800 pl-8 flex flex-col gap-8">
            {/* Subtasks */}
            <div>
              <h3 className="text-xs font-bold mb-4 flex items-center gap-2 uppercase tracking-widest dark:text-white">
                <CheckSquare size={16} /> Subtasks
              </h3>
              <div className="flex flex-col gap-2 mb-4">
                {subtasks.map((st, idx) => (
                  <div key={idx} className="flex items-center gap-2 group">
                    <input 
                      type="checkbox" 
                      checked={st.isCompleted} 
                      onChange={() => handleToggleSubtask(idx)}
                      className="rounded border-gray-300"
                    />
                    <span className={`text-sm flex-1 dark:text-white ${st.isCompleted ? 'line-through text-gray-400' : ''}`}>{st.title}</span>
                    <button onClick={() => handleRemoveSubtask(idx)} className="opacity-0 group-hover:opacity-100 text-red-500"><X size={14} /></button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={newSubtask} 
                  onChange={(e) => setNewSubtask(e.target.value)} 
                  placeholder="New subtask..."
                  className="flex-1 bg-[#F9F9FB] dark:bg-[#111] border border-[#EDEDF0] dark:border-gray-800 rounded px-2 py-1 text-sm dark:text-white focus:outline-none"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddSubtask()}
                />
                <Button type="button" variant="secondary" onClick={handleAddSubtask} className="px-3 py-1"><Plus size={16} /></Button>
              </div>
            </div>

            {/* Comments */}
            <div className="flex-1 flex flex-col min-h-[300px]">
              <h3 className="text-xs font-bold mb-4 flex items-center gap-2 uppercase tracking-widest dark:text-white">
                <MessageSquare size={16} /> Comments
              </h3>
              <div className="flex-1 overflow-y-auto flex flex-col gap-4 mb-4 pr-2">
                {comments.length === 0 ? (
                  <p className="text-xs text-gray-500">No comments yet.</p>
                ) : (
                  comments.map(c => (
                    <div key={c._id} className="bg-[#F9F9FB] dark:bg-[#111] p-3 rounded-lg border border-[#EDEDF0] dark:border-gray-800">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-bold dark:text-white">{c.user.name}</span>
                        <span className="text-[10px] text-gray-500">{new Date(c.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-sm dark:text-gray-300">{c.content}</p>
                    </div>
                  ))
                )}
              </div>
              <form onSubmit={handleAddComment} className="mt-auto">
                <textarea 
                  className="w-full bg-[#F9F9FB] dark:bg-[#111] border border-[#EDEDF0] dark:border-gray-800 rounded-lg p-2 text-sm focus:outline-none dark:text-white mb-2"
                  rows="2"
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <Button type="submit" className="w-full text-xs">Post Comment</Button>
              </form>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default TodoModal;
