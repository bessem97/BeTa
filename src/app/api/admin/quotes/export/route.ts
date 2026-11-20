import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const quotes = await prisma.quoteRequest.findMany({
      orderBy: { createdAt: "desc" },
    });

    // En-têtes CSV
    const headers = ["ID", "Date", "Nom", "Société", "Email", "Téléphone", "Pays", "Ville", "Services", "Budget", "Délai", "Statut", "Notes Internes"];
    
    const rows = quotes.map((q) => [
      `"${q.id}"`,
      `"${q.createdAt.toISOString()}"`,
      `"${(q.nom || "").replace(/"/g, '""')}"`,
      `"${(q.societe || "").replace(/"/g, '""')}"`,
      `"${(q.email || "").replace(/"/g, '""')}"`,
      `"${(q.telephone || "").replace(/"/g, '""')}"`,
      `"${(q.pays || "").replace(/"/g, '""')}"`,
      `"${(q.ville || "").replace(/"/g, '""')}"`,
      `"${(q.services || "").replace(/"/g, '""')}"`,
      `"${(q.budget || "").replace(/"/g, '""')}"`,
      `"${(q.delai || "").replace(/"/g, '""')}"`,
      `"${q.statut}"`,
      `"${(q.notesInternes || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = "\uFEFF" + [headers.join(";"), ...rows.map((r) => r.join(";"))].join("\r\n");

    return new NextResponse(csvContent, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="beta_engineering_devis_${new Date().toISOString().split("T")[0]}.csv"`,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Erreur export CSV" }, { status: 500 });
  }
}

