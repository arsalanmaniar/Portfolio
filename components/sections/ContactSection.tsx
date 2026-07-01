import Link from "next/link";
import { Mail, ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";
import { socials } from "@/lib/nav";

const channels = [
  {
    label: "Email",
    handle: "hafizarsalan125@gmail.com",
    command: "mail --to arsalan",
    href: `mailto:${socials.email}`,
    icon: Mail,
    external: false,
  },
  {
    label: "LinkedIn",
    handle: "arsalan-maniar",
    command: "connect --network",
    href: socials.linkedin,
    icon: LinkedinIcon,
    external: true,
  },
  {
    label: "GitHub",
    handle: "arsalanmaniar",
    command: "clone --source",
    href: socials.github,
    icon: GithubIcon,
    external: true,
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="border-t border-border/50 py-24">
      <div className="container">
        <SectionHeading
          path="> OPEN_CHANNEL"
          title="Let's Build Something"
          description="Available for freelance projects and collaborations."
        />

        <div className="grid gap-4 md:grid-cols-3">
          {channels.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.08} className="h-full">
              <Link
                href={c.href}
                target={c.external ? "_blank" : undefined}
                rel={c.external ? "noreferrer" : undefined}
                className="group flex h-full flex-col justify-between gap-6 rounded-lg border border-border/70 bg-card/60 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_16px_40px_-16px_hsl(188_94%_43%/0.5)]"
              >
                <div className="flex items-start justify-between">
                  <span className="inline-flex size-12 items-center justify-center rounded-md border border-border bg-background text-primary transition-colors group-hover:border-primary/60 group-hover:glow-cyan-sm">
                    <c.icon className="size-6" />
                  </span>
                  <ArrowUpRight className="size-5 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                </div>

                <div>
                  <p className="mb-1 font-mono text-xs text-muted-foreground">
                    <span className="text-secondary">$</span> {c.command}
                  </p>
                  <p className="font-mono text-sm font-semibold text-foreground">
                    {c.label}
                  </p>
                  <p className="truncate text-sm text-muted-foreground">
                    {c.handle}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-8">
          <p className="font-mono text-sm text-muted-foreground">
            <span className="text-primary terminal-cursor">
              awaiting your message
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
