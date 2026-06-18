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
