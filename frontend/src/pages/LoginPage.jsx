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
    <div className="bg-surface min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center px-md py-xl">
        <div className="max-w-[1200px] w-full bento-grid items-stretch">
          {/* Branding & Visual Anchor */}
          <div className="hidden md:flex col-span-7 bg-surface-container-lowest rounded-lg border border-outline-variant p-xl flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <h1 className="font-display-lg text-display-lg text-primary mb-md tracking-tighter">MANDATE</h1>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
                High-precision industrial infrastructure management. Secure access point for authorized personnel only. Ensure your credentials remain confidential.
              </p>
            </div>
            {/* Abstract Technical Visual */}
            <div className="relative w-full h-[300px] mt-xl rounded-lg overflow-hidden border border-outline-variant">
              <div
                className="w-full h-full bg-cover bg-center grayscale opacity-80"
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA-7q7ZA8OuC2ymkaxG1uP3c0OrzzeaNuNwAF1-yCS4fBiz8JLlVl_fYwKIYga-NAvO-IKTjf2OUZl2My0TuqNvHKefzFn-yfwG07mRx1SLIklrnpOHaJ9vOvJuqzW40GUU7WXzHPKnuWYQ6naahbpUSl1K08YpmyDtWh0vNrOOCibw-6SLG0e_zwzftl-9NKLvTGDmFY8NaQY0mgig1JurAWltMCdE6SLOkTx6AP9bB1mr3T40EvJRHw')" }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent"></div>
            </div>
            <div className="flex justify-between items-end relative z-10 mt-md">
              <div className="flex gap-sm">
                <span className="font-label-caps text-label-caps px-sm py-xs bg-primary text-on-primary rounded-sm">V.4.2.0</span>
                <span className="font-label-caps text-label-caps px-sm py-xs border border-outline text-on-surface-variant rounded-sm">SECURE_NODE</span>
              </div>
              <div className="font-label-caps text-label-caps text-on-surface-variant tracking-widest">
                INDUSTRIAL SYSTEMS
              </div>
            </div>
          </div>

          {/* Login Form Section */}
          <div className="col-span-12 md:col-span-5 bg-surface-container-lowest border border-outline-variant rounded-lg p-lg md:p-xl flex flex-col justify-center relative">
            <div className="mb-xl">
              <h2 className="font-headline-lg text-headline-lg text-primary mb-xs font-bold tracking-tight">Login</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">Enter your workstation details.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-lg">
              <div className="space-y-xs group">
                <label
                  htmlFor="email"
                  className="font-label-caps text-label-caps text-secondary transition-colors group-focus-within:text-primary"
                >
                  Employee Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="operator@mandate.systems"
                  className="w-full bg-transparent border-b border-surface-dim py-[12px] font-label-sm text-label-sm text-primary placeholder:text-outline-variant focus:outline-none focus:border-primary focus:border-b-2 transition-all rounded-none"
                  required
                />
              </div>
              <div className="space-y-xs group">
                <div className="flex justify-between items-end">
                  <label
                    htmlFor="password"
                    className="font-label-caps text-label-caps text-secondary transition-colors group-focus-within:text-primary"
                  >
                    Password
                  </label>
                  <Link to="/forgot-password" className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors">
                    Forgot credentials?
                  </Link>
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-transparent border-b border-surface-dim py-[12px] font-label-sm text-label-sm text-primary placeholder:text-outline-variant focus:outline-none focus:border-primary focus:border-b-2 transition-all rounded-none"
                  required
                />
              </div>
              <div className="pt-md">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full text-on-primary font-label-caps text-label-caps py-md rounded-full transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center gap-sm ${loading ? 'bg-on-tertiary-container' : 'bg-primary hover:bg-on-surface-variant'}`}
                >
                  {loading ? (
                    <>
                      <span className="material-symbols-outlined animate-spin-slow">progress_activity</span>
                      AUTHENTICATING...
                    </>
                  ) : (
                    <>
                      ACCESS SYSTEM
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </>
                  )}
                </button>
              </div>
            </form>
            <div className="mt-xl flex flex-col gap-sm">
              <div className="flex items-center gap-sm p-md bg-surface-container-low rounded-md border border-outline-variant/30">
                <span className="material-symbols-outlined text-on-tertiary-container" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                <div>
                  <p className="font-label-caps text-label-caps text-primary leading-none">Encrypted Session</p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">End-to-end TLS 1.3 protocol active.</p>
                </div>
              </div>
            </div>
            <div className="mt-lg text-center">
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                No credentials?{" "}
                <Link to="/register" className="text-primary font-bold hover:underline">REQUEST ACCESS</Link>
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Component Integration */}
      <footer className="w-full py-xl px-lg mt-auto flex flex-col md:flex-row justify-between items-center gap-md bg-surface-container-low border-t border-outline-variant">
        <div className="font-label-caps text-label-caps font-bold text-primary tracking-widest">MANDATE</div>
        <div className="flex gap-lg">
          <Link to="#" className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary underline decoration-1 transition-all duration-300">Privacy Policy</Link>
          <Link to="#" className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary underline decoration-1 transition-all duration-300">Terms of Service</Link>
          <Link to="#" className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary underline decoration-1 transition-all duration-300">Legal</Link>
          <Link to="#" className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary underline decoration-1 transition-all duration-300">Security</Link>
        </div>
        <div className="font-label-caps text-label-caps text-on-surface-variant">
          © 2024 MANDATE INDUSTRIAL SYSTEMS. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;
