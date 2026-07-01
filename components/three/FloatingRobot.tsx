"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

// The WebGL scene is client-only — ssr:false avoids hydration/SSR mismatches
// (same pattern as ParticleBackground). Kept in its own module so the dynamic
// boundary can skip it on the server.
const RobotScene = dynamic(() => import("@/components/three/RobotScene"), {
  ssr: false,
});

/**
 * Decorative 3D divider sitting between the Hero and About sections.
 * Fades in on scroll and shows a terminal-style caption beneath the scene.
 */
export function FloatingRobot() {
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative"
    >
      <div className="pointer-events-none h-[300px] w-full">
        <RobotScene />
      </div>
      <p className="pb-4 text-center font-mono text-xs text-muted-foreground/70 sm:text-sm">
        &gt; scrolling deeper into the system...
      </p>
    </motion.div>
  );
}
