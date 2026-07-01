import type { ComponentType, SVGProps } from "react";
import {
  Code2,
  Server,
  Bot,
  Wrench,
  Sparkles,
  Waypoints,
  MessageSquareCode,
  Database,
  Boxes,
} from "lucide-react";

import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { GithubIcon } from "@/components/brand-icons";
import {
  Html5,
  Css,
  JavaScript,
  TypeScript,
  ReactIcon,
  NextjsIcon,
  TailwindIcon,
  Python,
  FastapiIcon,
  GitIcon,
  VercelIcon,
  DockerIcon,
  KubernetesIcon,
  StreamlitIcon,
  PostgresqlIcon,
  SupabaseIcon,
  SqliteIcon,
  MongodbIcon,
} from "@/components/tech-icons";

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

type Skill = { name: string; icon: IconType };

type Group = {
  title: string;
  tag: string;
  icon: IconType;
  skills: Skill[];
};

const groups: Group[] = [
  {
    title: "Frontend",
    tag: "ui.layer",
    icon: Code2,
    skills: [
      { name: "HTML", icon: Html5 },
      { name: "CSS", icon: Css },
      { name: "JavaScript", icon: JavaScript },
      { name: "TypeScript", icon: TypeScript },
      { name: "React.js", icon: ReactIcon },
      { name: "Next.js", icon: NextjsIcon },
      { name: "Tailwind CSS", icon: TailwindIcon },
    ],
  },
  {
    title: "Backend",
    tag: "server.layer",
    icon: Server,
    skills: [
      { name: "Python", icon: Python },
      { name: "FastAPI (Learning)", icon: FastapiIcon },
    ],
  },
  {
    title: "Database",
    tag: "db.layer",
    icon: Database,
    skills: [
      { name: "PostgreSQL", icon: PostgresqlIcon },
      { name: "Supabase", icon: SupabaseIcon },
      { name: "SQLite", icon: SqliteIcon },
      { name: "MongoDB", icon: MongodbIcon },
    ],
  },
  {
    title: "AI",
    tag: "intelligence.layer",
    icon: Bot,
    skills: [
      { name: "OpenAI API", icon: Sparkles },
      { name: "OpenRouter", icon: Waypoints },
      { name: "AI Agents SDK", icon: Bot },
      { name: "Prompt Engineering", icon: MessageSquareCode },
      { name: "RAG (Retrieval-Augmented Generation)", icon: Database },
    ],
  },
  {
    title: "DevOps",
    tag: "infra.layer",
    icon: Boxes,
    skills: [
      { name: "Docker", icon: DockerIcon },
      { name: "Kubernetes", icon: KubernetesIcon },
    ],
  },
  {
    title: "Tools",
    tag: "toolchain",
    icon: Wrench,
    skills: [
      { name: "Git", icon: GitIcon },
      { name: "GitHub", icon: GithubIcon },
      { name: "VS Code", icon: Code2 },
      { name: "Vercel", icon: VercelIcon },
      { name: "Streamlit", icon: StreamlitIcon },
    ],
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="border-t border-border/50 py-24">
      <div className="container">
        <SectionHeading
          path="> LOADED_MODULES"
          title="Skills & Toolchain"
          description="The stack I use to design, build, and ship intelligent systems."
        />

        <div className="grid gap-5 md:grid-cols-2">
          {groups.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.08}>
              <div className="h-full rounded-lg border border-border/70 bg-card/60 p-6 transition-colors hover:border-primary/40">
                {/* Category header */}
                <div className="mb-5 flex items-center gap-3">
                  <span className="inline-flex size-10 items-center justify-center rounded-md border border-border bg-background text-primary">
                    <group.icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-mono text-base font-semibold text-foreground">
                      {group.title}
                    </h3>
                    <p className="font-mono text-xs text-muted-foreground">
                      {group.tag}
                    </p>
                  </div>
                </div>

                {/* Skill chips */}
                <ul className="flex flex-wrap gap-2.5">
                  {group.skills.map((skill) => (
                    <li key={skill.name}>
                      <span className="group/skill flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/60 hover:text-foreground hover:shadow-[0_0_16px_-4px_hsl(188_94%_43%/0.55)]">
                        <skill.icon className="size-4 text-muted-foreground transition-colors group-hover/skill:text-primary" />
                        {skill.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
