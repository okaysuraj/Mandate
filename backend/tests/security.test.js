import { jest, beforeAll, afterAll, test, expect } from '@jest/globals';
import mongoose from 'mongoose';
import { MongoMemoryReplSet } from 'mongodb-memory-server';
import request from 'supertest';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {readFileSync} from 'node:fs';
import {io as clientIo} from 'socket.io-client';
const identities = new Map();
jest.unstable_mockModule('firebase-admin/auth', () => ({
  getAuth: () => ({ verifyIdToken: async token => {
    const identity = identities.get(token);
    if (!identity) throw new Error('Invalid token');
    return identity;
  }, revokeRefreshTokens: async () => {} })
}));
const {app,server,io}=await import('../src/server.js');
const User=(await import('../src/models/User.js')).default;
const Workspace=(await import('../src/models/Workspace.js')).default;
const Task=(await import('../src/models/Task.js')).default;
const Project=(await import('../src/models/Project.js')).default;
const Goal=(await import('../src/models/Goal.js')).default;
const Document=(await import('../src/models/Document.js')).default;
const Event=(await import('../src/models/Event.js')).default;
const Automation=(await import('../src/models/Automation.js')).default;
let mongo,owner,outsider,viewer,workspace,otherWorkspace,task,otherTask,project,otherProject;
const api=(method,path,token='owner')=>request(app)[method](path).set('Authorization','Bearer '+token);
beforeAll(async()=>{
  mongo=await MongoMemoryReplSet.create({replSet:{count:1}});
  await mongoose.connect(mongo.getUri());
  await Promise.all(Object.values(mongoose.models).map(model=>model.init()));
  [owner,outsider,viewer]=await User.create(['owner','outsider','viewer'].map(name=>({name,email:name+'@example.com',firebaseUid:name})));
  workspace=await Workspace.create({name:'Workspace A',owner:owner._id,members:[{user:owner._id,role:'Admin'},{user:viewer._id,role:'Viewer'}]});
  otherWorkspace=await Workspace.create({name:'Workspace B',owner:outsider._id,members:[{user:outsider._id,role:'Admin'}]});
  for(const user of [owner,viewer,outsider]){user.activeWorkspace=user===outsider?otherWorkspace._id:workspace._id;await user.save();identities.set(user.firebaseUid,{uid:user.firebaseUid,email:user.email,email_verified:true,auth_time:Math.floor(Date.now()/1000),exp:Math.floor(Date.now()/1000)+3600});}
  [task,otherTask]=await Task.create([{title:'Task A',workspaceId:workspace._id,creatorId:owner._id},{title:'Task B',workspaceId:otherWorkspace._id,creatorId:outsider._id}]);
  [project,otherProject]=await Project.create([{name:'Project A',workspaceId:workspace._id},{name:'Project B',workspaceId:otherWorkspace._id}]);
 const {stdout:result}=await promisify(execFile)(process.execPath,['src/scripts/databaseAudit.js','--apply'],{env:{...process.env,MONGO_URI:mongo.getUri(),NODE_ENV:'production'},encoding:'utf8',timeout:30000});
 const validation=JSON.parse(result.slice(result.indexOf('{')));expect(validation.applied).toBe(true);
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
},120000);
afterAll(async()=>{io.close();server.close();await mongoose.disconnect();await mongo?.stop();});

