import { NextResponse } from "next/server";
import { updateTradeInRequestRecord } from "@/lib/server/database";

export const runtime = "nodejs";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = (await request.json()) as {
    appraiserId?: string | null;
    status?: "new" | "inspection" | "offer_prepared" | "accepted" | "declined" | "revaluation";
    estimatedValue?: number | null;
  };

  const updated = updateTradeInRequestRecord(id, {
    appraiserId: body.appraiserId ?? undefined,
    status: body.status,
    estimatedValue: body.estimatedValue ?? undefined
  });
  return NextResponse.json(updated);
}
