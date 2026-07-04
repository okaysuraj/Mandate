import { Link, useLocation } from "react-router";

const navItems = [
  { path: "/dashboard", icon: "dashboard" },
  { path: "/today", icon: "event_upcoming" },
  { path: "/projects", icon: "account_tree" },
  { path: "/analytics", icon: "analytics" },
];

const BottomNav = ({ onNewTask }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-outline-variant flex justify-around items-center h-xl z-50">
      {navItems.slice(0, 2).map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`flex flex-col items-center justify-center ${
            isActive(item.path) ? "text-primary" : "text-secondary"
          }`}
        >
          <span
            className="material-symbols-outlined"
            style={isActive(item.path) ? { fontVariationSettings: "'FILL' 1" } : {}}
          >
            {item.icon}
          </span>
        </Link>
      ))}

      {/* Floating Add Button */}
      <button
        onClick={onNewTask}
        className="bg-primary text-on-primary p-md rounded-full -translate-y-4 shadow-lg hover:scale-105 transition-transform"
      >
        <span className="material-symbols-outlined">add</span>
      </button>

      {navItems.slice(2).map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`flex flex-col items-center justify-center ${
            isActive(item.path) ? "text-primary" : "text-secondary"
          }`}
        >
          <span
            className="material-symbols-outlined"
            style={isActive(item.path) ? { fontVariationSettings: "'FILL' 1" } : {}}
          >
            {item.icon}
          </span>
        </Link>
      ))}
    </nav>
  );
};

export default BottomNav;
