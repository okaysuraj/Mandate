import { useCallback, useEffect, useState, useRef } from 'react';
import api from '../lib/axios';
import { useAuth } from '../context/AuthContext';
import { useWorkspace } from '../context/WorkspaceContext';
import { featureFor, makeFeatureClient, initialForm, referenceFields } from '../../../shared/featureData';
export const featureClient = makeFeatureClient(api);
export const useFeature = (key, selectedId) => {
  const feature = featureFor(key);
  const { user, updateUser, resetPassword, logout } = useAuth();
  const { activeWorkspace } = useWorkspace();
  const workspaceId = activeWorkspace?._id;
  const scope = [key,workspaceId,selectedId].join(':');
  const [pager,setPager] = useState({scope,page:1});
  const page = pager.scope === scope ? pager.page : 1;
  const setPage = value => setPager({scope,page:Math.max(1,value)});
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [revision, setRevision] = useState(0);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const referenceRequest=useRef(null);
  const [references, setReferences] = useState({});
  const reload = useCallback(() => setRevision(value => value + 1), []);
  useEffect(() => {
    referenceRequest.current?.abort();
    setEditing(null);setForm({});setReferences({});
    return()=>referenceRequest.current?.abort();
  }, [key, workspaceId]);
  useEffect(() => {
    const controller = new AbortController();
    setData(null);setError('');setLoading(true);
    if (!feature || !workspaceId || !user) {setLoading(false);return;}
    featureClient.load(feature,workspaceId,user,controller.signal,selectedId,{page}).then(result => {
      if (!controller.signal.aborted) {setData(result);setLoading(false);}
    }).catch(err => {
      if (!controller.signal.aborted) {setError(err.response?.data?.message || err.message);setLoading(false);}
    });
    return () => controller.abort();
  }, [feature, workspaceId, user, revision, selectedId, page]);
  const act = async callback => {
    setBusy(true);setError('');
    try {const result = await callback();reload();return result;}
    catch(err) {setError(err.response?.data?.message || err.message);return null;}
    finally {setBusy(false);}
  };
  const openForm = async item => {
    referenceRequest.current?.abort();const controller=new AbortController();referenceRequest.current=controller;
    setEditing(item || {});setForm(initialForm(feature,item));
    try {
      const needed = new Set(feature.fields.map(field=>referenceFields[field] || (field==='linkedTasks'?'tasks':field==='attendees'?'members':null)));
      const records = name => needed.has(name) ? featureClient.all('/'+name,{workspaceId,view:'options'},controller.signal) : Promise.resolve([]);
      const [tasks,projects,members,documents] = await Promise.all([records('tasks'),records('projects'),needed.has('members')?api.get('/workspaces/'+workspaceId+'/members',{signal:controller.signal}).then(res=>res.data):[],records('documents')]);
      if(controller.signal.aborted)return;
      setReferences({tasks,projects,members:members.map(member=>member.user),documents});
    }catch(err){if(!controller.signal.aborted)setError(err.response?.data?.message || 'Cannot load related records');}
  };
  useEffect(()=>{if(editing===null){referenceRequest.current?.abort();setReferences({});}},[editing]);
  const save = () => act(async()=>{
    await featureClient.save(feature,form,workspaceId,editing?._id);
    setEditing(null);
  });
  const remove = id => act(()=>featureClient.remove(feature,id));
  const role = activeWorkspace?.owner===user?._id ? 'Owner' : activeWorkspace?.members?.find(member=>(member.user?._id||member.user)===user?._id)?.role;
  return {page,setPage,selectedId,feature,user,workspaceId,data,error,loading,busy,reload,act,editing,setEditing,form,setForm,references,openForm,save,remove,updateUser,resetPassword,logout,role,canEdit:!!role&&role!=='Viewer'&&(feature?.mode!=='automations'||['Admin','Owner'].includes(role)),canAdmin:['Admin','Owner'].includes(role)};
};
