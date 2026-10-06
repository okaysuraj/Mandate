import TaskTools from './TaskTools';
import ReferencePicker from './ReferencePicker';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import AppLayout from '../layout/AppLayout';
import api from '../../lib/axios';
import { useFeature, featureClient } from '../../hooks/useFeature';
import { catalog, labelFor, enumFor, referenceFields, jsonFields } from '../../../../shared/featureData';

const control = 'w-full rounded-lg border border-outline-variant bg-surface-container-low p-3 text-sm text-on-surface';
const button = 'rounded-lg border border-outline-variant px-4 py-2 text-sm font-semibold disabled:opacity-50';
const titleOf = item => item.title || item.name || item.user?.name || item.taskId?.title || (item.date?'Plan '+item.date:null) || item.agent || labelFor(item.action || item.entityType || 'Record');
const recordId = item => item._id || item.user?._id;

export const FeatureForm = ({ state }) => {
  const { feature, form, setForm, references, save, busy, setEditing }=state;
  const set=(field,value)=>setForm(current=>({...current,[field]:value}));
  const jsonControl = field => {
    let value;try{value=JSON.parse(form[field]||'{}');}catch{value={};}
    if(field==='condition')return <div className="grid sm:grid-cols-3 gap-2"><select aria-label="Condition field" className={control} value={value.field||''} onChange={e=>set(field,JSON.stringify({...value,field:e.target.value}))}><option value="">Always</option>{['status','priority','title','tags','energyLevel'].map(v=><option key={v}>{v}</option>)}</select><select aria-label="Condition operator" className={control} value={value.operator||'equals'} onChange={e=>set(field,JSON.stringify({...value,operator:e.target.value}))}>{['equals','not_equals','contains'].map(v=><option key={v}>{v}</option>)}</select><input aria-label="Condition value" className={control} value={value.value||''} onChange={e=>set(field,JSON.stringify({...value,value:e.target.value}))}/></div>;
    if(field==='filters')return <div className="grid sm:grid-cols-2 gap-2">{['status','priority'].map(key=><label key={key}>{labelFor(key)}<select className={control} value={value[key]||''} onChange={e=>{const next={...value};if(e.target.value)next[key]=e.target.value;else delete next[key];set(field,JSON.stringify(next));}}><option value="">Any</option>{enumFor(key,'tasks').map(v=><option key={v}>{v}</option>)}</select></label>)}</div>;
    if(field==='sort')return <select className={control} aria-label="Sort order" value={Object.keys(value)[0]||''} onChange={e=>set(field,JSON.stringify(e.target.value?{[e.target.value]:1}:{}))}><option value="">Default</option>{['dueDate','createdAt','orderIndex','priority'].map(v=><option key={v}>{v}</option>)}</select>;
    return null;
  };
  return <form onSubmit={e=>{e.preventDefault();save();}} className="rounded-xl border border-outline-variant bg-surface-container-lowest p-5 space-y-4">
    <h2 className="text-lg font-bold">{state.editing?._id?'Edit':'Create'} {feature.title}</h2>
    {feature.fields.map(field=>{
      const values=enumFor(field,feature.mode), related=referenceFields[field];
      const Group = related || ['linkedTasks','attendees'].includes(field) ? 'div' : 'label';
      return <Group key={field} className="block text-sm font-medium space-y-2"><span>{labelFor(field)}</span>
        {jsonFields.has(field)?jsonControl(field):related?<ReferencePicker label={labelFor(field)} options={(references[related]||[]).filter(item=>item._id!==state.editing?._id).map(item=>({label:titleOf(item),value:item._id}))} value={form[field]} onChange={value=>set(field,value)}/>:
        ['linkedTasks','attendees'].includes(field)?<ReferencePicker multiple label={labelFor(field)} options={(references[field==='linkedTasks'?'tasks':'members']||[]).map(item=>({label:titleOf(item),value:item._id}))} value={form[field].split(',').map(v=>v.trim()).filter(Boolean)} onChange={values=>set(field,values.join(', '))}/>:
        values?<select className={control} value={form[field]} onChange={e=>set(field,e.target.value)}>{values.map(v=><option key={v} value={v}>{v||'None'}</option>)}</select>:
        ['description','content','notes'].includes(field)?<textarea className={control} rows={5} maxLength={20000} value={form[field]} onChange={e=>set(field,e.target.value)}/>:
        <input className={control} required={['title','name','startTime','endTime','date'].includes(field)} maxLength={['title','name'].includes(field)?200:10000} type={['amount','rating','timeEstimate'].includes(field)?'number':'text'} min="0" value={form[field]} onChange={e=>set(field,e.target.value)} placeholder={/Date|Time|^date$/.test(field)?'YYYY-MM-DD or ISO date and time':undefined}/>}
      </Group>;
    })}
    <div className="flex gap-3"><button className={button+' bg-primary text-on-primary'} disabled={busy}>Save</button><button type="button" className={button} onClick={()=>setEditing(null)}>Cancel</button></div>
  </form>;
};

