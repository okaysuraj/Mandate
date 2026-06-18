// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const TodoCard = ({ todo, onEdit, onDelete, onStatusChange, isTrashView, onRestore, onPermanentDelete }) => {
  const isCompleted = todo.status === "completed";

  const toggleStatus = () => {
    if (isTrashView) return;
    onStatusChange(todo._id, isCompleted ? "pending" : "completed");
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0 }}
      className="group flex items-start gap-5 py-6 border-b border-[#F0F0F0] dark:border-gray-800 relative w-full"
    >
      <button 
        onClick={toggleStatus}
        disabled={isTrashView}
        className={`mt-1 shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
          ${isCompleted ? 'border-[#1A1A1A] bg-[#1A1A1A] dark:border-white dark:bg-white' : 'border-gray-400 hover:border-[#1A1A1A] dark:hover:border-white'}
          ${isTrashView ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isCompleted && (
          <svg className="w-3.5 h-3.5 text-white dark:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      <div className="flex-1 cursor-pointer pr-32" onClick={() => !isTrashView && onEdit(todo)}>
        <h3 className={`text-[17px] font-medium transition-colors
          ${isCompleted ? 'line-through text-gray-400' : 'text-[#1A1A1A] dark:text-white'}`}
        >
          {todo.title}
        </h3>
        <div className="flex items-center gap-2 mt-1.5 text-[11px] font-bold text-gray-500 tracking-widest font-['Space_Grotesk']">
           <span className="capitalize">{todo.project || 'Inbox'}</span>
           <span className="w-[3px] h-[3px] rounded-full bg-gray-400"></span>
           {todo.priority && <span className="capitalize">{todo.priority} Priority</span>}
           {todo.dueDate && !isNaN(new Date(todo.dueDate)) && (
             <>
               <span className="w-[3px] h-[3px] rounded-full bg-gray-400"></span>
               <span>{new Date(todo.dueDate).toLocaleDateString()}</span>
             </>
           )}
        </div>
      </div>

      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
         {isTrashView ? (
           <>
             <button onClick={() => onRestore(todo._id)} className="text-[10px] font-bold text-green-600 hover:text-green-700 uppercase tracking-widest px-3 py-1.5 border border-green-200 rounded-sm bg-green-50">Restore</button>
             <button onClick={() => onPermanentDelete(todo._id)} className="text-[10px] font-bold text-red-500 hover:text-red-700 uppercase tracking-widest px-3 py-1.5 border border-red-100 rounded-sm bg-red-50">Delete Forever</button>
           </>
         ) : (
           <button onClick={() => onDelete(todo._id)} className="text-[10px] font-bold text-red-500 hover:text-red-700 uppercase tracking-widest px-3 py-1.5 border border-red-100 rounded-sm bg-red-50 dark:bg-red-900/20 dark:border-red-900">Delete</button>
         )}
      </div>
    </motion.div>
  );
};

export default TodoCard;
