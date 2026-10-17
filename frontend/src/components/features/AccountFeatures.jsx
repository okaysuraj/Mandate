// Account preferences, membership, billing, and export controls.

import { useEffect, useState } from "react";
import { Link } from "react-router";

import api from "../../lib/axios";

import { labelFor } from "../../../../shared/featureData";
import { control, button } from "./styles";
const Preferences = ({ state }) => {
  const [form, setForm] = useState(null);
  useEffect(() => setForm(state.data?.profile || null), [state.data?.profile]);
  if (!form) return null;
  const profile = state.feature.mode === "profile";
  const save = () =>
    state.act(async () => {
      const payload = profile
        ? { name: form.name, avatar: form.avatar, timezone: form.timezone }
        : { preferences: form.preferences };
      const { data } = await api.put("/users/profile", payload);
      state.updateUser(data);
      const theme = data.preferences?.theme || "system";
      localStorage.setItem("theme", theme);
      document.documentElement.classList.toggle(
        "dark",
        theme === "dark" ||
          (theme === "system" &&
            window.matchMedia("(prefers-color-scheme: dark)").matches),
      );
      window.dispatchEvent(new Event("theme-change"));
    });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        save();
      }}
      className="space-y-4 max-w-lg"
    >
      {profile ? (
        ["name", "avatar", "timezone"].map((field) => (
          <label key={field} className="block">
            {labelFor(field)}
            <input
              className={control}
              value={form[field] || ""}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            />
          </label>
        ))
      ) : (
        <>
          {Object.entries({
            theme: ["system", "light", "dark"],
            notifications: ["light", "normal", "strict"],
          }).map(([field, options]) => (
            <label key={field} className="block">
              {labelFor(field)}
              <select
                className={control}
                value={form.preferences?.[field] || options[0]}
                onChange={(e) =>
                  setForm({
                    ...form,
                    preferences: {
                      ...form.preferences,
                      [field]: e.target.value,
                    },
                  })
                }
              >
                {options.map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </label>
          ))}
          {["start", "end"].map((field) => (
            <label className="block" key={field}>
              Work hours {field}
              <input
                type="time"
                className={control}
                value={form.preferences?.workHours?.[field] || ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    preferences: {
                      ...form.preferences,
                      workHours: {
                        ...form.preferences.workHours,
                        [field]: e.target.value,
                      },
                    },
                  })
                }
              />
            </label>
          ))}
        </>
      )}
      <button className={button} disabled={state.busy}>
        Save preferences
      </button>
    </form>
  );
};
export default function AccountFeatures({ state }) {
  const [email, setEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Viewer");
  const download = () =>
    act(async () => {
      const { data: archive } = await api.get("/account/export", {
        params: { workspaceId: state.workspaceId },
      });
      const url = URL.createObjectURL(
        new Blob([JSON.stringify(archive, null, 2)], {
          type: "application/json",
        }),
      );
      try {
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = "mandate-workspace.json";
        anchor.click();
      } finally {
        URL.revokeObjectURL(url);
      }
    });

  const { feature, data, busy, act, canAdmin } = state;
  const mode = feature.mode;
  return (
    <>
      {["profile", "preferences"].includes(mode) && (
        <Preferences state={state} />
      )}
      {mode === "security" && data && (
        <div className="space-y-4">
          <p>Email verified: {state.user.email}</p>
          <button
            className={button}
            disabled={busy}
            onClick={() => act(() => state.resetPassword(state.user.email))}
          >
            Send password reset email
          </button>
          <Link className={button} to="/device-management">
            Manage sessions
          </Link>
          <button
            className={button}
            disabled={busy}
            onClick={() =>
              act(async () => {
                await api.post("/account/revoke-sessions");
                await state.logout();
              })
            }
          >
            Revoke all sessions
          </button>
          <p className="text-sm text-on-surface-variant">
            Sign in within the last five minutes to revoke all sessions.
            Multi-factor settings are managed by your authentication provider.
          </p>
        </div>
      )}
      {mode === "members" && data && canAdmin && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            act(async () => {
              await api.post("/workspaces/" + state.workspaceId + "/members", {
                email,
                role: inviteRole,
              });
              setEmail("");
            });
          }}
          className="flex gap-3 flex-wrap"
        >
          <input
            aria-label="Registered member email"
            type="email"
            required
            className={control + " max-w-xs"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <select
            className={control + " max-w-32"}
            aria-label="Member role"
            value={inviteRole}
            onChange={(e) => setInviteRole(e.target.value)}
          >
            {["Viewer", "Editor", "Admin"].map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
          <button className={button} disabled={busy}>
            Add member
          </button>
        </form>
      )}
      {mode === "billing" && data && (
        <div className="space-y-4">
          <p>
            Current plan: {data.profile?.subscriptionPlan || "free"} ·{" "}
            {data.profile?.subscriptionStatus || "none"}
          </p>
          {data.billing.plans.map((plan) => (
            <div
              key={plan.plan}
              className="border border-outline-variant p-4 rounded-xl flex justify-between"
            >
              <div>
                {labelFor(plan.plan)} ·{" "}
                {plan.available
                  ? new Intl.NumberFormat(undefined, {
                      style: "currency",
                      currency: plan.currency,
                    }).format(plan.amount / 100) +
                    " / " +
                    plan.interval
                  : "Unavailable until billing is configured"}
              </div>
              <button
                className={button}
                disabled={!plan.available || busy}
                onClick={() =>
                  act(async () => {
                    const { data } = await api.post(
                      "/stripe/create-checkout-session",
                      { plan: plan.plan },
                    );
                    window.location.assign(data.url);
                  })
                }
              >
                Subscribe
              </button>
            </div>
          ))}
        </div>
      )}
      {mode === "integrations" && data && (
        <div className="space-y-3">
          {Object.entries(data.workspace.integrations || {}).map(
            ([name, connected]) => (
              <p key={name}>
                {labelFor(name)}:{" "}
                {connected
                  ? "Connection preference stored; provider verification required"
                  : "No provider connection configured"}
              </p>
            ),
          )}
        </div>
      )}
      {mode === "health" && data && (
        <dl>
          {Object.entries(data.health).map(([key, value]) => (
            <div
              key={key}
              className="flex gap-4 py-3 border-b border-outline-variant"
            >
              <dt>{labelFor(key)}</dt>
              <dd>
                {typeof value === "boolean"
                  ? value
                    ? "Configured"
                    : "Not configured"
                  : value}
              </dd>
            </div>
          ))}
        </dl>
      )}
      {mode === "export" && data && (
        <div className="space-y-3">
          <p>Download your workspace records as a JSON archive.</p>
          <button className={button} disabled={busy} onClick={download}>
            {busy ? "Preparing archive…" : "Download JSON"}
          </button>
        </div>
      )}
    </>
  );
}
