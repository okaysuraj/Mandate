import { useState, useEffect } from "react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import { useWorkspace } from "../context/WorkspaceContext";

const EventModal = ({ isOpen, onClose, initialData = null, onSave }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [attendees, setAttendees] = useState([]);
  
  const { activeWorkspace } = useWorkspace();

  useEffect(() => {
    if (initialData && initialData._id) {
      setTitle(initialData.title);
      setDescription(initialData.description || "");
      setStartTime(new Date(initialData.startTime).toISOString().slice(0, 16));
      setEndTime(new Date(initialData.endTime).toISOString().slice(0, 16));
      setMeetingLink(initialData.meetingLink || "");
      setAttendees(initialData.attendees || []);
    } else if (initialData && initialData.startTime) {
      // Create from clicking a specific day
      setTitle("");
      setDescription("");
      
      const st = new Date(initialData.startTime);
      st.setHours(9, 0, 0, 0); // Default to 9 AM
      setStartTime(st.toISOString().slice(0, 16));
      
      const et = new Date(st.getTime() + 60 * 60000); // 1 hour later
      setEndTime(et.toISOString().slice(0, 16));
      
      setMeetingLink("");
      setAttendees([]);
    } else {
      setTitle("");
      setDescription("");
      const now = new Date();
      now.setMinutes(0, 0, 0);
      setStartTime(now.toISOString().slice(0, 16));
      const later = new Date(now.getTime() + 60 * 60000);
      setEndTime(later.toISOString().slice(0, 16));
      setMeetingLink("");
      setAttendees([]);
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { title, description, startTime, endTime, meetingLink, attendees };
      if (initialData && initialData._id) {
        await axios.put(`/api/events/${initialData._id}`, payload);
        toast.success("Event updated");
      } else {
        await axios.post("/api/events", payload);
        toast.success("Event created");
      }
      onSave();
      onClose();
    } catch (error) {
      toast.error("Failed to save event");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this event?")) return;
    try {
      await axios.delete(`/api/events/${initialData._id}`);
      toast.success("Event deleted");
      onSave();
      onClose();
    } catch (error) {
      toast.error("Failed to delete event");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-white dark:bg-[#1A1A1A] w-full max-w-xl p-8 rounded-xl shadow-2xl flex flex-col gap-6"
      >
        <div className="flex justify-between items-center mb-2 pb-4 border-b border-[#D9DADC] dark:border-gray-800">
          <div>
            <h2 className="text-xs font-bold mb-2 text-gray-500 tracking-widest uppercase">Mandate Calendar</h2>
            <h2 className="text-2xl font-bold uppercase tracking-tight text-[#1A1A1A] dark:text-white font-['Space_Grotesk']">
              {(initialData && initialData._id) ? "Edit Event" : "Schedule Event"}
            </h2>
          </div>
          {initialData && initialData._id && (
            <button onClick={handleDelete} className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 p-2 rounded-lg text-sm font-bold">
              Delete Event
            </button>
          )}
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <Input 
            label="Event Title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
            placeholder="e.g. Weekly Sync"
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Start Time</label>
              <input 
                type="datetime-local"
                required
                className="w-full bg-[#F9F9FB] dark:bg-[#111] border border-[#EDEDF0] dark:border-gray-800 rounded-lg p-3 text-sm focus:outline-none dark:text-white"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">End Time</label>
              <input 
                type="datetime-local"
                required
                className="w-full bg-[#F9F9FB] dark:bg-[#111] border border-[#EDEDF0] dark:border-gray-800 rounded-lg p-3 text-sm focus:outline-none dark:text-white"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Meeting Link (Optional)</label>
            <input 
              type="url"
              placeholder="https://meet.google.com/..."
              className="w-full bg-[#F9F9FB] dark:bg-[#111] border border-[#EDEDF0] dark:border-gray-800 rounded-lg p-3 text-sm focus:outline-none dark:text-white"
              value={meetingLink}
              onChange={(e) => setMeetingLink(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Attendees</label>
            <select 
              multiple
              className="w-full bg-[#F9F9FB] dark:bg-[#111] border border-[#EDEDF0] dark:border-gray-800 rounded-lg p-3 text-sm focus:outline-none dark:text-white"
              value={attendees}
              onChange={(e) => setAttendees(Array.from(e.target.selectedOptions, option => option.value))}
            >
              {activeWorkspace?.members?.map(m => (
                <option key={m.user._id} value={m.user._id}>{m.user.name}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Description</label>
            <textarea
              className="w-full min-h-[80px] resize-y bg-[#F9F9FB] dark:bg-[#111] border border-[#EDEDF0] dark:border-gray-800 rounded-lg p-3 text-sm focus:outline-none dark:text-white"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Event details..."
            />
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <Button variant="secondary" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {(initialData && initialData._id) ? "Save Changes" : "Schedule Event"}
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default EventModal;
