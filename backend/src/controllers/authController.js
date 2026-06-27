import User from "../models/User.js";
import Workspace from "../models/Workspace.js";

export const syncUser = async (req, res) => {
  try {
    const { uid, email, name: firebaseName } = req.firebaseUser;
    const name = req.body.name || firebaseName || "New User";

    let user = await User.findOne({ email });

    if (user) {
      if (!user.firebaseUid) {
        user.firebaseUid = uid;
        await user.save();
      }
      return res.json(user);
    }

    user = await User.create({
      name,
      email,
      firebaseUid: uid,
    });

    const workspace = await Workspace.create({
      name: "Personal Workspace",
      owner: user._id,
      members: [{ user: user._id, role: "Admin" }],
    });

    user.workspaces.push(workspace._id);
    user.activeWorkspace = workspace._id;
    await user.save();

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
