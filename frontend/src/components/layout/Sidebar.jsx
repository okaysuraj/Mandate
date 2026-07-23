import { useRef, useLayoutEffect, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { useAuth } from "../../context/AuthContext";

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
  { path: "/focus-summary", icon: "filter_center_focus", label: "Focus Stats" },
  { path: "/automation-rules", icon: "bolt", label: "Automation" },
  { path: "/billing", icon: "credit_card", label: "Billing" },
  { path: "/command-palette", icon: "terminal", label: "Commands" },
  { path: "/global-search", icon: "search", label: "Search" },
  { path: "/keyboard-shortcuts", icon: "keyboard", label: "Shortcuts" },
  { path: "/saved-views", icon: "collections_bookmark", label: "Views" },
  { path: "/monthly-review", icon: "calendar_view_month", label: "Reviews" },
  { path: "/goal-timeline", icon: "timeline", label: "Timeline" },
  { path: "/task-templates", icon: "snippet_folder", label: "Templates" },
  { path: "/focus-mode", icon: "center_focus_strong", label: "Focus Mode" },
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

const Sidebar = ({ onNewTask, isCollapsed = false }) => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const navRef = useRef(null);
  const activeItemRef = useRef(null);

  const isActive = (path) => location.pathname === path;

  // Preserve scroll position synchronously on navigation & mount
  useLayoutEffect(() => {
    if (navRef.current) {
      const savedPos = sessionStorage.getItem("sidebarScrollPos");
      if (savedPos !== null) {
        navRef.current.scrollTop = Number(savedPos);
      }
    }
  }, [location.pathname]);

  // Keep active navigation item visible smoothly
  useEffect(() => {
    if (activeItemRef.current) {
      activeItemRef.current.scrollIntoView({ block: "nearest", behavior: "auto" });
    }
  }, [location.pathname]);

  const handleScroll = (e) => {
    sessionStorage.setItem("sidebarScrollPos", String(e.target.scrollTop));
  };

  return (
    <aside
      className={`hidden md:flex flex-col h-[calc(100vh-4rem)] fixed left-0 top-16 bg-surface-container-lowest border-r border-surface-variant z-40 transition-all duration-300 overflow-x-hidden ${
        isCollapsed ? "w-16 py-sm gap-xs" : "w-64 py-md gap-sm"
      }`}
    >
      {/* User Header */}
      <div className={`border-b border-surface-variant flex-shrink-0 ${isCollapsed ? "px-xs pb-xs flex justify-center" : "px-lg pb-sm"}`}>
        <div className="flex items-center gap-sm">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary flex-shrink-0 overflow-hidden border border-outline-variant">
            {user?.avatar ? (
              <img src={user.avatar} alt={user?.name || "User Avatar"} className="w-full h-full object-cover" />
            ) : (
              <span className="material-symbols-outlined">person</span>
            )}
          </div>
          {!isCollapsed && (
            <div className="min-w-0">
              <p className="font-label-caps text-on-surface font-bold uppercase truncate">{user?.name || "OP-942"}</p>
              <p className="text-[10px] text-on-surface-variant uppercase tracking-widest truncate">{user?.email || "Infrastructure Lead"}</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Scrollable Navigation Items Container with scroll position retention */}
      <nav 
        ref={navRef}
        onScroll={handleScroll}
        className={`flex-1 overflow-y-auto overflow-x-hidden py-sm flex flex-col scrollbar-thin scrollbar-thumb-outline-variant hover:scrollbar-thumb-primary ${isCollapsed ? "px-xs gap-1" : "px-md gap-xs"}`}
      >
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              ref={active ? activeItemRef : null}
              title={isCollapsed ? item.label : undefined}
              className={`flex items-center transition-all duration-200 flex-shrink-0 ${
                isCollapsed
                  ? `justify-center p-sm rounded-md ${
                      active
                        ? "bg-primary text-on-primary font-bold"
                        : "text-on-surface-variant hover:bg-surface-container-low"
                    }`
                  : `gap-md px-md py-sm ${
                      active
                        ? "bg-primary text-on-primary rounded-none font-bold border-l-4 border-primary"
                        : "text-on-surface-variant font-medium hover:bg-surface-container-low"
                    }`
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              {!isCollapsed && (
                <span className="font-label-caps uppercase text-sm truncate">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Controls / New Entry */}
      <div className={`mt-auto pt-sm flex-shrink-0 border-t border-surface-variant bg-surface-container-lowest ${isCollapsed ? "px-xs" : "px-md"}`}>
        {isCollapsed ? (
          <button
            onClick={onNewTask}
            title="New Entry"
            className="w-10 h-10 mx-auto rounded-full bg-primary text-on-primary flex items-center justify-center hover:opacity-90 transition-all mb-sm cursor-pointer active:scale-95"
          >
            <span className="material-symbols-outlined">add</span>
          </button>
        ) : (
          <button
            onClick={onNewTask}
            className="w-full py-sm bg-primary text-on-primary rounded-full font-label-caps text-center hover:opacity-90 transition-all uppercase mb-sm cursor-pointer active:scale-95"
          >
            New Entry
          </button>
        )}
        
        <div className="flex flex-col gap-xs pb-sm">
          <Link
            to="/settings"
            title={isCollapsed ? "Settings" : undefined}
            className={`flex items-center text-on-surface-variant font-medium hover:bg-surface-container-low transition-all ${
              isCollapsed ? "justify-center p-sm rounded-md" : "gap-md px-md py-xs"
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">settings</span>
            {!isCollapsed && <span className="font-label-caps uppercase text-xs">Settings</span>}
          </Link>
          <button
            onClick={logout}
            title={isCollapsed ? "Sign Out" : undefined}
            className={`flex items-center text-on-surface-variant font-medium hover:bg-surface-container-low transition-all w-full ${
              isCollapsed ? "justify-center p-sm rounded-md" : "gap-md px-md py-xs text-left"
            }`}
          >
            <span className="material-symbols-outlined text-error text-[20px]">logout</span>
            {!isCollapsed && <span className="font-label-caps uppercase text-xs text-error">Sign Out</span>}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
