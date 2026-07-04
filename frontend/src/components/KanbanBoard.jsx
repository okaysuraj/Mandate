import { useState } from "react";
import TodoCard from "./TodoCard";
import { Plus } from "lucide-react";

const KanbanBoard = ({ tasks, onEdit, onDelete, onStatusChange, openCreateModal }) => {
  const [draggedTaskId, setDraggedTaskId] = useState(null);

  const columns = [
    { id: "todo", title: "To Do", status: "todo", color: "bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-white/10" },
    { id: "active", title: "Active", status: "active", color: "bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-500/20" },
    { id: "blocked", title: "Blocked", status: "blocked", color: "bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-500/20" },
    { id: "done", title: "Done", status: "done", color: "bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-300 border-green-200 dark:border-green-500/20" }
  ];

  const handleDragStart = (e, task) => {
    setDraggedTaskId(task._id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, targetStatus) => {
    e.preventDefault();
    const task = tasks.find(t => t._id === draggedTaskId);
    if (task && task.status !== targetStatus) {
      onStatusChange(task._id, targetStatus);
    }
    setDraggedTaskId(null);
  };

  return (
    <div className="w-full flex-1 overflow-x-auto pb-8 custom-scrollbar">
      <div className="flex gap-6 min-w-max h-full min-h-[600px]">
        {columns.map((column) => {
          const columnTasks = tasks.filter(t => t.status === column.status);
          
          return (
            <div 
              key={column.id}
              className={`flex flex-col w-80 rounded-2xl border ${column.color} transition-colors overflow-hidden`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.status)}
            >
              <div className="p-4 border-b border-inherit flex items-center justify-between bg-white/50 dark:bg-black/20 backdrop-blur-sm">
                <h3 className="font-bold text-sm uppercase tracking-widest font-['Space_Grotesk']">
                  {column.title}
                </h3>
                <span className="text-xs font-bold bg-white dark:bg-black/40 px-2.5 py-1 rounded-full shadow-sm">
                  {columnTasks.length}
                </span>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 custom-scrollbar">
                {columnTasks.map(task => (
                  <div 
                    key={task._id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task)}
                    className="cursor-move"
                  >
                    <TodoCard 
                      todo={task}
                      onEdit={() => onEdit(task)}
                      onDelete={() => onDelete(task._id)}
                      onStatusChange={onStatusChange}
                    />
                  </div>
                ))}
                
                {column.status === "todo" && (
                  <button 
                    onClick={openCreateModal}
                    className="flex items-center justify-center gap-2 w-full py-4 border-2 border-dashed border-inherit rounded-xl text-sm font-semibold opacity-60 hover:opacity-100 transition-opacity"
                  >
                    <Plus size={18} /> New Mandate
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KanbanBoard;
