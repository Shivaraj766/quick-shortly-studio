import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { MapPin, Upload, ArrowRight } from "lucide-react";
import { CAREERS } from "@/lib/site-data";
import { PageHero, Stagger, StaggerItem, Reveal } from "@/components/site/primitives";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — Quick Shotly" },
      {
        name: "description",
        content:
          "Join Quick Shotly. Open roles for video editors, motion graphics designers, AI video editors, camera operators and graphic designers.",
      },
      { property: "og:title", content: "Careers — Quick Shotly" },
      { property: "og:description", content: "Build cinematic work with a world-class creative team." },
    ],
  }),
  component: Careers,
});

function Careers() {
  const [role, setRole] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    toast.success("Application submitted! We'll be in touch soon.");
    (e.target as HTMLFormElement).reset();
    setRole("");
  }

  return (
    <div>
      <PageHero
        eyebrow="Careers"
        title={<>Create the future of <span className="text-gradient">video</span></>}
        subtitle="We're a remote-first studio of editors, designers and storytellers. Find your role below."
      />

      <section className="mx-auto max-w-5xl px-6 py-12">
        <h2 className="text-2xl font-bold">Open positions</h2>
        <Stagger className="mt-6 grid gap-4">
          {CAREERS.map((c) => (
            <StaggerItem key={c.title}>
              <div className="flex flex-col items-start justify-between gap-4 rounded-3xl border border-border bg-card p-6 glow-hover sm:flex-row sm:items-center">
                <div>
                  <h3 className="text-lg font-semibold">{c.title}</h3>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" /> {c.type}
                  </p>
                  <p className="mt-2 max-w-xl text-sm text-muted-foreground">{c.desc}</p>
                </div>
                <button
                  onClick={() => {
                    setRole(c.title);
                    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow-sm transition-all hover:shadow-glow"
                >
                  Apply <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section id="apply" className="mx-auto max-w-3xl px-6 py-12">
        <Reveal>
          <div className="rounded-[2rem] border border-border bg-card p-8 md:p-10">
            <h2 className="text-2xl font-bold">Application form</h2>
            <p className="mt-2 text-sm text-muted-foreground">Tell us about yourself.</p>
            <form onSubmit={onSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Full Name" name="name" required />
              <Field label="Mobile" name="mobile" type="tel" required />
              <Field label="Email" name="email" type="email" required />
              <Field label="City" name="city" required />
              <Field label="Qualification" name="qualification" />
              <Field label="Experience (years)" name="experience" type="number" />
              <div className="sm:col-span-2">
                <Label>Role</Label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                  className="mt-1.5 w-full rounded-2xl border border-input bg-input px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/40"
                >
                  <option value="" disabled>Select a role</option>
                  {CAREERS.map((c) => (
                    <option key={c.title} value={c.title}>{c.title}</option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <Label>Skills</Label>
                <textarea
                  name="skills"
                  rows={3}
                  placeholder="Premiere Pro, After Effects, DaVinci, AI tools…"
                  className="mt-1.5 w-full rounded-2xl border border-input bg-input px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/40"
                />
              </div>
              <Field label="Portfolio Link" name="portfolio" type="url" className="sm:col-span-2" />
              <div className="sm:col-span-2">
                <Label>Resume Upload</Label>
                <label className="mt-1.5 flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-border bg-input px-4 py-4 text-sm text-muted-foreground transition-colors hover:border-primary">
                  <Upload className="h-5 w-5 text-primary" />
                  <span>Upload PDF / DOCX</span>
                  <input type="file" accept=".pdf,.doc,.docx" className="hidden" />
                </label>
              </div>
              <button
                type="submit"
                className="sm:col-span-2 mt-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow-sm transition-all hover:shadow-glow"
              >
                Submit Application
              </button>
            </form>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="text-sm font-medium text-foreground">{children}</label>;
}

function Field({
  label,
  name,
  type = "text",
  required,
  className,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label>{label}</Label>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-1.5 w-full rounded-2xl border border-input bg-input px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/40"
      />
    </div>
  );
}
