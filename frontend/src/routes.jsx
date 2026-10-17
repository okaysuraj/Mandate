// Custom pages stay lazy; the shared catalog supplies every standard feature route.
import { lazy } from "react";
import { catalog } from "../../shared/featureData";
const PublicContentPage = lazy(
  () => import("./components/features/PublicContentPage"),
);

export const publicRoutes = [
  { path: "/login", Page: lazy(() => import("./pages/auth/LoginPage")) },
  { path: "/register", Page: lazy(() => import("./pages/auth/RegisterPage")) },
  { path: "/pricing", Page: lazy(() => import("./pages/core/PricingPage")) },
  {
    path: "/forgot-password",
    Page: lazy(() => import("./pages/auth/ForgotPasswordPage")),
  },
  { path: "/", Page: lazy(() => import("./pages/core/LandingPage")) },
  {
    path: "/privacy",
    Page: PublicContentPage,
    props: { slug: "privacy", title: "Privacy policy" },
  },
  {
    path: "/terms",
    Page: PublicContentPage,
    props: { slug: "terms", title: "Terms of service" },
  },
  {
    path: "/legal",
    Page: PublicContentPage,
    props: { slug: "legal", title: "Legal notice" },
  },
  {
    path: "/security",
    Page: PublicContentPage,
    props: { slug: "security", title: "Security information" },
  },
];

export const protectedRoutes = [
  {
    path: "/dashboard",
    Page: lazy(() => import("./pages/dashboard/HomePage")),
  },
  { path: "/today", Page: lazy(() => import("./pages/tasks/TodayPage")) },
  { path: "/kanban", Page: lazy(() => import("./pages/tasks/KanbanPage")) },
  {
    path: "/calendar",
    Page: lazy(() => import("./pages/planning/CalendarPage")),
  },
  { path: "/splash", Page: lazy(() => import("./pages/auth/SplashPage")) },
];

const customPaths = new Set(
  [...publicRoutes, ...protectedRoutes].map((route) => route.path),
);
export const featureRoutes = catalog.filter(
  (feature) => !customPaths.has(feature.webPath),
);
