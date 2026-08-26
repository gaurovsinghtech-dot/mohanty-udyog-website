"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Grid,
  X,
  Maximize2,
  Building2,
  Cog,
  CheckCircle2,
  Users,
  ShieldCheck,
} from "lucide-react";
import { sampleGalleryImages } from "@/data/sampleData";

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Photos");
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const categories = [
    "All Photos",
    "Manufacturing Unit",
    "Machinery",
    "Production Process",
    "Finished Products",
    "Team",
  ];

  const filteredImages =
    selectedCategory === "All Photos"
      ? sampleGalleryImages
      : sampleGalleryImages.filter((img) => img.category === selectedCategory);

  const highlights = [
    {
      icon: Building2,
      title: "Advanced Infrastructure",
      desc: "Modern facility with latest technology",
    },
    {
      icon: Cog,
      title: "Latest Machinery",
      desc: "High performance and precision",
    },
    {
      icon: CheckCircle2,
      title: "Quality Assurance",
      desc: "Stringent quality control processes",
    },
    {
      icon: Users,
      title: "Skilled Workforce",
      desc: "Experienced and dedicated team",
    },
    {
      icon: ShieldCheck,
      title: "Safety First",
      desc: "Safe working environment and best practices",
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
            <span className="text-white">Gallery</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
            GAL<span className="text-green-500">LERY</span>
          </h1>

          <p className="max-w-2xl text-sm sm:text-base text-gray-300 leading-relaxed">
            Explore our state-of-the-art manufacturing unit, advanced machinery and production process that ensure superior quality and performance.
          </p>
        </div>
      </section>

      {/* 2. Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider shrink-0 transition-colors flex items-center gap-2 ${
                selectedCategory === cat
                  ? "bg-red-700 text-white shadow"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {cat === "All Photos" && <Grid className="w-3.5 h-3.5" />}
              <span>{cat}</span>
            </button>
          ))}
        </div>
      </section>

      {/* 3. 12 Photo Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredImages.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveImage(item.image)}
              className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 group cursor-pointer hover:shadow-md transition-all flex flex-col"
            >
              <div className="relative h-52 w-full bg-slate-900 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Maximize2 className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="p-3.5 bg-neutral-900 text-white text-center">
                <h3 className="text-xs font-bold tracking-wide uppercase">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Feature Highlights Row (5 Cards) */}
      <section className="bg-white border-y border-gray-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 text-center">
          {highlights.map((h, i) => {
            const Icon = h.icon;
            return (
              <div
                key={i}
                className="p-5 rounded-lg bg-gray-50 border border-gray-200 flex flex-col items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 border border-red-100 flex items-center justify-center mb-1">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold text-gray-900 uppercase">
                  {h.title}
                </h4>
                <p className="text-[11px] text-gray-600">{h.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Photo Lightbox Modal */}
      {activeImage && (
        <div
          onClick={() => setActiveImage(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-4xl max-h-[90vh] bg-black rounded-lg overflow-hidden shadow-2xl">
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-3 right-3 text-white bg-black/60 p-2 rounded-full hover:bg-red-600 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={activeImage}
              alt="Expanded Preview"
              className="w-full h-auto max-h-[85vh] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
