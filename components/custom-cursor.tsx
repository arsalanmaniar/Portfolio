"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Desktop custom cursor: an exact-tracking dot + a lerp-following ring.
 * The ring grows and glows over interactive elements. Rendered only on
 * fine-pointer, md+ screens; returns null on touch / mobile.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100, s: 1 });
  const hovering = useRef(false);

  const [enabled, setEnabled] = useState(false);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (pointer: fine)");
    if (!mq.matches) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    const onOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const interactive = !!target?.closest?.(
        'a, button, [role="button"], input, textarea, select, label'
      );
      hovering.current = interactive;
      setIsHover(interactive);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);

    let raf = 0;
    const loop = () => {
      // Ring eases toward the pointer (lerp); dot tracks exactly.
      ring.current.x += (mouse.current.x - ring.current.x) * 0.18;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.18;
      const targetScale = hovering.current ? 1.5 : 1;
      ring.current.s += (targetScale - ring.current.s) * 0.2;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x - 4}px, ${mouse.current.y - 4}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x - 16}px, ${ring.current.y - 16}px, 0) scale(${ring.current.s})`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden>
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-2 w-2 rounded-full bg-cyan-400"
      />
      <div
        ref={ringRef}
        className={`fixed left-0 top-0 h-8 w-8 rounded-full border transition-[box-shadow,border-color] duration-200 ${
          isHover
            ? "border-cyan-400 shadow-[0_0_18px_rgba(6,182,212,0.75)]"
            : "border-cyan-400/50"
        }`}
      />
    </div>
  );
}
