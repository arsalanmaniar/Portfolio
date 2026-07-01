import type { Metadata } from "next";

import { ProjectsSection } from "@/components/sections/ProjectsSection";

const title = "Projects";
const description =
  "Selected projects by Arsalan Maniar — AI-powered web apps and systems built with Next.js, Python, FastAPI, and modern LLM tooling.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/projects" },
  openGraph: {
    type: "website",
    url: "/projects",
    title: `${title} | Arsalan Maniar`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Arsalan Maniar`,
    description,
  },
};

export default function ProjectsPage() {
  return (
    <div className="pt-10">
      <ProjectsSection />
    </div>
  );
}
