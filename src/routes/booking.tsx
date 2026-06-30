import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, ChevronLeft, ChevronRight, Upload } from "lucide-react";
import { SERVICES } from "@/lib/site-data";
import { PageHero } from "@/components/site/primitives";

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "Booking — Quick Shortly" },
      {
        name: "description",
        content: "Book a cinematic shoot or edit with Quick Shortly using our simple multi-step booking form.",
      },
      { property: "og:title", content: "Book a Project — Quick Shortly" },
      { property: "og:description", content: "Start your cinematic project in a few simple steps." },
    ],
  }),
  component: Booking,
});

const STEPS = ["Your details", "Project", "Delivery"];

function Booking() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    name: "",
    mobile: "",
    email: "",
    service: SERVICES[0].title,
    mode: "Shoot & Edit",
    description: "",
    delivery: "",
  });

  const set = (k: keyof typeof data, v: string) => setData((d) => ({ ...d, [k]: v }));

  const canNext =
    step === 0
      ? data.name && data.mobile && data.email
      : step === 1
        ? data.service && data.mode
        : data.delivery;

  function submit() {
    navigate({
      to: "/payment",
      search: { service: data.service, mode: data.mode, delivery: data.delivery },
    });
  }

  return (
    <div>
      <PageHero
        eyebrow="Booking"
        title={<>Book your <span className="text-gradient">project</span></>}
        subtitle="Three quick steps and you're on your way to a cinematic edit."
      />

      <section className="mx-auto max-w-2xl px-6 py-10">
        {/* Stepper */}
        <div className="mb-8 flex items-center justify-between">
          {STEPS.map((s, i) => (
            <div key={s} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
                <span
                  className={`grid h-10 w-10 place-items-center rounded-full text-sm font-bold transition-all ${
                    i < step
                      ? "bg-primary text-primary-foreground"
                      : i === step
                        ? "bg-primary text-primary-foreground shadow-glow-sm"
                        : "border border-border text-muted-foreground"
                  }`}
                >
                  {i < step ? <Check className="h-5 w-5" /> : i + 1}
                </span>
                <span className="mt-2 hidden text-xs text-muted-foreground sm:block">{s}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`mx-2 h-0.5 flex-1 ${i < step ? "bg-primary" : "bg-border"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="rounded-[2rem] border border-border bg-card p-6 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="grid gap-4"
            >
              {step === 0 && (
                <>
                  <Field label="Name" value={data.name} onChange={(v) => set("name", v)} />
                  <Field label="Mobile Number" type="tel" value={data.mobile} onChange={(v) => set("mobile", v)} />
                  <Field label="Email" type="email" value={data.email} onChange={(v) => set("email", v)} />
                </>
              )}

              {step === 1 && (
                <>
                  <div>
                    <Label>Service</Label>
                    <select
                      value={data.service}
                      onChange={(e) => set("service", e.target.value)}
                      className="mt-1.5 w-full rounded-2xl border border-input bg-input px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/40"
                    >
                      {SERVICES.map((s) => (
                        <option key={s.slug} value={s.title}>{s.title}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label>Scope</Label>
                    <div className="mt-1.5 grid grid-cols-2 gap-3">
                      {["Shoot & Edit", "Only Edit"].map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => set("mode", m)}
                          className={`rounded-2xl border px-4 py-3 text-sm font-medium transition-all ${
                            data.mode === m
                              ? "border-primary bg-primary/10 text-foreground shadow-glow-sm"
                              : "border-border text-muted-foreground hover:bg-secondary"
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label>Project Description</Label>
                    <textarea
                      rows={4}
                      value={data.description}
                      onChange={(e) => set("description", e.target.value)}
                      placeholder="Tell us about your vision…"
                      className="mt-1.5 w-full rounded-2xl border border-input bg-input px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/40"
                    />
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div>
                    <Label>Upload Reference</Label>
                    <label className="mt-1.5 flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-border bg-input px-4 py-4 text-sm text-muted-foreground hover:border-primary">
                      <Upload className="h-5 w-5 text-primary" /> Upload images or video links
                      <input type="file" multiple className="hidden" />
                    </label>
                  </div>
                  <Field label="Delivery Date" type="date" value={data.delivery} onChange={(v) => set("delivery", v)} />
                </>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="inline-flex items-center gap-1 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-secondary disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" /> Back
            </button>
            {step < STEPS.length - 1 ? (
              <button
                onClick={() => canNext && setStep((s) => s + 1)}
                disabled={!canNext}
                className="inline-flex items-center gap-1 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow-sm transition-all hover:shadow-glow disabled:opacity-40"
              >
                Next <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={submit}
                disabled={!canNext}
                className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow-sm transition-all hover:shadow-glow disabled:opacity-40"
              >
                Book Project
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="text-sm font-medium text-foreground">{children}</label>;
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-2xl border border-input bg-input px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/40"
      />
    </div>
  );
}
