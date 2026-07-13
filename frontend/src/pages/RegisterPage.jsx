import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const RegisterPage = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // NOTE: employeeId might need to be passed to backend if required
      await register(name, email, password);
      navigate("/dashboard");
    } catch (err) {
      // error handled in auth context
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface relative overflow-hidden z-0">
      {/* TopNavBar */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-lg py-md bg-surface border-b border-outline-variant">
        <Link to="/">
          <div className="text-headline-lg font-headline-lg font-black tracking-tighter text-primary">MANDATE</div>
        </Link>
        <div className="hidden md:flex gap-lg items-center">
          <span className="font-label-caps text-label-caps text-on-surface-variant">SECURE ACCESS GATEWAY</span>
          <div className="h-4 w-px bg-outline-variant"></div>
          <Link to="/login" className="font-label-caps text-label-caps text-primary hover:opacity-70 transition-opacity">LOGIN</Link>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center pt-xl pb-xl px-md mt-xl">
        {/* Main Form Container */}
        <div className="w-full max-w-lg bg-surface-container-lowest border border-outline-variant p-lg md:p-xl flex flex-col gap-lg z-10 shadow-sm rounded-lg">
          <section className="flex flex-col gap-sm">
            <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight font-bold">Register Asset</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">Initialize personnel credentials for the Mandate Industrial Ecosystem.</p>
          </section>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-lg">
            {/* Employee ID */}
            <div className="flex flex-col gap-xs pb-xs group border-b border-surface-dim focus-within:border-primary transition-all duration-200">
              <label className="font-label-caps text-label-caps text-on-surface-variant group-focus-within:text-primary transition-colors">EMPLOYEE ID</label>
              <div className="flex items-center gap-sm">
                <span className="material-symbols-outlined text-on-surface-variant group-focus-within:text-primary transition-colors">badge</span>
                <input
                  className="w-full bg-transparent border-none focus:ring-0 p-0 font-label-sm text-label-sm text-on-surface placeholder:text-outline-variant outline-none"
                  placeholder="ID-000-000"
                  type="text"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Full Name */}
            <div className="flex flex-col gap-xs pb-xs group border-b border-surface-dim focus-within:border-primary transition-all duration-200">
              <label className="font-label-caps text-label-caps text-on-surface-variant group-focus-within:text-primary transition-colors">FULL NAME</label>
              <div className="flex items-center gap-sm">
                <span className="material-symbols-outlined text-on-surface-variant group-focus-within:text-primary transition-colors">person</span>
                <input
                  className="w-full bg-transparent border-none focus:ring-0 p-0 font-label-sm text-label-sm text-on-surface placeholder:text-outline-variant outline-none"
                  placeholder="OPERATOR NAME"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Work Email */}
            <div className="flex flex-col gap-xs pb-xs group border-b border-surface-dim focus-within:border-primary transition-all duration-200">
              <label className="font-label-caps text-label-caps text-on-surface-variant group-focus-within:text-primary transition-colors">WORK EMAIL</label>
              <div className="flex items-center gap-sm">
                <span className="material-symbols-outlined text-on-surface-variant group-focus-within:text-primary transition-colors">alternate_email</span>
                <input
                  className="w-full bg-transparent border-none focus:ring-0 p-0 font-label-sm text-label-sm text-on-surface placeholder:text-outline-variant outline-none"
                  placeholder="OPERATOR@MANDATE.SYS"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Secure Password */}
            <div className="flex flex-col gap-xs pb-xs group border-b border-surface-dim focus-within:border-primary transition-all duration-200">
              <label className="font-label-caps text-label-caps text-on-surface-variant group-focus-within:text-primary transition-colors">SECURE PASSWORD</label>
              <div className="flex items-center gap-sm">
                <span className="material-symbols-outlined text-on-surface-variant group-focus-within:text-primary transition-colors">lock</span>
                <input
                  className="w-full bg-transparent border-none focus:ring-0 p-0 font-label-sm text-label-sm text-on-surface placeholder:text-outline-variant outline-none"
                  placeholder="••••••••••••"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Action Button */}
            <button
              type="submit"
              disabled={loading}
              className={`mt-md text-on-primary py-md px-lg rounded-full font-label-caps text-label-caps font-bold tracking-widest transition-all duration-300 flex justify-center items-center gap-sm group ${loading ? 'bg-on-tertiary-container cursor-not-allowed' : 'bg-primary hover:bg-on-surface-variant active:scale-95'}`}
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined animate-spin-slow">progress_activity</span>
                  <span>PROVISIONING...</span>
                </>
              ) : (
                <>
                  <span>REGISTER ASSET</span>
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </>
              )}
            </button>

            <div className="flex justify-center mt-sm">
              <p className="font-label-sm text-label-sm text-on-surface-variant">
                Already provisioned? <Link to="/login" className="text-primary font-bold hover:underline decoration-2 underline-offset-2">Login here.</Link>
              </p>
            </div>
          </form>
        </div>

        {/* Decorative Tech Element */}
        <div className="fixed top-1/2 left-0 -translate-y-1/2 -z-10 opacity-[0.03] pointer-events-none hidden lg:block">
          <div className="font-label-caps text-[20rem] font-black leading-none select-none text-primary">SYSTEM</div>
        </div>
        <div className="fixed bottom-0 right-0 -z-10 opacity-[0.03] pointer-events-none hidden lg:block">
          <div className="font-label-caps text-[15rem] font-black leading-none select-none p-xl text-primary">0101</div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-xl px-lg mt-auto flex flex-col md:flex-row justify-between items-center gap-md border-t border-outline-variant bg-surface-container-low z-10">
        <div className="font-label-caps text-label-caps font-bold text-primary tracking-widest">MANDATE</div>
        <div className="flex flex-wrap justify-center gap-md">
          <Link to="#" className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary underline decoration-1 transition-all duration-300">Privacy Policy</Link>
          <Link to="#" className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary underline decoration-1 transition-all duration-300">Terms of Service</Link>
          <Link to="#" className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary underline decoration-1 transition-all duration-300">Legal</Link>
          <Link to="#" className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary underline decoration-1 transition-all duration-300">Security</Link>
        </div>
        <div className="font-label-caps text-label-caps text-on-surface-variant opacity-50">
          © 2024 MANDATE INDUSTRIAL SYSTEMS. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </div>
  );
};

export default RegisterPage;
