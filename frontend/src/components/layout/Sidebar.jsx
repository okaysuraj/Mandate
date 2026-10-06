import { useRef, useLayoutEffect, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { path: "/dashboard", icon: "dashboard", label: "Dashboard" },
  { path: "/today", icon: "event_upcoming", label: "Today" },
  { path: "/kanban", icon: "view_kanban", label: "Kanban" },
  { path: "/calendar", icon: "calendar_today", label: "Calendar" },
  { path: "/backlog", icon: "inventory_2", label: "Backlog" },
  { path: "/projects", icon: "account_tree", label: "Projects" },
  { path: "/analytics", icon: "analytics", label: "Analytics" },
  { path: "/inbox", icon: "inbox", label: "Inbox" },
  { path: "/team-workspace", icon: "group", label: "Team" },
  { path: "/daily-planning", icon: "calendar_month", label: "Plan" },
  { path: "/focus-summary", icon: "filter_center_focus", label: "Focus Stats" },
  { path: "/automation-rules", icon: "bolt", label: "Automation" },
  { path: "/billing", icon: "credit_card", label: "Billing" },
  { path: "/command-palette", icon: "keyboard_command_key", label: "Shortcuts" },
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

const Sidebar = ({ onNewTask, isCollapsed = false, isMobileOpen = false, onCloseMobile }) => {
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

  // Close mobile sidebar on route change
  useEffect(() => {
    if (onCloseMobile) {
      onCloseMobile();
    }
  }, [location.pathname]);

  const handleScroll = (e) => {
    sessionStorage.setItem("sidebarScrollPos", String(e.target.scrollTop));
  };

  const navContent = (isMobileView = false) => (
    <div className="flex flex-col h-full bg-surface-container-lowest text-on-surface">
      {/* Header: User Profile or Mobile Close */}
      <div className="border-b border-outline-variant flex-shrink-0 px-4 py-3 bg-surface-container flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center flex-shrink-0 overflow-hidden border border-outline-variant font-mono font-bold text-xs">
            {user?.avatar ? (
              <img src={user.avatar} alt={user?.name || "User Avatar"} className="w-full h-full object-cover" />
            ) : (
              <span>{(user?.name || "U").slice(0, 2).toUpperCase()}</span>
            )}
          </div>
          {(!isCollapsed || isMobileView) && (
            <div className="min-w-0">
              <p className="font-label-caps text-xs text-on-surface font-bold uppercase truncate">{user?.name || "Workspace Member"}</p>
              <p className="font-mono text-[9px] text-outline uppercase tracking-wider truncate">{user?.email || "Active Member"}</p>
            </div>
          )}
        </div>

        {isMobileView && (
          <button
            onClick={onCloseMobile}
            className="w-8 h-8 rounded-md border border-outline-variant hover:border-primary flex items-center justify-center text-on-surface cursor-pointer"
            title="Close Menu"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        )}
      </div>

      {/* Primary Action Button */}
      <div className={`p-3 border-b border-outline-variant flex-shrink-0 bg-surface-container-lowest ${isCollapsed && !isMobileView ? "px-1.5" : "px-3"}`}>
        {isCollapsed && !isMobileView ? (
          <button
            onClick={onNewTask}
            title="New Task"
            className="w-full h-10 rounded-md bg-primary text-on-primary flex items-center justify-center hover:opacity-90 transition-all cursor-pointer active:scale-95 border border-primary"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
          </button>
        ) : (
          <button
            onClick={onNewTask}
            className="w-full py-2.5 bg-primary text-on-primary rounded-md font-label-caps text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all cursor-pointer active:scale-98 flex items-center justify-center gap-1.5 border border-primary shadow-sm"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            <span>New Task</span>
          </button>
        )}
      </div>
      
      {/* Scrollable Navigation Items */}
      <nav 
        ref={navRef}
        onScroll={handleScroll}
        className={`flex-1 overflow-y-auto py-2 flex flex-col custom-scrollbar ${isCollapsed && !isMobileView ? "px-1 gap-1" : "px-2 gap-0.5"}`}
      >
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              ref={active ? activeItemRef : null}
              title={isCollapsed && !isMobileView ? item.label : undefined}
              className={`flex items-center transition-all duration-150 flex-shrink-0 rounded-md border ${
                isCollapsed && !isMobileView
                  ? `justify-center p-2.5 ${
                      active
                        ? "bg-primary text-on-primary border-primary font-bold shadow-sm"
                        : "text-on-surface-variant hover:bg-surface-container border-transparent hover:border-outline-variant"
                    }`
                  : `gap-3 px-3 py-2 ${
                      active
                        ? "bg-primary text-on-primary border-primary font-bold shadow-sm"
                        : "text-on-surface-variant font-medium hover:bg-surface-container border-transparent hover:border-outline-variant hover:text-on-surface"
                    }`
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
              {(!isCollapsed || isMobileView) && (
                <span className="font-label-caps uppercase text-xs truncate tracking-wider">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Controls */}
      <div className="mt-auto border-t border-outline-variant p-2 bg-surface-container flex flex-col gap-1 flex-shrink-0">
        <Link
          to="/settings"
          title={isCollapsed && !isMobileView ? "Settings" : undefined}
          className={`flex items-center text-on-surface-variant hover:text-on-surface font-medium hover:bg-surface-container-highest transition-all rounded-md border border-transparent hover:border-outline-variant ${
            isCollapsed && !isMobileView ? "justify-center p-2" : "gap-3 px-3 py-1.5"
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">settings</span>
          {(!isCollapsed || isMobileView) && <span className="font-label-caps uppercase text-xs tracking-wider">Settings</span>}
        </Link>
        <button
          onClick={logout}
          title={isCollapsed && !isMobileView ? "Sign Out" : undefined}
          className={`flex items-center text-error hover:bg-error/10 transition-all rounded-md border border-transparent hover:border-error/30 w-full cursor-pointer ${
            isCollapsed && !isMobileView ? "justify-center p-2" : "gap-3 px-3 py-1.5 text-left"
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">logout</span>
          {(!isCollapsed || isMobileView) && <span className="font-label-caps uppercase text-xs tracking-wider">Sign Out</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col h-[calc(100vh-4rem)] fixed left-0 top-16 bg-surface-container-lowest border-r border-outline-variant z-40 transition-all duration-200 overflow-x-hidden ${
          isCollapsed ? "w-16" : "w-64"
        }`}
      >
        {navContent(false)}
      </aside>

      {/* Mobile Sidebar Overlay & Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div 
            onClick={onCloseMobile}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
          />

          {/* Drawer Container */}
          <aside className="relative w-72 max-w-[85vw] h-full bg-surface-container-lowest border-r-2 border-outline-variant shadow-2xl z-50 flex flex-col animate-in slide-in-from-left duration-200">
            {navContent(true)}
          </aside>
        </div>
      )}
    </>
  );
};

export default Sidebar;
