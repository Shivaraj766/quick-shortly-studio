"use client";

import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { ICONS } from "@/components/icons";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/primitives";

export default function ServiceDetail() {
  const params = useParams();
  const service = SERVICES.find((s) => s.slug === params?.slug);
  
  if (!service) {
    return notFound();
  }
  const Icon = ICONS[service.icon];
  const related = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);

  const deliverables = [
    "Discovery & creative direction",
    "On-location or remote production",
    "Cinematic editing & pacing",
    "Pro color grading & sound design",
    "Platform-ready exports (4K)",
    "Two rounds of revisions included",
  ];

  return (
    <div>
      <section className="relative overflow-hidden pt-36 pb-12">
        <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
        <div className="mx-auto max-w-5xl px-6">
          <Link href="/services" className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> All services
          </Link>
          <div className="mt-6 flex items-center gap-4">
            <span className="grid h-16 w-16 place-items-center rounded-3xl bg-primary text-primary-foreground shadow-glow-sm">
              {Icon && <Icon className="h-8 w-8" />}
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">{service.title}</h1>
          </div>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{service.desc}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={`/booking?service=${encodeURIComponent(service.title)}`} className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow-sm transition-all hover:shadow-glow">
              Book this service
            </Link>
            <Link href="/pricing" className="rounded-full glass px-6 py-3 text-sm font-semibold glow-hover">
              See pricing
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-12">
        <Reveal>
          <h2 className="text-2xl font-bold">What's included</h2>
        </Reveal>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {deliverables.map((d) => (
            <div key={d} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
              <span className="text-sm">{d}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-12">
        <h2 className="text-2xl font-bold">Related services</h2>
        <Stagger className="mt-6 grid gap-4 sm:grid-cols-3">
          {related.map((s) => {
            const RIcon = ICONS[s.icon];
            return (
              <StaggerItem key={s.slug}>
                <Link href={`/services/${s.slug}`} className="group block h-full rounded-3xl border border-border bg-card p-6 glow-hover">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                    {RIcon && <RIcon className="h-5 w-5" />}
                  </span>
                  <h3 className="mt-4 font-semibold">{s.title}</h3>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm text-primary">
                    Explore <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>
    </div>
  );
}
