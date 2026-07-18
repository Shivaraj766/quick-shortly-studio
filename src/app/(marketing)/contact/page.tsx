"use client";

import { useState } from "react";
import { toast } from "sonner";
import { MessageCircle, Instagram, Youtube, Mail, Phone } from "lucide-react";
import { BRAND } from "@/lib/constants";
import { PageHero, Reveal } from "@/components/shared/primitives";

const CHANNELS = [
  { icon: MessageCircle, label: "WhatsApp", value: BRAND.phone, href: `https://wa.me/${BRAND.whatsapp}` },
  { icon: Instagram, label: "Instagram", value: "@quickshotly", href: BRAND.instagram },
  { icon: Youtube, label: "YouTube", value: "Quick Shotly", href: BRAND.youtube },
  { icon: Mail, label: "Email", value: BRAND.email, href: `mailto:${BRAND.email}` },
  { icon: Phone, label: "Phone", value: BRAND.phone, href: `tel:${BRAND.phone.replace(/\s/g, "")}` },
  { icon: Phone, label: "Phone", value: BRAND.phone2, href: `tel:${BRAND.phone2.replace(/\s/g, "")}` },
];

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/contact/submit", {
        method: "POST",
        body: formData, // Send FormData directly for file support
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || "Failed to send message");
      }

      toast.success("Message sent! We'll get back to you shortly.");
      (e.target as HTMLFormElement).reset();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
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
                key={c.href}
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
              title="Quick Shotly location"
              src="https://www.google.com/maps?q=Mumbai&output=embed"
              className="h-64 w-full grayscale"
              loading="lazy"
            />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={onSubmit} className="rounded-[2rem] border border-border bg-card p-8">
            <h2 className="text-2xl font-bold">Send an Inquiry</h2>
            <div className="mt-6 grid gap-4">
              <input name="name" placeholder="Full Name *" required className="w-full rounded-2xl border border-input bg-input px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/40" />
              <input name="email" type="email" placeholder="Email *" required className="w-full rounded-2xl border border-input bg-input px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/40" />
              <input name="phone" type="tel" placeholder="Phone Number (Optional)" className="w-full rounded-2xl border border-input bg-input px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/40" />
              
              <select name="inquiry_type" required className="w-full rounded-2xl border border-input bg-input px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/40 appearance-none">
                <option value="" disabled selected>Inquiry Type *</option>
                <option value="General Question">General Question</option>
                <option value="Existing Project">Existing Project</option>
                <option value="Partnership">Partnership</option>
                <option value="Business Collaboration">Business Collaboration</option>
                <option value="Support">Support</option>
                <option value="Careers">Careers</option>
                <option value="Other">Other</option>
              </select>

              <input name="subject" placeholder="Subject *" required className="w-full rounded-2xl border border-input bg-input px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/40" />
              <textarea name="message" rows={5} placeholder="Message *" required className="w-full rounded-2xl border border-input bg-input px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/40" />
              
              <div className="rounded-2xl border border-input bg-input px-4 py-3">
                <label className="mb-2 block text-sm text-muted-foreground">Attachment (Optional)</label>
                <input name="attachment" type="file" className="text-sm file:mr-4 file:rounded-full file:border-0 file:bg-primary/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary hover:file:bg-primary/20" />
              </div>

              <div className="rounded-2xl border border-input bg-input px-4 py-3">
                <label className="mb-3 block text-sm text-muted-foreground">Preferred Contact Method</label>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="radio" name="contact_method" value="Email" className="accent-primary" defaultChecked /> Email
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="radio" name="contact_method" value="WhatsApp" className="accent-primary" /> WhatsApp
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="radio" name="contact_method" value="Phone Call" className="accent-primary" /> Phone Call
                  </label>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="mt-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow-sm transition-all hover:shadow-glow disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send Inquiry"}
              </button>
            </div>
          </form>
        </Reveal>
      </section>
    </div>
  );
}
