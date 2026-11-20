import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const body = await req.json();

    // Suppression des anciennes images si nouvelles fournies
    if (body.images) {
      await prisma.projectImage.deleteMany({ where: { projectId: params.id } });
    }

    const updated = await prisma.project.update({
      where: { id: params.id },
      data: {
        titre: body.titre,
        description: body.description,
        client: body.client,
        lieu: body.lieu,
        pays: body.pays,
        date: body.date,
        serviceId: body.serviceId,
        statut: body.statut,
        publie: body.publie,
        misEnAvant: body.misEnAvant,
        ...(body.images && {
          images: {
            create: body.images.map((url: string, idx: number) => ({
              url,
              alt: body.titre,
              ordre: idx,
            })),
          },
        }),
      },
      include: { images: true, service: true },
    });

    return NextResponse.json({ success: true, project: updated });
  } catch (error) {
    return NextResponse.json({ error: "Erreur mise à jour projet" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    await prisma.projectImage.deleteMany({ where: { projectId: params.id } });
    await prisma.project.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erreur suppression projet" }, { status: 500 });
  }
}

