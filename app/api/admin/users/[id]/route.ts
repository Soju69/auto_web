import { NextResponse } from "next/server";
import { deleteEmployee, updateEmployee } from "@/lib/server/database";

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

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const deleted = deleteEmployee(id);
    return NextResponse.json(deleted);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Не удалось удалить сотрудника" },
      { status: 409 }
    );
  }
}
