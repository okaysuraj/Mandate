import { useState, useMemo, useEffect } from 'react';
import { 
  startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, 
  format, isSameMonth, isSameDay, addMonths, subMonths, isToday 
} from 'date-fns';
import { ChevronLeft, ChevronRight, Plus, Video } from 'lucide-react';
import axios from 'axios';
import EventModal from './EventModal';
import { useSocket } from '../context/SocketContext';

const CalendarView = ({ todos }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const { socket } = useSocket();

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentDate));
    const end = endOfWeek(endOfMonth(currentDate));
    return eachDayOfInterval({ start, end });
  }, [currentDate]);

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (!socket) return;
    const handleEventCreated = (e) => setEvents(prev => [...prev, e]);
    const handleEventUpdated = (e) => setEvents(prev => prev.map(ev => ev._id === e._id ? e : ev));
    const handleEventDeleted = (id) => setEvents(prev => prev.filter(ev => ev._id !== id));

    socket.on("event_created", handleEventCreated);
    socket.on("event_updated", handleEventUpdated);
    socket.on("event_deleted", handleEventDeleted);

    return () => {
      socket.off("event_created", handleEventCreated);
      socket.off("event_updated", handleEventUpdated);
      socket.off("event_deleted", handleEventDeleted);
    }
  }, [socket]);

  const fetchEvents = async () => {
    try {
      const { data } = await axios.get('/api/events');
      setEvents(data);
    } catch (error) {
      console.error("Failed to fetch events", error);
    }
  };

  const isValidDate = (d) => d instanceof Date && !isNaN(d);

  const getTodosForDay = (day) => {
    return todos.filter(todo => {
      if (!todo.dueDate) return false;
      const d = new Date(todo.dueDate);
      return isValidDate(d) && isSameDay(d, day);
    });
  };

  const getEventsForDay = (day) => {
    return events.filter(e => {
      if (!e.startTime) return false;
      const d = new Date(e.startTime);
      return isValidDate(d) && isSameDay(d, day);
    });
  };

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const openCreateModal = (day = null) => {
    setEditingEvent(day ? { startTime: day.toISOString() } : null);
    setIsEventModalOpen(true);
  };

  return (
    <div className="w-full flex flex-col bg-white dark:bg-[#0A0A0A] border-t border-[#F0F0F0] pt-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold font-['Space_Grotesk'] tracking-tight">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <div className="flex items-center gap-4">
          <button onClick={() => openCreateModal()} className="flex items-center gap-2 text-sm font-bold bg-[#1A1A1A] dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg">
            <Plus size={16} /> New Event
          </button>
          <button onClick={prevMonth} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
            <ChevronLeft size={20} />
          </button>
          <button onClick={nextMonth} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 border border-[#EDEDF0] rounded-lg overflow-hidden">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((dayName) => (
          <div key={dayName} className="py-3 text-center text-[10px] font-bold text-gray-500 uppercase tracking-widest border-b border-[#EDEDF0] bg-[#F9F9FB]">
            {dayName}
          </div>
        ))}

        {days.map((day, idx) => {
          const dayTodos = getTodosForDay(day);
          const dayEvents = getEventsForDay(day);
          const isCurrentMonth = isSameMonth(day, currentDate);
          
          return (
            <div 
              key={day.toString()} 
              className={`min-h-[120px] p-2 border-b border-r border-[#EDEDF0] dark:border-gray-800 relative group ${
                !isCurrentMonth ? 'bg-gray-50 dark:bg-[#050505] text-gray-400' : 'bg-white dark:bg-[#1A1A1A]'
              } ${idx % 7 === 6 ? 'border-r-0' : ''} ${
                idx >= days.length - 7 ? 'border-b-0' : ''
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className={`text-xs font-bold flex items-center justify-center w-6 h-6 rounded-full ${
                  isToday(day) ? 'bg-[#1A1A1A] dark:bg-white text-white dark:text-black' : ''
                }`}>
                  {format(day, 'd')}
                </div>
                <button 
                  onClick={() => openCreateModal(day)}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-opacity"
                >
                  <Plus size={12} />
                </button>
              </div>
              
              <div className="flex flex-col gap-1">
                {/* Render Events */}
                {dayEvents.map(event => (
                  <div 
                    key={event._id}
                    onClick={() => { setEditingEvent(event); setIsEventModalOpen(true); }}
                    className="text-[10px] font-semibold truncate px-2 py-1 rounded bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 cursor-pointer flex items-center gap-1"
                    title={event.title}
                  >
                    {event.meetingLink && <Video size={10} />}
                    <span>{isValidDate(new Date(event.startTime)) ? format(new Date(event.startTime), 'HH:mm') : ''}</span>
                    <span className="truncate">{event.title}</span>
                  </div>
                ))}
                
                {/* Render Todos */}
                {dayTodos.map(todo => (
                  <div 
                    key={todo._id} 
                    className="text-[10px] font-semibold truncate px-2 py-1 rounded bg-[#F9F9FB] dark:bg-[#111] border border-[#EDEDF0] dark:border-gray-800 flex items-center gap-1"
                    title={todo.title}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      todo.status === 'completed' ? 'bg-green-500' :
                      todo.priority === 'high' ? 'bg-red-500' :
                      todo.priority === 'medium' ? 'bg-yellow-500' : 'bg-gray-400'
                    }`} />
                    <span className={todo.status === 'completed' ? 'line-through text-gray-400' : 'dark:text-white'}>
                      {todo.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <EventModal 
        isOpen={isEventModalOpen} 
        onClose={() => setIsEventModalOpen(false)} 
        initialData={editingEvent}
        onSave={() => fetchEvents()}
      />
    </div>
  );
};

export default CalendarView;
