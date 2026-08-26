"use client";

import React from "react";
import Link from "next/link";
import { sampleBlogs } from "@/data/sampleData";
import { Clock, ArrowRight } from "lucide-react";

export default function BlogPreview() {
  return (
    <section className="py-20 bg-slate-900/40 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-orange-500 text-xs font-semibold uppercase tracking-wider">
              Knowledge Hub
            </span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight mt-1">
              Manufacturing Insights & Machinery Guides
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-semibold text-orange-400 hover:text-orange-300 transition-colors"
          >
            <span>Explore All Blog Articles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sampleBlogs.map((b) => (
            <div
              key={b.id}
              className="bg-slate-900 border border-slate-800 hover:border-orange-500/40 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between group shadow-lg"
            >
              <div className="relative aspect-[16/10] bg-slate-950 overflow-hidden">
                <img
                  src={b.image}
                  alt={b.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />

                <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-orange-400 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border border-slate-800">
                  {b.category}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 mb-2">
                    <span>{b.date}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{b.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-orange-400 transition-colors line-clamp-2">
                    {b.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mt-2">
                    {b.excerpt}
                  </p>
                </div>

                <Link
                  href={`/blog/${b.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-400 hover:text-orange-300 transition-colors pt-2"
                >
                  <span>Read Full Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
