"use client";

import React from "react";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { Award, Layers, Users, MapPin, Headphones, Zap } from "lucide-react";

export default function StatsStrip() {
  const stats = [
    {
      icon: Award,
      value: 15,
      suffix: "+",
      label: "Years of Experience",
      subtext: "Established 2008",
    },
    {
      icon: Layers,
      value: 5000,
      suffix: "+",
      label: "Machines Installed",
      subtext: "Across India",
    },
    {
      icon: Zap,
      value: 36000,
      suffix: "+",
      label: "Plates Per Day",
      subtext: "Production Capacity",
    },
    {
      icon: Users,
      value: 5000,
      suffix: "+",
      label: "Happy Customers",
      subtext: "Trusted Business Partners",
    },
    {
      icon: MapPin,
      value: 25,
      suffix: "+",
      label: "States Served",
      subtext: "Pan-India Presence",
    },
    {
      icon: Headphones,
      value: 24,
      suffix: "/7",
      label: "Customer Support",
      subtext: "After Sales Service",
    },
  ];

  return (
    <section className="bg-white border-y border-gray-200 py-8 relative z-20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="flex flex-col p-3.5 rounded-lg bg-gray-50 border border-gray-200 text-center hover:shadow-sm transition-shadow"
              >
                <div className="flex items-center justify-center gap-1.5 mb-1 text-gray-500">
                  <Icon className="w-4 h-4 text-red-600" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    {stat.subtext}
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-red-700 tracking-tight">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs font-bold text-gray-800 mt-0.5">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

