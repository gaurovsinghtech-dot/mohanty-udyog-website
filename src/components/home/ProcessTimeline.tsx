"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";

export default function ProcessTimeline() {
  const steps = [
    {
      step: "01",
      title: "Choose Your Machine",
      description: "Select from automatic double die, hydraulic press, or semi-automatic machines based on your budget & output target.",
    },
    {
      step: "02",
      title: "Discuss Requirements",
      description: "Consult our machinery experts for raw material reels, custom dies, electrical loads, and site readiness planning.",
    },
    {
      step: "03",
      title: "Dispatch & Installation",
      description: "Fast Pan-India transit with on-site technician arrival for leveling, wiring, and die mounting.",
    },
    {
      step: "04",
      title: "Training & Setup",
      description: "Hands-on operator orientation for paper reel feeding, stroke speed adjustment, and temperature control.",
    },
    {
      step: "05",
      title: "Commercial Yield",
      description: "Commence commercial batch production with continuous output up to 4,500 plates per hour.",
    },
    {
      step: "06",
      title: "After-Sales Support",
      description: "Enjoy ongoing maintenance service, die re-conditioning, and immediate raw material roll replenishment.",
    },
  ];

  return (
    <section className="py-20 bg-slate-950 border-t border-slate-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-orange-500 text-xs font-semibold uppercase tracking-wider">
            Seamless Onboarding
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Your Journey to Plant Setup
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            From machine selection to commercial manufacturing, we guide you every step of the way.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group hover:border-orange-500/50 transition-all duration-300 shadow-lg"
            >
              {/* Step number watermark */}
              <span className="absolute top-2 right-4 text-5xl font-extrabold text-slate-800/40 group-hover:text-orange-500/10 font-mono transition-colors">
                {item.step}
              </span>

              <div className="flex items-center gap-2 text-xs font-mono font-bold text-orange-400 mb-3">
                <CheckCircle2 className="w-4 h-4 text-orange-500" />
                <span>PHASE {item.step}</span>
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mt-2">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
