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
              <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md transition-colors hover:border-cyan-500/30">
                {/* Category header with cyan gradient wash */}
                <div className="mb-5 flex items-center gap-3 rounded-xl bg-gradient-to-r from-cyan-900/30 to-transparent p-3">
                  <span className="inline-flex size-12 items-center justify-center rounded-lg border border-cyan-500/30 bg-background/60 text-cyan-400 shadow-[0_0_20px_-4px_rgba(6,182,212,0.7)]">
                    <group.icon className="size-6" />
                  </span>
                  <div>
                    <h3 className="font-mono text-xs uppercase tracking-widest text-cyan-400">
                      {group.title}
                    </h3>
                    <p className="mt-1 font-mono text-xs text-muted-foreground">
                      {group.tag}
                    </p>
                  </div>
                </div>

                {/* Skill badges — glass cards */}
                <ul className="grid grid-cols-2 gap-2.5">
                  {group.skills.map((skill) => (
                    <li key={skill.name}>
                      <span className="group/skill flex h-full items-center gap-2 rounded-xl border border-white/10 bg-gray-900/60 p-3 backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:border-cyan-500/40 hover:bg-gray-800/80">
                        <skill.icon className="size-6 shrink-0 transition group-hover/skill:brightness-125" />
                        <span className="text-sm font-medium text-gray-300">
                          {skill.name}
                        </span>
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
