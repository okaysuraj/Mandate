import {useDataStore} from '../../store/useDataStore';
import {useWorkspace} from '../../context/WorkspaceContext';
export default function DataStatus(){const {error,loadTasks}=useDataStore(),workspace=useWorkspace();const message=workspace.error||error;return message?<div role="alert" className="p-4 mb-4 border border-error text-error rounded-xl">{message}<button className="ml-4 underline" onClick={()=>workspace.error?workspace.fetchWorkspaces():loadTasks()}>Retry</button></div>:null;}
