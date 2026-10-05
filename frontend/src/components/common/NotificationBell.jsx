import { useState, useEffect, useRef } from "react";
import api from "../../lib/axios";
import { useSocket } from "../../context/SocketContext";
import { useAuth } from "../../context/AuthContext";

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const { socket } = useSocket();
  const { user } = useAuth();
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user]);

  useEffect(() => {
    if (!socket || !user) return;

    const handleNewNotification = (notification) => {
      if (notification.user === user._id) {
        setNotifications((prev) => [notification, ...prev]);
      }
    };

    socket.on("notification_created", handleNewNotification);

    return () => {
      socket.off("notification_created", handleNewNotification);
    };
  }, [socket, user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchNotifications = async () => {
    try {
      const { data } = await api.get("/notifications");
      setNotifications(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load notifications", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await api.put("/notifications/read");
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch (error) {
      console.error("Failed to mark read", error);
    }
  };

  const clearNotification = async (id, e) => {
    e.stopPropagation();
    try {
      await api.delete(`/notifications/${id}`);
      setNotifications((prev) => prev.filter((n) => n._id !== id));
    } catch (error) {
      console.error("Failed to clear notification", error);
    }
  };

  const clearAllNotifications = async () => {
    try {
      await api.delete("/notifications");
      setNotifications([]);
    } catch (error) {
      console.error("Failed to clear all notifications", error);
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen && unreadCount > 0) markAllAsRead();
        }}
        className="relative w-10 h-10 rounded-xl border border-outline-variant hover:border-primary bg-surface-container-lowest hover:bg-surface-container transition-all cursor-pointer active:scale-95 flex items-center justify-center text-on-surface"
        title="Notifications"
      >
        <span className="material-symbols-outlined text-[20px]">notifications</span>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-error rounded-full border-2 border-surface flex items-center justify-center">
            <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-surface-container-lowest border border-outline-variant/80 rounded-2xl shadow-2xl overflow-hidden z-50">
          <div className="px-4 py-3 border-b border-outline-variant/40 flex justify-between items-center bg-surface-container-low">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-primary font-bold uppercase tracking-wider">
                System Log / Alerts
              </span>
              {unreadCount > 0 && (
                <span className="bg-primary text-on-primary font-mono text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </div>
            {notifications.length > 0 && (
              <button
                onClick={clearAllNotifications}
                className="font-mono text-[10px] text-error hover:underline uppercase font-bold tracking-wider transition-colors cursor-pointer"
              >
                Clear All
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto p-2 flex flex-col gap-2 custom-scrollbar">
            {notifications.length === 0 ? (
              <div className="py-8 text-center text-on-surface-variant font-mono text-xs">
                No active notifications
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n._id}
                  className={`group relative p-3 rounded-xl border transition-all flex items-start justify-between gap-2.5 ${
                    n.isRead
                      ? "border-outline-variant/40 bg-surface-container-lowest text-on-surface-variant opacity-75"
                      : "border-primary/40 bg-surface-container-low text-on-surface font-semibold shadow-xs"
                  }`}
                >
                  <div className="flex-1 min-w-0 pr-2">
                    <p className="text-xs leading-snug break-words">{n.message}</p>
                    <span className="font-mono text-[9px] text-on-surface-variant/70 mt-1 block uppercase">
                      {n.createdAt ? new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                    </span>
                  </div>
                  <button
                    onClick={(e) => clearNotification(n._id, e)}
                    className="p-1.5 rounded-lg hover:bg-error/10 text-on-surface-variant hover:text-error transition-colors cursor-pointer"
                    title="Clear notification"
                  >
                    <span className="material-symbols-outlined text-[15px]">close</span>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
