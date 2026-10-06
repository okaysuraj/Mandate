import cron from 'node-cron';
import Task from '../models/Task.js';
export const initCronJobs=io=>cron.schedule('0 0 * * *',async()=>{
 try{
  const yesterday=new Date(Date.now()-86400000);
  const recurring=Task.find({status:'completed',recurrenceRule:{$in:['daily','weekly','monthly']},completedAt:{$gte:yesterday}}).cursor();
  for await(const task of recurring){
   const nextDue=new Date(task.dueDate||task.completedAt);
   if(task.recurrenceRule==='daily')nextDue.setUTCDate(nextDue.getUTCDate()+1);
   else if(task.recurrenceRule==='weekly')nextDue.setUTCDate(nextDue.getUTCDate()+7);
   else {const day=nextDue.getUTCDate();nextDue.setUTCDate(1);nextDue.setUTCMonth(nextDue.getUTCMonth()+1);const last=new Date(Date.UTC(nextDue.getUTCFullYear(),nextDue.getUTCMonth()+1,0)).getUTCDate();nextDue.setUTCDate(Math.min(day,last));}
   const data=task.toObject();for(const field of ['_id','__v','createdAt','updatedAt','recurrenceSourceId'])delete data[field];
   Object.assign(data,{recurrenceSourceId:task._id,status:'pending',completedAt:null,timeSpent:0,startDate:null,dueDate:nextDue});
   data.subtasks=data.subtasks.map(s=>({title:s.title,isCompleted:false}));
   try{const next=await Task.create(data);io?.to(String(task.workspaceId)).emit('task:created',next);}catch(error){if(error.code!==11000)throw error;}
  }
 }catch(error){console.error('Recurring task job failed:',error.name);}
},{timezone:'UTC'});
