import { motion } from "framer-motion";
import { Zap, Clock, Calendar, CheckSquare, Square } from "lucide-react";

const TodoCard = ({ todo: task, onEdit, onDelete, onStatusChange }) => {
  const isCompleted = task.status === "done" || task.status === "completed";

  const toggleStatus = (e) => {
    e.stopPropagation();
    onStatusChange(task._id, isCompleted ? "pending" : "completed");
  };

  const getPriorityBadge = () => {
    if (task.priority === 'urgent' || task.priority === 'high') {
      return 'text-error bg-error-container border border-outline-variant font-bold';
    }
    if (task.priority === 'medium') {
      return 'text-on-tertiary-container bg-tertiary-container border border-outline-variant font-medium';
    }
    return 'text-on-surface-variant bg-surface-container border border-outline-variant';
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`group flex flex-col gap-2.5 p-3.5 rounded-lg border transition-all relative w-full cursor-pointer ${
        isCompleted 
          ? 'bg-surface-container-low/50 border-outline-variant/50 opacity-70' 
          : 'bg-surface-container-lowest border-outline-variant hover:border-primary/80 hover:shadow-sm'
      }`}
      onClick={onEdit}
    >
      <div className="flex items-start gap-2.5">
        <button 
          onClick={toggleStatus}
          className={`shrink-0 w-5 h-5 rounded-md border flex items-center justify-center transition-all mt-0.5 cursor-pointer ${
            isCompleted 
              ? 'border-on-tertiary-container bg-on-tertiary-container text-white' 
              : 'border-outline-variant hover:border-primary bg-surface-container-lowest text-transparent'
          }`}
        >
          {isCompleted ? <CheckSquare className="w-3.5 h-3.5" /> : <Square className="w-3.5 h-3.5 opacity-0" />}
        </button>

        <div className="flex-1 min-w-0 pr-6">
          <h3 className={`font-mono text-xs font-bold leading-snug truncate transition-colors ${
            isCompleted ? 'line-through text-outline' : 'text-on-surface group-hover:text-primary'
          }`}>
            {task.title}
          </h3>
          {task.intent && (
            <p className="font-body-md text-[11px] text-primary mt-0.5 truncate flex items-center gap-1">
              <Zap className="w-3 h-3 shrink-0" /> {task.intent}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
        <span className={`px-2 py-0.5 rounded-full font-mono text-[9px] font-bold uppercase tracking-wider border ${getPriorityBadge()}`}>
          {task.priority || 'Routine'}
        </span>
        
        {task.timeEstimate && (
          <span className="flex items-center font-mono text-[9px] font-semibold text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full border border-outline-variant">
            <Clock className="w-2.5 h-2.5 mr-1 text-outline" /> {task.timeEstimate}m
          </span>
        )}
        
        {task.dueDate && (
          <span className="flex items-center font-mono text-[9px] font-semibold text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full border border-outline-variant">
            <Calendar className="w-2.5 h-2.5 mr-1 text-outline" /> {new Date(task.dueDate).toLocaleDateString([], { month: 'short', day: 'numeric' })}
          </span>
        )}
      </div>

      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-2.5 right-2.5 flex items-center gap-1">
        <button 
          onClick={(e) => { e.stopPropagation(); onDelete(task._id); }} 
          className="w-7 h-7 rounded-md text-outline hover:text-error hover:bg-error/10 border border-transparent hover:border-error/30 transition-colors flex items-center justify-center cursor-pointer"
          title="Delete Mandate"
        >
          <span className="material-symbols-outlined text-[15px]">delete</span>
        </button>
      </div>
    </motion.div>
  );
};

export default TodoCard;
