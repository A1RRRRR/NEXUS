import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NEXUS AI — Neural Market Intelligence for Elite Traders",
  description:
    "Real-time AI-powered trading signals trusted by 12,847 professional traders. 89.3% verified win rate. Institutional-grade intelligence at €299/month.",
  keywords:
    "AI trading signals, market intelligence, crypto signals, stock alerts, portfolio AI, trading platform",
  openGraph: {
    title: "NEXUS AI — Neural Market Intelligence",
    description:
      "Real-time AI signals for crypto, equities, and forex. Verified 89.3% win rate. 12,847 active traders.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#02020b] text-[#f8f8ff]">
        {children}
      </body>
    </html>
  );
}
