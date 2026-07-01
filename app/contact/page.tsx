import type { Metadata } from "next";

import { ContactSection } from "@/components/sections/ContactSection";

const title = "Contact";
const description =
  "Get in touch with Arsalan Maniar — available for freelance projects and collaborations. Reach out via email, LinkedIn, or GitHub.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    url: "/contact",
    title: `${title} | Arsalan Maniar`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Arsalan Maniar`,
    description,
  },
};

export default function ContactPage() {
  return (
    <div className="pt-10">
      <ContactSection />
    </div>
  );
}
