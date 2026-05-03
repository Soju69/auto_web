import { NextResponse } from "next/server";
import { updateServiceOrderRecord } from "@/lib/server/database";

export const runtime = "nodejs";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = (await request.json()) as {
    advisorId?: string;
    mechanicId?: string | null;
    status?: "new" | "confirmed" | "in_progress" | "completed" | "canceled";
  };

  const updated = updateServiceOrderRecord(id, {
    advisorId: body.advisorId,
    mechanicId: body.mechanicId ?? undefined,
    status: body.status
  });
  return NextResponse.json(updated);
}
