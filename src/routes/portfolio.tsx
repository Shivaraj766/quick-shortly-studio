import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Play, X } from "lucide-react";
import { PORTFOLIO, PORTFOLIO_FILTERS } from "@/lib/site-data";
import { PageHero } from "@/components/site/primitives";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Quick Shotly" },
      {
        name: "description",
        content:
          "Browse Quick Shotly's portfolio of wedding films, corporate ads, Instagram reels, AI videos, commercials and trailers.",
      },
      { property: "og:title", content: "Portfolio — Quick Shotly" },
      { property: "og:description", content: "Cinematic work across weddings, brands, AI and more." },
    ],
  }),
  component: Portfolio,
});

function Portfolio() {
  const [filter, setFilter] = useState<string>("All");
  const [active, setActive] = useState<(typeof PORTFOLIO)[number] | null>(null);

  const items = filter === "All" ? PORTFOLIO : PORTFOLIO.filter((p) => p.category === filter);

  return (
    <div>
      <PageHero
        eyebrow="Portfolio"
        title={<>Work that <span className="text-gradient">moves people</span></>}
        subtitle="A selection of recent projects. Tap any piece to watch in fullscreen."
      />

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-wrap justify-center gap-2">
          {PORTFOLIO_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                filter === f
                  ? "bg-primary text-primary-foreground shadow-glow-sm"
                  : "border border-border text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {items.map((p) => (
              <motion.button
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setActive(p)}
                className="group relative aspect-video overflow-hidden rounded-3xl border border-border text-left"
              >
                <div
                  className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
                  style={{
                    background: `radial-gradient(circle at 30% 20%, oklch(0.6 0.2 ${p.hue} / 0.55), oklch(0.15 0.02 264) 70%)`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full glass px-3 py-1 text-xs font-medium">
                  {p.category}
                </span>
                <span className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100">
                  <Play className="h-5 w-5" />
                </span>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-lg font-bold">{p.title}</h3>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[60] grid place-items-center bg-background/90 p-4 backdrop-blur-md"
          >
            <button
              aria-label="Close"
              className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full glass"
              onClick={() => setActive(null)}
            >
              <X className="h-5 w-5" />
            </button>
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl overflow-hidden rounded-3xl border border-border bg-card"
            >
              <div
                className="grid aspect-video place-items-center"
                style={{
                  background: `radial-gradient(circle at 50% 40%, oklch(0.6 0.2 ${active.hue} / 0.5), oklch(0.13 0.02 264) 75%)`,
                }}
              >
                <span className="grid h-20 w-20 place-items-center rounded-full bg-primary text-primary-foreground shadow-glow animate-pulse-glow">
                  <Play className="h-9 w-9" />
                </span>
              </div>
              <div className="flex items-center justify-between p-6">
                <div>
                  <h3 className="text-xl font-bold">{active.title}</h3>
                  <p className="text-sm text-muted-foreground">{active.category}</p>
                </div>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  Preview
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
