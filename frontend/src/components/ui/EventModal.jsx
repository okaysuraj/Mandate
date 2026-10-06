import {localDateTime} from '../../../../shared/taskSchedule';
import { useState, useEffect } from "react";
import { Button } from "./Button";
import { Input } from "./Input";
import { motion as Motion } from "framer-motion";
import api from '../../lib/axios';
import toast from "react-hot-toast";
import { useWorkspace } from "../../context/WorkspaceContext";
import { X } from "lucide-react";

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
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setStartTime(localDateTime(initialData.startTime));
      setEndTime(localDateTime(initialData.endTime));
      setMeetingLink(initialData.meetingLink || "");
      setAttendees(initialData.attendees || []);
    } else if (initialData && initialData.startTime) {
      setTitle("");
      setDescription("");
      const st = new Date(initialData.startTime);
      st.setHours(9, 0, 0, 0);
      setStartTime(localDateTime(st));
      const et = new Date(st.getTime() + 60 * 60000);
      setEndTime(localDateTime(et));
      setMeetingLink("");
      setAttendees([]);
    } else {
      setTitle("");
      setDescription("");
      const now = new Date();
      now.setMinutes(0, 0, 0);
      setStartTime(localDateTime(now));
      const later = new Date(now.getTime() + 60 * 60000);
      setEndTime(localDateTime(later));
      setMeetingLink("");
      setAttendees([]);
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { title, description, startTime: new Date(startTime).toISOString(), endTime: new Date(endTime).toISOString(), meetingLink, attendees: attendees.map(a=>a._id||a), workspaceId: activeWorkspace?._id };
      if (initialData && initialData._id) {
        await api.put(`/events/${initialData._id}`, payload);
        toast.success("Event updated");
      } else {
        await api.post("/events", payload);
        toast.success("Event scheduled");
      }
      onSave();
      onClose();
    } catch {
      toast.error("Failed to save event");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this event?")) return;
    try {
      await api.delete(`/events/${initialData._id}`);
      toast.success("Event deleted");
      onSave();
      onClose();
    } catch {
      toast.error("Failed to delete event");
    }
  };

  return (
    <Motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm"
    >
      <Motion.div
        initial={{ scale: 0.98, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.98, opacity: 0, y: 15 }}
        className="bg-surface-container-lowest border border-outline-variant/80 w-full max-w-xl p-4 sm:p-6 md:p-8 rounded-2xl shadow-2xl flex flex-col gap-4 text-on-surface overflow-hidden"
      >
        <div className="flex justify-between items-center pb-3 border-b border-outline-variant/40 bg-surface-container-low -m-4 sm:-m-6 md:-m-8 mb-2 p-4 sm:p-6">
          <div>
            <h2 className="text-[10px] font-mono font-bold text-on-surface-variant tracking-widest uppercase">TEMPORAL SCHEDULE</h2>
            <h2 className="text-lg sm:text-xl font-mono font-black uppercase tracking-tight text-primary">
              {(initialData && initialData._id) ? "Modify Event" : "Schedule Protocol Event"}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {initialData && initialData._id && (
              <button onClick={handleDelete} className="text-error hover:bg-error/10 px-3 py-1.5 rounded-lg border border-error/30 text-xs font-mono font-bold uppercase cursor-pointer">
                Delete
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl border border-outline-variant hover:border-primary flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 mt-2">
          <Input
            label="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="e.g. Tactical Sync, Sprint Retrospective"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-widest">Start Time</label>
              <input
                type="datetime-local"
                required
                className="w-full bg-surface-container-low border border-outline-variant rounded-xl p-2.5 text-xs font-mono text-on-surface focus:outline-none focus:border-primary transition-colors"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-widest">End Time</label>
              <input
                type="datetime-local"
                required
                className="w-full bg-surface-container-low border border-outline-variant rounded-xl p-2.5 text-xs font-mono text-on-surface focus:outline-none focus:border-primary transition-colors"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-widest">Meeting Link (Virtual Room)</label>
            <input
              type="url"
              placeholder="https://meet.google.com/..."
              className="w-full bg-surface-container-low border border-outline-variant rounded-xl p-2.5 text-xs font-mono text-on-surface focus:outline-none focus:border-primary transition-colors"
              value={meetingLink}
              onChange={(e) => setMeetingLink(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-widest">Operatives Involved</label>
            <select
              multiple
              className="w-full bg-surface-container-low border border-outline-variant rounded-xl p-2.5 text-xs font-mono text-on-surface focus:outline-none focus:border-primary transition-colors"
              value={attendees}
              onChange={(e) => setAttendees(Array.from(e.target.selectedOptions, option => option.value))}
            >
              {activeWorkspace?.members?.map(m => (
                <option key={m.user._id} value={m.user._id}>{m.user.name}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-widest">Agenda Notes</label>
            <textarea
              className="w-full min-h-[70px] resize-y bg-surface-container-low border border-outline-variant rounded-xl p-2.5 text-xs font-body-md text-on-surface focus:outline-none focus:border-primary transition-colors"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Agenda items and discussion notes..."
            />
          </div>

          <div className="flex justify-end gap-2 mt-2 pt-3 border-t border-outline-variant">
            <Button variant="secondary" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {(initialData && initialData._id) ? "Save Changes" : "Commit Event"}
            </Button>
          </div>
        </form>
      </Motion.div>
    </Motion.div>
  );
};

export default EventModal;
