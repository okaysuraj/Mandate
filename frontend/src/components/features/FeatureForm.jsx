import { recordTitle } from "../../../../shared/featureData";
// Render catalog fields and convert user input through the shared feature hook.

import ReferencePicker from "./ReferencePicker";

import {
  labelFor,
  enumFor,
  referenceFields,
  jsonFields,
} from "../../../../shared/featureData";
import { control, button } from "./styles";
const FeatureForm = ({ state }) => {
  const { feature, form, setForm, references, save, busy, setEditing } = state;
  const set = (field, value) =>
    setForm((current) => ({ ...current, [field]: value }));
  const jsonControl = (field) => {
    let value;
    try {
      value = JSON.parse(form[field] || "{}");
    } catch {
      value = {};
    }
    if (field === "condition")
      return (
        <div className="grid sm:grid-cols-3 gap-2">
          <select
            aria-label="Condition field"
            className={control}
            value={value.field || ""}
            onChange={(e) =>
              set(field, JSON.stringify({ ...value, field: e.target.value }))
            }
          >
            <option value="">Always</option>
            {["status", "priority", "title", "tags", "energyLevel"].map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
          <select
            aria-label="Condition operator"
            className={control}
            value={value.operator || "equals"}
            onChange={(e) =>
              set(field, JSON.stringify({ ...value, operator: e.target.value }))
            }
          >
            {["equals", "not_equals", "contains"].map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
          <input
            aria-label="Condition value"
            className={control}
            value={value.value || ""}
            onChange={(e) =>
              set(field, JSON.stringify({ ...value, value: e.target.value }))
            }
          />
        </div>
      );
    if (field === "filters")
      return (
        <div className="grid sm:grid-cols-2 gap-2">
          {["status", "priority"].map((key) => (
            <label key={key}>
              {labelFor(key)}
              <select
                className={control}
                value={value[key] || ""}
                onChange={(e) => {
                  const next = { ...value };
                  if (e.target.value) next[key] = e.target.value;
                  else delete next[key];
                  set(field, JSON.stringify(next));
                }}
              >
                <option value="">Any</option>
                {enumFor(key, "tasks").map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </label>
          ))}
        </div>
      );
    if (field === "sort")
      return (
        <select
          className={control}
          aria-label="Sort order"
          value={Object.keys(value)[0] || ""}
          onChange={(e) =>
            set(
              field,
              JSON.stringify(e.target.value ? { [e.target.value]: 1 } : {}),
            )
          }
        >
          <option value="">Default</option>
          {["dueDate", "createdAt", "orderIndex", "priority"].map((v) => (
            <option key={v}>{v}</option>
          ))}
        </select>
      );
    return null;
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        save();
      }}
      className="rounded-xl border border-outline-variant bg-surface-container-lowest p-5 space-y-4"
    >
      <h2 className="text-lg font-bold">
        {state.editing?._id ? "Edit" : "Create"} {feature.title}
      </h2>
      {feature.fields.map((field) => {
        const values = enumFor(field, feature.mode),
          related = referenceFields[field];
        const Group =
          related || ["linkedTasks", "attendees"].includes(field)
            ? "div"
            : "label";
        return (
          <Group key={field} className="block text-sm font-medium space-y-2">
            <span>{labelFor(field)}</span>
            {jsonFields.has(field) ? (
              jsonControl(field)
            ) : related ? (
              <ReferencePicker
                label={labelFor(field)}
                options={(references[related] || [])
                  .filter((item) => item._id !== state.editing?._id)
                  .map((item) => ({
                    label: recordTitle(item),
                    value: item._id,
                  }))}
                value={form[field]}
                onChange={(value) => set(field, value)}
              />
            ) : ["linkedTasks", "attendees"].includes(field) ? (
              <ReferencePicker
                multiple
                label={labelFor(field)}
                options={(
                  references[field === "linkedTasks" ? "tasks" : "members"] ||
                  []
                ).map((item) => ({
                  label: recordTitle(item),
                  value: item._id,
                }))}
                value={form[field]
                  .split(",")
                  .map((v) => v.trim())
                  .filter(Boolean)}
                onChange={(values) => set(field, values.join(", "))}
              />
            ) : values ? (
              <select
                className={control}
                value={form[field]}
                onChange={(e) => set(field, e.target.value)}
              >
                {values.map((v) => (
                  <option key={v} value={v}>
                    {v || "None"}
                  </option>
                ))}
              </select>
            ) : ["description", "content", "notes"].includes(field) ? (
              <textarea
                className={control}
                rows={5}
                maxLength={20000}
                value={form[field]}
                onChange={(e) => set(field, e.target.value)}
              />
            ) : (
              <input
                className={control}
                required={[
                  "title",
                  "name",
                  "startTime",
                  "endTime",
                  "date",
                ].includes(field)}
                maxLength={["title", "name"].includes(field) ? 200 : 10000}
                type={
                  ["amount", "rating", "timeEstimate"].includes(field)
                    ? "number"
                    : "text"
                }
                min="0"
                value={form[field]}
                onChange={(e) => set(field, e.target.value)}
                placeholder={
                  /Date|Time|^date$/.test(field)
                    ? "YYYY-MM-DD or ISO date and time"
                    : undefined
                }
              />
            )}
          </Group>
        );
      })}
      <div className="flex gap-3">
        <button
          className={button + " bg-primary text-on-primary"}
          disabled={busy}
        >
          Save
        </button>
        <button
          type="button"
          className={button}
          onClick={() => setEditing(null)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
export default FeatureForm;
