import Task from "../models/Task.js";
import Project from "../models/Project.js";
import Goal from "../models/Goal.js";
import Document from "../models/Document.js";

export const searchGlobal = async (req, res) => {
  try {
    const q = req.query.q ? req.query.q.trim() : "";
    if (!q) {
      return res.json({ tasks: [], projects: [], goals: [], documents: [], pages: [] });
    }

    const regex = new RegExp(q, "i");
    const allowedWorkspaces = [
      ...(req.user.workspaces || []),
      ...(req.user.activeWorkspace ? [req.user.activeWorkspace] : [])
    ];

    // Search tasks scoped to user's workspaces or tasks they created/are assigned to
    const taskFilter = {
      $and: [
        {
          $or: [
            ...(allowedWorkspaces.length > 0 ? [{ workspaceId: { $in: allowedWorkspaces } }] : []),
            { creatorId: req.user._id },
            { assigneeId: req.user._id }
          ]
        },
        { $or: [{ title: regex }, { description: regex }, { tags: regex }] }
      ]
    };
    const tasks = await Task.find(taskFilter)
      .limit(5)
      .select("_id title status priority description");

    // Search projects scoped to user's workspaces
    const projectFilter = allowedWorkspaces.length > 0 ? {
      workspaceId: { $in: allowedWorkspaces },
      $or: [{ name: regex }, { description: regex }]
    } : {
      creatorId: req.user._id,
      $or: [{ name: regex }, { description: regex }]
    };
    const projects = await Project.find(projectFilter)
      .limit(5)
      .select("_id name description status");

    // Search goals scoped to user's workspaces
    const goalFilter = allowedWorkspaces.length > 0 ? {
      workspaceId: { $in: allowedWorkspaces },
      $or: [{ title: regex }, { description: regex }, { category: regex }]
    } : {
      $or: [{ title: regex }, { description: regex }, { category: regex }]
    };
    const goals = allowedWorkspaces.length > 0
      ? await Goal.find(goalFilter).limit(5).select("_id title category description")
      : [];

    // Search documents scoped to user's workspaces or author
    const docFilter = {
      $and: [
        {
          $or: [
            ...(allowedWorkspaces.length > 0 ? [{ workspaceId: { $in: allowedWorkspaces } }] : []),
            { author: req.user._id }
          ]
        },
        { $or: [{ title: regex }, { content: regex }] }
      ]
    };
    const documents = await Document.find(docFilter)
      .limit(5)
      .select("_id title");

    // App Navigation Pages
    const allPages = [
      { label: "Dashboard Command Center", path: "/dashboard", icon: "dashboard", category: "Page" },
      { label: "Today's Mandates", path: "/today", icon: "event_upcoming", category: "Page" },
      { label: "Kanban Board", path: "/kanban", icon: "view_kanban", category: "Page" },
      { label: "Task Backlog", path: "/backlog", icon: "inventory_2", category: "Page" },
      { label: "Project Fleet", path: "/projects", icon: "account_tree", category: "Page" },
      { label: "Calendar Schedule", path: "/calendar", icon: "calendar_today", category: "Page" },
      { label: "Analytics & Metrics", path: "/analytics", icon: "analytics", category: "Page" },
      { label: "Inbox Messages", path: "/inbox", icon: "inbox", category: "Page" },
      { label: "Team Workspace", path: "/team-workspace", icon: "group", category: "Page" },
      { label: "Daily Planning", path: "/daily-planning", icon: "calendar_month", category: "Page" },
      { label: "Automation Protocols", path: "/automation-rules", icon: "bolt", category: "Page" },
      { label: "Account Settings", path: "/settings", icon: "settings", category: "Page" },
      { label: "Billing & Subscriptions", path: "/billing", icon: "credit_card", category: "Page" },
      { label: "Command Palette", path: "/command-palette", icon: "terminal", category: "Page" },
    ];

    const pages = allPages.filter(p => 
      p.label.toLowerCase().includes(q.toLowerCase()) || 
      p.path.toLowerCase().includes(q.toLowerCase())
    );

    res.json({
      tasks,
      projects,
      goals,
      documents,
      pages
    });
  } catch (error) {
    console.error("Global search error:", error);
    res.status(500).json({ message: "Search failed" });
  }
};
