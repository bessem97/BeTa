"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { MapPin, CheckCircle2, Globe2 } from "lucide-react";

interface HubPoint {
  id: string;
  name: string;
  country: string;
  x: number;
  y: number;
  type: "hub" | "intervention";
  projects: string;
}

const points: HubPoint[] = [
  { id: "tunis", name: "Tunis", country: "Tunisie (Siège & Usine)", x: 420, y: 70, type: "hub", projects: "Siège social, Bureau d'études & Atelier de fabrication d'armoires" },
  { id: "alger", name: "Alger", country: "Algérie", x: 340, y: 80, type: "intervention", projects: "Tour tertiaire 18 étages & Distribution électrique" },
  { id: "dakar", name: "Dakar", country: "Sénégal", x: 120, y: 260, type: "intervention", projects: "Vidéosurveillance portuaire CCTV 120 caméras & Réseau" },
  { id: "abidjan", name: "Abidjan", country: "Côte d'Ivoire", x: 230, y: 340, type: "intervention", projects: "Supervision SCADA WinCC & Ligne de cimenterie" },
  { id: "douala", name: "Douala", country: "Cameroun", x: 390, y: 360, type: "intervention", projects: "Câblage industriel & Variateurs forte puissance" },
  { id: "libreville", name: "Libreville", country: "Gabon", x: 370, y: 400, type: "intervention", projects: "Infrastructures télécoms & Énergie sécurisée" },
  { id: "kinshasa", name: "Kinshasa", country: "RDC", x: 450, y: 440, type: "intervention", projects: "Automatisme de station de pompage & TGBT" },
  { id: "casablanca", name: "Casablanca", country: "Maroc", x: 270, y: 95, type: "intervention", projects: "Audit cybersécurité & Baies de serveurs datacenter" },
];

