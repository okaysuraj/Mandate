import FileAsset from '../models/FileAsset.js';
import {workspaceAccess,resourceAccess} from '../utils/access.js';
import {handler} from '../utils/http.js';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { HttpError } from '../utils/http.js';
import { randomUUID } from 'node:crypto';
import 'dotenv/config';
cloudinary.config({ cloud_name:process.env.CLOUDINARY_CLOUD_NAME,api_key:process.env.CLOUDINARY_API_KEY,api_secret:process.env.CLOUDINARY_API_SECRET });
const upload=multer({storage:multer.memoryStorage(),limits:{fileSize:10*1024*1024,files:1,fields:5},fileFilter:(req,file,cb)=>{
 if(!['image/jpeg','image/png','application/pdf'].includes(file.mimetype))return cb(new HttpError(400,'Only JPEG, PNG and PDF uploads are supported'));
 cb(null,true);
}});
export const uploadMiddleware=(req,res,next)=>{
 if(!process.env.CLOUDINARY_CLOUD_NAME||!process.env.CLOUDINARY_API_KEY||!process.env.CLOUDINARY_API_SECRET)return next(new HttpError(503,'File storage has not been configured'));
 upload.single('file')(req,res,next);
};
export const uploadFile=async(req,res,next)=>{
 try{
  if(!req.file)throw new HttpError(400,'No file uploaded');
  const workspace=await workspaceAccess(req.user,req.body.workspaceId,true);
  const bytes=req.file.buffer;
  const valid=req.file.mimetype==='image/png'?bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])):req.file.mimetype==='image/jpeg'?bytes[0]===255&&bytes[1]===216&&bytes[2]===255:bytes.subarray(0,5).toString()==='%PDF-';
  if(!valid)throw new HttpError(400,'File content does not match its type');
  const result=await new Promise((resolve,reject)=>{
   const stream=cloudinary.uploader.upload_stream({folder:'mandate/'+workspace._id+'/'+req.user._id,public_id:randomUUID()+(req.file.mimetype==='application/pdf'?'.pdf':''),type:'authenticated',resource_type:req.file.mimetype==='application/pdf'?'raw':'image'},(error,result)=>error?reject(error):resolve(result));stream.end(bytes);
  });
  let asset;
  try{asset=await FileAsset.create({workspaceId:workspace._id,userId:req.user._id,publicId:result.public_id,format:result.format||(req.file.mimetype==='application/pdf'?'pdf':req.file.mimetype==='image/png'?'png':'jpg'),resourceType:req.file.mimetype==='application/pdf'?'raw':'image',deliveryUrl:result.secure_url,name:req.file.originalname.slice(0,200),mimeType:req.file.mimetype,size:req.file.size});}catch(error){await cloudinary.uploader.destroy(result.public_id,{type:'authenticated',resource_type:req.file.mimetype==='application/pdf'?'raw':'image'}).catch(()=>{});throw error;}
  res.json({assetId:asset._id,name:asset.name,url:result.secure_url,type:asset.mimeType,size:asset.size});
 }catch(error){next(error);}
};

export const getDownload=handler(async(req,res)=>{
 const {resource:asset}=await resourceAccess(FileAsset,req.user,req.params.id);
 const url=cloudinary.utils.private_download_url(asset.publicId,asset.format,{resource_type:asset.resourceType,type:'authenticated',expires_at:Math.floor(Date.now()/1000)+60,attachment:true});
 res.json({url});
});
