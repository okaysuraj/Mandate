import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import BottomNav from "./BottomNav";
import TaskComposer from "./TaskComposer";

const AppLayout = ({ children }) => {
  const [isComposerOpen, setIsComposerOpen] = useState(false);

  return (
    <div className="bg-background text-on-background font-body-md overflow-x-hidden selection:bg-primary-fixed-dim">
      <Navbar variant="app" onNewTask={() => setIsComposerOpen(true)} />

      <div className="flex min-h-screen">
        <Sidebar onNewTask={() => setIsComposerOpen(true)} />

        <main className="flex-1 md:ml-64 p-lg md:p-xl mt-4">
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
