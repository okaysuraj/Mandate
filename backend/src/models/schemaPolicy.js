// Apply to every persisted model; nested paths receive the same bounds.
export const schemaPolicy = schema => {
  schema.eachPath((name, path) => {
    if (path.instance === 'String') {
      if (!path.options.maxlength) path.validate(value => value == null || value.length <= 10000, 'String exceeds 10000 characters');
      if (path.isRequired) path.validate(value => typeof value === 'string' && !!value.trim(), 'A non-empty string is required');
    }
    if (path.instance === 'Number') path.validate(value => value == null || Number.isFinite(value), 'Number must be finite');
    if (path.instance === 'Array') path.validate(value => value.length <= 200, 'Array exceeds 200 entries');
    if (path.schema) schemaPolicy(path.schema);
  });
};
export const safeUrl = value => {
  if (!value) return true;
  try { const url = new URL(value); return url.protocol === 'https:' && !url.username && !url.password; } catch { return false; }
};
