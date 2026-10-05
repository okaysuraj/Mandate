import { Link, useLocation } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect, useRef } from "react";
import NotificationBell from "../common/NotificationBell";
import GlobalSearchBar from "../common/GlobalSearchBar";

const Navbar = ({ variant = "app", onToggleSidebar }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const syncTheme = () => {
      const isDark =
        localStorage.getItem("theme") === "dark" ||
        (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches);
      setIsDarkMode(isDark);
      if (isDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    syncTheme();

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("theme-change", syncTheme);
    window.addEventListener("storage", syncTheme);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("theme-change", syncTheme);
      window.removeEventListener("storage", syncTheme);
    };
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    window.dispatchEvent(new Event("theme-change"));
  };

  const isActiveLink = (path) => location.pathname === path;

  const linkClass = (path) => {
    const base = "font-label-caps text-label-caps transition-colors duration-200 uppercase text-xs";
    return isActiveLink(path)
      ? `${base} text-primary font-bold border-b-2 border-primary pb-1`
      : `${base} text-on-surface-variant font-medium hover:text-primary`;
  };

  // Landing page variant
  if (variant === "landing") {
    return (
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 md:px-8 py-3 bg-surface-container-lowest border-b border-outline-variant/70 shadow-xs">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-xl md:text-2xl font-black tracking-tight text-primary font-mono uppercase flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-primary rounded-sm inline-block"></span>
            <span>MANDATE</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className={linkClass("/")}>Command</Link>
            <Link to="/pricing" className={linkClass("/pricing")}>Pricing</Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleDarkMode}
            className="w-10 h-10 rounded-md border border-outline-variant hover:border-primary bg-surface-container-lowest flex items-center justify-center text-primary transition-colors cursor-pointer"
            title="Toggle theme"
          >
            <span className="material-symbols-outlined text-[20px]">
              {isDarkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          {user ? (
            <>
              <NotificationBell />
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-10 h-10 rounded-full bg-surface-container-high border border-outline-variant hover:border-primary flex items-center justify-center cursor-pointer overflow-hidden"
                >
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user?.name || "User Avatar"} className="w-full h-full object-cover" />
                  ) : (
                    <span className="material-symbols-outlined text-on-surface-variant text-[20px]">person</span>
                  )}
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-surface-container-lowest border border-outline-variant rounded-lg shadow-2xl z-50 overflow-hidden">
                    <div className="px-3.5 py-2.5 border-b border-outline-variant bg-surface-container">
                      <p className="font-label-caps text-xs text-primary font-bold truncate">{user.name}</p>
                      <p className="font-mono text-[10px] text-on-surface-variant truncate">{user.email}</p>
                    </div>
                    <Link to="/settings" className="block px-3.5 py-2 font-label-caps text-xs text-on-surface hover:bg-surface-container transition-colors uppercase">
                      SETTINGS
                    </Link>
                    <Link to="/theme-appearance" className="block px-3.5 py-2 font-label-caps text-xs text-on-surface hover:bg-surface-container transition-colors uppercase">
                      THEME & CONTRAST
                    </Link>
                    <button 
                      onClick={() => { setDropdownOpen(false); logout(); }}
                      className="w-full text-left px-3.5 py-2 font-label-caps text-xs text-error hover:bg-error/10 transition-colors border-t border-outline-variant uppercase cursor-pointer"
                    >
                      SIGN OUT
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="px-3.5 py-2 font-label-caps text-xs text-on-surface-variant hover:text-primary transition-colors uppercase">
                LOG IN
              </Link>
              <Link to="/register" className="mandate-btn-primary px-3.5 py-2 text-xs">
                GET STARTED
              </Link>
            </div>
          )}
        </div>
      </header>
    );
  }

  // App variant — locked top bar
  return (
    <header className="fixed top-0 left-0 right-0 h-16 z-50 bg-surface-container-lowest border-b border-outline-variant/70 shadow-xs flex justify-between items-center px-3 md:px-6">
      {/* Left: Hamburger & Brand */}
      <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
        <button 
          onClick={onToggleSidebar}
          className="w-10 h-10 rounded-md border border-outline-variant hover:border-primary bg-surface-container-lowest hover:bg-surface-container text-primary transition-colors cursor-pointer flex items-center justify-center active:scale-95"
          title="Toggle Navigation Menu"
        >
          <span className="material-symbols-outlined text-[22px]">menu</span>
        </button>
        <Link to="/" className="font-mono text-lg md:text-xl font-black tracking-tight text-primary hover:opacity-85 transition-opacity flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 bg-primary rounded-sm inline-block"></span>
          <span>MANDATE</span>
        </Link>
      </div>

      {/* Global Search Bar */}
      <div className="hidden md:flex flex-1 justify-center max-w-xl mx-2">
        <GlobalSearchBar />
      </div>

      {/* Right controls: Theme, Mobile Search Toggle, Notifications */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Mobile Search Toggle */}
        <button
          onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
          className="md:hidden w-10 h-10 rounded-md border border-outline-variant hover:border-primary bg-surface-container-lowest hover:bg-surface-container transition-colors cursor-pointer flex items-center justify-center text-primary"
          title="Search"
        >
          <span className="material-symbols-outlined text-[20px]">search</span>
        </button>

        {/* Theme Toggle */}
        <button 
          onClick={toggleDarkMode}
          className="w-10 h-10 rounded-md border border-outline-variant hover:border-primary bg-surface-container-lowest hover:bg-surface-container transition-colors cursor-pointer active:scale-95 flex items-center justify-center text-primary"
          title="Toggle Theme (Dark / Light)"
        >
          <span className="material-symbols-outlined text-[20px]">
            {isDarkMode ? 'light_mode' : 'dark_mode'}
          </span>
        </button>

        {/* Notifications */}
        <NotificationBell />
      </div>

      {/* Mobile search drawer overlay */}
      {isMobileSearchOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-surface-container-lowest border-b-2 border-outline-variant p-3 shadow-2xl z-50">
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <GlobalSearchBar />
            </div>
            <button
              onClick={() => setIsMobileSearchOpen(false)}
              className="w-10 h-10 rounded-xl border border-outline-variant text-on-surface hover:border-primary hover:bg-surface-container flex items-center justify-center cursor-pointer flex-shrink-0 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
