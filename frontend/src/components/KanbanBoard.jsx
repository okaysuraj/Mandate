import { useState } from "react";
import TodoCard from "./TodoCard";
import { Plus } from "lucide-react";

const KanbanBoard = ({ todos, onEdit, onDelete, onStatusChange, onRestore, onPermanentDelete, openCreateModal }) => {
  const [draggedTodo, setDraggedTodo] = useState(null);

  const columns = [
    { id: "pending", title: "To Do", status: "pending" },
    { id: "in-progress", title: "In Progress", status: "in-progress" },
    { id: "completed", title: "Completed", status: "completed" }
  ];

  const handleDragStart = (e, todo) => {
    setDraggedTodo(todo);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, targetStatus) => {
    e.preventDefault();
    if (draggedTodo && draggedTodo.status !== targetStatus) {
      onStatusChange(draggedTodo._id, targetStatus);
    }
    setDraggedTodo(null);
  };

  return (
    <div className="flex flex-col mt-4">
      <div className="flex gap-6 pb-4">
        {columns.map((column) => {
          const columnTodos = todos.filter(t => t.status === column.status && !t.isDeleted);
          
          return (
            <div 
              key={column.id}
              className="flex flex-col flex-1 bg-[#F9F9FB] dark:bg-[#111] rounded-lg border border-[#EDEDF0] dark:border-gray-800 min-h-[500px]"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.status)}
            >
              <div className="p-4 border-b border-[#EDEDF0] dark:border-gray-800 flex items-center justify-between bg-white dark:bg-[#1A1A1A]">
                <h3 className="font-bold text-sm text-[#1A1A1A] dark:text-white uppercase tracking-widest font-['Space_Grotesk']">
                  {column.title}
                </h3>
                <span className="text-xs font-bold text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                  {columnTodos.length}
                </span>
              </div>
              
              <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3">
                {columnTodos.map(todo => (
                  <div 
                    key={todo._id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, todo)}
                    className="cursor-move"
                  >
                    <TodoCard 
                      todo={todo}
                      onEdit={openEditModal => onEdit(todo)}
                      onDelete={onDelete}
                      onStatusChange={onStatusChange}
                      isTrashView={false}
                      onRestore={onRestore}
                      onPermanentDelete={onPermanentDelete}
                    />
                  </div>
                ))}
                
                {column.status === "pending" && (
                  <button 
                    onClick={openCreateModal}
                    className="flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed border-[#EDEDF0] dark:border-gray-800 rounded-lg text-sm font-semibold text-gray-500 hover:text-[#1A1A1A] dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
                  >
                    <Plus size={16} /> Add Task
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
