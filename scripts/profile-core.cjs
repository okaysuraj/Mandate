// Synthetic scale fixtures stay inside this benchmark; no application seed data.
const fs=require('node:fs'),path=require('node:path');
const {performance}=require('node:perf_hooks');
(async()=>{
  const {createStore}=await import('../frontend/node_modules/zustand/esm/vanilla.mjs');
  const {createDataStore}=await import('../shared/dataStore.js');
  const {todaySchedule}=await import('../shared/taskSchedule.js');
  const count=5000,readers=20,date=new Date().toISOString();
  const records=Array.from({length:count},(_,i)=>({_id:String(i),workspaceId:'benchmark',title:'Scale fixture '+i,status:'pending',priority:'medium',description:'text '.repeat(64),dueDate:date,
    attachments:Array.from({length:20},(_,n)=>({name:'Asset '+n,url:'https://example.invalid/'+n+'/document.pdf',size:100})),subtasks:Array.from({length:20},(_,n)=>({title:'Step '+n,isCompleted:false}))}));
  let beforeRequests=0,afterRequests=0;
  const page=(index)=>({data:{data:records.slice((index-1)*200,index*200),pagination:{pages:Math.ceil(count/200)}}});
  const previousReader=async()=>{let tasks=[];for(let i=1;i<=Math.ceil(count/200);i++){beforeRequests++;await Promise.resolve();tasks.push(...page(i).data.data);}return tasks;};
  const before=await Promise.all(Array.from({length:readers},previousReader));
  const store=createDataStore(createStore,{get:async(_,options)=>{afterRequests++;await Promise.resolve();return page(options.params.page);}});
  store.getState().setWorkspace('benchmark');await Promise.all(Array.from({length:readers},()=>store.getState().loadTasks()));
  const originalSchedule=(tasks,timezone)=>{
    const day=value=>new Intl.DateTimeFormat('en-CA',{timeZone:timezone,year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(value));
    const today=day(new Date());return tasks.filter(task=>task.status!=='archived'&&task.dueDate&&day(task.dueDate)===today).sort((a,b)=>new Date(a.dueDate)-new Date(b.dueDate));
  };
  const time=fn=>{const started=performance.now();const rows=fn();return {milliseconds:performance.now()-started,rows:rows.length};};
  const schedulesBefore=Array.from({length:5},()=>time(()=>originalSchedule(records,'Asia/Kolkata'))),schedulesAfter=Array.from({length:5},()=>time(()=>todaySchedule(records,'Asia/Kolkata')));
  const median=rows=>rows.map(item=>item.milliseconds).sort((a,b)=>a-b)[2];
  const result={checkedAt:new Date().toISOString(),environment:'Node '+process.version+' on Windows; synthetic fixtures, 5000 tasks, 20 concurrent readers. Serialized state size is not a runtime heap/RSS measurement. Scheduling uses V8, not a native device.',
    taskLoading:{tasks:count,concurrentReaders:readers,beforeRequests,afterRequests,beforeSerializedBytes:Buffer.byteLength(JSON.stringify(before[0])),afterSerializedBytes:Buffer.byteLength(JSON.stringify(store.getState().tasks))},
    scheduling:{tasks:count,beforeMedianMs:median(schedulesBefore),afterMedianMs:median(schedulesAfter),beforeSamples:schedulesBefore,afterSamples:schedulesAfter}};
  fs.writeFileSync(path.join(__dirname,'../docs/performance-core.json'),JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify({taskLoading:result.taskLoading,scheduling:{beforeMedianMs:result.scheduling.beforeMedianMs,afterMedianMs:result.scheduling.afterMedianMs}},null,2));
})().catch(error=>{console.error(error);process.exitCode=1;});
