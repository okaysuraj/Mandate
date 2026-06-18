import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import toast from "react-hot-toast";
import axios from "axios";

const ForgotPasswordPage = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/forgot-password", { email });
      toast.success("OTP sent! (Check backend console in dev)");
      setStep(2);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/reset-password", { email, otp, newPassword });
      toast.success("Password reset successful!");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#F9F9FB] relative">
      <Link to="/login" className="absolute top-8 left-8 sm:top-10 sm:left-10 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-[#1A1A1A] transition-colors font-['Space_Grotesk']">
        ← Back to Login
      </Link>
      <div className="w-full max-w-md p-10 mandate-card shadow-lg shadow-black/5">
        <div className="text-center mb-10">
          <h2 className="small-caps mb-3 text-gray-500 tracking-widest">Mandate</h2>
          <h1 className="text-4xl font-bold text-[#1A1A1A] uppercase tracking-tighter">
            {step === 1 ? "Reset Password." : "Verify OTP."}
          </h1>
          <p className="text-gray-500 mt-4 text-sm">
            {step === 1 
              ? "Enter your email to receive a verification code." 
              : "Enter the code sent to your email and your new password."}
          </p>
        </div>

        {step === 1 ? (
          <form onSubmit={handleRequestOtp} className="flex flex-col gap-6">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="name@company.com"
            />
            <Button type="submit" className="mt-2 w-full">
              Send OTP
            </Button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="flex flex-col gap-6">
            <Input
              label="OTP"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              placeholder="123456"
            />
            <Input
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
            <Button type="submit" className="mt-2 w-full">
              Reset Password
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
