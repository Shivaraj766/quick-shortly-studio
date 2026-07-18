"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { ICONS } from "@/components/icons";
import { PageHero, Stagger, StaggerItem } from "@/components/shared/primitives";

export default function Services() {
  return (
    <div>
      <PageHero
        eyebrow="Services"
        title={<>Everything you need to <span className="text-gradient">go viral</span></>}
        subtitle="Thirteen specialized services covering the full creative pipeline — pick one, or let us run the whole show."
      />

      <section className="mx-auto max-w-7xl px-6 py-12">
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => {
            const Icon = ICONS[s.icon];
            return (
              <StaggerItem key={s.slug}>
                <div className="group flex h-full flex-col rounded-3xl border border-border bg-card p-6 glow-hover transition-colors hover:border-primary/50">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    {Icon && <Icon className="h-6 w-6" />}
                  </span>
                  <Link href={`/services/${s.slug}`} className="mt-5 inline-block">
                    <h3 className="text-lg font-semibold hover:text-primary transition-colors">{s.title}</h3>
                  </Link>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{s.desc}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <Link href={`/services/${s.slug}`} className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                      View details <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    <Link
                      href={`/booking?service=${encodeURIComponent(s.title)}`}
                      className="rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      Book Shoot
                    </Link>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>
    </div>
  );
}