test('anonymous and unverified identities cannot access protected data',async()=>{
  expect((await request(app).get('/api/tasks')).status).toBe(401);
  identities.set('unverified',{uid:'owner',email:owner.email,email_verified:false});
  expect((await api('get','/api/tasks','unverified')).status).toBe(401);
});
test('workspace listing and direct task reads require current membership',async()=>{
  expect((await api('get','/api/tasks?workspaceId='+otherWorkspace._id)).status).toBe(403);
  expect((await api('get','/api/tasks/'+otherTask._id)).status).toBe(403);
  const result=await api('get','/api/tasks');expect(result.status).toBe(200);expect(result.body.data.every(t=>t.workspaceId===String(workspace._id))).toBe(true);
  expect((await api('get','/api/tasks/'+task._id,'viewer')).status).toBe(200);
});
test('Viewer cannot edit, create, reorder, bulk edit or comment',async()=>{
  expect((await api('put','/api/tasks/'+task._id,'viewer').send({title:'Changed'})).status).toBe(403);
  expect((await api('post','/api/tasks','viewer').send({title:'New'})).status).toBe(403);
  expect((await api('put','/api/tasks/reorder','viewer').send({tasks:[{_id:String(task._id),orderIndex:1}]})).status).toBe(403);
  expect((await api('post','/api/tasks/bulk','viewer').send({taskIds:[String(task._id)],action:'edit',updates:{priority:'urgent'}})).status).toBe(403);
  expect((await api('post','/api/comments/task/'+task._id,'viewer').send({content:'Hello'})).status).toBe(403);
});
test('all direct resource operations reject other workspaces',async()=>{
  const records={projects:otherProject,
    goals:await Goal.create({title:'Other goal',workspaceId:otherWorkspace._id}),
    documents:await Document.create({title:'Other doc',author:outsider._id,workspaceId:otherWorkspace._id}),
    events:await Event.create({title:'Other event',creator:outsider._id,workspaceId:otherWorkspace._id,startTime:new Date(),endTime:new Date(Date.now()+3600000)}),
    automations:await Automation.create({name:'Other rule',workspaceId:otherWorkspace._id,trigger:'task_created',action:'change_priority',actionValue:'high'})};
  for(const [endpoint,record]of Object.entries(records)){
    expect((await api('put','/api/'+endpoint+'/'+record._id).send({title:'Changed',name:'Changed'})).status).toBe(403);
    expect((await api('delete','/api/'+endpoint+'/'+record._id)).status).toBe(403);
  }
});
test('relationship IDs cannot cross workspaces',async()=>{
  expect((await api('post','/api/tasks').send({title:'Cross project',projectId:String(otherProject._id)})).status).toBe(400);
  expect((await api('post','/api/tasks').send({title:'Cross parent',parentTaskId:String(otherTask._id)})).status).toBe(400);
  expect((await api('put','/api/tasks/'+task._id).send({assigneeId:String(outsider._id)})).status).toBe(400);
  expect((await api('post','/api/goals').send({title:'Cross goal',linkedTasks:[String(otherTask._id)]})).status).toBe(400);
});
test('request validation blocks query operators and invalid values',async()=>{
  expect((await api('put','/api/tasks/'+task._id).send({$set:{creatorId:String(outsider._id)}})).status).toBe(400);
  expect((await api('post','/api/tasks').send({title:'  '})).status).toBe(400);
  expect((await api('post','/api/tasks').send({title:'X',projectId:'invalid'})).status).toBe(400);
  expect((await api('post','/api/tasks').send({title:'X',timeSpent:-1})).status).toBe(400);
  expect((await api('get','/api/tasks?limit=0')).status).toBe(400);
  expect((await api('get','/api/tasks?limit=1000000')).status).toBe(400);
  expect((await api('get','/api/tasks?page=-1')).status).toBe(400);
  expect((await api('get','/api/tasks?workspaceId=a&workspaceId=b')).status).toBe(400);
});
test('task updates cannot change creator or move to another workspace',async()=>{
  expect((await api('put','/api/tasks/'+task._id).send({workspaceId:String(otherWorkspace._id)})).status).toBe(400);
  expect((await api('put','/api/tasks/'+task._id).send({creatorId:String(outsider._id)})).status).toBe(200);
  expect(String((await Task.findById(task._id)).creatorId)).toBe(String(owner._id));
});
test('bulk writes validate every record before changing any',async()=>{
  const before=await Task.findById(task._id);
  expect((await api('post','/api/tasks/bulk').send({taskIds:[String(task._id),String(otherTask._id)],action:'edit',updates:{priority:'urgent'}})).status).toBe(403);
  expect((await Task.findById(task._id)).priority).toBe(before.priority);
});
test('planning cannot lock or mutate somebody else’s tasks',async()=>{
  expect((await api('post','/api/planning/lock').send({date:'2026-10-06',taskIds:[String(otherTask._id)]})).status).toBe(403);
  expect((await api('post','/api/planning/lock').send({date:'2026-02-30',taskIds:[String(task._id)]})).status).toBe(400);
  expect((await api('post','/api/planning/lock').send({date:'2026-10-06',taskIds:[String(task._id)]})).status).toBe(200);
});
test('comments and AI task breakdown require task access',async()=>{
  expect((await api('get','/api/comments/task/'+otherTask._id)).status).toBe(403);
  expect((await api('post','/api/ai/task-breakdown').send({taskId:String(otherTask._id)})).status).toBe(403);
});
test('literal regex metacharacters in search cannot match every record',async()=>{
  const result=await api('get','/api/search?q=.*');expect(result.status).toBe(200);expect(result.body.tasks).toHaveLength(0);
});
test('feature records persist, validate, and isolate workspaces',async()=>{
  const created=await api('post','/api/features/decision-log').send({title:'Real decision',workspaceId:String(workspace._id)});expect(created.status).toBe(201);
  const fetched=await api('get','/api/features/decision-log');expect(fetched.body.data.some(item=>item._id===created.body._id)).toBe(true);
  expect((await api('put','/api/features/decision-log/'+created.body._id,'outsider').send({title:'No'})).status).toBe(403);
  expect((await api('post','/api/features/decision-log','viewer').send({title:'No'})).status).toBe(403);
});
test('events validate full start/end chronology on partial updates',async()=>{
  const created=await api('post','/api/events').send({title:'Meeting',startTime:'2026-10-06T12:00:00Z',endTime:'2026-10-06T13:00:00Z'});expect(created.status).toBe(201);
  expect((await api('put','/api/events/'+created.body._id).send({endTime:'2026-10-06T11:00:00Z'})).status).toBe(400);
});
test('sessions are real persisted sessions and revocation blocks the same token',async()=>{
  const listed=await api('get','/api/account/sessions','viewer');expect(listed.status).toBe(200);expect(listed.body[0].current).toBe(true);
  const revoked=await api('delete','/api/account/sessions/'+listed.body[0]._id,'viewer');expect(revoked.status).toBe(200);
  expect((await api('get','/api/tasks','viewer')).status).toBe(401);
});

