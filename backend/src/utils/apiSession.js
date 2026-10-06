import { createHash } from 'node:crypto';
import ApiSession from '../models/ApiSession.js';
import { HttpError } from './http.js';
export const sessionKeyFor = decoded => createHash('sha256').update(decoded.uid + ':' + decoded.auth_time).digest('hex');
export const checkSession = async (user, decoded, agent = '') => {
  if (user.sessionsRevokedBefore && decoded.auth_time * 1000 <= user.sessionsRevokedBefore.getTime()) throw new HttpError(401, 'Please sign in again');
  const sessionKey = sessionKeyFor(decoded);
  let session = await ApiSession.findOne({sessionKey});
  if (session?.revokedAt) throw new HttpError(401, 'Session has been revoked');
  if (!session) {
    try { session = await ApiSession.create({sessionKey,userId:user._id,authTime:decoded.auth_time,agent:agent.slice(0,500)}); }
    catch(error) { if(error.code!==11000)throw error; session=await ApiSession.findOne({sessionKey});if(session.revokedAt)throw new HttpError(401,'Session has been revoked'); }
  } else if(Date.now()-session.lastSeenAt.getTime()>60000) {
    await ApiSession.updateOne({_id:session._id,revokedAt:null},{$set:{lastSeenAt:new Date()}});
  }
  return session;
};
