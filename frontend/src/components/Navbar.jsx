import { Link, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Button } from "./ui/Button";
import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import WorkspaceSwitcher from "./WorkspaceSwitcher";
import NotificationBell from "./NotificationBell";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (document.documentElement.classList.contains("dark")) {
      setIsDarkMode(true);
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
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const getNavClass = (path, hash) => {
    let isActive = false;
    if (hash) {
      isActive = location.hash === hash;
    } else {
      isActive = location.pathname === path;
    }

    const baseClass = "text-[10px] font-bold uppercase tracking-widest transition-colors font-['Space_Grotesk']";
    return isActive 
      ? `${baseClass} text-[#1A1A1A] hover:text-black relative after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-[#1A1A1A] dark:text-white dark:after:bg-white`
      : `${baseClass} text-gray-500 hover:text-[#1A1A1A] dark:text-gray-400 dark:hover:text-white`;
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F9F9FB]/90 dark:bg-[#0A0A0A]/90 backdrop-blur-md border-b border-[#D9DADC] dark:border-gray-800 transition-colors">
      <div className="mx-auto max-w-[1600px] px-8 py-5 flex items-center justify-between">
        <div className="flex-1">
          <Link to="/" className="flex items-center gap-2 group w-fit">
            <h1 className="text-2xl font-bold tracking-tight text-[#1A1A1A] dark:text-white uppercase font-['Space_Grotesk']">
              MANDATE
            </h1>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center justify-center gap-8 flex-1">
          <a href="/#features" className={getNavClass("/", "#features")}>FEATURES</a>
          <Link to="/pricing" className={getNavClass("/pricing")}>PRICING</Link>
          <Link to="/dashboard" className={getNavClass("/dashboard")}>DASHBOARD</Link>
        </div>

        <div className="flex items-center justify-end gap-6 flex-1">
          {user ? (
            <div className="flex items-center gap-4">
              <NotificationBell />
              <WorkspaceSwitcher />
              <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-[#1A1A1A] dark:hover:text-white transition-colors focus:outline-none"
              >
                <span className="hidden sm:block font-medium">Hello, {user.name}</span>
                <ChevronDown size={16} />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1A1A1A] border border-[#D9DADC] dark:border-gray-800 rounded-md shadow-lg py-1 z-50">
                  <button 
                    onClick={toggleDarkMode}
                    className="w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-[#F3F3F5] dark:hover:bg-black flex items-center justify-between"
                  >
                    Dark Mode
                    <div className={`w-8 h-4 rounded-full relative transition-colors ${isDarkMode ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}>
                      <div className={`absolute top-0.5 left-0.5 w-3 h-3 rounded-full bg-white transition-transform ${isDarkMode ? 'translate-x-4' : 'translate-x-0'}`}></div>
                    </div>
                  </button>
                  <button 
                    onClick={() => {
                      setDropdownOpen(false);
                      logout();
                    }}
                    className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 font-medium border-t border-[#F0F0F0] dark:border-gray-800"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" className="uppercase text-[10px] tracking-widest font-bold dark:text-white dark:hover:bg-gray-800">Log In</Button>
              </Link>
              <Link to="/register">
                <Button className="uppercase tracking-widest text-[10px] px-8 font-bold dark:bg-white dark:text-black dark:hover:bg-gray-200">Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
