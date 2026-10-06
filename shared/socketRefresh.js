// Coalesce bursts of edits into one refresh, with a maximum wait during sustained traffic.
export const subscribeRefresh = (socket, callback, {delay=250,maxWait=1000}={}) => {
  if (!socket) return ()=>{};
  let trailing, deadline, active=true;
  const flush=()=>{clearTimeout(trailing);clearTimeout(deadline);trailing=null;deadline=null;if(active)callback();};
  const schedule=()=>{clearTimeout(trailing);trailing=setTimeout(flush,delay);if(!deadline)deadline=setTimeout(flush,maxWait);};
  for(const event of ['task:created','task:updated','task:deleted'])socket.on(event,schedule);
  return ()=>{active=false;clearTimeout(trailing);clearTimeout(deadline);for(const event of ['task:created','task:updated','task:deleted'])socket.off(event,schedule);};
};
