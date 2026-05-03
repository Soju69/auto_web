import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

function sanitizeSegment(value: string) {
  return value.replace(/[^a-zA-Z0-9_-]/g, "-").replace(/-+/g, "-").slice(0, 48) || "file";
}

export async function saveUploadedTradeInPhotos(files: File[]) {
  const uploadDir = path.join(process.cwd(), "public", "uploads", "trade-in");
  await mkdir(uploadDir, { recursive: true });

  const savedPhotos = [];

  for (const file of files) {
    if (!file.type.startsWith("image/")) {
      continue;
    }

    const extension = path.extname(file.name) || ".jpg";
    const fileName = `${Date.now()}-${sanitizeSegment(file.name.replace(extension, ""))}-${Math.round(
      Math.random() * 100000
    )}${extension}`;
    const filePath = path.join(uploadDir, fileName);
    const buffer = Buffer.from(await file.arrayBuffer());

    await writeFile(filePath, buffer);

    savedPhotos.push({
      url: `/uploads/trade-in/${fileName}`,
      originalName: file.name,
      mimeType: file.type,
      size: buffer.byteLength
    });
  }

  return savedPhotos;
}
