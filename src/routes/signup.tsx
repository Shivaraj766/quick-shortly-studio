import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { toast } from "sonner";
import { Sparkles, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Sign Up — Quick Shotly" },
      { name: "description", content: "Create your Quick Shotly account." },
    ],
  }),
  component: Signup,
});

function Signup() {
  const navigate = useNavigate();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const pw = (form.elements.namedItem("password") as HTMLInputElement).value;
    const cpw = (form.elements.namedItem("confirm") as HTMLInputElement).value;
    if (pw !== cpw) {
      toast.error("Passwords do not match.");
      return;
    }
    toast.success("Account created! Verify OTP & email to continue.");
    navigate({ to: "/dashboard" });
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
        <Link to="/" className="mb-6 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
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

        <form onSubmit={submit} className="mt-6 grid gap-3">
          <Input name="name" placeholder="Full name" required />
          <Input name="mobile" type="tel" placeholder="Mobile number" required />
          <Input name="email" type="email" placeholder="Email" required />
          <Input name="password" type="password" placeholder="Password" required />
          <Input name="confirm" type="password" placeholder="Confirm password" required />
          <p className="text-xs text-muted-foreground">
            We'll send an OTP to your mobile and a verification link to your email.
          </p>
          <button type="submit" className="rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-glow-sm transition-all hover:shadow-glow">
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-primary">Log in</Link>
        </p>
      </motion.div>
    </div>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full rounded-2xl border border-input bg-input px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/40"
    />
  );
}
