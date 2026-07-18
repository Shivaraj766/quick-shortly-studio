"use client";


import { useState } from "react";
import { toast } from "sonner";
import { Star, Upload, Video } from "lucide-react";
import { PageHero, Reveal, Stagger, StaggerItem } from "@/components/shared/primitives";

const TESTIMONIALS = [
  { name: "Aarav Mehta", role: "Founder, Nexus", rating: 5, text: "The brand film exceeded every expectation. Cinematic, fast and on budget." },
  { name: "Priya Sharma", role: "Bride", rating: 5, text: "Our wedding film made us cry. It genuinely feels like a movie." },
  { name: "Karan Verma", role: "Creator, 240k", rating: 5, text: "My reels finally look premium. Retention jumped instantly." },
  { name: "Sneha Iyer", role: "CMO, GlowCo", rating: 5, text: "AI videos that actually convert. The team is incredibly sharp." },
  { name: "Rahul Nair", role: "YouTuber", rating: 5, text: "Best editing partner I've worked with. Turnaround is unreal." },
  { name: "Ananya Das", role: "Marketing Lead", rating: 5, text: "Color grading and motion graphics are next level. Highly recommend." },
];

export default function Feedback() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a star rating.");
      return;
    }
    toast.success("Thanks for your feedback! 🌟");
    (e.target as HTMLFormElement).reset();
    setRating(0);
  }

  return (
    <div>
      <PageHero
        eyebrow="Feedback"
        title={<>Loved by <span className="text-gradient">creators & brands</span></>}
        subtitle="Your story matters. Rate your experience and help others discover Quick Shotly."
      />

      <section className="mx-auto max-w-3xl px-6 py-10">
        <Reveal>
          <form onSubmit={onSubmit} className="rounded-[2rem] border border-border bg-card p-8 md:p-10">
            <h2 className="text-2xl font-bold">Leave a review</h2>
            <div className="mt-5 flex items-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => {
                const v = i + 1;
                return (
                  <button
                    type="button"
                    key={v}
                    onMouseEnter={() => setHover(v)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => setRating(v)}
                    aria-label={`${v} star`}
                  >
                    <Star
                      className={`h-8 w-8 transition-all ${
                        (hover || rating) >= v ? "fill-primary text-primary scale-110" : "text-muted-foreground"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <div className="mt-6 grid gap-4">
              <input
                name="name"
                placeholder="Your name"
                required
                className="w-full rounded-2xl border border-input bg-input px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/40"
              />
              <textarea
                name="review"
                rows={4}
                placeholder="Write your review…"
                required
                className="w-full rounded-2xl border border-input bg-input px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/40"
              />
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-border bg-input px-4 py-3 text-sm text-muted-foreground hover:border-primary">
                  <Upload className="h-5 w-5 text-primary" /> Upload image
                  <input type="file" accept="image/*" className="hidden" />
                </label>
                <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-border bg-input px-4 py-3 text-sm text-muted-foreground hover:border-primary">
                  <Video className="h-5 w-5 text-primary" /> Upload video
                  <input type="file" accept="video/*" className="hidden" />
                </label>
              </div>
              <button
                type="submit"
                className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow-sm transition-all hover:shadow-glow"
              >
                Submit Review
              </button>
            </div>
          </form>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <h2 className="text-center text-3xl font-bold">What clients say</h2>
        <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <StaggerItem key={t.name}>
              <div className="h-full rounded-3xl border border-border bg-card p-6 glow-hover">
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="mt-4 text-sm text-muted-foreground">"{t.text}"</p>
                <div className="mt-5 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/15 text-sm font-bold text-primary">
                    {t.name.charAt(0)}
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </div>
  );
}
