"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

/**
 * CSS-animated image robot mascot (no Three.js). Floats, pulses a cyan glow,
 * tilts on hover, and can toggle between two robot images. Fades in from the
 * right on mount via Framer Motion.
 */
const robots = [
  { key: "gemini", src: "/robot-gemini-cropped.png", label: "Gemini bot" },
  { key: "chatgpt", src: "/robot-chatgpt-cropped.png", label: "ChatGPT bot" },
] as const;

export default function RobotMascot() {
  const [index, setIndex] = useState(0);
  const robot = robots[index];

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="flex flex-col items-center gap-4"
    >
      {/* Robot + effects */}
      <div className="group relative h-[480px] w-[280px]">
        {/* Cyan glow pool at the feet */}
        <div className="absolute bottom-0 left-1/2 h-8 w-32 -translate-x-1/2 animate-pulse rounded-full bg-cyan-400/20 blur-xl" />

        {/* Floating + glowing + hover-tilt robot */}
        <div className="animate-robot-float h-full w-full transition-transform duration-300 group-hover:rotate-3 group-hover:scale-105">
          <div className="animate-robot-glow relative h-full w-full">
            <Image
              src={robot.src}
              alt="Arsalan Maniar's AI robot mascot"
              fill
              priority
              sizes="280px"
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Toggle between the two robots */}
      <button
        type="button"
        onClick={() => setIndex((i) => (i + 1) % robots.length)}
        aria-label={`Switch robot (currently ${robot.label})`}
        className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 px-4 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-cyan-400 hover:bg-cyan-400/10 hover:text-primary"
      >
        <span className="size-1.5 rounded-full bg-cyan-400" />
        swap robot
      </button>
    </motion.div>
  );
}
