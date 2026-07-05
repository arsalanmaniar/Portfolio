import Link from "next/link";
import { Mail, ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";
import { socials } from "@/lib/nav";

// Shared input/textarea styling — glass field, cyan border + ring on focus.
const fieldClass =
  "w-full rounded-xl border border-white/10 bg-gray-900/60 px-4 py-3 font-mono text-sm text-white outline-none backdrop-blur-sm transition duration-200 placeholder:text-gray-500 focus:border-cyan-500/60 focus:bg-gray-900/80 focus:ring-1 focus:ring-cyan-500/20";

// Shared label styling.
const labelClass =
  "mb-2 block font-mono text-xs uppercase tracking-widest text-cyan-400";

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
                className="group flex h-full flex-col justify-between gap-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:border-cyan-500/30 hover:bg-white/[0.06]"
              >
                <div className="flex items-start justify-between">
                  <span className="inline-flex size-14 items-center justify-center rounded-xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/20 to-transparent text-cyan-400 shadow-[0_0_20px_-4px_rgba(6,182,212,0.7)] transition-colors group-hover:border-cyan-500/50">
                    <c.icon className="size-8" />
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

        {/* Contact form (mailto fallback — opens the visitor's email client) */}
        <Reveal delay={0.15} className="mt-8">
          <form
            action={`mailto:${socials.email}`}
            method="POST"
            encType="text/plain"
            className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm sm:p-8"
          >
            <div className="space-y-5">
              <div>
                <label htmlFor="name" className={labelClass}>
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="John Doe"
                  className={fieldClass}
                />
              </div>

              <div>
                <label htmlFor="email" className={labelClass}>
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="john@example.com"
                  className={fieldClass}
                />
              </div>

              <div>
                <label htmlFor="message" className={labelClass}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  placeholder="Tell me about your project..."
                  className={`${fieldClass} resize-y`}
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-cyan-500 py-4 font-mono font-bold text-black transition duration-200 hover:scale-[1.02] hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/25 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                &gt; SEND_MESSAGE
              </button>
            </div>
          </form>

          <p className="mt-4 text-center font-mono text-xs text-muted-foreground">
            &gt; or reach me directly at{" "}
            <a
              href={`mailto:${socials.email}`}
              className="text-primary transition-colors hover:text-primary/80 hover:underline"
            >
              {socials.email}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
