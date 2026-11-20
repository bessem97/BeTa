import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import {
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  Sparkles,
} from "lucide-react";

export async function generateStaticParams() {
  const services = await prisma.service.findMany({ select: { slug: true } });
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const service = await prisma.service.findUnique({
    where: { slug: params.slug },
  });

  if (!service) return { title: "Service non trouvé" };

  return {
    title: `${service.titre} | Expert Tunis & Afrique`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const service = await prisma.service.findUnique({
    where: { slug: params.slug },
    include: {
      subServices: { orderBy: { ordre: "asc" } },
      projects: {
        where: { publie: true },
        include: { images: true },
        take: 4,
      },
      faqs: { orderBy: { ordre: "asc" } },
    },
  });

  if (!service) notFound();

  const steps = [
    {
      num: "01",
      title: "Audit & Études Techniques",
      desc: "Relevés sur site, calculs de dimensionnement (Caneco, Dialux, Fluke) et schémas directeurs.",
    },
    {
      num: "02",
      title: "Fabrication & Préparation en Atelier",
      desc: "Assemblage de vos armoires électriques ou pré-configuration réseau dans nos ateliers de Tunis.",
    },
    {
      num: "03",
      title: "Déploiement & Câblage sur Site",
      desc: "Installation par nos ingénieurs et techniciens sur vos chantiers en Tunisie ou partout en Afrique.",
    },
    {
      num: "04",
      title: "Tests, Certification & Recette",
      desc: "Essais sous tension, vérification des sécurités, PV de réception usine FAT et recette sur site SAT.",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-16 md:gap-28 pb-20">
      {/* 1. HERO BANNER PLEIN FORMAT */}
      <section className="relative bg-gradient-to-br from-[#021317] via-[#062c34] to-[#0B4F5C] text-white pt-16 pb-24 border-b border-deep-teal-800 overflow-hidden">
        <div className="w-full max-w-[1850px] mx-auto px-4 sm:px-8 xl:px-14 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-soft-peach/20 text-soft-peach text-xs font-black uppercase tracking-widest border border-soft-peach/30 shadow-peach">
                <Sparkles className="w-4 h-4 text-soft-peach" />
                <span>Pôle Technique 0{service.ordre} &bull; BeTA Engineering</span>
              </div>

              <h1 className="text-3xl sm:text-5xl xl:text-6xl font-black text-white tracking-tight leading-tight">
                {service.titre}
              </h1>

              {service.sousTitre && (
                <p className="text-lg sm:text-xl font-bold text-soft-peach">
                  {service.sousTitre}
                </p>
              )}

              <p className="text-base sm:text-lg text-ice-white/80 leading-relaxed max-w-3xl font-normal">
                {service.description}
              </p>

              <div className="pt-4 flex flex-wrap gap-5">
                <Link
                  href={`/devis?service=${service.slug}`}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-soft-peach hover:bg-soft-peach-400 text-deep-teal-950 font-black text-xs uppercase tracking-widest rounded-xl shadow-peach transition-all hover:scale-105"
                >
                  <span>Chiffrer ce lot en ligne</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="#prestations"
                  className="inline-flex items-center gap-2 px-7 py-4 glass-panel-dark text-white font-bold text-xs uppercase tracking-wider rounded-xl border border-white/20 hover:bg-white/10 transition-all"
                >
                  <span>Découvrir les sous-prestations</span>
                </a>
              </div>
            </div>

            {/* Illustration */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-ice-white/20 aspect-[16/11] bg-deep-teal-950">
                <Image
                  src={service.image || "/images/services/reseaux-informatiques.webp"}
                  alt={service.titre}
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-teal-950/80 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 px-3.5 py-1.5 bg-deep-teal/90 backdrop-blur-md text-soft-peach font-bold text-xs rounded-lg">
                  Intervention en Tunisie &amp; Panafrique
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SOUS-PRESTATIONS GRAND FORMAT */}
      <section id="prestations" className="w-full max-w-[1850px] mx-auto px-4 sm:px-8 xl:px-14">
        <div className="text-center max-w-4xl mx-auto space-y-4 mb-14">
          <span className="px-3.5 py-1.5 rounded-full bg-deep-teal/10 text-deep-teal text-xs font-black uppercase tracking-widest">
            Étendue Technique
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-deep-teal tracking-tight">
            Toutes Nos Sous-Prestations en {service.titre}
          </h2>
          <p className="text-base text-gray-600 font-normal">
            Une gamme complète de travaux exécutés dans le respect des normes industrielles internationales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {service.subServices.map((sub, idx) => (
            <div
              key={sub.id}
              className="bg-white rounded-3xl p-8 shadow-card hover:shadow-2xl transition-all border border-deep-teal-100 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 rounded-xl bg-deep-teal text-soft-peach font-black text-sm flex items-center justify-center shadow-sm">
                    0{idx + 1}
                  </div>
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="text-lg font-bold text-deep-teal mb-3">
                  {sub.titre}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                  {sub.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-deep-teal-50">
                <Link
                  href={`/devis?service=${service.slug}&subservice=${encodeURIComponent(sub.titre)}`}
                  className="text-xs font-bold text-deep-teal hover:text-soft-peach-600 inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>Chiffrer cette prestation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. PROCESSUS DE TRAVAIL EN 4 ÉTAPES */}
      <section className="w-full bg-white py-20 border-y border-deep-teal-100">
        <div className="w-full max-w-[1850px] mx-auto px-4 sm:px-8 xl:px-14 space-y-14">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3.5 py-1.5 rounded-full bg-deep-teal/10 text-deep-teal text-xs font-black uppercase tracking-widest">
              Méthodologie Éprouvée
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-deep-teal tracking-tight">
              Notre Démarche d&apos;Exécution
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((st) => (
              <div
                key={st.num}
                className="bg-ice-white rounded-3xl p-8 border border-deep-teal-100 shadow-soft"
              >
                <div className="text-4xl font-black text-deep-teal/20 mb-4 font-display">
                  {st.num}
                </div>
                <h3 className="text-base font-bold text-deep-teal mb-2">
                  {st.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FAQ & CTA */}
      {service.faqs.length > 0 && (
        <section className="w-full max-w-5xl mx-auto px-4 sm:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="px-3 py-1 rounded-full bg-deep-teal/10 text-deep-teal text-xs font-black uppercase tracking-wider">
              Questions Fréquentes
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-deep-teal">
              FAQ {service.titre}
            </h2>
          </div>

          <div className="space-y-4">
            {service.faqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-white rounded-2xl p-6 shadow-soft border border-deep-teal-100 space-y-2"
              >
                <h3 className="text-base font-bold text-deep-teal flex items-start gap-2.5">
                  <HelpCircle className="w-5 h-5 text-soft-peach-600 flex-shrink-0 mt-0.5" />
                  <span>{faq.question}</span>
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 pl-7 leading-relaxed font-normal">
                  {faq.reponse}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
