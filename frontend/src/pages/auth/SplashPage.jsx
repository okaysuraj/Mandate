import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import BrandSplash from "../../components/common/BrandSplash";
export default function SplashPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading) navigate(user ? "/dashboard" : "/login", { replace: true });
  }, [user, loading, navigate]);
  return <BrandSplash />;
}
