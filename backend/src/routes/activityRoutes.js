import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import Activity from '../models/Activity.js';
import {workspaceAccess,assertId} from '../utils/access.js';
import {handler,pagination,HttpError} from '../utils/http.js';
const router=express.Router();
router.get('/',protect,handler(async(req,res)=>{
 const workspace=await workspaceAccess(req.user,req.query.workspaceId);
 const filter={workspaceId:workspace._id};if(req.query.entityId)filter.entityId=assertId(req.query.entityId);
 if(req.query.entityType){if(!['task','project','document','goal','automation','workspace'].includes(req.query.entityType))throw new HttpError(400,'Invalid activity type');filter.entityType=req.query.entityType;}
 const {limit,skip}=pagination(req.query);
 res.json(await Activity.find(filter).populate('userId','name avatar').sort({createdAt:-1,_id:-1}).skip(skip).limit(limit).lean());
}));
export default router;
