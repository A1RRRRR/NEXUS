import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NEXUS AI — Intelligence Platform for Elite Traders",
  description: "Real-time AI-powered trading signals, portfolio intelligence, and market analytics. Beat the market with neural precision.",
  keywords: "AI trading signals, market intelligence, crypto signals, stock alerts, portfolio AI",
  openGraph: {
    title: "NEXUS AI — Intelligence Platform for Elite Traders",
    description: "Real-time AI-powered trading signals trusted by 12,000+ professional traders.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#050508] text-[#f0f0ff]">
        {children}
      </body>
    </html>
  );
}
