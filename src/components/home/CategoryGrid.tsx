"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Cpu, Layers, Wrench, Package } from "lucide-react";

export default function CategoryGrid() {
  const categories = [
    {
      id: "cat-1",
      title: "Automatic Paper Plate Machines",
      description: "High-speed double die & single die machines for mass plate manufacturing with minimal labor.",
      href: "/products?category=automatic",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
      icon: Cpu,
      badge: "High Demand",
    },
    {
      id: "cat-2",
      title: "Hydraulic Machinery & Thali Presses",
      description: "Heavy tonnage hydraulic presses designed for deep-draw thalis, buffet plates, and heavy GSM board.",
      href: "/products?category=hydraulic",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
      icon: Layers,
      badge: "Heavy Duty",
    },
    {
      id: "cat-3",
      title: "Raw Material Rolls & Silver Foils",
      description: "Food-grade PE coated paper rolls, silver lamination film reels, and custom printed stock.",
      href: "/products?category=raw-materials",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
      icon: Package,
      badge: "Bulk Stock",
    },
    {
      id: "cat-4",
      title: "Genuine Spare Parts & CNC Dies",
      description: "Hardened steel thali dies, ceramic ring heaters, cams, solenoid valves, and replacement spares.",
      href: "/products?category=spare-parts",
      image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
      icon: Wrench,
      badge: "Precision Milled",
    },
  ];

  return (
    <section className="py-20 bg-slate-900/60 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-orange-500 text-xs font-semibold uppercase tracking-wider">
              Machinery Spectrum
            </span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight mt-1">
              Explore Our Product Categories
            </h2>
          </div>
          <p className="text-slate-400 text-sm max-w-md">
            Complete manufacturing solutions from heavy forming machinery to raw paper reels and replacement parts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                className="group relative bg-slate-900 border border-slate-800 hover:border-orange-500/50 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-2xl hover:shadow-orange-500/10"
              >
                {/* Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

                  <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-orange-400 border border-orange-500/30 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full">
                    {cat.badge}
                  </span>

                  <div className="absolute bottom-3 left-3 p-2 rounded-xl bg-orange-600 text-white shadow-lg">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-orange-400 transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed mt-2">
                      {cat.description}
                    </p>
                  </div>

                  <Link
                    href={cat.href}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-orange-400 hover:text-orange-300 transition-colors pt-2 group/btn"
                  >
                    <span>Explore Category</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
