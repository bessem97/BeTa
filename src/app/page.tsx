import React from "react";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import AfricaMap from "@/components/AfricaMap";
import HeroSection from "@/components/HeroSection";
import {
  ArrowRight,
  ShieldCheck,
  Factory,
  CheckCircle2,
  PhoneCall,
  Sparkles,
  Award,
  Layers,
  Star,
  Network,
  Zap,
  Cpu,
  Cog,
  Code,
  Globe2,
  ChevronRight,
} from "lucide-react";

export const revalidate = 60;

export default async function HomePage() {
  const [services, featuredProjects, testimonials, partners, rawSettings] = await Promise.all([
    prisma.service.findMany({
      include: { subServices: { orderBy: { ordre: "asc" } } },
      orderBy: { ordre: "asc" },
    }),
    prisma.project.findMany({
      where: { publie: true, misEnAvant: true },
      include: { service: true, images: { orderBy: { ordre: "asc" }, take: 1 } },
      take: 4,
      orderBy: { createdAt: "desc" },
    }),
    prisma.testimonial.findMany({
      where: { publie: true },
      orderBy: { ordre: "asc" },
      take: 3,
    }),
    prisma.partner.findMany({
      orderBy: { ordre: "asc" },
    }),
    prisma.setting.findMany(),
  ]);

  // Construire la map des settings Hero pour le composant HeroSection
  const settingsMap: Record<string, string> = {};
  for (const s of rawSettings) {
    settingsMap[s.key] = s.value;
  }

  // Icônes dynamiques par service
  const serviceIcons: Record<string, any> = {
    "reseaux-informatiques": Network,
    "electricite-batiment": Zap,
    "electricite-industrielle": Cpu,
    "automatisme": Cog,
    "services-informatiques": Code,
  };

  const serviceBadges: Record<string, string> = {
    "reseaux-informatiques": "Certification Fluke 10G & CCTV 4K",
    "electricite-batiment": "Conformité Norme NF C 15-100",
    "electricite-industrielle": "Atelier de Fabrication TGBT à Tunis",
    "automatisme": "Siemens TIA Portal & Schneider SCADA",
    "services-informatiques": "Audit Cyber & Cloud Haute Disponibilité",
  };

  return (
    <div className="w-full flex flex-col gap-20 md:gap-32 overflow-hidden bg-ice-white">
      {/* =========================================================================
          1. HERO PLEIN FORMAT — BACKGROUND.PNG + DÉGRADÉ TEAL + FRAMER MOTION
         ========================================================================= */}
      <HeroSection settings={settingsMap} />

      {/* =========================================================================
          2. BANDEAU DE STATISTIQUES GRAND ÉCRAN (CHIC & IMPACTANT)
         ========================================================================= */}
      <section className="w-full max-w-[1850px] mx-auto px-4 sm:px-8 xl:px-14 -mt-16 sm:-mt-24 relative z-20">
        <div className="bg-white rounded-3xl shadow-card border border-deep-teal-100 p-8 sm:p-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-deep-teal-100">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-deep-teal text-soft-peach flex items-center justify-center flex-shrink-0 shadow-teal">
                <Award className="w-8 h-8" />
              </div>
              <div>
                <span className="text-4xl sm:text-5xl font-black text-deep-teal tracking-tight block">
                  15+
                </span>
                <span className="text-xs sm:text-sm font-bold text-gray-600 block mt-1 uppercase tracking-wider">
                  Années d&apos;Expérience Terrain
                </span>
              </div>
            </div>

            <div className="flex items-center gap-5 pt-6 lg:pt-0 lg:pl-8">
              <div className="w-16 h-16 rounded-2xl bg-deep-teal text-soft-peach flex items-center justify-center flex-shrink-0 shadow-teal">
                <Layers className="w-8 h-8" />
              </div>
              <div>
                <span className="text-4xl sm:text-5xl font-black text-deep-teal tracking-tight block">
                  380+
                </span>
                <span className="text-xs sm:text-sm font-bold text-gray-600 block mt-1 uppercase tracking-wider">
                  Projets Industriels &amp; Réseaux Livrés
                </span>
              </div>
            </div>

            <div className="flex items-center gap-5 pt-6 lg:pt-0 lg:pl-8">
              <div className="w-16 h-16 rounded-2xl bg-deep-teal text-soft-peach flex items-center justify-center flex-shrink-0 shadow-teal">
                <Factory className="w-8 h-8" />
              </div>
              <div>
                <span className="text-4xl sm:text-5xl font-black text-deep-teal tracking-tight block">
                  160+
                </span>
                <span className="text-xs sm:text-sm font-bold text-gray-600 block mt-1 uppercase tracking-wider">
                  Clients &amp; Usines Partenaires
                </span>
              </div>
            </div>

            <div className="flex items-center gap-5 pt-6 lg:pt-0 lg:pl-8">
              <div className="w-16 h-16 rounded-2xl bg-deep-teal text-soft-peach flex items-center justify-center flex-shrink-0 shadow-teal">
                <Globe2 className="w-8 h-8" />
              </div>
              <div>
                <span className="text-4xl sm:text-5xl font-black text-deep-teal tracking-tight block">
                  14
                </span>
                <span className="text-xs sm:text-sm font-bold text-gray-600 block mt-1 uppercase tracking-wider">
                  Pays Couverts en Afrique
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. SECTION "TOUS NOS SERVICES" — SHOWCASE CINÉMATIQUE PLEINE PAGE
         ========================================================================= */}
      <section id="tous-les-services" className="w-full max-w-[1850px] mx-auto px-4 sm:px-8 xl:px-14">
        {/* Titre de la section */}
        <div className="text-center max-w-4xl mx-auto space-y-4 mb-16">
          <span className="px-4 py-1.5 rounded-full bg-deep-teal/10 text-deep-teal text-xs font-black uppercase tracking-widest inline-flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-deep-teal" />
            <span>Catalogue d&apos;Ingénierie Clés en Main</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-deep-teal tracking-tight">
            Les 5 Grands Pôles d&apos;Expertise de BeTA Engineering
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
            Une synergie unique entre les <strong>courants forts</strong>, les <strong>courants faibles</strong>, l&apos;<strong>automatisme industriel</strong> et les <strong>technologies numériques</strong>.
          </p>
        </div>

        {/* Présentation immersive de CHACUN des 5 services */}
        <div className="space-y-16">
          {services.map((service, index) => {
            const Icon = serviceIcons[service.slug] || Cpu;
            const badge = serviceBadges[service.slug] || "Excellence Technique";
            const isEven = index % 2 === 1;

            return (
              <div
                key={service.slug}
                className={`w-full rounded-3xl bg-white border border-deep-teal-100 p-6 sm:p-10 xl:p-14 shadow-card hover:shadow-2xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-center`}
              >
                {/* Bloc Image Cinématique */}
                <div
                  className={`lg:col-span-5 relative ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="relative rounded-2xl overflow-hidden shadow-teal border-4 border-ice-white aspect-[16/11] bg-deep-teal-950 group">
                    <Image
                      src={service.image || "/images/services/reseaux-informatiques.webp"}
                      alt={service.titre}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-teal-950/80 via-transparent to-transparent" />
                    
                    <span className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-soft-peach text-deep-teal-950 text-xs font-black uppercase tracking-wider shadow-peach">
                      Pôle 0{service.ordre}
                    </span>

                    <span className="absolute bottom-4 left-4 right-4 px-3.5 py-1.5 rounded-lg bg-deep-teal/90 backdrop-blur-md text-ice-white text-xs font-bold flex items-center justify-between">
                      <span>{badge}</span>
                      <ShieldCheck className="w-4 h-4 text-soft-peach" />
                    </span>
                  </div>
                </div>

                {/* Bloc Contenu & Prestations du service */}
                <div
                  className={`lg:col-span-7 space-y-6 ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-deep-teal text-soft-peach flex items-center justify-center shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-black text-deep-teal">
                        {service.titre}
                      </h3>
                      {service.sousTitre && (
                        <p className="text-xs sm:text-sm font-semibold text-deep-teal-600 mt-0.5">
                          {service.sousTitre}
                        </p>
                      )}
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Grille des sous-prestations de ce service */}
                  <div>
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-400 mb-3">
                      Sous-prestations &amp; Interventions couvertes :
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.subServices.map((sub) => (
                        <div
                          key={sub.id}
                          className="flex items-start gap-2.5 p-2.5 rounded-xl bg-ice-white border border-deep-teal-50"
                        >
                          <CheckCircle2 className="w-4 h-4 text-deep-teal flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="text-xs font-bold text-deep-teal block">
                              {sub.titre}
                            </span>
                            <span className="text-[11px] text-gray-500 line-clamp-1">
                              {sub.description}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Boutons d'Action pour ce Service */}
                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-2 px-6 py-3.5 bg-deep-teal hover:bg-deep-teal-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm"
                    >
                      <span>Consulter la page détaillée</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    <Link
                      href={`/devis?service=${service.slug}`}
                      className="inline-flex items-center gap-2 px-6 py-3.5 bg-soft-peach hover:bg-soft-peach-400 text-deep-teal-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-peach"
                    >
                      <span>Chiffrer ce service</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          4. FOCUS ATELIER DE FABRICATION À TUNIS (CHIC & INDUSTRIEL)
         ========================================================================= */}
      <section className="w-full bg-gradient-to-r from-deep-teal-950 via-deep-teal to-deep-teal-900 text-white py-24 px-4 sm:px-8 xl:px-14 border-y border-deep-teal-800 relative">
        <div className="w-full max-w-[1850px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="px-3.5 py-1.5 rounded-full bg-soft-peach text-deep-teal-950 text-xs font-black uppercase tracking-widest inline-block shadow-peach">
              Fabrication Sur Mesure &bull; Made in Tunisia
            </span>

            <h2 className="text-3xl sm:text-5xl font-black text-ice-white leading-tight">
              Un Atelier Dédié à Tunis pour Vos Armoires Électriques TGBT
            </h2>

            <p className="text-sm sm:text-base text-ice-white/80 leading-relaxed">
              Contrairement aux simples revendeurs, <strong>BeTA Engineering</strong> dispose de ses propres ateliers d&apos;ingénierie et de tableauterie à Tunis. Nous maîtrisons l&apos;intégralité de la chaîne de valeur : études de sélectivité sous Caneco, tôlerie industrielle certifiée, travail du cuivre pour jeux de barres jusqu&apos;à 4000A, intégration d&apos;appareillages Schneider / Siemens et essais d&apos;isolement diélectrique.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs font-semibold">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-soft-peach" />
                <span>Armoires de commande et puissance</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-soft-peach" />
                <span>Normes internationales IEC 61439-1 &amp; 2</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-soft-peach" />
                <span>Essais usine FAT &amp; recette sur site SAT</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-soft-peach" />
                <span>Expédition sécurisée partout en Afrique</span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/services/electricite-industrielle"
                className="inline-flex items-center gap-2 px-7 py-4 bg-soft-peach hover:bg-soft-peach-400 text-deep-teal-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-peach transition-all"
              >
                <span>Découvrir notre pôle tableauterie</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl glass-panel-dark border border-soft-peach/20 space-y-3">
              <Factory className="w-10 h-10 text-soft-peach" />
              <h4 className="text-base font-bold text-white">Tôlerie &amp; Montage</h4>
              <p className="text-xs text-ice-white/70 leading-relaxed">
                Assemblage d&apos;enveloppes robustes IP54/IP55 adaptées aux environnements industriels sévères (poussière, humidité).
              </p>
            </div>

            <div className="p-6 rounded-2xl glass-panel-dark border border-soft-peach/20 space-y-3">
              <Cpu className="w-10 h-10 text-soft-peach" />
              <h4 className="text-base font-bold text-white">Puissance &amp; Jeux de Barres</h4>
              <p className="text-xs text-ice-white/70 leading-relaxed">
                Pliage et usinage de cuivre électrolytique pour supporter des courants de court-circuit Icw élevés jusqu&apos;à 100kA.
              </p>
            </div>

            <div className="p-6 rounded-2xl glass-panel-dark border border-soft-peach/20 space-y-3">
              <Cog className="w-10 h-10 text-soft-peach" />
              <h4 className="text-base font-bold text-white">Variateurs &amp; Démarreurs</h4>
              <p className="text-xs text-ice-white/70 leading-relaxed">
                Paramétrage de variateurs Schneider Altivar et Siemens pour pompes, broyeurs, ventilateurs et convoyeurs.
              </p>
            </div>

            <div className="p-6 rounded-2xl glass-panel-dark border border-soft-peach/20 space-y-3">
              <ShieldCheck className="w-10 h-10 text-soft-peach" />
              <h4 className="text-base font-bold text-white">Essais &amp; Certification</h4>
              <p className="text-xs text-ice-white/70 leading-relaxed">
                Contrôles de continuité, thermographie infrarouge et procès-verbaux de conformité remis avant expédition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. CARTE INTERACTIVE DE L'AFRIQUE GRAND ANGLE
         ========================================================================= */}
      <section className="w-full max-w-[1850px] mx-auto px-4 sm:px-8 xl:px-14">
        <AfricaMap />
      </section>

      {/* =========================================================================
          6. GALERIE DE RÉALISATIONS CINÉMATIQUES
         ========================================================================= */}
      <section className="w-full max-w-[1850px] mx-auto px-4 sm:px-8 xl:px-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <span className="px-3.5 py-1.5 rounded-full bg-deep-teal/10 text-deep-teal text-xs font-black uppercase tracking-widest">
              Sur le Terrain
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-deep-teal tracking-tight">
              Nos Réalisations Majeures
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Des infrastructures d&apos;ingénierie livrées avec succès pour des banques, cimenteries, ports et complexes tertiaires.
            </p>
          </div>

          <Link
            href="/projets"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-deep-teal hover:bg-deep-teal-900 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex-shrink-0"
          >
            <span>Voir toutes les réalisations</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProjects.map((proj) => (
            <div
              key={proj.slug}
              className="group bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-2xl transition-all duration-300 border border-deep-teal-100 flex flex-col justify-between hover:-translate-y-1.5"
            >
              <div>
                <div className="relative w-full h-56 bg-deep-teal-900 overflow-hidden">
                  <Image
                    src={proj.images[0]?.url || "/images/projects/deploiement-fibre-campus-tunis.webp"}
                    alt={proj.titre}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-teal-950/80 via-transparent to-transparent" />
                  
                  <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider bg-deep-teal text-white rounded-md shadow-sm">
                    {proj.service?.titre}
                  </span>

                  <span className="absolute bottom-3 left-3 px-2.5 py-1 text-[11px] font-bold text-soft-peach">
                    {proj.lieu} ({proj.pays})
                  </span>
                </div>

                <div className="p-6 space-y-2">
                  <h3 className="text-base font-bold text-deep-teal group-hover:text-deep-teal-700 line-clamp-2">
                    {proj.titre}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                    {proj.description}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <Link
                  href={`/projets/${proj.slug}`}
                  className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-ice-white hover:bg-deep-teal hover:text-white text-deep-teal font-bold text-xs uppercase tracking-wider transition-all"
                >
                  <span>Fiche détaillée</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          7. TÉMOIGNAGES B2B & LOGOS PARTENAIRES PRESTIGE
         ========================================================================= */}
      <section className="w-full bg-white py-20 border-y border-deep-teal-100">
        <div className="w-full max-w-[1850px] mx-auto px-4 sm:px-8 xl:px-14 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3.5 py-1.5 rounded-full bg-deep-teal/10 text-deep-teal text-xs font-black uppercase tracking-widest">
              Avis &amp; Confiance B2B
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-deep-teal tracking-tight">
              Ce Que Disent les Directeurs d&apos;Usine et DSI
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-ice-white rounded-3xl p-8 border border-deep-teal-100 shadow-soft flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 mb-4 text-amber-400">
                    {[...Array(t.note)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-700 italic leading-relaxed">
                    &ldquo;{t.texte}&rdquo;
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-deep-teal-100">
                  <h4 className="text-sm font-bold text-deep-teal">{t.auteur}</h4>
                  <p className="text-[11px] font-semibold text-gray-500">
                    {t.poste} &bull; {t.societe}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Partenaires */}
          <div className="pt-10 border-t border-deep-teal-100 text-center space-y-8">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">
              Partenariats Technologiques avec les Leaders Mondiaux de l&apos;Énergie &amp; de l&apos;IT
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
              {partners.map((partner) => (
                <div
                  key={partner.id}
                  className="p-4 rounded-2xl bg-ice-white border border-deep-teal-50 shadow-sm flex items-center justify-center hover:shadow-md transition-all h-20 group"
                >
                  <div className="relative w-32 h-10 filter grayscale group-hover:grayscale-0 transition-all">
                    <Image
                      src={partner.logo}
                      alt={partner.nom}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. GRAND CTA FINAL CINÉMATIQUE PLEIN ÉCRAN
         ========================================================================= */}
      <section className="w-full max-w-[1850px] mx-auto px-4 sm:px-8 xl:px-14 pb-20">
        <div className="rounded-3xl bg-gradient-to-r from-[#031c21] via-deep-teal to-deep-teal-950 p-10 sm:p-16 xl:p-20 text-white shadow-teal border border-deep-teal-700 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-soft-peach/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl space-y-6">
            <span className="inline-block px-4 py-1.5 rounded-full bg-soft-peach text-deep-teal-950 text-xs font-black uppercase tracking-widest shadow-peach">
              Étude &amp; Chiffrage Sous 48 Heures Ouvrées
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              Prêt à Concrétiser Votre Projet en Tunisie ou Ailleurs en Afrique ?
            </h2>
            <p className="text-base sm:text-lg text-ice-white/80 leading-relaxed font-normal">
              Nos ingénieurs analysent vos plans, cahiers des charges et schémas techniques. Que vous ayez besoin d&apos;une étude de puissance, de fabriquer vos armoires TGBT, de déployer un réseau fibre optique ou d&apos;automatiser une usine, nous vous remettons une proposition détaillée.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-5">
              <Link
                href="/devis"
                className="inline-flex items-center justify-center gap-3 px-8 py-5 bg-soft-peach hover:bg-soft-peach-400 text-deep-teal-950 font-black text-sm uppercase tracking-widest rounded-2xl transition-all shadow-peach hover:scale-105"
              >
                <span>Demander mon devis en 5 étapes</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:+21671888999"
                className="inline-flex items-center justify-center gap-3 px-7 py-5 bg-white/10 hover:bg-white/20 text-ice-white font-bold text-sm rounded-2xl border border-white/20 transition-all"
              >
                <PhoneCall className="w-5 h-5 text-soft-peach" />
                <span>+216 71 888 999</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
