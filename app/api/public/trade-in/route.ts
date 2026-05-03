import { NextResponse } from "next/server";
import { tradeInFormSchema } from "@/lib/form-schemas";
import { createTradeInRequestRecord } from "@/lib/server/database";
import { saveUploadedTradeInPhotos } from "@/lib/server/uploads";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const formData = await request.formData();
  const files = formData
    .getAll("photos")
    .filter((entry): entry is File => entry instanceof File && entry.size > 0);

  const parsed = tradeInFormSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    brand: formData.get("brand"),
    model: formData.get("model"),
    year: formData.get("year"),
    mileage: formData.get("mileage"),
    vin: formData.get("vin"),
    desiredCar: formData.get("desiredCar"),
    comment: formData.get("comment")
  });

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const uploadedPhotos = await saveUploadedTradeInPhotos(files);
  try {
    const created = createTradeInRequestRecord(parsed.data, uploadedPhotos);
    return NextResponse.json({ ok: true, ...created });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Не удалось создать заявку" },
      { status: 500 }
    );
  }
}
