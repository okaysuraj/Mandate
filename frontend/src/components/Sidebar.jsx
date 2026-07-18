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
  { path: "/inbox", icon: "inbox", label: "Inbox" },
  { path: "/team-workspace", icon: "group", label: "Team" },
  { path: "/daily-planning", icon: "calendar_month", label: "Plan" },
  { path: "/focus-summary", icon: "center_focus_strong", label: "Focus" },
  { path: "/automation-rules", icon: "bolt", label: "Automation" },
  { path: "/billing", icon: "credit_card", label: "Billing" },
  { path: "/command-palette", icon: "terminal", label: "Commands" },
  { path: "/global-search", icon: "search", label: "Search" },
  { path: "/keyboard-shortcuts", icon: "keyboard", label: "Shortcuts" },
  { path: "/saved-views", icon: "collections_bookmark", label: "Views" },
  { path: "/monthly-review", icon: "calendar_view_month", label: "Reviews" },
  { path: "/goal-timeline", icon: "timeline", label: "Timeline" },
  { path: "/task-templates", icon: "snippet_folder", label: "Templates" },
  { path: "/focus-mode", icon: "focus", label: "Focus" },
  { path: "/meeting-notes", icon: "notes", label: "Notes" },
  { path: "/sprint-board", icon: "view_timeline", label: "Sprint" },
  { path: "/workstreams", icon: "splitscreen", label: "Streams" },
  { path: "/customer-journey", icon: "groups", label: "Customers" },
  { path: "/support-desk", icon: "support_agent", label: "Support" },
  { path: "/finance-overview", icon: "account_balance", label: "Finance" },
  { path: "/executive-summary", icon: "leaderboard", label: "Exec" },
  { path: "/workspace-overview", icon: "apps", label: "Workspace" },
  { path: "/mobile-workspace", icon: "phone_iphone", label: "Mobile" },
  { path: "/status-center", icon: "monitor_heart", label: "Status" },
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
