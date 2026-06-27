import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PhoneFloat from "@/components/PhoneFloat";

export const metadata: Metadata = {
  title: "ProRoof | Professional Roofing Contractors | Licensed & Insured",
  description:
    "ProRoof is your trusted local roofing company. Expert residential & commercial roofing, repairs, and replacement. Free estimates. 20+ years experience. Call (555) 800-ROOF.",
  keywords: "roofing contractor, roof repair, roof replacement, residential roofing, commercial roofing, free estimate",
  openGraph: {
    title: "ProRoof | Professional Roofing Contractors",
    description: "Expert roofing services. Licensed, insured, and trusted by 500+ homeowners.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <PhoneFloat />
      </body>
    </html>
  );
}
