const dayFormatters = new Map();
export const taskDay = (date, timezone = 'UTC') => {
 let formatter = dayFormatters.get(timezone);
 if (!formatter) {
  formatter = new Intl.DateTimeFormat('en-CA', {timeZone:timezone,year:'numeric',month:'2-digit',day:'2-digit'});
  if (dayFormatters.size === 8) dayFormatters.delete(dayFormatters.keys().next().value);
  dayFormatters.set(timezone,formatter);
 }
 return formatter.format(new Date(date));
};
export const todaySchedule = (tasks, timezone = 'UTC') => {
 const today = taskDay(new Date(), timezone);
 return tasks.filter(task => task.status !== 'archived' && task.dueDate && taskDay(task.dueDate, timezone) === today).sort((a,b) => new Date(a.dueDate) - new Date(b.dueDate));
};
export const activeFocusTask = tasks => {
 let first;
 for (const task of tasks) {
  if (['completed','archived'].includes(task.status)) continue;
  first ??= task;
  if (['urgent','high'].includes(task.priority)) return task;
 }
 return first;
};
export const localDateTime = date => { const value = new Date(date); return new Date(value.getTime() - value.getTimezoneOffset()*60000).toISOString().slice(0,16); };
