import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

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
    <div className="bg-surface min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center px-md py-xl">
        <div className="max-w-[1200px] w-full bento-grid items-stretch">
          {/* Branding & Visual Anchor */}
          <div className="hidden md:flex col-span-7 bg-surface-container-lowest rounded-lg border border-outline-variant p-xl flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <h1 className="font-display-lg text-display-lg text-primary mb-md tracking-tighter">MANDATE</h1>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
                Create your account to start organizing tasks and collaborating seamlessly.
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
            </div>
          </div>

          {/* Register Form Section */}
          <div className="col-span-12 md:col-span-5 bg-surface-container-lowest border border-outline-variant rounded-lg p-lg md:p-xl flex flex-col justify-center relative">
            {submitted ? (
              <div className="py-md text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-md">
                  <span className="material-symbols-outlined text-4xl">mark_email_read</span>
                </div>
                <h2 className="font-headline-lg text-2xl font-bold text-primary mb-sm">Verify Your Email</h2>
                <p className="font-body-md text-on-surface-variant leading-relaxed mb-lg max-w-sm">
                  Check your mail link and click on it to verify your email and then proceed to login page to continue your journey with us.
                </p>
                <Link
                  to="/login"
                  className="w-full text-on-primary bg-primary hover:bg-on-surface-variant font-label-caps text-label-caps py-md rounded-full transition-all duration-300 flex items-center justify-center gap-sm"
                >
                  Proceed to Login
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>
              </div>
            ) : (
              <>
                <div className="mb-xl">
                  <h2 className="font-headline-lg text-headline-lg text-primary mb-xs font-bold tracking-tight">Create Account</h2>
                  <p className="font-body-md text-body-md text-on-surface-variant">Fill in your details to sign up</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-lg">
                  <div className="space-y-xs group">
                    <label
                      htmlFor="name"
                      className="font-label-caps text-label-caps text-secondary transition-colors group-focus-within:text-primary"
                    >
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full bg-transparent border-b border-surface-dim py-[12px] font-label-sm text-label-sm text-primary placeholder:text-outline-variant focus:outline-none focus:border-primary focus:border-b-2 transition-all rounded-none"
                      required
                    />
                  </div>

                  <div className="space-y-xs group">
                    <label
                      htmlFor="email"
                      className="font-label-caps text-label-caps text-secondary transition-colors group-focus-within:text-primary"
                    >
                      User Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="username@email.com"
                      className="w-full bg-transparent border-b border-surface-dim py-[12px] font-label-sm text-label-sm text-primary placeholder:text-outline-variant focus:outline-none focus:border-primary focus:border-b-2 transition-all rounded-none"
                      required
                    />
                  </div>

                  <div className="space-y-xs group">
                    <label
                      htmlFor="password"
                      className="font-label-caps text-label-caps text-secondary transition-colors group-focus-within:text-primary"
                    >
                      Password
                    </label>
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
                          CREATING ACCOUNT...
                        </>
                      ) : (
                        <>
                          Sign Up
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
                      <p className="font-label-caps text-label-caps text-primary leading-none">Secured | AES-256 Encryption</p>
                    </div>
                  </div>
                </div>

                <div className="mt-lg text-center">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary font-bold hover:underline">Login Here</Link>
                  </span>
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
