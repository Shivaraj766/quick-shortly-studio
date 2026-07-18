"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { toast } from "sonner";
import { Sparkles, Mail, ArrowLeft, Loader2, User, KeyRound } from "lucide-react";
import { sendSignupOtp, verifyEmailOtp, updateUserPassword } from "@/app/actions/auth";

export default function Signup() {
  const router = useRouter();
  const [tab, setTab] = useState<"otp" | "password">("otp");
  const [otpSent, setOtpSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSendOtp() {
    const form = formRef.current;
    if (!form) return;
    
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData(form);

    const res = await sendSignupOtp(formData);
    
    if (res.error) {
      toast.error(res.error);
      setIsSubmitting(false);
      return;
    }

    setOtpSent(true);
    setIsSubmitting(false);
    toast.success("OTP sent to your email.");
  }

  async function handleVerifyOtp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    
    // Step 1: Verify OTP to authenticate the user
    const res = await verifyEmailOtp(formData);
    
    if (res.error) {
      toast.error(res.error);
      setIsSubmitting(false);
      return;
    }

    // Step 2: If we are on the password tab, set the password!
    if (tab === "password") {
      const pw = formData.get("password") as string;
      const cpw = formData.get("confirm") as string;
      
      if (pw !== cpw) {
        toast.error("Passwords do not match.");
        setIsSubmitting(false);
        return;
      }

      const pwRes = await updateUserPassword(formData);
      if (pwRes.error) {
        toast.error(pwRes.error);
        setIsSubmitting(false);
        return;
      }
    }

    toast.success("Account created successfully!");
    const email = formData.get("email") as string;
    if (["shivarajsing13@gmail.com", "pudarilokesh37072@gmail.com"].includes(email)) {
      router.push("/admin/projects");
    } else {
      router.push("/");
    }
  }

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden px-4 py-10">
      <div className="absolute inset-0 -z-10 bg-grid" />
      <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-[2rem] glass p-8 shadow-card"
      >
        <Link href="/" className="mb-6 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to site
        </Link>
        <div className="flex items-center gap-2">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground">
            <Sparkles className="h-5 w-5" />
          </span>
          <span className="text-lg font-bold">Quick Shotly</span>
        </div>
        <h1 className="mt-6 text-2xl font-bold">Create your account</h1>
        <p className="mt-1 text-sm text-muted-foreground">Join 1,200+ brands and creators.</p>

        <div className="mt-6 grid grid-cols-2 gap-1 rounded-full border border-border p-1">
          {(["otp", "password"] as const).map((t) => (
            <button
              key={t}
              onClick={() => {
                setTab(t);
                setOtpSent(false); // Reset flow when switching tabs
              }}
              className={`rounded-full py-2 text-sm font-medium transition-all ${
                tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              {t === "otp" ? "Email OTP" : "Password"}
            </button>
          ))}
        </div>

        <form ref={formRef} onSubmit={handleVerifyOtp} className="mt-6 grid gap-3">
          <InputIcon icon={User} name="name" placeholder="Full name" required readOnly={otpSent} />
          <InputIcon icon={Mail} name="email" type="email" placeholder="Email" required readOnly={otpSent} />
          
          {tab === "password" && (
            <>
              <InputIcon icon={KeyRound} name="password" type="password" placeholder="Create password" required minLength={6} readOnly={otpSent} />
              <InputIcon icon={KeyRound} name="confirm" type="password" placeholder="Confirm password" required minLength={6} readOnly={otpSent} />
            </>
          )}
          
          {/* OTP Field (Only show after OTP is sent) */}
          {otpSent && <InputIcon icon={Sparkles} name="token" placeholder="Enter 6-digit OTP" required autoFocus />}

          {!otpSent ? (
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleSendOtp}
              className="flex justify-center items-center mt-2 rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-glow-sm transition-all hover:shadow-glow disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send OTP to Email"}
            </button>
          ) : (
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="flex justify-center items-center mt-2 rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-glow-sm transition-all hover:shadow-glow disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify & Create Account"}
            </button>
          )}
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-primary">Log in</Link>
        </p>
      </motion.div>
    </div>
  );
}

function InputIcon({
  icon: Icon,
  ...props
}: { icon: React.ComponentType<{ className?: string }> } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative">
      <Icon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        {...props}
        className="w-full rounded-2xl border border-input bg-input py-3 pl-11 pr-4 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/40 read-only:opacity-50"
      />
    </div>
  );
}
