import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Play, Star, Zap, CheckCircle2 } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { STATS, SERVICES, PRICING } from "@/lib/site-data";
import { ICONS } from "@/lib/icons";
import { Reveal, Stagger, StaggerItem, Counter, SectionHeading } from "@/components/site/primitives";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Quick Shortly — Professional iPhone Shoots & Cinematic Video Editing" },
      {
        name: "description",
        content:
          "Premium creative agency for cinematic iPhone shoots, wedding films, Instagram reels, AI videos, and motion graphics. Shoot on iPhone. Edit Like Cinema.",
      },
      { property: "og:title", content: "Quick Shortly — Shoot on iPhone. Edit Like Cinema." },
      {
        property: "og:description",
        content: "Professional iPhone shoots & cinematic video editing for brands and creators.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative min-h-screen pt-28">
        <div className="absolute inset-0 -z-10">
          <img src={heroImg} alt="Filmmaker shooting a neon city on an iPhone" className="h-full w-full object-cover opacity-40" width={1536} height={1024} />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
          <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        </div>

        <div className="mx-auto max-w-7xl px-6 pb-20 pt-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-border glass px-4 py-1.5 text-xs font-medium text-muted-foreground"
          >
            <Zap className="h-3.5 w-3.5 text-primary" /> Shoot on iPhone. Edit Like Cinema.
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-6 max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
          >
            Professional iPhone Shoots & <span className="text-gradient">Cinematic Video Editing</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg"
          >
            A premium creative agency crafting scroll-stopping reels, weddings, AI videos and brand
            films — delivered with cinema-grade color and lightning-fast turnaround.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
          >
            <Link
              to="/booking"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow-sm transition-all hover:shadow-glow"
            >
              Book Now <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-semibold glow-hover"
            >
              <Play className="h-4 w-4 text-primary" /> View Portfolio
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
            >
              Explore Services
            </Link>
          </motion.div>
        </div>

        {/* STATS */}
        <div className="mx-auto max-w-6xl px-6 pb-20">
          <div className="grid grid-cols-2 gap-4 rounded-3xl glass p-6 shadow-card md:grid-cols-4 md:p-10">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-extrabold text-gradient sm:text-4xl md:text-5xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <p className="mt-2 text-xs text-muted-foreground sm:text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <Reveal>
          <SectionHeading
            eyebrow="What we do"
            title={<>Services built for <span className="text-gradient">modern brands</span></>}
            subtitle="From a single reel to a full production retainer — we cover the entire creative pipeline."
          />
        </Reveal>

        <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.slice(0, 6).map((s) => {
            const Icon = ICONS[s.icon];
            return (
              <StaggerItem key={s.slug}>
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="group block h-full rounded-3xl border border-border bg-card p-6 glow-hover"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    {Icon && <Icon className="h-6 w-6" />}
                  </span>
                  <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Learn more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal className="mt-10 text-center">
          <Link to="/services" className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-secondary">
            View all 13 services <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </section>

      {/* PROCESS */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-[2rem] border border-border bg-grid bg-card/40 p-8 md:p-14">
          <Reveal>
            <SectionHeading
              eyebrow="The process"
              title={<>Cinema-grade results in <span className="text-gradient">4 steps</span></>}
            />
          </Reveal>
          <Stagger className="mt-12 grid gap-6 md:grid-cols-4">
            {[
              { t: "Book", d: "Tell us your vision in a 2-minute brief." },
              { t: "Shoot", d: "We capture with iPhone & cinema gear." },
              { t: "Edit", d: "Cinematic cut, color, sound & graphics." },
              { t: "Deliver", d: "4K masters across every platform." },
            ].map((step, i) => (
              <StaggerItem key={step.t}>
                <div className="rounded-2xl border border-border bg-background/50 p-6">
                  <span className="text-sm font-bold text-primary">0{i + 1}</span>
                  <h3 className="mt-3 text-lg font-semibold">{step.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{step.d}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* PRICING PREVIEW */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <Reveal>
          <SectionHeading
            eyebrow="Pricing"
            title={<>Simple, <span className="text-gradient">transparent</span> packages</>}
            subtitle="Pick a plan that scales with your content goals."
          />
        </Reveal>
        <Stagger className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
                  <span className="text-3xl font-extrabold">{p.price}</span>
                  <span className="text-sm text-muted-foreground">{p.period}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {p.features.slice(0, 4).map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" /> {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/pricing"
                  className={`mt-6 inline-flex justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
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

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-10 text-center md:p-16">
            <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
            <div className="relative">
              <div className="flex items-center justify-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>
              <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to make something <span className="text-gradient">cinematic?</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                Join 1,200+ brands and creators who trust Quick Shortly with their story.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link to="/booking" className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow-sm transition-all hover:shadow-glow">
                  Start your project
                </Link>
                <Link to="/contact" className="rounded-full glass px-6 py-3 text-sm font-semibold glow-hover">
                  Talk to us
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
