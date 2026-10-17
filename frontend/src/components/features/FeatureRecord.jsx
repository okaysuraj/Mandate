import { recordTitle } from "../../../../shared/featureData";
// Display one record and the actions allowed for its feature and workspace role.
import TaskTools from "./TaskTools";

import { Link } from "react-router";

import api from "../../lib/axios";
import { featureClient } from "../../hooks/useFeature";

import { control, button } from "./styles";

const recordId = (item) => item._id || item.user?._id;
export default function FeatureRecord({
  state,
  item,
  selected,
  setSelected,
  setViewTasks,
}) {
  const { feature, busy, act, canAdmin, canEdit, reload } = state;
  const mode = feature.mode;
  const editable = !!feature.fields.length && canEdit;
  return (
    <article
      key={recordId(item)}
      className="rounded-xl border border-outline-variant p-5 bg-surface-container-lowest space-y-3"
    >
      <div className="flex justify-between gap-4">
        <div className="flex gap-3 items-start">
          {mode === "planning" && (
            <input
              type="checkbox"
              aria-label={"Select " + recordTitle(item)}
              checked={selected.includes(item._id)}
              onChange={(e) =>
                setSelected(
                  e.target.checked
                    ? [...selected, item._id]
                    : selected.filter((id) => id !== item._id),
                )
              }
            />
          )}
          <div>
            <h2 className="font-semibold">{recordTitle(item)}</h2>
            <p className="text-sm text-on-surface-variant">
              {item.status || item.role || item.period || item.action || ""}
              {item.createdAt
                ? " · " + new Date(item.createdAt).toLocaleString()
                : ""}
            </p>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {editable && (
            <button
              className={button}
              disabled={busy}
              onClick={() => state.openForm(item)}
            >
              Edit
            </button>
          )}
          {editable && (
            <button
              className={button}
              disabled={busy}
              onClick={() => {
                if (window.confirm("Delete this record?"))
                  state.remove(item._id);
              }}
            >
              Delete
            </button>
          )}
          {[
            "tasks",
            "task-detail",
            "priorities",
            "reschedule",
            "breakdown",
            "focus",
            "planning",
          ].includes(mode) && (
            <Link className={button} to={"/tasks/" + item._id}>
              Open task
            </Link>
          )}
          {mode === "members" && canAdmin && (
            <select
              aria-label={"Role for " + item.user?.name}
              className={control + " max-w-32"}
              value={item.role}
              onChange={(e) =>
                act(() =>
                  api.put(
                    "/workspaces/" +
                      state.workspaceId +
                      "/members/" +
                      item.user._id,
                    { role: e.target.value },
                  ),
                )
              }
            >
              {["Viewer", "Editor", "Admin"].map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          )}
          {mode === "members" && state.role === "Owner" && (
            <button
              className={button}
              disabled={busy}
              onClick={() => {
                if (window.confirm("Transfer ownership to this member?"))
                  act(() =>
                    api.put("/workspaces/" + state.workspaceId + "/owner", {
                      userId: item.user._id,
                    }),
                  );
              }}
            >
              Transfer ownership
            </button>
          )}
          {["task-templates", "workspace-templates"].includes(feature.key) && (
            <button
              className={button}
              disabled={busy || !canEdit}
              onClick={() =>
                act(() =>
                  api.post(
                    "/features/" + feature.key + "/" + item._id + "/apply",
                  ),
                )
              }
            >
              {feature.key === "task-templates"
                ? "Create task from template"
                : "Create project and task from template"}
            </button>
          )}
          {mode === "saved-views" && (
            <button
              className={button}
              disabled={busy}
              onClick={() =>
                act(async () => {
                  const items = await featureClient.all(
                    "/productivity/saved-views/" + item._id + "/tasks",
                    { workspaceId: state.workspaceId },
                  );
                  setViewTasks(items);
                })
              }
            >
              Apply saved view
            </button>
          )}
          {mode === "focus-log" && !item.endedAt && (
            <button
              className={button}
              disabled={busy || !canEdit}
              onClick={() =>
                act(() =>
                  api.put("/productivity/focus/" + item._id, {
                    notes: item.notes,
                  }),
                )
              }
            >
              Finish session
            </button>
          )}
          {mode === "notifications" && (
            <button
              className={button}
              disabled={busy || item.isRead}
              onClick={() =>
                act(() => api.patch("/notifications/" + item._id + "/read"))
              }
            >
              {item.isRead ? "Read" : "Mark read"}
            </button>
          )}
          {mode === "task-detail" && state.selectedId && (
            <TaskTools task={item} canEdit={canEdit} onChange={reload} />
          )}
          {mode === "sessions" && (
            <button
              className={button}
              disabled={busy || !!item.revokedAt}
              onClick={() =>
                act(() => api.delete("/account/sessions/" + item._id))
              }
            >
              {item.revokedAt
                ? "Revoked"
                : item.current
                  ? "Revoke current session"
                  : "Revoke session"}
            </button>
          )}
          {mode === "breakdown" && (
            <button
              className={button}
              disabled={busy || !canEdit}
              onClick={() =>
                act(() =>
                  api.post("/ai/task-breakdown", {
                    taskId: item._id,
                  }),
                )
              }
            >
              Generate subtasks
            </button>
          )}
          {mode === "reschedule" && (
            <button
              className={button}
              disabled={busy || !canEdit}
              onClick={() =>
                act(() =>
                  api.put("/tasks/" + item._id, {
                    dueDate: new Date(Date.now() + 86400000).toISOString(),
                  }),
                )
              }
            >
              Move due date to tomorrow
            </button>
          )}
        </div>
      </div>
      {(item.description || item.content || item.notes || item.message) && (
        <p className="text-sm whitespace-pre-wrap">
          {item.description || item.content || item.notes || item.message}
        </p>
      )}
      {mode === "mandates" && (
        <p>
          {(item.tasks || [])
            .map((t) => t?.title)
            .filter(Boolean)
            .join(", ") || "No remaining tasks in this plan"}
        </p>
      )}
      {item.amount != null && (
        <p>
          {new Intl.NumberFormat(undefined, {
            style: "currency",
            currency: item.currency,
          }).format(item.amount)}
        </p>
      )}
      {item.durationMinutes != null && (
        <p>
          {item.durationMinutes.toFixed(1)} minutes
          {item.endedAt ? " · completed" : " · in progress"}
        </p>
      )}
      {mode === "sessions" && (
        <p className="text-sm">
          Last API activity: {new Date(item.lastSeenAt).toLocaleString()}
          {item.current ? " · current session" : ""}
        </p>
      )}
    </article>
  );
}
