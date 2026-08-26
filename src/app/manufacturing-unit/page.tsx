import React from "react";
import Link from "next/link";
import {
  Building2,
  Cog,
  Users,
  ShieldCheck,
  MapPin,
  Maximize2,
  Zap,
  Award,
  CheckCircle2,
  ChevronRight,
  Flame,
  Camera,
  Car,
  Utensils,
  Cross,
  Droplets,
  Wind,
} from "lucide-react";

export const metadata = {
  title: "Manufacturing Unit | Mohanty Udyog",
  description:
    "Explore Mohanty Udyog's 50,000+ sq ft state-of-the-art manufacturing plant in Jagatpur Industrial Estate, Cuttack, equipped with CNC, VMC, and precision assembly lines.",
};

export default function ManufacturingUnitPage() {
  const overviewSpecs = [
    {
      icon: MapPin,
      title: "Location",
      desc: "IDCO Road, Jagatpur Industrial Estate, Jagatpur, Cuttack, Odisha - 754021",
    },
    {
      icon: Maximize2,
      title: "Total Area",
      desc: "50,000+ Sq. Ft.",
    },
    {
      icon: Zap,
      title: "Production Capacity",
      desc: "36,000+ Plates Per Day",
    },
    {
      icon: Users,
      title: "Skilled Workforce",
      desc: "50+ Experienced Professionals",
    },
    {
      icon: Cog,
      title: "Machinery",
      desc: "Advanced CNC, VMC, Hydraulic & Fabrication Machines",
    },
    {
      icon: Award,
      title: "Quality Standards",
      desc: "ISO 9001:2015 Certified Company",
    },
  ];

  const amenities = [
    { icon: Zap, title: "24/7 Power Backup" },
    { icon: Droplets, title: "Clean & Safe Water Supply" },
    { icon: Wind, title: "Proper Ventilation System" },
    { icon: Flame, title: "Fire Safety System" },
    { icon: Camera, title: "CCTV Surveillance (24x7)" },
    { icon: Car, title: "Spacious Parking Area" },
    { icon: Utensils, title: "Worker Canteen Facility" },
    { icon: Cross, title: "First Aid Center" },
  ];

  const plantAreas = [
    {
      title: "Production Area",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "CNC & Fabrication Section",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Welding Section",
      image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Assembly Line",
      image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const processSteps = [
    {
      step: "01",
      title: "Raw Material Inspection",
      desc: "High quality raw materials are inspected.",
    },
    {
      step: "02",
      title: "Precision Manufacturing",
      desc: "Advanced machines ensure high precision parts.",
    },
    {
      step: "03",
      title: "Assembly & Fitting",
      desc: "All components are assembled with accuracy.",
    },
    {
      step: "04",
      title: "Quality Testing",
      desc: "Each machine is tested for performance & safety.",
    },
    {
      step: "05",
      title: "Packing & Dispatch",
      desc: "Machines are packed securely and dispatched.",
    },
  ];

  return (
    <div className="w-full bg-slate-50 text-gray-900 font-sans">
      {/* 1. Hero Banner */}
      <section className="relative bg-neutral-900 text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1600&q=80')",
          }}
        />
        <div className="relative max-w-7xl mx-auto space-y-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>&gt;</span>
            <span className="text-white">Manufacturing Unit</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
            OUR <span className="text-green-500">MANUFACTURING UNIT</span>
          </h1>

          <p className="max-w-2xl text-sm sm:text-base text-gray-300 leading-relaxed">
            Our state-of-the-art manufacturing unit is equipped with advanced machinery and modern technology to deliver high quality paper plate making machines.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 px-3.5 py-1.5 rounded-full text-xs font-semibold text-white">
              <Building2 className="w-4 h-4 text-red-500" />
              <span>Advanced Infrastructure</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 px-3.5 py-1.5 rounded-full text-xs font-semibold text-white">
              <Cog className="w-4 h-4 text-green-500" />
              <span>Modern Machinery</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 px-3.5 py-1.5 rounded-full text-xs font-semibold text-white">
              <Users className="w-4 h-4 text-red-500" />
              <span>Skilled Workforce</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 px-3.5 py-1.5 rounded-full text-xs font-semibold text-white">
              <ShieldCheck className="w-4 h-4 text-green-500" />
              <span>Quality Assurance</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OVERVIEW Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column Text */}
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-700">
              <span>OVERVIEW</span>
              <span className="w-8 h-0.5 bg-red-700"></span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight leading-tight">
              Built for Precision. Driven by Excellence.
            </h2>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Our manufacturing unit is located in the prime industrial hub of Jagatpur Industrial Estate, Cuttack, Odisha, spread over a large area with well-planned infrastructure.
            </p>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              We follow strict quality control processes at every stage of production to ensure our machines deliver superior performance, durability and efficiency.
            </p>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              With a strong focus on innovation and customer satisfaction, we continuously upgrade our technology and processes to stay ahead in the industry.
            </p>
          </div>

          {/* Right Column Specs Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {overviewSpecs.map((spec, i) => {
              const Icon = spec.icon;
              return (
                <div
                  key={i}
                  className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 border border-red-100 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-gray-900 uppercase">
                      {spec.title}
                    </h3>
                    <p className="text-xs text-gray-600 mt-1 leading-snug">
                      {spec.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. AMENITIES & FACILITIES */}
      <section className="bg-white border-y border-gray-200 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500">
              <span className="w-8 h-0.5 bg-green-600"></span>
              <span>AMENITIES & FACILITIES</span>
              <span className="w-8 h-0.5 bg-green-600"></span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 text-center">
            {amenities.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-lg bg-gray-50 border border-gray-200 flex flex-col items-center justify-center gap-2 hover:bg-red-50 hover:border-red-200 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-white border border-gray-200 text-red-600 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold text-gray-800 leading-tight">
                    {item.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. INSIDE OUR PLANT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500">
            <span className="w-8 h-0.5 bg-green-600"></span>
            <span>INSIDE OUR PLANT</span>
            <span className="w-8 h-0.5 bg-green-600"></span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plantAreas.map((area, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm group hover:shadow-md transition-shadow"
            >
              <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
                <img
                  src={area.image}
                  alt={area.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-3.5 bg-neutral-900 text-white text-center">
                <h3 className="text-xs font-bold tracking-wide uppercase">
                  {area.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. OUR MANUFACTURING PROCESS */}
      <section className="bg-gray-100 border-t border-gray-200 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500">
              <span className="w-8 h-0.5 bg-red-600"></span>
              <span>OUR MANUFACTURING PROCESS</span>
              <span className="w-8 h-0.5 bg-red-600"></span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {processSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex flex-col justify-between relative"
              >
                <div>
                  <div className="text-xl font-black text-green-700 mb-2">
                    {step.step}
                  </div>
                  <h4 className="text-xs font-bold text-gray-900 mb-1">
                    {step.title}
                  </h4>
                  <p className="text-[11px] text-gray-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                {idx < processSteps.length - 1 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Stats Counter Strip */}
      <section className="bg-red-700 text-white py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
          <div>
            <div className="text-3xl font-black">15+</div>
            <div className="text-xs font-semibold text-red-100 mt-1">Years of Experience</div>
          </div>
          <div>
            <div className="text-3xl font-black">5000+</div>
            <div className="text-xs font-semibold text-red-100 mt-1">Machines Installed</div>
          </div>
          <div>
            <div className="text-3xl font-black">36,000+</div>
            <div className="text-xs font-semibold text-red-100 mt-1">Plates Per Day Capacity</div>
          </div>
          <div>
            <div className="text-3xl font-black">5000+</div>
            <div className="text-xs font-semibold text-red-100 mt-1">Happy Customers</div>
          </div>
          <div>
            <div className="text-3xl font-black">25+</div>
            <div className="text-xs font-semibold text-red-100 mt-1">States Served</div>
          </div>
        </div>
      </section>
    </div>
  );
}
