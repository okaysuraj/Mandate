import React, { useEffect, useState } from "react";
import AppLayout from "../../components/layout/AppLayout";
import api from "../../lib/axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { getTasks } from "../../services/taskService";

const InboxPage = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchInbox = async () => {
      try {
        const [notificationsRes, tasksData] = await Promise.all([
          api.get("/notifications"),
          getTasks({ limit: 10 }),
        ]);
        setNotifications(notificationsRes.data || []);
        setTasks(Array.isArray(tasksData) ? tasksData : []);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load inbox");
      } finally {
        setLoading(false);
      }
    };

    fetchInbox();
  }, [user]);

  const markAllRead = async () => {
    try {
      await api.put("/notifications/read");
      setNotifications((prev) => prev.map((item) => ({ ...item, isRead: true })));
      toast.success("Inbox updated");
    } catch (error) {
      toast.error("Could not update inbox");
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6 pb-12 w-full max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-outline-variant">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>
              <p className="font-mono text-on-surface-variant uppercase tracking-widest text-[11px] font-semibold">
                OPERATIONS QUEUE · DISPATCH LOG
              </p>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-on-surface uppercase tracking-tight">Inbox & Alerts</h1>
          </div>
          <button
            onClick={markAllRead}
            className="px-4 py-2 border border-outline-variant rounded-lg font-mono text-xs font-bold uppercase tracking-wider text-on-surface hover:bg-surface-container transition-colors cursor-pointer self-start md:self-auto"
          >
            Mark all read
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-surface-container-lowest border border-outline-variant p-4 sm:p-5 rounded-xl shadow-sm">
            <p className="font-mono text-[10px] uppercase font-bold text-on-surface-variant mb-1">Unread Alerts</p>
            <p className="text-2xl sm:text-3xl font-black text-on-surface font-mono">{notifications.filter((n) => !n.isRead).length}</p>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant p-4 sm:p-5 rounded-xl shadow-sm">
            <p className="font-mono text-[10px] uppercase font-bold text-on-surface-variant mb-1">Active Mandates</p>
            <p className="text-2xl sm:text-3xl font-black text-on-surface font-mono">{tasks.length}</p>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant p-4 sm:p-5 rounded-xl shadow-sm">
            <p className="font-mono text-[10px] uppercase font-bold text-on-surface-variant mb-1">Telemetry Status</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
              <p className="text-xl sm:text-2xl font-black text-on-surface font-mono">LIVE</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-surface-container-lowest border border-outline-variant p-5 sm:p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-outline-variant">
              <h2 className="text-base font-bold font-mono uppercase tracking-wider text-on-surface">Notification Feed</h2>
              <span className="text-xs font-mono text-on-surface-variant">Realtime</span>
            </div>
            <div className="space-y-2.5">
              {loading ? (
                <p className="text-xs font-mono text-on-surface-variant py-4 text-center">Loading inbox…</p>
              ) : notifications.length === 0 ? (
                <p className="text-xs font-mono text-on-surface-variant py-4 text-center">No notifications yet.</p>
              ) : (
                notifications.map((item) => (
                  <div
                    key={item._id || item.id}
                    className={`border p-3.5 rounded-lg transition-all ${
                      item.isRead 
                        ? "border-outline-variant bg-surface-container-low" 
                        : "border-primary/50 bg-surface-container-high/60 shadow-sm"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <p className="font-bold text-xs font-mono text-on-surface flex items-center gap-1.5">
                        {!item.isRead && <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>}
                        {item.title || "System update"}
                      </p>
                    </div>
                    <p className="text-xs text-on-surface-variant leading-relaxed">{item.message || "No details provided"}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant p-5 sm:p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-outline-variant">
              <h2 className="text-base font-bold font-mono uppercase tracking-wider text-on-surface">Due Soon</h2>
              <span className="text-xs font-mono text-on-surface-variant">Next 10</span>
            </div>
            <div className="space-y-2.5">
              {tasks.length === 0 ? (
                <p className="text-xs font-mono text-on-surface-variant py-4 text-center">No active mandates.</p>
              ) : (
                tasks.map((task) => (
                  <div key={task._id} className="border border-outline-variant bg-surface-container-low hover:bg-surface-container p-3.5 rounded-lg transition-colors">
                    <p className="font-bold text-xs text-on-surface uppercase tracking-tight">{task.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-mono uppercase text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded border border-outline-variant">
                        {task.priority ? `${task.priority} priority` : "Priority pending"}
                      </span>
                      {task.dueDate && (
                        <span className="text-[10px] font-mono text-on-surface-variant">
                          {new Date(task.dueDate).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default InboxPage;
