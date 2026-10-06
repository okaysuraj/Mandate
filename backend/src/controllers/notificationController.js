import Notification from '../models/Notification.js';
import {handler,pagination,HttpError} from '../utils/http.js';
import {assertId} from '../utils/access.js';
export const getNotifications=handler(async(req,res)=>{const {limit,skip}=pagination(req.query);res.json(await Notification.find({user:req.user._id}).sort({createdAt:-1,_id:-1}).skip(skip).limit(limit));});
export const markAsRead=handler(async(req,res)=>{await Notification.updateMany({user:req.user._id,isRead:false},{$set:{isRead:true}},{runValidators:true});res.json({message:'Notifications marked as read'});});
export const deleteNotification=handler(async(req,res)=>{const result=await Notification.deleteOne({_id:assertId(req.params.id),user:req.user._id});if(!result.deletedCount)throw new HttpError(404,'Notification not found');res.json({message:'Notification deleted'});});
export const clearAllNotifications=handler(async(req,res)=>{await Notification.deleteMany({user:req.user._id});res.json({message:'All notifications cleared'});});
export const markOneAsRead=handler(async(req,res)=>{const record=await Notification.findOneAndUpdate({_id:assertId(req.params.id),user:req.user._id},{$set:{isRead:true}},{new:true,runValidators:true});if(!record)throw new HttpError(404,'Notification not found');res.json(record);});
