import { useState, useCallback } from "react";
import DataStatus from "../common/DataStatus";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import BottomNav from "./BottomNav";
import TaskComposer from "../core/TaskComposer";

const AppLayout = ({ children, fullWidth = false }) => {
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    return localStorage.getItem("sidebarCollapsed") === "true";
  });
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const closeMobile=useCallback(()=>setIsMobileSidebarOpen(false),[]);
  const handleToggleSidebar = () => {
    if (window.innerWidth < 768) {
      setIsMobileSidebarOpen((prev) => !prev);
    } else {
      setIsSidebarCollapsed((prev) => {
        const next = !prev;
        localStorage.setItem("sidebarCollapsed", String(next));
        return next;
      });
    }
  };

  return (
    <div className="bg-background text-on-background font-body-md overflow-x-hidden selection:bg-primary selection:text-on-primary min-h-screen">
      <Navbar
        variant="app"
        onNewTask={() => setIsComposerOpen(true)}
        onToggleSidebar={handleToggleSidebar}
      />

      <div className="flex min-h-screen">
        <Sidebar
          onNewTask={() => setIsComposerOpen(true)}
          isCollapsed={isSidebarCollapsed}
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={closeMobile}
        />

        <main className={`flex-1 transition-all duration-200 ${
          isSidebarCollapsed ? "md:ml-16" : "md:ml-64"
        } pt-20 px-3 sm:px-5 md:px-8 pb-28 md:pb-16 min-h-[calc(100vh-4rem)]`}>
          <div className={fullWidth ? "w-full max-w-[1720px] mx-auto" : "max-w-container-max mx-auto"}>
            <DataStatus/>
            {children}
          </div>
        </main>
      </div>

      <BottomNav
        onNewTask={() => setIsComposerOpen(true)}
        onOpenMenu={() => setIsMobileSidebarOpen(true)}
      />

      {isComposerOpen && (
        <TaskComposer
          isOpen={isComposerOpen}
          onClose={() => setIsComposerOpen(false)}
        />
      )}
    </div>
  );
};

export default AppLayout;
