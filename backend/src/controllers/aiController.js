import Task from "../models/Task.js";

// Mock AI Service for Task Breakdown
// In a real app, you would use OpenAI or Google Gemini SDK here.
const generateSubtasksFromAI = async (title, intent) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        `Research best practices for: ${title}`,
        `Draft initial outline based on ${intent || 'project goals'}`,
        `Review and refine with the team`,
        `Finalize and publish`
      ]);
    }, 1500); // Simulate network latency
  });
};

const parseTaskString = async (input) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock parsing logic
      const tags = [];
      let priority = 'medium';
      if (input.includes('#')) {
        const words = input.split(' ');
        words.forEach(w => {
          if (w.startsWith('#')) tags.push(w.substring(1));
        });
      }
      if (input.toLowerCase().includes('p1') || input.toLowerCase().includes('high')) {
        priority = 'high';
      }
      resolve({
        title: input.replace(/#[^\s]+/g, '').replace(/p1/gi, '').replace(/high/gi, '').trim(),
        tags,
        priority,
        intent: 'Parsed from smart input'
      });
    }, 1000);
  });
};

export const suggestTaskBreakdown = async (req, res) => {
  try {
    const { taskId } = req.body;
    const task = await Task.findById(taskId);
    
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Call Mock AI Provider
    const suggestedSubtasks = await generateSubtasksFromAI(task.title, task.intent);

    // Create these subtasks in the database automatically
    const subtaskDocs = await Promise.all(suggestedSubtasks.map(async (subTitle) => {
      return await Task.create({
        title: subTitle,
        parentTaskId: task._id,
        workspaceId: task.workspaceId,
        priority: 'medium',
        status: 'todo'
      });
    }));

    // Broadcast if sockets are enabled
    if (req.io) {
      req.io.to(task.workspaceId.toString()).emit("task:updated", { ...task.toObject(), aiGenerated: true });
    }

    res.json(subtaskDocs);
  } catch (error) {
    res.status(500).json({ message: "AI generation failed: " + error.message });
  }
};

export const parseSmartInput = async (req, res) => {
  try {
    const { input } = req.body;
    if (!input) return res.status(400).json({ message: "No input provided" });
    
    const parsedData = await parseTaskString(input);
    res.json(parsedData);
  } catch (error) {
    res.status(500).json({ message: "AI parsing failed: " + error.message });
  }
};
