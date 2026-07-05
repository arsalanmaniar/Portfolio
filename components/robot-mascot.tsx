"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/**
 * CSS-animated Gemini robot mascot. The <Image> is wrapped in nested divs, each
 * carrying one GPU-accelerated humanoid animation (glow → float → sway →
 * breathe+micro) via named keyframes defined in globals.css. A blurred cyan
 * ellipse under the feet breathes in sync. Motion is disabled for users who
 * prefer reduced motion (handled in globals.css).
 */
export default function RobotMascot() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative hidden md:block"
      style={{ width: 320, height: 500 }}
    >
      {/* Glow layer */}
      <div
        style={{
          animation: "robotGlowPulse 2.5s ease-in-out infinite",
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      >
        {/* Float layer */}
        <div
          style={{
            animation: "robotFloat 4s ease-in-out infinite",
            width: "100%",
            height: "100%",
            position: "relative",
          }}
        >
          {/* Sway layer */}
          <div
            style={{
              animation: "robotSway 5s ease-in-out infinite",
              width: "100%",
              height: "100%",
              position: "relative",
            }}
          >
            {/* Breathe + micro layer */}
            <div
              style={{
                animation:
                  "robotBreathe 3.5s ease-in-out infinite, robotMicro 7s ease-in-out infinite",
                width: "100%",
                height: "100%",
                position: "relative",
              }}
            >
              <Image
                src="/robot-gemini-cropped.png"
                alt="AI Robot Mascot"
                fill
                priority
                sizes="320px"
                style={{ objectFit: "contain", objectPosition: "center" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Feet glow */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 200,
          height: 30,
          background: "rgba(6,182,212,0.25)",
          filter: "blur(20px)",
          borderRadius: "50%",
          animation: "robotBreathe 3.5s ease-in-out infinite",
        }}
      />
    </motion.div>
  );
}
