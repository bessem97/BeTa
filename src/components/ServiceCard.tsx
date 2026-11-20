"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface ServiceCardProps {
  slug: string;
  titre: string;
  sousTitre?: string | null;
  description: string;
  image?: string | null;
  subServices: { id: string; titre: string }[];
  ordre: number;
}

export default function ServiceCard({
  slug,
  titre,
  sousTitre,
  description,
  image,
  subServices,
  ordre,
}: ServiceCardProps) {
  const { t } = useLanguage();

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 border border-deep-teal-100/70 hover:border-deep-teal-300 flex flex-col justify-between hover:-translate-y-1">
      <div>
        {/* Image d'illustration du service */}
        <div className="relative w-full h-52 bg-deep-teal-900 overflow-hidden">
          {image ? (
            <Image
              src={image}
              alt={titre}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-deep-teal flex items-center justify-center text-white font-bold">
              {titre}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-deep-teal-950/80 via-transparent to-transparent" />
          <span className="absolute bottom-3 left-4 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider bg-soft-peach text-deep-teal-950 rounded-md shadow-sm">
            Pôle 0{ordre}
          </span>
        </div>

        {/* Corps du texte */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-deep-teal group-hover:text-deep-teal-700 transition-colors">
            {titre}
          </h3>
          {sousTitre && (
            <p className="text-xs font-semibold text-deep-teal-600 mt-1 line-clamp-1">
              {sousTitre}
            </p>
          )}
          <p className="text-sm text-gray-600 mt-3 line-clamp-3 leading-relaxed">
            {description}
          </p>

          {/* Liste des sous-prestations clés */}
          <div className="mt-5 pt-4 border-t border-deep-teal-50 space-y-2">
            {subServices.slice(0, 3).map((sub) => (
              <div key={sub.id} className="flex items-start gap-2 text-xs text-gray-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-deep-teal flex-shrink-0 mt-0.5" />
                <span className="truncate">{sub.titre}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="px-6 pb-6 pt-2">
        <Link
          href={`/services/${slug}`}
          className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-deep-teal-50 hover:bg-deep-teal text-deep-teal hover:text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 group/btn"
        >
          <span>{t("services.learnMore")}</span>
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

