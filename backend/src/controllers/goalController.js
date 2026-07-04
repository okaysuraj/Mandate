import Goal from "../models/Goal.js";

export const createGoal = async (req, res) => {
  try {
    const { title, description, targetDate, workspaceId, linkedTasks } = req.body;
    const goal = await Goal.create({
      title,
      description,
      targetDate,
      workspaceId,
      linkedTasks: linkedTasks || []
    });
    res.status(201).json(goal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getGoals = async (req, res) => {
  try {
    const { workspaceId } = req.query;
    const goals = await Goal.find({ workspaceId }).populate("linkedTasks");
    res.json(goals);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateGoal = async (req, res) => {
  try {
    const goal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate("linkedTasks");
    if (!goal) return res.status(404).json({ message: "Goal not found" });
    res.json(goal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findByIdAndDelete(req.params.id);
    if (!goal) return res.status(404).json({ message: "Goal not found" });
    res.json({ message: "Goal deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
