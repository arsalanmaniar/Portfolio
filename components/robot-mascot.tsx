"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

/**
 * Gemini robot mascot animated entirely with Framer Motion (no CSS keyframes).
 * Nested motion layers compose a humanoid idle — float → sway → breathe → glow
 * → micro-wiggle — and the whole robot subtly follows the cursor via spring-
 * smoothed 3D rotation. The glow intensifies on hover.
 */
export default function RobotMascot() {
  const [isHovered, setIsHovered] = useState(false);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 50, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 768) return;
    const handleMouse = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 6;
      const y = (e.clientY / window.innerHeight - 0.5) * -4;
      rotateY.set(x);
      rotateX.set(y);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [rotateX, rotateY]);

  return (
    <motion.div
      className="relative hidden items-center justify-center md:flex"
      style={{ width: 320, height: 520, perspective: 800 }}
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      {/* Mouse-follow wrapper */}
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          rotateX: springX,
          rotateY: springY,
          transformStyle: "preserve-3d",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* FLOAT */}
        <motion.div
          style={{ width: "100%", height: "100%", position: "relative" }}
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* SWAY */}
          <motion.div
            style={{ width: "100%", height: "100%", position: "relative" }}
            animate={{ x: [0, -5, 0, 5, 0], rotate: [0, -0.8, 0, 0.8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* BREATHE */}
            <motion.div
              style={{ width: "100%", height: "100%", position: "relative" }}
              animate={{ scaleY: [1, 1.02, 1], y: [0, -3, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* GLOW */}
              <motion.div
                style={{ width: "100%", height: "100%", position: "relative" }}
                animate={{
                  filter: isHovered
                    ? [
                        "drop-shadow(0 0 30px #06b6d4) drop-shadow(0 0 80px rgba(6,182,212,0.7))",
                        "drop-shadow(0 0 50px #06b6d4) drop-shadow(0 0 120px rgba(6,182,212,0.9))",
                        "drop-shadow(0 0 30px #06b6d4) drop-shadow(0 0 80px rgba(6,182,212,0.7))",
                      ]
                    : [
                        "drop-shadow(0 0 10px #06b6d4) drop-shadow(0 0 25px rgba(6,182,212,0.3))",
                        "drop-shadow(0 0 25px #06b6d4) drop-shadow(0 0 55px rgba(6,182,212,0.6))",
                        "drop-shadow(0 0 10px #06b6d4) drop-shadow(0 0 25px rgba(6,182,212,0.3))",
                      ],
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* MICRO wiggle */}
                <motion.div
                  style={{ width: "100%", height: "100%", position: "relative" }}
                  animate={{
                    x: [0, 1, -2, 2, -1, 0],
                    y: [0, -2, 1, -1, 2, 0],
                    rotate: [0, 0.3, -0.3, 0.2, -0.2, 0],
                  }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Image
                    src="/robot-gemini-cropped.png"
                    alt="AI Robot Mascot"
                    fill
                    priority
                    sizes="320px"
                    style={{ objectFit: "contain", objectPosition: "center" }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Feet glow */}
      <motion.div
        style={{
          position: "absolute",
          bottom: 10,
          left: "50%",
          translateX: "-50%",
          width: 180,
          height: 25,
          background: "rgba(6,182,212,0.25)",
          borderRadius: "50%",
          filter: "blur(18px)",
        }}
        animate={{ scaleX: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
