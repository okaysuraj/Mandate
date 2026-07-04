import Workspace from "../models/Workspace.js";
import User from "../models/User.js";

// @desc    Create a new workspace
// @route   POST /api/workspaces
// @access  Private
export const createWorkspace = async (req, res) => {
  try {
    const { name } = req.body;

    const workspace = await Workspace.create({
      name,
      owner: req.user.id,
      members: [{ user: req.user.id, role: "Admin" }],
    });

    const user = await User.findById(req.user.id);
    user.workspaces.push(workspace._id);
    if (!user.activeWorkspace) {
      user.activeWorkspace = workspace._id;
    }
    await user.save();

    res.status(201).json(workspace);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get user's workspaces
// @route   GET /api/workspaces
// @access  Private
export const getWorkspaces = async (req, res) => {
  try {
    const workspaces = await Workspace.find({
      "members.user": req.user.id,
    });
    res.json(workspaces);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Switch active workspace
// @route   PUT /api/workspaces/:id/active
// @access  Private
export const switchActiveWorkspace = async (req, res) => {
  try {
    const workspace = await Workspace.findById(req.params.id);
    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }

    const isMember = workspace.members.find(
      (m) => m.user.toString() === req.user.id.toString()
    );

    if (!isMember) {
      return res.status(403).json({ message: "Not a member of this workspace" });
    }

    const user = await User.findById(req.user.id);
    user.activeWorkspace = workspace._id;
    await user.save();

    res.json({ message: "Active workspace updated", activeWorkspace: workspace._id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get workspace members
// @route   GET /api/workspaces/:id/members
// @access  Private
export const getWorkspaceMembers = async (req, res) => {
  try {
    const workspace = await Workspace.findById(req.params.id).populate('members.user', 'name email');
    if (!workspace) return res.status(404).json({ message: "Workspace not found" });
    
    // Check if requester is a member
    const isMember = workspace.members.some(m => m.user._id.toString() === req.user.id.toString());
    if (!isMember) return res.status(403).json({ message: "Not authorized" });
    
    res.json(workspace.members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update member role
// @route   PUT /api/workspaces/:id/members/:userId
// @access  Private (Owner/Admin only)
export const updateMemberRole = async (req, res) => {
  try {
    const { role } = req.body;
    const workspace = await Workspace.findById(req.params.id);
    
    // Check if requester is Admin/Owner
    const requester = workspace.members.find(m => m.user.toString() === req.user.id.toString());
    if (!requester || requester.role !== 'Admin') {
      return res.status(403).json({ message: "Only Admins can update roles" });
    }
    
    const member = workspace.members.find(m => m.user.toString() === req.params.userId);
    if (!member) return res.status(404).json({ message: "User not found in workspace" });
    
    member.role = role;
    await workspace.save();
    
    res.json(workspace.members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
