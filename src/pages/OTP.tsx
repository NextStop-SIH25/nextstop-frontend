import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import bus from "../assets/Busdriver2.svg"

const OTP = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = () => {
    const otpValue = otp.join("");
    
    if (otpValue.length !== 4) {
      toast.error("Please enter complete OTP");
      return;
    }

    // Simulate OTP verification (any 4 digits succeed)
    if (otpValue.length === 4) {
      toast.success("OTP verified successfully!");
      console.log("OTP verified:", otpValue);
      navigate('/login');
    }
  };

  const handleResend = () => {
    toast.success("OTP resent to your mobile number!");
    setOtp(["", "", "", ""]);
    inputRefs.current[0]?.focus();
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-brand-header mb-6">OTP Verification</h1>
      </div>
      <div className="w-full max-w-sm space-y-8">
        {/* Bus Illustration */}
        <div className="flex justify-center mb-8">
          <img src={bus} alt="Bus" className="w-70 h-45" />
        </div>

        {/* Content */}
        <div className="text-center space-y-2">
          <p className="text-sm small-text">
            We sent you OTP on your
          </p>
          <p className="text-sm small-text">
            Your Are just one step away from logging in.
          </p>
          <p className="text-base font-medium text-brand-header">
            Enter Your 6-digit OTP
          </p>
        </div>

        {/* OTP Input */}
        <div className="flex justify-center space-x-3">
          {otp.map((digit, index) => (
            <Input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-lg font-semibold"
            />
          ))}
        </div>

        {/* Verify button */}
        <Button 
          onClick={handleVerifyOtp}
          className="w-full h-12 text-base font-medium"
        >
          Verify OTP
        </Button>

        {/* Resend link */}
        <div className="text-center">
          <button
            onClick={handleResend}
            className="text-sm text-brand-header hover:underline font-medium"
          >
            Should we resend OTP?
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTP;