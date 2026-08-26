import { getMysqlPool, ensureLeadsTableExists } from "./mysql";
import { RowDataPacket } from "mysql2";

export interface LeadData {
  id: string;
  name: string;
  phone: string;
  email?: string;
  company?: string;
  productInterested: string;
  requirement?: string;
  message?: string;
  city?: string;
  state?: string;
  source: string;
  status: "new" | "contacted" | "qualified" | "converted" | "closed";
  createdAt: string;
}

// Global in-memory fallback store when MySQL is not connected
declare global {
  var memoryLeads: LeadData[] | undefined;
}

const initialSampleLeads: LeadData[] = [
  {
    id: "lead-101",
    name: "Rajesh Sharma",
    phone: "+91 98765 12345",
    email: "rajesh@standardpackaging.in",
    company: "Standard Packaging Ltd.",
    productInterested: "Fully Automatic Double Die Paper Plate Machine",
    requirement: "2 Double Die Machines for new factory line",
    message: "We need delivery in Gujarat within 10 days. Please share best factory price.",
    city: "Ahmedabad",
    state: "Gujarat",
    source: "Contact Form",
    status: "new",
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: "lead-102",
    name: "Suresh Gupta",
    phone: "+91 98123 45678",
    email: "suresh.indore@gmail.com",
    company: "Gupta Disposable Industries",
    productInterested: "Heavy Duty Hydraulic Paper Thali Machine",
    requirement: "1 Hydraulic 5-Ton Press + Dies",
    message: "Looking to manufacture deep wrinkle 400 GSM silver thalis.",
    city: "Indore",
    state: "Madhya Pradesh",
    source: "Product Detail Page",
    status: "contacted",
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    id: "lead-103",
    name: "Vikramjit Singh",
    phone: "+91 94111 22233",
    email: "vikram@punjabpack.com",
    company: "Punjab Packaging House",
    productInterested: "PE Coated Silver & Printed Paper Plate Raw Material Rolls",
    requirement: "5 Tons Monthly Reel Supply Contract",
    message: "Please quote per kg rates for 150 GSM to 350 GSM silver foil reels.",
    city: "Ludhiana",
    state: "Punjab",
    source: "WhatsApp Enquiry",
    status: "qualified",
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
];

if (!globalThis.memoryLeads) {
  globalThis.memoryLeads = initialSampleLeads;
}

export async function createLead(data: Partial<LeadData>): Promise<LeadData> {
  const newLead: LeadData = {
    id: "lead-" + Date.now(),
    name: data.name || "Anonymous Lead",
    phone: data.phone || "",
    email: data.email || "",
    company: data.company || "",
    productInterested: data.productInterested || "General Inquiry",
    requirement: data.requirement || "",
    message: data.message || "",
    city: data.city || "",
    state: data.state || "",
    source: data.source || "Website Contact Form",
    status: data.status || "new",
    createdAt: new Date().toISOString(),
  };

  const pool = getMysqlPool();
  if (pool) {
    try {
      await ensureLeadsTableExists(pool);
      const query = `
        INSERT INTO leads (id, name, phone, email, company, productInterested, requirement, message, city, state, source, status, createdAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
      `;
      const params = [
        newLead.id,
        newLead.name,
        newLead.phone,
        newLead.email || "",
        newLead.company || "",
        newLead.productInterested || "General Inquiry",
        newLead.requirement || "",
        newLead.message || "",
        newLead.city || "",
        newLead.state || "",
        newLead.source || "Website Contact Form",
        newLead.status,
      ];
      await pool.query(query, params);
      return newLead;
    } catch (err) {
      console.warn("MySQL insert lead warning, falling back to memory store:", err);
    }
  }

  // Fallback to memory store
  globalThis.memoryLeads!.unshift(newLead);
  return newLead;
}

export async function getLeads(): Promise<LeadData[]> {
  const pool = getMysqlPool();
  if (pool) {
    try {
      await ensureLeadsTableExists(pool);
      const [rows] = await pool.query<RowDataPacket[]>(
        `SELECT id, name, phone, email, company, productInterested, requirement, message, city, state, source, status, createdAt FROM leads ORDER BY createdAt DESC`
      );

      if (Array.isArray(rows) && rows.length > 0) {
        return rows.map((r) => ({
          id: String(r.id),
          name: String(r.name || ""),
          phone: String(r.phone || ""),
          email: String(r.email || ""),
          company: String(r.company || ""),
          productInterested: String(r.productInterested || "General Inquiry"),
          requirement: String(r.requirement || ""),
          message: String(r.message || ""),
          city: String(r.city || ""),
          state: String(r.state || ""),
          source: String(r.source || "Website Contact Form"),
          status: (r.status as LeadData["status"]) || "new",
          createdAt: r.createdAt ? new Date(r.createdAt).toISOString() : new Date().toISOString(),
        }));
      }
    } catch (err) {
      console.warn("MySQL fetch leads warning, falling back to memory store:", err);
    }
  }

  return globalThis.memoryLeads || [];
}

export async function updateLeadStatus(
  id: string,
  status: LeadData["status"]
): Promise<boolean> {
  const pool = getMysqlPool();
  if (pool) {
    try {
      await ensureLeadsTableExists(pool);
      await pool.query(
        `UPDATE leads SET status = ? WHERE id = ?`,
        [status, id]
      );
      return true;
    } catch (err) {
      console.warn("MySQL status update warning:", err);
    }
  }

  const memLead = globalThis.memoryLeads?.find((l) => l.id === id);
  if (memLead) {
    memLead.status = status;
    return true;
  }
  return false;
}

export async function deleteLead(id: string): Promise<boolean> {
  const pool = getMysqlPool();
  if (pool) {
    try {
      await ensureLeadsTableExists(pool);
      await pool.query(`DELETE FROM leads WHERE id = ?`, [id]);
      return true;
    } catch (err) {
      console.warn("MySQL delete lead warning:", err);
    }
  }

  if (globalThis.memoryLeads) {
    globalThis.memoryLeads = globalThis.memoryLeads.filter((l) => l.id !== id);
    return true;
  }
  return false;
}
