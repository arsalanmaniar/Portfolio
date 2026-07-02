"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/**
 * Profile photo for the About section — fades in from the right with a
 * cyan gradient glow border around the image.
 */
export function AboutPhoto() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative mx-auto w-full max-w-sm"
    >
      {/* Ambient cyan glow behind the photo */}
      <div
        aria-hidden
        className="absolute -inset-3 -z-10 rounded-3xl bg-cyan-500/20 blur-2xl"
      />
      {/* Cyan gradient border wrapper */}
      <div className="rounded-2xl bg-gradient-to-br from-cyan-400 via-cyan-500/30 to-secondary p-[2px]">
        <Image
          src="/avatar.jpg"
          alt="Arsalan Maniar - AI Engineer"
          width={400}
          height={500}
          priority
          className="h-auto w-full rounded-2xl border-2 border-cyan-500/30 object-cover shadow-2xl shadow-cyan-500/20"
        />
      </div>
    </motion.div>
  );
}
