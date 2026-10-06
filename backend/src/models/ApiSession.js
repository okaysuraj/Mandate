import {schemaPolicy} from './schemaPolicy.js';
import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sessionKey: { type: String, required: true, unique: true },
  authTime: { type: Number, required: true, min:0, max:Number.MAX_SAFE_INTEGER },
  lastSeenAt: { type: Date, default: Date.now },
  agent: { type: String, maxlength: 500, default: '' },
  revokedAt: { type: Date, default: null }
}, { timestamps: true, strict: 'throw' });
schema.index({ userId: 1, lastSeenAt: -1 });
schemaPolicy(schema);
export default mongoose.model('ApiSession', schema);
