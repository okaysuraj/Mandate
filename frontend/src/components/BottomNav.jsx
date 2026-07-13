import { Link, useLocation } from "react-router";

const navItems = [
  { path: "/dashboard", icon: "dashboard", label: "Command" },
  { path: "/today", icon: "calendar_today", label: "Today" },
  { path: "/backlog", icon: "inventory_2", label: "Backlog" },
  { path: "/inbox", icon: "inbox", label: "Inbox" },
];

const BottomNav = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-surface-container-lowest flex justify-around items-center border-t border-surface-variant px-md z-50">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`flex flex-col items-center justify-center ${
            isActive(item.path) ? "text-primary" : "text-on-surface-variant"
          }`}
        >
          <span className="material-symbols-outlined">{item.icon}</span>
          <span className="text-[10px] font-label-caps uppercase mt-1">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default BottomNav;
