"use client";

import React from "react";
import Button from "@/components/ui/Button";
import { Factory } from "lucide-react";

export default function ManufacturingPreview() {
  return (
    <section className="py-20 bg-slate-900/50 border-t border-slate-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold uppercase tracking-wider">
              <Factory className="w-3.5 h-3.5" />
              <span>Plant Infrastructure</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Where Engineering Meets <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
                Manufacturing Excellence
              </span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Our modern fabrication plant houses state-of-the-art CNC tool milling centers, heavy welding bays, electrical assembly benches, and dedicated endurance testing stations. Every machine undergoes rigorous quality inspection prior to dispatch.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-2xl font-bold text-orange-400 font-mono">15,000+</div>
                <div className="text-xs text-slate-400 mt-1">Sq. Ft. Production Floor</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-2xl font-bold text-sky-400 font-mono">100%</div>
                <div className="text-xs text-slate-400 mt-1">Quality Inspection Tested</div>
              </div>
            </div>

            <div className="pt-2">
              <Button href="/manufacturing-unit" variant="accent" size="md" showArrow>
                Explore Our Manufacturing Unit
              </Button>
            </div>
          </div>

          {/* Graphic / Image Collage */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 aspect-[4/3]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80"
                    alt="Assembly Floor"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 aspect-square">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80"
                    alt="Precision CNC Machining"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-6">
                <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 aspect-square">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80"
                    alt="Quality Testing"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 aspect-[4/3]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80"
                    alt="Dispatch Ready Stock"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
