"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Send, CheckCircle, Loader2 } from "lucide-react";

type FormData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  service: string;
  roofAge: string;
  urgency: string;
  message: string;
};

const services = [
  "Full Roof Replacement",
  "Roof Repair",
  "Storm / Hail Damage",
  "Commercial Roofing",
  "Gutter Installation",
  "Roof Inspection",
  "Emergency Service",
  "Other",
];

const urgencies = [
  "Emergency — same day",
  "This week",
  "Within 2–4 weeks",
  "Planning ahead (1–3 months)",
];

export default function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    // In production: POST to /api/quote or a form service like Formspree / SendGrid
    await new Promise((r) => setTimeout(r, 1200)); // simulate network
    console.log("Quote request:", data);
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="card p-12 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-green-500" />
        </div>
        <h2 className="text-3xl font-black text-brand-navy mb-3">
          Request Received!
        </h2>
        <p className="text-slate-500 max-w-md mx-auto mb-8">
          We&apos;ll review your project details and reach out within 24 hours to
          schedule your free inspection. Check your email for a confirmation.
        </p>
        <div className="bg-orange-50 border border-orange-100 rounded-xl p-5 max-w-sm mx-auto">
          <div className="text-sm font-semibold text-orange-700">Need to reach us sooner?</div>
          <a href="tel:+15558007663" className="text-orange-600 font-black text-lg hover:underline">
            (555) 800-ROOF
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-black text-brand-navy mb-1">Request Your Free Quote</h2>
        <p className="text-slate-400 text-sm">We&apos;ll respond within 24 hours.</p>
      </div>

      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Full Name *
          </label>
          <input
            type="text"
            placeholder="John Smith"
            className={`w-full border rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-400 transition ${
              errors.name ? "border-red-400" : "border-slate-200"
            }`}
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Email Address *
          </label>
          <input
            type="email"
            placeholder="john@email.com"
            className={`w-full border rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-400 transition ${
              errors.email ? "border-red-400" : "border-slate-200"
            }`}
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* Phone + Address */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Phone Number *
          </label>
          <input
            type="tel"
            placeholder="(555) 000-0000"
            className={`w-full border rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-400 transition ${
              errors.phone ? "border-red-400" : "border-slate-200"
            }`}
            {...register("phone", { required: "Phone is required" })}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Property Address *
          </label>
          <input
            type="text"
            placeholder="123 Main St, City, ST"
            className={`w-full border rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-400 transition ${
              errors.address ? "border-red-400" : "border-slate-200"
            }`}
            {...register("address", { required: "Address is required" })}
          />
          {errors.address && (
            <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
          )}
        </div>
      </div>

      {/* Service + Urgency */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Service Needed *
          </label>
          <select
            className={`w-full border rounded-xl px-4 py-3 text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition ${
              errors.service ? "border-red-400" : "border-slate-200"
            }`}
            {...register("service", { required: "Please select a service" })}
          >
            <option value="">Select a service…</option>
            {services.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {errors.service && (
            <p className="text-red-500 text-xs mt-1">{errors.service.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            How Soon? *
          </label>
          <select
            className={`w-full border rounded-xl px-4 py-3 text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition ${
              errors.urgency ? "border-red-400" : "border-slate-200"
            }`}
            {...register("urgency", { required: true })}
          >
            <option value="">Select timeframe…</option>
            {urgencies.map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Roof age */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
          Approximate Roof Age
        </label>
        <select
          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
          {...register("roofAge")}
        >
          <option value="">I&apos;m not sure</option>
          <option value="0-5">0–5 years</option>
          <option value="5-10">5–10 years</option>
          <option value="10-15">10–15 years</option>
          <option value="15-20">15–20 years</option>
          <option value="20+">20+ years</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
          Tell Us More (Optional)
        </label>
        <textarea
          rows={4}
          placeholder="Describe the issue, visible damage, any concerns, or questions you have…"
          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-400 transition resize-none"
          {...register("message")}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full justify-center text-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {loading ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Send size={20} />
            Send My Free Quote Request
          </>
        )}
      </button>

      <p className="text-xs text-slate-400 text-center">
        Your information is private and will never be shared or sold.
      </p>
    </form>
  );
}
