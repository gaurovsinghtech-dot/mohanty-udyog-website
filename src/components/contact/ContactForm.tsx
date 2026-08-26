"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, ShieldCheck } from "lucide-react";
import { sampleProducts } from "@/data/sampleData";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    productInterested: "Automatic Double Die Paper Plate Machine",
    requirement: "1 Machine Setup",
    city: "",
    state: "",
    contactMethod: "Phone",
    message: "",
    website_hp: "",
  });

  const [formRenderTime] = useState<number>(() => Date.now());
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Client validation
    if (!formData.name.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }
    const cleanPhone = formData.phone.replace(/\D/g, "");
    const isValidPhone = cleanPhone.length === 10 || (cleanPhone.length === 12 && cleanPhone.startsWith("91"));
    if (!isValidPhone) {
      setErrorMessage("Please enter a valid 10-digit mobile number (e.g. 9876543210).");
      return;
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          formRenderTime,
          source: "Contact Us Page Form",
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to submit enquiry.");
      }

      setSubmitted(true);
      setFormData({
        name: "",
        phone: "",
        email: "",
        company: "",
        productInterested: "Automatic Double Die Paper Plate Machine",
        requirement: "1 Machine Setup",
        city: "",
        state: "",
        contactMethod: "Phone",
        message: "",
        website_hp: "",
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      <div className="border-b border-slate-800 pb-4 mb-6">
        <span className="text-orange-500 text-xs font-semibold uppercase tracking-wider">
          Direct Sales Enquiry
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
          Request Price Quote & Machine Consultation
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Fill out the form below. Our Pan-India technical sales team will contact you within 2 business hours.
        </p>
      </div>

      {submitted ? (
        <div className="py-12 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-950/50">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white">Enquiry Submitted Successfully!</h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
            Thank you for reaching out to Apex Machina. Our technical service desk has received your request and will call or WhatsApp you with quotation details.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Submit Another Enquiry
          </button>
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
            <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-300 text-xs font-medium">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Full Name *
              </label>
              <input
                id="contact-name"
                type="text"
                required
                placeholder="e.g. Rajesh Kumar"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label htmlFor="contact-phone" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Phone / WhatsApp Number *
              </label>
              <input
                id="contact-phone"
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Business Email
              </label>
              <input
                id="contact-email"
                type="email"
                placeholder="sales@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label htmlFor="contact-company" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Company / Firm Name
              </label>
              <input
                id="contact-company"
                type="text"
                placeholder="e.g. Standard Packaging Industries"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="contact-product" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Product Interested In *
              </label>
              <select
                id="contact-product"
                value={formData.productInterested}
                onChange={(e) => setFormData({ ...formData, productInterested: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500 cursor-pointer"
              >
                {sampleProducts.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name}
                  </option>
                ))}
                <option value="Custom Plant Setup Inquiry">Custom Plant Setup Inquiry</option>
                <option value="Raw Materials Only">Raw Material Paper Rolls Only</option>
                <option value="Spare Parts & Dies Only">Spare Parts & Dies Only</option>
              </select>
            </div>

            <div>
              <label htmlFor="contact-requirement" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Requirement / Quantity
              </label>
              <input
                id="contact-requirement"
                type="text"
                placeholder="e.g. 2 Double Die Machines + Raw Rolls"
                value={formData.requirement}
                onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="contact-city" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                City / Town
              </label>
              <input
                id="contact-city"
                type="text"
                placeholder="e.g. Ahmedabad"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label htmlFor="contact-state" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                State
              </label>
              <input
                id="contact-state"
                type="text"
                placeholder="e.g. Gujarat"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label htmlFor="contact-method" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Preferred Contact Method
              </label>
              <select
                id="contact-method"
                value={formData.contactMethod}
                onChange={(e) => setFormData({ ...formData, contactMethod: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500 cursor-pointer"
              >
                <option value="Phone">Phone Call</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="Email">Email</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Message / Additional Operational Notes
            </label>
            <textarea
              id="contact-message"
              rows={4}
              placeholder="Tell us about your plant location, power supply availability, or requested delivery timeline..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-orange-500 resize-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-slate-800/80">
            <div className="flex items-center gap-1.5 text-xs text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Your contact information is strictly confidential.</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-orange-600 hover:bg-orange-500 disabled:opacity-50 text-white font-semibold text-xs px-6 py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-orange-600/30 cursor-pointer"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Send Enquiry</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
