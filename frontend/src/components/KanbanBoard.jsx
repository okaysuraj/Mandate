import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import axios from "axios";
import toast from "react-hot-toast";

const KanbanBoard = ({ tasks, onEdit, onDelete, onStatusChange, openCreateModal, setTasks }) => {

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
      // Reorder within the same column
      const columnTasks = tasks.filter(t => t.status === sourceStatus).sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0));
      const [reorderedItem] = columnTasks.splice(result.source.index, 1);
      columnTasks.splice(result.destination.index, 0, reorderedItem);

      // Update order index locally
      const updatedTasks = tasks.map(t => {
        if (t.status === sourceStatus) {
          const newIndex = columnTasks.findIndex(ct => ct._id === t._id);
          return { ...t, orderIndex: newIndex };
        }
        return t;
      });
      setTasks(updatedTasks);
      
      // Update remotely
      try {
        await axios.put("/api/tasks/reorder", { tasks: columnTasks.map((t, i) => ({ _id: t._id, orderIndex: i })) });
      } catch (error) {
        toast.error("Failed to reorder");
      }
    } else {
      // Move to a different column
      onStatusChange(taskId, destStatus);
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
      <div className="flex gap-gutter h-full pb-lg overflow-x-auto custom-scrollbar flex-1 items-start min-w-max">
        {columns.map((column) => {
          // fallback validation to in-progress if backend doesn't support it (temporarily handled here)
          const columnTasks = tasks.filter(t => (t.status === column.status || (column.status === 'validation' && t.status === 'validation'))).sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0));
          
          return (
            <div key={column.id} className="min-w-[320px] w-[320px] flex flex-col gap-md max-h-full">
              <div className="flex items-center justify-between px-xs">
                <div className="flex items-center gap-sm">
                  <div className={`w-2 h-2 rounded-full ${column.dotColor}`}></div>
                  <span className="font-label-caps text-label-caps text-primary uppercase">{column.title}</span>
                  <span className={`px-sm py-1 rounded text-[10px] font-bold ${column.countClass}`}>
                    {String(columnTasks.length).padStart(2, '0')}
                  </span>
                </div>
                <span className="material-symbols-outlined text-outline cursor-pointer hover:text-primary">more_horiz</span>
              </div>
              
              <Droppable droppableId={column.status}>
                {(provided) => (
                  <div 
                    className="flex-1 flex flex-col gap-md overflow-y-auto custom-scrollbar pr-xs min-h-[150px]"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {columnTasks.map((task, index) => {
                      const priority = getPriorityLabel(task.priority);
                      return (
                        <Draggable key={task._id} draggableId={task._id} index={index}>
                          {(provided, snapshot) => (
                            <div 
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`bg-surface-container-lowest border ${column.status === 'in-progress' ? 'border-l-4 border-l-primary border-surface-variant' : 'border-surface-variant'} p-md rounded shadow-sm hover:border-outline transition-colors cursor-grab active:cursor-grabbing group ${snapshot.isDragging ? 'opacity-80 scale-[1.02] shadow-md z-50' : ''}`}
                            >
                              <div className="flex items-center justify-between mb-sm">
                                <span className="bg-surface-container text-on-surface-variant px-sm py-xs rounded font-label-caps text-[9px]">
                                  {task._id.substring(task._id.length - 6).toUpperCase()}
                                </span>
                                <span className={`font-label-caps text-[10px] font-bold uppercase ${priority.class}`}>
                                  {priority.label}
                                </span>
                              </div>
                              <h3 className="font-headline-lg text-body-md font-bold mb-md leading-tight group-hover:text-primary">{task.title}</h3>
                              
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
                                    {column.status === 'completed' ? 'Verified by OP' : column.status === 'in-progress' ? 'Live Tuning' : (task.description ? 'Task details' : 'No details')}
                                  </span>
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button onClick={(e) => { e.stopPropagation(); onEdit(task); }} className="material-symbols-outlined text-[16px] text-outline hover:text-primary">edit</button>
                                  <button onClick={(e) => { e.stopPropagation(); onDelete(task._id); }} className="material-symbols-outlined text-[16px] text-error hover:text-error/80">delete</button>
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
        <div className="min-w-[320px] w-[320px] flex flex-col items-center justify-center border-2 border-dashed border-surface-variant rounded-lg opacity-50 hover:opacity-100 hover:border-outline transition-all cursor-pointer h-64" onClick={openCreateModal}>
          <span className="material-symbols-outlined text-outline text-[48px] mb-sm">add_circle</span>
          <span className="font-label-caps text-label-caps text-on-surface-variant">Create Mandate</span>
        </div>
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
