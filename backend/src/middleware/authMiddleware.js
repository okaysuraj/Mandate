import { checkSession } from '../utils/apiSession.js';
import '../config/firebase.js';
import { getAuth } from 'firebase-admin/auth';
import User from '../models/User.js';
export const authenticateToken = async token => {
  if (typeof token !== 'string' || !token) throw new Error('Missing token');
  const decoded = await getAuth().verifyIdToken(token, true);
  if (!decoded.email_verified || !decoded.email) throw new Error('Verified email required');
  return decoded;
};
const bearer = req => /^Bearer ([^\s]+)$/.exec(req.headers.authorization || '')?.[1];
export const verifyTokenOnly = async (req, res, next) => {
  try { req.firebaseUser = await authenticateToken(bearer(req)); }
  catch { return res.status(401).json({ message: 'A valid token with a verified email is required' }); }
  next();
};
export const protect = async (req, res, next) => {
  let decoded;
  try { decoded = await authenticateToken(bearer(req)); }
  catch { return res.status(401).json({ message: 'A valid token with a verified email is required' }); }
  try {
    req.user = await User.findOne({ firebaseUid: decoded.uid });
    if (!req.user) return res.status(401).json({ message: 'User profile must be synchronized' });
    req.apiSession = await checkSession(req.user, decoded, req.headers["user-agent"] || "");
    req.firebaseUser = decoded;
    next();
  } catch (error) { next(error); }
};
