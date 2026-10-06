import mongoose from 'mongoose';
import User from '../models/User.js';
import Workspace from '../models/Workspace.js';
import { handler, HttpError } from '../utils/http.js';
export const syncUser = handler(async (req, res) => {
  const { uid, email, name: displayName } = req.firebaseUser;
  const name = req.body.name || displayName || email.split('@')[0];
  if (typeof name !== 'string' || !name.trim() || name.length > 200) throw new HttpError(400, 'A valid name is required');
  let user = await User.findOne({ firebaseUid: uid });
  if (user) return res.json(user);
  const byEmail = await User.findOne({ email: email.toLowerCase() });
  if (byEmail) {
    if (byEmail.firebaseUid && byEmail.firebaseUid !== uid) throw new HttpError(409, 'Account identity conflict');
    // Legacy profile binding is permitted only after Firebase proves email ownership.
    byEmail.firebaseUid = uid;
    await byEmail.save();
    return res.json(byEmail);
  }
  await mongoose.connection.transaction(async session => {
    [user] = await User.create([{ name: name.trim(), email, firebaseUid: uid }], { session });
    const [workspace] = await Workspace.create([{ name: 'Personal Workspace', owner: user._id, members: [{ user: user._id, role: 'Admin' }] }], { session });
    user.workspaces = [workspace._id];
    user.activeWorkspace = workspace._id;
    await user.save({ session });
  });
  res.status(201).json(user);
});
export const getMe = handler(async (req, res) => res.json(req.user));
