import "dotenv/config";

// Native clients have no Origin header; browsers must match an explicitly allowed origin.
const configuredOrigins = (
  process.env.CORS_ORIGINS ||
  process.env.FRONTEND_URL ||
  (process.env.NODE_ENV === "production"
    ? ""
    : "http://localhost:5173,http://localhost:3000")
)
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
export const allowedOrigins = [
  ...new Set([
    ...configuredOrigins,
    ...(process.env.NODE_ENV !== "production"
      ? ["http://localhost:5173", "http://localhost:3000"]
      : []),
  ]),
];
export const corsOptions = {
  origin: (origin, callback) =>
    callback(null, !origin || allowedOrigins.includes(origin)),
  credentials: false,
};
