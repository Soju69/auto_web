import { NextResponse } from "next/server";
import { updateLeadRecord } from "@/lib/server/database";

export const runtime = "nodejs";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = (await request.json()) as {
    status?: "new" | "in_progress" | "meeting_scheduled" | "sold" | "declined";
    managerId?: string | null;
  };

  const updated = updateLeadRecord(id, {
    status: body.status,
    managerId: body.managerId ?? undefined
  });
  return NextResponse.json(updated);
}
