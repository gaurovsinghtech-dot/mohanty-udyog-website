"use client";

import React, { useState } from "react";
import Link from "next/link";
import LightboxModal from "@/components/ui/LightboxModal";
import { sampleGalleryImages } from "@/data/sampleData";
import { Maximize2, ArrowRight } from "lucide-react";

export default function GalleryPreview() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-slate-950 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-orange-500 text-xs font-semibold uppercase tracking-wider">
              Visual Showcase
            </span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight mt-1">
              Manufacturing & Installation Gallery
            </h2>
          </div>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-xs font-semibold text-orange-400 hover:text-orange-300 transition-colors"
          >
            <span>View Full Gallery</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleGalleryImages.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(idx)}
              className="group relative bg-slate-900 border border-slate-800 hover:border-orange-500/50 rounded-2xl overflow-hidden cursor-pointer aspect-[4/3] shadow-lg"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md border border-slate-800 text-orange-400 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full">
                {item.category}
              </div>

              <div className="absolute top-3 right-3 p-2 rounded-lg bg-slate-950/80 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4 text-orange-400" />
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h4 className="text-sm font-bold truncate">{item.title}</h4>
                <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <LightboxModal
        items={sampleGalleryImages}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(newIndex) => setLightboxIndex(newIndex)}
      />
    </section>
  );
}
