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
      console.error(err);
      // error handled in auth context
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-body-md text-body-md min-h-screen flex flex-col bg-surface">
      <main className="flex-grow flex items-center justify-center px-md py-xl">
        <div className="max-w-4xl w-full">
          <div className="bento-grid">
            {/* Header Module */}
            <div className="col-span-12 bg-transparent mb-md">
              <h1 className="font-headline-lg text-headline-lg text-primary tracking-tighter uppercase mb-xs font-black">MANDATE</h1>
              <div className="h-1 w-12 bg-primary mb-lg"></div>
            </div>
            
            {/* Recovery Form Module */}
            <div className="col-span-12 md:col-span-7 bg-surface-container-lowest border border-surface-dim p-xl flex flex-col justify-between transition-all duration-300 hover:border-primary shadow-sm rounded-none">
              <div>
                <div className="flex items-center gap-sm mb-lg">
                  <span className="material-symbols-outlined text-primary">terminal</span>
                  <h2 className="font-label-caps text-label-caps text-on-surface-variant tracking-widest">CREDENTIAL RECOVERY</h2>
                </div>
                <p className="font-body-md text-on-surface-variant mb-xl max-w-md">
                  Initialize secure verification. Enter the primary work email associated with your MANDATE node to begin the reset sequence.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-lg">
                  <div className="relative group">
                    <label htmlFor="email" className="font-label-caps text-label-caps text-on-surface-variant block mb-sm group-focus-within:text-primary transition-colors">WORK EMAIL</label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="user@mandate-industrial.com"
                      className="w-full bg-surface-container-low border-b border-outline-variant py-md px-xs font-label-sm text-on-surface focus:outline-none focus:border-b-2 focus:border-primary transition-all placeholder:text-outline-variant rounded-none"
                      required
                      disabled={isSent || loading}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading || isSent}
                    className={`w-full text-on-primary font-label-caps text-label-caps py-md rounded-full transition-all flex items-center justify-center gap-md ${isSent || loading ? 'bg-on-tertiary-container opacity-70 cursor-not-allowed' : 'bg-primary hover:opacity-90 active:scale-[0.98]'}`}
                  >
                    {loading ? (
                      <>
                        <span className="material-symbols-outlined animate-spin-slow">autorenew</span>
                        PROCESSING...
                      </>
                    ) : (
                      <>
                        REQUEST RESET PROTOCOL
                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                      </>
                    )}
                  </button>
                </form>

                {isSent && (
                  <div className="mt-xl p-md border border-tertiary-fixed-dim bg-tertiary-container/5 rounded-lg animate-pulse flex items-start gap-md">
                    <span className="material-symbols-outlined text-on-tertiary-container" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    <div>
                      <h3 className="font-label-caps text-label-caps text-on-tertiary-container mb-xs">PROTOCOL INITIATED</h3>
                      <p className="font-label-sm text-on-surface-variant">Encryption keys and instructions will be dispatched to the verified address shortly.</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-xl pt-lg border-t border-surface-container-low">
                <Link to="/login" className="font-label-sm text-secondary hover:text-primary flex items-center gap-xs transition-colors">
                  <span className="material-symbols-outlined text-[16px]">keyboard_backspace</span>
                  RETURN TO TERMINAL LOGIN
                </Link>
              </div>
            </div>

            {/* Visual Brand Module */}
            <div className="hidden md:flex md:col-span-5 bg-primary-container border border-surface-dim items-center justify-center relative overflow-hidden transition-all duration-300 hover:border-primary shadow-sm rounded-none">
              <div className="absolute inset-0 opacity-20">
                {/* High-tech pattern simulation */}
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
              </div>
              <div className="relative z-10 text-center p-lg">
                <div className="mb-lg">
                  <span className="material-symbols-outlined text-[64px] text-primary-fixed-dim" style={{ fontVariationSettings: "'wght' 100" }}>shield_lock</span>
                </div>
                <h3 className="font-label-caps text-label-caps text-primary-fixed mb-md tracking-widest">SECURITY LAYER 04</h3>
                <p className="font-label-sm text-on-primary-container leading-relaxed">
                  All recovery attempts are logged and monitored. Multi-factor authentication will be required upon link activation.
                </p>
              </div>
              <div className="absolute bottom-md right-md opacity-30">
                <span className="font-label-caps text-[10px] text-primary-fixed">SYS_ID: 884-X9</span>
              </div>
            </div>

            {/* Status Bento (Technical Detail) */}
            <div className="col-span-12 md:col-span-4 bg-surface-container-lowest border border-surface-dim p-md flex items-center justify-between transition-all duration-300 hover:border-primary rounded-none shadow-sm">
              <div className="flex items-center gap-md">
                <div className="w-2 h-2 rounded-full bg-on-tertiary-container"></div>
                <span className="font-label-caps text-label-caps text-on-surface-variant">NETWORK STATUS: NOMINAL</span>
              </div>
            </div>
            
            <div className="col-span-12 md:col-span-4 bg-surface-container-lowest border border-surface-dim p-md flex items-center justify-between transition-all duration-300 hover:border-primary rounded-none shadow-sm">
              <div className="flex items-center gap-md">
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant">lock_reset</span>
                <span className="font-label-caps text-label-caps text-on-surface-variant">UPTIME: 99.98%</span>
              </div>
            </div>
            
            <div className="col-span-12 md:col-span-4 bg-surface-container-lowest border border-surface-dim p-md flex items-center justify-between transition-all duration-300 hover:border-primary rounded-none shadow-sm">
              <div className="flex items-center gap-md">
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant">public</span>
                <span className="font-label-caps text-label-caps text-on-surface-variant">REGION: GLOBAL-PRIMARY</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ForgotPasswordPage;
