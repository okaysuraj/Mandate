import { Link, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect, useRef } from "react";

const Navbar = ({ variant = "app" }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark" || 
        (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
  };

  const isActiveLink = (path) => location.pathname === path;

  const linkClass = (path) => {
    const base = "font-label-caps text-label-caps transition-colors duration-200";
    return isActiveLink(path)
      ? `${base} text-primary font-bold border-b-2 border-primary pb-1`
      : `${base} text-on-surface-variant font-medium hover:text-primary`;
  };

  // Landing page variant — simpler top bar
  if (variant === "landing") {
    return (
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-lg py-md bg-surface border-b border-outline-variant">
        <div className="flex items-center gap-xl">
          <Link to="/" className="text-headline-lg font-headline-lg font-black tracking-tighter text-primary">
            MANDATE
          </Link>
          <nav className="hidden md:flex items-center gap-lg">
            <Link to="/" className={linkClass("/")}>Dashboard</Link>
            <Link to="/pricing" className={linkClass("/pricing")}>Pricing</Link>
          </nav>
        </div>
        <div className="flex items-center gap-md">
          {user ? (
            <>
              <button 
                onClick={toggleDarkMode}
                className="p-sm rounded-full hover:bg-surface-container-low transition-colors duration-200"
              >
                <span className="material-symbols-outlined text-primary">
                  {isDarkMode ? 'light_mode' : 'dark_mode'}
                </span>
              </button>
              <button className="p-sm rounded-full hover:bg-surface-container-low transition-colors duration-200">
                <span className="material-symbols-outlined text-primary">notifications</span>
              </button>
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-10 h-10 rounded-full bg-surface-container-highest overflow-hidden border border-outline-variant"
                >
                  <div className="w-full h-full bg-surface-container-high flex items-center justify-center">
                    <span className="material-symbols-outlined text-on-surface-variant text-[20px]">person</span>
                  </div>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-surface border border-outline-variant shadow-lg z-50">
                    <div className="px-md py-sm border-b border-outline-variant">
                      <p className="font-label-caps text-label-caps text-primary">{user.name}</p>
                      <p className="font-label-sm text-[10px] text-on-surface-variant">{user.email}</p>
                    </div>
                    <Link to="/settings" className="block px-md py-sm font-label-caps text-label-caps text-on-surface-variant hover:bg-surface-container-low transition-colors">
                      SETTINGS
                    </Link>
                    <button 
                      onClick={() => { setDropdownOpen(false); logout(); }}
                      className="w-full text-left px-md py-sm font-label-caps text-label-caps text-error hover:bg-error-container transition-colors border-t border-outline-variant"
                    >
                      SIGN OUT
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-md">
              <button 
                onClick={toggleDarkMode}
                className="p-sm rounded-full hover:bg-surface-container-low transition-colors duration-200"
              >
                <span className="material-symbols-outlined text-primary">
                  {isDarkMode ? 'light_mode' : 'dark_mode'}
                </span>
              </button>
              <Link to="/login" className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors">
                LOG IN
              </Link>
              <Link to="/register" className="mandate-btn-primary text-[11px] px-lg py-sm">
                GET STARTED
              </Link>
            </div>
          )}
        </div>
      </header>
    );
  }

  // App variant — top bar for pages with sidebar or top+sidebar layout
  return (
    <header className="flex justify-between items-center px-lg w-full h-16 sticky top-0 z-50 bg-background border-b border-surface-variant">
      <div className="flex items-center gap-md">
        <span className="font-display-lg text-headline-lg font-black tracking-tighter text-primary">MANDATE</span>
        <div className="hidden md:flex gap-md ml-lg">
          <nav className="flex gap-gutter">
            <Link to="/dashboard" className="text-primary font-bold border-b-2 border-primary py-4 cursor-pointer transition-all duration-150">Command</Link>
            <Link to="/projects" className="text-on-surface-variant font-medium hover:text-primary py-4 transition-all duration-150">Fleet</Link>
            <Link to="/goals" className="text-on-surface-variant font-medium hover:text-primary py-4 transition-all duration-150">Resources</Link>
            <Link to="/settings" className="text-on-surface-variant font-medium hover:text-primary py-4 transition-all duration-150">Safety</Link>
          </nav>
        </div>
      </div>
      <div className="flex items-center gap-md">
        <div className="hidden md:flex items-center bg-surface-container-low px-md py-sm rounded-full">
          <span className="material-symbols-outlined text-outline text-[18px]">search</span>
          <input className="bg-transparent border-none focus:ring-0 font-label-sm text-sm ml-sm w-48 outline-none placeholder:text-outline" placeholder="Global Search" type="text" />
        </div>
        <div className="flex items-center gap-sm">
          <button 
            onClick={toggleDarkMode}
            className="p-sm rounded-full hover:bg-surface-container-low transition-colors cursor-pointer active:opacity-80"
          >
            <span className="material-symbols-outlined text-primary">{isDarkMode ? 'light_mode' : 'dark_mode'}</span>
          </button>
          <button className="p-sm rounded-full hover:bg-surface-container-low transition-colors cursor-pointer active:opacity-80">
            <span className="material-symbols-outlined text-primary">terminal</span>
          </button>
          <button className="p-sm rounded-full hover:bg-surface-container-low transition-colors cursor-pointer active:opacity-80">
            <span className="material-symbols-outlined text-primary">settings</span>
          </button>
          <button className="p-sm rounded-full hover:bg-surface-container-low transition-colors cursor-pointer active:opacity-80">
            <span className="material-symbols-outlined text-primary">notifications</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
