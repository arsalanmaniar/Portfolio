"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Download, Terminal } from "lucide-react";

import { Button } from "@/components/ui/button";

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
      {/* Background grid + dot patterns with a radial fade toward the edges */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-grid mask-fade" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-dots mask-fade opacity-60" />

      {/* 3D particle field + wireframe head (client-only, non-interactive) */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <ParticleBackground />
      </div>

      {/* Cyan glow bloom behind the content */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 z-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />

      <div className="container relative z-10 py-24">
        <div className="mx-auto max-w-3xl">
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
            <motion.p
              variants={fadeUp}
              className="mb-4 font-mono text-sm text-secondary"
            >
              {"// Hi, my name is"}
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="bg-gradient-to-r from-cyan-400 via-white to-cyan-400 bg-clip-text pb-2 font-sans text-5xl font-black tracking-tight text-transparent drop-shadow-[0_0_25px_rgba(6,182,212,0.5)] md:text-7xl lg:text-8xl"
            >
              Arsalan Maniar
            </motion.h1>

            <motion.h2
              variants={fadeUp}
              className="mt-4 font-mono text-xl font-medium text-foreground sm:text-2xl lg:text-3xl"
            >
              AI Engineer <span className="text-secondary">&amp;</span> Full
              Stack Developer
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              I build modern web apps and AI-powered systems — reverse-engineering
              new technologies and shipping projects that solve real problems.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <Button asChild size="lg" className="group font-mono">
                <Link href="/#projects">
                  View Projects
                  <ArrowRight className="transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="group border-secondary/50 font-mono text-secondary hover:bg-secondary/10 hover:text-secondary"
              >
                <a href="/resume.pdf" download>
                  <Download className="transition-transform group-hover:translate-y-0.5" />
                  Download Resume
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
