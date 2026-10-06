import mongoose from 'mongoose';
import Task from '../models/Task.js';
import DailyMandate from '../models/DailyMandate.js';
import { workspaceAccess, assertId } from '../utils/access.js';
import { handler, HttpError, pagination } from '../utils/http.js';
const validDate=value=>{if(typeof value!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(value)||!Number.isFinite(Date.parse(value))||new Date(value).toISOString().slice(0,10)!==value)throw new HttpError(400,'Date must be YYYY-MM-DD');return value;};
const todayFor=user=>new Intl.DateTimeFormat('en-CA',{timeZone:user.timezone||'UTC',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
export const getSuggestions=handler(async(req,res)=>{
 const workspace=await workspaceAccess(req.user,req.query.workspaceId);
 const tasks=await Task.find({workspaceId:workspace._id,status:{$in:['pending','in-progress']},$or:[{creatorId:req.user._id},{assigneeId:req.user._id}]}).limit(200);
 const date=todayFor(req.user), suggestions={dueToday:[],overdue:[],highPriority:[],others:[]};
 for(const task of tasks){const due=task.dueDate?new Intl.DateTimeFormat('en-CA',{timeZone:req.user.timezone||'UTC',year:'numeric',month:'2-digit',day:'2-digit'}).format(task.dueDate):null;
  const category=due&&due<date?'overdue':due===date?'dueToday':['high','urgent'].includes(task.priority)?'highPriority':'others';suggestions[category].push(task);}
 res.json(suggestions);
});
export const getDailyMandate=handler(async(req,res)=>{
 const workspace=await workspaceAccess(req.user,req.query.workspaceId);
 const date=validDate(req.query.date||todayFor(req.user));
 const mandate=await DailyMandate.findOne({userId:req.user._id,workspaceId:workspace._id,date}).populate({path:'tasks',match:{workspaceId:workspace._id}});
 res.json(mandate?{...mandate.toObject(),tasks:mandate.tasks.filter(Boolean),locked:true}:{date,tasks:[],locked:false});
});
export const getMandateHistory=handler(async(req,res)=>{
 const workspace=await workspaceAccess(req.user,req.query.workspaceId),{limit,skip}=pagination(req.query);
 res.json(await DailyMandate.find({userId:req.user._id,workspaceId:workspace._id}).populate({path:'tasks',match:{workspaceId:workspace._id}}).sort({date:-1,_id:-1}).skip(skip).limit(limit));
});
export const lockDailyMandate=handler(async(req,res)=>{
 const workspace=await workspaceAccess(req.user,req.body.workspaceId,true);
 const date=validDate(req.body.date), ids=req.body.taskIds;
 if(!Array.isArray(ids)||!ids.length||ids.length>100||new Set(ids).size!==ids.length)throw new HttpError(400,'Provide 1 to 100 unique task IDs');
 ids.forEach(id=>assertId(id));
 const tasks=await Task.find({_id:{$in:ids},workspaceId:workspace._id,$or:[{creatorId:req.user._id},{assigneeId:req.user._id}]});
 if(tasks.length!==ids.length)throw new HttpError(403,'Every selected task must belong to you and this workspace');
 let mandate;
 await mongoose.connection.transaction(async session=>{
 mandate=await DailyMandate.findOneAndUpdate({userId:req.user._id,workspaceId:workspace._id,date},{$set:{tasks:ids,lockedAt:new Date()}},{upsert:true,new:true,runValidators:true,session});
 await Task.updateMany({_id:{$in:ids},workspaceId:workspace._id,status:{$nin:['completed','archived']}},{$set:{status:'in-progress'}},{runValidators:true,session});
 });
 const updated=await Task.find({_id:{$in:ids},workspaceId:workspace._id});for(const task of updated)req.io?.to(String(workspace._id)).emit('task:updated',task);
 await mandate.populate('tasks');res.json({...mandate.toObject(),locked:true});
});
