import { NextResponse } from "next/server";
import { carInquirySchema } from "@/lib/form-schemas";
import { createCarInquiryLead } from "@/lib/server/database";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const parsed = carInquirySchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  createCarInquiryLead(parsed.data);

  return NextResponse.json({ ok: true });
}
