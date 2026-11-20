"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Calendar, ArrowRight } from "lucide-react";

interface ProjectCardProps {
  slug: string;
  titre: string;
  description: string;
  lieu: string;
  pays: string;
  date: string;
  serviceTitre: string;
  imageUrl?: string;
}

export default function ProjectCard({
  slug,
  titre,
  description,
  lieu,
  pays,
  date,
  serviceTitre,
  imageUrl,
}: ProjectCardProps) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 border border-deep-teal-100/70 hover:border-deep-teal-300 flex flex-col justify-between hover:-translate-y-1">
      <div>
        {/* Image du Projet */}
        <div className="relative w-full h-56 bg-deep-teal-900 overflow-hidden">
          <Image
            src={imageUrl || "/images/projects/deploiement-fibre-campus-tunis.webp"}
            alt={titre}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-deep-teal-950/80 via-transparent to-transparent" />
          
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider bg-deep-teal text-ice-white rounded-md shadow-sm">
              {serviceTitre}
            </span>
          </div>

          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-ice-white/90 font-medium">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-soft-peach" />
              {lieu} ({pays})
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-soft-peach" />
              {date}
            </span>
          </div>
        </div>

        {/* Détails */}
        <div className="p-6">
          <h3 className="text-lg font-bold text-deep-teal group-hover:text-deep-teal-700 transition-colors line-clamp-2">
            {titre}
          </h3>
          <p className="text-xs text-gray-600 mt-2.5 line-clamp-3 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      <div className="px-6 pb-6 pt-1">
        <Link
          href={`/projets/${slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-deep-teal hover:text-soft-peach-600 transition-colors group/link"
        >
          <span>Voir la réalisation détaillée</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

