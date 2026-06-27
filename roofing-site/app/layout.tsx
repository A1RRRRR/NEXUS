import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PhoneFloat from "@/components/PhoneFloat";
import Cursor from "@/components/Cursor";

export const metadata: Metadata = {
  title: "ProRoof | #1 Roofing Contractors | Licensed & Insured",
  description:
    "ProRoof — premium roofing done right. Residential & commercial roofing, emergency repairs. 500+ roofs. 5-star rated. Free estimate. Call (555) 800-ROOF.",
  keywords: "roofing contractor, roof repair, roof replacement, residential roofing, commercial roofing, free estimate",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ cursor: "none" }}>
        <Cursor />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <PhoneFloat />
      </body>
    </html>
  );
}
