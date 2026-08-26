"use client";

import React from "react";
import Link from "next/link";
import { sampleTestimonials } from "@/data/sampleData";
import { Star, Quote, ArrowRight } from "lucide-react";

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-slate-950 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-orange-500 text-xs font-semibold uppercase tracking-wider">
              Client Feedback
            </span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight mt-1">
              Trusted by Manufacturing Plant Owners
            </h2>
          </div>
          <Link
            href="/testimonials"
            className="inline-flex items-center gap-2 text-xs font-semibold text-orange-400 hover:text-orange-300 transition-colors"
          >
            <span>Read All Client Reviews</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sampleTestimonials.map((t) => (
            <div
              key={t.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative flex flex-col justify-between shadow-lg"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-700" />
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>

              <div className="pt-6 border-t border-slate-800/80 mt-6 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">{t.name}</h4>
                  <div className="text-xs text-orange-400 font-medium">{t.company}</div>
                  <div className="text-[11px] text-slate-500">{t.location}</div>
                </div>
                <span className="text-[10px] font-mono bg-slate-950 border border-slate-800 text-slate-400 px-2 py-1 rounded">
                  {t.machineUsed}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
