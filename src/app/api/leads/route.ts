import { NextResponse } from "next/server";
import { createLead, getLeads } from "@/lib/leadsStore";
import { checkRateLimit } from "@/lib/rateLimiter";

export async function GET() {
  try {
    const leads = await getLeads();
    return NextResponse.json({ success: true, leads });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch leads", error: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // 1. IP Rate Limiting Security Check
    const clientIp =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    const rateLimit = checkRateLimit(clientIp, 5, 15 * 60 * 1000); // 5 requests per 15 mins
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: "Rate limit exceeded. Too many enquiry submissions from your IP address. Please wait 15 minutes.",
        },
        { status: 429 }
      );
    }

    const body = await request.json();

    // 2. Hidden Honeypot Captcha Verification
    const honeypot = body.website_hp || body.fax_number_hp;
    if (honeypot && String(honeypot).trim().length > 0) {
      // Spam Bot Detected - Reject request
      return NextResponse.json(
        { success: false, message: "Spam bot submission blocked." },
        { status: 400 }
      );
    }

    // 3. Time-based Bot Challenge (Instant submission < 1.2s)
    if (body.formRenderTime) {
      const elapsed = Date.now() - Number(body.formRenderTime);
      if (elapsed < 1200) {
        return NextResponse.json(
          { success: false, message: "Automated submission detected. Please submit manually." },
          { status: 400 }
        );
      }
    }

    const { name, phone, email, company, productInterested, requirement, message, city, state, source } = body;

    // Field validation
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, message: "Full Name is required" },
        { status: 400 }
      );
    }

    const cleanDigits = (phone || "").replace(/\D/g, "");
    const isValid10Digit = cleanDigits.length === 10 || (cleanDigits.length === 12 && cleanDigits.startsWith("91"));
    if (!isValid10Digit) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid 10-digit mobile number (e.g. 9876543210)" },
        { status: 400 }
      );
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email address format" },
        { status: 400 }
      );
    }

    const newLead = await createLead({
      name: name.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : "",
      company: company ? company.trim() : "",
      productInterested: productInterested || "General Machinery Enquiry",
      requirement: requirement ? requirement.trim() : "",
      message: message ? message.trim() : "",
      city: city ? city.trim() : "",
      state: state ? state.trim() : "",
      source: source || "Website Contact Form",
      status: "new",
    });

    return NextResponse.json(
      { success: true, message: "Lead submitted successfully", lead: newLead },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to submit lead", error: String(error) },
      { status: 500 }
    );
  }
}
