import { NextResponse } from "next/server";
import { getAdminSnapshot } from "@/lib/server/admin-data";

export const runtime = "nodejs";

export async function GET() {
  const data = getAdminSnapshot();
  return NextResponse.json(data);
}
