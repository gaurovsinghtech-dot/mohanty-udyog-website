"use client";

import React from "react";
import Button from "@/components/ui/Button";
import { Settings, Check } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="py-20 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Factory Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 p-2 shadow-2xl">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-950">
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80"
                  alt="Industrial Machinery Assembly Floor"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                {/* Overlaid Technical Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md border border-slate-800 p-4 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-orange-500/20 text-orange-400 border border-orange-500/30">
                      <Settings className="w-5 h-5 animate-spin-slow" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white uppercase tracking-wider">
                        Precision Engineering
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Zero-Defect Quality Control
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2.5 py-1 rounded-full">
                    Certified ISO
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold uppercase tracking-wider">
              <span>Why Apex Machina</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Built for Production. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
                Designed for Profit.
              </span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              We specialize in manufacturing heavy-duty automatic and hydraulic paper plate machinery engineered for high continuous output. Whether you are setting up your first manufacturing plant or expanding production capacity, our machines deliver structural durability and fast payback periods.
            </p>

            {/* Feature Points */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-1 rounded bg-orange-500/20 text-orange-400 mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Heavy-Duty Vibration-Free Steel Frame
                  </h4>
                  <p className="text-xs text-slate-400">
                    Constructed with heavy cast iron and hardened structural steel to withstand continuous dual-shift operations.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1 rounded bg-orange-500/20 text-orange-400 mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Full Installation & Operator Training
                  </h4>
                  <p className="text-xs text-slate-400">
                    Our technical team provides on-site machine setup, electrical connection assistance, and operator training.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1 rounded bg-orange-500/20 text-orange-400 mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Ready Stock Raw Material & Spare Parts
                  </h4>
                  <p className="text-xs text-slate-400">
                    Continuous supply of food-grade PE coated paper rolls, heating coils, dies, and maintenance spare parts.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button href="/about" variant="primary" size="md" showArrow>
                Learn More About Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
