import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import TodoCard from "../components/TodoCard";
import TodoModal from "../components/TodoModal";
import CalendarView from "../components/CalendarView";
import KanbanBoard from "../components/KanbanBoard";
import ErrorBoundary from "../components/ErrorBoundary";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useSocket } from "../context/SocketContext";
import { Button } from "../components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { Inbox, Calendar, CalendarDays, Plus, Settings, Trash2, FolderPlus } from "lucide-react";
import { Link } from "react-router";

const HomePage = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  
  // 'Today', 'Upcoming', 'Trash', 'Calendar', 'Inbox', or Project Name
  const [currentView, setCurrentView] = useState(() => {
    return localStorage.getItem('mandate_currentView') || 'Today';
  });
  
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");

  const { user, updateUser } = useAuth();
  const { socket } = useSocket();

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const params = { page: 1, limit: 100 };
      
      if (currentView === 'Trash') {
        params.isDeleted = 'true';
      } else {
        params.isDeleted = 'false';
        
        if (currentView !== 'Today' && currentView !== 'Upcoming' && currentView !== 'Calendar' && currentView !== 'Inbox' && currentView !== 'Kanban') {
          // It's a specific project view
          params.project = currentView;
        }
      }

      const { data } = await axios.get("/api/todos", { params });
      setTodos(data.data);
    } catch {
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchTodos();
    }
    localStorage.setItem('mandate_currentView', currentView);
  }, [user, currentView]);

  useEffect(() => {
    if (!socket) return;

    const handleTodoCreated = (newTodo) => {
      setTodos((prev) => [newTodo, ...prev]);
    };

    const handleTodoUpdated = (updatedTodo) => {
      setTodos((prev) => prev.map(t => t._id === updatedTodo._id ? updatedTodo : t));
    };

    const handleTodoDeleted = (deletedId) => {
      setTodos((prev) => prev.filter(t => t._id !== deletedId));
    };

    socket.on("todo_created", handleTodoCreated);
    socket.on("todo_updated", handleTodoUpdated);
    socket.on("todo_deleted", handleTodoDeleted);

    return () => {
      socket.off("todo_created", handleTodoCreated);
      socket.off("todo_updated", handleTodoUpdated);
      socket.off("todo_deleted", handleTodoDeleted);
    };
  }, [socket]);

  const handleSaveTodo = async (todoData) => {
    try {
      if (editingTodo) {
        await axios.put(`/api/todos/${editingTodo._id}`, todoData);
        toast.success("Task updated");
      } else {
        await axios.post("/api/todos", todoData);
        toast.success("Task created");
      }
      setIsModalOpen(false);
      setEditingTodo(null);
      fetchTodos();
    } catch (_error) {
      toast.error(_error.response?.data?.message || "Failed to save task");
    }
  };

  const handleDelete = async (id) => {
    try {
      if (currentView === 'Trash') {
        // We'll let the onPermanentDelete handle hard deletes from trash
        return;
      }
      // Soft Delete
      await axios.put(`/api/todos/${id}`, { isDeleted: true });
      toast.success("Task moved to trash");
      fetchTodos();
    } catch {
      toast.error("Failed to delete task");
    }
  };

  const handlePermanentDelete = async (id) => {
    if (!window.confirm("Permanently delete this task? This cannot be undone.")) return;
    try {
      await axios.delete(`/api/todos/${id}`);
      toast.success("Task permanently deleted");
      fetchTodos();
    } catch {
      toast.error("Failed to delete task");
    }
  };

  const handleRestore = async (id) => {
    try {
      await axios.put(`/api/todos/${id}`, { isDeleted: false });
      toast.success("Task restored");
      fetchTodos();
    } catch {
      toast.error("Failed to restore task");
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`/api/todos/${id}`, { status: newStatus });
      toast.success("Status updated");
      fetchTodos();
    } catch {
      toast.error("Failed to update status");
    }
  };

  const openEditModal = (todo) => {
    setEditingTodo(todo);
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setEditingTodo(null);
    setIsModalOpen(true);
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;
    try {
      const { data } = await axios.post('/api/users/projects', { project: newProjectName.trim() });
      updateUser(data);
      setNewProjectName("");
      setIsCreatingProject(false);
      toast.success("Project group created");
    } catch (_error) {
      toast.error(_error.response?.data?.message || "Failed to create project");
    }
  };

  const calculateEfficiency = () => {
    const completedTasks = todos.filter(t => t.status === 'completed');
    if (completedTasks.length === 0) return 0;

    let onTimeCount = 0;
    completedTasks.forEach(t => {
      if (!t.dueDate) {
        onTimeCount++;
      } else {
        const completedAt = new Date(t.updatedAt);
        const dueAt = new Date(t.dueDate);
        
        completedAt.setHours(0, 0, 0, 0);
        dueAt.setHours(0, 0, 0, 0);
        
        if (completedAt <= dueAt) {
          onTimeCount++;
        }
      }
    });

    return Math.round((onTimeCount / completedTasks.length) * 100);
  };

  const getTopUpcomingTasks = () => {
    const today = new Date();
    today.setHours(0,0,0,0);
    return todos
      .filter(t => t.status !== 'completed' && t.priority === 'high' && t.dueDate && new Date(t.dueDate) >= today)
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      .slice(0, 5);
  };

  const getNavClass = (viewName) => {
    const isActive = currentView === viewName;
    return `flex items-center gap-4 text-sm transition-colors relative ${isActive ? 'font-bold text-[#1A1A1A] dark:text-white' : 'font-semibold text-gray-600 dark:text-gray-400 hover:text-[#1A1A1A] dark:hover:text-white'}`;
  };

  const renderContent = () => {
    if (currentView === 'Inbox') {
      return (
        <div className="text-center py-20 border-t border-b border-[#F0F0F0] dark:border-gray-800 mt-12">
          <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
            <Inbox size={24} className="text-gray-400" />
          </div>
          <h2 className="text-xl font-bold mb-2">Notifications</h2>
          <p className="text-gray-400 text-sm font-semibold">Coming soon. We are building a robust notification center.</p>
        </div>
      );
    }

    if (currentView === 'Calendar') {
      return (
        <ErrorBoundary>
          <CalendarView todos={todos} />
        </ErrorBoundary>
      );
    }

    if (currentView === 'Kanban') {
      return (
        <KanbanBoard 
          todos={todos}
          onEdit={openEditModal}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
          onRestore={handleRestore}
          onPermanentDelete={handlePermanentDelete}
          openCreateModal={openCreateModal}
        />
      );
    }

    // Default Todo List View (Today, Upcoming, Trash, Project)
    let displayTodos = todos;
    if (currentView === 'Today') {
      const today = new Date();
      displayTodos = todos.filter(t => {
        if (!t.dueDate) return false;
        const due = new Date(t.dueDate);
        return due.getDate() === today.getDate() && due.getMonth() === today.getMonth() && due.getFullYear() === today.getFullYear();
      });
    }

    return (
      <div className="flex flex-col">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#1A1A1A] dark:border-white"></div>
          </div>
        ) : displayTodos.length === 0 ? (
          <div className="text-center py-12 border-t border-b border-[#F0F0F0] dark:border-gray-800">
            <p className="text-gray-400 text-sm font-semibold">
              {currentView === 'Trash' ? 'Trash is empty.' : 'No tasks found. Enjoy the focus.'}
            </p>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="w-full flex flex-col border-t border-[#F0F0F0] dark:border-gray-800"
          >
            <AnimatePresence mode="popLayout">
              {displayTodos.map((todo) => (
                <TodoCard 
                  key={todo._id} 
                  todo={todo} 
                  onEdit={openEditModal}
                  onDelete={handleDelete}
                  onStatusChange={handleStatusChange}
                  isTrashView={currentView === 'Trash'}
                  onRestore={handleRestore}
                  onPermanentDelete={handlePermanentDelete}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {currentView !== 'Trash' && (
          <button 
            onClick={openCreateModal}
            className="flex items-center gap-4 text-sm font-bold text-gray-500 hover:text-[#1A1A1A] dark:hover:text-white transition-colors py-6 border-b border-[#F0F0F0] dark:border-gray-800"
          >
            <Plus size={16} /> Add task
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] font-sans text-[#1A1A1A] dark:text-white flex flex-col transition-colors">
      <Navbar />

      <main className="flex-1 max-w-[1400px] w-full mx-auto px-8 py-16 flex flex-col md:flex-row gap-12 lg:gap-24 relative">
        {/* Left Sidebar */}
        <aside className="w-full md:w-56 shrink-0 flex flex-col gap-10 mt-2">
          <nav className="flex flex-col gap-5">
            <button onClick={() => setCurrentView('Inbox')} className={getNavClass('Inbox')}>
              {currentView === 'Inbox' && <span className="absolute -left-6 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#1A1A1A] dark:bg-white rounded-full"></span>}
              <Inbox size={18} /> Inbox
            </button>
            <button onClick={() => setCurrentView('Today')} className={getNavClass('Today')}>
              {currentView === 'Today' && <span className="absolute -left-6 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#1A1A1A] dark:bg-white rounded-full"></span>}
              <Calendar size={18} /> Today
            </button>
            <button onClick={() => setCurrentView('Upcoming')} className={getNavClass('Upcoming')}>
              {currentView === 'Upcoming' && <span className="absolute -left-6 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#1A1A1A] dark:bg-white rounded-full"></span>}
              <CalendarDays size={18} /> Upcoming
            </button>
            <button onClick={() => setCurrentView('Calendar')} className={getNavClass('Calendar')}>
              {currentView === 'Calendar' && <span className="absolute -left-6 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#1A1A1A] dark:bg-white rounded-full"></span>}
              <Calendar size={18} /> Calendar
            </button>
            <button onClick={() => setCurrentView('Kanban')} className={getNavClass('Kanban')}>
              {currentView === 'Kanban' && <span className="absolute -left-6 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#1A1A1A] dark:bg-white rounded-full"></span>}
              <FolderPlus size={18} /> Kanban Board
            </button>
            <button onClick={() => setCurrentView('Trash')} className={getNavClass('Trash')}>
              {currentView === 'Trash' && <span className="absolute -left-6 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#1A1A1A] dark:bg-white rounded-full"></span>}
              <Trash2 size={18} /> Trash
            </button>
            <Link to="/settings" className="flex items-center gap-4 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-[#1A1A1A] dark:hover:text-white transition-colors mt-4">
              <Settings size={18} /> Settings
            </Link>
          </nav>

          <div>
            <h3 className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-4 flex items-center justify-between">
              Projects
              <button onClick={() => setIsCreatingProject(!isCreatingProject)} className="hover:text-[#1A1A1A] dark:hover:text-white transition-colors p-1">
                <FolderPlus size={14} />
              </button>
            </h3>
            
            {isCreatingProject && (
              <form onSubmit={handleCreateProject} className="mb-4 flex items-center gap-2">
                <input 
                  type="text" 
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="New group..." 
                  className="w-full text-xs px-2 py-1.5 bg-[#F9F9FB] dark:bg-[#1A1A1A] border border-[#EDEDF0] dark:border-gray-800 rounded focus:outline-none focus:border-[#1A1A1A] dark:focus:border-white"
                  autoFocus
                />
              </form>
            )}

            <nav className="flex flex-col gap-4">
              {user?.projects?.map(project => (
                <button 
                  key={project} 
                  onClick={() => setCurrentView(project)} 
                  className={`flex items-center gap-4 text-sm transition-colors relative ${currentView === project ? 'font-bold text-[#1A1A1A] dark:text-white' : 'font-semibold text-gray-500 hover:text-[#1A1A1A] dark:hover:text-white'}`}
                >
                  {currentView === project && <span className="absolute -left-6 top-1/2 -translate-y-1/2 w-1 h-1 bg-[#1A1A1A] dark:bg-white rounded-full"></span>}
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${currentView === project ? 'bg-[#1A1A1A] dark:bg-white' : 'bg-gray-300 dark:bg-gray-700'}`}></span> {project}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div className={`flex-1 ${currentView === 'Kanban' ? 'min-w-0' : 'max-w-2xl'}`}>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter uppercase text-[#1A1A1A] dark:text-white font-['Space_Grotesk'] leading-none mb-3">
            {currentView}
          </h1>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-16 font-['Space_Grotesk']">
            {currentView === 'Trash' ? 'DELETED ITEMS' : currentView === 'Inbox' ? 'NOTIFICATIONS' : 'YOUR TASK OVERVIEW'}
          </p>

          {renderContent()}

          {/* Stats Cards (Hide in Trash/Calendar/Inbox/Kanban) */}
          {['Today', 'Upcoming'].includes(currentView) && (
            <div className="grid grid-cols-2 gap-4 mt-16">
              <div className="bg-[#F9F9FB] dark:bg-[#1A1A1A] border border-[#EDEDF0] dark:border-gray-800 p-6 rounded-sm">
                <h4 className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-3">Efficiency</h4>
                <p className="text-4xl font-bold text-[#1A1A1A] dark:text-white font-['Space_Grotesk'] tracking-tight">{calculateEfficiency()}%</p>
              </div>
              <div className="bg-[#F9F9FB] dark:bg-[#1A1A1A] border border-[#EDEDF0] dark:border-gray-800 p-6 rounded-sm">
                <h4 className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-3">Completion</h4>
                <p className="text-4xl font-bold text-[#1A1A1A] dark:text-white font-['Space_Grotesk'] tracking-tight">
                  {todos.filter(t => t.status === 'completed').length}/{todos.length}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        {currentView !== 'Kanban' && (
          <aside className="w-full md:w-56 shrink-0 flex flex-col gap-12 mt-2">
            <div>
            <h3 className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-4">High Priority Upcoming</h3>
            <div className="flex flex-col gap-4">
              {getTopUpcomingTasks().length === 0 ? (
                <p className="text-xs text-gray-400 font-semibold">No high priority tasks upcoming.</p>
              ) : (
                getTopUpcomingTasks().map(task => (
                  <div key={task._id} className="flex flex-col gap-1 p-3 bg-[#F9F9FB] dark:bg-[#1A1A1A] border border-[#EDEDF0] dark:border-gray-800 rounded-sm">
                    <h4 className="text-xs font-bold text-[#1A1A1A] dark:text-white truncate" title={task.title}>{task.title}</h4>
                    <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">{new Date(task.dueDate).toLocaleDateString()}</span>
                  </div>
                ))
              )}
            </div>
            </div>
          </aside>
        )}
      </main>

      <AnimatePresence>
        {isModalOpen && (
          <TodoModal 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveTodo}
            initialData={editingTodo}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;
