import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "K. Pavan | AI Engineer & Full Stack Developer",
  description:
    "Portfolio of K. Pavan — AI Engineer and Full Stack Developer specializing in Machine Learning, Deep Learning, LLMs, and scalable full-stack applications.",
  keywords: [
    "AI Engineer",
    "Full Stack Developer",
    "Machine Learning",
    "Deep Learning",
    "Portfolio",
    "K. Pavan",
    "React",
    "Next.js",
    "Python",
  ],
  authors: [{ name: "K. Pavan" }],
  openGraph: {
    title: "K. Pavan | AI Engineer & Full Stack Developer",
    description:
      "AI Engineer and Full Stack Developer with hands-on experience in building end-to-end applications and AI-powered solutions.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} dark`}
    >
      <body className="min-h-screen bg-background text-foreground font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
