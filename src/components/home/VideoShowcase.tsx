"use client";

import React, { useState } from "react";
import Link from "next/link";
import VideoModal from "@/components/ui/VideoModal";
import { sampleVideos } from "@/data/sampleData";
import { Play, Clock, ArrowRight } from "lucide-react";

export default function VideoShowcase() {
  const [activeVideo, setActiveVideo] = useState<{
    url: string;
    title: string;
  } | null>(null);

  return (
    <section className="py-20 bg-slate-900/50 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-orange-500 text-xs font-semibold uppercase tracking-wider">
              Video Demonstrations
            </span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight mt-1">
              Watch Our Machines in Production Action
            </h2>
          </div>
          <Link
            href="/videos"
            className="inline-flex items-center gap-2 text-xs font-semibold text-orange-400 hover:text-orange-300 transition-colors"
          >
            <span>View Video Library</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sampleVideos.map((vid) => (
            <div
              key={vid.id}
              className="bg-slate-900 border border-slate-800 hover:border-orange-500/50 rounded-2xl overflow-hidden shadow-lg group flex flex-col justify-between"
            >
              {/* Thumbnail Container */}
              <div
                onClick={() =>
                  setActiveVideo({ url: vid.videoUrl, title: vid.title })
                }
                className="relative aspect-video bg-slate-950 overflow-hidden cursor-pointer"
              >
                <img
                  src={vid.thumbnail}
                  alt={vid.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-orange-600/90 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-white translate-x-0.5" />
                  </div>
                </div>

                <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-orange-400 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border border-slate-800">
                  {vid.category}
                </div>

                <div className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-md text-white text-xs font-mono px-2 py-1 rounded flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{vid.duration}</span>
                </div>
              </div>

              {/* Title & Info */}
              <div className="p-5 space-y-2">
                <h3
                  onClick={() =>
                    setActiveVideo({ url: vid.videoUrl, title: vid.title })
                  }
                  className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors cursor-pointer line-clamp-2"
                >
                  {vid.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {vid.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <VideoModal
        isOpen={Boolean(activeVideo)}
        videoUrl={activeVideo?.url || ""}
        title={activeVideo?.title || ""}
        onClose={() => setActiveVideo(null)}
      />
    </section>
  );
}
