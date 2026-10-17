// Both apps use the same token and URL rules; each supplies its own Axios and Firebase.
export const apiOrigin = (url) =>
  url.replace(/\/api\/?$/, "").replace(/\/$/, "");

export function createApiClient(axios, auth, origin) {
  const api = axios.create({ baseURL: origin + "/api", timeout: 20000 });
  api.interceptors.request.use(async (config) => {
    const url = config.url;
    // Reject external URLs before attaching a private Firebase token.
    if (
      typeof url !== "string" ||
      !url.startsWith("/") ||
      url.startsWith("//") ||
      url.includes("://")
    ) {
      throw new Error("API requests must use a relative path");
    }
    if (auth.currentUser) {
      config.headers.Authorization =
        "Bearer " + (await auth.currentUser.getIdToken());
    }
    return config;
  });
  return api;
}
