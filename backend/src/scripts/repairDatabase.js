import 'dotenv/config';
import mongoose from 'mongoose';
import {readdir,readFile} from 'node:fs/promises';
const legacySeedSignatures=JSON.parse(await readFile(new URL('./legacySeedSignatures.json',import.meta.url))); 
import {connectDB} from '../config/db.js';
const apply=process.argv.includes('--apply');
const candidates=[];
try{
 for(const file of await readdir(new URL('../models/',import.meta.url)))if(file.endsWith('.js')&&file!=='schemaPolicy.js')await import('../models/'+file);
 await connectDB({autoIndex:false});
 const db=mongoose.connection.db;
 const users=new Set((await db.collection('users').find().project({_id:1}).toArray()).map(x=>String(x._id)));
 const workspaces=await db.collection('workspaces').find().toArray();
 const validWorkspaces=new Set(workspaces.filter(w=>users.has(String(w.owner))).map(w=>String(w._id)));
 for(const workspace of workspaces)if(!users.has(String(workspace.owner)))candidates.push({collection:'workspaces',document:workspace,reason:'Workspace owner no longer exists'});
 for(const model of Object.values(mongoose.models)){
  if(model.modelName==='Workspace'||model.modelName==='User')continue;
  for await(const document of model.collection.find()){
   let reason;
   if(document.workspaceId&&!validWorkspaces.has(String(document.workspaceId)))reason='Workspace no longer has an existing owner';
   for(const field of ['creatorId','author','creator','userId'])if(document[field]&&!users.has(String(document[field])))reason='Record owner no longer exists';
   if(model.modelName==='Task'&&!reason&&!document.timeSpent&&Number(document.createdAt)===Number(document.updatedAt)&&legacySeedSignatures.some(seed=>Object.entries(seed).every(([key,value])=>document[key]===value)))reason='Unmodified task from retired demonstration seeder';
   if(reason)candidates.push({collection:model.collection.name,document,reason});
  }
 }
 if(apply){
  await mongoose.connection.transaction(async session=>{
   for(const candidate of candidates){
    await db.collection('_mandate_quarantine').insertOne({sourceCollection:candidate.collection,sourceId:candidate.document._id,reason:candidate.reason,quarantinedAt:new Date(),document:candidate.document},{session});
    await db.collection(candidate.collection).deleteOne({_id:candidate.document._id},{session});
   }
   // Drop stale references only after their complete original documents are backed up.
   for(const user of await db.collection('users').find().toArray()){
    const workspaces=(user.workspaces||[]).filter(id=>validWorkspaces.has(String(id)));
    const active=validWorkspaces.has(String(user.activeWorkspace))?user.activeWorkspace:workspaces[0]||null;
    if(workspaces.length!==(user.workspaces||[]).length||String(active)!==String(user.activeWorkspace)){
     await db.collection('_mandate_quarantine').insertOne({sourceCollection:'users',sourceId:user._id,reason:'Snapshot before removing stale workspace references',quarantinedAt:new Date(),document:user},{session});
     await db.collection('users').updateOne({_id:user._id},{$set:{workspaces,activeWorkspace:active}},{session});
    }
   }
  });
 }
 console.log(JSON.stringify({mode:apply?'apply':'read-only',quarantined:apply?candidates.length:0,candidates:candidates.reduce((rows,item)=>{const key=item.collection+': '+item.reason;rows[key]=(rows[key]||0)+1;return rows;},{})},null,2));
}catch(error){console.error('Database repair failed; transaction rolled back:',error.name);process.exitCode=1;}
finally{await mongoose.disconnect();}
