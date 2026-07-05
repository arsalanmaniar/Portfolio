"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { GithubIcon } from "@/components/brand-icons";
import { socials } from "@/lib/nav";

type Project = {
  name: string;
  description: string;
  tech: string[];
  image?: string;
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
    image: "/projects/ai-chatbot.jpeg",
    demo: "https://arsalanmaniar-ai-chatbot.hf.space/demo",
    source: "https://github.com/arsalanmaniar/ai-chatbot-project",
    featured: true,
  },
  {
    name: "AI Resume Optimizer",
    description:
      "An AI-powered resume analysis and optimization tool that tailors resumes to job descriptions and surfaces improvements for stronger ATS match rates.",
    tech: ["Next.js", "TypeScript", "OpenAI API"],
    image: "/projects/ai-resume.jpeg",
    demo: "https://ai-resume-optimizer-ebon.vercel.app/",
    source: "https://github.com/arsalanmaniar/ai-resume-optimizer",
  },
  {
    name: "AI Book",
    description:
      "An AI-powered interactive book experience that generates and personalizes reading content on the fly.",
    tech: ["Next.js", "TypeScript", "AI Integration"],
    image: "/projects/ai-book.jpeg",
    demo: "https://ai-book-two-kohl.vercel.app/",
    source: "https://github.com/arsalanmaniar/Ai-Book",
  },
  {
    name: "Todo Application (Kubernetes)",
    description:
      "A full-stack todo app containerized with Docker and orchestrated on Kubernetes as part of a multi-phase cloud-native build.",
    tech: ["Next.js", "Docker", "Kubernetes"],
    image: "/projects/to-do-app.jpeg",
    demo: "https://to-do-ai-chat-application.vercel.app/",
    source:
      "https://github.com/arsalanmaniar/To-do-Application_Kubernetes_Phase-V",
  },
  {
    name: "Animated Web Page",
    description:
      "A motion-rich landing page showcasing modern CSS and JavaScript animation techniques.",
    tech: ["HTML", "CSS", "JavaScript", "Animations"],
    image: "/projects/animated-web.jpeg",
    demo: "https://animated-web-page-cjyy.vercel.app/",
    source: "https://github.com/arsalanmaniar/Animated-Web-Page",
  },
  {
    name: "Unit Convertor",
    description:
      "A clean Streamlit app for converting between common units of measurement — length, weight, temperature and more.",
    tech: ["Python", "Streamlit"],
    image: "/projects/unit-convertor.jpeg",
    demo: "https://unitconvertor-byarsalan.streamlit.app/",
    source: "https://github.com/arsalanmaniar/unit_convertor",
  },
  {
    name: "Personal Library Manager",
    description:
      "A Streamlit tool to catalogue, search, and manage a personal book collection with a simple, fast interface.",
    tech: ["Python", "Streamlit"],
    image: "/projects/personal-library.jpg",
    demo: "https://personallibrarymanager-ar.streamlit.app/",
    source: "https://github.com/arsalanmaniar/personal_library_manager",
  },
  {
    name: "SIUT Feedback Form",
    description:
      "A responsive feedback form built for SIUT with clean layout and client-side validation.",
    tech: ["Next.js", "Supabase", "TypeScript"],
    image: "/projects/siut-feedback.jpeg",
    source: "https://github.com/arsalanmaniar/siut-feedback-foam",
  },
  {
    name: "Password Strength Checker",
    description:
      "A Streamlit app that analyzes password strength in real-time, checking length, special characters, and complexity.",
    tech: ["Python", "Streamlit"],
    image: "/projects/password-checker.jpeg",
    demo: "https://password-strength-meter-to-arsalan.streamlit.app/",
    source: "https://github.com/arsalanmaniar/password_strength_meter",
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
      whileHover={{ y: -8, rotateX: 2, rotateY: 2 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      style={{ transformPerspective: 800 }}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-gray-900/80 backdrop-blur-sm transition-[border-color,box-shadow] duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:shadow-[0_20px_60px_rgba(6,182,212,0.15)] ${
        project.featured
          ? "border-cyan-500/40 shadow-[0_0_34px_-8px_rgba(6,182,212,0.4)]"
          : "border-white/5 hover:border-cyan-500/30"
      }`}
    >
      {/* Subtle top→bottom gradient overlay */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-transparent to-black/40" />

      {project.featured ? (
        <span className="absolute right-4 top-4 z-20 rounded-full border border-cyan-500/50 bg-background/80 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-cyan-300 shadow-[0_0_16px_rgba(6,182,212,0.65)] backdrop-blur">
          Featured
        </span>
      ) : null}

      {project.image ? (
        <div className="relative z-10 overflow-hidden">
          <Image
            src={project.image}
            alt={`${project.name} screenshot`}
            width={600}
            height={340}
            className={`w-full object-cover object-top transition-transform duration-500 group-hover:scale-105 ${
              project.featured ? "h-56" : "h-48"
            }`}
          />
        </div>
      ) : null}

      <div className="relative z-10 flex flex-1 flex-col p-6">
        <h3 className="mb-3 font-mono text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
          {project.name}
        </h3>

        <p className="mb-5 flex-1 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <ul className="mb-6 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <li
              key={t}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-secondary"
            >
              {t}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-3">
          {project.demo ? (
            <Link
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-black transition duration-200 hover:scale-105 hover:brightness-110"
            >
              <ExternalLink className="size-4" />
              Live Demo
            </Link>
          ) : null}
          <Link
            href={project.source}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-foreground transition duration-200 hover:border-white/30 hover:bg-white/10"
          >
            <GithubIcon className="size-4" />
            GitHub
          </Link>
        </div>
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
