"use client";

import dynamic from "next/dynamic";

import { BootScreen } from "@/components/boot-screen";

// Cursor is desktop-only visual chrome — skip SSR entirely.
const CustomCursor = dynamic(() => import("@/components/custom-cursor"), {
  ssr: false,
});

/** Global client-side chrome: one-time boot screen + custom cursor. */
export function ClientFX() {
  return (
    <>
      <BootScreen />
      <CustomCursor />
    </>
  );
}
