import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import Footer from "../../components/layout/Footer";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await resetPassword(email);
      setIsSent(true);
      toast.success("Recovery instructions dispatched.");
    } catch (err) {
      console.error(err.name);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface antialiased">
      <main className="flex-grow flex items-center justify-center px-4 md:px-6 py-10 md:py-16">
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Brand Visual Anchor */}
          <div className="hidden md:flex md:col-span-5 bg-surface-container-lowest border border-outline-variant p-8 rounded-3xl flex-col justify-between shadow-sm relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center font-black text-sm">
                  M
                </div>
                <span className="font-mono text-xs font-bold text-on-surface-variant tracking-widest uppercase">MANDATE_OS</span>
              </div>
              <h1 className="font-display-lg text-2xl font-black text-on-surface tracking-tight">
                Credential Recovery
              </h1>
              <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                Zero-knowledge credential reset sequence. All reset requests generate an audited single-use cryptographic token.
              </p>
            </div>

            <div className="my-6 p-6 rounded-2xl bg-surface-container border border-outline-variant/60 flex flex-col items-center text-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-sm">
                <span className="material-symbols-outlined text-3xl">lock_reset</span>
              </div>
              <span className="font-mono text-xs font-bold text-on-surface uppercase">SECURITY LAYER 04</span>
              <span className="text-[11px] font-mono text-on-surface-variant">MULTI-FACTOR HANDSHAKE REQUIRED</span>
            </div>

            <div className="text-xs font-mono text-on-surface-variant pt-2 border-t border-outline-variant/50 flex justify-between">
              <span>REGION: GLOBAL-PRIMARY</span>
              <span className="text-tertiary">PASSWORD RECOVERY</span>
            </div>
          </div>

          {/* Recovery Form Module */}
          <div className="col-span-12 md:col-span-7 bg-surface-container-lowest border border-outline-variant p-6 md:p-8 rounded-3xl flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-primary text-xl">terminal</span>
                <span className="font-mono text-xs font-bold text-on-surface-variant tracking-wider uppercase">RESET DISPATCH</span>
              </div>
              <h2 className="font-headline-lg text-2xl font-bold text-on-surface tracking-tight mb-2">Reset Password</h2>
              <p className="text-xs md:text-sm text-on-surface-variant mb-6 leading-relaxed">
                Enter the primary work email associated with your Mandate workspace node to receive reset instructions.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="email" className="font-label-caps text-xs text-on-surface-variant font-medium block">
                    Work Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@mandate-industrial.com"
                    className="w-full bg-surface-container border border-outline-variant px-3.5 py-2.5 rounded-xl font-mono text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    required
                    disabled={isSent || loading}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || isSent}
                  className={`w-full min-h-[44px] text-on-primary font-label-caps text-xs font-bold py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer ${
                    isSent || loading
                      ? 'bg-surface-container-high text-on-surface-variant cursor-not-allowed border border-outline-variant'
                      : 'bg-primary hover:opacity-90 active:scale-[0.98]'
                  }`}
                >
                  {loading ? (
                    <>
                      <span className="material-symbols-outlined text-base animate-spin">sync</span>
                      DISPATCHING TOKEN...
                    </>
                  ) : (
                    <>
                      Send Reset Instructions
                      <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </>
                  )}
                </button>
              </form>

              {isSent && (
                <div className="mt-5 p-4 border border-outline-variant bg-tertiary-container text-on-tertiary-container rounded-2xl animate-in fade-in duration-300 flex items-start gap-3">
                  <span className="material-symbols-outlined text-xl mt-0.5">check_circle</span>
                  <div className="text-xs">
                    <h3 className="font-mono font-bold tracking-wide uppercase">RECOVERY PROTOCOL DISPATCHED</h3>
                    <p className="mt-1 leading-relaxed opacity-90">If an account exists for <span className="font-mono font-bold">{email}</span>, you will receive reset instructions. Check your inbox and spam filters.</p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 pt-5 border-t border-outline-variant/60">
              <Link to="/login" className="text-xs font-mono text-primary hover:underline flex items-center gap-1.5 transition-colors">
                <span className="material-symbols-outlined text-base">arrow_back</span>
                Return to Sign In
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ForgotPasswordPage;
