import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

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
          <p className="font-label-caps text-label-caps text-on-surface-variant tracking-widest">CREDENTIAL RECOVERY</p>
        </div>

        {isSent ? (
          <div className="bg-surface-container-low border border-outline-variant p-lg text-center rounded-md">
            <span className="material-symbols-outlined text-[48px] text-primary mb-md">mark_email_read</span>
            <h3 className="font-headline-lg text-[20px] text-primary mb-sm">TRANSMISSION COMPLETE</h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-lg">
              Instructions for resetting your access key have been transmitted to <span className="font-bold text-primary">{email}</span>.
            </p>
            <Link to="/login" className="mandate-btn-primary w-full inline-block">
              RETURN TO AUTHENTICATION
            </Link>
          </div>
        ) : (
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
            
            <button
              type="submit"
              disabled={loading}
              className="mandate-btn-primary w-full disabled:opacity-50 mt-lg"
            >
              {loading ? "INITIALIZING..." : "INITIATE RECOVERY"}
            </button>
          </form>
        )}

        {!isSent && (
          <div className="mt-lg text-center">
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              Remember your access key?{" "}
              <Link to="/login" className="text-primary font-bold hover:underline">AUTHENTICATE</Link>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
