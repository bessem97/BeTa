import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendContactNotification } from "@/lib/email";

const contactSchema = z.object({
  nom: z.string().min(2, "Le nom doit comporter au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  telephone: z.string().optional(),
  sujet: z.string().min(3, "Veuillez préciser le sujet"),
  message: z.string().min(10, "Le message doit comporter au moins 10 caractères"),
  website_honeypot: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Honeypot anti-spam
    if (body.website_honeypot && body.website_honeypot.trim().length > 0) {
      return NextResponse.json({ success: true, message: "Message transmis" });
    }

    const validated = contactSchema.parse(body);

    const message = await prisma.contactMessage.create({
      data: {
        nom: validated.nom,
        email: validated.email,
        telephone: validated.telephone || null,
        sujet: validated.sujet,
        message: validated.message,
        lu: false,
      },
    });

    sendContactNotification({
      nom: validated.nom,
      email: validated.email,
      telephone: validated.telephone,
      sujet: validated.sujet,
      message: validated.message,
    }).catch((err) => console.error("Erreur notification email contact :", err));

    return NextResponse.json({
      success: true,
      message: "Votre message a bien été envoyé. Notre équipe vous répondra sous 24h.",
      id: message.id,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.issues }, { status: 400 });
    }
    console.error("Erreur API Contact :", error);
    return NextResponse.json({ success: false, message: "Une erreur interne est survenue" }, { status: 500 });
  }
}

