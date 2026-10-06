import {test,expect,jest,afterEach} from '@jest/globals';
import {createStore} from '../../frontend/node_modules/zustand/esm/vanilla.mjs';
import {EventEmitter} from 'node:events';
import {readFileSync} from 'node:fs';
import {createDataStore} from '../../shared/dataStore.js';
import {subscribeRefresh} from '../../shared/socketRefresh.js';
const response=(tasks,total=tasks.length,page=1)=>({data:{data:tasks,pagination:{pages:Math.ceil(total/200),total,page}}});
const row=(id='one',workspaceId='A')=>({_id:id,workspaceId,title:id,orderIndex:0,attachments:[{url:'https://example.com/a'}],subtasks:[{title:'step'}]});
afterEach(()=>jest.useRealTimers());

test('concurrent task readers share one paginated request and skip fresh reloads',async()=>{
 const api={get:jest.fn(async(_,options)=>response([row(String(options.params.page))],400,options.params.page))};
 let now=0;const store=createDataStore(createStore,api,{now:()=>now});store.getState().setWorkspace('A');
 await Promise.all(Array.from({length:20},()=>store.getState().loadTasks()));
 expect(api.get).toHaveBeenCalledTimes(2);expect(store.getState().tasks).toHaveLength(2);
 expect(store.getState().tasks[0]).not.toHaveProperty('attachments');expect(store.getState().tasks[0]).not.toHaveProperty('subtasks');
 await store.getState().loadTasks();expect(api.get).toHaveBeenCalledTimes(2);
 now=30001;await store.getState().loadTasks();expect(api.get).toHaveBeenCalledTimes(4);
 await store.getState().loadTasks({force:true});expect(api.get).toHaveBeenCalledTimes(6);
});

test('workspace changes abort requests and discard a late response from the old workspace',async()=>{
 let finish,oldSignal;const api={get:jest.fn((_,options)=>options.params.workspaceId==='A'?new Promise(resolve=>{finish=resolve;oldSignal=options.signal;}):Promise.resolve(response([row('new','B')])))};
 const store=createDataStore(createStore,api);store.getState().setWorkspace('A');const previous=store.getState().loadTasks();
 store.getState().setWorkspace('B');expect(oldSignal.aborted).toBe(true);await store.getState().loadTasks();finish(response([row()]));await previous;
 expect(store.getState().tasks.map(item=>item.workspaceId)).toEqual(['B']);expect(store.getState().loading).toBe(false);
});

test('socket subscriptions use one listener and reconcile changes received during a load',async()=>{
 let finish;const store=createDataStore(createStore,{get:()=>new Promise(resolve=>{finish=resolve;})});store.getState().setWorkspace('A');
 const socket=new EventEmitter(),first=store.getState().subscribeToSocket(socket),second=store.getState().subscribeToSocket(socket);
 expect(socket.listenerCount('task:updated')).toBe(1);
 const load=store.getState().loadTasks();socket.emit('task:updated',{...row(),title:'Latest edit'});socket.emit('task:created',row('new'));socket.emit('task:deleted','deleted');socket.emit('task:created',row('private','B'));
 finish(response([row(),row('deleted')]));await load;
 expect(store.getState().tasks.map(item=>item.title)).toEqual(['Latest edit','new']);
 first();first();expect(socket.listenerCount('task:updated')).toBe(1);second();expect(socket.listenerCount('task:updated')).toBe(0);
});

test('filtered board reordering retains invisible tasks and writes only changed orders',async()=>{
 const api={get:async()=>response([row('visible'),row('hidden')]),put:jest.fn(async()=>({}))};
 const store=createDataStore(createStore,api);store.getState().setWorkspace('A');await store.getState().loadTasks();await store.getState().reorderTasks([{...row('visible'),orderIndex:1}]);
 expect(api.put).toHaveBeenCalledWith('/tasks/reorder',{tasks:[{_id:'visible',orderIndex:1}]});
 expect(store.getState().tasks.map(item=>item._id)).toEqual(['visible','hidden']);
});

test('unused task data is released and reacquiring it cancels disposal',async()=>{
 jest.useFakeTimers();const api={get:async()=>response([row()])};const store=createDataStore(createStore,api);store.getState().setWorkspace('A');
 const release=store.getState().retainTasks();await store.getState().loadTasks();release();jest.advanceTimersByTime(10000);
 const keep=store.getState().retainTasks();jest.advanceTimersByTime(15000);expect(store.getState().tasks).toHaveLength(1);
 keep();jest.advanceTimersByTime(15000);expect(store.getState().tasks).toHaveLength(0);
 await store.getState().loadTasks();expect(store.getState().tasks).toHaveLength(1);
});

test('notifications are bounded while a socket remains connected',()=>{
 const store=createDataStore(createStore,{}),socket=new EventEmitter(),stop=store.getState().subscribeToSocket(socket);
 for(let i=0;i<500;i++)socket.emit('notification_created',{_id:String(i)});
 expect(store.getState().notifications).toHaveLength(100);expect(store.getState().notifications[0]._id).toBe('499');stop();
});

test('socket refresh coalesces bursts and cancels scheduled work on unmount',()=>{
 jest.useFakeTimers();const socket=new EventEmitter(),callback=jest.fn(),stop=subscribeRefresh(socket,callback);
 for(let i=0;i<30;i++)socket.emit('task:updated');jest.advanceTimersByTime(250);expect(callback).toHaveBeenCalledTimes(1);
 socket.emit('task:created');stop();jest.advanceTimersByTime(1000);expect(callback).toHaveBeenCalledTimes(1);expect(socket.listenerCount('task:updated')).toBe(0);
});

test('a sustained stream of socket edits refreshes within the maximum wait',()=>{
 jest.useFakeTimers();const socket=new EventEmitter(),callback=jest.fn(),stop=subscribeRefresh(socket,callback);
 for(let i=0;i<10;i++){socket.emit('task:updated');jest.advanceTimersByTime(100);}
 expect(callback).toHaveBeenCalledTimes(1);stop();
});

test('feature entry fetches one bounded page and export entry transfers no archive',async()=>{
 const catalog=JSON.parse(readFileSync(new URL('../../shared/featureCatalog.json',import.meta.url)));
 const source=readFileSync(new URL('../../shared/featureData.js',import.meta.url),'utf8').replace("import catalog from './featureCatalog.json';",'').replace('export { catalog };','').replaceAll('export const ','const ');
 const {makeFeatureClient}=new Function('catalog',source+'; return {makeFeatureClient};')(catalog);
 const api={get:jest.fn(async()=>({data:{data:Array.from({length:50},(_,i)=>row(String(i))),pagination:{pages:1000,total:50000}}}))};
 const client=makeFeatureClient(api);const result=await client.load(catalog.find(feature=>feature.key==='backlog'),'A',{},undefined,undefined,{page:2});
 expect(result.items).toHaveLength(50);expect(result.pagination).toMatchObject({page:2,total:50000,hasNext:true});expect(api.get).toHaveBeenCalledTimes(1);
 const exported=await client.load(catalog.find(feature=>feature.mode==='export'),'A',{});expect(exported).toEqual({items:[]});expect(api.get).toHaveBeenCalledTimes(1);
});
