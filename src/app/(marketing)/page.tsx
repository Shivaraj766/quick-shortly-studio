"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Play, Star, Zap, CheckCircle2 } from "lucide-react";
const heroImg = "/hero.jpg";
import { STATS, SERVICES, PRICING } from "@/lib/constants";
import { ICONS } from "@/components/icons";
import { Reveal, Stagger, StaggerItem, Counter, SectionHeading } from "@/components/shared/primitives";

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* TWO-COLUMN HERO */}
      <section className="relative min-h-screen pt-28 pb-20 overflow-hidden">
        {/* Background ambient glow */}
        <div className="absolute top-1/4 -left-64 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 -right-64 h-[600px] w-[600px] rounded-full bg-blue-600/10 blur-[150px] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            
            {/* LEFT COLUMN: Copy & CTAs */}
            <div className="flex flex-col items-start text-left relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", bounce: 0, duration: 0.8 }}
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-4 py-1.5 text-xs font-bold tracking-widest text-gray-300 uppercase shadow-lg">
                  🎬 Premium Creative Agency
                </span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-satoshi text-3xl font-black leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl"
              >
                Cinematic Stories. <br className="hidden md:block" />
                Shot on iPhone. <br className="hidden md:block" />
                <span className="text-gradient">Crafted Like Cinema.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", bounce: 0, duration: 0.8, delay: 0.2 }}
                className="mt-6 max-w-xl text-base text-gray-400 sm:text-lg md:text-xl font-medium leading-relaxed drop-shadow-md"
              >
                We transform real moments into unforgettable films. From iPhone capture to cinema-quality storytelling.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", bounce: 0, duration: 0.8, delay: 0.3 }}
                className="mt-10 flex flex-wrap items-center gap-4"
              >
                <Link
                  href="/booking"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-sm font-bold text-white shadow-[0_0_30px_-5px_rgba(37,99,235,0.6)] transition-all hover:bg-blue-500 hover:scale-105 hover:shadow-[0_0_40px_-5px_rgba(37,99,235,0.8)]"
                >
                  Book Your Shoot <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/portfolio"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-transparent px-8 py-4 text-sm font-bold text-white transition-all hover:bg-white/10 hover:border-white/30"
                >
                  <Play className="h-4 w-4 text-white" /> Watch Our Reel
                </Link>
              </motion.div>

              {/* Social Proof */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", bounce: 0, duration: 0.8, delay: 0.4 }}
                className="mt-10 flex items-center gap-4"
              >
                <div className="flex -space-x-3">
                  <img src="https://i.pravatar.cc/100?img=11" alt="Avatar" className="h-10 w-10 rounded-full border-2 border-background object-cover" />
                  <img src="https://i.pravatar.cc/100?img=12" alt="Avatar" className="h-10 w-10 rounded-full border-2 border-background object-cover" />
                  <img src="https://i.pravatar.cc/100?img=13" alt="Avatar" className="h-10 w-10 rounded-full border-2 border-background object-cover" />
                  <img src="https://i.pravatar.cc/100?img=14" alt="Avatar" className="h-10 w-10 rounded-full border-2 border-background object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="h-4 w-4 fill-current drop-shadow-sm" />
                    <Star className="h-4 w-4 fill-current drop-shadow-sm" />
                    <Star className="h-4 w-4 fill-current drop-shadow-sm" />
                    <Star className="h-4 w-4 fill-current drop-shadow-sm" />
                    <Star className="h-4 w-4 fill-current drop-shadow-sm" />
                    <span className="ml-1 text-sm font-bold text-white">4.9 / 5</span>
                  </div>
                  <p className="text-sm font-medium text-gray-400 mt-0.5">
                    Trusted by <span className="text-blue-500 font-bold">300+</span> Happy Clients
                  </p>
                </div>
              </motion.div>
            </div>

            {/* RIGHT COLUMN: The Showcase */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", bounce: 0, duration: 1.2 }}
              className="relative mt-10 lg:mt-0 h-[400px] sm:h-[500px] lg:h-[600px] w-full"
            >
              {/* Central Graphic (iPhone on Desktop, Just Screen on Mobile) */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-none flex justify-center">
                  {/* Outer glow */}
                  <motion.div 
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="absolute inset-0 rounded-[3rem] bg-blue-500/30 blur-3xl lg:blur-[80px]" 
                  />
                  {/* Desktop & Mobile Unified Graphic */}
                  <div className="relative w-full max-w-[300px] lg:max-w-[300px] aspect-[9/16] lg:aspect-[9/19.5] rounded-3xl lg:rounded-[3rem] border-0 lg:border-[8px] lg:border-[#1a1a1a] bg-black shadow-2xl overflow-hidden ring-1 ring-white/10 z-10">
                    {/* Dynamic Island (Desktop Only) */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 hidden lg:block lg:w-24 lg:h-7 bg-black rounded-full z-30" />
                    
                    {/* Screen Content */}
                    <motion.img 
                      animate={{ scale: [1, 1.15, 1], x: [0, -10, 0], y: [0, -15, 0] }}
                      transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
                      src="/gimbal-setup-blue.jpg" 
                      className="absolute inset-0 w-full h-full object-cover opacity-80" 
                      alt="Recording Video" 
                    />
                    
                    {/* Recording UI Overlay */}
                    <div className="absolute top-10 lg:top-12 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1 lg:py-1.5 rounded-full border border-white/10 z-20">
                      <div className="w-2 lg:w-2.5 h-2 lg:h-2.5 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-[10px] lg:text-[12px] font-mono text-white">RE:00:47</span>
                    </div>
                    
                    <div className="absolute bottom-8 lg:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 lg:gap-5 z-20">
                      <div className="flex gap-4 lg:gap-6 text-[10px] lg:text-[12px] font-bold text-white/80 bg-black/40 backdrop-blur-md px-4 lg:px-5 py-1.5 lg:py-2 rounded-full border border-white/10">
                        <span>.5</span><span className="text-white scale-110">1x</span><span>2</span>
                      </div>
                      <div className="w-12 lg:w-14 h-12 lg:h-14 rounded-full border-2 lg:border-[3px] border-white flex items-center justify-center p-1 shadow-lg">
                        <div className="w-full h-full rounded-full bg-red-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating UI: Cinematic LUT (Top Right) */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="absolute -right-2 lg:-right-4 top-4 lg:top-10 z-20 scale-75 lg:scale-100 origin-top-right"
              >
                <div className="rounded-2xl border border-white/10 bg-[#0A0A0A]/90 backdrop-blur-xl p-4 shadow-2xl flex items-center gap-4">
                  <div className="h-10 w-16 rounded-md bg-gradient-to-br from-teal-900 to-blue-900 overflow-hidden relative">
                    <img src="https://images.unsplash.com/photo-1534447677768-be436bb09401?w=200&h=100&fit=crop" alt="LUT preview" className="w-full h-full object-cover opacity-80" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Cinematic LUT</div>
                    <div className="text-xs font-semibold text-white mt-1">TEAL & ORANGE</div>
                    <div className="flex gap-1 mt-1.5">
                      <div className="w-2 h-2 rounded-full bg-teal-500 shadow-[0_0_5px_rgba(20,184,166,0.8)]"></div>
                      <div className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_5px_rgba(249,115,22,0.8)]"></div>
                      <div className="w-2 h-2 rounded-full bg-blue-900"></div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating UI: 4K Resolution (Middle Right) */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                className="absolute -right-4 lg:-right-8 top-1/3 z-20 mt-4 scale-75 lg:scale-100 origin-right"
              >
                <div className="rounded-2xl border border-white/10 bg-[#0A0A0A]/90 backdrop-blur-xl p-4 shadow-2xl flex items-center gap-6">
                  <div>
                    <div className="text-xl font-bold text-white leading-none">4K</div>
                    <div className="text-[10px] text-gray-400 tracking-widest mt-1 uppercase">Resolution</div>
                  </div>
                  <div className="rounded-md bg-blue-900/50 px-2 py-1 border border-blue-500/30">
                    <span className="text-[10px] font-bold text-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.5)]">60 FPS</span>
                  </div>
                </div>
              </motion.div>

              {/* Floating UI: Color Grading (Bottom Right) */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 2 }}
                className="absolute -right-6 lg:-right-12 bottom-24 lg:bottom-20 z-20 w-64 scale-75 lg:scale-100 origin-bottom-right"
              >
                <div className="rounded-2xl border border-white/10 bg-[#0A0A0A]/90 backdrop-blur-xl p-4 shadow-2xl">
                  <h4 className="text-[10px] font-bold text-gray-400 tracking-widest mb-3 uppercase">Color Grading</h4>
                  <div className="flex justify-between px-2">
                    <div className="flex flex-col items-center">
                      <div className="h-10 w-10 rounded-full border-2 border-purple-500/50 flex items-center justify-center text-xs font-bold text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.4)]">-12</div>
                      <span className="text-[9px] text-gray-500 mt-2 uppercase tracking-wider">Shadows</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="h-10 w-10 rounded-full border-2 border-green-500/50 flex items-center justify-center text-xs font-bold text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.4)]">+14</div>
                      <span className="text-[9px] text-gray-500 mt-2 uppercase tracking-wider">Midtones</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="h-10 w-10 rounded-full border-2 border-blue-500/50 flex items-center justify-center text-xs font-bold text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.4)]">+18</div>
                      <span className="text-[9px] text-gray-500 mt-2 uppercase tracking-wider">Highlights</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Left Side: Video Thumbnails */}
              <div className="absolute left-0 lg:left-4 top-1/4 z-20 flex flex-col gap-4 scale-75 lg:scale-100 origin-left">
                <motion.div
                  animate={{ y: [0, -5, 0], rotateZ: [-5, -2, -5] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="w-24 h-16 rounded-xl border border-white/20 bg-black/50 backdrop-blur-md overflow-hidden shadow-xl"
                >
                  <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&h=150&fit=crop" className="w-full h-full object-cover opacity-80" alt="Thumbnail 1" />
                </motion.div>
                
                <motion.div
                  animate={{ y: [0, -8, 0], scale: [1, 1.05, 1], rotateZ: [2, 5, 2] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                  className="w-28 h-20 -ml-4 lg:-ml-8 rounded-xl border border-white/30 bg-black/50 backdrop-blur-md overflow-hidden shadow-2xl relative"
                >
                  <img src="https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?w=200&h=150&fit=crop" className="w-full h-full object-cover opacity-60" alt="Thumbnail 2" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                      <Play className="w-3 h-3 text-white ml-0.5 fill-current shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -4, 0], rotateZ: [-2, -5, -2] }}
                  transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 2 }}
                  className="w-24 h-16 rounded-xl border border-white/20 bg-black/50 backdrop-blur-md overflow-hidden shadow-xl"
                >
                  <img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=200&h=150&fit=crop" className="w-full h-full object-cover opacity-80" alt="Thumbnail 3" />
                </motion.div>
              </div>

              {/* Floating UI: Editable Timeline (Bottom Center) */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="absolute -bottom-10 lg:-bottom-6 left-1/2 -translate-x-1/2 z-20 w-[95%] lg:w-[110%] max-w-[600px]"
              >
                <div className="rounded-2xl border border-white/10 bg-[#0A0A0A]/90 backdrop-blur-2xl p-3 shadow-2xl flex gap-3">
                  {/* Timeline Toolbar */}
                  <div className="hidden sm:flex flex-col items-center gap-2 pr-3 border-r border-white/10 text-gray-500 py-1">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-3.5 h-3.5"><path d="m15 18-6-6 6-6"/></svg>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-3.5 h-3.5"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-3.5 h-3.5 text-blue-500"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                  </div>
                  
                  <div className="flex-1 flex flex-col gap-2 relative">
                    <div className="flex items-center justify-between px-2 text-[8px] text-gray-500 font-mono tracking-wider">
                      <span>00:00</span>
                      <span>00:05</span>
                      <span>00:10</span>
                      <span>00:15</span>
                      <span>00:20</span>
                      <span className="hidden sm:inline">00:25</span>
                      <span className="hidden sm:inline">00:30</span>
                    </div>
                    {/* Video Track */}
                    <div className="w-full h-8 sm:h-10 bg-white/5 rounded flex overflow-hidden border border-white/5 relative">
                      <div className="w-full h-full flex opacity-80 grayscale contrast-125">
                        <img src="/gimbal-setup-blue.jpg" className="h-full w-1/5 object-cover" alt="track frame" />
                        <img src="/gimbal-setup-blue.jpg" className="h-full w-1/5 object-cover" alt="track frame" />
                        <img src="/gimbal-setup-blue.jpg" className="h-full w-1/5 object-cover" alt="track frame" />
                        <img src="/gimbal-setup-blue.jpg" className="h-full w-1/5 object-cover" alt="track frame" />
                        <img src="/gimbal-setup-blue.jpg" className="h-full w-1/5 object-cover" alt="track frame" />
                      </div>
                    </div>
                    {/* Audio Track */}
                    <div className="w-full h-4 sm:h-5 bg-gradient-to-r from-blue-900/40 via-teal-900/40 to-blue-900/40 rounded border border-white/5 flex overflow-hidden items-center relative">
                      <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="w-[85%] h-full text-teal-400 opacity-60">
                         <path d="M0 10 Q 5 0, 10 10 T 20 10 T 30 10 Q 35 20, 40 10 T 50 10 T 60 10 Q 65 0, 70 10 T 80 10 T 90 10 Q 95 20, 100 10" fill="none" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </div>

                    {/* Animated Playhead */}
                    <motion.div 
                      animate={{ x: ["10%", "80%", "10%"] }}
                      transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                      className="absolute top-0 bottom-0 w-[2px] bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,1)] z-10 flex flex-col items-center"
                    >
                      <div className="w-2 h-2 bg-blue-500 rotate-45 -mt-1 rounded-[1px]" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TRUSTED BY STRIP */}
      <section className="border-y border-white/5 bg-background/50 backdrop-blur-sm py-10 relative z-20">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-[11px] font-bold tracking-[0.2em] text-gray-500 uppercase">Trusted by Creators, Brands & Businesses</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-8 opacity-50 grayscale transition-all hover:grayscale-0">
            {/* Logos placeholders mirroring the screenshot */}
            <span className="text-xl font-extrabold tracking-tighter">boAt</span>
            <span className="text-xl font-extrabold tracking-tight">slice</span>
            <div className="flex items-center gap-2"><div className="grid grid-cols-2 gap-0.5"><div className="w-2 h-2 bg-white"></div><div className="w-2 h-2 bg-white"></div><div className="w-2 h-2 bg-white"></div><div className="w-2 h-2 bg-white"></div></div><span className="text-xl font-bold">Microsoft</span></div>
            <span className="text-2xl font-serif tracking-widest">SONY</span>
            <span className="text-xl font-serif">TITAN</span>
            <span className="text-2xl font-bold italic">zomato</span>
            <span className="text-2xl font-black">OLA</span>
            <span className="text-xl font-medium tracking-tight lowercase">musafir</span>
          </div>
        </div>
      </section>

      {/* STATS BANNER */}
      <section className="relative z-20 mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-2 gap-4 rounded-[2rem] border border-white/10 bg-card/60 backdrop-blur-xl p-8 shadow-2xl md:grid-cols-4 md:p-12">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-2 text-xs font-medium uppercase tracking-wider text-gray-400 sm:text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <Reveal>
          <SectionHeading
            eyebrow="What we do"
            title={<>Services built for <span className="text-gradient">modern brands</span></>}
            subtitle="From a single reel to a full production retainer — we cover the entire creative pipeline."
          />
        </Reveal>

        <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.slice(0, 6).map((s) => {
            const Icon = ICONS[s.icon];
            return (
              <StaggerItem key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group block h-full rounded-3xl border border-border bg-card p-6 glow-hover"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    {Icon && <Icon className="h-6 w-6" />}
                  </span>
                  <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Learn more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal className="mt-10 text-center">
          <Link href="/services" className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-secondary">
            View all 13 services <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </section>

      {/* PROCESS */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-[2rem] border border-border bg-grid bg-card/40 p-8 md:p-14">
          <Reveal>
            <SectionHeading
              eyebrow="The process"
              title={<>Cinema-grade results in <span className="text-gradient">4 steps</span></>}
            />
          </Reveal>
          <Stagger className="mt-12 grid gap-6 md:grid-cols-4">
            {[
              { t: "Book", d: "Tell us your vision in a 2-minute brief." },
              { t: "Shoot", d: "We capture with iPhone & cinema gear." },
              { t: "Edit", d: "Cinematic cut, color, sound & graphics." },
              { t: "Deliver", d: "4K masters across every platform." },
            ].map((step, i) => (
              <StaggerItem key={step.t}>
                <div className="rounded-2xl border border-border bg-background/50 p-6">
                  <span className="text-sm font-bold text-primary">0{i + 1}</span>
                  <h3 className="mt-3 text-lg font-semibold">{step.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{step.d}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* PRICING PREVIEW */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <Reveal>
          <SectionHeading
            eyebrow="Pricing"
            title={<>Simple, <span className="text-gradient">transparent</span> packages</>}
            subtitle="Pick a plan that scales with your content goals."
          />
        </Reveal>
        <Stagger className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {PRICING.map((p) => (
            <StaggerItem key={p.name}>
              <div
                className={`relative flex h-full flex-col rounded-3xl border p-6 ${
                  p.popular ? "border-primary bg-card shadow-glow" : "border-border bg-card glow-hover"
                }`}
              >
                {p.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    Most Popular
                  </span>
                )}
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold">{p.price}</span>
                  <span className="text-sm text-muted-foreground">{p.period}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {p.features.slice(0, 4).map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" /> {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/pricing"
                  className={`mt-6 inline-flex justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                    p.popular
                      ? "bg-primary text-primary-foreground shadow-glow-sm hover:shadow-glow"
                      : "border border-border hover:bg-secondary"
                  }`}
                >
                  Choose Plan
                </Link>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-10 text-center md:p-16">
            <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
            <div className="relative">
              <div className="flex items-center justify-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>
              <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to make something <span className="text-gradient">cinematic?</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                Join 1,200+ brands and creators who trust Quick Shotly with their story.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/booking" className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow-sm transition-all hover:shadow-glow">
                  Start your project
                </Link>
                <Link href="/contact" className="rounded-full glass px-6 py-3 text-sm font-semibold glow-hover">
                  Talk to us
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
