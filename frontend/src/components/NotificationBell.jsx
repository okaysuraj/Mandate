import { useState, useEffect, useRef } from "react";
import { Bell } from "lucide-react";
import axios from "axios";
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
      const { data } = await axios.get("/api/notifications");
      setNotifications(data);
    } catch (error) {
      console.error("Failed to load notifications", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await axios.put("/api/notifications/read");
      setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    } catch (error) {
      console.error("Failed to mark read", error);
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen && unreadCount > 0) markAllAsRead();
        }}
        className="relative p-2 text-gray-500 hover:text-[#1A1A1A] dark:text-gray-400 dark:hover:text-white transition-colors"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-[#0A0A0A]"></span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#1A1A1A] border border-[#EDEDF0] dark:border-gray-800 rounded-lg shadow-xl overflow-hidden z-50">
          <div className="p-3 border-b border-[#EDEDF0] dark:border-gray-800 flex justify-between items-center bg-[#F9F9FB] dark:bg-[#111]">
            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Notifications</h3>
          </div>
          <div className="max-h-[300px] overflow-y-auto p-2 flex flex-col gap-2">
            {notifications.length === 0 ? (
              <p className="text-xs text-gray-500 text-center py-4 font-semibold">No new notifications</p>
            ) : (
              notifications.map(n => (
                <div key={n._id} className={`p-3 rounded-lg border text-sm ${n.isRead ? 'border-transparent bg-white dark:bg-[#1A1A1A]' : 'border-[#EDEDF0] dark:border-gray-800 bg-[#F3F3F5] dark:bg-black font-semibold'}`}>
                  <p className="text-[#1A1A1A] dark:text-white">{n.message}</p>
                  <span className="text-[10px] text-gray-400 mt-1 block">{new Date(n.createdAt).toLocaleTimeString()}</span>
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
