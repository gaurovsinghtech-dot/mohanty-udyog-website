"use client";

import React, { useEffect } from "react";
import Button from "@/components/ui/Button";
import { AlertCircle, RefreshCw, Home } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Global Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] bg-slate-950 text-slate-100 flex items-center justify-center py-16 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-industrial-grid opacity-20 pointer-events-none" />

      <div className="max-w-md mx-auto text-center space-y-6 relative z-10 bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-rose-400 font-mono text-xs font-semibold uppercase tracking-widest">
            SYSTEM EXCEPTION
          </span>
          <h2 className="text-xl font-bold text-white">Unexpected Error Occurred</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            We encountered a temporary rendering exception. You can try refreshing the view or return home.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs rounded-xl shadow-lg transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>

          <Button href="/" variant="secondary" size="md">
            <Home className="w-3.5 h-3.5 mr-1.5" />
            <span>Home</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
