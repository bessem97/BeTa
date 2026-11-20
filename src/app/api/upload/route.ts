import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import sharp from "sharp";
import path from "path";
import fs from "fs";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "Aucun fichier fourni" }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9]/g, "_")}.webp`;
    const outputPath = path.join(uploadDir, filename);

    // Optimisation Sharp : max 1600px de large, qualité 85% WebP
    await sharp(buffer)
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(outputPath);

    const publicUrl = `/uploads/${filename}`;

    const media = await prisma.mediaFile.create({
      data: {
        nom: file.name,
        url: publicUrl,
        type: "image/webp",
        taille: fs.statSync(outputPath).size,
      },
    });

    return NextResponse.json({ success: true, url: publicUrl, id: media.id });
  } catch (err: any) {
    console.error("Erreur Upload :", err);
    return NextResponse.json({ error: "Erreur lors du traitement de l'image" }, { status: 500 });
  }
}

