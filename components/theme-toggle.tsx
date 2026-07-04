"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";

/**
 * Dark/light mode toggle button. Renders a Moon (dark) or Sun (light) icon
 * that swaps with a small rotate/fade animation. Mounts client-side only so
 * the icon matches the resolved theme without hydration mismatch.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-cyan-500/30 text-foreground transition-colors hover:border-cyan-400 hover:bg-cyan-400/10"
    >
      {/* Reserve space to avoid layout shift before mount */}
      <span className="relative flex h-4 w-4 items-center justify-center">
        {mounted && (
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isDark ? "moon" : "sun"}
              initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {isDark ? (
                <Moon className="size-4 text-cyan-400" />
              ) : (
                <Sun className="size-4 text-cyan-500" />
              )}
            </motion.span>
          </AnimatePresence>
        )}
      </span>
    </button>
  );
}
