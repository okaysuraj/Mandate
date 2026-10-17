// Translate catalog modes into API requests; UI and authentication stay in the clients.
import { payloadFor } from "./featureData.js";

const endpoints = {
  tasks: "/tasks",
  projects: "/projects",
  goals: "/goals",
  documents: "/documents",
  automations: "/automations",
  events: "/events",
  "saved-views": "/productivity/saved-views",
  reviews: "/productivity/reviews",
};
const detailEndpoints = {
  "task-detail": "/tasks",
  "project-detail": "/projects",
  "goal-detail": "/goals",
};

export const endpointFor = (feature) =>
  feature.mode === "records"
    ? "/features/" + feature.key
    : endpoints[feature.mode];
export const listFrom = (data) =>
  Array.isArray(data) ? data : data?.data || [];
const writableEndpoint = (feature) =>
  endpointFor(feature) || detailEndpoints[feature.mode] || "/goals";

export const makeFeatureClient = (api) => {
  const page = async (endpoint, params = {}, signal) => {
    const current = params.page || 1,
      limit = params.limit || 50;
    const { data } = await api.get(endpoint, {
      params: { ...params, page: current, limit, paginate: "true" },
      signal,
    });
    const items = listFrom(data);
    return {
      items,
      pagination: {
        page: current,
        limit,
        total: data.pagination?.total ?? null,
        hasNext: data.pagination
          ? current < data.pagination.pages
          : items.length === limit,
      },
    };
  };
  const all = async (endpoint, params = {}, signal) => {
    let page = 1,
      output = [];
    while (true) {
      const { data } = await api.get(endpoint, {
        params: { ...params, page, limit: 200 },
        signal,
      });
      const records = listFrom(data);
      output.push(...records);
      if (
        data.pagination ? page >= data.pagination.pages : records.length < 200
      )
        break;
      page++;
    }
    return output;
  };
  const load = async (
    feature,
    workspaceId,
    user,
    signal,
    selectedId,
    options = {},
  ) => {
    const params = { workspaceId, page: options.page || 1, limit: 50 };
    const mode = feature.mode;
    const get = (path) =>
      api.get(path, { params, signal }).then((res) => res.data);
    if (endpointFor(feature)) {
      return page(
        endpointFor(feature),
        mode === "reviews"
          ? {
              ...params,
              ...(/monthly/.test(feature.key)
                ? { period: "monthly" }
                : /weekly/.test(feature.key)
                  ? { period: "weekly" }
                  : /daily|end-of-day/.test(feature.key)
                    ? { period: "daily" }
                    : {}),
            }
          : params,
        signal,
      );
    }
    if (mode === "focus") {
      const [tasks, sessions] = await Promise.all([
        page("/tasks", params, signal),
        page(
          "/productivity/focus",
          { workspaceId, active: "true", limit: 1 },
          signal,
        ),
      ]);
      return { ...tasks, active: sessions.items[0] || null };
    }
    if (mode === "mandates") return page("/planning/history", params, signal);
    if (["task-detail", "project-detail", "goal-detail"].includes(mode)) {
      const endpoint = detailEndpoints[mode];
      if (!selectedId) return page(endpoint, params, signal);
      const item = await get(endpoint + "/" + selectedId);
      if (item?.workspaceId !== workspaceId)
        throw new Error("Switch to the record workspace before opening it.");
      return { items: [item] };
    }
    if (["analytics", "workload"].includes(mode)) {
      const [metrics, tasks] = await Promise.all([
        get(mode === "workload" ? "/ai/burnout" : "/tasks/analytics"),
        page("/tasks", params, signal),
      ]);
      return { ...tasks, metrics };
    }
    if (
      [
        "priorities",
        "reschedule",
        "breakdown",
        "task-templates",
        "workspace-templates",
      ].includes(mode)
    )
      return page("/tasks", params, signal);
    if (["parse-task", "shortcuts"].includes(mode)) return { items: [] };
    if (["activity", "automation-log", "task-activity"].includes(mode)) {
      return page(
        "/activities",
        {
          ...params,
          ...(mode === "automation-log" ? { entityType: "automation" } : {}),
          ...(mode === "task-activity" && selectedId
            ? { entityId: selectedId }
            : {}),
        },
        signal,
      );
    }
    if (mode === "members")
      return { items: await get("/workspaces/" + workspaceId + "/members") };
    if (mode === "notifications")
      return page(
        "/notifications",
        { page: params.page, limit: params.limit },
        signal,
      );
    if (mode === "sessions") return { items: await get("/account/sessions") };
    if (mode === "security" || mode === "profile" || mode === "preferences")
      return { profile: await get("/auth/me"), items: [] };
    if (mode === "planning") {
      const [plan, tasks] = await Promise.all([
        get("/planning/daily"),
        page("/tasks", params, signal),
      ]);
      return { ...tasks, plan };
    }
    if (mode === "focus-log")
      return page("/productivity/focus", params, signal);
    if (mode === "integrations")
      return { workspace: await get("/workspaces/" + workspaceId), items: [] };
    if (mode === "billing")
      return { billing: await get("/stripe/plans"), profile: user, items: [] };
    if (mode === "export") return { items: [] };
    if (mode === "health") return { health: await get("/status"), items: [] };
    if (mode === "search") return { items: [] };
    throw new Error("Unsupported feature: " + mode);
  };
  return {
    load,
    all,
    page,
    save: async (feature, form, workspaceId, id) => {
      const endpoint = writableEndpoint(feature);
      const payload = { ...payloadFor(feature, form), workspaceId };
      const { data } = id
        ? await api.put(endpoint + "/" + id, payload)
        : await api.post(endpoint, payload);
      return data;
    },
    remove: (feature, id) => api.delete(writableEndpoint(feature) + "/" + id),
    search: (q, signal) =>
      api.get("/search", { params: { q }, signal }).then((res) => res.data),
  };
};
