// Feature metadata and form conversions are shared by both clients.
import catalog from "./featureCatalog.json";
export { catalog };
const featuresByKey = new Map(catalog.map((feature) => [feature.key, feature]));
export const featureFor = (key) => featuresByKey.get(key);
export const labelFor = (key) =>
  key.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, (s) => s.toUpperCase());
export const numberFields = new Set([
  "amount",
  "rating",
  "timeEstimate",
  "timeSpent",
]);
export const jsonFields = new Set([
  "condition",
  "filters",
  "sort",
  "subtasks",
  "attachments",
]);
export const dateFields = new Set([
  "dueDate",
  "startDate",
  "targetDate",
  "startTime",
  "endTime",
]);
export const referenceFields = {
  projectId: "projects",
  parentTaskId: "tasks",
  taskId: "tasks",
  assigneeId: "members",
  ownerId: "members",
  parentDocId: "documents",
};
const fieldOptions = {
  priority: ["low", "medium", "high", "urgent"],
  severity: ["low", "medium", "high", "critical"],
  energyLevel: ["", "low", "medium", "high"],
  recurrenceRule: ["", "daily", "weekly", "monthly"],
  viewType: ["list", "kanban", "calendar", "timeline", "table"],
  period: ["daily", "weekly", "monthly", "task"],
  trigger: ["task_created", "status_changed", "priority_changed"],
  action: ["change_status", "change_priority", "add_tag", "assign_user"],
  isActive: ["true", "false"],
};
const taskStatuses = [
  "pending",
  "in-progress",
  "validation",
  "completed",
  "archived",
];
const goalStatuses = ["active", "achieved", "abandoned"];
const projectStatuses = ["active", "archived", "completed"];
const recordStatuses = ["open", "in-progress", "resolved", "archived"];
const statusesByMode = {
  tasks: taskStatuses,
  "task-detail": taskStatuses,
  goals: goalStatuses,
  "goal-detail": goalStatuses,
  projects: projectStatuses,
  "project-detail": projectStatuses,
};
export const enumFor = (field, mode) => {
  if (field === "status") return statusesByMode[mode] || recordStatuses;
  return fieldOptions[field];
};
export const initialForm = (feature, item = {}) =>
  Object.fromEntries(
    feature.fields.map((field) => {
      const raw = item[field];
      let value = raw == null ? "" : raw;
      if (jsonFields.has(field))
        value =
          raw == null
            ? ["condition", "filters", "sort"].includes(field)
              ? "{}"
              : "[]"
            : JSON.stringify(raw, null, 2);
      else if (Array.isArray(raw))
        value = raw.map((v) => v?._id || v).join(", ");
      else if (raw && typeof raw === "object") value = raw._id || "";
      else if (dateFields.has(field) && raw)
        value = new Date(raw).toISOString();
      if (!raw && enumFor(field, feature.mode))
        value = enumFor(field, feature.mode)[0];
      if (field === "period" && !raw)
        value = /monthly/.test(feature.key)
          ? "monthly"
          : /weekly/.test(feature.key)
            ? "weekly"
            : /task/.test(feature.key)
              ? "task"
              : "daily";
      if (field === "date" && !raw)
        value = new Date().toLocaleDateString("en-CA");
      if (field === "currency" && !raw) value = "USD";
      return [field, String(value)];
    }),
  );
export const payloadFor = (feature, form) =>
  Object.fromEntries(
    feature.fields.map((field) => {
      const raw = form[field] ?? "";
      let value = raw;
      if (jsonFields.has(field)) value = JSON.parse(raw || "{}");
      else if (numberFields.has(field)) {
        value = raw === "" ? null : Number(raw);
        if (value !== null && !Number.isFinite(value))
          throw new Error("Invalid " + labelFor(field));
      } else if (dateFields.has(field)) {
        value = raw ? new Date(raw).toISOString() : null;
      } else if (referenceFields[field]) value = raw || null;
      else if (["tags", "linkedTasks", "attendees"].includes(field))
        value = raw
          .split(",")
          .map((v) => v.trim())
          .filter(Boolean);
      else if (field === "isActive") value = raw === "true";
      return [field, value];
    }),
  );

// Record titles are consistent in pickers, search results, and feature lists.
export const recordTitle = (item) =>
  item.title ||
  item.name ||
  item.user?.name ||
  item.taskId?.title ||
  (item.date ? "Plan " + item.date : null) ||
  item.agent ||
  labelFor(item.action || item.entityType || "Record");
