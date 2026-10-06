import {schemaPolicy} from './schemaPolicy.js';
import mongoose from 'mongoose';
const schema=new mongoose.Schema({slug:{type:String,required:true,unique:true,enum:['privacy','terms','legal','security','landing']},title:{type:String,required:true,trim:true,maxlength:200},content:{type:String,required:true,trim:true,maxlength:50000},published:{type:Boolean,default:false},publishedAt:{type:Date,default:null}},{timestamps:true,strict:'throw',optimisticConcurrency:true});
schemaPolicy(schema);
export default mongoose.model('PublicContent',schema);
