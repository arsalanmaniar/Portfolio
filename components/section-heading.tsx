import { Reveal } from "@/components/reveal";

/**
 * Terminal-style section heading: a monospace "path" tag above a large title.
 * e.g.  ~/about   →   About Me
 */
export function SectionHeading({
  path,
  title,
  description,
}: {
  path: string;
  title: string;
  description?: string;
}) {
  return (
    <Reveal className="mb-12 max-w-2xl">
      <p className="mb-2 font-mono text-sm text-primary glow-cyan-sm">{path}</p>
      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-balance text-muted-foreground">{description}</p>
      ) : null}
    </Reveal>
  );
}
