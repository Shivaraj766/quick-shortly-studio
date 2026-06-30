import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Clapperboard,
  Heart,
  Instagram,
  Sparkles,
  Shapes,
  Building2,
  Rocket,
  Eye,
  Target,
} from "lucide-react";
import { PageHero, Reveal, Stagger, StaggerItem, SectionHeading, Counter } from "@/components/site/primitives";
import { STATS } from "@/lib/site-data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Quick Shortly" },
      {
        name: "description",
        content:
          "Quick Shortly is a premium creative agency specializing in cinematic iPhone shoots, wedding films, Instagram reels, AI videos, motion graphics and fast delivery.",
      },
      { property: "og:title", content: "About Quick Shortly" },
      { property: "og:description", content: "A premium creative agency built for the cinematic age." },
    ],
  }),
  component: About,
});

const SPECIALTIES = [
  { icon: Clapperboard, t: "Cinematic iPhone Shoots", d: "Pro-grade footage captured on the latest iPhones." },
  { icon: Heart, t: "Wedding Films", d: "Timeless love stories told like a feature film." },
  { icon: Instagram, t: "Instagram Reels", d: "Vertical content engineered for reach." },
  { icon: Sparkles, t: "AI Videos", d: "Future-forward AI visuals and avatars." },
  { icon: Shapes, t: "Motion Graphics", d: "Animated titles, explainers and brand systems." },
  { icon: Building2, t: "Corporate Advertisements", d: "Brand films that drive measurable results." },
];

function About() {
  return (
    <div>
      <PageHero
        eyebrow="About us"
        title={<>We make iPhones look like <span className="text-gradient">cinema</span></>}
        subtitle="Quick Shortly is a premium creative agency obsessed with story, craft, and turnaround. We turn everyday devices into cinematic machines."
      />

      <section className="mx-auto max-w-7xl px-6 py-12">
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SPECIALTIES.map((s) => (
            <StaggerItem key={s.t}>
              <div className="h-full rounded-3xl border border-border bg-card p-6 glow-hover">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <s.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: Rocket, t: "Mission", d: "Make world-class video accessible to every brand and creator — fast." },
            { icon: Eye, t: "Vision", d: "Redefine production by blending mobile capture, cinema craft and AI." },
            { icon: Target, t: "Promise", d: "Premium quality, transparent pricing, and on-time delivery, always." },
          ].map((v) => (
            <Reveal key={v.t}>
              <div className="h-full rounded-3xl border border-border bg-grid bg-card/40 p-8">
                <v.icon className="h-7 w-7 text-primary" />
                <h3 className="mt-4 text-xl font-bold">{v.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-2 gap-4 rounded-3xl glass p-8 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-extrabold text-gradient sm:text-4xl">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-2 text-xs text-muted-foreground sm:text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-10 text-center md:p-14">
            <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
            <div className="relative">
              <SectionHeading title={<>Let's build your <span className="text-gradient">next story</span></>} />
              <Link to="/booking" className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow-sm transition-all hover:shadow-glow">
                Book a project
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
