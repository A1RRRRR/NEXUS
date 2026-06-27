"use client";
import { Phone } from "lucide-react";

export default function PhoneFloat() {
  return (
    <a href="tel:+15558007663" className="phone-float" aria-label="Call us">
      <Phone size={20} />
      <span>(555) 800-ROOF</span>
    </a>
  );
}
