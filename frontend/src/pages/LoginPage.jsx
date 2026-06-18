import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success("Successfully logged in!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#F9F9FB] relative">
      <Link to="/" className="absolute top-8 left-8 sm:top-10 sm:left-10 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-[#1A1A1A] transition-colors font-['Space_Grotesk']">
        ← Back to Home
      </Link>
      <div className="w-full max-w-md p-10 mandate-card shadow-lg shadow-black/5">
        <div className="text-center mb-10">
          <h2 className="small-caps mb-3 text-gray-500 tracking-widest">Mandate</h2>
          <h1 className="text-4xl font-bold text-[#1A1A1A] uppercase tracking-tighter">
            Welcome Back.
          </h1>
          <p className="text-gray-500 mt-4 text-sm">Enter your credentials to access the industrial portal.</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="name@company.com"
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
          />
          <Button type="submit" className="mt-2 w-full">
            Log In
          </Button>
        </form>
        <div className="mt-8 text-center flex flex-col gap-3">
          <Link to="/forgot-password" className="text-xs font-semibold uppercase tracking-widest text-gray-500 hover:text-[#1A1A1A] transition-colors font-['Space_Grotesk']">
            Forgot password?
          </Link>
          <p className="text-sm text-gray-500 font-['Space_Grotesk'] mt-2">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#1A1A1A] font-bold hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
