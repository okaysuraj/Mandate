import { useEffect, lazy, Suspense } from "react";
import { Outlet, Route, Routes } from "react-router";
import BrandSplash from "./components/common/BrandSplash";
import ProtectedRoute from "./components/common/ProtectedRoute";
import { publicRoutes, protectedRoutes, featureRoutes } from "./routes";

const FeaturePage = lazy(() => import("./components/features/FeaturePage"));
const FeatureIndexPage = lazy(() =>
  import("./components/features/FeaturePage").then((module) => ({
    default: module.FeatureIndexPage,
  })),
);

// App owns route boundaries; individual pages own their layout and data.
export default function App() {
  useEffect(() => {
    const dark =
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", dark);
  }, []);

  return (
    <div className="w-full min-h-screen bg-background text-on-surface transition-colors duration-300 antialiased font-body-md">
      <Suspense fallback={<BrandSplash message="Loading page..." />}>
        <Routes>
          {publicRoutes.map(({ path, Page, props }) => (
            <Route key={path} path={path} element={<Page {...props} />} />
          ))}
          <Route
            element={
              <ProtectedRoute>
                <Outlet />
              </ProtectedRoute>
            }
          >
            <Route path="/features" element={<FeatureIndexPage />} />
            <Route path="/features/:featureKey" element={<FeaturePage />} />
            {protectedRoutes.map(({ path, Page }) => (
              <Route key={path} path={path} element={<Page />} />
            ))}
            {featureRoutes.map((feature) => (
              <Route
                key={feature.key}
                path={feature.webPath}
                element={
                  <FeaturePage
                    featureKey={feature.webFeatureKey || feature.key}
                  />
                }
              />
            ))}
          </Route>
          <Route
            path="*"
            element={
              <div className="p-8">
                Page not found. <a href="/features">Open all features</a>
              </div>
            }
          />
        </Routes>
      </Suspense>
    </div>
  );
}
