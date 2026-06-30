import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { MessageCircle, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { BRAND } from "@/lib/site-data";
import { PageHero, Reveal } from "@/components/site/primitives";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Quick Shortly" },
      {
        name: "description",
        content:
          "Get in touch with Quick Shortly via WhatsApp, Instagram, YouTube, email or phone. Send us a message and we'll respond fast.",
      },
      { property: "og:title", content: "Contact — Quick Shortly" },
      { property: "og:description", content: "Let's talk about your next cinematic project." },
    ],
  }),
  component: Contact,
});

const CHANNELS = [
  { icon: MessageCircle, label: "WhatsApp", value: BRAND.phone, href: `https://wa.me/${BRAND.whatsapp}` },
  { icon: Instagram, label: "Instagram", value: "@quickshortly", href: BRAND.instagram },
  { icon: Youtube, label: "YouTube", value: "Quick Shortly", href: BRAND.youtube },
  { icon: Mail, label: "Email", value: BRAND.email, href: `mailto:${BRAND.email}` },
  { icon: Phone, label: "Phone", value: BRAND.phone, href: `tel:${BRAND.phone}` },
  { icon: MapPin, label: "Studio", value: "Mumbai, India", href: "https://maps.google.com/?q=Mumbai" },
];

function Contact() {
  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you shortly.");
    (e.target as HTMLFormElement).reset();
  }

  return (
    <div>
      <PageHero
        eyebrow="Contact"
        title={<>Let's make something <span className="text-gradient">great</span></>}
        subtitle="Reach us on your favourite channel, or drop a message below."
      />

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-12 lg:grid-cols-2">
        <Reveal>
          <div className="grid gap-3 sm:grid-cols-2">
            {CHANNELS.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-3xl border border-border bg-card p-5 glow-hover"
              >
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <c.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold">{c.label}</p>
                  <p className="text-xs text-muted-foreground">{c.value}</p>
                </div>
              </a>
            ))}
          </div>
          <div className="mt-4 overflow-hidden rounded-3xl border border-border">
            <iframe
              title="Quick Shortly location"
              src="https://www.google.com/maps?q=Mumbai&output=embed"
              className="h-64 w-full grayscale"
              loading="lazy"
            />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={onSubmit} className="rounded-[2rem] border border-border bg-card p-8">
            <h2 className="text-2xl font-bold">Send a message</h2>
            <div className="mt-6 grid gap-4">
              <input name="name" placeholder="Full name" required className="w-full rounded-2xl border border-input bg-input px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/40" />
              <input name="email" type="email" placeholder="Email" required className="w-full rounded-2xl border border-input bg-input px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/40" />
              <input name="subject" placeholder="Subject" className="w-full rounded-2xl border border-input bg-input px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/40" />
              <textarea name="message" rows={5} placeholder="Tell us about your project…" required className="w-full rounded-2xl border border-input bg-input px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/40" />
              <button type="submit" className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow-sm transition-all hover:shadow-glow">
                Send Message
              </button>
            </div>
          </form>
        </Reveal>
      </section>
    </div>
  );
}