test('database validators also reject invalid writes that bypass Mongoose',async()=>{
 await expect(Task.collection.insertOne({workspaceId:workspace._id,creatorId:owner._id,title:'Raw',status:'invalid'})).rejects.toMatchObject({code:121});
 await expect(Task.collection.insertOne({workspaceId:workspace._id,creatorId:owner._id,title:'Raw',timeSpent:-10})).rejects.toMatchObject({code:121});
});
test('every persisted feature kind supports validated CRUD and tenant isolation',async()=>{
 const catalog=JSON.parse(readFileSync(new URL('../../shared/featureCatalog.json',import.meta.url)));
 for(const feature of catalog.filter(item=>item.mode==='records')){
  const url='/api/features/'+feature.key;
  const created=await api('post',url).send({title:'Persisted '+feature.title,workspaceId:String(workspace._id)});expect({key:feature.key,status:created.status,body:created.body}).toMatchObject({status:201});
  expect((await api('get',url)).body.data.some(item=>item._id===created.body._id)).toBe(true);
  expect((await api('put',url+'/'+created.body._id,'outsider').send({title:'Forbidden'})).status).toBe(403);
  expect((await api('put',url+'/'+created.body._id).send({title:'Changed'})).status).toBe(200);
  expect((await api('delete',url+'/'+created.body._id)).status).toBe(200);
 }
});
test('task templates apply actual persisted data',async()=>{
 const created=await api('post','/api/features/task-templates').send({title:'Reusable task',description:'Real template',workspaceId:String(workspace._id)});expect(created.status).toBe(201);
 const applied=await api('post','/api/features/task-templates/'+created.body._id+'/apply').send({});expect(applied.status).toBe(201);expect(applied.body.title).toBe('Reusable task');expect(await Task.exists({_id:applied.body._id})).toBeTruthy();
});
test('saved views return only matching real tasks and remain private',async()=>{
 const created=await api('post','/api/productivity/saved-views').send({name:'Completed',workspaceId:String(workspace._id),filters:{status:'completed'},sort:{createdAt:-1}});expect(created.status).toBe(201);
 const result=await api('get','/api/productivity/saved-views/'+created.body._id+'/tasks');expect(result.status).toBe(200);expect(result.body.every(t=>t.status==='completed')).toBe(true);
 expect((await api('get','/api/productivity/saved-views/'+created.body._id+'/tasks','outsider')).status).toBe(403);
});
test('focus completion is idempotent under concurrent requests and measures actual elapsed time',async()=>{
 const created=await api('post','/api/productivity/focus').send({taskId:String(task._id)});expect(created.status).toBe(201);
 const results=await Promise.all([1,2].map(()=>api('put','/api/productivity/focus/'+created.body._id).send({notes:'Measured session'})));
 expect(results.map(r=>r.status).sort()).toEqual([200,409]);
 const completed=results.find(r=>r.status===200);expect(completed.body.durationMinutes).toBeGreaterThanOrEqual(0);expect(completed.body.endedAt).toBeTruthy();
});
test('invalid profile preferences, types and push tokens are rejected',async()=>{
 expect((await api('put','/api/users/profile').send({timezone:'Not/AZone'})).status).toBe(400);
 expect((await api('put','/api/users/profile').send({preferences:{workHours:{start:'32:00'}}})).status).toBe(400);
 expect((await api('post','/api/users/push-token').send({expoPushToken:'invalid'})).status).toBe(400);
 expect((await api('post','/api/tasks').send({title:123})).status).toBe(400);
});
test('socket authentication and workspace joins enforce the same membership boundary',async()=>{
 const url='http://127.0.0.1:'+server.address().port;
 const anonymous=clientIo(url,{transports:['websocket'],reconnection:false,timeout:3000});
 await new Promise((resolve,reject)=>{anonymous.once('connect_error',resolve);anonymous.once('connect',()=>reject(new Error('Anonymous socket connected')));});anonymous.close();
 const socket=clientIo(url,{auth:{token:'owner'},transports:['websocket'],reconnection:false,timeout:3000});
 try{await new Promise((resolve,reject)=>{socket.once('connect',resolve);socket.once('connect_error',reject);});
  const denied=await new Promise(resolve=>socket.emit('joinWorkspace',String(otherWorkspace._id),resolve));expect(denied.ok).toBe(false);
  const allowed=await new Promise(resolve=>socket.emit('joinWorkspace',String(workspace._id),resolve));expect(allowed.ok).toBe(true);
 }finally{socket.close();}
});

