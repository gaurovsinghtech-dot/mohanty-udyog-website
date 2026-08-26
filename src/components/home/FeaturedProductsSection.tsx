"use client";

import React from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { sampleProducts } from "@/data/sampleData";
import { ArrowRight } from "lucide-react";

export default function FeaturedProductsSection() {
  const featured = sampleProducts.filter((p) => p.featured);

  return (
    <section className="py-20 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-orange-500 text-xs font-semibold uppercase tracking-wider">
              Flagship Machinery
            </span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight mt-1">
              Featured Production Machines
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs font-semibold text-orange-400 hover:text-orange-300 transition-colors"
          >
            <span>View All Machinery Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((prod) => (
            <div
              key={prod.id}
              className="bg-slate-900 border border-slate-800 hover:border-orange-500/40 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between group shadow-xl hover:shadow-2xl"
            >
              {/* Product Image */}
              <div className="relative aspect-[4/3] bg-slate-950 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />

                <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-orange-400 border border-orange-500/30 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full">
                  {prod.categoryName}
                </span>
              </div>

              {/* Product Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-orange-400 transition-colors line-clamp-2">
                    {prod.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mt-2">
                    {prod.shortDescription}
                  </p>
                </div>

                {/* Specs Box */}
                <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-500 text-[11px]">Capacity:</span>
                    <span className="font-mono font-semibold text-orange-400">{prod.capacity}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-500 text-[11px]">Power:</span>
                    <span className="font-mono text-slate-200">{prod.power}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Button href={`/products/${prod.slug}`} variant="outline" size="sm">
                    View Specs
                  </Button>
                  <Button href="/contact" variant="accent" size="sm">
                    Get Quote
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
