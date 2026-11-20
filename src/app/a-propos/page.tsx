import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import {
  ShieldCheck,
  Award,
  Factory,
  Globe2,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "À Propos de BeTA Engineering | Histoire, Mission & Équipe",
  description:
    "Découvrez l'histoire de BeTA Engineering (Société Didier), notre mission d'ingénierie et d'intégration à Tunis, notre présence dans toute l'Afrique et notre équipe dirigeante.",
};

export default async function AboutPage() {
  const team = await prisma.teamMember.findMany({
    orderBy: { ordre: "asc" },
  });

  return (
    <div className="w-full flex flex-col gap-16 md:gap-28 pb-20">
      {/* 1. HERO BANNER À PROPOS PLEIN FORMAT */}
      <section className="relative bg-gradient-to-br from-[#031d23] via-deep-teal-950 to-deep-teal pt-16 pb-24 border-b border-deep-teal-800 text-white overflow-hidden">
        <div className="w-full max-w-[1850px] mx-auto px-4 sm:px-8 xl:px-14 relative z-10">
          <div className="max-w-4xl space-y-5">
            <span className="px-4 py-1.5 rounded-full bg-soft-peach/20 text-soft-peach text-xs font-black uppercase tracking-widest inline-flex items-center gap-2 border border-soft-peach/30 shadow-peach">
              <Sparkles className="w-4 h-4 text-soft-peach" />
              <span>Histoire &bull; Vision &bull; Panafrique</span>
            </span>
            <h1 className="text-3xl sm:text-5xl xl:text-6xl font-black text-white tracking-tight leading-tight">
              L&apos;Ingénierie de Haute Précision pour les Entreprises Africaines
            </h1>
            <p className="text-base sm:text-xl text-ice-white/80 leading-relaxed font-normal">
              Dirigée par des ingénieurs chevronnés cumulant plus de 25 ans d&apos;expérience opérationnelle, <strong>BeTA Engineering</strong> (Société Didier) conçoit, fabrique dans ses ateliers de Tunis et déploie des solutions pérennes pour l&apos;industrie, le tertiaire et les télécoms.
            </p>
          </div>
        </div>
      </section>

      {/* 2. HISTOIRE & DOUBLE COMPÉTENCE */}
      <section className="w-full max-w-[1850px] mx-auto px-4 sm:px-8 xl:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="px-3.5 py-1.5 rounded-full bg-deep-teal/10 text-deep-teal text-xs font-black uppercase tracking-widest">
              Genèse &amp; Vocation
            </span>
            <h2 className="text-3xl sm:text-4xl xl:text-5xl font-black text-deep-teal tracking-tight leading-tight">
              De Société Didier à BeTA Engineering : Une Évolution Technologique
            </h2>
            <p className="text-base text-gray-700 leading-relaxed font-normal">
              Historiquement reconnue sous le nom de <strong>Société Didier</strong>, notre structure a élargi son rayonnement pour devenir <strong>BeTA Engineering</strong>, répondant à un besoin critique des grands comptes : disposer d&apos;un interlocuteur technique unique capable de maîtriser simultanément la puissance électrique (TGBT, transformateurs, moteurs), l&apos;automatisme d&apos;usine (PLC, SCADA) et la connectivité réseau sécurisée (fibre optique, CCTV, serveurs).
            </p>
            <p className="text-base text-gray-700 leading-relaxed font-normal">
              Nous disposons au <strong>Centre Urbain Nord à Tunis</strong> de notre bureau d&apos;études et d&apos;un atelier complet de fabrication d&apos;armoires électriques sur mesure, nous permettant de contrôler la qualité de chaque composant avant livraison sur chantier.
            </p>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-bold text-deep-teal">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-ice-white border border-deep-teal-50">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Atelier de tableauterie certifié à Tunis</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-ice-white border border-deep-teal-50">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Normes NF C 15-100 &amp; IEC 61439</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-ice-white border border-deep-teal-50">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Techniciens certifiés fibre &amp; réseaux</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-ice-white border border-deep-teal-50">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Rayonnement dans plus de 14 pays</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-5">
              <div className="p-8 rounded-3xl bg-white border border-deep-teal-100 shadow-card space-y-4">
                <ShieldCheck className="w-10 h-10 text-deep-teal" />
                <h3 className="text-lg font-black text-deep-teal">Rigueur &amp; Sécurité</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Aucun compromis sur la sécurité des personnes et la fiabilité durable de vos installations sous tension.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-white border border-deep-teal-100 shadow-card space-y-4">
                <Factory className="w-10 h-10 text-deep-teal" />
                <h3 className="text-lg font-black text-deep-teal">Savoir-Faire Local</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Fabrication et assemblage à Tunis pour une maîtrise intégrale des délais, des coûts et des finitions.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-white border border-deep-teal-100 shadow-card space-y-4">
                <Globe2 className="w-10 h-10 text-deep-teal" />
                <h3 className="text-lg font-black text-deep-teal">Mobilité Africaine</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Mobilisation rapide sur les sites industriels, miniers et portuaires du continent africain.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-white border border-deep-teal-100 shadow-card space-y-4">
                <Award className="w-10 h-10 text-deep-teal" />
                <h3 className="text-lg font-black text-deep-teal">Engagement 24/7</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Contrats de maintenance et astreinte technique continue pour garantir la continuité de production.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. L'ÉQUIPE DIRIGEANTE */}
      <section className="w-full bg-white py-20 border-y border-deep-teal-100">
        <div className="w-full max-w-[1850px] mx-auto px-4 sm:px-8 xl:px-14 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3.5 py-1.5 rounded-full bg-deep-teal/10 text-deep-teal text-xs font-black uppercase tracking-widest">
              Talents &amp; Leadership
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-deep-teal tracking-tight">
              L&apos;Équipe d&apos;Ingénieurs de BeTA Engineering
            </h2>
            <p className="text-sm sm:text-base text-gray-600 font-normal">
              Des professionnels certifiés, passionnés par la rigueur industrielle et l&apos;innovation technique.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div
                key={member.id}
                className="bg-ice-white rounded-3xl p-8 border border-deep-teal-100 shadow-soft text-center flex flex-col justify-between"
              >
                <div>
                  <div className="w-24 h-24 rounded-full bg-deep-teal text-soft-peach mx-auto flex items-center justify-center font-black text-3xl shadow-md mb-5">
                    {member.nom.split(" ")[1]?.charAt(0) || member.nom.charAt(0)}
                  </div>
                  <h3 className="text-lg font-bold text-deep-teal">{member.nom}</h3>
                  <p className="text-xs font-bold text-deep-teal-600 mt-1 uppercase tracking-wider">
                    {member.poste}
                  </p>
                  <p className="text-xs text-gray-600 mt-4 leading-relaxed font-normal">
                    {member.bio}
                  </p>
                </div>

                {member.linkedin && (
                  <div className="mt-6 pt-4 border-t border-deep-teal-100">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-deep-teal hover:text-soft-peach-600 transition-colors inline-block"
                    >
                      Profil Professionnel &rarr;
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
