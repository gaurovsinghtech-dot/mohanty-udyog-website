"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { sampleProducts, sampleBlogs, sampleGalleryImages } from "@/data/sampleData";
import LightboxModal from "@/components/ui/LightboxModal";
import { Search, Package, BookOpen, Camera, ArrowRight, RefreshCw, Layers } from "lucide-react";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryParam = searchParams.get("q") || "";

  const [inputQuery, setInputQuery] = useState(queryParam);
  const [prevParam, setPrevParam] = useState(queryParam);
  const [activeTab, setActiveTab] = useState<"all" | "products" | "blog" | "gallery">("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Sync state if URL query param changes during navigation
  if (queryParam !== prevParam) {
    setPrevParam(queryParam);
    setInputQuery(queryParam);
  }

  const query = queryParam;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(inputQuery.trim())}`);
    } else {
      router.push("/search");
    }
  };

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) {
      return { products: [], blogs: [], gallery: [], total: 0 };
    }

    const matchedProducts = sampleProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.capacity.toLowerCase().includes(q) ||
        p.specs.some(
          (s) =>
            s.label.toLowerCase().includes(q) || s.value.toLowerCase().includes(q)
        )
    );

    const matchedBlogs = sampleBlogs.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.excerpt.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q)
    );

    const matchedGallery = sampleGalleryImages.filter(
      (g) =>
        g.title.toLowerCase().includes(q) ||
        g.caption.toLowerCase().includes(q) ||
        g.category.toLowerCase().includes(q)
    );

    return {
      products: matchedProducts,
      blogs: matchedBlogs,
      gallery: matchedGallery,
      total: matchedProducts.length + matchedBlogs.length + matchedGallery.length,
    };
  }, [query]);

  return (
    <div className="space-y-10">
      {/* Search Bar Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
        <form onSubmit={handleSearchSubmit} className="relative max-w-2xl">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search double die machines, hydraulic thali press, PE rolls, maintenance..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-12 pr-28 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Search
          </button>
        </form>

        {query && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-slate-800/80">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all duration-200 cursor-pointer border ${
                activeTab === "all"
                  ? "bg-orange-600 text-white border-orange-500 shadow-md shadow-orange-600/20"
                  : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
              }`}
            >
              All Results ({results.total})
            </button>

            <button
              onClick={() => setActiveTab("products")}
              className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all duration-200 cursor-pointer border ${
                activeTab === "products"
                  ? "bg-orange-600 text-white border-orange-500 shadow-md shadow-orange-600/20"
                  : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
              }`}
            >
              Machinery & Spare Parts ({results.products.length})
            </button>

            <button
              onClick={() => setActiveTab("blog")}
              className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all duration-200 cursor-pointer border ${
                activeTab === "blog"
                  ? "bg-orange-600 text-white border-orange-500 shadow-md shadow-orange-600/20"
                  : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
              }`}
            >
              Technical Guides ({results.blogs.length})
            </button>

            <button
              onClick={() => setActiveTab("gallery")}
              className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all duration-200 cursor-pointer border ${
                activeTab === "gallery"
                  ? "bg-orange-600 text-white border-orange-500 shadow-md shadow-orange-600/20"
                  : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
              }`}
            >
              Factory Media ({results.gallery.length})
            </button>
          </div>
        )}
      </div>

      {/* Results Content */}
      {!query ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-3 shadow-xl">
          <Layers className="w-10 h-10 text-orange-500 mx-auto" />
          <h3 className="text-lg font-bold text-white">Global Catalogue & Knowledge Search</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Type keywords like &quot;Double Die&quot;, &quot;Hydraulic&quot;, &quot;GSM&quot;, &quot;Maintenance&quot;, or &quot;PE Rolls&quot; to search our entire site.
          </p>
        </div>
      ) : results.total === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-4 shadow-xl">
          <Search className="w-10 h-10 text-slate-500 mx-auto" />
          <h3 className="text-lg font-bold text-white">No results found for &ldquo;{query}&rdquo;</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Check your spelling or try searching with general terms like &quot;paper plate machine&quot; or &quot;thali press&quot;.
          </p>
          <button
            onClick={() => {
              setInputQuery("");
              router.push("/search");
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 text-white text-xs font-semibold rounded-lg hover:bg-slate-700 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Clear Search</span>
          </button>
        </div>
      ) : (
        <div className="space-y-12">
          {/* Products Group */}
          {(activeTab === "all" || activeTab === "products") && results.products.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <Package className="w-5 h-5 text-orange-500" />
                <h3 className="text-lg font-bold text-white">
                  Matching Machinery & Products ({results.products.length})
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.products.map((p) => (
                  <div
                    key={p.id}
                    className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-orange-500/50 transition-colors shadow-xl group"
                  >
                    <div className="space-y-3">
                      <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-950 relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-2.5 left-2.5 bg-slate-950/80 backdrop-blur-md text-orange-400 text-[10px] font-semibold uppercase px-2.5 py-1 rounded-full border border-slate-800">
                          {p.categoryName}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors line-clamp-2">
                        {p.name}
                      </h4>
                      <p className="text-xs text-slate-400 line-clamp-2">{p.shortDescription}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-xs font-mono text-emerald-400">{p.capacity}</span>
                      <Link
                        href={`/products/${p.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-orange-400 hover:text-orange-300"
                      >
                        <span>View Specs</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Blogs Group */}
          {(activeTab === "all" || activeTab === "blog") && results.blogs.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <BookOpen className="w-5 h-5 text-orange-500" />
                <h3 className="text-lg font-bold text-white">
                  Matching Technical Guides & Articles ({results.blogs.length})
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.blogs.map((b) => (
                  <div
                    key={b.id}
                    className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-orange-500/50 transition-colors shadow-xl group"
                  >
                    <div className="space-y-2">
                      <span className="text-[10px] font-semibold text-orange-400 uppercase">
                        {b.category} • {b.readTime}
                      </span>
                      <h4 className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors line-clamp-2">
                        {b.title}
                      </h4>
                      <p className="text-xs text-slate-400 line-clamp-2">{b.excerpt}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-[11px] text-slate-500">{b.author}</span>
                      <Link
                        href={`/blog/${b.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-orange-400 hover:text-orange-300"
                      >
                        <span>Read Article</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gallery Group */}
          {(activeTab === "all" || activeTab === "gallery") && results.gallery.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <Camera className="w-5 h-5 text-orange-500" />
                <h3 className="text-lg font-bold text-white">
                  Matching Factory & Media Photos ({results.gallery.length})
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.gallery.map((g, idx) => (
                  <div
                    key={g.id}
                    onClick={() => setLightboxIndex(idx)}
                    className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden cursor-pointer aspect-[4/3] relative group shadow-xl"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={g.image}
                      alt={g.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="text-xs font-bold truncate">{g.title}</div>
                      <div className="text-[10px] text-slate-400 truncate">{g.caption}</div>
                    </div>
                  </div>
                ))}
              </div>

              <LightboxModal
                items={results.gallery}
                currentIndex={lightboxIndex}
                onClose={() => setLightboxIndex(null)}
                onNavigate={(idx) => setLightboxIndex(idx)}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function SearchClient() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading search interface...</div>}>
      <SearchContent />
    </Suspense>
  );
}
