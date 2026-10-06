import cron from 'node-cron';
import Task from '../models/Task.js';
import Notification from '../models/Notification.js';
import User from '../models/User.js';
import Workspace from '../models/Workspace.js';
import { Expo } from 'expo-server-sdk';
const expo=new Expo();
export const initReminderService=io=>cron.schedule('* * * * *',async()=>{
 try{
  const now=new Date();
  const upcoming=Task.find({status:{$nin:['completed','archived']},dueDate:{$gte:now,$lte:new Date(now.getTime()+15*60000)}}).cursor();
  for await(const task of upcoming){
   const workspace=await Workspace.findById(task.workspaceId);if(!workspace)continue;
   const members=new Set([String(workspace.owner),...workspace.members.map(m=>String(m.user))]);
   for(const userId of new Set([String(task.creatorId),...(task.assigneeId?[String(task.assigneeId)]:[])])){
    if(!members.has(userId))continue;
    const user=await User.findById(userId);if(!user||user.preferences.notifications==='light')continue;
    let notification;
    try{notification=await Notification.create({user:userId,title:'Upcoming deadline',message:'Task "'+task.title+'" is due within 15 minutes.',type:'reminder',relatedEntityId:task._id,workspaceId:task.workspaceId,dedupeKey:'deadline:'+task._id+':'+task.dueDate.toISOString()+':'+userId});}catch(error){if(error.code===11000)continue;throw error;}
    io?.to('user:'+userId).emit('notification_created',notification);
    if(Expo.isExpoPushToken(user.expoPushToken))try{await expo.sendPushNotificationsAsync([{to:user.expoPushToken,title:notification.title,body:notification.message,data:{taskId:String(task._id)}}]);}catch(error){console.error('Push delivery failed:',error.name);}
   }
  }
 }catch(error){console.error('Reminder job failed:',error.name);}
},{timezone:'UTC'});