test('the shared web/mobile catalog loads every feature from the real API without mock fallbacks',async()=>{
 const catalog=JSON.parse(readFileSync(new URL('../../shared/featureCatalog.json',import.meta.url)));
 const source=readFileSync(new URL('../../shared/featureData.js',import.meta.url),'utf8').replace("import catalog from './featureCatalog.json';",'').replace('export { catalog };','').replaceAll('export const ','const ');
 // Compile the trusted repo helper for Jest's VM; this adapter sends actual requests to the app and MongoDB.
 const helper=new Function('catalog',source+'; return {makeFeatureClient};')(catalog);
 const client=helper.makeFeatureClient({get:async(path,options={})=>{
   const query=new URLSearchParams(Object.entries(options.params||{}).filter(([,v])=>v!==undefined));
   const result=await api('get','/api'+path+(query.size?'?'+query:''));
   if(result.status>=400)throw new Error(path+': '+result.status+' '+result.body.message);return {data:result.body};
 }});
 const freshUser=await User.findById(owner._id);
 for(const feature of catalog){const loaded=await client.load(feature,String(workspace._id),freshUser,undefined,undefined);expect({key:feature.key,data:loaded}).toMatchObject({data:expect.any(Object)});}
});

test('aggregate analytics and workload match the actual workspace records',async()=>{
 const scoped=await Workspace.create({name:'Performance analytics',owner:owner._id,members:[{user:owner._id,role:'Admin'}]});
 const createdAt=new Date('2025-01-01T00:00:00Z'),past=new Date('2025-01-02T00:00:00Z');
 await Task.create([
  {title:'Complete',status:'completed',priority:'high',timeSpent:12,timeEstimate:60,createdAt,completedAt:new Date('2025-01-01T01:13:00Z')},
  {title:'Clock changed',status:'completed',priority:'low',timeSpent:4,timeEstimate:25,createdAt,completedAt:new Date('2024-12-31T23:59:00Z')},
  {title:'Archived',status:'archived',priority:'high',dueDate:past,timeEstimate:0},
  {title:'Overdue',status:'pending',priority:'urgent',dueDate:past,timeEstimate:20},
  {title:'Unestimated',status:'in-progress',priority:'medium',timeEstimate:0},
 ].map(record=>({...record,workspaceId:scoped._id,creatorId:owner._id})));
 const result=await api('get','/api/tasks/analytics?workspaceId='+scoped._id);
 expect(result.status).toBe(200);expect(result.body).toEqual({totalTasks:5,completedTasks:2,activeTasks:2,highPriorityTaskPercentage:60,averageResolutionLatency:'0h 36m',totalTimeSpent:16,estimatedMinutes:105,overdueTasks:1});
 const workload=await api('get','/api/ai/burnout?workspaceId='+scoped._id);
 expect(workload.status).toBe(200);expect(workload.body).toMatchObject({tasksCount:2,completedCount:2,estimatedMinutes:20,unestimatedTasks:1,workloadBand:'Low'});
 const empty=await Workspace.create({name:'Empty analytics',owner:owner._id,members:[{user:owner._id,role:'Admin'}]});
 expect((await api('get','/api/tasks/analytics?workspaceId='+empty._id)).body).toMatchObject({totalTasks:0,averageResolutionLatency:'0h 0m'});
});

