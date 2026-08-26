"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Menu,
  Download,
  ArrowRight,
  ChevronRight,
  Cpu,
  Award,
  Zap,
  Cog,
  Headphones,
  FileText,
} from "lucide-react";
import { sampleProducts } from "@/data/sampleData";

function ProductCatalogContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") || "all";
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam);
  const [sortBy, setSortBy] = useState("Popular");

  const categories = [
    { id: "all", label: "All Products" },
    { id: "automatic", label: "Fully Automatic Machines" },
    { id: "semi-automatic", label: "Semi Automatic Machines" },
    { id: "hydraulic", label: "Hydraulic Machines" },
    { id: "spare-parts", label: "Accessories & Parts" },
    { id: "raw-materials", label: "Raw Materials" },
    { id: "cutting", label: "Customized Solutions" },
  ];

  const filteredProducts =
    selectedCategory === "all"
      ? sampleProducts
      : sampleProducts.filter((p) => p.category === selectedCategory);

  const featureCards = [
    { icon: Cpu, title: "Advanced Technology", desc: "Latest machines with modern features" },
    { icon: Award, title: "High Quality Materials", desc: "Built with premium quality components" },
    { icon: Zap, title: "High Production Capacity", desc: "Maximum output with minimum downtime" },
    { icon: Cog, title: "Easy Operation & Maintenance", desc: "User friendly design for smooth operation" },
    { icon: Headphones, title: "After Sales Support", desc: "24/7 support and service assistance" },
  ];

  return (
    <div className="w-full bg-slate-50 text-gray-900 font-sans">
      {/* 1. Hero Banner */}
      <section className="relative bg-neutral-900 text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80')",
          }}
        />
        <div className="relative max-w-7xl mx-auto space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>&gt;</span>
            <span className="text-white">Products</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
            OUR <span className="text-green-500">PRODUCTS</span>
          </h1>

          <p className="max-w-2xl text-sm sm:text-base text-gray-300 leading-relaxed">
            High performance paper plate making machines designed for efficiency, durability and maximum output.
          </p>
        </div>
      </section>

      {/* 2. Main Product Catalog & Sidebar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            {/* Categories Box */}
            <div className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm">
              <div className="bg-red-700 text-white font-extrabold text-xs uppercase px-4 py-3 flex items-center justify-between tracking-wider">
                <span>PRODUCT CATEGORIES</span>
                <Menu className="w-4 h-4" />
              </div>
              <ul className="divide-y divide-gray-100">
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat.id;
                  return (
                    <li key={cat.id}>
                      <button
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`w-full text-left px-4 py-3 text-xs font-semibold flex items-center justify-between transition-colors ${
                          isActive
                            ? "bg-red-50 text-red-700 font-bold border-l-4 border-red-700"
                            : "text-gray-700 hover:bg-gray-50 hover:text-red-700"
                        }`}
                      >
                        <span>{cat.label}</span>
                        {isActive && <ChevronRight className="w-4 h-4 text-red-700" />}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Download Product Catalogue Box */}
            <div className="bg-gray-100 p-5 rounded-lg border border-gray-200 space-y-3">
              <div className="flex items-start gap-3">
                <FileText className="w-8 h-8 text-green-700 shrink-0" />
                <div>
                  <h4 className="text-xs font-extrabold text-gray-900 uppercase">
                    DOWNLOAD PRODUCT CATALOGUE
                  </h4>
                  <p className="text-[11px] text-gray-600 mt-1">
                    Get detailed information about all our machines.
                  </p>
                </div>
              </div>
              <a
                href="/sample-catalogue.pdf"
                download
                className="w-full inline-flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 text-white text-xs font-bold uppercase py-2.5 rounded shadow transition-colors"
              >
                <span>DOWNLOAD PDF</span>
                <Download className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Main Content */}
          <div className="lg:col-span-9 space-y-6">
            {/* Top Bar */}
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Explore Our Range of Machines
                </h2>
                <p className="text-xs text-gray-500">
                  Showing {filteredProducts.length} high-performance paper plate machines
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-gray-500 font-medium">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-50 border border-gray-200 rounded px-2.5 py-1.5 text-xs font-semibold text-gray-800 focus:outline-none"
                >
                  <option value="Popular">Popular</option>
                  <option value="Newest">Newest</option>
                  <option value="Capacity">High Capacity</option>
                </select>
              </div>
            </div>

            {/* Products Grid (2 Rows of 4 / Responsive) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {filteredProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group"
                >
                  <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
                    {prod.isBestSeller && (
                      <span className="absolute top-2 left-2 z-10 bg-green-700 text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded shadow">
                        BEST SELLER
                      </span>
                    )}
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="text-xs font-bold text-gray-900 group-hover:text-red-700 transition-colors leading-snug">
                        {prod.name}
                      </h3>
                      <p className="text-[11px] text-gray-600 mt-1 line-clamp-2 leading-relaxed">
                        {prod.shortDescription}
                      </p>
                    </div>

                    <Link
                      href={`/products/${prod.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-red-700 hover:text-red-800 tracking-wider uppercase pt-2 border-t border-gray-100"
                    >
                      <span>VIEW DETAILS</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Features Row (5 Icon Cards) */}
      <section className="bg-white border-y border-gray-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 text-center">
          {featureCards.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <div
                key={i}
                className="p-5 rounded-lg bg-gray-50 border border-gray-200 flex flex-col items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 border border-red-100 flex items-center justify-center mb-1">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold text-gray-900 uppercase">
                  {feat.title}
                </h4>
                <p className="text-[11px] text-gray-600">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-gray-500">Loading catalog...</div>}>
      <ProductCatalogContent />
    </Suspense>
  );
}
