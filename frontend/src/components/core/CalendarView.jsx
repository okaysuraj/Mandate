import {makeFeatureClient} from '../../../../shared/featureData';
import {useWorkspace} from '../../context/WorkspaceContext';
import { useState, useMemo, useEffect } from 'react';
import {
  startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval,
  format, isSameMonth, isSameDay, addMonths, subMonths, isToday
} from 'date-fns';
import { ChevronLeft, ChevronRight, Plus, Video } from 'lucide-react';
import api from '../../lib/axios';
import EventModal from '../ui/EventModal';
import { useSocket } from '../../context/SocketContext';

const eventClient=makeFeatureClient(api);
const CalendarView = ({ todos = [] }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const {activeWorkspace}=useWorkspace();const workspaceId=activeWorkspace?._id;
  const [error,setError]=useState(''),[revision,setRevision]=useState(0);
  const [events, setEvents] = useState([]);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const { socket } = useSocket();

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentDate), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(currentDate), { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  }, [currentDate]);

  useEffect(()=>{
    setEvents([]);setError('');if(!workspaceId)return;const controller=new AbortController();eventClient.all('/events',{workspaceId},controller.signal).then(data=>{if(!controller.signal.aborted)setEvents(data);}).catch(error=>{if(!controller.signal.aborted)setError(error.response?.data?.message||'Could not load events');});return()=>controller.abort();
  },[workspaceId,revision]);

  useEffect(() => {
    if (!socket) return;
    const handleEventCreated = (e) => {if(e.workspaceId===workspaceId)setEvents(prev => [...prev.filter(item=>item._id!==e._id), e]);};
    const handleEventUpdated = (e) => {if(e.workspaceId===workspaceId)setEvents(prev => prev.map(ev => ev._id === e._id ? e : ev));};
    const handleEventDeleted = (id) => setEvents(prev => prev.filter(ev => ev._id !== id));

    socket.on("event_created", handleEventCreated);
    socket.on("event_updated", handleEventUpdated);
    socket.on("event_deleted", handleEventDeleted);

    return () => {
      socket.off("event_created", handleEventCreated);
      socket.off("event_updated", handleEventUpdated);
      socket.off("event_deleted", handleEventDeleted);
    };
  }, [socket,workspaceId]);

  const isValidDate = (d) => d instanceof Date && !isNaN(d);

  const getTodosForDay = (day) => {
    return (todos || []).filter(todo => {
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
    <div className="w-full flex flex-col bg-surface-container-lowest border border-outline-variant rounded-xl p-4 text-on-surface shadow-sm">
      {error&&<p role="alert">{error}</p>}<div className="flex items-center justify-between mb-4 pb-3 border-b border-outline-variant">
        <h2 className="text-xl md:text-2xl font-black font-mono tracking-tight uppercase text-on-surface">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => openCreateModal()}
            className="flex items-center gap-1.5 text-xs font-mono font-bold bg-primary text-on-primary px-3.5 py-1.5 rounded-lg uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
          >
            <Plus size={14} /> New Event
          </button>
          <div className="flex items-center border border-outline-variant bg-surface-container-lowest rounded-lg overflow-hidden">
            <button
              onClick={prevMonth}
              className="w-8 h-8 flex items-center justify-center hover:bg-surface-container transition-colors border-r border-outline-variant text-on-surface cursor-pointer"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={nextMonth}
              className="w-8 h-8 flex items-center justify-center hover:bg-surface-container transition-colors text-on-surface cursor-pointer"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-7 border border-outline-variant rounded-lg overflow-hidden">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((dayName) => (
          <div key={dayName} className="py-2.5 text-center text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-widest border-b border-r border-outline-variant bg-surface-container-low last:border-r-0">
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
              className={`min-h-[85px] sm:min-h-[110px] p-2 border-b border-r border-outline-variant relative group ${
                !isCurrentMonth ? 'bg-surface-container-low/40 text-on-surface-variant/40' : 'bg-surface-container-lowest text-on-surface'
              } ${idx % 7 === 6 ? 'border-r-0' : ''}`}
            >
              <div className="flex justify-between items-start mb-1">
                <div className={`text-xs font-mono font-bold flex items-center justify-center w-5 h-5 rounded-full ${
                  isToday(day) ? 'bg-primary text-on-primary' : 'text-on-surface'
                }`}>
                  {format(day, 'd')}
                </div>
                <button
                  onClick={() => openCreateModal(day)}
                  className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-surface-container text-on-surface-variant hover:text-on-surface rounded transition-opacity cursor-pointer"
                >
                  <Plus size={12} />
                </button>
              </div>

              <div className="flex flex-col gap-1">
                {/* Events */}
                {dayEvents.map(event => (
                  <div
                    key={event._id}
                    onClick={() => { setEditingEvent(event); setIsEventModalOpen(true); }}
                    className="text-[9px] font-mono font-bold truncate px-1.5 py-0.5 rounded bg-surface-container-highest text-primary border border-primary/30 cursor-pointer flex items-center gap-1 uppercase"
                    title={event.title}
                  >
                    {event.meetingLink && <Video size={9} />}
                    <span>{isValidDate(new Date(event.startTime)) ? format(new Date(event.startTime), 'HH:mm') : ''}</span>
                    <span className="truncate">{event.title}</span>
                  </div>
                ))}

                {/* Todos */}
                {dayTodos.map(todo => (
                  <div
                    key={todo._id}
                    className="text-[9px] font-mono font-semibold truncate px-1.5 py-0.5 rounded bg-surface-container border border-outline-variant flex items-center gap-1"
                    title={todo.title}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      todo.status === 'completed' ? 'bg-tertiary' :
                      todo.priority === 'high' ? 'bg-error' :
                      todo.priority === 'medium' ? 'bg-primary' : 'bg-outline'
                    }`} />
                    <span className={todo.status === 'completed' ? 'line-through text-on-surface-variant' : 'text-on-surface'}>
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
        onSave={() => setRevision(value=>value+1)}
      />
    </div>
  );
};

export default CalendarView;
