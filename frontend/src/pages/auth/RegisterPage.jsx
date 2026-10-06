import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../../context/AuthContext";
import Footer from "../../components/layout/Footer";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { register } = useAuth();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(name, email, password);
      setSubmitted(true);
    } catch (err) {
      if (err.message === "VERIFICATION_EMAIL_SENT") {
        setSubmitted(true);
      } else {
        toast.error(err.message || "Registration failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface min-h-screen flex flex-col antialiased">
      <main className="flex-grow flex items-center justify-center px-4 md:px-6 py-10 md:py-16">
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Branding & Visual Anchor */}
          <div className="hidden md:flex md:col-span-6 bg-surface-container-lowest rounded-3xl border border-outline-variant p-8 flex-col justify-between shadow-sm relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center font-black text-sm">
                  M
                </div>
                <span className="font-mono text-xs font-bold text-on-surface-variant tracking-widest uppercase">MANDATE_OS</span>
              </div>
              <h1 className="font-display-lg text-3xl font-black text-on-surface tracking-tight">
                Initialize Your Node
              </h1>
              <p className="font-body-md text-xs md:text-sm text-on-surface-variant mt-2 leading-relaxed">
                Join thousands of high-output engineering teams orchestrating projects and goals in Mandate.
              </p>
            </div>

            {/* Industrial Vector Visual */}
            <div className="relative w-full h-56 my-6 rounded-2xl bg-surface-container border border-outline-variant/60 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(var(--primary)_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="relative z-10 flex flex-col items-center gap-3 p-6 text-center">
                <div className="w-14 h-14 rounded-2xl bg-tertiary-container border border-outline-variant flex items-center justify-center text-on-tertiary-container shadow-sm">
                  <span className="material-symbols-outlined text-3xl">verified_user</span>
                </div>
                <span className="font-mono text-xs font-bold text-on-surface uppercase tracking-wider">SECURE ACCOUNT CREATION</span>
                <span className="text-[11px] font-mono text-on-surface-variant">MULTI-TENANT ISOLATION ACTIVATED</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-on-surface-variant pt-2 border-t border-outline-variant/50">
              <span>ZERO CONFIG DEPLOYMENT</span>
              <span className="flex items-center gap-1.5 text-primary font-bold">
                <span className="material-symbols-outlined text-sm">bolt</span>
                INSTANT PROVISIONING
              </span>
            </div>
          </div>

          {/* Register Form Section */}
          <div className="col-span-12 md:col-span-6 bg-surface-container-lowest border border-outline-variant rounded-3xl p-6 md:p-8 flex flex-col justify-center shadow-sm relative">
            {submitted ? (
              <div className="py-6 text-center flex flex-col items-center animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-2xl bg-tertiary-container border border-outline-variant text-on-tertiary-container flex items-center justify-center mb-4 shadow-sm">
                  <span className="material-symbols-outlined text-3xl">mark_email_read</span>
                </div>
                <h2 className="font-headline-lg text-2xl font-bold text-on-surface mb-2">Verify Your Email</h2>
                <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed mb-6 max-w-sm">
                  We have dispatched a verification link to <span className="font-mono font-bold text-on-surface">{email}</span>. Click the link to activate your workspace node, then proceed to sign in.
                </p>
                <Link
                  to="/login"
                  className="w-full min-h-[44px] text-on-primary bg-primary hover:opacity-90 font-label-caps text-xs font-bold py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  Proceed to Sign In
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Link>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <div className="md:hidden flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-lg bg-primary text-on-primary flex items-center justify-center font-black text-xs">
                      M
                    </div>
                    <span className="font-mono text-xs font-bold text-on-surface-variant tracking-wider">MANDATE</span>
                  </div>
                  <h2 className="font-headline-lg text-2xl font-bold text-on-surface tracking-tight">Create Account</h2>
                  <p className="font-body-md text-xs md:text-sm text-on-surface-variant mt-1">Fill in your information to join your workspace</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="name"
                      className="font-label-caps text-xs text-on-surface-variant font-medium block"
                    >
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full bg-surface-container border border-outline-variant px-3.5 py-2.5 rounded-xl font-body-md text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="email"
                      className="font-label-caps text-xs text-on-surface-variant font-medium block"
                    >
                      Work Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full bg-surface-container border border-outline-variant px-3.5 py-2.5 rounded-xl font-mono text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="password"
                      className="font-label-caps text-xs text-on-surface-variant font-medium block"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-surface-container border border-outline-variant px-3.5 py-2.5 rounded-xl text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      required
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full min-h-[44px] bg-primary text-on-primary font-label-caps text-xs font-bold py-2.5 px-4 rounded-xl transition-all duration-200 active:scale-[0.98] hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <span className="material-symbols-outlined text-base animate-spin">sync</span>
                          PROVISIONING ACCOUNT...
                        </>
                      ) : (
                        <>
                          Create Account
                          <span className="material-symbols-outlined text-base">arrow_forward</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>

                <div className="mt-6 pt-5 border-t border-outline-variant/60 flex flex-col gap-3">
                  <div className="flex items-center gap-2.5 p-3 bg-surface-container/60 rounded-xl border border-outline-variant/60 text-xs font-mono text-on-surface-variant">
                    <span className="material-symbols-outlined text-primary text-base">verified_user</span>
                    <span>Authentication provided by Firebase</span>
                  </div>
                  <div className="text-center text-xs text-on-surface-variant">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary font-bold hover:underline">Sign In</Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RegisterPage;
