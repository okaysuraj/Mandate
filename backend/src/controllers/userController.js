import User from "../models/User.js";

// @desc    Add a project to user's project list
// @route   POST /api/users/projects
// @access  Private
export const addProject = async (req, res) => {
  try {
    const { project } = req.body;
    
    if (!project || typeof project !== "string" || project.trim() === "") {
      return res.status(400).json({ message: "Valid project name is required" });
    }

    const projectName = project.trim();
    
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.projects.includes(projectName)) {
      return res.status(400).json({ message: "Project already exists" });
    }

    user.projects.push(projectName);
    await user.save();

    // Return updated user data (excluding password)
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      projects: user.projects,
    });
  } catch (error) {
    console.error("Error in addProject controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// @desc    Update user profile and preferences
// @route   PUT /api/users/profile
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    const { name, avatar, timezone, preferences } = req.body;
    
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name !== undefined) user.name = name;
    if (avatar !== undefined) user.avatar = avatar;
    if (timezone !== undefined) user.timezone = timezone;
    
    if (preferences) {
      if (preferences.theme !== undefined) user.preferences.theme = preferences.theme;
      if (preferences.notifications !== undefined) user.preferences.notifications = preferences.notifications;
      if (preferences.workHours) {
        if (preferences.workHours.start !== undefined) user.preferences.workHours.start = preferences.workHours.start;
        if (preferences.workHours.end !== undefined) user.preferences.workHours.end = preferences.workHours.end;
      }
    }

    await user.save();

    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      timezone: user.timezone,
      preferences: user.preferences,
      projects: user.projects,
    });
  } catch (error) {
    console.error("Error in updateProfile controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// @desc    Register Expo Push Token
// @route   POST /api/users/push-token
// @access  Private
export const registerPushToken = async (req, res) => {
  try {
    const { expoPushToken } = req.body;

    const user = await User.findById(req.user._id);

    if (user) {
      user.expoPushToken = expoPushToken;
      await user.save();
      res.status(200).json({ message: "Push token registered successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error in registerPushToken controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
