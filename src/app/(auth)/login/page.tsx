"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { toast } from "sonner";
import { Sparkles, Mail, ArrowLeft, Loader2 } from "lucide-react";
import { signInWithPassword, sendLoginOtp, verifyEmailOtp } from "@/app/actions/auth";

export default function Login() {
  const router = useRouter();
  const [tab, setTab] = useState<"otp" | "password">("otp");
  const [otpSent, setOtpSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function googleLogin() {
    toast.info("Connect Lovable Cloud to enable Google login.");
  }

  async function handlePasswordSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    
    const res = await signInWithPassword(formData);
    
    if (res.error) {
      toast.error(res.error);
      setIsSubmitting(false);
      return;
    }

    toast.success("Welcome back!");
    const email = formData.get("email") as string;
    if (["shivarajsing13@gmail.com", "pudarilokesh37072@gmail.com"].includes(email)) {
      router.push("/admin/projects");
    } else {
      router.push("/");
    }
  }

  async function handleSendOtp(e: React.MouseEvent<HTMLButtonElement>) {
    const form = e.currentTarget.closest("form");
    if (!form) return;
    
    const emailInput = form.querySelector('input[name="email"]') as HTMLInputElement;
    if (!emailInput || !emailInput.value) {
      toast.error("Please enter your email.");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("email", emailInput.value);

    const res = await sendLoginOtp(formData);
    
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
    
    const res = await verifyEmailOtp(formData);
    
    if (res.error) {
      toast.error(res.error);
      setIsSubmitting(false);
      return;
    }

    toast.success("Verified successfully!");
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
        <h1 className="mt-6 text-2xl font-bold">Welcome back</h1>
        <p className="mt-1 text-sm text-muted-foreground">Log in to access your dashboard.</p>

        <div className="mt-6 grid grid-cols-2 gap-1 rounded-full border border-border p-1">
          {(["otp", "password"] as const).map((t) => (
            <button
              key={t}
              onClick={() => {
                setTab(t);
                setOtpSent(false); // Reset OTP state when switching tabs
              }}
              className={`rounded-full py-2 text-sm font-medium transition-all ${
                tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              {t === "otp" ? "Email OTP" : "Password"}
            </button>
          ))}
        </div>

        {tab === "otp" ? (
          <form onSubmit={handleVerifyOtp} className="mt-5 grid gap-3">
            <InputIcon icon={Mail} name="email" placeholder="Email address" type="email" required readOnly={otpSent} />
            {otpSent && <InputIcon icon={Sparkles} name="token" placeholder="Enter 6-digit OTP" required autoFocus />}
            {!otpSent ? (
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleSendOtp}
                className="flex justify-center items-center rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-glow-sm transition-all hover:shadow-glow disabled:opacity-50"
              >
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send OTP"}
              </button>
            ) : (
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="flex justify-center items-center rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-glow-sm transition-all hover:shadow-glow disabled:opacity-50"
              >
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify & Login"}
              </button>
            )}
          </form>
        ) : (
          <form onSubmit={handlePasswordSubmit} className="mt-5 grid gap-3">
            <InputIcon icon={Mail} name="email" placeholder="Email" type="email" required />
            <InputIcon icon={Sparkles} name="password" placeholder="Password" type="password" required />
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-muted-foreground">
                <input type="checkbox" className="accent-primary" /> Remember me
              </label>
              <button type="button" onClick={() => toast.info("Password reset link sent.")} className="text-primary">
                Forgot password?
              </button>
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="flex justify-center items-center rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-glow-sm transition-all hover:shadow-glow disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Login"}
            </button>
          </form>
        )}

        <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
          <div className="h-px flex-1 bg-border" /> or <div className="h-px flex-1 bg-border" />
        </div>

        <button
          onClick={googleLogin}
          className="flex w-full items-center justify-center gap-3 rounded-full border border-border py-3 text-sm font-medium transition-colors hover:bg-secondary"
        >
          <GoogleIcon /> Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          New here?{" "}
          <Link href="/signup" className="font-semibold text-primary">Create an account</Link>
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

function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6 8-11.3 8a12 12 0 1 1 0-24c3 0 5.8 1.1 7.9 3l5.7-5.7A20 20 0 1 0 24 44a20 20 0 0 0 19.6-23.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8A12 12 0 0 1 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7A20 20 0 0 0 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2A12 12 0 0 1 12.7 28l-6.5 5A20 20 0 0 0 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3a12 12 0 0 1-4.1 5.6l6.2 5.2C40.9 36 44 30.6 44 24c0-1.2-.1-2.4-.4-3.5z" />
    </svg>
  );
}
