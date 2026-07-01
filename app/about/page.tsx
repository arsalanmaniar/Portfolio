import type { Metadata } from "next";

import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";

const title = "About";
const description =
  "About Arsalan Maniar — an AI Engineer & Full Stack Developer in Karachi, Pakistan. Background, core directives, and the Next.js, Python & AI stack behind the build.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    type: "profile",
    url: "/about",
    title: `${title} | Arsalan Maniar`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Arsalan Maniar`,
    description,
  },
};

export default function AboutPage() {
  return (
    <div className="pt-10">
      <AboutSection />
      <SkillsSection />
    </div>
  );
}
