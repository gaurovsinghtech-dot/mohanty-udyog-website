import React from "react";
import AdminLeadsClient from "./AdminLeadsClient";
import { getLeads } from "@/lib/leadsStore";

export const metadata = {
  title: "Admin Lead Management | Apex Machina CRM",
  description: "Internal dashboard to manage customer inquiries, sales quotes, and lead conversion pipelines.",
};

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  const initialLeads = await getLeads();

  return <AdminLeadsClient initialLeads={initialLeads} />;
}
