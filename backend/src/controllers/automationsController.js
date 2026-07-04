import Automation from "../models/Automation.js";
import Task from "../models/Task.js";

// Basic Rule Engine execution logic
export const runAutomations = async (triggerEvent, task, io) => {
  try {
    const automations = await Automation.find({ 
      workspaceId: task.workspaceId, 
      isActive: true,
      trigger: triggerEvent
    });

    let modified = false;

    for (const rule of automations) {
      let conditionMet = false;
      
      if (!rule.condition || !rule.condition.field) {
        conditionMet = true;
      } else {
        const taskValue = task[rule.condition.field] ? String(task[rule.condition.field]) : "";
        const ruleValue = rule.condition.value;

        switch (rule.condition.operator) {
          case "equals":
            conditionMet = taskValue === ruleValue;
            break;
          case "not_equals":
            conditionMet = taskValue !== ruleValue;
            break;
          case "contains":
            // E.g. tags contains 'urgent'
            if (Array.isArray(task[rule.condition.field])) {
              conditionMet = task[rule.condition.field].includes(ruleValue);
            } else {
              conditionMet = taskValue.includes(ruleValue);
            }
            break;
        }
      }

      if (conditionMet) {
        modified = true;
        switch (rule.action) {
          case "change_status":
            task.status = rule.actionValue;
            break;
          case "change_priority":
            task.priority = rule.actionValue;
            break;
          case "add_tag":
            if (!task.tags) task.tags = [];
            if (!task.tags.includes(rule.actionValue)) {
              task.tags.push(rule.actionValue);
            }
            break;
          case "assign_user":
            task.assigneeId = rule.actionValue;
            break;
        }
      }
    }

    if (modified) {
      await task.save();
      if (io) {
        io.to(task.workspaceId.toString()).emit("task:updated", task);
      }
    }
  } catch (error) {
    console.error("Rule engine error:", error);
  }
};

export const createAutomation = async (req, res) => {
  try {
    const automation = await Automation.create(req.body);
    res.status(201).json(automation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAutomations = async (req, res) => {
  try {
    const { workspaceId } = req.query;
    const automations = await Automation.find({ workspaceId });
    res.json(automations);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateAutomation = async (req, res) => {
  try {
    const automation = await Automation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!automation) return res.status(404).json({ message: "Automation not found" });
    res.json(automation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteAutomation = async (req, res) => {
  try {
    const automation = await Automation.findByIdAndDelete(req.params.id);
    if (!automation) return res.status(404).json({ message: "Automation not found" });
    res.json({ message: "Automation deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
