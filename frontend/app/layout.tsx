import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PagePulse AI - AI-Powered Website Auditing",
  description: "Analyze SEO, Accessibility, Content Quality and User Experience in seconds using deterministic analysis and Gemini AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} dark antialiased h-full selection:bg-indigo-500/30 selection:text-indigo-200`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
