import { Link, useLocation } from "react-router";



const BottomNav = ({ onOpenMenu, onNewTask }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-surface-container-lowest flex justify-around items-center border-t border-outline-variant/70 px-1 z-40 shadow-md">
      {/* Dashboard */}
      <Link
        to="/dashboard"
        className={`flex flex-col items-center justify-center flex-1 h-full transition-all relative ${
          isActive("/dashboard")
            ? "text-primary font-bold"
            : "text-on-surface-variant hover:text-primary opacity-80"
        }`}
      >
        {isActive("/dashboard") && (
          <span className="absolute top-0 w-8 h-0.5 bg-primary rounded-full" />
        )}
        <span className="material-symbols-outlined text-[20px]">dashboard</span>
        <span className="text-[9px] font-mono uppercase tracking-wider mt-0.5">Dashboard</span>
      </Link>

      {/* Today */}
      <Link
        to="/today"
        className={`flex flex-col items-center justify-center flex-1 h-full transition-all relative ${
          isActive("/today")
            ? "text-primary font-bold"
            : "text-on-surface-variant hover:text-primary opacity-80"
        }`}
      >
        {isActive("/today") && (
          <span className="absolute top-0 w-8 h-0.5 bg-primary rounded-full" />
        )}
        <span className="material-symbols-outlined text-[20px]">event_upcoming</span>
        <span className="text-[9px] font-mono uppercase tracking-wider mt-0.5">Today</span>
      </Link>

      {/* Quick Add Task Button */}
      {onNewTask && (
        <div className="flex items-center justify-center flex-1 h-full">
          <button
            onClick={onNewTask}
            className="w-10 h-10 rounded-full bg-primary text-on-primary shadow-md flex items-center justify-center hover:opacity-90 active:scale-95 transition-all cursor-pointer"
            title="New Task"
          >
            <span className="material-symbols-outlined text-[22px]">add</span>
          </button>
        </div>
      )}

      {/* Kanban */}
      <Link
        to="/kanban"
        className={`flex flex-col items-center justify-center flex-1 h-full transition-all relative ${
          isActive("/kanban")
            ? "text-primary font-bold"
            : "text-on-surface-variant hover:text-primary opacity-80"
        }`}
      >
        {isActive("/kanban") && (
          <span className="absolute top-0 w-8 h-0.5 bg-primary rounded-full" />
        )}
        <span className="material-symbols-outlined text-[20px]">view_kanban</span>
        <span className="text-[9px] font-mono uppercase tracking-wider mt-0.5">Kanban</span>
      </Link>

      {/* Menu / All Tools button */}
      <button
        onClick={onOpenMenu}
        className="flex flex-col items-center justify-center flex-1 h-full text-on-surface-variant hover:text-primary transition-all opacity-80 cursor-pointer"
        title="All Sections"
      >
        <span className="material-symbols-outlined text-[20px]">grid_view</span>
        <span className="text-[9px] font-mono uppercase tracking-wider mt-0.5">Menu</span>
      </button>
    </nav>
  );
};

export default BottomNav;
