import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { PRICING } from "@/lib/site-data";
import { PageHero, Stagger, StaggerItem, Reveal } from "@/components/site/primitives";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Quick Shortly" },
      {
        name: "description",
        content:
          "Transparent pricing for Quick Shortly: Starter, Professional, Premium and Enterprise plans for video shoots and cinematic editing.",
      },
      { property: "og:title", content: "Pricing — Quick Shortly" },
      { property: "og:description", content: "Simple, transparent packages that scale with your goals." },
    ],
  }),
  component: Pricing,
});

const FAQ = [
  { q: "How fast is delivery?", a: "Most projects are delivered in 24–48 hours. Enterprise timelines are agreed up front." },
  { q: "Do you offer revisions?", a: "Yes — every plan includes revisions, and Premium includes unlimited rounds." },
  { q: "Can I shoot remotely?", a: "Absolutely. We guide remote iPhone shoots or send a crew on location." },
  { q: "What about custom needs?", a: "Choose Enterprise for a fully tailored retainer with a dedicated team." },
];

function Pricing() {
  return (
    <div>
      <PageHero
        eyebrow="Pricing"
        title={<>Plans that <span className="text-gradient">scale with you</span></>}
        subtitle="No hidden fees. Pick a package and start creating today."
      />

      <section className="mx-auto max-w-7xl px-6 py-12">
        <Stagger className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {PRICING.map((p) => (
            <StaggerItem key={p.name}>
              <div
                className={`relative flex h-full flex-col rounded-3xl border p-6 ${
                  p.popular ? "border-primary bg-card shadow-glow" : "border-border bg-card glow-hover"
                }`}
              >
                {p.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    Most Popular
                  </span>
                )}
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold">{p.price}</span>
                  <span className="text-sm text-muted-foreground">{p.period}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                <ul className="mt-6 flex-1 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/booking"
                  className={`mt-6 inline-flex justify-center rounded-full px-5 py-3 text-sm font-semibold transition-all ${
                    p.popular
                      ? "bg-primary text-primary-foreground shadow-glow-sm hover:shadow-glow"
                      : "border border-border hover:bg-secondary"
                  }`}
                >
                  Choose Plan
                </Link>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-12">
        <Reveal>
          <h2 className="text-center text-3xl font-bold">Frequently asked questions</h2>
        </Reveal>
        <div className="mt-8 space-y-3">
          {FAQ.map((f) => (
            <Reveal key={f.q}>
              <details className="group rounded-2xl border border-border bg-card p-5">
                <summary className="cursor-pointer list-none text-base font-semibold">
                  {f.q}
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
