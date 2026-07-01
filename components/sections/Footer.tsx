import Link from "next/link";
import { Mail } from "lucide-react";

import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";
import { socials } from "@/lib/nav";

const iconLinks = [
  { label: "GitHub", href: socials.github, icon: GithubIcon },
  { label: "LinkedIn", href: socials.linkedin, icon: LinkedinIcon },
  { label: "Email", href: `mailto:${socials.email}`, icon: Mail },
];

export function Footer() {
  return (
    <footer className="border-t border-border/60 py-8">
      <div className="container flex flex-col items-center justify-between gap-5 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="font-mono text-sm text-muted-foreground">
            <span className="text-primary">ARSALAN MANIAR</span>
            <span className="text-muted-foreground">.exe</span>
            <span className="text-muted-foreground/80">
              {" "}
              © 2026 — Developed by Arsalan Maniar ❤️
            </span>
          </p>
          <p className="mt-1 font-mono text-xs text-muted-foreground/70">
            &gt; session.end()
          </p>
        </div>

        <div className="flex items-center gap-2">
          {iconLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              aria-label={link.label}
              className="inline-flex size-9 items-center justify-center rounded-md border border-border/70 text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary"
            >
              <link.icon className="size-4" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
