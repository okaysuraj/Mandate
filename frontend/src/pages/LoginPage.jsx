import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      // error handled in auth context
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-lg">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="text-center mb-xl">
          <Link to="/">
            <h1 className="font-headline-lg text-headline-lg font-black tracking-tighter text-primary mb-sm">MANDATE</h1>
          </Link>
          <p className="font-label-caps text-label-caps text-on-surface-variant tracking-widest">SYSTEM ACCESS</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-md">
          <div className="space-y-xs">
            <label className="block font-label-caps text-label-caps text-on-surface-variant">EMAIL ADDRESS</label>
            <input
              className="mandate-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="operator@mandate.systems"
              required
            />
          </div>
          <div className="space-y-xs">
            <label className="block font-label-caps text-label-caps text-on-surface-variant">ACCESS KEY</label>
            <input
              className="mandate-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              required
            />
          </div>
          <div className="flex justify-end">
            <Link to="/forgot-password" className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors underline decoration-1">
              Forgot access key?
            </Link>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mandate-btn-primary w-full disabled:opacity-50"
          >
            {loading ? "AUTHENTICATING..." : "AUTHENTICATE"}
          </button>
        </form>

        <div className="mt-lg text-center">
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            No credentials?{" "}
            <Link to="/register" className="text-primary font-bold hover:underline">REQUEST ACCESS</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
