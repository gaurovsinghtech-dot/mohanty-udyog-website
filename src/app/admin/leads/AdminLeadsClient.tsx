"use client";

import React, { useState, useMemo } from "react";
import { LeadData } from "@/lib/leadsStore";
import {
  Search,
  Download,
  RefreshCw,
  Phone,
  Mail,
  Building,
  MapPin,
  X,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";

interface Props {
  initialLeads: LeadData[];
}

export default function AdminLeadsClient({ initialLeads }: Props) {
  const [leads, setLeads] = useState<LeadData[]>(initialLeads);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedLead, setSelectedLead] = useState<LeadData | null>(null);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchLeads = async (showSpinner: boolean = true) => {
    if (showSpinner) setLoading(true);
    try {
      const res = await fetch("/api/leads");
      const data = await res.json();
      if (data.success && Array.isArray(data.leads)) {
        setLeads(data.leads);
      }
    } catch (err) {
      console.error("Failed to refresh leads:", err);
    } finally {
      if (showSpinner) setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchLeads(false);
    const interval = setInterval(() => {
      fetchLeads(false);
    }, 3000);

    const handleFocus = () => fetchLeads(false);
    window.addEventListener("focus", handleFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  const handleStatusChange = async (leadId: string, newStatus: LeadData["status"]) => {
    setUpdatingId(leadId);
    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setLeads((prev) =>
          prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
        );
        if (selectedLead && selectedLead.id === leadId) {
          setSelectedLead({ ...selectedLead, status: newStatus });
        }
      }
    } catch (err) {
      console.error("Status update error:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredLeads = useMemo(() => {
    let result = [...leads];

    if (statusFilter !== "all") {
      result = result.filter((l) => l.status === statusFilter);
    }

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.phone.toLowerCase().includes(q) ||
          (l.email && l.email.toLowerCase().includes(q)) ||
          (l.company && l.company.toLowerCase().includes(q)) ||
          l.productInterested.toLowerCase().includes(q) ||
          (l.city && l.city.toLowerCase().includes(q))
      );
    }

    return result;
  }, [leads, statusFilter, searchQuery]);

  const stats = useMemo(() => {
    const total = leads.length;
    const newCount = leads.filter((l) => l.status === "new").length;
    const qualifiedCount = leads.filter((l) => l.status === "qualified").length;
    const convertedCount = leads.filter((l) => l.status === "converted").length;

    return { total, newCount, qualifiedCount, convertedCount };
  }, [leads]);

  const handleExportCSV = () => {
    const headers = [
      "Lead ID",
      "Date",
      "Name",
      "Phone",
      "Email",
      "Company",
      "Product Interested",
      "Requirement",
      "City",
      "State",
      "Source",
      "Status",
    ];

    const rows = filteredLeads.map((l) => [
      l.id,
      new Date(l.createdAt).toLocaleDateString(),
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.phone}"`,
      `"${l.email || ""}"`,
      `"${(l.company || "").replace(/"/g, '""')}"`,
      `"${l.productInterested.replace(/"/g, '""')}"`,
      `"${(l.requirement || "").replace(/"/g, '""')}"`,
      `"${l.city || ""}"`,
      `"${l.state || ""}"`,
      `"${l.source}"`,
      l.status,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `apex_machina_leads_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status: LeadData["status"]) => {
    switch (status) {
      case "new":
        return "bg-rose-500/20 text-rose-400 border-rose-500/30";
      case "contacted":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case "qualified":
        return "bg-sky-500/20 text-sky-400 border-sky-500/30";
      case "converted":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "closed":
        return "bg-slate-800 text-slate-400 border-slate-700";
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-industrial-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>CRM LEAD MANAGEMENT</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Customer Enquiries & Sales Pipeline
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchLeads(true)}
              disabled={loading}
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-orange-600/20 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1 shadow-lg">
            <div className="text-xs text-slate-400 font-semibold uppercase">Total Leads</div>
            <div className="text-3xl font-extrabold text-white font-mono">{stats.total}</div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1 shadow-lg">
            <div className="text-xs text-rose-400 font-semibold uppercase">New Enquiries</div>
            <div className="text-3xl font-extrabold text-rose-400 font-mono">{stats.newCount}</div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1 shadow-lg">
            <div className="text-xs text-sky-400 font-semibold uppercase">Qualified Pipeline</div>
            <div className="text-3xl font-extrabold text-sky-400 font-mono">{stats.qualifiedCount}</div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1 shadow-lg">
            <div className="text-xs text-emerald-400 font-semibold uppercase">Converted Sales</div>
            <div className="text-3xl font-extrabold text-emerald-400 font-mono">{stats.convertedCount}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by customer name, phone, company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto scrollbar-none pb-1 md:pb-0">
            {["all", "new", "contacted", "qualified", "converted", "closed"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-200 cursor-pointer border ${
                  statusFilter === st
                    ? "bg-orange-600 text-white border-orange-500 shadow-md shadow-orange-600/20"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Customer / Firm</th>
                  <th className="py-3.5 px-4">Phone & Email</th>
                  <th className="py-3.5 px-4">Product Interest</th>
                  <th className="py-3.5 px-4">Source</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400">
                      No customer leads match the selected filters.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="py-3.5 px-4 font-medium text-white">
                        <div className="font-bold">{lead.name}</div>
                        {lead.company && (
                          <div className="text-[11px] text-slate-400">{lead.company}</div>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-mono text-slate-200">{lead.phone}</div>
                        {lead.email && (
                          <div className="text-[11px] text-slate-400 truncate max-w-[140px]">
                            {lead.email}
                          </div>
                        )}
                      </td>

                      <td className="py-3.5 px-4 max-w-xs truncate text-slate-200 font-medium">
                        {lead.productInterested}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="text-[10px] font-mono bg-slate-950 border border-slate-800 px-2 py-0.5 rounded text-slate-400">
                          {lead.source}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <select
                          value={lead.status}
                          disabled={updatingId === lead.id}
                          onChange={(e) =>
                            handleStatusChange(
                              lead.id,
                              e.target.value as LeadData["status"]
                            )
                          }
                          className={`text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border cursor-pointer focus:outline-none bg-slate-950 ${getStatusBadge(
                            lead.status
                          )}`}
                        >
                          <option value="new">NEW</option>
                          <option value="contacted">CONTACTED</option>
                          <option value="qualified">QUALIFIED</option>
                          <option value="converted">CONVERTED</option>
                          <option value="closed">CLOSED</option>
                        </select>
                      </td>

                      <td className="py-3.5 px-4 text-slate-400 text-[11px] font-mono">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => setSelectedLead(lead)}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-[11px] font-semibold rounded-lg transition-colors cursor-pointer"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-semibold uppercase px-2.5 py-1 rounded-full border ${getStatusBadge(selectedLead.status)}`}>
                  {selectedLead.status}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {new Date(selectedLead.createdAt).toLocaleString()}
                </span>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div>
                <span className="text-slate-500 uppercase tracking-wider font-semibold text-[10px]">Customer Name</span>
                <h3 className="text-lg font-bold text-white">{selectedLead.name}</h3>
              </div>

              {selectedLead.company && (
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-orange-500 shrink-0" />
                  <span>Company: {selectedLead.company}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <a
                    href={`tel:${selectedLead.phone.replace(/\s+/g, "")}`}
                    className="font-mono text-emerald-400 hover:underline"
                  >
                    {selectedLead.phone}
                  </a>
                </div>

                {selectedLead.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                    <a
                      href={`mailto:${selectedLead.email}`}
                      className="font-mono text-sky-400 hover:underline truncate"
                    >
                      {selectedLead.email}
                    </a>
                  </div>
                )}
              </div>

              {(selectedLead.city || selectedLead.state) && (
                <div className="flex items-center gap-2 pt-1">
                  <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Location: {[selectedLead.city, selectedLead.state].filter(Boolean).join(", ")}</span>
                </div>
              )}

              <div className="pt-3 border-t border-slate-800 space-y-1">
                <span className="text-slate-500 uppercase tracking-wider font-semibold text-[10px]">Product Interested</span>
                <div className="text-sm font-bold text-white">{selectedLead.productInterested}</div>
              </div>

              {selectedLead.requirement && (
                <div className="space-y-1">
                  <span className="text-slate-500 uppercase tracking-wider font-semibold text-[10px]">Requirement Details</span>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-slate-200">
                    {selectedLead.requirement}
                  </div>
                </div>
              )}

              {selectedLead.message && (
                <div className="space-y-1">
                  <span className="text-slate-500 uppercase tracking-wider font-semibold text-[10px]">Customer Message</span>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-slate-200 italic">
                    &ldquo;{selectedLead.message}&rdquo;
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
              <a
                href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                  `Hello ${selectedLead.name}! 👋\n\nThank you for contacting Mohanty Udyog regarding "${selectedLead.productInterested || "Paper Plate Making Machine"}".\n\nHere is your official Quotation & Factory Contact Details:\n📌 Machine Interest: ${selectedLead.productInterested || "Paper Plate Making Machine"}\n🏭 Plant Address: IDCO Road, Jagatpur Industrial Estate, Jagatpur, Cuttack, Odisha 754021\n📞 Contact Sales: +91 74388 51356 / +91 91142 85155 / +91 70085 19265\n\nPlease let us know if you need our PDF catalog, live machine demo, or custom die quotation!`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl shadow-lg transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Send WhatsApp Quote to Customer</span>
              </a>

              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
