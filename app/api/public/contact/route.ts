import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/form-schemas";
import { createContactLead } from "@/lib/server/database";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const parsed = contactFormSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  createContactLead(parsed.data);

  return NextResponse.json({ ok: true });
}
