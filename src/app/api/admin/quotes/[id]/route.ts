import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { statut, notesInternes } = body;

    const updated = await prisma.quoteRequest.update({
      where: { id: params.id },
      data: {
        ...(statut && { statut }),
        ...(notesInternes !== undefined && { notesInternes }),
      },
    });

    return NextResponse.json({ success: true, quote: updated });
  } catch (error) {
    return NextResponse.json({ error: "Erreur mise à jour devis" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    await prisma.quoteRequest.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erreur suppression devis" }, { status: 500 });
  }
}

