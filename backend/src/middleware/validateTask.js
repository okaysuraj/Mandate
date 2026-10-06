import mongoose from "mongoose";

const STATUS_ALIASES = {
  todo: "pending",
  backlog: "pending",
  doing: "in-progress",
  "in_progress": "in-progress",
  "in progress": "in-progress",
  review: "validation",
  testing: "validation",
  done: "completed",
  deployed: "completed",
  finished: "completed",
};

const PRIORITY_ALIASES = {
  alpha: "urgent",
  critical: "urgent",
  beta: "high",
  gamma: "medium",
  normal: "medium",
};

export const sanitizeAndValidateTask = (req, res, next) => {
  const body = req.body;

  // 1. Require non-empty title on task creation
  if (req.method === "POST") {
    if (!body.title || typeof body.title !== "string" || !body.title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Task title is required",
        field: "title",
      });
    }
    req.body.title = body.title.trim();
  } else if (body.title !== undefined) {
    if (typeof body.title !== "string" || !body.title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Task title cannot be empty",
        field: "title",
      });
    }
    req.body.title = body.title.trim();
  }

  // 2. Status normalization and validation
  if (body.status !== undefined) {
    const rawStatus = String(body.status).toLowerCase().trim();
    const normalizedStatus = STATUS_ALIASES[rawStatus] || rawStatus;
    const allowedStatuses = ["pending", "in-progress", "validation", "completed", "archived"];
    if (!allowedStatuses.includes(normalizedStatus)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status: '${body.status}'. Must be one of: ${allowedStatuses.join(", ")}`,
        field: "status",
      });
    }
    req.body.status = normalizedStatus;
  }

  // 3. Priority normalization and validation
  if (body.priority !== undefined) {
    const rawPriority = String(body.priority).toLowerCase().trim();
    const normalizedPriority = PRIORITY_ALIASES[rawPriority] || rawPriority;
    const allowedPriorities = ["low", "medium", "high", "urgent"];
    if (!allowedPriorities.includes(normalizedPriority)) {
      return res.status(400).json({
        success: false,
        message: `Invalid priority: '${body.priority}'. Must be one of: ${allowedPriorities.join(", ")}`,
        field: "priority",
      });
    }
    req.body.priority = normalizedPriority;
  }

  // 4. Safe Date conversion (empty string or falsy -> null)
  const dateFields = ["dueDate", "startDate", "snoozedUntil", "completedAt"];
  for (const field of dateFields) {
    if (body[field] !== undefined) {
      if (!body[field] || String(body[field]).trim() === "") {
        req.body[field] = null;
      } else {
        const parsedDate = new Date(body[field]);
        if (isNaN(parsedDate.getTime())) {
          return res.status(400).json({
            success: false,
            message: `Invalid date format for '${field}'`,
            field,
          });
        }
        req.body[field] = parsedDate;
      }
    }
  }

  // 5. Safe ObjectId conversion (empty string or non-ObjectId -> null)
  const idFields = ["projectId", "parentTaskId", "assigneeId"];
  for (const field of idFields) {
    if (body[field] !== undefined) {
      if (
        !body[field] ||
        body[field] === "Inbox" ||
        body[field] === "none" ||
        body[field] === "null" ||
        !mongoose.Types.ObjectId.isValid(body[field])
      ) {
        req.body[field] = null;
      }
    }
  }

  // 6. Safe Workspace ID fallback
  if (!body.workspaceId || !mongoose.Types.ObjectId.isValid(body.workspaceId)) {
    req.body.workspaceId = req.user?.activeWorkspace || null;
  }

  // 7. Subtasks sanitization
  if (Array.isArray(body.subtasks)) {
    req.body.subtasks = body.subtasks
      .filter((s) => s && (typeof s === "string" ? s.trim() : (s.title && s.title.trim())))
      .map((s) => {
        if (typeof s === "string") {
          return { title: s.trim(), isCompleted: false };
        }
        return {
          title: String(s.title).trim(),
          isCompleted: Boolean(s.isCompleted),
        };
      });
  }

  next();
};
