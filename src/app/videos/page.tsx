"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Play,
  X,
  Zap,
  Cog,
  Users,
  Globe2,
  Trophy,
} from "lucide-react";
import { sampleVideos } from "@/data/sampleData";

export default function VideosPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Videos");
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const categories = [
    "All Videos",
    "About Us",
    "Manufacturing Unit",
    "Machines",
    "Production Process",
    "Installation",
    "Customer Feedback",
  ];

  const filteredVideos =
    selectedCategory === "All Videos"
      ? sampleVideos
      : sampleVideos.filter((v) => v.category === selectedCategory);

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
            <span className="text-white">Videos</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
            OUR <span className="text-green-500">VIDEOS</span>
          </h1>

          <p className="max-w-2xl text-sm sm:text-base text-gray-300 leading-relaxed">
            Watch our videos to see our advanced machinery, manufacturing process and commitment to quality.
          </p>
        </div>
      </section>

      {/* 2. Category Filter Tabs */}
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
              {cat === "All Videos" && <Play className="w-3.5 h-3.5 fill-current" />}
              <span>{cat}</span>
            </button>
          ))}
        </div>
      </section>

      {/* 3. 12 Video Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              onClick={() => setActiveVideo(video.videoUrl)}
              className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 group cursor-pointer hover:shadow-md transition-all flex flex-col"
            >
              <div className="relative h-48 w-full bg-slate-900">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/90 text-red-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-red-600 ml-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  {video.duration}
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h3 className="text-xs font-bold text-gray-900 leading-snug group-hover:text-red-700 transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-[11px] text-gray-600 mt-1 line-clamp-2 leading-relaxed">
                    {video.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Stats Counter Bar */}
      <section className="bg-white border-y border-gray-200 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
          <div>
            <Zap className="w-6 h-6 text-red-600 mx-auto mb-2" />
            <div className="text-2xl font-black text-gray-900">36,000+</div>
            <div className="text-xs font-medium text-gray-600">Plates Per Day Production</div>
          </div>
          <div>
            <Cog className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-black text-gray-900">50+</div>
            <div className="text-xs font-medium text-gray-600">Advanced Machines</div>
          </div>
          <div>
            <Users className="w-6 h-6 text-red-600 mx-auto mb-2" />
            <div className="text-2xl font-black text-gray-900">5000+</div>
            <div className="text-xs font-medium text-gray-600">Happy Customers</div>
          </div>
          <div>
            <Globe2 className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-black text-gray-900">25+</div>
            <div className="text-xs font-medium text-gray-600">States Served</div>
          </div>
          <div>
            <Trophy className="w-6 h-6 text-red-600 mx-auto mb-2" />
            <div className="text-2xl font-black text-gray-900">15+</div>
            <div className="text-xs font-medium text-gray-600">Years of Excellence</div>
          </div>
        </div>
      </section>

      {/* Video Lightbox Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl bg-black rounded-xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-3 right-3 text-white bg-black/60 p-2 rounded-full hover:bg-red-600 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="aspect-video w-full">
              <iframe
                src={`${activeVideo}?autoplay=1`}
                title="Mohanty Udyog Video"
                className="w-full h-full border-0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
