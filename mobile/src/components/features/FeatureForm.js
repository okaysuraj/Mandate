import { recordTitle } from "../../../../shared/featureData";
// Edit catalog fields with native inputs and related-record pickers.

import RecordPicker from "./RecordPicker";

import { View, Text, TextInput } from "react-native";

import {
  labelFor,
  enumFor,
  referenceFields,
  jsonFields,
} from "../../../../shared/featureData";

export default function FeatureForm({ state, ui }) {
  const { choices, input, text, card, colors, button } = ui;
  const { feature, busy } = state;
  const mode = feature.mode;
  const setField = (field, value) =>
    state.setForm((current) => ({ ...current, [field]: value }));
  const jsonControl = (field) => {
    let value;
    try {
      value = JSON.parse(state.form[field] || "{}");
    } catch {
      value = {};
    }
    if (field === "condition")
      return (
        <View style={{ gap: 10 }}>
          {choices(
            ["", "status", "priority", "title", "tags", "energyLevel"],
            value.field || "",
            (fieldValue) =>
              setField(field, JSON.stringify({ ...value, field: fieldValue })),
          )}
          {choices(
            ["equals", "not_equals", "contains"],
            value.operator || "equals",
            (operator) =>
              setField(field, JSON.stringify({ ...value, operator })),
          )}
          <TextInput
            accessibilityLabel="Condition value"
            style={input}
            value={value.value || ""}
            onChangeText={(conditionValue) =>
              setField(
                field,
                JSON.stringify({ ...value, value: conditionValue }),
              )
            }
          />
        </View>
      );
    if (field === "filters")
      return (
        <View style={{ gap: 10 }}>
          {["status", "priority"].map((key) => (
            <View key={key}>
              <Text style={text}>{labelFor(key)}</Text>
              {choices(
                ["", ...enumFor(key, "tasks")],
                value[key] || "",
                (nextValue) => {
                  const next = { ...value };
                  if (nextValue) next[key] = nextValue;
                  else delete next[key];
                  setField(field, JSON.stringify(next));
                },
              )}
            </View>
          ))}
        </View>
      );
    if (field === "sort")
      return choices(
        ["", "dueDate", "createdAt", "orderIndex", "priority"],
        Object.keys(value)[0] || "",
        (next) => setField(field, JSON.stringify(next ? { [next]: 1 } : {})),
      );
    return null;
  };
  return (
    <>
      {state.editing && (
        <View style={card}>
          <Text style={{ ...text, fontWeight: "700" }}>
            {state.editing._id ? "Edit" : "Create"} {feature.title}
          </Text>
          {feature.fields.map((field) => {
            const values = enumFor(field, mode),
              related = referenceFields[field];
            return (
              <View key={field} style={{ gap: 8 }}>
                <Text style={text}>{labelFor(field)}</Text>
                {jsonFields.has(field) ? (
                  jsonControl(field)
                ) : related ? (
                  <RecordPicker
                    label={labelFor(field)}
                    options={(state.references[related] || [])
                      .filter((item) => item._id !== state.editing?._id)
                      .map((item) => ({
                        label: recordTitle(item),
                        value: item._id,
                      }))}
                    value={state.form[field]}
                    onChange={(value) => setField(field, value)}
                  />
                ) : ["linkedTasks", "attendees"].includes(field) ? (
                  <RecordPicker
                    multiple
                    label={labelFor(field)}
                    options={(
                      state.references[
                        field === "linkedTasks" ? "tasks" : "members"
                      ] || []
                    ).map((item) => ({
                      label: recordTitle(item),
                      value: item._id,
                    }))}
                    value={state.form[field]
                      .split(",")
                      .map((v) => v.trim())
                      .filter(Boolean)}
                    onChange={(values) => setField(field, values.join(", "))}
                  />
                ) : values ? (
                  choices(values, state.form[field], (value) =>
                    setField(field, value),
                  )
                ) : (
                  <TextInput
                    accessibilityLabel={labelFor(field)}
                    style={input}
                    multiline={["description", "content", "notes"].includes(
                      field,
                    )}
                    keyboardType={
                      ["amount", "rating", "timeEstimate"].includes(field)
                        ? "decimal-pad"
                        : "default"
                    }
                    maxLength={["title", "name"].includes(field) ? 200 : 20000}
                    value={state.form[field]}
                    onChangeText={(value) => setField(field, value)}
                    placeholder={
                      /Date|Time|^date$/.test(field)
                        ? "YYYY-MM-DD or ISO date and time"
                        : ""
                    }
                    placeholderTextColor={colors.onSurfaceVariant}
                  />
                )}
              </View>
            );
          })}
          <View style={{ flexDirection: "row", gap: 10 }}>
            {button("Save", state.save, busy)}
            {button("Cancel", () => state.setEditing(null), busy)}
          </View>
        </View>
      )}
    </>
  );
}
