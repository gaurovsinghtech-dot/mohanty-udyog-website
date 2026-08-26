"use client";

import React from "react";
import { ShieldCheck, Wrench, Headphones, TrendingUp, Cpu, Award } from "lucide-react";

export default function WhyChooseUsSection() {
  const points = [
    {
      icon: ShieldCheck,
      title: "Quality Machinery Build",
      description: "Hardened steel components, heavy-duty cast frames, and certified electrical wiring built for round-the-clock commercial operations.",
    },
    {
      icon: Cpu,
      title: "Technical Engineering Expertise",
      description: "Over a decade of specialized industrial design, CNC die machining, and hydraulic press optimization.",
    },
    {
      icon: Wrench,
      title: "Turnkey Installation Support",
      description: "Complete machine dispatch, power connection assistance, site leveling, and hands-on operator training.",
    },
    {
      icon: Headphones,
      title: "Dedicated After-Sales Service",
      description: "Pan-India field technician network and rapid response phone/WhatsApp support to resolve any operational queries.",
    },
    {
      icon: Award,
      title: "Genuine Spare Parts & Dies",
      description: "Ready availability of CNC hardened steel dies, heating rings, solenoids, cams, and replacement belts.",
    },
    {
      icon: TrendingUp,
      title: "Business-Focused High ROI",
      description: "Engineered for high output per kWh power input, low paper waste percentage, and fast initial capital payback.",
    },
  ];

  return (
    <section className="py-20 bg-slate-900/40 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-orange-500 text-xs font-semibold uppercase tracking-wider">
            Industrial Superiority
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why Industrial Manufacturers Partner With Us
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            We don&apos;t just sell machinery — we partner with manufacturing business owners to build reliable, profitable production lines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {points.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800/90 hover:border-orange-500/40 rounded-2xl p-6 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-orange-500/5 group"
              >
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-orange-500 w-fit mb-4 group-hover:scale-110 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
                  {pt.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mt-2">
                  {pt.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
