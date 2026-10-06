import mongoose from 'mongoose';
import { schemaPolicy } from './schemaPolicy.js';
const schema = new mongoose.Schema({
  workspaceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace', required: true },
  kind: { type: String, required: true, maxlength: 100 },
  title: { type: String, required: true, trim: true, maxlength: 200 },
  description: { type: String, default: '', maxlength: 20000 },
  status: { type: String, enum: ['open', 'in-progress', 'resolved', 'archived'], default: 'open' },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', default: null },
  targetDate: { type: Date, default: null },
  amount: { type: Number, min: 0, max: 1000000000000, default: null },
  currency: { type: String, enum: Intl.supportedValuesOf('currency'), default: 'USD' },
  severity: { type: String, enum: ['low', 'medium', 'high', 'critical'], default: 'medium' },
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true, strict: 'throw', optimisticConcurrency: true });
schema.index({ workspaceId: 1, kind: 1, createdAt: -1 });
schemaPolicy(schema);
schema.path('currency').validate(value=>Intl.supportedValuesOf('currency').includes(value),'Currency must be a supported ISO currency');
export default mongoose.model('WorkspaceRecord', schema);
