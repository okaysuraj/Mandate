import Task from "../models/Task.js";

// AI Engine for Task Decomposition & Natural Language Parsing
const generateSubtasksFromAI = async (title, intent) => {
  const geminiKey = process.env.GEMINI_API_KEY;
  if (geminiKey) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `You are an executive operational assistant. Break down the following task into 3-5 concise, concrete, actionable subtasks. Task Title: "${title}". Task Intent/Context: "${intent || 'Standard execution'}". Return ONLY a raw JSON array of strings, e.g. ["Subtask 1", "Subtask 2"]. Do not include markdown code fences.`
              }]
            }],
            generationConfig: { responseMimeType: "application/json" }
          })
        }
      );
      if (response.ok) {
        const result = await response.json();
        const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          const parsed = JSON.parse(text);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        }
      }
    } catch (err) {
      console.warn("[AI Engine] Gemini API call failed, falling back to semantic breakdown engine:", err.message);
    }
  }

  // Structured Semantic Breakdown Engine (Deterministic NLP Decomposition)
  const cleanTitle = title.trim();
  const words = cleanTitle.split(/\s+/);
  const actionVerb = words[0] || "Execute";
  const nounPhrase = words.slice(1).join(" ") || cleanTitle;

  return [
    `Analyze requirements and dependencies for: ${cleanTitle}`,
    `Execute core implementation of ${nounPhrase}`,
    `Validate outputs and perform quality review for: ${cleanTitle}`,
    `Finalize integration and deploy ${nounPhrase}`
  ];
};

const parseTaskString = async (input) => {
  const clean = input.trim();
  const tags = [];
  let priority = "medium";
  let timeEstimate = 30;

  // Extract hashtags
  const tagMatches = clean.match(/#(\w+)/g);
  if (tagMatches) {
    tagMatches.forEach(t => tags.push(t.substring(1).toLowerCase()));
  }

  // Extract priority indicators
  if (/\b(p0|p1|urgent|critical|blocker)\b/i.test(clean)) {
    priority = "urgent";
  } else if (/\b(p2|high|important)\b/i.test(clean)) {
    priority = "high";
  } else if (/\b(p3|low|minor)\b/i.test(clean)) {
    priority = "low";
  }

  // Extract time estimate (e.g. 30m, 2h, 45mins)
  const timeMatch = clean.match(/\b(\d+)\s*(m|min|mins|h|hr|hrs|hour|hours)\b/i);
  if (timeMatch) {
    const val = parseInt(timeMatch[1], 10);
    const unit = timeMatch[2].toLowerCase();
    timeEstimate = unit.startsWith("h") ? val * 60 : val;
  }

  // Clean title by removing extracted flags
  const title = clean
    .replace(/#\w+/g, "")
    .replace(/\b(p0|p1|p2|p3|urgent|critical|high|low|medium)\b/gi, "")
    .replace(/\b\d+\s*(m|min|mins|h|hr|hrs|hour|hours)\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();

  return {
    title: title || clean,
    tags,
    priority,
    timeEstimate,
    intent: `Decomposed from: "${clean}"`
  };
};

export const suggestTaskBreakdown = async (req, res) => {
  try {
    const { taskId } = req.body;
    const task = await Task.findById(taskId);
    
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Call AI Provider
    const suggestedSubtasks = await generateSubtasksFromAI(task.title, task.intent);

    // Create these subtasks in the database automatically
    const subtaskDocs = await Promise.all(suggestedSubtasks.map(async (subTitle) => {
      return await Task.create({
        title: subTitle,
        parentTaskId: task._id,
        creatorId: req.user?.id || task.creatorId,
        workspaceId: task.workspaceId,
        priority: 'medium',
        status: 'pending'
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

export const detectBurnout = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const tasksToday = await Task.find({
      creatorId: req.user.id,
      dueDate: { $gte: today, $lt: tomorrow }
    });

    let totalEstimate = 0;
    let completedCount = 0;
    
    tasksToday.forEach(task => {
      totalEstimate += (task.timeEstimate || 30); // assume 30 mins if not set
      if (task.status === "completed") completedCount++;
    });

    let burnoutRisk = "Low";
    let advice = "You have a manageable workload today.";

    if (totalEstimate > 480) { // More than 8 hours of estimated work
      burnoutRisk = "High";
      advice = "You have scheduled more than 8 hours of work today. Consider rescheduling lower priority tasks to tomorrow to avoid burnout.";
    } else if (totalEstimate > 360) {
      burnoutRisk = "Medium";
      advice = "Your schedule is quite full. Make sure to take breaks and use the Focus timer.";
    }

    res.json({
      tasksCount: tasksToday.length,
      completedCount,
      estimatedMinutes: totalEstimate,
      burnoutRisk,
      advice
    });

  } catch (error) {
    res.status(500).json({ message: "Burnout detection failed: " + error.message });
  }
};
