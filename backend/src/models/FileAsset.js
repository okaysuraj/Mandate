import {schemaPolicy,safeUrl} from './schemaPolicy.js';
import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  workspaceId: {type:mongoose.Schema.Types.ObjectId,ref:'Workspace',required:true},
  userId: {type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
  publicId: {type:String,required:true},
  format: {type:String,required:true},
  resourceType: {type:String,enum:['image','raw'],required:true},
  deliveryUrl: {type:String,required:true,maxlength:2000,validate:{validator:safeUrl,message:'Invalid asset URL'}},
  name: {type:String,required:true,maxlength:200},
  mimeType: {type:String,required:true},
  size: {type:Number,required:true,min:0,max:10485760}
},{timestamps:true,strict:'throw'});
schema.index({workspaceId:1,userId:1});
schemaPolicy(schema);
export default mongoose.model('FileAsset',schema);
