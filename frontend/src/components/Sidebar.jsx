import { Link, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { path: "/dashboard", icon: "dashboard", label: "Dashboard" },
  { path: "/today", icon: "event_upcoming", label: "Today" },
  { path: "/kanban", icon: "view_kanban", label: "Kanban" },
  { path: "/backlog", icon: "inventory_2", label: "Backlog" },
  { path: "/projects", icon: "account_tree", label: "Projects" },
  { path: "/calendar", icon: "calendar_today", label: "Calendar" },
  { path: "/analytics", icon: "analytics", label: "Analytics" },
];

const Sidebar = ({ onNewTask }) => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-16 bg-surface-container-lowest border-r border-surface-variant py-lg gap-md z-40">
      <div className="px-lg mb-md">
        <div className="flex items-center gap-sm">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary">
            <span className="material-symbols-outlined">person</span>
          </div>
          <div>
            <p className="font-label-caps text-on-surface font-bold uppercase">{user?.name || "OP-942"}</p>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest overflow-hidden whitespace-nowrap overflow-ellipsis w-32">{user?.email || "Infrastructure Lead"}</p>
          </div>
        </div>
      </div>
      
      <nav className="flex flex-col px-md gap-xs">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-md px-md py-sm transition-all duration-200 ${
              isActive(item.path)
                ? "bg-primary text-on-primary rounded-none font-bold border-l-4 border-primary"
                : "text-on-surface-variant font-medium hover:bg-surface-container-low"
            }`}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="font-label-caps uppercase">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto px-md">
        <button
          onClick={onNewTask}
          className="w-full py-md bg-primary text-on-primary rounded-full font-label-caps text-center hover:opacity-90 transition-all uppercase mb-lg"
        >
          New Entry
        </button>
        
        <div className="flex flex-col gap-xs pt-md border-t border-surface-variant">
          <Link
            to="/settings"
            className="flex items-center gap-md px-md py-sm text-on-surface-variant font-medium hover:bg-surface-container-low transition-all"
          >
            <span className="material-symbols-outlined">settings</span>
            <span className="font-label-caps uppercase">Settings</span>
          </Link>
          <a
            href="#"
            className="flex items-center gap-md px-md py-sm text-on-surface-variant font-medium hover:bg-surface-container-low transition-all"
          >
            <span className="material-symbols-outlined">help</span>
            <span className="font-label-caps uppercase">Support</span>
          </a>
          <button
            onClick={logout}
            className="flex items-center gap-md px-md py-sm text-on-surface-variant font-medium hover:bg-surface-container-low transition-all w-full text-left"
          >
            <span className="material-symbols-outlined text-error">logout</span>
            <span className="font-label-caps uppercase text-error">Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
