"use client";

import { useEffect, useState } from "react";

import { GithubIcon } from "@/components/brand-icons";

type Language = { name: string; count: number; percent: number };

type Stats = {
  stars: number;
  forks: number;
  repos: number;
  followers: number;
  languages: Language[];
};

const cardClass =
  "rounded-lg border border-cyan-500/30 bg-card/40 p-5 sm:p-6";

export function GithubStats() {
  const [data, setData] = useState<Stats | null>(null);
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");

  useEffect(() => {
    let active = true;
    fetch("/api/github")
      .then((res) => {
        if (!res.ok) throw new Error("bad response");
        return res.json() as Promise<Stats>;
      })
      .then((json) => {
        if (!active) return;
        setData(json);
        setStatus("ok");
      })
      .catch(() => {
        if (active) setStatus("error");
      });
    return () => {
      active = false;
    };
  }, []);

  if (status === "loading") return <StatsSkeleton />;

  if (status === "error" || !data) {
    return (
      <div className={cardClass}>
        <a
          href="https://github.com/arsalanmaniar"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2.5 font-mono text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <GithubIcon className="size-5 text-primary" />
          GitHub: <span className="text-foreground">arsalanmaniar</span>
        </a>
      </div>
    );
  }

  const stats = [
    { icon: "📦", label: "Public Repos", value: data.repos },
    { icon: "⭐", label: "Total Stars", value: data.stars },
    { icon: "👥", label: "Followers", value: data.followers },
    { icon: "🍴", label: "Total Forks", value: data.forks },
  ];

  return (
    <div className={cardClass}>
      <div className="flex flex-col gap-6 md:flex-row">
        {/* Stats grid (2x2) */}
        <div className="grid grid-cols-2 gap-3 md:w-1/2">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center justify-center rounded-lg border border-border/70 bg-background/50 p-4 text-center"
            >
              <span className="mb-1 text-lg" aria-hidden>
                {s.icon}
              </span>
              <span className="text-2xl font-bold text-cyan-400">
                {s.value.toLocaleString()}
              </span>
              <span className="mt-1 font-mono text-xs text-gray-400">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Top languages */}
        <div className="md:w-1/2">
          <p className="mb-4 font-mono text-sm text-primary">
            &gt; TOP_LANGUAGES
          </p>
          <div className="space-y-3">
            {data.languages.length === 0 ? (
              <p className="font-mono text-sm text-muted-foreground">
                No language data available.
              </p>
            ) : (
              data.languages.map((lang) => (
                <div key={lang.name}>
                  <div className="mb-1 flex items-center justify-between font-mono text-sm">
                    <span className="text-foreground">{lang.name}</span>
                    <span className="text-cyan-400">{lang.percent}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-800">
                    <div
                      className="h-full rounded-full bg-cyan-500"
                      style={{ width: `${lang.percent}%` }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatsSkeleton() {
  return (
    <div className={cardClass}>
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="grid grid-cols-2 gap-3 md:w-1/2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-[104px] animate-pulse rounded-lg border border-border/70 bg-background/50"
            />
          ))}
        </div>
        <div className="space-y-3 md:w-1/2">
          <div className="h-4 w-40 animate-pulse rounded bg-gray-800" />
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="space-y-1.5">
              <div className="h-3 w-full animate-pulse rounded bg-gray-800" />
              <div className="h-2 w-full animate-pulse rounded-full bg-gray-800/70" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
