import { NextResponse } from "next/server";
import { updateLeadStatus, deleteLead } from "@/lib/leadsStore";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    const validStatuses = ["new", "contacted", "qualified", "converted", "closed"];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: "Invalid lead status value" },
        { status: 400 }
      );
    }

    const updated = await updateLeadStatus(id, status);
    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Lead not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Lead status updated to ${status}`,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update lead status", error: String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const deleted = await deleteLead(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Lead not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Lead deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to delete lead", error: String(error) },
      { status: 500 }
    );
  }
}
