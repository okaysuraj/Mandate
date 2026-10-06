import 'dotenv/config';
import mongoose from 'mongoose';
import {readdir} from 'node:fs/promises';
import {connectDB} from '../config/db.js';
const apply=process.argv.includes('--apply');
const report={mode:apply?'apply':'read-only',collections:[],issues:[],transactionSupport:false};
const issue=(model,code,count=1)=>{const existing=report.issues.find(i=>i.model===model&&i.code===code);if(existing)existing.count+=count;else report.issues.push({model,code,count});};
const bsonSchema=schema=>{
 const properties={},required=[];
 schema.eachPath((key,path)=>{
  if(key.includes('.')){const parts=key.split('.');let target=properties;for(const part of parts.slice(0,-1)){target[part]??={bsonType:['object','null'],additionalProperties:false,properties:{}};target=target[part].properties;}target[parts.at(-1)]=convert(path);return;}
  properties[key]=convert(path);if(path.isRequired)required.push(key);
 });
 properties.__v={bsonType:['int','long','double']};
 return {bsonType:'object',additionalProperties:false,properties,...(required.length?{required}:{})};
};
const convert=path=>{
 const types={String:'string',Number:['double','int','long','decimal'],Boolean:'bool',ObjectId:'objectId',Date:'date',Mixed:['object','array','string','bool','double','int','long','date','objectId']};
 if(path.instance==='Array'){return {bsonType:['array','null'],maxItems:200,items:path.schema?bsonSchema(path.schema):convert(path.caster)};}
 if(path.schema)return {...bsonSchema(path.schema),bsonType:['object','null']};
 let type=types[path.instance]||'object';const result={bsonType:[...(Array.isArray(type)?type:[type]),...(!path.isRequired?['null']:[])]};
 if(path.instance==='String'){result.maxLength=path.validators?.find(v=>v.type==='maxlength')?.maxlength||10000;if(path.isRequired){result.minLength=1;result.pattern='\\S';}if(path.options.match)result.pattern=path.options.match.source;if(path.enumValues?.length)result.enum=[...new Set([...path.enumValues,...(!path.isRequired&&!path.enumValues.includes(null)?[null]:[])])];}
 if(path.instance==='Number'){const min=path.validators?.find(v=>v.type==='min')?.min,max=path.validators?.find(v=>v.type==='max')?.max;if(typeof min==='number')result.minimum=min;if(typeof max==='number')result.maximum=max;}
 return result;
};
try{
 for(const file of await readdir(new URL('../models/',import.meta.url)))if(file.endsWith('.js')&&file!=='schemaPolicy.js')await import('../models/'+file);
 await connectDB({autoIndex:false});
 const hello=await mongoose.connection.db.admin().command({hello:1});report.transactionSupport=!!hello.setName||hello.msg==='isdbgrid';
 if(!report.transactionSupport)issue('database','Transactions require a replica set or sharded cluster');
 const models=Object.values(mongoose.models);
 for(const model of models){
  const row={model:model.modelName,collection:model.collection.name,count:0,invalid:0,missingIndexes:[]};
  for await(const raw of model.collection.find({})){row.count++;try{await new model(raw).validate();}catch(error){row.invalid++;for(const path of Object.keys(error.errors||{}))issue(model.modelName,'Invalid '+path);if(!error.errors)issue(model.modelName,'Unknown fields or invalid structure');}}
  const indexes=await model.collection.indexes().catch(()=>[]);
  const expected=model.schema.indexes();
  for(const [key,options]of expected){if(!indexes.some(idx=>JSON.stringify(idx.key)===JSON.stringify(key)&&!!idx.unique===!!options.unique&&!!idx.sparse===!!options.sparse&&JSON.stringify(idx.partialFilterExpression||{})===JSON.stringify(options.partialFilterExpression||{})))row.missingIndexes.push(key);
   if(options.unique){const fields=Object.keys(key);const duplicates=await model.collection.aggregate([{$match:options.partialFilterExpression||(options.sparse?{[fields[0]]:{$exists:true}}:{})},{$group:{_id:Object.fromEntries(fields.map(f=>[f,'$'+f])),count:{$sum:1}}},{$match:{count:{$gt:1}}},{$count:'count'}]).toArray();if(duplicates[0])issue(model.modelName,'Duplicate unique key '+fields.join(','),duplicates[0].count);}
  }
  report.collections.push(row);
 }
 // Validate tenant boundaries and foreign keys independently of Mongoose casting.
 const collectRefs=(schema,prefix='')=>{const refs=[];schema.eachPath((path,type)=>{const full=prefix+path,ref=type.options.ref||type.caster?.options?.ref;if(ref)refs.push({path:full,ref});if(type.schema)refs.push(...collectRefs(type.schema,full+'.'));});return refs;};
 const valuesAt=(record,parts)=>{if(record==null)return [];if(Array.isArray(record))return record.flatMap(item=>valuesAt(item,parts));if(!parts.length)return [record];return valuesAt(record[parts[0]],parts.slice(1));};
 for(const model of models){
  const refs=collectRefs(model.schema);
  for await(const record of model.find().lean().cursor()){
   for(const {path,ref}of refs){for(const id of valuesAt(record,path.split('.'))){const target=await mongoose.models[ref]?.findById(id).lean();if(!target){issue(model.modelName,'Missing reference '+path);continue;}if(record.workspaceId&&target.workspaceId&&String(record.workspaceId)!==String(target.workspaceId))issue(model.modelName,'Cross-workspace reference '+path);}}
   if(model.modelName==='Workspace'){for(const member of record.members||[])if(!await mongoose.models.User.exists({_id:member.user}))issue('Workspace','Missing member');if(!(record.members||[]).some(m=>String(m.user)===String(record.owner)&&m.role==='Admin'))issue('Workspace','Owner must have Admin membership');}
   if(model.modelName==='Task'&&record.assigneeId){const ws=await mongoose.models.Workspace.findById(record.workspaceId).lean();if(ws&&String(ws.owner)!==String(record.assigneeId)&&!ws.members.some(m=>String(m.user)===String(record.assigneeId)))issue('Task','Assignee is not a member');}
  }
 }
 for(const [name,parentField]of [['Task','parentTaskId'],['Document','parentDocId']]){
  const records=await mongoose.models[name].find().select(parentField).lean();
  const parents=new Map(records.map(record=>[String(record._id),record[parentField]?String(record[parentField]):null]));
  const finished=new Set();
  for(const record of records){let current=String(record._id);const visited=new Set();while(current&&!finished.has(current)){if(visited.has(current)){issue(name,'Cyclic hierarchy');break;}visited.add(current);current=parents.get(current);}for(const id of visited)finished.add(id);}
 }
 if(apply){
  if(report.issues.length)throw new Error('Migration refused: repair reported records and rerun the read-only audit first');
  // Store the previous validators before changing them; collection data is never deleted.
  const db=mongoose.connection.db;
  for(const model of models){
   const name=model.collection.name;const existing=await db.listCollections({name}).next();
   await db.collection('_mandate_schema_backups').insertOne({collection:name,createdAt:new Date(),options:existing?.options||{}});
   if(!existing)await db.createCollection(name);
   await db.command({collMod:name,validator:{$jsonSchema:bsonSchema(model.schema)},validationLevel:'strict',validationAction:'error'});
   await model.createIndexes();
   if(model.modelName==='DailyMandate'){const indexes=await model.collection.indexes();for(const idx of indexes)if(idx.unique&&JSON.stringify(idx.key)===JSON.stringify({userId:1,date:1}))await model.collection.dropIndex(idx.name);}
  }
  report.applied=true;
 }
 console.log(JSON.stringify(report,null,2));if(report.issues.length)process.exitCode=1;
}catch(error){console.log(JSON.stringify({...report,errorCode:error.code,errorType:error.name,error:error.name==='MongoServerSelectionError'?'Database connection unavailable':error.message.includes('Migration refused')?error.message:error.code===9?error.message:'Database audit failed; inspect access and configuration'},null,2));process.exitCode=1;}
finally{await mongoose.disconnect();}
