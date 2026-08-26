import React from "react";
import SearchClient from "./SearchClient";
import FinalCTASection from "@/components/home/FinalCTASection";
import { Search } from "lucide-react";

export const metadata = {
  title: "Search Machinery & Technical Guides | Apex Machina",
  description: "Search across paper plate machines, hydraulic presses, raw materials, spare parts, and manufacturing guides.",
};

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-industrial-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold uppercase tracking-wider">
            <Search className="w-3.5 h-3.5" />
            <span>GLOBAL SEARCH ENGINE</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight font-sans">
            Search Catalogue & Machinery Guides
          </h1>
        </div>

        <SearchClient />
      </div>

      <div className="mt-16">
        <FinalCTASection />
      </div>
    </div>
  );
}
