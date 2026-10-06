import {schemaPolicy} from './schemaPolicy.js';
import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  workspaceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  period: { type: String, enum: ['daily', 'weekly', 'monthly', 'task'], required: true },
  date: { type: String, match: /^\d{4}-\d{2}-\d{2}$/, required: true },
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', default: null },
  title: { type: String, trim: true, required: true, maxlength: 200 },
  notes: { type: String, maxlength: 20000, default: '' },
  rating: { type: Number, min: 1, max: 5, default: null }
}, { timestamps: true, strict: 'throw' });
schema.index({ userId: 1, workspaceId: 1, period: 1, date: -1 });
schemaPolicy(schema);
export default mongoose.model('Review', schema);
