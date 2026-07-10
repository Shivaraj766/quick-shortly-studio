import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Palette, Award, Rocket, Users } from "lucide-react";
import { Reveal, Stagger, SectionHeading, Counter } from "@/components/site/primitives";
import { TeamCard } from "@/components/site/TeamCard";
import { STATS } from "@/lib/site-data";

import aboutHero from "@/assets/about-hero.jpg";
import aboutStory from "@/assets/about-story.jpg";
import loki from "@/assets/team/loki.jpeg";
import harsha from "@/assets/team/harsha.jpeg";
import ajay from "@/assets/team/ajay.jpeg";
import akhil from "@/assets/team/akhil.jpeg";
import shivaCharri from "@/assets/team/shiva-charri.jpeg";
import nagababu from "@/assets/team/nagababu.jpeg";
import shiva from "@/assets/team/shiva.jpeg";
import yethindra from "@/assets/team/yethindra.jpeg";
import jashva from "@/assets/team/jashva.jpeg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Quick Shotly | Creative Agency" },
      {
        name: "description",
        content:
          "Meet the Quick Shotly team — a premium creative agency crafting cinematic iPhone shoots, wedding films, Instagram reels, AI videos and motion graphics with fast delivery.",
      },
      { property: "og:title", content: "About Quick Shotly" },
      { property: "og:description", content: "A premium creative agency built for the cinematic age." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const LEADERSHIP = { name: "Loki", role: "Founder & CEO", image: loki };
const DESIGN = { name: "Harsha", role: "UI/UX & Lead Editor", image: harsha };

const CREATIVE_TEAM = [
  { name: "Ajay", image: ajay },
  { name: "Akhil", image: akhil },
  { name: "Shiva Charri", image: shivaCharri },
  { name: "Nagababu", image: nagababu },
  { name: "Shiva", image: shiva },
  { name: "Yethindra", image: yethindra },
  { name: "Jashva", image: jashva },
];

const VALUES = [
  { icon: Palette, t: "Creativity", d: "Bold ideas and original storytelling in every frame we craft." },
  { icon: Award, t: "Quality", d: "Cinema-grade craft, obsessive detail, and no shortcuts on delivery." },
  { icon: Rocket, t: "Innovation", d: "Blending mobile capture, cinema technique, and cutting-edge AI." },
  { icon: Users, t: "Collaboration", d: "We work as an extension of your team, from brief to final cut." },
];

function About() {
  return (
    <div>
      {/* 1. Hero */}
      <section className="relative overflow-hidden pt-36 pb-20">
        <div className="absolute inset-0 -z-20">
          <img
            src={aboutHero}
            alt="Quick Shotly film crew shooting on iPhone in a cinematic studio"
            width={1920}
            height={1080}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/80 to-background" />
        </div>
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary backdrop-blur">
              About us
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              We make iPhones look like <span className="text-gradient">cinema</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
              Quick Shotly is a premium creative agency obsessed with story, craft, and turnaround. We turn everyday
              devices into cinematic machines — for brands, creators, and unforgettable moments.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Our Story */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-border">
              <img
                src={aboutStory}
                alt="Quick Shotly editor color grading footage in the studio"
                width={1200}
                height={1200}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <span className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
                Our story
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Born from a love for <span className="text-gradient">storytelling</span>
              </h2>
              <div className="mt-5 space-y-4 text-muted-foreground">
                <p>
                  Quick Shotly started with a simple belief: world-class video shouldn't require a Hollywood budget.
                  Armed with iPhones, cinema lenses, and a relentless eye for craft, we set out to prove that great
                  stories come from vision, not just gear.
                </p>
                <p>
                  Today we're a full-service creative studio producing wedding films, brand commercials, Instagram
                  reels, AI-powered visuals, and motion graphics — all delivered with the speed modern brands demand.
                </p>
                <p>
                  Every project is a collaboration. We obsess over pacing, color, and sound until each frame feels
                  intentional and every cut lands with emotion.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {STATS.map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl font-extrabold text-gradient sm:text-3xl">
                      <Counter value={s.value} suffix={s.suffix} />
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. Meet Our Team */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading
          eyebrow="Our team"
          title={<>Meet the people behind the <span className="text-gradient">magic</span></>}
          subtitle="A tight-knit crew of storytellers, editors, and creatives making every project shine."
        />

        {/* Leadership + Design */}
        <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
            <TeamCard {...LEADERSHIP} size="lg" description="The visionary steering Quick Shotly's creative direction." />
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
            <TeamCard {...DESIGN} size="lg" description="Shaping every pixel — from UI/UX to the final cinematic edit." />
          </motion.div>
        </div>

        {/* Creative Team */}
        <h3 className="mt-16 text-center text-sm font-medium uppercase tracking-wider text-primary">
          Creative Team
        </h3>
        <Stagger className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {CREATIVE_TEAM.map((m) => (
            <TeamCard key={m.name} name={m.name} role="Creative Team" image={m.image} />
          ))}
        </Stagger>
      </section>

      {/* 4. Our Values */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading
          eyebrow="Our values"
          title={<>What we <span className="text-gradient">stand for</span></>}
          subtitle="The principles that guide every frame, every project, every partnership."
        />
        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v) => (
            <motion.div
              key={v.t}
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="h-full rounded-3xl border border-border bg-card p-6 glow-hover"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                <v.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{v.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.d}</p>
            </motion.div>
          ))}
        </Stagger>
      </section>

      {/* 5. CTA */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-10 text-center md:p-14">
            <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
            <div className="relative">
              <SectionHeading title={<>Let's build your <span className="text-gradient">next story</span></>} />
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                Have an idea? We'll turn it into something people can't stop watching.
              </p>
              <Link
                to="/booking"
                className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow-sm transition-all hover:shadow-glow"
              >
                Book a project
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
