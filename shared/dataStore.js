// One implementation for web and native; all data comes from the authenticated API.
const compactTask = task => {
  const {attachments: _attachments, subtasks: _subtasks, ...summary} = task;
  return summary;
};
export const createDataStore = (create, api, {now = Date.now, staleTime = 30000} = {}) => {
  let generation = 0;
  let pending = null;
  let controller = null;
  let loadedAt = null;
  let taskEvents = new Map();
  let consumers = 0, releaseTimer;
  const sockets = new WeakMap();
  return create((set, get) => {
    const invalidate = () => {
      generation++;
      controller?.abort();
      controller = null;
      pending = null;
      loadedAt = null;
      taskEvents = new Map();
    };
    return {
      tasks: [], notifications: [], loading: false, error: null, workspaceId: null, taskDataReady:false,
      retainTasks: () => {
        clearTimeout(releaseTimer); consumers++;
        let retained = true;
        return () => {
          if (!retained) return;
          retained = false;
          if (--consumers === 0) releaseTimer = setTimeout(()=>{
            controller?.abort(); controller=null; pending=null; loadedAt=null; taskEvents.clear();
            set({tasks:[],loading:false,taskDataReady:false});
          },15000);
        };
      },
      reset: () => {invalidate(); set({tasks:[],notifications:[],loading:false,error:null,workspaceId:null,taskDataReady:false});},
      setWorkspace: workspaceId => {
        if (workspaceId === get().workspaceId) return;
        invalidate(); set({workspaceId,tasks:[],notifications:[],loading:false,error:null,taskDataReady:false});
      },
      loadTasks: (options = {}) => {
        if (!get().workspaceId) return Promise.resolve();
        if (pending) return pending;
        if (!options.force && loadedAt !== null && now() - loadedAt < staleTime) return Promise.resolve();
        const ticket = generation, workspaceId = get().workspaceId;
        controller = new AbortController();
        const signal = controller.signal;
        set({loading:true,error:null});
        taskEvents = new Map();
        const request = (async () => {
          try {
            let page = 1, pages = 1;
            const tasks = [];
            do {
              const {data} = await api.get('/tasks', {params:{workspaceId,view:'summary',limit:200,page}, signal});
              if (signal.aborted || ticket !== generation) return;
              tasks.push(...data.data.map(compactTask));
              pages = data.pagination.pages; page++;
            } while (page <= pages);
            if (ticket !== generation || signal.aborted) return;
            const rows = new Map(tasks.map(task => [task._id,task]));
            for (const [id,task] of taskEvents) {if (task) rows.set(id,task); else rows.delete(id);}
            taskEvents.clear();
            loadedAt = now();
            set({tasks:[...rows.values()],loading:false,taskDataReady:true});
          } catch (error) {
            if (ticket === generation && !signal.aborted) set({loading:false,error:error.response?.data?.message||'Failed to load tasks'});
          } finally {if (ticket === generation && controller?.signal === signal) {pending = null; controller = null; taskEvents.clear();}}
        })();
        pending = request;
        return request;
      },
      loadNotifications: async () => {
        const ticket = generation;
        try {
          const {data} = await api.get('/notifications',{params:{limit:100,page:1}});
          if (ticket === generation) set({notifications:Array.isArray(data)?data:data.data});
        } catch (error) {if (ticket === generation) set({error:error.response?.data?.message||'Failed to load notifications'});}
      },
      markNotificationRead: async id => {
        const ticket = generation;
        await api.patch('/notifications/'+id+'/read');
        if (ticket === generation) set(state=>({notifications:state.notifications.map(item=>item._id===id?{...item,isRead:true}:item)}));
      },
      subscribeToSocket: socket => {
        if (!socket) return () => {};
        let subscription = sockets.get(socket);
        if (!subscription) {
          const created = raw => {
            if (String(raw.workspaceId) !== get().workspaceId) return;
            if (loadedAt === null && !get().loading) return;
            const task = compactTask(raw);
            if (get().loading) taskEvents.set(task._id,task);
            set(state=>({tasks:[task,...state.tasks.filter(item=>item._id!==task._id)]}));
          };
          const updated = raw => {
            if (String(raw.workspaceId) !== get().workspaceId) return;
            if (loadedAt === null && !get().loading) return;
            const task = compactTask(raw);
            if (get().loading) taskEvents.set(task._id,task);
            set(state=>({tasks:state.tasks.map(item=>item._id===task._id?{...item,...task}:item)}));
          };
          const deleted = raw => {
            if (loadedAt === null && !get().loading) return;
            const id = String(raw);
            if (get().loading) taskEvents.set(id,null);
            set(state=>({tasks:state.tasks.filter(item=>item._id!==id)}));
          };
          const notification = item => set(state=>({notifications:[item,...state.notifications.filter(existing=>existing._id!==item._id)].slice(0,100)}));
          subscription = {count:0,listeners:[['task:created',created],['task:updated',updated],['task:deleted',deleted],['notification_created',notification]]};
          for (const [event,callback] of subscription.listeners) socket.on(event,callback);
          sockets.set(socket,subscription);
        }
        subscription.count++;
        let active = true;
        return () => {
          if (!active) return;
          active = false;
          if (--subscription.count === 0) {
            for (const [event,callback] of subscription.listeners) socket.off(event,callback);
            sockets.delete(socket);
          }
        };
      },
      reorderTasks: async tasks => {
        const ticket = generation, workspaceId = get().workspaceId;
        const existing = new Map(get().tasks.map(task=>[task._id,task.orderIndex]));
        const records = tasks.filter(task=>existing.get(task._id)!==task.orderIndex).map(task=>({_id:task._id,orderIndex:task.orderIndex}));
        for (let start=0;start<records.length;start+=200) {
          if (ticket!==generation) return;
          await api.put('/tasks/reorder',{tasks:records.slice(start,start+200)});
        }
        if (ticket===generation && workspaceId===get().workspaceId) {
          // Filtered boards must retain the tasks outside their current filter.
          const changes = new Map(tasks.map(task=>[task._id,compactTask(task)]));
          set(state=>({tasks:state.tasks.map(task=>changes.get(task._id)||task)}));
        }
      },
      moveTask: async (id,status) => {
        const ticket = generation;
        const {data} = await api.put('/tasks/'+id,{status});
        if (ticket===generation) set(state=>({tasks:state.tasks.map(task=>task._id===id?compactTask(data):task)}));
        return data;
      },
    };
  });
};
