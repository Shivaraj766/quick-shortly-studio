import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/site-data";
import { ICONS } from "@/lib/icons";
import { PageHero, Stagger, StaggerItem } from "@/components/site/primitives";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — Quick Shotly" },
      {
        name: "description",
        content:
          "Explore Quick Shotly services: Instagram reels, wedding films, corporate ads, AI videos, motion graphics, color grading, YouTube editing and more.",
      },
      { property: "og:title", content: "Services — Quick Shotly" },
      { property: "og:description", content: "13 premium creative services for brands and creators." },
    ],
  }),
  component: Services,
});

function Services() {
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
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="group flex h-full flex-col rounded-3xl border border-border bg-card p-6 glow-hover"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    {Icon && <Icon className="h-6 w-6" />}
                  </span>
                  <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{s.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    View details <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
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
