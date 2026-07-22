import { useState, useEffect, useRef } from "react";
import api from "../lib/axios";
import { useSocket } from "../context/SocketContext";
import { useAuth } from "../context/AuthContext";

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
        className="relative p-sm rounded-full hover:bg-surface-container-low transition-colors cursor-pointer active:opacity-80 flex items-center justify-center"
        title="Notifications"
      >
        <span className="material-symbols-outlined text-primary text-[20px]">notifications</span>
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-error rounded-full ring-2 ring-background"></span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-surface border border-outline-variant rounded-md shadow-lg overflow-hidden z-50">
          <div className="px-md py-sm border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest">
            <div className="flex items-center gap-xs">
              <span className="font-label-caps text-label-caps text-primary font-bold uppercase">Notifications</span>
              {unreadCount > 0 && (
                <span className="bg-primary/10 text-primary text-[10px] font-bold px-sm py-xs rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>
            {notifications.length > 0 && (
              <button
                onClick={clearAllNotifications}
                className="font-label-caps text-[10px] text-error hover:text-error/80 uppercase font-bold tracking-wider transition-colors cursor-pointer"
              >
                Clear All
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto p-xs flex flex-col gap-xs scrollbar-thin">
            {notifications.length === 0 ? (
              <div className="py-lg text-center text-on-surface-variant font-label-caps text-xs">
                No notifications
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n._id}
                  className={`group relative p-md rounded-sm border transition-all flex items-start justify-between gap-sm ${
                    n.isRead
                      ? "border-transparent bg-surface-container-lowest text-on-surface-variant opacity-80"
                      : "border-outline-variant bg-surface-container-low text-on-surface font-semibold"
                  }`}
                >
                  <div className="flex-1 min-w-0 pr-2">
                    <p className="text-xs font-body-md leading-snug break-words">{n.message}</p>
                    <span className="text-[9px] font-label-sm text-outline mt-xs block uppercase">
                      {n.createdAt ? new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                    </span>
                  </div>
                  <button
                    onClick={(e) => clearNotification(n._id, e)}
                    className="p-1 rounded hover:bg-surface-container-high text-on-surface-variant hover:text-error transition-colors cursor-pointer"
                    title="Clear notification"
                  >
                    <span className="material-symbols-outlined text-[16px]">close</span>
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
