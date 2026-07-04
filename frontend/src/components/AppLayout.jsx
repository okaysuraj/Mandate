import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import BottomNav from "./BottomNav";
import TaskComposer from "./TaskComposer";

const AppLayout = ({ children }) => {
  const [isComposerOpen, setIsComposerOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      {/* Desktop Sidebar */}
      <Sidebar onNewTask={() => setIsComposerOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col min-w-0">
        {/* Top Bar */}
        <Navbar variant="app" />

        {/* Page Content */}
        <div className="flex-grow overflow-y-auto">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <BottomNav onNewTask={() => setIsComposerOpen(true)} />

      {/* Task Composer Modal */}
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
