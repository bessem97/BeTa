import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ServiceCard from "@/components/ServiceCard";
import type { Metadata } from "next";
import { Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Nos 5 Pôles d'Ingénierie & d'Intégration",
  description:
    "Découvrez les 5 pôles d'excellence technique de BeTA Engineering : réseaux informatiques, électricité bâtiment, électricité industrielle et fabrication d'armoires sur-mesure à Tunis, automatisme SCADA/PLC et cybersécurité.",
};

export default async function ServicesIndexPage() {
  const services = await prisma.service.findMany({
    include: { subServices: { orderBy: { ordre: "asc" } } },
    orderBy: { ordre: "asc" },
  });

  return (
    <div className="w-full flex flex-col gap-16 py-12 md:py-20 max-w-[1850px] mx-auto px-4 sm:px-8 xl:px-14">
      <div className="text-center max-w-4xl mx-auto space-y-4">
        <span className="px-3.5 py-1.5 rounded-full bg-deep-teal/10 text-deep-teal text-xs font-black uppercase tracking-widest inline-flex items-center gap-1.5">
          <Sparkles className="w-4 h-4" />
          <span>Nos Pôles de Compétence Clés en Main</span>
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-deep-teal tracking-tight">
          Solutions d&apos;Ingénierie, Fabrication &amp; Intégration
        </h1>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
          De l&apos;audit technique initial jusqu&apos;à la fabrication d&apos;armoires à Tunis, au montage sur site et à la maintenance 24/7 en Tunisie et sur l&apos;ensemble du continent africain.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
        {services.map((service) => (
          <ServiceCard
            key={service.slug}
            slug={service.slug}
            titre={service.titre}
            sousTitre={service.sousTitre}
            description={service.description}
            image={service.image}
            subServices={service.subServices}
            ordre={service.ordre}
          />
        ))}
      </div>

      <div className="rounded-3xl bg-gradient-to-r from-deep-teal to-deep-teal-950 p-8 sm:p-14 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-teal border border-deep-teal-700">
        <div className="space-y-3 max-w-2xl">
          <h3 className="text-2xl sm:text-3xl font-bold text-ice-white">
            Un projet multi-lots combinant énergie, réseau et automatisme ?
          </h3>
          <p className="text-sm text-ice-white/80 leading-relaxed">
            Nous intégrons vos courants forts, courants faibles et automatismes avec un bureau d&apos;études unique et un chef de projet dédié.
          </p>
        </div>
        <Link
          href="/devis"
          className="flex-shrink-0 px-8 py-4 bg-soft-peach hover:bg-soft-peach-400 text-deep-teal-950 font-black text-xs uppercase tracking-widest rounded-xl shadow-peach transition-all hover:scale-105"
        >
          Demander une étude complète
        </Link>
      </div>
    </div>
  );
}
