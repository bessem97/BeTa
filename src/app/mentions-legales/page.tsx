import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions Légales | BeTA Engineering",
  description: "Mentions légales officielles de BeTA Engineering (Société Didier), basée à Tunis.",
};

export default function MentionsLegalesPage() {
  return (
    <div className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <h1 className="text-3xl font-extrabold text-deep-teal">
        Mentions Légales
      </h1>

      <div className="prose prose-teal text-sm text-gray-700 space-y-6 leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-deep-teal">1. Éditeur du Site</h2>
          <p>
            Le site web <strong>beta-engineering.com</strong> est édité par la société <strong>BeTA Engineering</strong> (anciennement Société Didier), société d&apos;ingénierie et de services techniques régie par le droit tunisien.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Dénomination sociale :</strong> BeTA Engineering</li>
            <li><strong>Siège social :</strong> Immeuble Le Grand Boulevard, Centre Urbain Nord, 1082 Tunis, Tunisie</li>
            <li><strong>Téléphone :</strong> +216 71 888 999</li>
            <li><strong>Email de contact :</strong> contact@beta-engineering.com</li>
            <li><strong>Directeur de la publication :</strong> M. Didier B., Directeur Général</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-deep-teal">2. Hébergement du Site</h2>
          <p>
            Le site est hébergé sur des infrastructures d&apos;hébergement haute disponibilité conformes aux standards de sécurité ISO 27001 et RGPD.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-deep-teal">3. Propriété Intellectuelle</h2>
          <p>
            L&apos;ensemble des contenus présents sur ce site (textes, logos vectoriels BeTA Engineering, schémas, visuels, photographies de projets, marques citées) est protégé par les lois internationales relatives aux droits d&apos;auteur et à la propriété intellectuelle.
            Toute reproduction ou représentation, intégrale ou partielle, par quelque procédé que ce soit, sans l&apos;accord préalable écrit de BeTA Engineering est formellement interdite.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-deep-teal">4. Responsabilité &amp; Liens Hypertextes</h2>
          <p>
            BeTA Engineering s&apos;efforce de diffuser des informations techniques exactes et mises à jour. Néanmoins, les informations fournies le sont à titre indicatif et ne sauraient engager la responsabilité contractuelle de la société sans devis ou convention formelle signée.
          </p>
        </section>
      </div>
    </div>
  );
}