const Preferences = ({state}) => {
  const [form,setForm]=useState(null);
  useEffect(()=>setForm(state.data?.profile||null),[state.data?.profile]);
  if(!form)return null;
  const profile=state.feature.mode==='profile';
  const save=()=>state.act(async()=>{
    const payload=profile?{name:form.name,avatar:form.avatar,timezone:form.timezone}:{preferences:form.preferences};
    const {data}=await api.put('/users/profile',payload);state.updateUser(data);
    const theme=data.preferences?.theme||'system';localStorage.setItem('theme',theme);document.documentElement.classList.toggle('dark',theme==='dark'||theme==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);
    window.dispatchEvent(new Event('theme-change'));
  });
  return <form onSubmit={e=>{e.preventDefault();save();}} className="space-y-4 max-w-lg">{profile?['name','avatar','timezone'].map(field=><label key={field} className="block">{labelFor(field)}<input className={control} value={form[field]||''} onChange={e=>setForm({...form,[field]:e.target.value})}/></label>):<>
    {Object.entries({theme:['system','light','dark'],notifications:['light','normal','strict']}).map(([field,options])=><label key={field} className="block">{labelFor(field)}<select className={control} value={form.preferences?.[field]||options[0]} onChange={e=>setForm({...form,preferences:{...form.preferences,[field]:e.target.value}})}>{options.map(v=><option key={v}>{v}</option>)}</select></label>)}
    {['start','end'].map(field=><label className="block" key={field}>Work hours {field}<input type="time" className={control} value={form.preferences?.workHours?.[field]||''} onChange={e=>setForm({...form,preferences:{...form.preferences,workHours:{...form.preferences.workHours,[field]:e.target.value}}})}/></label>)}</>}
    <button className={button} disabled={state.busy}>Save preferences</button>
  </form>;
};

