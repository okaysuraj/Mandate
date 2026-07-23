import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import axios from "axios";
import toast from "react-hot-toast";

const DEFAULT_TASKS = [
  { _id: "650a11111111111111111101", title: "API Gateway Protocol Setup", status: "pending", priority: "urgent", description: "Configure OAuth2 token verification" },
  { _id: "650a11111111111111111102", title: "Database Index Optimization", status: "in-progress", priority: "high", description: "Add compound index to task schema" },
  { _id: "650a11111111111111111103", title: "Global Search Suggestions UI", status: "validation", priority: "medium", description: "Realtime dynamic search debounce tuning" },
  { _id: "650a11111111111111111104", title: "User Profile Avatar Sync", status: "completed", priority: "high", description: "LinkedIn style avatar sync" },
  { _id: "650a11111111111111111105", title: "System Notification Bell Dropdown", status: "completed", priority: "medium", description: "Unread count and clear all actions" },
];

const KanbanBoard = ({ tasks, onEdit, onDelete, onStatusChange, openCreateModal, setTasks }) => {
  const safeTasks = Array.isArray(tasks) && tasks.length > 0 ? tasks : DEFAULT_TASKS;

  const columns = [
    { id: "pending", title: "Backlog", status: "pending", dotColor: "bg-outline", countClass: "bg-surface-container text-on-surface-variant" },
    { id: "in-progress", title: "In Progress", status: "in-progress", dotColor: "bg-primary", countClass: "bg-primary text-on-primary" },
    { id: "validation", title: "Validation", status: "validation", dotColor: "bg-tertiary-fixed-dim", countClass: "bg-surface-container text-on-surface-variant" },
    { id: "completed", title: "Deployed", status: "completed", dotColor: "bg-on-tertiary-container", countClass: "bg-surface-container text-on-surface-variant" }
  ];

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const sourceStatus = result.source.droppableId;
    const destStatus = result.destination.droppableId;
    const taskId = result.draggableId;

    if (sourceStatus === destStatus) {
      const columnTasks = safeTasks
        .filter(t => (t.status || 'pending') === sourceStatus)
        .sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0));
        
      const [reorderedItem] = columnTasks.splice(result.source.index, 1);
      columnTasks.splice(result.destination.index, 0, reorderedItem);

      if (setTasks) {
        const updatedTasks = safeTasks.map(t => {
          if ((t.status || 'pending') === sourceStatus) {
            const newIndex = columnTasks.findIndex(ct => String(ct._id || ct.id) === String(t._id || t.id));
            return { ...t, orderIndex: newIndex };
          }
          return t;
        });
        setTasks(updatedTasks);
      }
      
      try {
        await axios.put("/api/tasks/reorder", { tasks: columnTasks.map((t, i) => ({ _id: t._id || t.id, orderIndex: i })) });
      } catch (error) {
        // Safe fail
      }
    } else {
      if (onStatusChange) {
        onStatusChange(taskId, destStatus);
      }
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case "urgent": return { label: "CRITICAL", class: "text-error" };
      case "high": return { label: "HIGH", class: "text-primary" };
      case "medium": return { label: "MEDIUM", class: "text-on-surface-variant" };
      default: return { label: "ROUTINE", class: "text-on-surface-variant" };
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex gap-gutter min-h-[550px] pb-lg overflow-x-auto custom-scrollbar flex-1 items-start min-w-max">
        {columns.map((column) => {
          const columnTasks = safeTasks.filter(t => {
            const taskStatus = t.status || 'pending';
            return taskStatus === column.status || (column.status === 'validation' && taskStatus === 'validation');
          }).sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0));
          
          return (
            <div key={column.id} className="min-w-[320px] w-[320px] flex flex-col gap-md">
              <div className="flex items-center justify-between px-xs">
                <div className="flex items-center gap-sm">
                  <div className={`w-2.5 h-2.5 rounded-full ${column.dotColor}`}></div>
                  <span className="font-label-caps text-label-caps text-primary uppercase font-bold">{column.title}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${column.countClass}`}>
                    {String(columnTasks.length).padStart(2, '0')}
                  </span>
                </div>
                <span className="material-symbols-outlined text-outline cursor-pointer hover:text-primary text-sm">more_horiz</span>
              </div>
              
              <Droppable droppableId={column.status}>
                {(provided) => (
                  <div 
                    className="flex-1 flex flex-col gap-md overflow-y-auto custom-scrollbar pr-xs min-h-[200px] bg-surface-container-lowest/30 p-2 border border-outline-variant/30 rounded"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {columnTasks.map((task, index) => {
                      const taskIdStr = String(task._id || task.id || `task-${column.id}-${index}`);
                      const displayCode = taskIdStr.length >= 6 ? taskIdStr.slice(-6).toUpperCase() : taskIdStr.toUpperCase();
                      const priority = getPriorityLabel(task.priority);

                      return (
                        <Draggable key={taskIdStr} draggableId={taskIdStr} index={index}>
                          {(provided, snapshot) => (
                            <div 
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`bg-surface-container-lowest border ${column.status === 'in-progress' ? 'border-l-4 border-l-primary border-surface-variant' : 'border-surface-variant'} p-md rounded shadow-sm hover:border-outline transition-all cursor-grab active:cursor-grabbing group ${snapshot.isDragging ? 'opacity-80 scale-[1.02] shadow-md z-50' : ''}`}
                            >
                              <div className="flex items-center justify-between mb-sm">
                                <span className="bg-surface-container text-on-surface-variant px-sm py-xs rounded font-label-caps text-[9px]">
                                  {displayCode}
                                </span>
                                <span className={`font-label-caps text-[10px] font-bold uppercase ${priority.class}`}>
                                  {priority.label}
                                </span>
                              </div>
                              
                              <h3 className="font-headline-lg text-body-md font-bold mb-md leading-tight group-hover:text-primary text-on-surface">
                                {task.title || "Untitled Task"}
                              </h3>
                              
                              <div className="mb-md">
                                <div className="flex items-center justify-between mb-xs">
                                  <span className="font-label-caps text-[9px] text-on-surface-variant uppercase">PROGRESS</span>
                                  <span className="font-label-caps text-[9px] text-primary">
                                    {column.status === 'completed' ? '100%' : column.status === 'in-progress' ? '68%' : '0%'}
                                  </span>
                                </div>
                                <div className="w-full h-1 bg-surface-container rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full ${column.status === 'completed' ? 'bg-tertiary-fixed-dim opacity-40 w-full' : column.status === 'in-progress' ? 'bg-primary w-[68%]' : 'bg-primary w-[0%]'}`}
                                  ></div>
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-between mt-lg">
                                <div className="flex items-center gap-xs">
                                  <span className="material-symbols-outlined text-[14px] text-outline">
                                    {column.status === 'completed' ? 'task_alt' : column.status === 'in-progress' ? 'bolt' : 'attachment'}
                                  </span>
                                  <span className="font-label-caps text-[10px] text-on-surface-variant truncate max-w-[120px]">
                                    {column.status === 'completed' ? 'Verified' : column.status === 'in-progress' ? 'In Progress' : (task.description ? task.description : 'Task details')}
                                  </span>
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button onClick={(e) => { e.stopPropagation(); onEdit && onEdit(task); }} className="material-symbols-outlined text-[16px] text-outline hover:text-primary cursor-pointer">edit</button>
                                  <button onClick={(e) => { e.stopPropagation(); onDelete && onDelete(taskIdStr); }} className="material-symbols-outlined text-[16px] text-error hover:text-error/80 cursor-pointer">delete</button>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
        
        {/* Add Column CTA */}
        <div 
          className="min-w-[320px] w-[320px] flex flex-col items-center justify-center border-2 border-dashed border-outline-variant/60 rounded-lg opacity-70 hover:opacity-100 hover:border-primary transition-all cursor-pointer h-64 bg-surface-container-lowest/20" 
          onClick={openCreateModal}
        >
          <span className="material-symbols-outlined text-primary text-[48px] mb-sm">add_circle</span>
          <span className="font-label-caps text-label-caps text-primary uppercase font-bold">Create Mandate</span>
        </div>
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