test('large task lists remain paginated and reference projections omit document bodies',async()=>{
 const scoped=await Workspace.create({name:'Performance list',owner:owner._id,members:[{user:owner._id,role:'Admin'}]});
 await Task.insertMany(Array.from({length:105},(_,index)=>({title:'Load test '+index,description:'d'.repeat(5000),workspaceId:scoped._id,creatorId:owner._id,subtasks:[{title:'Real step'}]})));
 const first=await api('get','/api/tasks?workspaceId='+scoped._id+'&page=1&limit=50&view=summary');
 expect(first.status).toBe(200);expect(first.body.data).toHaveLength(50);expect(first.body.pagination).toMatchObject({total:105,pages:3});expect(first.body.data[0]).not.toHaveProperty('subtasks');
 const second=await api('get','/api/tasks?workspaceId='+scoped._id+'&page=2&limit=50&view=options');
 expect(second.body.data).toHaveLength(50);expect(second.body.data[0]).not.toHaveProperty('description');
 expect(new Set([...first.body.data,...second.body.data].map(item=>item._id)).size).toBe(100);
 const doc=await Document.create({title:'Reference',content:'body'.repeat(2500),author:owner._id,workspaceId:scoped._id});
 const options=await api('get','/api/documents?workspaceId='+scoped._id+'&view=options&paginate=true');
 expect(options.body.data).toEqual([{_id:String(doc._id),title:'Reference',workspaceId:String(scoped._id)}]);expect(options.body.pagination.total).toBe(1);
 expect((await api('get','/api/tasks?workspaceId='+otherWorkspace._id+'&view=summary')).status).toBe(403);
 expect((await api('get','/api/tasks?view=unsupported')).status).toBe(400);
 const plan=await Task.find({workspaceId:scoped._id}).sort({orderIndex:1,createdAt:-1,_id:-1}).limit(50).explain('executionStats');
 expect(JSON.stringify(plan.queryPlanner.winningPlan)).not.toContain('"stage":"SORT"');
});

