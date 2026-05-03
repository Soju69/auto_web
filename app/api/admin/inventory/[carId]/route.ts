import { NextResponse } from "next/server";
import { updateInventoryRecord } from "@/lib/server/database";

export const runtime = "nodejs";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ carId: string }> }
) {
  const { carId } = await params;
  const body = (await request.json()) as {
    status?: "available" | "reserved" | "sold" | "hidden";
    visible?: boolean;
    featured?: boolean;
    managerId?: string | null;
  };

  const updated = updateInventoryRecord(carId, {
    status: body.status,
    visible: body.visible,
    featured: body.featured,
    managerId: body.managerId ?? undefined
  });
  return NextResponse.json(updated);
}
