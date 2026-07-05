"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Terminal } from "lucide-react";

import { Button } from "@/components/ui/button";
import RobotMascot from "@/components/robot-mascot";

// Three.js scene is client-only — ssr:false avoids WebGL/hydration mismatches.
const ParticleBackground = dynamic(
  () => import("@/components/three/ParticleBackground"),
  { ssr: false }
);

const bootLines = [
  "> initializing arsalan maniar.exe ...",
  "> loading modules ████████████ 100%",
  "> status: ONLINE · mode: BUILD · location: Karachi, PK",
  "> boot sequence complete. welcome.",
];

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function HeroSection() {
  // Reveal boot lines one at a time to mimic a terminal boot sequence.
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (visibleLines >= bootLines.length) return;
    const t = setTimeout(() => setVisibleLines((n) => n + 1), 450);
    return () => clearTimeout(t);
  }, [visibleLines]);

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Center radial gradient wash (cyan → transparent) */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(22,78,99,0.25),transparent_70%)]" />

      {/* Background grid + dot patterns with a radial fade toward the edges */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-grid mask-fade opacity-40" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-dots mask-fade opacity-50" />

      {/* 3D particle field + wireframe head (client-only, non-interactive).
          Kept BELOW the drifting blobs below. */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <ParticleBackground />
      </div>

      {/* Large blurred circles slowly drifting (cyan + blue) */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="animate-drift-a absolute -left-10 top-1/4 h-96 w-96 rounded-full bg-cyan-500/5 blur-3xl" />
        <div className="animate-drift-b absolute right-0 top-1/3 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="animate-drift-c absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-cyan-400/5 blur-3xl" />
      </div>

      {/* Cyan glow bloom behind the content */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 z-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />

      <div className="container relative z-10 py-24">
        <div className="flex items-center justify-between gap-12">
          <div className="w-full max-w-3xl">
          {/* Profile avatar with pulsing cyan ring */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative mb-6 h-16 w-16"
          >
            <span
              aria-hidden
              className="absolute -inset-1 animate-pulse rounded-full border border-cyan-400/50"
            />
            <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-cyan-400 ring-2 ring-cyan-400/30">
              <Image
                src="/avatar.jpg"
                alt="Arsalan Maniar"
                width={64}
                height={64}
                priority
                sizes="64px"
                style={{ objectPosition: "center 15%" }}
                className="h-full w-full rounded-full object-cover"
              />
            </div>
          </motion.div>

          {/* Boot sequence terminal */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 rounded-lg border border-border/70 bg-card/60 p-4 font-mono text-xs shadow-2xl backdrop-blur-sm sm:text-sm"
          >
            <div className="mb-3 flex items-center gap-2 border-b border-border/60 pb-2 text-muted-foreground">
              <span className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-destructive/80" />
                <span className="size-2.5 rounded-full bg-secondary/80" />
                <span className="size-2.5 rounded-full bg-primary/80" />
              </span>
              <span className="ml-2 inline-flex items-center gap-1.5">
                <Terminal className="size-3.5" /> arsalan maniar@portfolio: ~/boot
              </span>
            </div>
            <div className="space-y-1">
              {bootLines.slice(0, visibleLines).map((line, i) => (
                <p
                  key={line}
                  className={`break-words ${
                    i === bootLines.length - 1
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {line}
                </p>
              ))}
              {visibleLines < bootLines.length && (
                <p className="text-primary terminal-cursor" aria-hidden />
              )}
            </div>
          </motion.div>

          {/* Main hero content */}
          <motion.div variants={container} initial="hidden" animate="show">
            {/* Eyebrow: thin cyan line + amber tagline */}
            <motion.div variants={fadeUp} className="mb-5">
              <span className="mb-3 block h-px w-16 bg-cyan-500" aria-hidden />
              <p className="font-mono text-sm uppercase tracking-widest text-secondary">
                {"// Hi, my name is"}
              </p>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text pb-2 font-sans text-5xl font-black tracking-tight text-transparent drop-shadow-[0_0_25px_rgba(6,182,212,0.45)] md:text-7xl lg:text-8xl"
            >
              Arsalan Maniar
            </motion.h1>

            <motion.h2
              variants={fadeUp}
              className="mt-5 font-mono text-2xl font-medium text-foreground sm:text-3xl lg:text-4xl"
            >
              AI Engineer <span className="text-secondary">&amp;</span> Full
              Stack Developer
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-7 max-w-xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              I build modern web apps and AI-powered systems — reverse-engineering
              new technologies and shipping projects that solve real problems.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-11 flex flex-col gap-4 sm:flex-row"
            >
              <Button
                asChild
                size="lg"
                className="group rounded-lg bg-primary px-6 py-3 font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-primary hover:brightness-110 hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]"
              >
                <Link href="/#projects">
                  View Projects
                  <ArrowRight className="transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm text-white transition-all duration-300"
                style={{
                  background: "rgba(6, 182, 212, 0.12)",
                  border: "1px solid rgba(6, 182, 212, 0.5)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  boxShadow: "0 0 20px rgba(6, 182, 212, 0.15)",
                  color: "white",
                  textShadow: "0 1px 3px rgba(0,0,0,0.5)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.background = "rgba(6, 182, 212, 0.18)";
                  el.style.border = "1px solid rgba(6, 182, 212, 0.7)";
                  el.style.boxShadow = "0 0 30px rgba(6, 182, 212, 0.25)";
                  el.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.background = "rgba(6, 182, 212, 0.12)";
                  el.style.border = "1px solid rgba(6, 182, 212, 0.5)";
                  el.style.boxShadow = "0 0 20px rgba(6, 182, 212, 0.15)";
                  el.style.color = "white";
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download Resume
              </a>
            </motion.div>
          </motion.div>
          </div>

          {/* Robot mascot — right side, hidden on mobile (self-animates) */}
          <div className="hidden shrink-0 md:block">
            <RobotMascot />
          </div>
        </div>
      </div>
    </section>
  );
}
