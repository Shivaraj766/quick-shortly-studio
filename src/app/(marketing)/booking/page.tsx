"use client";

import { PageHero, Reveal } from "@/components/shared/primitives";
import { BookingForm } from "@/components/forms/BookingForm";

export default function BookingPage() {
  return (
    <div className="pb-24">
      <PageHero
        eyebrow="Start a Project"
        title={<>Let's make something <span className="text-gradient">great</span></>}
        subtitle="We'd love to hear more about your vision. Fill out the form below and we'll prepare a custom quotation."
      />

      <section className="mx-auto max-w-5xl px-6 py-12">
        <Reveal>
          <BookingForm />
        </Reveal>
      </section>
    </div>
  );
}
