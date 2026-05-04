import { NextResponse } from "next/server";
import { createEmployeeSchema } from "@/lib/form-schemas";
import { createEmployee, getAdminSnapshot } from "@/lib/server/database";

export const runtime = "nodejs";

export async function GET() {
  const data = getAdminSnapshot();
  return NextResponse.json(data.users);
}

export async function POST(request: Request) {
  const parsed = createEmployeeSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  try {
    const created = createEmployee(parsed.data);
    return NextResponse.json(created);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Не удалось зарегистрировать сотрудника" },
      { status: 409 }
    );
  }
}
