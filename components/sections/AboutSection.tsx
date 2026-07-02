import Image from "next/image";
import { MapPin, GraduationCap, Cpu, Rocket } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { AboutPhoto } from "@/components/about-photo";

const githubStatsUrl =
  "https://github-readme-stats.vercel.app/api?username=arsalanmaniar&show_icons=true&theme=transparent&hide_border=true&title_color=06b6d4&icon_color=06b6d4&text_color=ffffff&bg_color=00000000";
const githubLangsUrl =
  "https://github-readme-stats.vercel.app/api/top-langs/?username=arsalanmaniar&layout=compact&theme=transparent&hide_border=true&title_color=06b6d4&text_color=ffffff&bg_color=00000000";

const config = [
  { key: "unit_name", value: '"Arsalan Maniar"' },
  { key: "role", value: '"AI Engineer & Full Stack Developer"' },
  { key: "location", value: '"Karachi, PK"' },
  { key: "status", value: '"actively_learning"' },
  { key: "core_directive", value: '"Solve real problems"' },
];

const highlights = [
  { icon: Cpu, label: "AI-First Engineering" },
  { icon: Rocket, label: "Full Stack Web Apps" },
  { icon: GraduationCap, label: "GIAIC — AI & Computing" },
  { icon: MapPin, label: "Karachi, Pakistan" },
];

export function AboutSection() {
  return (
    <section id="about" className="border-t border-border/50 py-24">
      <div className="container">
        <SectionHeading path="> WHOAMI" title="About Me" />

        <div className="grid gap-10 lg:grid-cols-5">
          {/* Prose */}
          <Reveal className="lg:col-span-3">
            <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
              <p>
                Hi, I&apos;m <span className="text-foreground">Arsalan Maniar</span> —
                an AI Engineer & Full Stack Developer who builds modern web apps and
                AI-powered systems. I enjoy reverse-engineering new technologies,
                training my skills like a neural network, and shipping projects
                that actually matter in the real world.
              </p>
              <p>
                My core directive:{" "}
                <span className="text-primary">
                  &quot;Build intelligent systems that solve real problems.&quot;
                </span>{" "}
                Lately I&apos;ve been building conversational AI, agentic
                workflows, and production-ready web experiences with Next.js and
                Python.
              </p>
              <p className="font-mono text-sm text-muted-foreground/80">
                <span className="text-secondary">$</span> currently_learning
                <span className="text-foreground"> FastAPI</span>,
                <span className="text-foreground"> AI Agents SDK</span>, and
                production AI systems.
              </p>

              {/* Highlights */}
              <ul className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2">
                {highlights.map((h) => (
                  <li
                    key={h.label}
                    className="flex items-center gap-3 rounded-md border border-border/70 bg-card/40 px-4 py-3 text-sm text-foreground"
                  >
                    <h.icon className="size-4 shrink-0 text-primary" />
                    {h.label}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Right column: profile photo + config terminal card */}
          <div className="flex flex-col gap-8 lg:col-span-2">
            <AboutPhoto />

            <Reveal delay={0.1}>
              <div className="rounded-lg border border-border/70 bg-card/60 shadow-xl">
              <div className="flex items-center gap-2 border-b border-border/60 px-4 py-3">
                <span className="flex gap-1.5">
                  <span className="size-2.5 rounded-full bg-destructive/80" />
                  <span className="size-2.5 rounded-full bg-secondary/80" />
                  <span className="size-2.5 rounded-full bg-primary/80" />
                </span>
                <span className="ml-2 font-mono text-xs text-muted-foreground">
                  cat unit.config
                </span>
              </div>
              <dl className="space-y-3 p-5 font-mono text-sm">
                {config.map((row) => (
                  <div key={row.key} className="flex flex-wrap gap-x-2">
                    <dt className="text-primary">{row.key}:</dt>
                    <dd className="text-foreground/90">{row.value}</dd>
                  </div>
                ))}
                </dl>
              </div>
            </Reveal>
          </div>
        </div>

        {/* GitHub activity */}
        <Reveal className="mt-12">
          <p className="mb-4 font-mono text-sm text-primary glow-cyan-sm">
            &gt; GITHUB_ACTIVITY
          </p>
          <div className="rounded-lg border border-cyan-500/30 bg-card/40 p-4 sm:p-6">
            <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
              <Image
                src={githubStatsUrl}
                alt="Arsalan Maniar's GitHub stats"
                width={495}
                height={195}
                unoptimized
                className="h-auto w-full max-w-md"
              />
              <Image
                src={githubLangsUrl}
                alt="Arsalan Maniar's most used languages"
                width={350}
                height={195}
                unoptimized
                className="h-auto w-full max-w-xs"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
