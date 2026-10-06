import catalog from './featureCatalog.json';
export { catalog };
export const featureFor = key => catalog.find(feature => feature.key === key);
export const labelFor = key => key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, s => s.toUpperCase());
export const numberFields = new Set(['amount', 'rating', 'timeEstimate', 'timeSpent']);
export const jsonFields = new Set(['condition', 'filters', 'sort', 'subtasks', 'attachments']);
export const dateFields = new Set(['dueDate', 'startDate', 'targetDate', 'startTime', 'endTime']);
export const referenceFields = { projectId: 'projects', parentTaskId: 'tasks', taskId: 'tasks', assigneeId: 'members', ownerId: 'members', parentDocId: 'documents' };
export const enumFor = (field, mode) => {
  const values = {
    priority: ['low', 'medium', 'high', 'urgent'], severity: ['low', 'medium', 'high', 'critical'],
    energyLevel: ['', 'low', 'medium', 'high'], recurrenceRule: ['', 'daily', 'weekly', 'monthly'],
    viewType: ['list', 'kanban', 'calendar', 'timeline', 'table'], period: ['daily', 'weekly', 'monthly', 'task'],
    trigger: ['task_created', 'status_changed', 'priority_changed'], action: ['change_status', 'change_priority', 'add_tag', 'assign_user'],
    isActive: ['true', 'false']
  };
  if (field === 'status') return mode === 'tasks' || mode === 'task-detail' ? ['pending', 'in-progress', 'validation', 'completed', 'archived'] : mode === 'goals' || mode === 'goal-detail' ? ['active', 'achieved', 'abandoned'] : mode === 'projects' || mode === 'project-detail' ? ['active', 'archived', 'completed'] : ['open', 'in-progress', 'resolved', 'archived'];
  return values[field];
};
export const initialForm = (feature, item = {}) => Object.fromEntries(feature.fields.map(field => {
  const raw = item[field];
  let value = raw == null ? '' : raw;
  if (jsonFields.has(field)) value = raw == null ? (['condition', 'filters', 'sort'].includes(field) ? '{}' : '[]') : JSON.stringify(raw, null, 2);
  else if (Array.isArray(raw)) value = raw.map(v => v?._id || v).join(', ');
  else if (raw && typeof raw === 'object') value = raw._id || '';
  else if (dateFields.has(field) && raw) value = new Date(raw).toISOString();
  if (!raw && enumFor(field, feature.mode)) value = enumFor(field, feature.mode)[0];
  if(field==='period'&&!raw)value=/monthly/.test(feature.key)?'monthly':/weekly/.test(feature.key)?'weekly':/task/.test(feature.key)?'task':'daily';
  if (field === 'date' && !raw) value = new Date().toLocaleDateString('en-CA');
  if (field === 'currency' && !raw) value = 'USD';
  return [field, String(value)];
}));
export const payloadFor = (feature, form) => Object.fromEntries(feature.fields.map(field => {
  const raw = form[field] ?? '';
  let value = raw;
  if (jsonFields.has(field)) value = JSON.parse(raw || '{}');
  else if (numberFields.has(field)) { value = raw === '' ? null : Number(raw); if (value !== null && !Number.isFinite(value)) throw new Error('Invalid ' + labelFor(field)); }
  else if (dateFields.has(field)) { value = raw ? new Date(raw).toISOString() : null; }
  else if (referenceFields[field]) value = raw || null;
  else if (['tags', 'linkedTasks', 'attendees'].includes(field)) value = raw.split(',').map(v => v.trim()).filter(Boolean);
  else if (field === 'isActive') value = raw === 'true';
  return [field, value];
}));
const endpoints = { tasks: '/tasks', projects: '/projects', goals: '/goals', documents: '/documents', automations: '/automations', events: '/events', 'saved-views': '/productivity/saved-views', reviews: '/productivity/reviews' };
export const endpointFor = feature => feature.mode === 'records' ? '/features/' + feature.key : endpoints[feature.mode];
export const listFrom = data => Array.isArray(data) ? data : data?.data || [];
export const makeFeatureClient = api => {
  const page = async (endpoint, params = {}, signal) => {
    const current = params.page || 1, limit = params.limit || 50;
    const {data} = await api.get(endpoint, {params:{...params,page:current,limit,paginate:'true'},signal});
    const items = listFrom(data);
    return {items,pagination:{page:current,limit,total:data.pagination?.total ?? null,
      hasNext:data.pagination ? current < data.pagination.pages : items.length === limit}};
  };
  const all = async (endpoint, params = {}, signal) => {
    let page = 1, output = [];
    while (true) {
      const { data } = await api.get(endpoint, { params: { ...params, page, limit: 200 }, signal });
      const records = listFrom(data); output.push(...records);
      if (data.pagination ? page >= data.pagination.pages : records.length < 200) break;
      page++;
    }
    return output;
  };
  const load = async (feature, workspaceId, user, signal, selectedId, options = {}) => {
    const params = { workspaceId, page:options.page || 1, limit:50 };
    const mode = feature.mode;
    const get = path => api.get(path, { params, signal }).then(res => res.data);
    if (endpointFor(feature)) {
      return page(endpointFor(feature), mode === 'reviews' ? {...params,...(/monthly/.test(feature.key)?{period:'monthly'}:/weekly/.test(feature.key)?{period:'weekly'}:/daily|end-of-day/.test(feature.key)?{period:'daily'}:{})} : params, signal);
    }
    if(mode==='focus'){
      const [tasks,sessions]=await Promise.all([page('/tasks',params,signal),page('/productivity/focus',{workspaceId,active:'true',limit:1},signal)]);
      return {...tasks,active:sessions.items[0]||null};
    }
    if(mode==='mandates')return page('/planning/history',params,signal);
    if (['task-detail', 'project-detail', 'goal-detail'].includes(mode)) {
      const endpoint = mode === 'task-detail' ? '/tasks' : mode === 'project-detail' ? '/projects' : '/goals';
      if (!selectedId) return page(endpoint,params,signal);
      const item = await get(endpoint + '/' + selectedId);
      if(item?.workspaceId!==workspaceId)throw new Error('Switch to the record workspace before opening it.');
      return {items:[item]};
    }
    if (['analytics', 'workload'].includes(mode)) {
      const [metrics,tasks]=await Promise.all([get(mode === 'workload' ? '/ai/burnout' : '/tasks/analytics'),page('/tasks',params,signal)]);
      return {...tasks,metrics};
    }
    if (['priorities', 'reschedule', 'breakdown', 'task-templates', 'workspace-templates'].includes(mode)) return page('/tasks', params, signal);
    if (['parse-task','shortcuts'].includes(mode)) return {items:[]};
    if (['activity', 'automation-log', 'task-activity'].includes(mode)) {
      return page('/activities', { ...params, ...(mode === 'automation-log'?{entityType:'automation'}:{}), ...(mode === 'task-activity' && selectedId ? { entityId: selectedId } : {}) }, signal);
    }
    if (mode === 'members') return { items: await get('/workspaces/' + workspaceId + '/members') };
    if (mode === 'notifications') return page('/notifications',{page:params.page,limit:params.limit},signal);
    if (mode === 'sessions') return { items: await get('/account/sessions') };
    if (mode === 'security' || mode === 'profile' || mode === 'preferences') return { profile: await get('/auth/me'), items: [] };
    if (mode === 'planning') {
      const [plan,tasks]=await Promise.all([get('/planning/daily'),page('/tasks',params,signal)]);
      return {...tasks,plan};
    }
    if (mode === 'focus-log') return page('/productivity/focus', params, signal);
    if (mode === 'integrations') return { workspace: await get('/workspaces/' + workspaceId), items: [] };
    if (mode === 'billing') return { billing: await get('/stripe/plans'), profile: user, items: [] };
    if (mode === 'export') return { items: [] };
    if (mode === 'health') return { health: await get('/status'), items: [] };
    if (mode === 'search') return { items: [] };
    throw new Error('Unsupported feature: ' + mode);
  };
  return { load, all, page,
    save: async (feature, form, workspaceId, id) => {
      const endpoint = endpointFor(feature) || (feature.mode === 'task-detail' ? '/tasks' : feature.mode === 'project-detail' ? '/projects' : '/goals');
      const payload = { ...payloadFor(feature, form), workspaceId };
      const {data} = id ? await api.put(endpoint + '/' + id, payload) : await api.post(endpoint, payload);
      return data;
    },
    remove: (feature, id) => api.delete((endpointFor(feature) || (feature.mode === 'task-detail' ? '/tasks' : feature.mode === 'project-detail' ? '/projects' : '/goals')) + '/' + id),
    search: (q, signal) => api.get('/search', { params: {q}, signal }).then(res => res.data)
  };
};
