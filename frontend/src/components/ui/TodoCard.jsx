import { motion } from "framer-motion";
import { Zap, Clock, Calendar, CheckCircle } from "lucide-react";

const TodoCard = ({ todo: task, onEdit, onDelete, onStatusChange }) => {
  const isCompleted = task.status === "done";

  const toggleStatus = (e) => {
    e.stopPropagation();
    onStatusChange(task._id, isCompleted ? "todo" : "done");
  };

  const getPriorityColor = () => {
    if (task.priority === 'high') return 'text-red-500 bg-red-50 dark:bg-red-500/10';
    if (task.priority === 'medium') return 'text-yellow-600 bg-yellow-50 dark:text-yellow-400 dark:bg-yellow-500/10';
    return 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-500/10';
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`group flex flex-col gap-3 p-4 rounded-xl border bg-white dark:bg-black/40 shadow-sm hover:shadow-md transition-all relative w-full ${isCompleted ? 'opacity-60 border-green-200 dark:border-green-900/30' : 'border-zinc-200 dark:border-white/10 hover:border-zinc-300 dark:hover:border-white/20'}`}
      onClick={onEdit}
    >
      <div className="flex items-start gap-3">
        <button 
          onClick={toggleStatus}
          className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all mt-0.5
            ${isCompleted ? 'border-green-500 bg-green-500' : 'border-zinc-300 dark:border-zinc-600 hover:border-black dark:hover:border-white'}`}
        >
          {isCompleted && <CheckCircle className="w-3.5 h-3.5 text-white" />}
        </button>

        <div className="flex-1 min-w-0 pr-8">
          <h3 className={`text-sm font-semibold truncate transition-colors
            ${isCompleted ? 'line-through text-zinc-400' : 'text-black dark:text-white'}`}
          >
            {task.title}
          </h3>
          {task.intent && (
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1 truncate flex items-center">
              <Zap className="w-3 h-3 mr-1 shrink-0" /> {task.intent}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 mt-1">
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${getPriorityColor()}`}>
          {task.priority || 'Medium'}
        </span>
        
        {task.timeEstimate && (
          <span className="flex items-center text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-white/5 px-2 py-0.5 rounded">
            <Clock className="w-3 h-3 mr-1" /> {task.timeEstimate}m
          </span>
        )}
        
        {task.dueDate && (
          <span className="flex items-center text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-white/5 px-2 py-0.5 rounded">
            <Calendar className="w-3 h-3 mr-1" /> {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
      </div>

      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-3 right-3 flex items-center gap-2">
        <button 
          onClick={(e) => { e.stopPropagation(); onDelete(task._id); }} 
          className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-md transition-colors"
          title="Delete Task"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
};

export default TodoCard;
