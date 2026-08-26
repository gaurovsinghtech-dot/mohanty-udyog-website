import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Button from "@/components/ui/Button";
import FinalCTASection from "@/components/home/FinalCTASection";
import { sampleBlogs } from "@/data/sampleData";
import { ChevronRight, Clock, User, CheckCircle2, ArrowRight, BookOpen } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return sampleBlogs.map((b) => ({
    slug: b.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const blog = sampleBlogs.find((b) => b.slug === slug);

  if (!blog) {
    return {
      title: "Article Not Found | Apex Machina",
    };
  }

  return {
    title: `${blog.title} | Apex Machina Blog`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: [{ url: blog.image }],
    },
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = sampleBlogs.find((b) => b.slug === slug);

  if (!blog) {
    notFound();
  }

  const relatedBlogs = sampleBlogs.filter((b) => b.id !== blog.id);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-industrial-grid opacity-20 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-slate-400">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <Link href="/blog" className="hover:text-white transition-colors">
            Knowledge Hub
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-orange-400 font-medium truncate max-w-xs sm:max-w-md">
            {blog.title}
          </span>
        </nav>

        {/* Header Content */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs font-semibold uppercase tracking-wider">
              {blog.category}
            </span>
            <div className="flex items-center gap-1 text-xs text-slate-400">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>{blog.readTime}</span>
            </div>
            <span className="text-xs text-slate-500">• {blog.date}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight font-sans">
            {blog.title}
          </h1>

          <div className="flex items-center gap-3 pt-2 border-t border-slate-800/80">
            <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-orange-400 font-bold text-sm">
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">{blog.author}</div>
              <div className="text-[11px] text-slate-400">{blog.authorTitle}</div>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 aspect-[16/9] shadow-2xl relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
        </div>

        {/* Key Takeaways Box */}
        {blog.takeaways && blog.takeaways.length > 0 && (
          <div className="bg-slate-900 border border-orange-500/30 rounded-2xl p-6 space-y-3 shadow-xl">
            <div className="flex items-center gap-2 text-xs font-bold text-orange-400 uppercase tracking-wider">
              <BookOpen className="w-4 h-4 text-orange-500" />
              <span>Key Technical Takeaways</span>
            </div>
            <ul className="space-y-2">
              {blog.takeaways.map((tk, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{tk}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Article Body Sections */}
        <div className="space-y-8 text-slate-300 text-sm sm:text-base leading-relaxed">
          {blog.sections.map((sec, idx) => (
            <div key={idx} className="space-y-3">
              <h2 className="text-xl font-bold text-white tracking-tight border-b border-slate-800 pb-2">
                {sec.heading}
              </h2>
              <p className="text-slate-300 leading-relaxed font-normal">{sec.content}</p>
            </div>
          ))}
        </div>

        {/* Callout Box */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-bold text-white">Need Technical Machine Selection Advice?</h4>
            <p className="text-xs text-slate-400">
              Speak with our senior engineering team to calculate capital ROI and power requirements.
            </p>
          </div>
          <Button href="/contact" variant="accent" size="md" showArrow className="shrink-0">
            Request Consultation
          </Button>
        </div>

        {/* Related Articles Showcase */}
        {relatedBlogs.length > 0 && (
          <div className="space-y-6 pt-8 border-t border-slate-800">
            <h3 className="text-lg font-bold text-white">Related Technical Articles</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedBlogs.map((rel) => (
                <div
                  key={rel.id}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex gap-4 items-center group hover:border-orange-500/40 transition-colors"
                >
                  <div className="w-24 h-24 rounded-lg overflow-hidden bg-slate-950 shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={rel.image} alt={rel.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <span className="text-[10px] text-orange-400 font-semibold uppercase">
                      {rel.category}
                    </span>
                    <h4 className="text-xs font-bold text-white group-hover:text-orange-400 transition-colors line-clamp-2">
                      {rel.title}
                    </h4>
                    <Link
                      href={`/blog/${rel.slug}`}
                      className="text-[11px] font-semibold text-slate-400 hover:text-white inline-flex items-center gap-1 pt-1"
                    >
                      <span>Read Guide</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-16">
        <FinalCTASection />
      </div>
    </div>
  );
}
