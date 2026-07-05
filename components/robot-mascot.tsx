"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/**
 * CSS-animated Gemini robot mascot (no Three.js, no state — pure CSS).
 * Layered nested divs each carry one GPU-accelerated animation (transform /
 * filter only) so the motions compose into a lifelike humanoid idle:
 * ready stance → weight-shift sway → breathing → head turn → cyan glow.
 * Hovering puts it into "alert mode": sway pauses, it brightens and leans in.
 * Container space is reserved up-front (fixed w/h) so there is zero CLS.
 */
export default function RobotMascot() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="flex items-center justify-center"
    >
      {/* Fixed-size group container — reserves layout space (CLS = 0) */}
      <div className="group relative flex h-[480px] w-[280px] items-center justify-center">
        {/* Feet glow — breathes in sync with the body */}
        <div className="animate-robot-breathe absolute bottom-0 left-1/2 h-8 w-32 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-xl" />

        {/* Ready stance (outer) + hover alert mode */}
        <div className="animate-robot-ready h-full w-full transition-all duration-500 group-hover:scale-105 group-hover:brightness-110">
          {/* Weight-shift sway — pauses on hover */}
          <div className="animate-robot-sway h-full w-full group-hover:[animation-play-state:paused]">
            {/* Breathing */}
            <div className="animate-robot-breathe h-full w-full">
              {/* Head look-around */}
              <div className="animate-robot-head h-full w-full">
                {/* Cyan energy glow */}
                <div className="animate-robot-glow relative h-full w-full">
                  <Image
                    src="/robot-gemini-cropped.png"
                    alt="Arsalan Maniar's AI robot mascot"
                    fill
                    priority
                    sizes="280px"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
