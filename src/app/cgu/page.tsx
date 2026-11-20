import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation | BeTA Engineering",
  description: "Conditions Générales d'Utilisation du site de BeTA Engineering.",
};

export default function CGUPage() {
  return (
    <div className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <h1 className="text-3xl font-extrabold text-deep-teal">
        Conditions Générales d&apos;Utilisation (CGU)
      </h1>

      <div className="prose prose-teal text-sm text-gray-700 space-y-6 leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-deep-teal">1. Objet du Site</h2>
          <p>
            Le site <strong>beta-engineering.com</strong> a pour vocation de présenter les activités d&apos;ingénierie, de tableauterie électrique, d&apos;automatisme et de services IT de la société BeTA Engineering, et de permettre la mise en relation et l&apos;émission de devis techniques.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-deep-teal">2. Devis &amp; Engagements Contractuels</h2>
          <p>
            Toute simulation ou demande effectuée via le formulaire en ligne constitue une pré-étude sans valeur d&apos;engagement contractuel définitif. Seul un devis officiel formellement contresigné par les deux parties avec cahier des charges validé engage contractuellement BeTA Engineering.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-deep-teal">3. Droit Applicable &amp; Juridiction Compétente</h2>
          <p>
            Les présentes conditions d&apos;utilisation sont régies par le droit tunisien. En cas de litige relatif à l&apos;utilisation du site, compétence expresse est attribuée aux tribunaux compétents de Tunis.
          </p>
        </section>
      </div>
    </div>
  );
}

