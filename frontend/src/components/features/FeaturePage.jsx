import { recordTitle } from "../../../../shared/featureData";
import FeatureForm from "./FeatureForm";
import AccountFeatures from "./AccountFeatures";
import FeatureRecord from "./FeatureRecord";
import { control, button } from "./styles";

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import AppLayout from "../layout/AppLayout";
import api from "../../lib/axios";
import { useFeature, featureClient } from "../../hooks/useFeature";
import { catalog, labelFor } from "../../../../shared/featureData";

const recordId = (item) => item._id || item.user?._id;

export default function FeaturePage({ featureKey }) {
  const params = useParams();
  const state = useFeature(featureKey || params.featureKey, params.id);
  const { feature, data, error, loading, busy, act, reload, canEdit } = state;
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
  }, [feature?.key, state.workspaceId]);
  useEffect(() => {
    if (feature?.mode !== "search") return;
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
  }, [feature?.mode, query]);
  if (!feature)
    return (
      <AppLayout>
        <p>Feature not found.</p>
      </AppLayout>
    );
  const mode = feature.mode;
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

  const pathFor = (item) =>
    item.type === "tasks"
      ? "/tasks/" + item._id
      : item.type === "projects"
        ? "/projects/" + item._id
        : item.type === "goals"
          ? "/goals/" + item._id
          : "/docs";
  const editable = !!feature.fields.length && canEdit;
  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto space-y-6 pb-16">
        <header className="border-b border-outline-variant pb-5 flex justify-between items-start gap-4">
          <div>
            <p className="text-xs font-mono text-on-surface-variant mb-2">
              {state.workspaceId ? "WORKSPACE" : "ACCOUNT"}
            </p>
            <h1 className="text-3xl font-bold">{feature.title}</h1>
          </div>
          <div className="flex gap-2">
            <Link className={button} to="/features">
              All features
            </Link>
            <button
              className={button}
              onClick={reload}
              disabled={busy || loading}
            >
              Refresh
            </button>
            {editable && (
              <button
                className={button + " bg-primary text-on-primary"}
                onClick={() => state.openForm()}
              >
                Create
              </button>
            )}
          </div>
        </header>
        {(error || searchError) && (
          <div
            role="alert"
            className="border border-error rounded-xl p-4 text-error"
          >
            {error || searchError}
            <button onClick={reload} className="ml-4 underline">
              Retry
            </button>
          </div>
        )}
        {loading && <p role="status">Loading {feature.title.toLowerCase()}…</p>}
        {state.editing && <FeatureForm state={state} />}
        {data?.metrics && (
          <dl className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {Object.entries(data.metrics).map(([key, value]) => (
              <div
                className="border border-outline-variant rounded-xl p-4"
                key={key}
              >
                <dt className="text-sm text-on-surface-variant">
                  {labelFor(key)}
                </dt>
                <dd className="text-xl font-semibold mt-2">{String(value)}</dd>
              </div>
            ))}
          </dl>
        )}
        <AccountFeatures state={state} />

        {mode === "search" && (
          <input
            className={control}
            aria-label="Search workspace data"
            placeholder="Search tasks, projects, goals, documents"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            maxLength={100}
          />
        )}
        {mode === "search" &&
          results.map((item) => (
            <Link
              className="block rounded-xl border border-outline-variant p-4"
              key={item.type + item._id}
              to={pathFor(item)}
            >
              {recordTitle(item)}{" "}
              <span className="text-xs text-on-surface-variant">
                {item.type}
              </span>
            </Link>
          ))}
        {mode === "parse-task" && data && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              act(async () => {
                const parsed = await api.post("/ai/parse-task", {
                  input: query,
                });
                await api.post("/tasks", {
                  ...parsed.data,
                  source: undefined,
                  workspaceId: state.workspaceId,
                });
                setQuery("");
              });
            }}
            className="flex gap-3"
          >
            <input
              className={control}
              aria-label="Task description"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              required
            />
            <button disabled={busy || !canEdit} className={button}>
              Parse and create task
            </button>
          </form>
        )}
        {mode === "focus" && data && (
          <div className="space-y-3">
            <select
              className={control}
              aria-label="Focus task"
              value={taskId}
              onChange={(e) => setTaskId(e.target.value)}
            >
              <option value="">Select a task</option>
              {items.map((t) => (
                <option key={t._id} value={t._id}>
                  {t.title}
                </option>
              ))}
            </select>
            <textarea
              aria-label="Focus notes"
              className={control}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Session notes"
            />
            <button
              className={button}
              disabled={busy || !canEdit || !taskId}
              onClick={() =>
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
                })
              }
            >
              {session ? "Finish and save session" : "Start focus session"}
            </button>
            {session && (
              <p>
                Started {new Date(session.startedAt).toLocaleString()}. Elapsed
                time is recorded when you finish.
              </p>
            )}
          </div>
        )}
        {mode === "planning" && data && (
          <div className="space-y-3">
            <p>
              {data.plan.locked
                ? "Today’s plan is saved with " +
                  data.plan.tasks.length +
                  " tasks."
                : "No plan saved for today."}
            </p>
            <button
              disabled={busy || !canEdit || !selected.length}
              className={button}
              onClick={() =>
                act(() =>
                  api.post("/planning/lock", {
                    taskIds: selected,
                    date: data.plan.date,
                    workspaceId: state.workspaceId,
                  }),
                )
              }
            >
              Save selected tasks as today’s plan
            </button>
          </div>
        )}
        {(items.length > 0 || query) && mode !== "search" && (
          <input
            className={control}
            aria-label="Filter this page"
            placeholder="Filter this page"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        )}
        <div className="space-y-3">
          {mode !== "search" &&
            items.map((item) => (
              <FeatureRecord
                key={recordId(item)}
                state={state}
                item={item}
                selected={selected}
                setSelected={setSelected}
                setViewTasks={setViewTasks}
              />
            ))}
        </div>
        {data?.pagination && (
          <nav aria-label="Record pages" className="flex items-center gap-4">
            <button
              className={button}
              disabled={loading || busy || state.page === 1}
              onClick={() => state.setPage(state.page - 1)}
            >
              Previous
            </button>
            <span className="text-sm">
              Page {state.page}
              {data.pagination.total !== null
                ? " · " + data.pagination.total + " records"
                : ""}
            </span>
            <button
              className={button}
              disabled={loading || busy || !data.pagination.hasNext}
              onClick={() => state.setPage(state.page + 1)}
            >
              Next
            </button>
          </nav>
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
            <p className="rounded-xl border border-dashed border-outline-variant p-8 text-center text-on-surface-variant">
              {query
                ? "No matches on this page."
                : state.page > 1
                  ? "No records on this page."
                  : "No records yet."}
              {editable && state.page === 1 && !query
                ? " Create your first record to get started."
                : ""}
            </p>
          )}
        {viewTasks && (
          <div className="border border-outline-variant p-4 rounded-xl">
            <h2>Saved view results: {viewTasks.length} tasks</h2>
            {viewTasks.map((task) => (
              <p key={task._id}>
                <Link to={"/tasks/" + task._id}>{task.title}</Link> /{" "}
                {task.status}
              </p>
            ))}
          </div>
        )}
        {mode === "shortcuts" && (
          <p>
            Use the application navigation to open your tasks and projects.
            Browser shortcuts are provided by your operating system.
          </p>
        )}
      </div>
    </AppLayout>
  );
}

export function FeatureIndexPage() {
  return (
    <AppLayout>
      <h1 className="text-3xl font-bold mb-6">All features</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {catalog.map((feature) => (
          <Link
            className="border border-outline-variant rounded-xl p-4"
            key={feature.key}
            to={
              feature.webPath.includes(":id")
                ? "/features/" + feature.key
                : feature.webPath
            }
          >
            {feature.title}
          </Link>
        ))}
      </div>
    </AppLayout>
  );
}
