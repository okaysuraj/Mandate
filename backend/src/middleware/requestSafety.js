import { HttpError } from '../utils/http.js';
const checkObject = (value, depth = 0) => {
  if (depth > 12) throw new HttpError(400, 'Request nesting exceeds limit');
  if (Array.isArray(value)) {
    if (value.length > 500) throw new HttpError(400, 'Request array exceeds limit');
    value.forEach(item => checkObject(item, depth + 1));
  } else if (value && typeof value === 'object') {
    for (const [key, item] of Object.entries(value)) {
      if (key.startsWith('$') || key.includes('.') || ['__proto__', 'prototype', 'constructor'].includes(key)) throw new HttpError(400, 'Invalid request field');
      checkObject(item, depth + 1);
    }
  }
};
export const requestSafety = (req, res, next) => {
  try {
    if (!Buffer.isBuffer(req.body)) {
      if (req.body !== undefined && (req.body === null || Array.isArray(req.body) || typeof req.body !== 'object')) throw new HttpError(400, 'JSON body must be an object');
      checkObject(req.body);
    }
    for (const value of Object.values(req.query)) if (typeof value !== 'string') throw new HttpError(400, 'Query parameters must be strings');
    next();
  } catch (error) { next(error); }
};
export const errorHandler = (err, req, res, next) => {
  if (res.headersSent) return next(err);
  if (err.name === 'VersionError') return res.status(409).json({message:'This record changed. Refresh and try again.'});
  if (err.code === 121) return res.status(400).json({message:'Database validation rejected this record'});
  if (err.code === 11000) return res.status(409).json({ message: 'This record already exists' });
  if (['ValidationError', 'CastError', 'StrictModeError'].includes(err.name)) return res.status(400).json({ message: 'Invalid record', errors: err.errors ? Object.values(err.errors).map(e => e.message) : [err.message] });
  if (err.type === 'entity.too.large' || err.code === 'LIMIT_FILE_SIZE') return res.status(413).json({ message: 'Request exceeds size limit' });
  if (err.type === 'entity.parse.failed') return res.status(400).json({ message: 'Invalid JSON body' });
  const status = err.status || 500;
  if (status >= 500) console.error('API request failed:', err.name, err.code || '', req.method, req.path);
  res.status(status).json({ message: status === 503 && err instanceof HttpError ? err.message : status >= 500 ? 'Service temporarily unavailable' : err.message });
};
