import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import {
  MapPin,
  Calendar,
  Building,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  ChevronLeft,
} from "lucide-react";

export async function generateStaticParams() {
  const projects = await prisma.project.findMany({ select: { slug: true } });
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = await prisma.project.findUnique({
    where: { slug: params.slug },
  });

  if (!project) return { title: "Projet non trouvé" };

  return {
    title: `${project.titre} | Réalisation BeTA Engineering`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = await prisma.project.findUnique({
    where: { slug: params.slug },
    include: {
      service: true,
      images: { orderBy: { ordre: "asc" } },
    },
  });

  if (!project) notFound();

  return (
    <div className="flex flex-col gap-12 py-12 md:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Retour navigation */}
      <div>
        <Link
          href="/projets"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-deep-teal hover:text-soft-peach-600 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Retour à toutes les réalisations</span>
        </Link>
      </div>

      {/* En-tête du Projet */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 bg-deep-teal text-soft-peach text-xs font-bold uppercase tracking-wider rounded-md">
            {project.service.titre}
          </span>
          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-md">
            Statut : {project.statut}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-deep-teal tracking-tight leading-tight">
          {project.titre}
        </h1>

        <div className="flex flex-wrap items-center gap-6 pt-2 text-xs sm:text-sm text-gray-600 border-b border-deep-teal-100 pb-6">
          <span className="flex items-center gap-2">
            <Building className="w-4 h-4 text-deep-teal" />
            <strong>Client :</strong> {project.client}
          </span>
          <span className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-deep-teal" />
            <strong>Lieu :</strong> {project.lieu} ({project.pays})
          </span>
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-deep-teal" />
            <strong>Année :</strong> {project.date}
          </span>
        </div>
      </div>

      {/* Galerie Principale d'Images */}
      <div className="space-y-4">
        <div className="relative w-full h-[400px] sm:h-[500px] rounded-3xl overflow-hidden shadow-card border-4 border-white bg-deep-teal-950">
          <Image
            src={project.images[0]?.url || "/images/projects/deploiement-fibre-campus-tunis.webp"}
            alt={project.titre}
            fill
            priority
            className="object-cover"
          />
        </div>

        {project.images.length > 1 && (
          <div className="grid grid-cols-3 gap-4">
            {project.images.slice(1).map((img, i) => (
              <div
                key={img.id || i}
                className="relative h-28 sm:h-36 rounded-xl overflow-hidden shadow-soft border-2 border-white"
              >
                <Image
                  src={img.url}
                  alt={img.alt || project.titre}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Description Technique & Livrables */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-6">
          <h2 className="text-2xl font-bold text-deep-teal">
            Présentation du Déploiement &amp; Contexte Technique
          </h2>
          <div className="prose prose-teal max-w-none text-sm sm:text-base text-gray-700 leading-relaxed space-y-4">
            <p>{project.description}</p>
            <p>
              Les travaux ont été exécutés conformément aux normes de sécurité internationales en vigueur. Nos ingénieurs ont assuré la coordination de chantier, la supervision des essais et la formation des équipes de maintenance du client.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-deep-teal-100 shadow-soft space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-deep-teal">
              Garanties &amp; Conformité Remises
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Rapport de recette et PV de conformité</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Schémas de câblage et plans DOE remis</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Garantie de parfait achèvement</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Support technique et télé-assistance</span>
              </div>
            </div>
          </div>
        </div>

        {/* Encadré Devis Projet Similaire */}
        <div className="lg:col-span-4">
          <div className="sticky top-28 p-6 rounded-2xl bg-gradient-to-br from-deep-teal to-deep-teal-950 text-white shadow-teal space-y-5">
            <ShieldCheck className="w-8 h-8 text-soft-peach" />
            <h3 className="text-xl font-bold text-ice-white">
              Vous avez un projet similaire ?
            </h3>
            <p className="text-xs text-ice-white/80 leading-relaxed">
              Consultez nos ingénieurs basés à Tunis. Nous intervenons partout en Tunisie et sur l&apos;ensemble du continent africain.
            </p>
            <Link
              href={`/devis?service=${project.service.slug}`}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-soft-peach hover:bg-soft-peach-400 text-deep-teal-950 font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-peach transition-all"
            >
              <span>Demander une étude chiffrée</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

