"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

/**
 * CSS-animated Gemini robot mascot (no Three.js). Layered nested divs each
 * carry one GPU-accelerated idle animation (float → sway → breathe → micro →
 * glow). On desktop the whole robot subtly follows the cursor with lerp
 * smoothing and leans forward + scales up on hover. All motion is driven via
 * transform/filter only, and honours prefers-reduced-motion.
 *
 * The mouse-follow transform is written straight to the DOM node inside a
 * requestAnimationFrame loop (via refs) rather than React state, so tracking
 * the cursor never triggers a re-render.
 */
export default function RobotMascot() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0, hover: 0 });
  const hoverTarget = useRef(0);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!desktop || reduced) return;

    const onMove = (e: MouseEvent) => {
      // Normalise cursor position to -1..1 across the viewport.
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    const tick = () => {
      const c = current.current;
      // Lerp toward the cursor + hover targets for smooth, damped motion.
      c.x += (target.current.x - c.x) * 0.08;
      c.y += (target.current.y - c.y) * 0.08;
      c.hover += (hoverTarget.current - c.hover) * 0.12;

      const lean = c.hover * -3; // rotateX lean-in on hover
      const scale = 1 + c.hover * 0.05; // grow to ~1.05 on hover

      if (wrapRef.current) {
        // Max ±3deg Y / ±2deg X from the cursor, plus the hover lean/scale.
        wrapRef.current.style.transform =
          `perspective(800px) rotateY(${c.x * 3}deg) ` +
          `rotateX(${-c.y * 2 + lean}deg) scale(${scale})`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="flex items-center justify-center"
    >
      {/* Mouse-follow + hover wrapper (transform driven via rAF/ref). Also the
          fixed-size group container that reserves layout space (CLS = 0). */}
      <div
        ref={wrapRef}
        onMouseEnter={() => (hoverTarget.current = 1)}
        onMouseLeave={() => (hoverTarget.current = 0)}
        style={{ transformStyle: "preserve-3d" }}
        className="group relative flex h-[480px] w-[280px] items-center justify-center will-change-transform"
      >
        {/* Cyan glow platform under the feet — two stacked ellipses */}
        <div className="animate-robot-breathe absolute bottom-3 left-1/2 h-4 w-64 -translate-x-1/2 rounded-[50%] bg-cyan-400/10 blur-3xl" />
        <div className="animate-robot-breathe absolute bottom-4 left-1/2 h-6 w-48 -translate-x-1/2 rounded-[50%] bg-cyan-400/20 blur-2xl" />

        {/* Layered idle animations */}
        <div className="animate-robot-float h-full w-full">
          <div className="animate-robot-sway h-full w-full">
            <div className="animate-robot-breathe h-full w-full">
              {/* micro layer also carries the hover glow boost (filter only) */}
              <div className="animate-robot-micro h-full w-full transition-[filter] duration-500 group-hover:[filter:drop-shadow(0_0_45px_rgba(6,182,212,0.55))]">
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
