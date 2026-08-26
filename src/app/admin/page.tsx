"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  cmsStore,
  ProductItem,
  VideoItem,
  GalleryItem,
  BlogItem,
  SlideItem,
  LeadItem,
} from "@/lib/cmsStore";
import {
  Download,
  Plus,
  Trash2,
  Edit,
  Eye,
  Search,
  Users,
  X,
  ShieldCheck,
  Zap,
  LogOut,
  Globe,
  RefreshCw,
  Phone,
  Mail,
  Building,
  MapPin,
  MessageSquare,
  Clock,
  Package,
  Video,
  Image as ImageIcon,
  FileText,
  Layers,
  ChevronRight,
  TrendingUp,
  Activity,
  CheckCircle2,
  AlertCircle,
  SlidersHorizontal,
  Volume2,
  VolumeX,
} from "lucide-react";

export default function AdminPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [adminIdInput, setAdminIdInput] = useState("");
  const [adminPasswordInput, setAdminPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");

  const [activeTab, setActiveTab] = useState<
    "leads" | "products" | "videos" | "gallery" | "blogs" | "slides"
  >("leads");

  // State collections
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [slides, setSlides] = useState<SlideItem[]>([]);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [notification, setNotification] = useState<string | null>(null);

  // Modals state
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);
  const [productModal, setProductModal] = useState<{ open: boolean; item?: ProductItem }>({ open: false });
  const [videoModal, setVideoModal] = useState<{ open: boolean; item?: VideoItem }>({ open: false });
  const [galleryModal, setGalleryModal] = useState<{ open: boolean; item?: GalleryItem }>({ open: false });
  const [blogModal, setBlogModal] = useState<{ open: boolean; item?: BlogItem }>({ open: false });
  const [slideModal, setSlideModal] = useState<{ open: boolean; item?: SlideItem }>({ open: false });
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [loadingLeads, setLoadingLeads] = useState(false);

  // Play crisp dual-tone audio beep notification using Web Audio API
  const playBeepSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      // High tone 1 (880 Hz)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(880, ctx.currentTime);
      gain1.gain.setValueAtTime(0.2, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start();
      osc1.stop(ctx.currentTime + 0.25);

      // Chime tone 2 (1318 Hz)
      setTimeout(() => {
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = "sine";
        osc2.frequency.setValueAtTime(1318.51, ctx.currentTime);
        gain2.gain.setValueAtTime(0.25, ctx.currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start();
        osc2.stop(ctx.currentTime + 0.35);
      }, 150);
    } catch (err) {
      console.warn("Could not play audio beep:", err);
    }
  };

  const fetchLeadsFromApi = async (isSilent = false) => {
    if (!isSilent) setLoadingLeads(true);
    try {
      const res = await fetch("/api/leads");
      const data = await res.json();
      if (data.success && Array.isArray(data.leads) && data.leads.length > 0) {
        const mapped: LeadItem[] = data.leads.map((l: any) => ({
          id: l.id,
          name: l.name,
          phone: l.phone,
          email: l.email || "",
          machineType: l.productInterested || l.machineType || "General Inquiry",
          quantity: l.requirement || l.quantity || "1 Unit",
          city: l.city || "",
          state: l.state || "",
          message: l.message || "",
          status: (l.status ? l.status.toUpperCase() : "NEW") as LeadItem["status"],
          createdAt: l.createdAt
            ? new Date(l.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            : new Date().toLocaleDateString(),
        }));

        setLeads((prev) => {
          if (isSilent && mapped.length > prev.length) {
            if (soundEnabled) {
              playBeepSound();
            }
            showToast(`🔔 New Lead Received! Total leads: ${mapped.length}`);
          }
          return mapped;
        });
      }
    } catch (err) {
      console.warn("Failed to load leads from MySQL API:", err);
    } finally {
      if (!isSilent) setLoadingLeads(false);
    }
  };

  // Load auth & data on mount + Real-time auto sync
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAuth = sessionStorage.getItem("mohanty_admin_auth");
      if (storedAuth === "true") {
        setIsAuthenticated(true);
      }
    }
    fetchLeadsFromApi(false);
    setProducts(cmsStore.getProducts());
    setVideos(cmsStore.getVideos());
    setGallery(cmsStore.getGallery());
    setBlogs(cmsStore.getBlogs());
    setSlides(cmsStore.getSlides());

    // Auto-poll MySQL for new leads every 3 seconds
    const interval = setInterval(() => {
      fetchLeadsFromApi(true);
    }, 3000);

    const handleFocus = () => {
      fetchLeadsFromApi(true);
    };
    window.addEventListener("focus", handleFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminIdInput.trim() === "admin" && adminPasswordInput.trim() === "mohanty123") {
      setIsAuthenticated(true);
      sessionStorage.setItem("mohanty_admin_auth", "true");
      setLoginError("");
      showToast("Welcome! Logged in as Factory Admin.");
    } else {
      setLoginError("Invalid Admin ID or Password. (Default: admin / mohanty123)");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("mohanty_admin_auth");
    showToast("Logged out from Admin Panel.");
  };

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // CSV Lead Export
  const exportLeadsCSV = () => {
    if (leads.length === 0) {
      showToast("No leads available to export.");
      return;
    }
    const headers = [
      "ID",
      "Name",
      "Phone",
      "Email",
      "Machine Type",
      "Quantity",
      "City",
      "State",
      "Status",
      "Created At",
      "Message",
    ];

    const rows = leads.map((l) => [
      `"${l.id}"`,
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.phone}"`,
      `"${l.email}"`,
      `"${l.machineType.replace(/"/g, '""')}"`,
      `"${(l.quantity || "").replace(/"/g, '""')}"`,
      `"${(l.city || "").replace(/"/g, '""')}"`,
      `"${(l.state || "").replace(/"/g, '""')}"`,
      `"${l.status}"`,
      `"${l.createdAt}"`,
      `"${(l.message || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Mohanty_Udyog_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Leads CSV downloaded successfully!");
  };

  // Lead Status Update
  const updateLeadStatus = async (id: string, newStatus: LeadItem["status"]) => {
    const statusLower = newStatus.toLowerCase();
    try {
      await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: statusLower }),
      });
    } catch (err) {
      console.warn("Failed to update status on API:", err);
    }
    const updated = leads.map((l) => (l.id === id ? { ...l, status: newStatus } : l));
    setLeads(updated);
    showToast(`Lead status updated to ${newStatus}`);
  };

  const deleteLead = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;
    try {
      await fetch(`/api/leads/${id}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.warn("Failed to delete lead on API:", err);
    }
    const updated = leads.filter((l) => l.id !== id);
    setLeads(updated);
    if (selectedLead?.id === id) setSelectedLead(null);
    showToast("Lead deleted.");
  };

  // CRUD Handlers
  const saveProductSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const id = productModal.item?.id || `PROD-${Date.now()}`;
    const newProd: ProductItem = {
      id,
      name: formData.get("name") as string,
      slug: (formData.get("name") as string).toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      category: formData.get("category") as string,
      categorySlug: (formData.get("category") as string).toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      price: formData.get("price") as string,
      capacity: formData.get("capacity") as string,
      paperSize: formData.get("paperSize") as string,
      powerReq: formData.get("powerReq") as string,
      weightDim: formData.get("weightDim") as string,
      guarantee: formData.get("guarantee") as string,
      description: formData.get("description") as string,
      features: (formData.get("features") as string).split("\n").filter(Boolean),
      image: (formData.get("image") as string) || "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
      bestSeller: formData.get("bestSeller") === "on",
    };

    let updated: ProductItem[];
    if (productModal.item) {
      updated = products.map((p) => (p.id === id ? newProd : p));
    } else {
      updated = [newProd, ...products];
    }
    setProducts(updated);
    cmsStore.saveProducts(updated);
    setProductModal({ open: false });
    showToast("Product saved successfully!");
  };

  const deleteProduct = (id: string) => {
    if (!confirm("Delete this product?")) return;
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    cmsStore.saveProducts(updated);
    showToast("Product deleted.");
  };

  const saveVideoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const id = videoModal.item?.id || `VID-${Date.now()}`;
    const newVid: VideoItem = {
      id,
      title: formData.get("title") as string,
      category: formData.get("category") as string,
      youtubeId: formData.get("youtubeId") as string,
      thumbnail: (formData.get("thumbnail") as string) || "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
      duration: formData.get("duration") as string,
      description: formData.get("description") as string,
    };

    let updated: VideoItem[];
    if (videoModal.item) {
      updated = videos.map((v) => (v.id === id ? newVid : v));
    } else {
      updated = [newVid, ...videos];
    }
    setVideos(updated);
    cmsStore.saveVideos(updated);
    setVideoModal({ open: false });
    showToast("Video saved successfully!");
  };

  const deleteVideo = (id: string) => {
    if (!confirm("Delete this video?")) return;
    const updated = videos.filter((v) => v.id !== id);
    setVideos(updated);
    cmsStore.saveVideos(updated);
    showToast("Video deleted.");
  };

  const saveGallerySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const id = galleryModal.item?.id || `GAL-${Date.now()}`;
    const newGal: GalleryItem = {
      id,
      title: formData.get("title") as string,
      category: formData.get("category") as string,
      image: (formData.get("image") as string) || "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
      caption: formData.get("caption") as string,
    };

    let updated: GalleryItem[];
    if (galleryModal.item) {
      updated = gallery.map((g) => (g.id === id ? newGal : g));
    } else {
      updated = [newGal, ...gallery];
    }
    setGallery(updated);
    cmsStore.saveGallery(updated);
    setGalleryModal({ open: false });
    showToast("Gallery photo saved!");
  };

  const deleteGallery = (id: string) => {
    if (!confirm("Delete gallery photo?")) return;
    const updated = gallery.filter((g) => g.id !== id);
    setGallery(updated);
    cmsStore.saveGallery(updated);
    showToast("Gallery photo deleted.");
  };

  const saveBlogSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const id = blogModal.item?.id || `BLOG-${Date.now()}`;
    const title = formData.get("title") as string;
    const newBlog: BlogItem = {
      id,
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      category: formData.get("category") as string,
      author: formData.get("author") as string,
      readTime: formData.get("readTime") as string,
      date: (formData.get("date") as string) || new Date().toISOString().slice(0, 10),
      image: (formData.get("image") as string) || "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
      excerpt: formData.get("excerpt") as string,
      content: formData.get("content") as string,
    };

    let updated: BlogItem[];
    if (blogModal.item) {
      updated = blogs.map((b) => (b.id === id ? newBlog : b));
    } else {
      updated = [newBlog, ...blogs];
    }
    setBlogs(updated);
    cmsStore.saveBlogs(updated);
    setBlogModal({ open: false });
    showToast("Blog article saved!");
  };

  const deleteBlog = (id: string) => {
    if (!confirm("Delete blog article?")) return;
    const updated = blogs.filter((b) => b.id !== id);
    setBlogs(updated);
    cmsStore.saveBlogs(updated);
    showToast("Blog article deleted.");
  };

  const saveSlideSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const id = slideModal.item?.id || Date.now();
    const newSlide: SlideItem = {
      id: Number(id),
      eyebrow: formData.get("eyebrow") as string,
      titleRed: formData.get("titleRed") as string,
      titleGreen: formData.get("titleGreen") as string,
      titleSuffix: formData.get("titleSuffix") as string,
      subtitle: formData.get("subtitle") as string,
      capacityTag: formData.get("capacityTag") as string,
      image: (formData.get("image") as string) || "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=80",
      bullets: (formData.get("bullets") as string).split("\n").filter(Boolean),
      primaryCtaText: formData.get("primaryCtaText") as string,
      primaryCtaLink: formData.get("primaryCtaLink") as string,
      secondaryCtaText: formData.get("secondaryCtaText") as string,
      secondaryCtaLink: formData.get("secondaryCtaLink") as string,
      cardTitle: formData.get("cardTitle") as string,
      cardSubtitle: formData.get("cardSubtitle") as string,
      cardLink: formData.get("cardLink") as string,
    };

    let updated: SlideItem[];
    if (slideModal.item) {
      updated = slides.map((s) => (s.id === Number(id) ? newSlide : s));
    } else {
      updated = [...slides, newSlide];
    }
    setSlides(updated);
    cmsStore.saveSlides(updated);
    setSlideModal({ open: false });
    showToast("Hero slide saved!");
  };

  const deleteSlide = (id: number) => {
    if (!confirm("Delete hero slide?")) return;
    const updated = slides.filter((s) => s.id !== id);
    setSlides(updated);
    cmsStore.saveSlides(updated);
    showToast("Slide deleted.");
  };

  // Filter leads based on query & status
  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.phone.includes(searchQuery) ||
      l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.machineType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (l.city && l.city.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === "ALL" || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Status Counts
  const newCount = leads.filter((l) => l.status === "NEW").length;
  const contactedCount = leads.filter((l) => l.status === "CONTACTED").length;
  const qualifiedCount = leads.filter((l) => l.status === "QUALIFIED").length;
  const closedCount = leads.filter((l) => l.status === "CLOSED").length;

  // Render Login Modal if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 admin-portal">
        <div className="max-w-md w-full bg-white border border-slate-200 rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#00a76f]/10 border border-[#00a76f]/20 text-[#00a76f] rounded-2xl mb-1 shadow-sm">
              <ShieldCheck className="w-9 h-9" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">
              MOHANTY <span className="text-[#00a76f]">UDYOG</span>
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Minimals Light Factory Admin Portal
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 text-center font-medium">
                {loginError}
              </div>
            )}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                Admin User ID
              </label>
              <input
                type="text"
                required
                value={adminIdInput}
                onChange={(e) => setAdminIdInput(e.target.value)}
                placeholder="Enter admin ID"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#00a76f] focus:bg-white transition-all"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                required
                value={adminPasswordInput}
                onChange={(e) => setAdminPasswordInput(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#00a76f] focus:bg-white transition-all"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#00a76f] hover:bg-[#007849] text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-lg shadow-[#00a76f]/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>ACCESS DASHBOARD</span>
              <Zap className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center text-[11px] text-slate-400">
            Default access: <strong className="text-slate-700">admin</strong> / <strong className="text-slate-700">mohanty123</strong>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-slate-800 font-sans flex flex-col md:flex-row admin-portal">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-5 right-5 z-50 bg-[#00a76f] text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 animate-bounce">
          <Zap className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* MINIMALS LIGHT SIDEBAR NAVIGATION */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between shrink-0 p-5 space-y-6 shadow-sm">
        <div className="space-y-6">
          {/* Brand Logo & Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#00a76f]/10 border border-[#00a76f]/20 rounded-2xl flex items-center justify-center text-[#00a76f] font-black text-base shadow-sm">
                MU
              </div>
              <div>
                <h1 className="text-sm font-extrabold text-slate-900 tracking-wide">
                  MOHANTY <span className="text-[#00a76f]">UDYOG</span>
                </h1>
                <p className="text-[10px] text-slate-500 font-medium">Minimals Dashboard</p>
              </div>
            </div>
            <span className="text-[9px] font-bold bg-[#00a76f]/10 text-[#00a76f] border border-[#00a76f]/20 px-2 py-0.5 rounded-full">
              PRO
            </span>
          </div>

          {/* User Profile Card */}
          <div className="bg-slate-50 border border-slate-200/80 p-3.5 rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00a76f] to-[#078dee] flex items-center justify-center text-white font-black text-sm relative shadow-sm">
              FA
              <span className="w-2.5 h-2.5 bg-[#00a76f] border-2 border-white rounded-full absolute -bottom-0.5 -right-0.5" />
            </div>
            <div className="truncate">
              <div className="text-xs font-bold text-slate-900 truncate">Factory Admin</div>
              <div className="text-[10px] text-slate-500 truncate">admin@mohantyudyog.com</div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-1 text-xs font-semibold">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
              OVERVIEW & MANAGEMENT
            </div>

            <button
              onClick={() => setActiveTab("leads")}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all cursor-pointer ${
                activeTab === "leads"
                  ? "bg-[#00a76f]/10 text-[#00a76f] font-bold border border-[#00a76f]/20"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4" />
                <span>Leads & Inquiries</span>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  activeTab === "leads" ? "bg-[#00a76f] text-white" : "bg-slate-100 text-slate-600"
                }`}
              >
                {leads.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("products")}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all cursor-pointer ${
                activeTab === "products"
                  ? "bg-[#00a76f]/10 text-[#00a76f] font-bold border border-[#00a76f]/20"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <Package className="w-4 h-4" />
                <span>Products Catalog</span>
              </div>
              <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                {products.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("videos")}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all cursor-pointer ${
                activeTab === "videos"
                  ? "bg-[#00a76f]/10 text-[#00a76f] font-bold border border-[#00a76f]/20"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <Video className="w-4 h-4" />
                <span>Video Gallery</span>
              </div>
              <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                {videos.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("gallery")}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all cursor-pointer ${
                activeTab === "gallery"
                  ? "bg-[#00a76f]/10 text-[#00a76f] font-bold border border-[#00a76f]/20"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <ImageIcon className="w-4 h-4" />
                <span>Plant Infrastructure</span>
              </div>
              <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                {gallery.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("blogs")}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all cursor-pointer ${
                activeTab === "blogs"
                  ? "bg-[#00a76f]/10 text-[#00a76f] font-bold border border-[#00a76f]/20"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4" />
                <span>Blogs & News</span>
              </div>
              <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                {blogs.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("slides")}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all cursor-pointer ${
                activeTab === "slides"
                  ? "bg-[#00a76f]/10 text-[#00a76f] font-bold border border-[#00a76f]/20"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <Layers className="w-4 h-4" />
                <span>Hero Slides</span>
              </div>
              <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                {slides.length}
              </span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer Buttons */}
        <div className="space-y-2 pt-4 border-t border-slate-200/80">
          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold rounded-xl transition-all"
          >
            <Globe className="w-4 h-4" />
            <span>Back to Website</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-bold rounded-xl transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN LIGHT CONTENT AREA */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6">
        {/* Minimals Light Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>Dashboard</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-slate-900 font-bold capitalize">{activeTab}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight uppercase flex items-center gap-2">
              <span>
                {activeTab === "leads" && "Leads & Customer Pipeline"}
                {activeTab === "products" && "Products Catalog & Pricing"}
                {activeTab === "videos" && "Video Gallery Management"}
                {activeTab === "gallery" && "Plant Infrastructure Gallery"}
                {activeTab === "blogs" && "Articles & Startup News"}
                {activeTab === "slides" && "Hero Slider Management"}
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {activeTab === "leads" && (
              <>
                <button
                  onClick={() => {
                    const next = !soundEnabled;
                    setSoundEnabled(next);
                    if (next) playBeepSound();
                    showToast(next ? "🔔 Audio Beep Notification ON" : "🔇 Audio Muted");
                  }}
                  className={`inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    soundEnabled
                      ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                      : "bg-slate-50 border-slate-200 text-slate-400"
                  }`}
                  title={soundEnabled ? "Beep Notification ON (Click to mute)" : "Beep Notification OFF (Click to enable)"}
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
                  <span>{soundEnabled ? "Beep ON" : "Muted"}</span>
                </button>
                <button
                  onClick={() => fetchLeadsFromApi(false)}
                  disabled={loadingLeads}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingLeads ? "animate-spin text-[#00a76f]" : ""}`} />
                  <span>Sync MySQL</span>
                </button>
                <button
                  onClick={exportLeadsCSV}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#00a76f] hover:bg-[#007849] text-white text-xs font-bold rounded-xl shadow-md shadow-[#00a76f]/20 transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Export CSV</span>
                </button>
              </>
            )}

            {activeTab === "products" && (
              <button
                onClick={() => setProductModal({ open: true })}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#00a76f] hover:bg-[#007849] text-white text-xs font-bold rounded-xl shadow-md shadow-[#00a76f]/20 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </button>
            )}

            {activeTab === "videos" && (
              <button
                onClick={() => setVideoModal({ open: true })}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#00a76f] hover:bg-[#007849] text-white text-xs font-bold rounded-xl shadow-md shadow-[#00a76f]/20 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Video</span>
              </button>
            )}

            {activeTab === "gallery" && (
              <button
                onClick={() => setGalleryModal({ open: true })}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#00a76f] hover:bg-[#007849] text-white text-xs font-bold rounded-xl shadow-md shadow-[#00a76f]/20 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Photo</span>
              </button>
            )}

            {activeTab === "blogs" && (
              <button
                onClick={() => setBlogModal({ open: true })}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#00a76f] hover:bg-[#007849] text-white text-xs font-bold rounded-xl shadow-md shadow-[#00a76f]/20 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Write Article</span>
              </button>
            )}

            {activeTab === "slides" && (
              <button
                onClick={() => setSlideModal({ open: true })}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#00a76f] hover:bg-[#007849] text-white text-xs font-bold rounded-xl shadow-md shadow-[#00a76f]/20 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Slide</span>
              </button>
            )}
          </div>
        </div>

        {/* 1. LEADS MANAGEMENT TAB */}
        {activeTab === "leads" && (
          <div className="space-y-6">
            {/* Analytics Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div
                onClick={() => setStatusFilter("ALL")}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between bg-white shadow-sm ${
                  statusFilter === "ALL"
                    ? "border-[#00a76f] ring-2 ring-[#00a76f]/20 shadow-md"
                    : "border-slate-200/80 hover:border-slate-300"
                }`}
              >
                <div className="space-y-1">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Leads</div>
                  <div className="text-3xl font-black text-slate-900">{leads.length}</div>
                  <div className="text-[10px] text-[#00a76f] font-bold flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>+100% MySQL Live</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-[#00a76f]/10 border border-[#00a76f]/20 flex items-center justify-center text-[#00a76f]">
                  <Users className="w-6 h-6" />
                </div>
              </div>

              <div
                onClick={() => setStatusFilter("NEW")}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between bg-white shadow-sm ${
                  statusFilter === "NEW"
                    ? "border-[#ff5630] ring-2 ring-[#ff5630]/20 shadow-md"
                    : "border-slate-200/80 hover:border-slate-300"
                }`}
              >
                <div className="space-y-1">
                  <div className="text-[11px] font-bold text-[#ff5630] uppercase tracking-wider">New Enquiries</div>
                  <div className="text-3xl font-black text-slate-900">{newCount}</div>
                  <div className="text-[10px] text-[#ff5630] font-bold flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>Requires Action</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-[#ff5630]/10 border border-[#ff5630]/20 flex items-center justify-center text-[#ff5630]">
                  <Zap className="w-6 h-6" />
                </div>
              </div>

              <div
                onClick={() => setStatusFilter("QUALIFIED")}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between bg-white shadow-sm ${
                  statusFilter === "QUALIFIED"
                    ? "border-[#ffab00] ring-2 ring-[#ffab00]/20 shadow-md"
                    : "border-slate-200/80 hover:border-slate-300"
                }`}
              >
                <div className="space-y-1">
                  <div className="text-[11px] font-bold text-[#ffab00] uppercase tracking-wider">Qualified Quotes</div>
                  <div className="text-3xl font-black text-slate-900">{qualifiedCount}</div>
                  <div className="text-[10px] text-[#ffab00] font-bold flex items-center gap-1">
                    <Activity className="w-3 h-3" />
                    <span>In Negotiation</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-[#ffab00]/10 border border-[#ffab00]/20 flex items-center justify-center text-[#ffab00]">
                  <ShieldCheck className="w-6 h-6" />
                </div>
              </div>

              <div
                onClick={() => setStatusFilter("CLOSED")}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between bg-white shadow-sm ${
                  statusFilter === "CLOSED"
                    ? "border-[#078dee] ring-2 ring-[#078dee]/20 shadow-md"
                    : "border-slate-200/80 hover:border-slate-300"
                }`}
              >
                <div className="space-y-1">
                  <div className="text-[11px] font-bold text-[#078dee] uppercase tracking-wider">Closed Orders</div>
                  <div className="text-3xl font-black text-slate-900">{closedCount}</div>
                  <div className="text-[10px] text-[#078dee] font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Converted Sales</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-[#078dee]/10 border border-[#078dee]/20 flex items-center justify-center text-[#078dee]">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Minimals Light Filter & Search Controls */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, phone, machine, city..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#00a76f] focus:bg-white transition-all"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
                <span className="text-[11px] font-bold text-slate-500 uppercase mr-1 flex items-center gap-1">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  Status:
                </span>
                {["ALL", "NEW", "CONTACTED", "QUALIFIED", "CLOSED"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                      statusFilter === st
                        ? "bg-[#00a76f] border-[#00a76f] text-white shadow-md shadow-[#00a76f]/20"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Minimals Light Table */}
            <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                      <th className="p-4">LEAD ID & DATE</th>
                      <th className="p-4">CUSTOMER DETAILS</th>
                      <th className="p-4">MACHINE REQUIREMENT</th>
                      <th className="p-4">LOCATION</th>
                      <th className="p-4">STATUS</th>
                      <th className="p-4 text-right">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredLeads.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-12 text-center text-slate-400">
                          <Users className="w-8 h-8 mx-auto mb-2 opacity-40" />
                          <p className="font-semibold text-sm text-slate-600">No lead records found</p>
                        </td>
                      </tr>
                    ) : (
                      filteredLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-4">
                            <span className="font-mono font-bold text-slate-900 block">{lead.id}</span>
                            <span className="text-[11px] text-slate-400 block">{lead.createdAt}</span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-[#00a76f]/10 border border-[#00a76f]/20 flex items-center justify-center text-[#00a76f] font-black text-xs shrink-0 shadow-xs">
                                {lead.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <strong className="text-slate-900 block font-bold text-sm">{lead.name}</strong>
                                <a href={`tel:${lead.phone}`} className="text-slate-500 hover:text-[#00a76f] font-mono block text-[11px] transition-colors">
                                  {lead.phone}
                                </a>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="font-bold text-[#00a76f] block">{lead.machineType}</span>
                            {lead.quantity && <span className="text-[11px] text-slate-500 block">Qty: {lead.quantity}</span>}
                          </td>
                          <td className="p-4 text-slate-600">
                            {lead.city || lead.state ? (
                              <span>{[lead.city, lead.state].filter(Boolean).join(", ")}</span>
                            ) : (
                              <span className="text-slate-400">—</span>
                            )}
                          </td>
                          <td className="p-4">
                            <select
                              value={lead.status}
                              onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadItem["status"])}
                              className={`text-[11px] font-extrabold px-3 py-1 rounded-xl border focus:outline-none cursor-pointer ${
                                lead.status === "NEW"
                                  ? "bg-red-50 border-red-200 text-red-600"
                                  : lead.status === "CONTACTED"
                                  ? "bg-blue-50 border-blue-200 text-blue-600"
                                  : lead.status === "QUALIFIED"
                                  ? "bg-amber-50 border-amber-200 text-amber-600"
                                  : "bg-emerald-50 border-emerald-200 text-emerald-600"
                              }`}
                            >
                              <option value="NEW">NEW</option>
                              <option value="CONTACTED">CONTACTED</option>
                              <option value="QUALIFIED">QUALIFIED</option>
                              <option value="CLOSED">CLOSED</option>
                            </select>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => setSelectedLead(lead)}
                                title="View Lead Details"
                                className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-xl transition-all cursor-pointer"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => deleteLead(lead.id)}
                                title="Delete Lead"
                                className="p-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-xl transition-all cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 2. PRODUCTS CATALOG TAB */}
        {activeTab === "products" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((item) => (
              <div key={item.id} className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#00a76f]/40 transition-all shadow-sm">
                <div>
                  <div className="relative h-48 bg-slate-100">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    {item.bestSeller && (
                      <span className="absolute top-3 left-3 bg-[#00a76f] text-white text-[10px] font-black px-2.5 py-1 rounded-lg shadow-md">
                        BEST SELLER
                      </span>
                    )}
                  </div>
                  <div className="p-5 space-y-2">
                    <span className="text-[10px] font-bold uppercase text-[#00a76f] tracking-wider block">
                      {item.category}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 leading-snug">{item.name}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2">{item.description}</p>
                    <div className="pt-2 text-xs font-mono font-bold text-[#00a76f]">
                      Capacity: {item.capacity}
                    </div>
                  </div>
                </div>
                <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-100 mt-4">
                  <span className="text-xs font-bold text-slate-900">{item.price}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setProductModal({ open: true, item })}
                      className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl border border-slate-200 transition-all cursor-pointer"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteProduct(item.id)}
                      className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl border border-red-200 transition-all cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 3. VIDEO GALLERY TAB */}
        {activeTab === "videos" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((item) => (
              <div key={item.id} className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#00a76f]/40 transition-all shadow-sm">
                <div>
                  <div className="relative h-48 bg-slate-100">
                    <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                    <span className="absolute bottom-3 right-3 bg-slate-900/80 text-white text-[10px] font-mono px-2 py-0.5 rounded-md">
                      {item.duration}
                    </span>
                  </div>
                  <div className="p-5 space-y-2">
                    <span className="text-[10px] font-bold uppercase text-[#00a76f] tracking-wider block">
                      {item.category}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 leading-snug">{item.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2">{item.description}</p>
                  </div>
                </div>
                <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-100 mt-4">
                  <span className="text-[11px] font-mono text-slate-400">ID: {item.youtubeId}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setVideoModal({ open: true, item })}
                      className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl border border-slate-200 transition-all cursor-pointer"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteVideo(item.id)}
                      className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl border border-red-200 transition-all cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 4. GALLERY TAB */}
        {activeTab === "gallery" && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {gallery.map((item) => (
              <div key={item.id} className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#00a76f]/40 transition-all shadow-sm">
                <div>
                  <div className="h-44 bg-slate-100">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4 space-y-1">
                    <span className="text-[10px] font-bold uppercase text-[#00a76f] block">{item.category}</span>
                    <h4 className="text-xs font-bold text-slate-900 truncate">{item.title}</h4>
                    <p className="text-[11px] text-slate-500 line-clamp-1">{item.caption}</p>
                  </div>
                </div>
                <div className="p-4 pt-0 flex justify-end gap-2 border-t border-slate-100 mt-2">
                  <button
                    onClick={() => setGalleryModal({ open: true, item })}
                    className="p-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-lg border border-slate-200 transition-all cursor-pointer"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => deleteGallery(item.id)}
                    className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg border border-red-200 transition-all cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 5. BLOGS TAB */}
        {activeTab === "blogs" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogs.map((item) => (
              <div key={item.id} className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#00a76f]/40 transition-all shadow-sm">
                <div>
                  <div className="h-52 bg-slate-100">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5 space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span className="font-bold text-[#00a76f] uppercase">{item.category}</span>
                      <span>{item.date}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-3">{item.excerpt}</p>
                  </div>
                </div>
                <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-100 mt-4">
                  <span className="text-[11px] text-slate-400">Author: {item.author}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setBlogModal({ open: true, item })}
                      className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl border border-slate-200 transition-all cursor-pointer"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteBlog(item.id)}
                      className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl border border-red-200 transition-all cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 6. HERO SLIDES TAB */}
        {activeTab === "slides" && (
          <div className="grid grid-cols-1 gap-6">
            {slides.map((slide) => (
              <div key={slide.id} className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden p-6 flex flex-col md:flex-row gap-6 shadow-sm">
                <div className="w-full md:w-64 h-44 bg-slate-100 rounded-xl overflow-hidden shrink-0 border border-slate-200">
                  <img src={slide.image} alt={slide.titleRed} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 space-y-3">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    {slide.eyebrow}
                  </span>
                  <h3 className="text-xl font-black text-slate-900">
                    <span className="text-[#ff5630]">{slide.titleRed}</span>{" "}
                    <span className="text-[#00a76f]">{slide.titleGreen}</span>{" "}
                    <span>{slide.titleSuffix}</span>
                  </h3>
                  <p className="text-xs text-slate-600">{slide.subtitle}</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {slide.bullets.map((b, idx) => (
                      <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 border border-slate-200 px-3 py-1 rounded-full">
                        ✓ {b}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-start gap-2 shrink-0">
                  <button
                    onClick={() => setSlideModal({ open: true, item: slide })}
                    className="p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl border border-slate-200 transition-all cursor-pointer"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteSlide(slide.id)}
                    className="p-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl border border-red-200 transition-all cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modals with Clean White Minimals Style */}
      {/* Product Modal */}
      {productModal.open && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-white border border-slate-200 rounded-3xl p-6 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-slate-900 uppercase">
                {productModal.item ? "Edit Product" : "Add New Product"}
              </h3>
              <button onClick={() => setProductModal({ open: false })} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={saveProductSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-600 font-bold mb-1 uppercase">Product Name *</label>
                  <input name="name" defaultValue={productModal.item?.name} required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900" />
                </div>
                <div>
                  <label className="block text-slate-600 font-bold mb-1 uppercase">Category *</label>
                  <input name="category" defaultValue={productModal.item?.category || "Paper Plate Machine"} required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-600 font-bold mb-1 uppercase">Price *</label>
                  <input name="price" defaultValue={productModal.item?.price || "₹45,000 Onwards"} required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900" />
                </div>
                <div>
                  <label className="block text-slate-600 font-bold mb-1 uppercase">Capacity *</label>
                  <input name="capacity" defaultValue={productModal.item?.capacity || "2,500 - 4,000 Plates/Hour"} required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900" />
                </div>
              </div>
              <div>
                <label className="block text-slate-600 font-bold mb-1 uppercase">Image URL *</label>
                <input name="image" defaultValue={productModal.item?.image} placeholder="https://..." required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900" />
              </div>
              <div>
                <label className="block text-slate-600 font-bold mb-1 uppercase">Description *</label>
                <textarea name="description" rows={3} defaultValue={productModal.item?.description} required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900" />
              </div>
              <div>
                <label className="block text-slate-600 font-bold mb-1 uppercase">Features (One per line)</label>
                <textarea name="features" rows={3} defaultValue={productModal.item?.features?.join("\n")} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900" />
              </div>
              <div className="flex items-center gap-2 pt-2">
                <input type="checkbox" name="bestSeller" id="bestSeller" defaultChecked={productModal.item?.bestSeller} className="rounded" />
                <label htmlFor="bestSeller" className="text-slate-700 font-bold cursor-pointer">Mark as Best Seller</label>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setProductModal({ open: false })} className="px-4 py-2 bg-slate-100 text-slate-600 font-bold rounded-xl">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-[#00a76f] text-white font-bold rounded-xl">Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {videoModal.open && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-slate-900 uppercase">
                {videoModal.item ? "Edit Video" : "Add New Video"}
              </h3>
              <button onClick={() => setVideoModal({ open: false })} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={saveVideoSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-600 font-bold mb-1 uppercase">Video Title *</label>
                <input name="title" defaultValue={videoModal.item?.title} required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-600 font-bold mb-1 uppercase">YouTube ID *</label>
                  <input name="youtubeId" defaultValue={videoModal.item?.youtubeId || "dQw4w9WgXcQ"} required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900" />
                </div>
                <div>
                  <label className="block text-slate-600 font-bold mb-1 uppercase">Category *</label>
                  <input name="category" defaultValue={videoModal.item?.category || "Machines"} required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-600 font-bold mb-1 uppercase">Duration</label>
                  <input name="duration" defaultValue={videoModal.item?.duration || "3:45"} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900" />
                </div>
                <div>
                  <label className="block text-slate-600 font-bold mb-1 uppercase">Thumbnail URL</label>
                  <input name="thumbnail" defaultValue={videoModal.item?.thumbnail} placeholder="https://..." className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900" />
                </div>
              </div>
              <div>
                <label className="block text-slate-600 font-bold mb-1 uppercase">Description</label>
                <textarea name="description" rows={2} defaultValue={videoModal.item?.description} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900" />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setVideoModal({ open: false })} className="px-4 py-2 bg-slate-100 text-slate-600 font-bold rounded-xl">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-[#00a76f] text-white font-bold rounded-xl">Save Video</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Gallery Modal */}
      {galleryModal.open && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-slate-900 uppercase">
                {galleryModal.item ? "Edit Gallery Photo" : "Add Gallery Photo"}
              </h3>
              <button onClick={() => setGalleryModal({ open: false })} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={saveGallerySubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-600 font-bold mb-1 uppercase">Title *</label>
                <input name="title" defaultValue={galleryModal.item?.title} required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900" />
              </div>
              <div>
                <label className="block text-slate-600 font-bold mb-1 uppercase">Image URL *</label>
                <input name="image" defaultValue={galleryModal.item?.image} placeholder="https://..." required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-600 font-bold mb-1 uppercase">Category</label>
                  <input name="category" defaultValue={galleryModal.item?.category || "Plant Infrastructure"} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900" />
                </div>
                <div>
                  <label className="block text-slate-600 font-bold mb-1 uppercase">Caption</label>
                  <input name="caption" defaultValue={galleryModal.item?.caption} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900" />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setGalleryModal({ open: false })} className="px-4 py-2 bg-slate-100 text-slate-600 font-bold rounded-xl">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-[#00a76f] text-white font-bold rounded-xl">Save Photo</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Blog Modal */}
      {blogModal.open && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-xl w-full bg-white border border-slate-200 rounded-3xl p-6 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-slate-900 uppercase">
                {blogModal.item ? "Edit Blog Article" : "Write New Blog Article"}
              </h3>
              <button onClick={() => setBlogModal({ open: false })} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={saveBlogSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-600 font-bold mb-1 uppercase">Article Title *</label>
                <input name="title" defaultValue={blogModal.item?.title} required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-600 font-bold mb-1 uppercase">Category</label>
                  <input name="category" defaultValue={blogModal.item?.category || "Business Guide"} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900" />
                </div>
                <div>
                  <label className="block text-slate-600 font-bold mb-1 uppercase">Author</label>
                  <input name="author" defaultValue={blogModal.item?.author || "Mohanty Udyog Editorial Team"} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900" />
                </div>
                <div>
                  <label className="block text-slate-600 font-bold mb-1 uppercase">Read Time</label>
                  <input name="readTime" defaultValue={blogModal.item?.readTime || "5 min read"} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900" />
                </div>
              </div>
              <div>
                <label className="block text-slate-600 font-bold mb-1 uppercase">Image URL *</label>
                <input name="image" defaultValue={blogModal.item?.image} placeholder="https://..." required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900" />
              </div>
              <div>
                <label className="block text-slate-600 font-bold mb-1 uppercase">Excerpt *</label>
                <textarea name="excerpt" rows={2} defaultValue={blogModal.item?.excerpt} required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900" />
              </div>
              <div>
                <label className="block text-slate-600 font-bold mb-1 uppercase">Content Markdown *</label>
                <textarea name="content" rows={4} defaultValue={blogModal.item?.content} required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900" />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setBlogModal({ open: false })} className="px-4 py-2 bg-slate-100 text-slate-600 font-bold rounded-xl">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-[#00a76f] text-white font-bold rounded-xl">Save Article</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Hero Slide Modal */}
      {slideModal.open && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-xl w-full bg-white border border-slate-200 rounded-3xl p-6 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-slate-900 uppercase">
                {slideModal.item ? "Edit Hero Slide" : "Add Hero Slide"}
              </h3>
              <button onClick={() => setSlideModal({ open: false })} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={saveSlideSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-600 font-bold mb-1 uppercase">Eyebrow Badge</label>
                <input name="eyebrow" defaultValue={slideModal.item?.eyebrow || "A MARK OF QUALITY & TRUST • ISO 9001:2015 CERTIFIED"} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-600 font-bold mb-1 uppercase">Title (Red Part)</label>
                  <input name="titleRed" defaultValue={slideModal.item?.titleRed || "Paper Plate"} required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900" />
                </div>
                <div>
                  <label className="block text-slate-600 font-bold mb-1 uppercase">Title (Green Part)</label>
                  <input name="titleGreen" defaultValue={slideModal.item?.titleGreen || "Making Machines"} required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900" />
                </div>
                <div>
                  <label className="block text-slate-600 font-bold mb-1 uppercase">Title Suffix</label>
                  <input name="titleSuffix" defaultValue={slideModal.item?.titleSuffix || "Manufacturer"} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900" />
                </div>
              </div>
              <div>
                <label className="block text-slate-600 font-bold mb-1 uppercase">Subtitle</label>
                <textarea name="subtitle" rows={2} defaultValue={slideModal.item?.subtitle} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-600 font-bold mb-1 uppercase">Capacity Tag</label>
                  <input name="capacityTag" defaultValue={slideModal.item?.capacityTag || "HIGH-SPEED PRODUCTION: UP TO 4,000 PLATES/HR"} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900" />
                </div>
                <div>
                  <label className="block text-slate-600 font-bold mb-1 uppercase">Image URL *</label>
                  <input name="image" defaultValue={slideModal.item?.image} placeholder="https://..." required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900" />
                </div>
              </div>
              <div>
                <label className="block text-slate-600 font-bold mb-1 uppercase">Bullet Highlights (One per line)</label>
                <textarea name="bullets" rows={3} defaultValue={slideModal.item?.bullets?.join("\n")} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900" />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setSlideModal({ open: false })} className="px-4 py-2 bg-slate-100 text-slate-600 font-bold rounded-xl">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-[#00a76f] text-white font-bold rounded-xl">Save Slide</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lead Details Modal Drawer (Light Mode) */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-lg bg-white border-l border-slate-200 h-full p-6 sm:p-8 overflow-y-auto space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-extrabold uppercase bg-[#00a76f]/10 text-[#00a76f] px-2.5 py-1 rounded-lg border border-[#00a76f]/20">
                  LEAD DETAILS
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-2">
                  {selectedLead.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-2 bg-slate-50 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-600 transition-colors cursor-pointer border border-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2.5">
                <div className="flex items-center gap-2 text-slate-600">
                  <Phone className="w-4 h-4 text-[#00a76f]" />
                  <span className="font-bold text-slate-900 font-mono text-sm">
                    {selectedLead.phone}
                  </span>
                </div>
                {selectedLead.email && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <Mail className="w-4 h-4 text-[#078dee]" />
                    <span>{selectedLead.email}</span>
                  </div>
                )}
                {selectedLead.city && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin className="w-4 h-4 text-[#ff5630]" />
                    <span>
                      {[selectedLead.city, selectedLead.state].filter(Boolean).join(", ")}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-slate-600">
                  <Clock className="w-4 h-4 text-[#ffab00]" />
                  <span>Submitted: {selectedLead.createdAt}</span>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  MACHINE REQUIREMENT
                </span>
                <p className="text-sm font-black text-[#00a76f]">
                  {selectedLead.machineType}
                </p>
                {selectedLead.quantity && (
                  <p className="text-slate-600">Quantity: {selectedLead.quantity}</p>
                )}
              </div>

              {selectedLead.message && (
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5" />
                    CUSTOMER MESSAGE
                  </span>
                  <p className="text-slate-700 leading-relaxed italic bg-white p-3 rounded-xl border border-slate-200">
                    &quot;{selectedLead.message}&quot;
                  </p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedLead(null)}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl border border-slate-200 transition-all cursor-pointer"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
