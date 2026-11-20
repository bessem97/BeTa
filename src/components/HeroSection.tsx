"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { ArrowRight, Compass } from "lucide-react";

interface HeroSectionProps {
  settings?: Record<string, string>;
}

export default function HeroSection({ settings = {} }: HeroSectionProps) {
  const { t, isRTL, language } = useLanguage();

  // Textes dynamiques : priorité aux settings admin si définis pour la langue courante ou par défaut, sinon i18n
  const tag =
    language === "en" && settings.hero_tag_en
      ? settings.hero_tag_en
      : language === "ar" && settings.hero_tag_ar
      ? settings.hero_tag_ar
      : settings.hero_tag || t("hero.tag");

  const titlePart1 =
    language === "en" && settings.hero_title_part1_en
      ? settings.hero_title_part1_en
      : language === "ar" && settings.hero_title_part1_ar
      ? settings.hero_title_part1_ar
      : settings.hero_title_part1 || t("hero.title.part1");

  const titleHighlight =
    language === "en" && settings.hero_title_highlight_en
      ? settings.hero_title_highlight_en
      : language === "ar" && settings.hero_title_highlight_ar
      ? settings.hero_title_highlight_ar
      : settings.hero_title_highlight || t("hero.title.highlight");

  const subtitle =
    language === "en" && settings.hero_subtitle_en
      ? settings.hero_subtitle_en
      : language === "ar" && settings.hero_subtitle_ar
      ? settings.hero_subtitle_ar
      : settings.hero_subtitle || t("hero.subtitle");

  const btnQuote =
    language === "en" && settings.hero_btn_quote_en
      ? settings.hero_btn_quote_en
      : language === "ar" && settings.hero_btn_quote_ar
      ? settings.hero_btn_quote_ar
      : settings.hero_btn_quote || t("hero.cta.quote");

  const btnServices =
    language === "en" && settings.hero_btn_services_en
      ? settings.hero_btn_services_en
      : language === "ar" && settings.hero_btn_services_ar
      ? settings.hero_btn_services_ar
      : settings.hero_btn_services || t("hero.cta.services");

  // Dégradé linéaire :
  // Desktop : Deep Teal #0B4F5C à 75% puis transparent à 55%
  // En RTL : inversé (droite vers gauche)
  // Mobile : voile plus fort (85%)
  const overlayDesktop = isRTL
    ? "linear-gradient(to left, rgba(11, 79, 92, 0.75) 0%, rgba(11, 79, 92, 0.75) 30%, rgba(11, 79, 92, 0) 55%)"
    : "linear-gradient(to right, rgba(11, 79, 92, 0.75) 0%, rgba(11, 79, 92, 0.75) 30%, rgba(11, 79, 92, 0) 55%)";

  return (
    <section className="relative w-full min-h-[85vh] sm:min-h-[90vh] flex items-center overflow-hidden font-poppins">
      {/* 1. IMAGE DE BACKGROUND FOURNIE (Plein écran, object-fit cover, position centrée à droite) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/background.png"
          alt="BeTA Engineering - Techniciens et infrastructures"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[right_center] md:object-[right_center]"
        />
      </div>

      {/* 2. VOILE DÉGRADÉ (Desktop & Mobile) */}
      {/* Mobile : voile uniforme et plus fort (85%) pour garantir la lisibilité */}
      <div className="absolute inset-0 z-10 block md:hidden bg-[#0B4F5C]/85" />

      {/* Desktop / Tablette : dégradé linéaire gauche→droite à 75% puis transparent à 55% (inversé en RTL) */}
      <div
        className="absolute inset-0 z-10 hidden md:block pointer-events-none"
        style={{ background: overlayDesktop }}
      />

      {/* 3. CONTENU ALIGNÉ À GAUCHE (OU À DROITE EN ARABE / RTL), POLICE POPPINS EXTRABOLD, TOUT EN GRAS */}
      <div className="w-full max-w-[1850px] mx-auto px-4 sm:px-8 xl:px-14 relative z-20 py-20 sm:py-28">
        <div
          className={`max-w-3xl space-y-6 ${
            isRTL ? "text-right mr-0 ml-auto" : "text-left ml-0 mr-auto"
          }`}
        >
          {/* Étiquette : "BeTA Engineering · Tunis, Tunisie" */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-deep-teal-950/80 backdrop-blur-md border border-white/20 text-ice-white text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-lg`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-soft-peach animate-pulse" />
            <span className="font-extrabold text-white">{tag}</span>
          </motion.div>

          {/* Titre H1 : "Toutes vos infrastructures techniques, un seul partenaire." */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="text-[32px] sm:text-[36px] md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.12]"
          >
            <span className="text-ice-white font-extrabold drop-shadow-md">
              {titlePart1}
            </span>
            <span className="text-soft-peach font-extrabold drop-shadow-md">
              {titleHighlight}
            </span>
          </motion.h1>

          {/* Sous-titre : "Basés à Tunis, nous intervenons dans toute l'Afrique." */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="text-base sm:text-xl lg:text-2xl text-ice-white font-bold leading-relaxed max-w-2xl drop-shadow-sm"
          >
            {subtitle}
          </motion.p>

          {/* Boutons d'Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
            className={`pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 ${
              isRTL ? "sm:justify-start" : "sm:justify-start"
            }`}
          >
            {/* Bouton 1 : Demander un devis (fond Soft Peach #FFCBA4, texte Deep Teal #0B4F5C) */}
            <Link
              href="/devis"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-[18px] bg-soft-peach hover:bg-soft-peach-400 text-deep-teal font-extrabold text-sm uppercase tracking-wider rounded-xl transition-all duration-300 shadow-peach hover:scale-105 active:scale-95"
            >
              <span>{btnQuote}</span>
              <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
            </Link>

            {/* Bouton 2 : Découvrir nos services (contour blanc, texte Ice White) */}
            <a
              href="#tous-les-services"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-[18px] bg-transparent hover:bg-white/10 text-ice-white font-extrabold text-sm uppercase tracking-wider rounded-xl border-2 border-white transition-all duration-300 backdrop-blur-sm hover:scale-105 active:scale-95"
            >
              <Compass className="w-4 h-4 text-soft-peach" />
              <span>{btnServices}</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

