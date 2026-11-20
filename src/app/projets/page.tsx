import React from "react";
import { prisma } from "@/lib/prisma";
import ProjectCard from "@/components/ProjectCard";
import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Nos Réalisations & Chantiers Industriels",
  description:
    "Explorez nos projets d'ingénierie livrés avec succès en Tunisie, Côte d'Ivoire, Sénégal, Algérie : câblage fibre optique, fabrication d'armoires TGBT, systèmes SCADA et contrôle d'accès.",
};

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams?: { service?: string };
}) {
  const currentServiceSlug = searchParams?.service;

  const [services, projects] = await Promise.all([
    prisma.service.findMany({
      select: { id: true, slug: true, titre: true },
      orderBy: { ordre: "asc" },
    }),
    prisma.project.findMany({
      where: {
        publie: true,
        ...(currentServiceSlug
          ? { service: { slug: currentServiceSlug } }
          : {}),
      },
      include: {
        service: true,
        images: { orderBy: { ordre: "asc" }, take: 1 },
      },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <div className="w-full flex flex-col gap-12 py-12 md:py-20 max-w-[1850px] mx-auto px-4 sm:px-8 xl:px-14">
      {/* En-tête */}
      <div className="text-center max-w-4xl mx-auto space-y-4">
        <span className="px-3.5 py-1.5 rounded-full bg-deep-teal/10 text-deep-teal text-xs font-black uppercase tracking-widest inline-flex items-center gap-1.5">
          <Sparkles className="w-4 h-4" />
          <span>Savoir-Faire Concret &amp; Réalisations Majeures</span>
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-deep-teal tracking-tight">
          Nos Chantiers en Tunisie &amp; sur le Continent Africain
        </h1>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
          Découvrez une sélection de projets industriels, tertiaires et informatiques menés à bien par les ingénieurs et techniciens de BeTA.
        </p>
      </div>

      {/* Filtres par Catégorie de Service */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2 pb-6 border-b border-deep-teal-100">
        <Link
          href="/projets"
          className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
            !currentServiceSlug
              ? "bg-deep-teal text-soft-peach shadow-md"
              : "bg-white text-gray-600 hover:bg-deep-teal-50 hover:text-deep-teal border border-deep-teal-100"
          }`}
        >
          Tous les projets ({projects.length})
        </Link>
        {services.map((s) => {
          const isActive = currentServiceSlug === s.slug;
          return (
            <Link
              key={s.slug}
              href={`/projets?service=${s.slug}`}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                isActive
                  ? "bg-deep-teal text-soft-peach shadow-md"
                  : "bg-white text-gray-600 hover:bg-deep-teal-50 hover:text-deep-teal border border-deep-teal-100"
              }`}
            >
              {s.titre}
            </Link>
          );
        })}
      </div>

      {/* Grille des Projets Grand Format */}
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {projects.map((p) => (
            <ProjectCard
              key={p.slug}
              slug={p.slug}
              titre={p.titre}
              description={p.description}
              lieu={p.lieu}
              pays={p.pays}
              date={p.date}
              serviceTitre={p.service.titre}
              imageUrl={p.images[0]?.url}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-deep-teal-200">
          <p className="text-gray-500 text-sm">
            Aucun projet répertorié pour cette catégorie pour le moment.
          </p>
          <Link
            href="/projets"
            className="mt-4 inline-block px-5 py-2.5 bg-deep-teal text-white text-xs font-bold rounded-xl"
          >
            Réinitialiser le filtre
          </Link>
        </div>
      )}
    </div>
  );
}
