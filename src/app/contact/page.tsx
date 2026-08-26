"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Headphones,
  Send,
  CheckCircle2,
  Globe,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { siteConfig } from "@/config/site";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    recaptcha: false,
    website_hp: "",
  });
  const [formRenderTime] = useState<number>(() => Date.now());
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }

    const cleanPhone = formData.phone.replace(/\D/g, "");
    const isValidPhone = cleanPhone.length === 10 || (cleanPhone.length === 12 && cleanPhone.startsWith("91"));
    if (!isValidPhone) {
      setErrorMessage("Please enter a valid 10-digit mobile number (e.g. 9876543210).");
      return;
    }

    setSubmitted(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          productInterested: formData.subject || "General Inquiry",
          message: formData.message,
          website_hp: formData.website_hp,
          formRenderTime,
          source: "Contact Form",
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setSubmitted(false);
        setErrorMessage(data.message || "Failed to submit message.");
        return;
      }
    } catch (err) {
      console.error("Failed to post lead to API:", err);
      setSubmitted(false);
      setErrorMessage("An unexpected network error occurred.");
    }
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          recaptcha: false,
          website_hp: "",
        });
      }, 5000);
  };

  const contactCards = [
    {
      icon: MapPin,
      title: "OUR LOCATION",
      detail: siteConfig.address,
    },
    {
      icon: Phone,
      title: "CALL US",
      detail: `${siteConfig.phone}\n${siteConfig.altPhone}\n${siteConfig.salesPhone} (Sales)`,
    },
    {
      icon: Mail,
      title: "EMAIL US",
      detail: siteConfig.email,
    },
    {
      icon: Clock,
      title: "WORKING HOURS",
      detail: "Mon - Sat: 9:30 AM - 6:30 PM\nSunday: Closed",
    },
    {
      icon: Headphones,
      title: "AFTER SALES SUPPORT",
      detail: "24/7 Support\nWe reply within 24 hrs",
    },
  ];

  return (
    <div className="w-full bg-slate-50 text-gray-900 font-sans">
      {/* 1. Hero Banner */}
      <section className="relative bg-neutral-900 text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1600&q=80')",
          }}
        />
        <div className="relative max-w-7xl mx-auto space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>&gt;</span>
            <span className="text-white">Contact Us</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
            CONTACT <span className="text-green-500">US</span>
          </h1>

          <p className="max-w-2xl text-sm sm:text-base text-gray-300 leading-relaxed">
            We are here to help you with the best paper plate making machines and reliable support. Get in touch with us today!
          </p>
        </div>
      </section>

      {/* 2. 5 Contact Info Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {contactCards.map((c, i) => {
            const Icon = c.icon;
            return (
              <div
                key={i}
                className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm text-center flex flex-col items-center justify-between"
              >
                <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 border border-red-100 flex items-center justify-center mb-3">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xs font-extrabold text-gray-900 uppercase mb-2">
                  {c.title}
                </h3>
                <p className="text-xs text-gray-600 whitespace-pre-line leading-relaxed">
                  {c.detail}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Form & Address / Map Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: SEND US A MESSAGE Form */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-xl border border-gray-200 shadow-sm space-y-6">
            <div className="space-y-1">
              <h2 className="text-lg font-black text-gray-900 uppercase">
                SEND US A MESSAGE
              </h2>
              <p className="text-xs text-gray-500">
                Fill out the form below and our team will get back to you shortly.
              </p>
            </div>

            {submitted ? (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span>Thank you! Your message has been received. Our team will contact you shortly.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Invisible Honeypot Captcha Field */}
                <input
                  type="text"
                  name="website_hp"
                  value={formData.website_hp}
                  onChange={(e) => setFormData({ ...formData, website_hp: e.target.value })}
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                {errorMessage && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs font-semibold">
                    {errorMessage}
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-gray-700 block mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded p-2.5 text-xs text-gray-900 focus:outline-none focus:border-red-700"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-gray-700 block mb-1">Your Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded p-2.5 text-xs text-gray-900 focus:outline-none focus:border-red-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-gray-700 block mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded p-2.5 text-xs text-gray-900 focus:outline-none focus:border-red-700"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-gray-700 block mb-1">Subject *</label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded p-2.5 text-xs text-gray-900 focus:outline-none focus:border-red-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-1">Your Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded p-2.5 text-xs text-gray-900 focus:outline-none focus:border-red-700"
                  />
                </div>

                <div className="flex items-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded text-xs text-gray-600">
                  <input
                    type="checkbox"
                    id="recaptcha"
                    checked={formData.recaptcha}
                    onChange={(e) => setFormData({ ...formData, recaptcha: e.target.checked })}
                    className="rounded text-red-700 focus:ring-0"
                  />
                  <label htmlFor="recaptcha" className="cursor-pointer">I&apos;m not a robot</label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-700 hover:bg-red-800 text-white font-extrabold text-xs uppercase tracking-wider py-3 rounded shadow transition-colors flex items-center justify-center gap-2"
                >
                  <span>SEND MESSAGE</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* Middle: GET IN TOUCH Details */}
          <div className="lg:col-span-3 space-y-6">
            <div className="space-y-1">
              <h2 className="text-lg font-black text-gray-900 uppercase">
                GET IN TOUCH
              </h2>
              <p className="text-xs text-gray-500 leading-relaxed">
                Have questions about our machines or need a quotation? Reach out to us using the details below or visit our office.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-gray-900 block uppercase font-extrabold">Address</strong>
                  <span className="text-gray-600 block leading-relaxed">
                    Mohanty Udyog<br />
                    IDCO Road, Jagatpur Industrial Estate,<br />
                    Jagatpur, Cuttack, Odisha - 754021, India
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-gray-900 block uppercase font-extrabold">Phone</strong>
                  <span className="text-gray-600 block">{siteConfig.phone}</span>
                  <span className="text-gray-600 block">{siteConfig.altPhone}</span>
                  <span className="text-gray-600 block text-[11px] text-gray-500 font-medium">{siteConfig.salesPhone} (SK Tazuddin - Sales)</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-gray-900 block uppercase font-extrabold">Email</strong>
                  <span className="text-gray-600 block">{siteConfig.email}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-gray-900 block uppercase font-extrabold">Website</strong>
                  <span className="text-gray-600 block">www.mohantyudyog.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Map Box */}
          <div className="lg:col-span-4 bg-white p-2 rounded-xl border border-gray-200 shadow-sm flex flex-col">
            <div className="relative w-full h-80 sm:h-full rounded-lg overflow-hidden bg-slate-800">
              <iframe
                title="Mohanty Udyog Map Location"
                src="https://maps.google.com/maps?q=IDCO%20Road,%20Jagatpur%20Industrial%20Estate,%20Jagatpur,%20Cuttack,%20Odisha%20754021&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. NEED A QUICK QUOTE? CTA Bar */}
      <section className="bg-black text-white py-10 px-4 sm:px-6 lg:px-8 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xl font-black uppercase tracking-tight">
              NEED A QUICK QUOTE?
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Tell us your requirements and get the best solution for your business.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-red-700 hover:bg-red-800 text-white text-xs font-bold uppercase py-2.5 px-4 rounded shadow transition-colors"
            >
              <span>REQUEST QUOTATION</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-neutral-900 rounded-lg border border-neutral-800 space-y-1">
              <Zap className="w-6 h-6 text-green-500 mx-auto mb-1" />
              <h4 className="text-xs font-bold text-white">Quick Response</h4>
              <p className="text-[11px] text-gray-400">We respond within 24 hours</p>
            </div>

            <div className="p-4 bg-neutral-900 rounded-lg border border-neutral-800 space-y-1">
              <ShieldCheck className="w-6 h-6 text-green-500 mx-auto mb-1" />
              <h4 className="text-xs font-bold text-white">Expert Support</h4>
              <p className="text-[11px] text-gray-400">Get advice from our experts</p>
            </div>

            <div className="p-4 bg-neutral-900 rounded-lg border border-neutral-800 space-y-1">
              <CheckCircle2 className="w-6 h-6 text-green-500 mx-auto mb-1" />
              <h4 className="text-xs font-bold text-white">Best Solutions</h4>
              <p className="text-[11px] text-gray-400">Customized machines for your needs</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
