import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de Confidentialité | BeTA Engineering",
  description: "Politique de protection des données personnelles et cookies de BeTA Engineering.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <h1 className="text-3xl font-extrabold text-deep-teal">
        Politique de Confidentialité &amp; Cookies
      </h1>

      <div className="prose prose-teal text-sm text-gray-700 space-y-6 leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-deep-teal">1. Collecte des Données Personnelles</h2>
          <p>
            Dans le cadre de l&apos;utilisation des formulaires de demande de devis et de contact, BeTA Engineering est amenée à collecter des informations professionnelles vous concernant (nom, entreprise, adresse email, numéro de téléphone, pays et ville du projet).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-deep-teal">2. Finalités du Traitement</h2>
          <p>Ces données sont exclusivement utilisées pour :</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>L&apos;établissement et le suivi de vos devis techniques personnalisés</li>
            <li>La réponse à vos demandes de renseignements ou d&apos;assistance</li>
            <li>L&apos;envoi de confirmations par courrier électronique</li>
          </ul>
          <p className="mt-2 font-semibold text-deep-teal">
            BeTA Engineering ne commercialise, ne loue et ne cède aucune donnée personnelle à des tiers.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-deep-teal">3. Sécurité des Données</h2>
          <p>
            Toutes les transactions sont chiffrées par le protocole sécurisé HTTPS/TLS. Les fichiers transmis dans le cadre d&apos;une demande de devis sont stockés sur des serveurs sécurisés protégés contre tout accès non autorisé.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-deep-teal">4. Vos Droits (Accès, Rectification, Suppression)</h2>
          <p>
            Conformément à la législation en vigueur, vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression des données vous concernant. Pour exercer ce droit, adressez un email à <strong>contact@beta-engineering.com</strong>.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-deep-teal">5. Gestion des Cookies</h2>
          <p>
            Ce site utilise uniquement des cookies strictement nécessaires au fonctionnement technique (choix de langue, session d&apos;administration, mémorisation du consentement) et des cookies de mesure d&apos;audience anonymisés. Vous pouvez à tout moment refuser ou accepter les cookies via le bandeau dédié.
          </p>
        </section>
      </div>
    </div>
  );
}

