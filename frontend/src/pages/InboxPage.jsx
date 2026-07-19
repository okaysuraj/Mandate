import React, { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { getTasks } from "../services/taskService";

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
      <div className="space-y-lg">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-md">
          <div>
            <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">Operations Queue</p>
            <h1 className="font-headline-lg text-headline-lg text-primary">Inbox & Alerts</h1>
          </div>
          <button
            onClick={markAllRead}
            className="px-md py-2 border border-outline-variant rounded-full text-label-sm hover:bg-surface-container-high transition-colors"
          >
            Mark all read
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
          <div className="bg-surface-container-lowest border border-outline-variant p-lg">
            <p className="font-label-caps text-label-caps text-on-surface-variant">Unread</p>
            <p className="font-display-lg text-headline-lg text-primary">{notifications.filter((n) => !n.isRead).length}</p>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant p-lg">
            <p className="font-label-caps text-label-caps text-on-surface-variant">Active Mandates</p>
            <p className="font-display-lg text-headline-lg text-primary">{tasks.length}</p>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant p-lg">
            <p className="font-label-caps text-label-caps text-on-surface-variant">Sync Status</p>
            <p className="font-display-lg text-headline-lg text-primary">Live</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
          <div className="bg-surface-container-lowest border border-outline-variant p-lg">
            <div className="flex items-center justify-between mb-md">
              <h2 className="font-headline-lg text-primary">Notification Feed</h2>
              <span className="text-label-sm text-on-surface-variant">Realtime</span>
            </div>
            <div className="space-y-sm">
              {loading ? (
                <p className="text-label-sm text-on-surface-variant">Loading inbox…</p>
              ) : notifications.length === 0 ? (
                <p className="text-label-sm text-on-surface-variant">No notifications yet.</p>
              ) : (
                notifications.map((item) => (
                  <div
                    key={item._id || item.id}
                    className={`border p-md ${item.isRead ? "border-outline-variant bg-surface" : "border-primary bg-primary-container/20"}`}
                  >
                    <p className="font-body-md font-bold text-primary">{item.title || "System update"}</p>
                    <p className="text-sm text-on-surface-variant">{item.message || "No details provided"}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant p-lg">
            <div className="flex items-center justify-between mb-md">
              <h2 className="font-headline-lg text-primary">Due Soon</h2>
              <span className="text-label-sm text-on-surface-variant">Next 10</span>
            </div>
            <div className="space-y-sm">
              {tasks.length === 0 ? (
                <p className="text-label-sm text-on-surface-variant">No active mandates.</p>
              ) : (
                tasks.map((task) => (
                  <div key={task._id} className="border border-outline-variant p-md">
                    <p className="font-body-md font-bold text-primary">{task.title}</p>
                    <p className="text-sm text-on-surface-variant">
                      {task.priority ? `${task.priority} priority` : "Priority pending"}
                    </p>
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
