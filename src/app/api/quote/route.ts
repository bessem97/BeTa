import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendQuoteNotification } from "@/lib/email";
import path from "path";
import fs from "fs";

const quoteSchema = z.object({
  nom: z.string().min(2, "Le nom doit comporter au moins 2 caractères"),
  societe: z.string().optional(),
  email: z.string().email("Adresse email invalide"),
  telephone: z.string().min(6, "Numéro de téléphone requis"),
  services: z.string().min(2, "Au moins un service requis"),
  description: z.string().min(10, "Veuillez détailler votre projet (min 10 caractères)"),
  budget: z.string().optional(),
  delai: z.string().optional(),
  pays: z.string().min(2, "Le pays d'intervention est requis"),
  ville: z.string().min(2, "La ville est requise"),
  website_honeypot: z.string().optional(), // Protection anti-spam
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    
    // Honeypot check
    const honeypot = formData.get("website_honeypot") as string;
    if (honeypot && honeypot.trim().length > 0) {
      // Robot détecté - on simule le succès pour ne pas l'alerter
      return NextResponse.json({ success: true, message: "Demande reçue" });
    }

    const payload = {
      nom: (formData.get("nom") as string) || "",
      societe: (formData.get("societe") as string) || "",
      email: (formData.get("email") as string) || "",
      telephone: (formData.get("telephone") as string) || "",
      services: (formData.get("services") as string) || "",
      description: (formData.get("description") as string) || "",
      budget: (formData.get("budget") as string) || "",
      delai: (formData.get("delai") as string) || "",
      pays: (formData.get("pays") as string) || "",
      ville: (formData.get("ville") as string) || "",
    };

    const validated = quoteSchema.parse(payload);

    // Gestion des pièces jointes (plans, cahiers des charges)
    const files = formData.getAll("files") as File[];
    const uploadedFilePaths: string[] = [];

    if (files && files.length > 0) {
      const uploadDir = path.join(process.cwd(), "public", "uploads", "quotes");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      for (const file of files) {
        if (file && typeof file.name === "string" && file.size > 0) {
          // Limite 10 Mo par fichier
          if (file.size > 10 * 1024 * 1024) continue;

          const bytes = await file.arrayBuffer();
          const buffer = Buffer.from(bytes);
          const cleanName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
          const filePath = path.join(uploadDir, cleanName);
          fs.writeFileSync(filePath, buffer);
          uploadedFilePaths.push(`/uploads/quotes/${cleanName}`);
        }
      }
    }

    // Sauvegarde en base de données
    const quote = await prisma.quoteRequest.create({
      data: {
        nom: validated.nom,
        societe: validated.societe || null,
        email: validated.email,
        telephone: validated.telephone,
        services: validated.services,
        description: validated.description,
        budget: validated.budget || null,
        delai: validated.delai || null,
        pays: validated.pays,
        ville: validated.ville,
        fichiers: uploadedFilePaths.length > 0 ? JSON.stringify(uploadedFilePaths) : null,
        statut: "nouveau",
      },
    });

    // Envoi des emails de notification
    let parsedServices: string[] = [];
    try {
      parsedServices = JSON.parse(validated.services);
    } catch {
      parsedServices = [validated.services];
    }

    sendQuoteNotification({
      nom: validated.nom,
      societe: validated.societe,
      email: validated.email,
      telephone: validated.telephone,
      services: parsedServices,
      description: validated.description,
      pays: validated.pays,
      ville: validated.ville,
      budget: validated.budget,
      delai: validated.delai,
    }).catch((err) => console.error("Erreur notification email devis :", err));

    return NextResponse.json({
      success: true,
      message: "Demande de devis enregistrée avec succès",
      id: quote.id,
    });
  } catch (error: any) {
    console.error("Erreur API Quote :", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.issues }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: "Une erreur interne est survenue" }, { status: 500 });
  }
}

