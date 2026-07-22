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

    // Search tasks
    const tasks = await Task.find({
      $or: [{ title: regex }, { description: regex }, { tags: regex }]
    })
      .limit(5)
      .select("_id title status priority description");

    // Search projects
    const projects = await Project.find({
      $or: [{ name: regex }, { description: regex }]
    })
      .limit(5)
      .select("_id name description status");

    // Search goals
    const goals = await Goal.find({
      $or: [{ title: regex }, { description: regex }, { category: regex }]
    })
      .limit(5)
      .select("_id title category description");

    // Search documents
    const documents = await Document.find({
      $or: [{ title: regex }, { content: regex }]
    })
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
