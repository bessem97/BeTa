import nodemailer from "nodemailer";

interface QuoteEmailPayload {
  nom: string;
  societe?: string;
  email: string;
  telephone: string;
  services: string[];
  description: string;
  pays: string;
  ville: string;
  budget?: string;
  delai?: string;
}

interface ContactEmailPayload {
  nom: string;
  email: string;
  telephone?: string;
  sujet: string;
  message: string;
}

function getTransporter() {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return null;
}

export async function sendQuoteNotification(data: QuoteEmailPayload) {
  const transporter = getTransporter();
  const adminEmail = process.env.ADMIN_EMAIL || "contact@beta-engineering.com";
  const servicesList = data.services.join(", ");

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; background-color: #F4FAFA; padding: 30px; color: #0B4F5C;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(11,79,92,0.1);">
        <div style="background-color: #0B4F5C; padding: 25px; text-align: center;">
          <h1 style="color: #F4FAFA; margin: 0; font-size: 24px;">BeTA <span style="color: #FFCBA4;">Engineering</span></h1>
          <p style="color: #FFCBA4; margin: 5px 0 0 0; font-size: 13px;">Nouvelle Demande de Devis Reçue</p>
        </div>
        <div style="padding: 25px;">
          <h2 style="color: #0B4F5C; font-size: 18px; border-bottom: 2px solid #FFCBA4; padding-bottom: 8px;">Détails du Client</h2>
          <p><strong>Nom :</strong> ${data.nom}</p>
          <p><strong>Société :</strong> ${data.societe || "Non précisée"}</p>
          <p><strong>Email :</strong> <a href="mailto:${data.email}" style="color: #0B4F5C;">${data.email}</a></p>
          <p><strong>Téléphone :</strong> ${data.telephone}</p>
          <p><strong>Localisation du chantier :</strong> ${data.ville}, ${data.pays}</p>
          
          <h2 style="color: #0B4F5C; font-size: 18px; border-bottom: 2px solid #FFCBA4; padding-bottom: 8px; margin-top: 25px;">Projet Technique</h2>
          <p><strong>Services concernés :</strong> <span style="background: #eaf5f7; padding: 4px 8px; border-radius: 4px; font-weight: bold;">${servicesList}</span></p>
          <p><strong>Budget estimé :</strong> ${data.budget || "Non spécifié"}</p>
          <p><strong>Délai souhaité :</strong> ${data.delai || "Non spécifié"}</p>
          <div style="background: #F4FAFA; padding: 15px; border-left: 4px solid #0B4F5C; margin-top: 15px; border-radius: 4px;">
            <p style="margin: 0; white-space: pre-line;"><strong>Description des besoins :</strong><br/>${data.description}</p>
          </div>
        </div>
        <div style="background: #eaf5f7; padding: 15px; text-align: center; font-size: 12px; color: #69b0c2;">
          Connectez-vous à l'espace d'administration pour traiter ce devis.
        </div>
      </div>
    </div>
  `;

  if (!transporter) {
    console.log(`[EMAIL SIMULATION] Notification devis transmise à ${adminEmail} pour le client ${data.nom}`);
    return true;
  }

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || `"BeTA Engineering" <contact@beta-engineering.com>`,
      to: adminEmail,
      subject: `🚨 [Nouveau Devis] ${data.nom} - ${data.pays} (${servicesList})`,
      html: htmlContent,
    });

    // Confirmation automatique au client
    await transporter.sendMail({
      from: process.env.SMTP_FROM || `"BeTA Engineering" <contact@beta-engineering.com>`,
      to: data.email,
      subject: `Confirmation de votre demande de devis - BeTA Engineering`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #F4FAFA; padding: 30px; color: #0B4F5C;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden;">
            <div style="background-color: #0B4F5C; padding: 25px; text-align: center;">
              <h1 style="color: #F4FAFA; margin: 0; font-size: 24px;">BeTA <span style="color: #FFCBA4;">Engineering</span></h1>
              <p style="color: #FFCBA4; margin: 5px 0 0 0; font-size: 13px;">Accusé de Réception</p>
            </div>
            <div style="padding: 25px;">
              <p>Bonjour <strong>${data.nom}</strong>,</p>
              <p>Nous vous remercions pour votre confiance. Notre bureau d'études techniques a bien reçu votre demande concernant vos projets en <strong>${data.pays}</strong>.</p>
              <p>Un de nos ingénieurs étudie actuellement votre cahier des charges et reviendra vers vous sous <strong>48 heures ouvrées</strong> avec une proposition technique et financière adaptée.</p>
              <p style="margin-top: 25px;">Cordialement,<br/><strong>L'équipe technique BeTA Engineering</strong><br/>Tunis, Tunisie • <a href="https://beta-engineering.com" style="color: #0B4F5C;">www.beta-engineering.com</a></p>
            </div>
          </div>
        </div>
      `,
    });
    return true;
  } catch (err) {
    console.error("Erreur lors de l'envoi de l'email :", err);
    return false;
  }
}

export async function sendContactNotification(data: ContactEmailPayload) {
  const transporter = getTransporter();
  const adminEmail = process.env.ADMIN_EMAIL || "contact@beta-engineering.com";

  if (!transporter) {
    console.log(`[EMAIL SIMULATION] Message contact de ${data.nom} (${data.email}) : ${data.sujet}`);
    return true;
  }

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || `"BeTA Engineering" <contact@beta-engineering.com>`,
      to: adminEmail,
      subject: `📬 [Contact Site] ${data.sujet} - ${data.nom}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Nouveau message de contact</h2>
          <p><strong>Nom :</strong> ${data.nom}</p>
          <p><strong>Email :</strong> ${data.email}</p>
          <p><strong>Téléphone :</strong> ${data.telephone || "Non précisé"}</p>
          <p><strong>Sujet :</strong> ${data.sujet}</p>
          <p><strong>Message :</strong></p>
          <p style="background: #f4f4f4; padding: 15px; border-radius: 4px;">${data.message}</p>
        </div>
      `,
    });
    return true;
  } catch (err) {
    console.error("Erreur envoi email contact :", err);
    return false;
  }
}

