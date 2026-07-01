"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "@/components/brand-icons";
import { socials } from "@/lib/nav";

type Project = {
  name: string;
  description: string;
  tech: string[];
  demo?: string;
  source: string;
  featured?: boolean;
};

const projects: Project[] = [
  {
    name: "AI WhatsApp Chatbot",
    description:
      "A conversational AI chatbot that replies on WhatsApp in real time. Powered by Groq's LLMs through a FastAPI backend, with SQLite for chat memory and UltraMsg for message delivery — deployed on Hugging Face.",
    tech: ["Python", "FastAPI", "Groq API", "SQLite", "UltraMsg", "Hugging Face"],
    demo: "https://arsalanmaniar-ai-chatbot.hf.space/demo",
    source: "https://github.com/arsalanmaniar/ai-chatbot-project",
    featured: true,
  },
  {
    name: "AI Resume Optimizer",
    description:
      "An AI-powered resume analysis and optimization tool that tailors resumes to job descriptions and surfaces improvements for stronger ATS match rates.",
    tech: ["Next.js", "TypeScript", "OpenAI API"],
    demo: "https://ai-resume-optimizer-ebon.vercel.app/",
    source: "https://github.com/arsalanmaniar/ai-resume-optimizer",
  },
  {
    name: "AI Book",
    description:
      "An AI-powered interactive book experience that generates and personalizes reading content on the fly.",
    tech: ["Next.js", "TypeScript", "AI Integration"],
    demo: "https://ai-book-two-kohl.vercel.app/",
    source: "https://github.com/arsalanmaniar/Ai-Book",
  },
  {
    name: "Todo Application (Kubernetes)",
    description:
      "A full-stack todo app containerized with Docker and orchestrated on Kubernetes as part of a multi-phase cloud-native build.",
    tech: ["Next.js", "Docker", "Kubernetes"],
    demo: "https://to-do-ai-chat-application.vercel.app/",
    source:
      "https://github.com/arsalanmaniar/To-do-Application_Kubernetes_Phase-V",
  },
  {
    name: "Animated Web Page",
    description:
      "A motion-rich landing page showcasing modern CSS and JavaScript animation techniques.",
    tech: ["HTML", "CSS", "JavaScript", "Animations"],
    demo: "https://animated-web-page-cjyy.vercel.app/",
    source: "https://github.com/arsalanmaniar/Animated-Web-Page",
  },
  {
    name: "Unit Convertor",
    description:
      "A clean Streamlit app for converting between common units of measurement — length, weight, temperature and more.",
    tech: ["Python", "Streamlit"],
    source: "https://github.com/arsalanmaniar/unit_convertor",
  },
  {
    name: "Personal Library Manager",
    description:
      "A Streamlit tool to catalogue, search, and manage a personal book collection with a simple, fast interface.",
    tech: ["Python", "Streamlit"],
    source: "https://github.com/arsalanmaniar/personal_library_manager",
  },
  {
    name: "SIUT Feedback Form",
    description:
      "A responsive feedback form built for SIUT with clean layout and client-side validation.",
    tech: ["Next.js", "Supabase", "TypeScript"],
    source: "https://github.com/arsalanmaniar/siut-feedback-foam",
  },
  {
    name: "Personal Portfolio",
    description:
      "This terminal-themed portfolio — a dark, motion-rich showcase of my work built with the modern web stack.",
    tech: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    source: socials.github,
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group relative flex h-full flex-col rounded-lg border border-border/70 bg-card/60 p-6 transition-colors hover:border-primary/50 hover:shadow-[0_16px_40px_-16px_hsl(188_94%_43%/0.45)]"
    >
      {project.featured ? (
        <span className="absolute right-5 top-5 rounded-full border border-secondary/40 bg-secondary/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-secondary">
          Featured
        </span>
      ) : null}

      <h3 className="mb-3 pr-20 font-mono text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
        {project.name}
      </h3>

      <p className="mb-5 flex-1 text-sm leading-relaxed text-muted-foreground">
        {project.description}
      </p>

      <ul className="mb-6 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <li
            key={t}
            className="rounded-full border border-border bg-background px-3 py-1 font-mono text-xs text-secondary"
          >
            {t}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-3">
        {project.demo ? (
          <Button asChild size="sm" className="font-mono">
            <Link href={project.demo} target="_blank" rel="noreferrer">
              <ExternalLink />
              Live Demo
            </Link>
          </Button>
        ) : null}
        <Button asChild size="sm" variant="outline" className="font-mono">
          <Link href={project.source} target="_blank" rel="noreferrer">
            <GithubIcon />
            GitHub
          </Link>
        </Button>
      </div>
    </motion.article>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="border-t border-border/50 py-24">
      <div className="container">
        <SectionHeading
          path="> DEPLOYED_UNITS"
          title="Projects"
          description="A collection of AI, full-stack, and cloud-native projects I've built and shipped."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.name} delay={i * 0.05} className="h-full">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
