"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import FinalCTASection from "@/components/home/FinalCTASection";
import { sampleBlogs } from "@/data/sampleData";
import { Search, Clock, ArrowRight, BookOpen, User, RefreshCw } from "lucide-react";

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Guides & Articles" },
    { id: "Business Guide", label: "Business Guides" },
    { id: "Machinery", label: "Machinery Tech" },
    { id: "Maintenance", label: "Maintenance Tips" },
  ];

  const featuredArticle = sampleBlogs.find((b) => b.featured) || sampleBlogs[0];

  const filteredBlogs = useMemo(() => {
    let result = [...sampleBlogs];

    if (selectedCategory !== "all") {
      result = result.filter((b) => b.category === selectedCategory);
    }

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.excerpt.toLowerCase().includes(q) ||
          b.category.toLowerCase().includes(q)
      );
    }

    return result;
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-industrial-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Page Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>KNOWLEDGE HUB & GUIDES</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight font-sans">
            Paper Plate Business & Machinery Guides
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Read engineering guides, maintenance checklists, ROI calculations, and business setup strategies written by our senior machinery team.
          </p>
        </div>

        {/* Featured Article Card */}
        {featuredArticle && selectedCategory === "all" && !searchQuery && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 items-center group">
            <div className="lg:col-span-7 aspect-[16/10] bg-slate-950 overflow-hidden relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
              <span className="absolute top-4 left-4 bg-orange-600 text-white font-semibold text-xs uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">
                Featured Guide
              </span>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span className="text-orange-400 font-semibold uppercase">{featuredArticle.category}</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{featuredArticle.readTime}</span>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-white group-hover:text-orange-400 transition-colors leading-tight">
                {featuredArticle.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
                {featuredArticle.excerpt}
              </p>

              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <User className="w-3.5 h-3.5 text-orange-500" />
                  <span>{featuredArticle.author}</span>
                </div>

                <Link
                  href={`/blog/${featuredArticle.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-400 hover:text-orange-300 transition-colors"
                >
                  <span>Read Full Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Search & Category Filter Controls */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl space-y-6">
          <div className="relative max-w-xl">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search articles by title or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all duration-200 cursor-pointer border ${
                  selectedCategory === cat.id
                    ? "bg-orange-600 text-white border-orange-500 shadow-lg shadow-orange-600/25"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Cards Grid */}
        {filteredBlogs.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-slate-950 text-slate-500 flex items-center justify-center mx-auto border border-slate-800">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">No blog articles found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Try searching with different keywords or reset category filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-orange-400 bg-orange-500/10 border border-orange-500/30 rounded-lg hover:bg-orange-500/20 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((b) => (
              <div
                key={b.id}
                className="bg-slate-900 border border-slate-800 hover:border-orange-500/40 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between group shadow-xl"
              >
                <div className="relative aspect-[16/10] bg-slate-950 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
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

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
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
                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mt-2">
                      {b.excerpt}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
                    <span className="text-[11px] text-slate-400 font-medium">{b.author}</span>
                    <Link
                      href={`/blog/${b.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-400 hover:text-orange-300 transition-colors"
                    >
                      <span>Read Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-16">
        <FinalCTASection />
      </div>
    </div>
  );
}
