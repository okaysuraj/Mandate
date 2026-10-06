import {useEffect,useRef} from 'react';
import {useFeature} from '../../hooks/useFeature';
import {FeatureForm} from '../features/FeaturePage';
import TaskTools from '../features/TaskTools';
import {payloadFor} from '../../../../shared/featureData';
function TaskFormModal({onClose,onSave,initialData}){
 const state=useFeature('task-detail',initialData?._id),opened=useRef(false);
 useEffect(()=>{if(state.loading||opened.current)return;opened.current=true;state.openForm(state.data?.items?.find(t=>t._id===initialData?._id));},[state,initialData?._id]);
 const save=()=>state.act(async()=>{if(onSave)await onSave({...payloadFor(state.feature,state.form),workspaceId:state.workspaceId});else await state.save();onClose();});
 return <div role="dialog" aria-modal="true" aria-label="Task" className="fixed inset-0 z-50 bg-black/70 p-6 overflow-auto"><div className="max-w-2xl mx-auto bg-surface-container-lowest p-4 rounded-xl"><button onClick={onClose}>Close</button>{state.error&&<p role="alert">{state.error}</p>}{state.editing&&<FeatureForm state={{...state,save,setEditing:onClose}}/>}{initialData?._id&&state.data?.items?.[0]&&<TaskTools task={state.data.items[0]} canEdit={state.canEdit} onChange={state.reload}/>}</div></div>;
}
export default function TodoModal({isOpen,...props}){return isOpen?<TaskFormModal {...props}/>:null;}