export default function FeaturePage({featureKey}) {
  const params=useParams();
  const state=useFeature(featureKey||params.featureKey,params.id);
  const {feature,data,error,loading,busy,act,reload,canEdit,canAdmin}=state;
  const [viewTasks,setViewTasks]=useState(null);
  useEffect(()=>{if(data?.active){setSession(data.active);setTaskId(data.active.taskId?._id||data.active.taskId);}},[data?.active]);
  const [query,setQuery]=useState(''),[results,setResults]=useState([]),[searchError,setSearchError]=useState('');
  const [email,setEmail]=useState(''),[inviteRole,setInviteRole]=useState('Viewer'),[selected,setSelected]=useState([]),[taskId,setTaskId]=useState(''),[session,setSession]=useState(null),[notes,setNotes]=useState('');
  useEffect(()=>{setViewTasks(null);setSelected([]);setTaskId('');setSession(null);setResults([]);setQuery('');},[feature?.key,state.workspaceId]);
  useEffect(()=>{
    if(feature?.mode!=='search')return;
    const controller=new AbortController();
    if(!query.trim()){setResults([]);return;}
    const timer=setTimeout(()=>featureClient.search(query,controller.signal).then(result=>{
      setSearchError('');setResults(Object.entries(result).flatMap(([type,list])=>list.map(item=>({...item,type}))));
    }).catch(err=>{if(!controller.signal.aborted)setSearchError(err.response?.data?.message||'Search failed');}),250);
    return()=>{clearTimeout(timer);controller.abort();};
  },[feature?.mode,query]);
  if(!feature)return <AppLayout><p>Feature not found.</p></AppLayout>;
  const mode=feature.mode;
  const items=(data?.items||[]).filter(item=>mode==='priorities'||mode==='reschedule'?['urgent','high'].includes(item.priority)&&!['completed','archived'].includes(item.status):true).filter(item=>mode==='search'||!query||JSON.stringify(item).toLowerCase().includes(query.toLowerCase()));
  const download=()=>act(async()=>{const {data:archive}=await api.get('/account/export',{params:{workspaceId:state.workspaceId}});const url=URL.createObjectURL(new Blob([JSON.stringify(archive,null,2)],{type:'application/json'}));try{const anchor=document.createElement('a');anchor.href=url;anchor.download='mandate-workspace.json';anchor.click();}finally{URL.revokeObjectURL(url);}});
  const pathFor=item=>item.type==='tasks'?'/tasks/'+item._id:item.type==='projects'?'/projects/'+item._id:item.type==='goals'?'/goals/'+item._id:'/docs';
  const editable=!!feature.fields.length&&canEdit;
  return <AppLayout><div className="max-w-5xl mx-auto space-y-6 pb-16">
    <header className="border-b border-outline-variant pb-5 flex justify-between items-start gap-4"><div><p className="text-xs font-mono text-on-surface-variant mb-2">{state.workspaceId?'WORKSPACE':'ACCOUNT'}</p><h1 className="text-3xl font-bold">{feature.title}</h1></div><div className="flex gap-2"><Link className={button} to="/features">All features</Link><button className={button} onClick={reload} disabled={busy||loading}>Refresh</button>{editable&&<button className={button+' bg-primary text-on-primary'} onClick={()=>state.openForm()}>Create</button>}</div></header>
    {(error||searchError)&&<div role="alert" className="border border-error rounded-xl p-4 text-error">{error||searchError}<button onClick={reload} className="ml-4 underline">Retry</button></div>}
    {loading&&<p role="status">Loading {feature.title.toLowerCase()}…</p>}
    {state.editing&&<FeatureForm state={state}/>}
    {data?.metrics&&<dl className="grid grid-cols-2 sm:grid-cols-3 gap-4">{Object.entries(data.metrics).map(([key,value])=><div className="border border-outline-variant rounded-xl p-4" key={key}><dt className="text-sm text-on-surface-variant">{labelFor(key)}</dt><dd className="text-xl font-semibold mt-2">{String(value)}</dd></div>)}</dl>}
    {['profile','preferences'].includes(mode)&&<Preferences state={state}/>}
    {mode==='security'&&data&&<div className="space-y-4"><p>Email verified: {state.user.email}</p><button className={button} disabled={busy} onClick={()=>act(()=>state.resetPassword(state.user.email))}>Send password reset email</button><Link className={button} to="/device-management">Manage sessions</Link><button className={button} disabled={busy} onClick={()=>act(async()=>{await api.post('/account/revoke-sessions');await state.logout();})}>Revoke all sessions</button><p className="text-sm text-on-surface-variant">Sign in within the last five minutes to revoke all sessions. Multi-factor settings are managed by your authentication provider.</p></div>}
    {mode==='members'&&data&&canAdmin&&<form onSubmit={e=>{e.preventDefault();act(async()=>{await api.post('/workspaces/'+state.workspaceId+'/members',{email,role:inviteRole});setEmail('');});}} className="flex gap-3 flex-wrap"><input aria-label="Registered member email" type="email" required className={control+' max-w-xs'} value={email} onChange={e=>setEmail(e.target.value)}/><select className={control+' max-w-32'} aria-label="Member role" value={inviteRole} onChange={e=>setInviteRole(e.target.value)}>{['Viewer','Editor','Admin'].map(v=><option key={v}>{v}</option>)}</select><button className={button} disabled={busy}>Add member</button></form>}
    {mode==='billing'&&data&&<div className="space-y-4"><p>Current plan: {data.profile?.subscriptionPlan||'free'} · {data.profile?.subscriptionStatus||'none'}</p>{data.billing.plans.map(plan=><div key={plan.plan} className="border border-outline-variant p-4 rounded-xl flex justify-between"><div>{labelFor(plan.plan)} · {plan.available?new Intl.NumberFormat(undefined,{style:'currency',currency:plan.currency}).format(plan.amount/100)+' / '+plan.interval:'Unavailable until billing is configured'}</div><button className={button} disabled={!plan.available||busy} onClick={()=>act(async()=>{const {data}=await api.post('/stripe/create-checkout-session',{plan:plan.plan});window.location.assign(data.url);})}>Subscribe</button></div>)}</div>}
    {mode==='integrations'&&data&&<div className="space-y-3">{Object.entries(data.workspace.integrations||{}).map(([name,connected])=><p key={name}>{labelFor(name)}: {connected?'Connection preference stored; provider verification required':'No provider connection configured'}</p>)}</div>}
    {mode==='health'&&data&&<dl>{Object.entries(data.health).map(([key,value])=><div key={key} className="flex gap-4 py-3 border-b border-outline-variant"><dt>{labelFor(key)}</dt><dd>{typeof value==='boolean'?(value?'Configured':'Not configured'):value}</dd></div>)}</dl>}
    {mode==='export'&&data&&<div className="space-y-3"><p>Download your workspace records as a JSON archive.</p><button className={button} disabled={busy} onClick={download}>{busy?'Preparing archive…':'Download JSON'}</button></div>}
    {mode==='search'&&<input className={control} aria-label="Search workspace data" placeholder="Search tasks, projects, goals, documents" value={query} onChange={e=>setQuery(e.target.value)} maxLength={100}/>}
    {mode==='search'&&results.map(item=><Link className="block rounded-xl border border-outline-variant p-4" key={item.type+item._id} to={pathFor(item)}>{titleOf(item)} <span className="text-xs text-on-surface-variant">{item.type}</span></Link>)}
    {mode==='parse-task'&&data&&<form onSubmit={e=>{e.preventDefault();act(async()=>{const parsed=await api.post('/ai/parse-task',{input:query});await api.post('/tasks',{...parsed.data,source:undefined,workspaceId:state.workspaceId});setQuery('');});}} className="flex gap-3"><input className={control} aria-label="Task description" value={query} onChange={e=>setQuery(e.target.value)} required/><button disabled={busy||!canEdit} className={button}>Parse and create task</button></form>}
    {mode==='focus'&&data&&<div className="space-y-3"><select className={control} aria-label="Focus task" value={taskId} onChange={e=>setTaskId(e.target.value)}><option value="">Select a task</option>{items.map(t=><option key={t._id} value={t._id}>{t.title}</option>)}</select><textarea aria-label="Focus notes" className={control} value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Session notes"/><button className={button} disabled={busy||!canEdit||!taskId} onClick={()=>act(async()=>{if(session){await api.put('/productivity/focus/'+session._id,{notes});setSession(null);}else{const {data}=await api.post('/productivity/focus',{taskId});setSession(data);}})}>{session?'Finish and save session':'Start focus session'}</button>{session&&<p>Started {new Date(session.startedAt).toLocaleString()}. Elapsed time is recorded when you finish.</p>}</div>}
    {mode==='planning'&&data&&<div className="space-y-3"><p>{data.plan.locked?'Today’s plan is saved with '+data.plan.tasks.length+' tasks.':'No plan saved for today.'}</p><button disabled={busy||!canEdit||!selected.length} className={button} onClick={()=>act(()=>api.post('/planning/lock',{taskIds:selected,date:data.plan.date,workspaceId:state.workspaceId}))}>Save selected tasks as today’s plan</button></div>}
    {(items.length>0||query)&&mode!=='search'&&<input className={control} aria-label="Filter this page" placeholder="Filter this page" value={query} onChange={e=>setQuery(e.target.value)}/>}
    <div className="space-y-3">{mode!=='search'&&items.map(item=><article key={recordId(item)} className="rounded-xl border border-outline-variant p-5 bg-surface-container-lowest space-y-3"><div className="flex justify-between gap-4"><div className="flex gap-3 items-start">{mode==='planning'&&<input type="checkbox" aria-label={'Select '+titleOf(item)} checked={selected.includes(item._id)} onChange={e=>setSelected(e.target.checked?[...selected,item._id]:selected.filter(id=>id!==item._id))}/>}<div><h2 className="font-semibold">{titleOf(item)}</h2><p className="text-sm text-on-surface-variant">{item.status||item.role||item.period||item.action||''}{item.createdAt?' · '+new Date(item.createdAt).toLocaleString():''}</p></div></div><div className="flex gap-2 flex-wrap">
      {editable&&<button className={button} disabled={busy} onClick={()=>state.openForm(item)}>Edit</button>}
      {editable&&<button className={button} disabled={busy} onClick={()=>{if(window.confirm('Delete this record?'))state.remove(item._id);}}>Delete</button>}
      {['tasks','task-detail','priorities','reschedule','breakdown','focus','planning'].includes(mode)&&<Link className={button} to={'/tasks/'+item._id}>Open task</Link>}
      {mode==='members'&&canAdmin&&<select aria-label={'Role for '+item.user?.name} className={control+' max-w-32'} value={item.role} onChange={e=>act(()=>api.put('/workspaces/'+state.workspaceId+'/members/'+item.user._id,{role:e.target.value}))}>{['Viewer','Editor','Admin'].map(v=><option key={v}>{v}</option>)}</select>}
      {mode==='members'&&state.role==='Owner'&&<button className={button} disabled={busy} onClick={()=>{if(window.confirm('Transfer ownership to this member?'))act(()=>api.put('/workspaces/'+state.workspaceId+'/owner',{userId:item.user._id}));}}>Transfer ownership</button>}
      {['task-templates','workspace-templates'].includes(feature.key)&&<button className={button} disabled={busy||!canEdit} onClick={()=>act(()=>api.post('/features/'+feature.key+'/'+item._id+'/apply'))}>{feature.key==='task-templates'?'Create task from template':'Create project and task from template'}</button>}
      {mode==='saved-views'&&<button className={button} disabled={busy} onClick={()=>act(async()=>{const items=await featureClient.all('/productivity/saved-views/'+item._id+'/tasks',{workspaceId:state.workspaceId});setViewTasks(items);})}>Apply saved view</button>}
      {mode==='focus-log'&&!item.endedAt&&<button className={button} disabled={busy||!canEdit} onClick={()=>act(()=>api.put('/productivity/focus/'+item._id,{notes:item.notes}))}>Finish session</button>}
          {mode==='notifications'&&<button className={button} disabled={busy||item.isRead} onClick={()=>act(()=>api.patch('/notifications/'+item._id+'/read'))}>{item.isRead?'Read':'Mark read'}</button>}
      {mode==='task-detail'&&state.selectedId&&<TaskTools task={item} canEdit={canEdit} onChange={reload}/>}
        {mode==='sessions'&&<button className={button} disabled={busy||!!item.revokedAt} onClick={()=>act(()=>api.delete('/account/sessions/'+item._id))}>{item.revokedAt?'Revoked':item.current?'Revoke current session':'Revoke session'}</button>}
      {mode==='breakdown'&&<button className={button} disabled={busy||!canEdit} onClick={()=>act(()=>api.post('/ai/task-breakdown',{taskId:item._id}))}>Generate subtasks</button>}
      {mode==='reschedule'&&<button className={button} disabled={busy||!canEdit} onClick={()=>act(()=>api.put('/tasks/'+item._id,{dueDate:new Date(Date.now()+86400000).toISOString()}))}>Move due date to tomorrow</button>}
    </div></div>{(item.description||item.content||item.notes||item.message)&&<p className="text-sm whitespace-pre-wrap">{item.description||item.content||item.notes||item.message}</p>}
    {mode==='mandates'&&<p>{(item.tasks||[]).map(t=>t?.title).filter(Boolean).join(', ')||'No remaining tasks in this plan'}</p>}
        {item.amount!=null&&<p>{new Intl.NumberFormat(undefined,{style:'currency',currency:item.currency}).format(item.amount)}</p>}
    {item.durationMinutes!=null&&<p>{item.durationMinutes.toFixed(1)} minutes{item.endedAt?' · completed':' · in progress'}</p>}
    {mode==='sessions'&&<p className="text-sm">Last API activity: {new Date(item.lastSeenAt).toLocaleString()}{item.current?' · current session':''}</p>}
    </article>)}</div>
    {data?.pagination&&<nav aria-label="Record pages" className="flex items-center gap-4"><button className={button} disabled={loading||busy||state.page===1} onClick={()=>state.setPage(state.page-1)}>Previous</button><span className="text-sm">Page {state.page}{data.pagination.total!==null?' · '+data.pagination.total+' records':''}</span><button className={button} disabled={loading||busy||!data.pagination.hasNext} onClick={()=>state.setPage(state.page+1)}>Next</button></nav>}
    {!loading&&!error&&data&&items.length===0&&!['profile','preferences','security','billing','integrations','health','export','search'].includes(mode)&&<p className="rounded-xl border border-dashed border-outline-variant p-8 text-center text-on-surface-variant">{query?'No matches on this page.':state.page>1?'No records on this page.':'No records yet.'}{editable&&state.page===1&&!query?' Create your first record to get started.':''}</p>}
    {viewTasks&&<div className="border border-outline-variant p-4 rounded-xl"><h2>Saved view results: {viewTasks.length} tasks</h2>{viewTasks.map(task=><p key={task._id}><Link to={'/tasks/'+task._id}>{task.title}</Link> / {task.status}</p>)}</div>}
      {mode==='shortcuts'&&<p>Use the application navigation to open your tasks and projects. Browser shortcuts are provided by your operating system.</p>}
  </div></AppLayout>;
}

export function FeatureIndexPage(){return <AppLayout><h1 className="text-3xl font-bold mb-6">All features</h1><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">{catalog.map(feature=><Link className="border border-outline-variant rounded-xl p-4" key={feature.key} to={feature.webPath.includes(':id')?'/features/'+feature.key:feature.webPath}>{feature.title}</Link>)}</div></AppLayout>;}
