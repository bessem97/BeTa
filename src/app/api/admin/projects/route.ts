import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const projects = await prisma.project.findMany({
    include: { service: true, images: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const slug = body.titre
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "") + `-${Date.now().toString().slice(-4)}`;

    const project = await prisma.project.create({
      data: {
        titre: body.titre,
        slug: body.slug || slug,
        description: body.description,
        client: body.client,
        lieu: body.lieu,
        pays: body.pays || "Tunisie",
        date: body.date || new Date().getFullYear().toString(),
        serviceId: body.serviceId,
        statut: body.statut || "Terminé",
        publie: body.publie ?? true,
        misEnAvant: body.misEnAvant ?? false,
        images: {
          create: (body.images || []).map((imgUrl: string, idx: number) => ({
            url: imgUrl,
            alt: body.titre,
            ordre: idx,
          })),
        },
      },
      include: { images: true, service: true },
    });

    return NextResponse.json({ success: true, project });
  } catch (error: any) {
    console.error("Erreur création projet :", error);
    return NextResponse.json({ error: "Erreur lors de la création du projet" }, { status: 500 });
  }
}

