"use client";

import { useState } from "react";
import Image from "next/image";

import { GithubIcon } from "@/components/brand-icons";

/**
 * Renders a GitHub stat card from a local (cached) API route. If the image
 * fails to load, it swaps to a styled placeholder instead of a broken image.
 */
function StatCard({
  src,
  alt,
  width,
  height,
  sizeClass,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizeClass: string;
}) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        className={`flex h-40 items-center justify-center gap-2.5 rounded-lg border border-cyan-500/30 bg-background/50 font-mono text-sm text-muted-foreground ${sizeClass}`}
      >
        <GithubIcon className="size-5 text-primary" />
        <span>
          GitHub: <span className="text-foreground">arsalanmaniar</span>
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      unoptimized
      onError={() => setErrored(true)}
      className={`h-auto ${sizeClass}`}
    />
  );
}

export function GithubStats() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
      <StatCard
        src="/api/github-stats"
        alt="Arsalan Maniar's GitHub stats"
        width={495}
        height={195}
        sizeClass="w-full max-w-md"
      />
      <StatCard
        src="/api/github-langs"
        alt="Arsalan Maniar's most used languages"
        width={350}
        height={195}
        sizeClass="w-full max-w-xs"
      />
    </div>
  );
}
