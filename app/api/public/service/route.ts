import { NextResponse } from "next/server";
import { serviceFormSchema } from "@/lib/form-schemas";
import { createServiceRequest } from "@/lib/server/database";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const parsed = serviceFormSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  try {
    createServiceRequest(parsed.data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Не удалось создать запись" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
