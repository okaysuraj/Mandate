import { recordTitle } from "../../../../shared/featureData";
// Render one virtualized record and its permitted workspace actions.

import TaskTools from "./TaskTools";

import { View, Text, TouchableOpacity, Alert } from "react-native";

import { featureClient } from "../../hooks/useFeature";
import api from "../../services/api";

export default function FeatureRecord({
  state,
  item,
  ui,
  selected,
  setSelected,
  navigation,
  setViewTasks,
}) {
  const { card, text, colors, button, choices } = ui;
  const { feature, busy, act, canAdmin, canEdit, reload } = state;
  const mode = feature.mode;
  const editable = !!feature.fields.length && canEdit;
  return (
    <View style={card} key={item._id || item.user?._id}>
      {mode === "planning" && (
        <TouchableOpacity
          accessibilityRole="checkbox"
          accessibilityState={{ checked: selected.includes(item._id) }}
          onPress={() =>
            setSelected(
              selected.includes(item._id)
                ? selected.filter((id) => id !== item._id)
                : [...selected, item._id],
            )
          }
        >
          <Text style={text}>
            {selected.includes(item._id) ? "☑ Selected" : "☐ Select task"}
          </Text>
        </TouchableOpacity>
      )}
      <Text style={{ ...text, fontWeight: "700", fontSize: 18 }}>
        {recordTitle(item)}
      </Text>
      <Text style={{ ...text, color: colors.onSurfaceVariant }}>
        {item.status || item.role || item.period || item.action || ""}
        {item.createdAt
          ? " · " + new Date(item.createdAt).toLocaleString()
          : ""}
      </Text>
      {(item.description || item.content || item.notes || item.message) && (
        <Text style={text}>
          {item.description || item.content || item.notes || item.message}
        </Text>
      )}
      {mode === "mandates" && (
        <Text style={text}>
          {(item.tasks || [])
            .map((t) => t?.title)
            .filter(Boolean)
            .join(", ") || "No remaining tasks in this plan"}
        </Text>
      )}
      {item.amount != null && (
        <Text style={text}>
          {new Intl.NumberFormat(undefined, {
            style: "currency",
            currency: item.currency,
          }).format(item.amount)}
        </Text>
      )}
      {item.durationMinutes != null && (
        <Text style={text}>
          {item.durationMinutes.toFixed(1)} minutes
          {item.endedAt ? " · completed" : " · in progress"}
        </Text>
      )}
      {mode === "task-detail" && state.selectedId && (
        <TaskTools task={item} canEdit={canEdit} onChange={reload} />
      )}
      {mode === "sessions" && (
        <Text style={text}>
          Last API activity: {new Date(item.lastSeenAt).toLocaleString()}
          {item.current ? " · current session" : ""}
        </Text>
      )}
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
        {editable && button("Edit", () => state.openForm(item), busy)}
        {editable &&
          button(
            "Delete",
            () =>
              Alert.alert("Delete record?", "This removes the record.", [
                { text: "Cancel", style: "cancel" },
                {
                  text: "Delete",
                  style: "destructive",
                  onPress: () => state.remove(item._id),
                },
              ]),
            busy,
          )}
        {[
          "tasks",
          "task-detail",
          "priorities",
          "reschedule",
          "breakdown",
          "focus",
          "planning",
        ].includes(mode) &&
          button("Open task", () =>
            navigation.navigate("TaskDetail", {
              taskId: item._id,
              id: item._id,
            }),
          )}
        {["task-templates", "workspace-templates"].includes(feature.key) &&
          button(
            feature.key === "task-templates"
              ? "Create task from template"
              : "Create project and task from template",
            () =>
              act(() =>
                api.post(
                  "/features/" + feature.key + "/" + item._id + "/apply",
                ),
              ),
            busy || !canEdit,
          )}
        {mode === "saved-views" &&
          button(
            "Apply saved view",
            () =>
              act(async () => {
                const items = await featureClient.all(
                  "/productivity/saved-views/" + item._id + "/tasks",
                  { workspaceId: state.workspaceId },
                );
                setViewTasks(items);
              }),
            busy,
          )}
        {mode === "focus-log" &&
          !item.endedAt &&
          button(
            "Finish session",
            () =>
              act(() =>
                api.put("/productivity/focus/" + item._id, {
                  notes: item.notes,
                }),
              ),
            busy || !canEdit,
          )}
        {mode === "notifications" &&
          button(
            item.isRead ? "Read" : "Mark read",
            () => act(() => api.patch("/notifications/" + item._id + "/read")),
            busy || item.isRead,
          )}
        {mode === "sessions" &&
          button(
            item.revokedAt
              ? "Revoked"
              : item.current
                ? "Revoke current session"
                : "Revoke session",
            () => act(() => api.delete("/account/sessions/" + item._id)),
            busy || !!item.revokedAt,
          )}
        {mode === "breakdown" &&
          button(
            "Generate subtasks",
            () =>
              act(() => api.post("/ai/task-breakdown", { taskId: item._id })),
            busy || !canEdit,
          )}
        {mode === "reschedule" &&
          button(
            "Move due date to tomorrow",
            () =>
              act(() =>
                api.put("/tasks/" + item._id, {
                  dueDate: new Date(Date.now() + 86400000).toISOString(),
                }),
              ),
            busy || !canEdit,
          )}
      </View>
      {mode === "members" &&
        canAdmin &&
        choices(["Viewer", "Editor", "Admin"], item.role, (role) =>
          act(() =>
            api.put(
              "/workspaces/" + state.workspaceId + "/members/" + item.user._id,
              { role },
            ),
          ),
        )}
      {mode === "members" &&
        state.role === "Owner" &&
        button(
          "Transfer ownership",
          () =>
            Alert.alert(
              "Transfer ownership?",
              "The selected member will become the workspace owner.",
              [
                { text: "Cancel", style: "cancel" },
                {
                  text: "Transfer",
                  onPress: () =>
                    act(() =>
                      api.put("/workspaces/" + state.workspaceId + "/owner", {
                        userId: item.user._id,
                      }),
                    ),
                },
              ],
            ),
          busy,
        )}
    </View>
  );
}
