"use client";

import React, { useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxItem {
  id: string;
  title: string;
  category?: string;
  image: string;
  caption?: string;
}

interface LightboxModalProps {
  items: LightboxItem[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export default function LightboxModal({
  items,
  currentIndex,
  onClose,
  onNavigate,
}: LightboxModalProps) {
  const isOpen = currentIndex !== null && Boolean(items[currentIndex]);

  const handlePrev = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (currentIndex === null) return;
      const newIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
      onNavigate(newIndex);
    },
    [currentIndex, items.length, onNavigate]
  );

  const handleNext = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (currentIndex === null) return;
      const newIndex = currentIndex === items.length - 1 ? 0 : currentIndex + 1;
      onNavigate(newIndex);
    },
    [currentIndex, items.length, onNavigate]
  );

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || currentIndex === null || !items[currentIndex]) return null;

  const currentItem = items[currentIndex];

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6"
      onClick={onClose}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between z-10 text-white">
        <div className="flex items-center gap-3">
          {currentItem.category && (
            <span className="px-2.5 py-1 text-[11px] font-semibold tracking-wider uppercase rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
              {currentItem.category}
            </span>
          )}
          <span className="text-sm font-semibold text-slate-200">{currentItem.title}</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 font-mono">
            {currentIndex + 1} / {items.length}
          </span>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close Lightbox"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Image View */}
      <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden" onClick={(e) => e.stopPropagation()}>
        {/* Navigation buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-4 z-20 p-3 rounded-full bg-slate-900/80 border border-slate-800 text-white hover:bg-orange-600 transition-colors"
          aria-label="Previous Image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={currentItem.image}
          alt={currentItem.title}
          className="max-h-[75vh] max-w-[90vw] object-contain rounded-xl shadow-2xl border border-slate-800"
        />

        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-4 z-20 p-3 rounded-full bg-slate-900/80 border border-slate-800 text-white hover:bg-orange-600 transition-colors"
          aria-label="Next Image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Caption */}
      {currentItem.caption && (
        <div className="text-center z-10 max-w-xl mx-auto pb-2" onClick={(e) => e.stopPropagation()}>
          <p className="text-xs sm:text-sm text-slate-400 font-normal leading-relaxed">
            {currentItem.caption}
          </p>
        </div>
      )}
    </div>
  );
}
