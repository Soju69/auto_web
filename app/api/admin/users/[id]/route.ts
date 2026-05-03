import { NextResponse } from "next/server";
import { updateEmployee } from "@/lib/server/database";

export const runtime = "nodejs";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = (await request.json()) as {
    role?: "admin" | "sales_manager" | "service_manager" | "mechanic" | "trade_in_appraiser";
    status?: "active" | "vacation" | "blocked";
  };

  const updated = updateEmployee(id, body);
  return NextResponse.json(updated);
}
