import { recordTitle } from "../../../../shared/featureData";
import AccountFeatures from "./AccountFeatures";
import FeatureForm from "./FeatureForm";
import FeatureRecord from "./FeatureRecord";

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../layout/AppHeader";
import { useTheme } from "../../context/ThemeContext";
import { useFeature, featureClient } from "../../hooks/useFeature";
import api from "../../services/api";
import { catalog, labelFor } from "../../../../shared/featureData";
import { useIsFocused } from "@react-navigation/native";

const Choice = ({ values, value, onChange, colors }) => (
  <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
    {values.map((option) => {
      const item =
        typeof option === "string"
          ? { label: option || "None", value: option }
          : option;
      return (
        <TouchableOpacity
          key={item.value}
          accessibilityRole="button"
          accessibilityState={{ selected: value === item.value }}
          onPress={() => onChange(item.value)}
          style={{
            padding: 10,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: colors.outlineVariant,
            backgroundColor:
              value === item.value ? colors.primary : colors.surface,
          }}
        >
          <Text
            style={{
              color: value === item.value ? colors.onPrimary : colors.onSurface,
            }}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

export default function FeatureScreen({
  navigation,
  route,
  featureKey,
  autoEdit,
}) {
  const focused = useIsFocused();
  const { colors } = useTheme();
  const state = useFeature(
    featureKey || route?.params?.featureKey,
    route?.params?.id ||
      route?.params?.taskId ||
      route?.params?.projectId ||
      route?.params?.goalId ||
      route?.params?.task?._id ||
      route?.params?.project?._id ||
      route?.params?.goal?._id,
  );
  const {
    feature,
    data,
    error,
    loading,
    busy,
    act,
    reload,
    canEdit,
    openForm,
    workspaceId,
  } = state;
  const autoOpened = React.useRef("");
  useEffect(() => {
    if (!focused) autoOpened.current = "";
  }, [focused]);
  useEffect(() => {
    if (
      !focused ||
      !autoEdit ||
      !canEdit ||
      !data ||
      autoOpened.current === workspaceId
    )
      return;
    autoOpened.current = workspaceId;
    openForm(
      featureKey === "create-task"
        ? {
            ...(route?.params?.dueDate
              ? { dueDate: route.params.dueDate }
              : {}),
            ...(route?.params?.status ? { status: route.params.status } : {}),
          }
        : data.items?.[0],
    );
  }, [
    focused,
    autoEdit,
    data,
    workspaceId,
    featureKey,
    canEdit,
    openForm,
    route?.params?.dueDate,
    route?.params?.status,
  ]);
  const [viewTasks, setViewTasks] = useState(null);
  useEffect(() => {
    if (data?.active) {
      setSession(data.active);
      setTaskId(data.active.taskId?._id || data.active.taskId);
    }
  }, [data?.active]);
  const [query, setQuery] = useState(""),
    [results, setResults] = useState([]),
    [searchError, setSearchError] = useState("");
  const [selected, setSelected] = useState([]),
    [taskId, setTaskId] = useState(""),
    [session, setSession] = useState(null),
    [notes, setNotes] = useState("");

  useEffect(() => {
    setViewTasks(null);
    setSelected([]);
    setTaskId("");
    setSession(null);
    setResults([]);
    setQuery("");
  }, [feature?.key, workspaceId, focused]);
  useEffect(() => {
    if (!focused || feature?.mode !== "search") return;
    const controller = new AbortController();
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const timer = setTimeout(
      () =>
        featureClient
          .search(query, controller.signal)
          .then((result) => {
            setSearchError("");
            setResults(
              Object.entries(result).flatMap(([type, list]) =>
                list.map((item) => ({ ...item, type })),
              ),
            );
          })
          .catch((err) => {
            if (!controller.signal.aborted)
              setSearchError(err.response?.data?.message || "Search failed");
          }),
      250,
    );
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [feature?.mode, query, focused]);
  const text = { color: colors.onSurface, fontSize: 15, lineHeight: 22 };
  const input = {
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 8,
    padding: 12,
    color: colors.onSurface,
    backgroundColor: colors.surface,
  };
  const card = {
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 12,
    padding: 16,
    gap: 12,
    backgroundColor: colors.surfaceContainerLowest,
  };
  const button = (label, callback, disabled = false) => (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={callback}
      style={{
        padding: 12,
        borderWidth: 1,
        borderColor: colors.outlineVariant,
        borderRadius: 8,
        opacity: disabled ? 0.5 : 1,
        alignSelf: "flex-start",
      }}
    >
      <Text style={{ ...text, fontWeight: "600" }}>{label}</Text>
    </TouchableOpacity>
  );
  if (!feature)
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <AppHeader title="FEATURE" showBack navigation={navigation} />
        <Text style={text}>Feature not found.</Text>
      </SafeAreaView>
    );
  const mode = feature.mode;
  const editable = !!feature.fields.length && canEdit;
  const items = (data?.items || [])
    .filter((item) =>
      mode === "priorities" || mode === "reschedule"
        ? ["urgent", "high"].includes(item.priority) &&
          !["completed", "archived"].includes(item.status)
        : true,
    )
    .filter(
      (item) =>
        mode === "search" ||
        !query ||
        JSON.stringify(item).toLowerCase().includes(query.toLowerCase()),
    );

  const choices = (values, value, onChange) => (
    <Choice values={values} value={value} onChange={onChange} colors={colors} />
  );
  const ui = { colors, text, input, card, button, choices };

  const openResult = (item) =>
    navigation.navigate(
      item.type === "tasks"
        ? "TaskDetail"
        : item.type === "projects"
          ? "ProjectDetail"
          : item.type === "goals"
            ? "GoalDetail"
            : "Docs",
      { id: item._id, taskId: item._id, projectId: item._id, goalId: item._id },
    );
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.background }}
      edges={["top", "left", "right"]}
    >
      <AppHeader
        title={feature.title.toUpperCase()}
        showBack
        navigation={navigation}
      />
      <FlatList
        data={mode === "search" ? [] : items}
        keyExtractor={(item) => item._id || item.user?._id}
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        windowSize={5}
        contentContainerStyle={{ padding: 20, paddingBottom: 100, gap: 18 }}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <View style={{ gap: 18 }}>
            <Text
              style={{
                ...text,
                fontSize: 28,
                lineHeight: 34,
                fontWeight: "700",
              }}
            >
              {feature.title}
            </Text>
            <View style={{ flexDirection: "row", gap: 10, flexWrap: "wrap" }}>
              {button("All features", () =>
                navigation.navigate("FeatureIndex"),
              )}
              {button("Refresh", reload, busy || loading)}
              {editable && button("Create", () => state.openForm(), busy)}
            </View>
            {(error || searchError) && (
              <View accessibilityRole="alert" style={card}>
                <Text style={{ ...text, color: colors.error }}>
                  {error || searchError}
                </Text>
                {button("Retry", reload)}
              </View>
            )}
            {loading && (
              <ActivityIndicator
                accessibilityLabel="Loading data"
                color={colors.primary}
              />
            )}
            <FeatureForm state={state} ui={ui} />
            {data?.metrics && (
              <View style={card}>
                {Object.entries(data.metrics).map(([key, value]) => (
                  <View key={key}>
                    <Text style={{ ...text, color: colors.onSurfaceVariant }}>
                      {labelFor(key)}
                    </Text>
                    <Text style={{ ...text, fontSize: 22, fontWeight: "600" }}>
                      {String(value)}
                    </Text>
                  </View>
                ))}
              </View>
            )}
            <AccountFeatures state={state} ui={ui} />

            {mode === "search" && (
              <TextInput
                accessibilityLabel="Search workspace data"
                style={input}
                placeholder="Search tasks, projects, goals, documents"
                placeholderTextColor={colors.onSurfaceVariant}
                value={query}
                onChangeText={setQuery}
                maxLength={100}
              />
            )}
            {mode === "search" &&
              results.map((item) => (
                <TouchableOpacity
                  key={item.type + item._id}
                  style={card}
                  onPress={() => openResult(item)}
                >
                  <Text style={text}>{recordTitle(item)}</Text>
                  <Text style={{ ...text, color: colors.onSurfaceVariant }}>
                    {item.type}
                  </Text>
                </TouchableOpacity>
              ))}
            {mode === "parse-task" && data && (
              <View style={card}>
                <TextInput
                  accessibilityLabel="Task description"
                  style={input}
                  value={query}
                  onChangeText={setQuery}
                  placeholder="Describe a task"
                  placeholderTextColor={colors.onSurfaceVariant}
                />
                {button(
                  "Parse and create task",
                  () =>
                    act(async () => {
                      const parsed = await api.post("/ai/parse-task", {
                        input: query,
                      });
                      await api.post("/tasks", {
                        ...parsed.data,
                        source: undefined,
                        workspaceId: workspaceId,
                      });
                      setQuery("");
                    }),
                  busy || !query || !canEdit,
                )}
              </View>
            )}
            {mode === "focus" && data && (
              <View style={card}>
                <Text style={text}>Select a task</Text>
                {choices(
                  [
                    { label: "Select task", value: "" },
                    ...items.map((t) => ({ label: t.title, value: t._id })),
                  ],
                  taskId,
                  setTaskId,
                )}
                <TextInput
                  accessibilityLabel="Focus notes"
                  style={input}
                  value={notes}
                  onChangeText={setNotes}
                  multiline
                  placeholder="Session notes"
                  placeholderTextColor={colors.onSurfaceVariant}
                />
                {button(
                  session ? "Finish and save session" : "Start focus session",
                  () =>
                    act(async () => {
                      if (session) {
                        await api.put("/productivity/focus/" + session._id, {
                          notes,
                        });
                        setSession(null);
                      } else {
                        const { data } = await api.post("/productivity/focus", {
                          taskId,
                        });
                        setSession(data);
                      }
                    }),
                  busy || !canEdit || !taskId,
                )}
                {session && (
                  <Text style={text}>
                    Started {new Date(session.startedAt).toLocaleString()}.
                    Elapsed time is recorded when you finish.
                  </Text>
                )}
              </View>
            )}
            {mode === "planning" && data && (
              <View style={card}>
                <Text style={text}>
                  {data.plan.locked
                    ? "Today’s plan is saved with " +
                      data.plan.tasks.length +
                      " tasks."
                    : "No plan saved for today."}
                </Text>
                {button(
                  "Save selected tasks as today’s plan",
                  () =>
                    act(() =>
                      api.post("/planning/lock", {
                        taskIds: selected,
                        date: data.plan.date,
                        workspaceId: workspaceId,
                      }),
                    ),
                  busy || !canEdit || !selected.length,
                )}
              </View>
            )}
            {(items.length > 0 || query) && mode !== "search" && (
              <TextInput
                accessibilityLabel="Filter this page"
                style={input}
                value={query}
                onChangeText={setQuery}
                placeholder="Filter this page"
                placeholderTextColor={colors.onSurfaceVariant}
              />
            )}
          </View>
        }
        renderItem={({ item }) => (
          <FeatureRecord
            state={state}
            item={item}
            ui={ui}
            selected={selected}
            setSelected={setSelected}
            navigation={navigation}
            setViewTasks={setViewTasks}
          />
        )}
        ListFooterComponent={
          <View style={{ gap: 18 }}>
            {data?.pagination && (
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
              >
                {button(
                  "Previous",
                  () => state.setPage(state.page - 1),
                  busy || loading || state.page === 1,
                )}
                <Text style={text}>Page {state.page}</Text>
                {button(
                  "Next",
                  () => state.setPage(state.page + 1),
                  busy || loading || !data.pagination.hasNext,
                )}
              </View>
            )}
            {!loading &&
              !error &&
              data &&
              items.length === 0 &&
              ![
                "profile",
                "preferences",
                "security",
                "billing",
                "integrations",
                "health",
                "export",
                "search",
              ].includes(mode) && (
                <Text style={text}>
                  No records yet.
                  {editable ? " Create your first record to get started." : ""}
                </Text>
              )}
            {viewTasks && (
              <View style={card}>
                <Text style={text}>
                  Saved view results: {viewTasks.length} tasks
                </Text>
                {viewTasks.map((task) => (
                  <TouchableOpacity
                    key={task._id}
                    onPress={() =>
                      navigation.navigate("TaskDetail", { taskId: task._id })
                    }
                  >
                    <Text style={text}>
                      {task.title} / {task.status}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            {mode === "shortcuts" && (
              <Text style={text}>
                Use the application navigation to open your tasks and projects.
                Keyboard shortcuts are provided by your operating system.
              </Text>
            )}
          </View>
        }
      />
    </SafeAreaView>
  );
}

export function FeatureIndexScreen({ navigation }) {
  const { colors } = useTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <AppHeader title="ALL FEATURES" showBack navigation={navigation} />
      <FlatList
        data={catalog}
        keyExtractor={(feature) => feature.key}
        initialNumToRender={10}
        maxToRenderPerBatch={8}
        windowSize={5}
        contentContainerStyle={{ padding: 20, gap: 12 }}
        renderItem={({ item: feature }) => (
          <TouchableOpacity
            key={feature.key}
            accessibilityRole="button"
            onPress={() =>
              navigation.navigate("Feature", { featureKey: feature.key })
            }
            style={{
              borderWidth: 1,
              borderColor: colors.outlineVariant,
              borderRadius: 12,
              padding: 16,
            }}
          >
            <Text style={{ color: colors.onSurface, fontSize: 16 }}>
              {feature.title}
            </Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