test('nested task fields reject coercion and invalid asset references',async()=>{
 expect((await api('post','/api/tasks').send({title:'Nested',tags:[123]})).status).toBe(400);
 expect((await api('post','/api/tasks').send({title:'Nested',subtasks:[{title:123}]})).status).toBe(400);
 expect((await api('post','/api/tasks').send({title:'Nested',subtasks:[{title:'Typed',isCompleted:'false'}]})).status).toBe(400);
 expect((await api('post','/api/tasks').send({title:'Nested',attachments:[{assetId:'invalid'}]})).status).toBe(400);
 expect((await api('put','/api/users/profile').send({preferences:{notifications:'false'}})).status).toBe(400);
});
test('only an authorized publisher can expose actual public content',async()=>{
 expect((await request(app).get('/api/public/pages/privacy')).status).toBe(404);
 expect((await api('put','/api/public/pages/privacy').send({title:'Policy',content:'Text',published:true})).status).toBe(403);
 identities.set('publisher',{...identities.get('owner'),admin:true});
 expect((await api('put','/api/public/pages/privacy','publisher').send({title:'Policy',content:'Approved text in isolated test database',published:true})).status).toBe(200);
 const published=await request(app).get('/api/public/pages/privacy');expect(published.status).toBe(200);expect(published.body.content).toBe('Approved text in isolated test database');
});
test('concurrent focus starts allow one unfinished session per user and workspace',async()=>{
 const started=await Promise.all([1,2].map(()=>api('post','/api/productivity/focus').send({taskId:String(task._id)})));
 expect(started.map(result=>result.status).sort()).toEqual([201,409]);
 expect((await api('put','/api/productivity/focus/'+started.find(result=>result.status===201).body._id).send({notes:'Completed'})).status).toBe(200);
});

test('automation actions and their execution logs commit together',async()=>{
 const rule=await Automation.create({workspaceId:workspace._id,name:'Apply priority',trigger:'task_created',action:'change_priority',actionValue:'urgent',isActive:true});
 const created=await api('post','/api/tasks').send({title:'Automation boundary'});expect(created.status).toBe(201);expect(created.body.priority).toBe('urgent');
 expect((await Task.findById(created.body._id)).priority).toBe('urgent');
 const Activity=(await import('../src/models/Activity.js')).default;
 expect(await Activity.exists({entityId:rule._id,action:'executed','metadata.taskId':new mongoose.Types.ObjectId(created.body._id)})).toBeTruthy();
 await rule.deleteOne();
});

test('valid profile preferences remain writable while preserving protected identity fields',async()=>{
 const result=await api('put','/api/users/profile').send({preferences:{notifications:'normal',theme:'system',workHours:{start:'09:00',end:'17:00'}},subscriptionPlan:'team',email:'changed@example.com'});
 expect(result.status).toBe(200);expect(result.body.preferences.notifications).toBe('normal');
 const persisted=await User.findById(owner._id);expect(persisted.subscriptionPlan).toBe('free');expect(persisted.email).toBe(owner.email);
});
