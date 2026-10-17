import { Navigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import BrandSplash from "./BrandSplash";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading && !user) {
    return <BrandSplash message="Loading your account…" />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
