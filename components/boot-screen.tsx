"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const lines = [
  "> INITIALIZING SYSTEM...",
  "> LOADING MODULES... [████████████] 100%",
  "> AI_ENGINE: ONLINE",
  "> PORTFOLIO_v2.0 READY",
  "> Welcome, Arsalan Maniar",
];

/**
 * Full-screen boot sequence shown once per browser session (sessionStorage).
 * Lines reveal one at a time (~0.5s apart); the overlay fades out after 2.5s.
 */
export function BootScreen() {
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem("booted")) return;
    sessionStorage.setItem("booted", "true");
    setShow(true);

    const timers: ReturnType<typeof setTimeout>[] = [];
    lines.forEach((_, i) => {
      timers.push(setTimeout(() => setVisible(i + 1), i * 500));
    });
    timers.push(setTimeout(() => setShow(false), 2500));

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="boot"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9998] flex items-center justify-center bg-black"
        >
          <div className="w-full max-w-md px-6 font-mono text-sm text-cyan-400">
            {lines.slice(0, visible).map((line) => (
              <motion.p
                key={line}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="mb-2 break-words"
              >
                {line}
              </motion.p>
            ))}
            {visible < lines.length && (
              <span className="terminal-cursor" aria-hidden />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
