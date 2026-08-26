"use client";

import React from "react";
import Button from "@/components/ui/Button";
import { MessageSquare, PhoneCall, Cpu } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function FinalCTASection() {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-t border-slate-800 relative overflow-hidden">
      {/* Background Radial Glow & Grid */}
      <div className="absolute inset-0 bg-industrial-grid opacity-25 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-orange-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-orange-500/30 text-orange-400 text-xs font-semibold uppercase tracking-wider shadow-sm">
          <Cpu className="w-4 h-4 text-orange-500 animate-pulse" />
          <span>START OR EXPAND YOUR PLANT</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-3xl mx-auto font-sans">
          Ready to Build or Upgrade Your Production Setup?
        </h2>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Talk to our senior engineering team about machine selection, raw paper material rolls, power requirements, and Pan-India installation support.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Button href="/contact" variant="accent" size="lg" showArrow>
            Request a Free Quote
          </Button>

          <Button href="/contact" variant="outline" size="lg">
            <PhoneCall className="w-4 h-4 mr-2 text-orange-500" />
            Contact Sales Team
          </Button>

          <a
            href={`https://wa.me/${siteConfig.whatsapp.replace(/\+/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-800 hover:bg-emerald-900/90 rounded-md transition-colors shadow-lg"
          >
            <MessageSquare className="w-4 h-4 fill-emerald-400/20" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
