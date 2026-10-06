import express from 'express';
import PublicContent from '../models/PublicContent.js';
import {protect} from '../middleware/authMiddleware.js';
import {handler,pick,HttpError} from '../utils/http.js';
const router=express.Router();
const validSlug=slug=>{if(!['privacy','terms','legal','security','landing'].includes(slug))throw new HttpError(404,'Page not found');};
router.get('/pages/:slug',handler(async(req,res)=>{validSlug(req.params.slug);const page=await PublicContent.findOne({slug:req.params.slug,published:true}).select('slug title content publishedAt updatedAt');if(!page)throw new HttpError(404,'This page has not been published');res.json(page);}));
router.put('/pages/:slug',protect,handler(async(req,res)=>{validSlug(req.params.slug);if(req.firebaseUser.admin!==true)throw new HttpError(403,'Publisher permission required');const data=pick(req.body,['title','content','published']);if(data.published!==undefined&&typeof data.published!=='boolean')throw new HttpError(400,'Invalid published flag');const page=await PublicContent.findOne({slug:req.params.slug})||new PublicContent({slug:req.params.slug});Object.assign(page,data);page.publishedAt=page.published?new Date():null;await page.save();res.json(page);}));
export default router;
