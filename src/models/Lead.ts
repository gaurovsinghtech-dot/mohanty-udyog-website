import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILead extends Document {
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
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema: Schema<ILead> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true, index: true },
    email: { type: String, trim: true, lowercase: true, index: true },
    company: { type: String, trim: true },
    productInterested: { type: String, required: true, default: "General Machinery Inquiry" },
    requirement: { type: String, trim: true },
    message: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    source: { type: String, default: "Website Contact Form" },
    status: {
      type: String,
      enum: ["new", "contacted", "qualified", "converted", "closed"],
      default: "new",
      index: true,
    },
  },
  { timestamps: true }
);

export const Lead: Model<ILead> =
  mongoose.models.Lead || mongoose.model<ILead>("Lead", LeadSchema);
