import {schemaPolicy} from './schemaPolicy.js';
import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  workspaceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', default: null },
  startedAt: { type: Date, required: true, default: Date.now },
  endedAt: { type: Date, default: null },
  durationMinutes: { type: Number, default: 0, min: 0, max: 1440 },
  notes: { type: String, maxlength: 10000, default: '' }
}, { timestamps: true, strict: 'throw' });
schema.index({ userId: 1, workspaceId: 1, startedAt: -1 });
schema.index({userId:1,workspaceId:1},{unique:true,partialFilterExpression:{endedAt:null}});
schemaPolicy(schema);
export default mongoose.model('FocusSession', schema);
