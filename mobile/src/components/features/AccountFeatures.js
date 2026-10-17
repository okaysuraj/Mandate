// Account settings, workspace membership, billing, and data export controls.

import { useEffect, useState } from "react";
import { View, Text, TextInput, Linking, Share } from "react-native";

import { useTheme } from "../../context/ThemeContext";

import api from "../../services/api";
import { labelFor } from "../../../../shared/featureData";

export default function AccountFeatures({ state, ui }) {
  const { feature, data, busy, act, canAdmin } = state;
  const mode = feature.mode;
  const { colors, text, card, input, button, choices } = ui;
  const { changeTheme } = useTheme();
  const [email, setEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Viewer");
  const [profile, setProfile] = useState(null);
  useEffect(() => setProfile(data?.profile || null), [data?.profile]);
  const saveProfile = () =>
    act(async () => {
      const payload =
        mode === "profile"
          ? {
              name: profile.name,
              avatar: profile.avatar,
              timezone: profile.timezone,
            }
          : { preferences: profile.preferences };
      const { data } = await api.put("/users/profile", payload);
      state.updateUser(data);
      await changeTheme(data.preferences?.theme || "system");
    });
  return (
    <>
      {["profile", "preferences"].includes(mode) && profile && (
        <View style={card}>
          {mode === "profile" ? (
            ["name", "avatar", "timezone"].map((field) => (
              <View key={field}>
                <Text style={text}>{labelFor(field)}</Text>
                <TextInput
                  accessibilityLabel={labelFor(field)}
                  style={input}
                  value={profile[field] || ""}
                  onChangeText={(value) =>
                    setProfile({ ...profile, [field]: value })
                  }
                />
              </View>
            ))
          ) : (
            <>
              {Object.entries({
                theme: ["system", "light", "dark"],
                notifications: ["light", "normal", "strict"],
              }).map(([field, values]) => (
                <View key={field}>
                  <Text style={text}>{labelFor(field)}</Text>
                  {choices(
                    values,
                    profile.preferences?.[field] || values[0],
                    (value) =>
                      setProfile({
                        ...profile,
                        preferences: {
                          ...profile.preferences,
                          [field]: value,
                        },
                      }),
                  )}
                </View>
              ))}
              {["start", "end"].map((field) => (
                <View key={field}>
                  <Text style={text}>Work hours {field}</Text>
                  <TextInput
                    accessibilityLabel={"Work hours " + field}
                    style={input}
                    value={profile.preferences?.workHours?.[field] || ""}
                    placeholder="HH:mm"
                    placeholderTextColor={colors.onSurfaceVariant}
                    onChangeText={(value) =>
                      setProfile({
                        ...profile,
                        preferences: {
                          ...profile.preferences,
                          workHours: {
                            ...profile.preferences.workHours,
                            [field]: value,
                          },
                        },
                      })
                    }
                  />
                </View>
              ))}
            </>
          )}
          {button("Save preferences", saveProfile, busy)}
        </View>
      )}
      {mode === "security" && data && (
        <View style={card}>
          <Text style={text}>Email verified: {state.user.email}</Text>
          {button(
            "Send password reset email",
            () => act(() => state.resetPassword(state.user.email)),
            busy,
          )}
          {button("Manage sessions", () =>
            navigation.navigate("DeviceManagement"),
          )}
          {button(
            "Revoke all sessions",
            () =>
              act(async () => {
                await api.post("/account/revoke-sessions");
                await state.logout();
              }),
            busy,
          )}
          <Text style={text}>
            Sign in within the last five minutes before revoking all sessions.
            Multi-factor settings are managed by your authentication provider.
          </Text>
        </View>
      )}
      {mode === "members" && data && canAdmin && (
        <View style={card}>
          <Text style={text}>Add a registered member</Text>
          <TextInput
            accessibilityLabel="Member email"
            style={input}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          {choices(["Viewer", "Editor", "Admin"], inviteRole, setInviteRole)}
          {button(
            "Add member",
            () =>
              act(async () => {
                await api.post(
                  "/workspaces/" + state.workspaceId + "/members",
                  { email, role: inviteRole },
                );
                setEmail("");
              }),
            busy || !email,
          )}
        </View>
      )}
      {mode === "billing" && data && (
        <View style={card}>
          <Text style={text}>
            Current plan: {data.profile?.subscriptionPlan || "free"} ·{" "}
            {data.profile?.subscriptionStatus || "none"}
          </Text>
          {data.billing.plans.map((plan) => (
            <View key={plan.plan} style={{ gap: 8 }}>
              <Text style={text}>
                {labelFor(plan.plan)} ·{" "}
                {plan.available
                  ? new Intl.NumberFormat(undefined, {
                      style: "currency",
                      currency: plan.currency,
                    }).format(plan.amount / 100) +
                    " / " +
                    plan.interval
                  : "Unavailable until billing is configured"}
              </Text>
              {button(
                "Subscribe",
                () =>
                  act(async () => {
                    const { data } = await api.post(
                      "/stripe/create-checkout-session",
                      { plan: plan.plan },
                    );
                    await Linking.openURL(data.url);
                  }),
                busy || !plan.available,
              )}
            </View>
          ))}
        </View>
      )}
      {mode === "integrations" && data && (
        <View style={card}>
          {Object.entries(data.workspace.integrations || {}).map(
            ([name, connected]) => (
              <Text style={text} key={name}>
                {labelFor(name)}:{" "}
                {connected
                  ? "Connection preference stored; provider verification required"
                  : "No provider connection configured"}
              </Text>
            ),
          )}
        </View>
      )}
      {mode === "health" && data && (
        <View style={card}>
          {Object.entries(data.health).map(([key, value]) => (
            <Text style={text} key={key}>
              {labelFor(key)}:{" "}
              {typeof value === "boolean"
                ? value
                  ? "Configured"
                  : "Not configured"
                : value}
            </Text>
          ))}
        </View>
      )}
      {mode === "export" && data && (
        <View style={card}>
          <Text style={text}>
            Share your workspace records as a JSON archive.
          </Text>
          {button(
            busy ? "Preparing archive…" : "Share JSON archive",
            () =>
              act(async () => {
                const { data: archive } = await api.get("/account/export", {
                  params: { workspaceId: state.workspaceId },
                });
                await Share.share({
                  message: JSON.stringify(archive, null, 2),
                  title: "Mandate workspace export",
                });
              }),
            busy,
          )}
        </View>
      )}
    </>
  );
}
