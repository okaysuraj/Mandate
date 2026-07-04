import { Link, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { path: "/dashboard", icon: "dashboard", label: "Dashboard" },
  { path: "/today", icon: "event_upcoming", label: "Today" },
  { path: "/backlog", icon: "inventory_2", label: "Backlog" },
  { path: "/projects", icon: "account_tree", label: "Projects" },
  { path: "/calendar", icon: "calendar_today", label: "Calendar" },
  { path: "/analytics", icon: "analytics", label: "Analytics" },
];

const Sidebar = ({ onNewTask }) => {
  const location = useLocation();
  const { logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="hidden md:flex flex-col h-full py-lg px-md gap-md bg-surface border-r border-outline-variant w-64 shrink-0 transition-all duration-150">
      {/* Brand */}
      <div className="mb-xl px-sm">
        <Link to="/dashboard">
          <h1 className="font-headline-lg text-headline-lg font-black tracking-tighter text-primary">MANDATE</h1>
        </Link>
        <p className="font-label-caps text-label-caps text-secondary opacity-60">Industrial OS</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-xs">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-md px-md py-sm font-label-caps text-label-caps transition-all duration-150 rounded-full ${
              isActive(item.path)
                ? "bg-primary text-on-primary shadow-sm"
                : "text-secondary hover:bg-surface-container"
            }`}
          >
            <span
              className="material-symbols-outlined text-[20px]"
              style={isActive(item.path) ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              {item.icon}
            </span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* New Task Button */}
      <button
        onClick={onNewTask}
        className="bg-primary text-on-primary font-label-caps text-label-caps py-md rounded-full mb-md hover:opacity-90 transition-opacity flex items-center justify-center gap-sm"
      >
        <span className="material-symbols-outlined text-[18px]">add</span>
        New Task
      </button>

      {/* Footer Links */}
      <div className="flex flex-col gap-xs pt-md border-t border-outline-variant">
        <Link
          to="/settings"
          className="flex items-center gap-md px-md py-sm font-label-caps text-label-caps text-secondary hover:bg-surface-container transition-all duration-150 rounded-full"
        >
          <span className="material-symbols-outlined text-[20px]">settings</span>
          <span>Settings</span>
        </Link>
        <a
          href="#"
          className="flex items-center gap-md px-md py-sm font-label-caps text-label-caps text-secondary hover:bg-surface-container transition-all duration-150 rounded-full"
        >
          <span className="material-symbols-outlined text-[20px]">help_outline</span>
          <span>Support</span>
        </a>
        <button
          onClick={logout}
          className="flex items-center gap-md px-md py-sm font-label-caps text-label-caps text-secondary hover:bg-surface-container transition-all duration-150 rounded-full w-full text-left"
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
