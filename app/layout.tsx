import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { PageTransition } from "@/components/page-transition";
import { ClientFX } from "@/components/client-fx";
import { siteConfig } from "@/lib/site";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: "%s | Arsalan Maniar",
  },
  description: siteConfig.description,
  keywords: [
    "Arsalan Maniar",
    "AI Engineer",
    "Full Stack Developer",
    "Next.js",
    "TypeScript",
    "Python",
    "AI Agents",
    "Karachi",
    "Pakistan",
    "Portfolio",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: siteConfig.twitter,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased md:cursor-none`}
      >
        <ClientFX />
        <Navbar />
        <PageTransition>
          <main className="min-h-screen">{children}</main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}
