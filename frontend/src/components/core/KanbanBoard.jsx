import React, { useState, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import api from "../../lib/axios";

const DEFAULT_TASKS = [
  { _id: "650a11111111111111111101", title: "API Gateway Protocol Setup", status: "pending", priority: "urgent", description: "Configure OAuth2 token verification and rate limiting rules for endpoints.", tags: ["backend", "security"] },
  { _id: "650a11111111111111111102", title: "Database Index Optimization", status: "in-progress", priority: "high", description: "Add compound index on workspaceId and createdAt for high-throughput queries.", tags: ["database", "perf"] },
  { _id: "650a11111111111111111103", title: "Global Search Suggestions UI", status: "validation", priority: "medium", description: "Realtime dynamic search debounce tuning and command palette shortcut bindings.", tags: ["frontend", "ui"] },
  { _id: "650a11111111111111111104", title: "User Profile Avatar Sync", status: "completed", priority: "high", description: "Cloudinary pipeline sync for high-res operative badges.", tags: ["profile", "media"] },
  { _id: "650a11111111111111111105", title: "System Notification Bell Dropdown", status: "completed", priority: "medium", description: "Unread count and clear all actions via real-time WebSocket sync.", tags: ["socket", "notifications"] },
];

const COLUMNS = [
  { 
    id: "pending", 
    title: "Backlog", 
    status: "pending", 
    dotColor: "bg-outline", 
    badgeClass: "bg-surface-container-high text-on-surface-variant border-outline-variant",
  },
  { 
    id: "in-progress", 
    title: "In Progress", 
    status: "in-progress", 
    dotColor: "bg-primary", 
    badgeClass: "bg-surface-container-highest text-primary border-primary",
  },
  { 
    id: "validation", 
    title: "Validation", 
    status: "validation", 
    dotColor: "bg-tertiary", 
    badgeClass: "bg-tertiary-container text-on-tertiary-container border-outline-variant",
  },
  { 
    id: "completed", 
    title: "Deployed", 
    status: "completed", 
    dotColor: "bg-tertiary", 
    badgeClass: "bg-surface-container-highest text-on-surface-variant border-outline-variant",
  }
];

const getPriorityDetails = (priority) => {
  switch (priority) {
    case "urgent":
      return { 
        label: "CRITICAL", 
        badge: "bg-error-container text-error border-error font-bold",
        dot: "bg-error"
      };
    case "high":
      return { 
        label: "HIGH", 
        badge: "bg-surface-container-highest text-primary border-primary font-bold",
        dot: "bg-primary"
      };
    case "medium":
      return { 
        label: "MEDIUM", 
        badge: "bg-tertiary-container text-on-tertiary-container border-outline-variant",
        dot: "bg-tertiary"
      };
    default:
      return { 
        label: "ROUTINE", 
        badge: "bg-surface-container text-on-surface-variant border-outline-variant",
        dot: "bg-outline"
      };
  }
};

const KanbanBoard = ({ tasks, onEdit, onDelete, onStatusChange, openCreateModal, setTasks }) => {
  const safeTasks = Array.isArray(tasks) && tasks.length > 0 ? tasks : DEFAULT_TASKS;
  const boardRef = useRef(null);
  const [activeMobileCol, setActiveMobileCol] = useState("pending");

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const sourceStatus = result.source.droppableId;
    const destStatus = result.destination.droppableId;
    const taskId = result.draggableId;

    if (sourceStatus === destStatus) {
      if (result.source.index === result.destination.index) return;

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
        if (!String(taskId).startsWith("650a1111") && !String(taskId).startsWith("demo-")) {
          await api.put("/tasks/reorder", { 
            tasks: columnTasks.map((t, i) => ({ _id: t._id || t.id, orderIndex: i })) 
          });
        }
      } catch (error) {
        console.warn("Reorder sync silently skipped", error);
      }
    } else {
      if (onStatusChange) {
        onStatusChange(taskId, destStatus);
      }
    }
  };

  const scrollToColumn = (colId) => {
    setActiveMobileCol(colId);
    const element = document.getElementById(`kanban-col-${colId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Mobile Column Quick-Jump Switcher */}
      <div className="md:hidden sticky top-14 z-20 bg-background flex overflow-x-auto gap-2 py-2 border-b border-outline-variant/70 custom-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
        {COLUMNS.map((col) => {
          const count = safeTasks.filter(t => (t.status || 'pending') === col.status).length;
          const isSelected = activeMobileCol === col.id;
          return (
            <button
              key={col.id}
              onClick={() => scrollToColumn(col.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-wider rounded-full border transition-all flex-shrink-0 cursor-pointer ${
                isSelected
                  ? "bg-primary text-on-primary border-primary shadow-sm"
                  : "bg-surface-container-low text-on-surface-variant border-outline-variant hover:border-primary"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${col.dotColor}`}></span>
              <span>{col.title}</span>
              <span className="font-mono text-[10px] opacity-80">({count})</span>
            </button>
          );
        })}
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div 
          ref={boardRef}
          className="flex xl:grid xl:grid-cols-4 gap-4 min-h-[580px] pb-8 overflow-x-auto xl:overflow-x-visible custom-scrollbar flex-1 items-start snap-x pr-6 sm:pr-8 xl:pr-0 w-full"
        >
          {COLUMNS.map((column) => {
            const columnTasks = safeTasks.filter(t => {
              const taskStatus = t.status || 'pending';
              return taskStatus === column.status || (column.status === 'validation' && taskStatus === 'validation');
            }).sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0));
            
            return (
              <div 
                id={`kanban-col-${column.id}`}
                key={column.id} 
                className="min-w-[280px] w-[280px] sm:min-w-[300px] sm:w-[300px] xl:min-w-0 xl:w-full flex-shrink-0 xl:flex-shrink flex flex-col gap-2 rounded-2xl p-3 sm:p-3.5 bg-surface-container-low/90 border border-outline-variant shadow-xs snap-start transition-all"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between px-3 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest shadow-xs">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${column.dotColor}`}></span>
                    <span className="font-mono text-xs font-black tracking-wider text-on-surface uppercase">
                      {column.title}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${column.badgeClass}`}>
                      {String(columnTasks.length).padStart(2, '0')}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={() => openCreateModal && openCreateModal(column.status)}
                      title={`Add directive to ${column.title}`}
                      className="w-7 h-7 rounded-md border border-outline-variant hover:border-primary bg-surface-container-lowest text-on-surface hover:text-primary flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">add</span>
                    </button>
                  </div>
                </div>
                
                {/* Droppable Column Area */}
                <Droppable droppableId={column.status}>
                  {(provided, snapshot) => (
                    <div 
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`flex-1 flex flex-col gap-2.5 p-1 min-h-[400px] rounded-lg transition-colors border-2 ${
                        snapshot.isDraggingOver 
                          ? 'border-dashed border-primary bg-surface-container-high/40' 
                          : 'border-transparent'
                      }`}
                    >
                      {columnTasks.map((task, index) => {
                        const taskIdStr = String(task._id || task.id || `task-${column.id}-${index}`);
                        const displayCode = taskIdStr.length >= 6 ? taskIdStr.slice(-6).toUpperCase() : taskIdStr.toUpperCase();
                        const priority = getPriorityDetails(task.priority);
                        const isCompleted = column.status === "completed";
                        const isInProgress = column.status === "in-progress";

                        return (
                          <Draggable key={taskIdStr} draggableId={taskIdStr} index={index}>
                            {(provided, snapshot) => (
                              <div 
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                onClick={() => onEdit && onEdit(task)}
                                className={`group relative rounded-xl p-3.5 transition-all duration-150 cursor-grab active:cursor-grabbing select-none border ${
                                  isInProgress 
                                    ? 'border-primary/50 bg-surface-container-lowest shadow-sm ring-1 ring-primary/20' 
                                    : isCompleted
                                    ? 'border-outline-variant bg-surface-container-lowest/80 opacity-80'
                                    : 'border-outline-variant bg-surface-container-lowest hover:border-primary/50 hover:shadow-sm'
                                } ${
                                  snapshot.isDragging 
                                    ? 'shadow-xl border-primary bg-surface-container-lowest scale-[1.02] z-50 ring-2 ring-primary rounded-xl' 
                                    : ''
                                }`}
                              >
                                {/* Header: Ref Code & Priority */}
                                <div className="flex items-center justify-between gap-2 mb-2">
                                  <span className="font-mono text-[9px] font-bold tracking-widest text-on-surface-variant bg-surface-container px-2 py-0.5 rounded border border-outline-variant">
                                    #MND-{displayCode}
                                  </span>
                                  <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider border ${priority.badge}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${priority.dot}`}></span>
                                    {priority.label}
                                  </span>
                                </div>
                                
                                {/* Task Title */}
                                <h3 className={`font-mono text-xs font-bold mb-1.5 leading-snug tracking-tight text-on-surface group-hover:text-primary transition-colors ${
                                  isCompleted ? 'line-through text-on-surface-variant' : ''
                                }`}>
                                  {task.title || "Untitled Mandate"}
                                </h3>
                                
                                {/* Description */}
                                {task.description && (
                                  <p className="font-body-md text-[11px] text-on-surface-variant line-clamp-2 mb-2 leading-relaxed">
                                    {task.description}
                                  </p>
                                )}

                                {/* Tags */}
                                {task.tags && task.tags.length > 0 && (
                                  <div className="flex flex-wrap gap-1 mb-2">
                                    {task.tags.slice(0, 3).map((tag, tIdx) => (
                                      <span 
                                        key={tIdx} 
                                        className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-surface-container text-on-surface-variant border border-outline-variant font-medium"
                                      >
                                        #{tag}
                                      </span>
                                    ))}
                                  </div>
                                )}
                                
                                {/* Footer Meta */}
                                <div className="flex items-center justify-between pt-2 border-t border-outline-variant mt-1">
                                  <div className="flex items-center gap-2">
                                    {task.dueDate ? (
                                      <div className="flex items-center gap-1 text-[10px] font-mono text-on-surface-variant">
                                        <span className="material-symbols-outlined text-[13px] text-on-surface-variant">calendar_today</span>
                                        <span>{new Date(task.dueDate).toLocaleDateString([], { month: 'short', day: 'numeric' })}</span>
                                      </div>
                                    ) : (
                                      <div className="flex items-center gap-1 text-[10px] font-mono text-on-surface-variant">
                                        <span className="material-symbols-outlined text-[13px]">schedule</span>
                                        <span>QUEUE</span>
                                      </div>
                                    )}

                                    {isInProgress && (
                                      <span className="flex items-center gap-1 text-[9px] font-mono text-primary uppercase font-bold">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                                        ACTIVE
                                      </span>
                                    )}
                                    {isCompleted && (
                                      <span className="flex items-center gap-1 text-[9px] font-mono text-tertiary uppercase font-bold">
                                        <span className="material-symbols-outlined text-[12px]">check_circle</span>
                                        DONE
                                      </span>
                                    )}
                                  </div>
                                  
                                  {/* Quick Action Icons */}
                                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button 
                                      onClick={(e) => { 
                                        e.stopPropagation(); 
                                        onEdit && onEdit(task); 
                                      }} 
                                      title="Edit Mandate"
                                      className="w-6 h-6 rounded hover:bg-surface-container-highest text-on-surface-variant hover:text-primary border border-transparent hover:border-outline-variant transition-colors cursor-pointer flex items-center justify-center"
                                    >
                                      <span className="material-symbols-outlined text-[14px]">edit</span>
                                    </button>
                                    <button 
                                      onClick={(e) => { 
                                        e.stopPropagation(); 
                                        onDelete && onDelete(taskIdStr); 
                                      }} 
                                      title="Delete Mandate"
                                      className="w-6 h-6 rounded hover:bg-error-container text-on-surface-variant hover:text-error border border-transparent hover:border-error transition-colors cursor-pointer flex items-center justify-center"
                                    >
                                      <span className="material-symbols-outlined text-[14px]">delete</span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}

                      {/* Empty Column Drop Hint */}
                      {columnTasks.length === 0 && !snapshot.isDraggingOver && (
                        <div 
                          onClick={() => openCreateModal && openCreateModal(column.status)}
                          className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-outline-variant rounded-lg text-center hover:border-primary hover:bg-surface-container/50 transition-colors cursor-pointer my-auto"
                        >
                          <span className="material-symbols-outlined text-outline text-[24px] mb-1">add_task</span>
                          <span className="font-mono text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">
                            No Directives
                          </span>
                          <span className="font-mono text-[9px] text-on-surface-variant mt-0.5 uppercase">
                            Click + to assign
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