export default function AfricaMap() {
  const { t } = useLanguage();
  const [activePoint, setActivePoint] = useState<HubPoint>(points[0]);

  const tunis = points[0];

  return (
    <div className="w-full bg-gradient-to-br from-[#021418] via-deep-teal-950 to-[#073740] text-ice-white rounded-3xl p-8 lg:p-16 shadow-2xl border border-deep-teal-700/60 overflow-hidden relative">
      {/* Halos d'ambiance */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-soft-peach/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-deep-teal-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-center relative z-10">
        {/* Colonne gauche : Texte d'impact & Point sélectionné */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-deep-teal-800 text-soft-peach text-xs font-black uppercase tracking-widest border border-deep-teal-600 shadow-sm">
            <Globe2 className="w-4 h-4 text-soft-peach" />
            <span>Rayonnement Panafricain</span>
          </div>

          <h3 className="text-3xl sm:text-4xl xl:text-5xl font-black text-white leading-tight">
            Depuis Tunis, Nous Intervenons Partout en Afrique
          </h3>

          <p className="text-sm sm:text-base text-ice-white/80 leading-relaxed font-normal">
            Grâce à notre position géographique stratégique à Tunis et à la mobilité permanente de nos ingénieurs, nous pilotons des projets industriels et télécoms d&apos;envergure dans plus de 14 pays (Côte d&apos;Ivoire, Sénégal, Algérie, Cameroun, Gabon, RDC...).
          </p>

          {/* Fiche d'information du point sélectionné */}
          <div className="p-6 rounded-2xl glass-panel-dark border border-soft-peach/30 backdrop-blur-md transition-all duration-300 space-y-2">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-base font-bold text-soft-peach">
                <MapPin className="w-4 h-4 text-soft-peach" />
                {activePoint.name} &mdash; {activePoint.country}
              </span>
              <span
                className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${
                  activePoint.type === "hub"
                    ? "bg-soft-peach text-deep-teal-950 shadow-peach"
                    : "bg-deep-teal-700 text-ice-white"
                }`}
              >
                {activePoint.type === "hub" ? "Hub Central Tunis" : "Chantier Déployé"}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-ice-white/90 leading-relaxed font-normal">
              {activePoint.projects}
            </p>
          </div>

          {/* Liste rapide des zones géographiques */}
          <div className="grid grid-cols-2 gap-3 text-xs font-semibold">
            <div className="flex items-center gap-2 text-ice-white/80">
              <CheckCircle2 className="w-4 h-4 text-soft-peach" />
              <span>Tunisie &amp; Maghreb</span>
            </div>
            <div className="flex items-center gap-2 text-ice-white/80">
              <CheckCircle2 className="w-4 h-4 text-soft-peach" />
              <span>Afrique de l&apos;Ouest</span>
            </div>
            <div className="flex items-center gap-2 text-ice-white/80">
              <CheckCircle2 className="w-4 h-4 text-soft-peach" />
              <span>Afrique Centrale</span>
            </div>
            <div className="flex items-center gap-2 text-ice-white/80">
              <CheckCircle2 className="w-4 h-4 text-soft-peach" />
              <span>Déploiement sous 5 jours</span>
            </div>
          </div>
        </div>

        {/* Colonne droite : Carte SVG Grand Format */}
        <div className="lg:col-span-7 flex justify-center items-center relative">
          <div className="w-full max-w-[650px] aspect-[600/550] relative">
            <svg
              viewBox="0 0 600 550"
              className="w-full h-full drop-shadow-2xl"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#0f4a56" />
                  <stop offset="100%" stop-color="#05242b" />
                </linearGradient>
                <radialGradient id="tunisGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stop-color="#FFCBA4" stop-opacity="0.9" />
                  <stop offset="100%" stop-color="#FFCBA4" stop-opacity="0" />
                </radialGradient>
              </defs>

              <path
                d="M 220 50 
                   Q 330 40 430 65 
                   Q 510 110 520 180 
                   Q 550 250 490 320 
                   Q 460 380 430 460 
                   Q 390 530 360 540 
                   Q 320 520 310 470 
                   Q 280 410 240 360 
                   Q 180 340 120 270 
                   Q 100 230 140 180 
                   Q 160 130 180 90 
                   Z"
                fill="url(#mapGradient)"
                stroke="#1b7185"
                stroke-width="1.5"
                opacity="0.95"
              />

              {points.slice(1).map((pt) => (
                <g key={`line-${pt.id}`}>
                  <line
                    x1={tunis.x}
                    y1={tunis.y}
                    x2={pt.x}
                    y2={pt.y}
                    stroke="#FFCBA4"
                    stroke-width={activePoint.id === pt.id ? "2.5" : "1"}
                    stroke-dasharray="4,4"
                    opacity={activePoint.id === pt.id ? 0.95 : 0.4}
                  />
                  {activePoint.id === pt.id && (
                    <circle cx={pt.x} cy={pt.y} r="16" fill="#FFCBA4" opacity="0.25">
                      <animate attributeName="r" values="8;20;8" dur="2s" repeatCount="indefinite" />
                    </circle>
                  )}
                </g>
              ))}

              <circle cx={tunis.x} cy={tunis.y} r="32" fill="url(#tunisGlow)" opacity="0.45">
                <animate attributeName="r" values="18;45;18" dur="2.5s" repeatCount="indefinite" />
              </circle>

              {points.map((pt) => {
                const isHub = pt.type === "hub";
                const isSelected = activePoint.id === pt.id;

                return (
                  <g
                    key={pt.id}
                    className="cursor-pointer transition-transform hover:scale-125"
                    onClick={() => setActivePoint(pt)}
                  >
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isHub ? 9 : isSelected ? 7 : 5}
                      fill={isHub ? "#FFCBA4" : isSelected ? "#FFCBA4" : "#137e93"}
                      stroke="#ffffff"
                      stroke-width={isHub ? "3" : "1.5"}
                    />
                    <text
                      x={pt.x}
                      y={pt.y - 12}
                      font-family="system-ui, sans-serif"
                      font-size={isHub ? "13" : "10"}
                      font-weight={isHub || isSelected ? "bold" : "normal"}
                      fill={isSelected || isHub ? "#FFCBA4" : "#e6f5f5"}
                      text-anchor="middle"
                    >
                      {pt.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
