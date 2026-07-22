import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import BottomNav from "./BottomNav";
import TaskComposer from "./TaskComposer";

const AppLayout = ({ children }) => {
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    return localStorage.getItem("sidebarCollapsed") === "true";
  });

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem("sidebarCollapsed", String(next));
      return next;
    });
  };

  return (
    <div className="bg-background text-on-background font-body-md overflow-x-hidden selection:bg-primary-fixed-dim">
      <Navbar 
        variant="app" 
        onNewTask={() => setIsComposerOpen(true)} 
        onToggleSidebar={handleToggleSidebar}
      />

      <div className="flex min-h-screen">
        <Sidebar 
          onNewTask={() => setIsComposerOpen(true)} 
          isCollapsed={isSidebarCollapsed}
        />

        <main className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? "md:ml-16" : "md:ml-64"} pt-20 px-lg md:px-xl pb-xl min-h-[calc(100vh-4rem)]`}>
          <div className="max-w-container-max mx-auto">
            {children}
          </div>
        </main>
      </div>

      <BottomNav onNewTask={() => setIsComposerOpen(true)} />

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
