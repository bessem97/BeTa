"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  Shield,
  ArrowRight,
  Network,
  Zap,
  Cpu,
  Cog,
  Code,
  CheckCircle2,
} from "lucide-react";

export const servicesList = [
  {
    slug: "reseaux-informatiques",
    navLabel: "Réseaux",
    title: "Réseaux Informatiques & Télécoms",
    icon: Network,
    shortDesc: "Câblage optique, baies 19\", vidéosurveillance IP & CCTV",
    badge: "Certifié Fluke 10G",
    subServices: [
      { name: "Vidéosurveillance IP & Caméras CCTV HD/4K", desc: "Dômes motorisés, caméras thermiques, serveurs NVR redondés" },
      { name: "Câblage structuré Cuivre & Fibre Optique", desc: "Liaisons Cat 6A / 7 et dorsales fibre monomode/multimode" },
      { name: "Switches, Routeurs & Baies de brassage 19\"", desc: "Réseaux managés L2/L3, VLANs, aménagement thermique" },
      { name: "Wi-Fi Professionnel & Contrôle d'accès", desc: "Bornes Wi-Fi 6 haute densité, portails captifs, biométrie" },
      { name: "VoIP, Téléphonie IP & Firewalls UTM", desc: "Solutions IPBX, pare-feu nouvelle génération, VPN sécurisés" },
      { name: "Supervision & Maintenance réseau 24/7", desc: "Monitoring proactif de disponibilité et bande passante" },
    ],
  },
  {
    slug: "electricite-batiment",
    navLabel: "Bâtiment",
    title: "Électricité Bâtiment & Tertiaire",
    icon: Zap,
    shortDesc: "Tertiaire, résidentiel & conformité stricte NF C 15-100",
    badge: "Norme NF C 15-100",
    subServices: [
      { name: "Installations Tertiaires & Commerciales", desc: "Sièges sociaux, centres commerciaux, hôtels, santé" },
      { name: "Tableaux électriques & Colonnes montantes", desc: "Tableaux divisionnaires, disjoncteurs, parafoudres" },
      { name: "Éclairage LED & Gestion architecturale", desc: "Gestion intelligente DALI, capteurs de présence" },
      { name: "Mise à la terre & Audits de conformité", desc: "Mesures d'isolement, liaisons équipotentielles" },
      { name: "Courants faibles bâtiment (SSI, Alarmes)", desc: "Détection incendie, sonorisation de sécurité, interphonie" },
      { name: "Maintenance & Dépannage urgent", desc: "Interventions d'urgence 24h/24 en cas de disjonction" },
    ],
  },
  {
    slug: "electricite-industrielle",
    navLabel: "Industrie",
    title: "Électricité Industrielle & Tableauterie",
    icon: Cpu,
    shortDesc: "Fabrication sur-mesure d'armoires électriques à Tunis & TGBT 4000A",
    badge: "Atelier à Tunis",
    subServices: [
      { name: "Conception & FABRICATION d'armoires sur-mesure", desc: "Études CAO SEE Electrical, tôlerie industrielle, jeux de barres" },
      { name: "TGBT & Armoires de puissance jusqu'à 4000A", desc: "Inverseurs de source Normal/Secours groupes électrogènes" },
      { name: "Variateurs de vitesse & Démarreurs moteurs", desc: "Schneider ATV, Siemens, moteurs asynchrones, pompes" },
      { name: "Câblage d'usines & Chemins de câbles", desc: "Chemins de câbles filaires, caniveaux, câbles blindés CEM" },
      { name: "Compensation d'énergie réactive", desc: "Batteries de condensateurs anti-harmoniques cosinus phi" },
      { name: "Audit thermographique infrarouge sous charge", desc: "Détection des points chauds avant panne critique" },
    ],
  },
  {
    slug: "automatisme",
    navLabel: "Automatisme",
    title: "Automatisme & Régulation SCADA",
    icon: Cog,
    shortDesc: "Automates PLC Siemens/Schneider, IHM, régulation & robotique",
    badge: "Siemens & Schneider",
    subServices: [
      { name: "Programmation Automates PLC (Siemens, Schneider)", desc: "Architectures logiques IEC 61131-3 (Ladder, Grafcet, ST)" },
      { name: "Supervision SCADA & Écrans IHM tactiles", desc: "Plateformes WinCC, archivage de données, alarmes temps réel" },
      { name: "Instrumentation industrielle & Boucles PID", desc: "Régulation température, pression, débit, niveau et pesage" },
      { name: "Rénovation & Rétrofit de lignes de production", desc: "Migration d'automates obsolètes sans arrêt prolongé" },
      { name: "Robotique & Axes asservis numériques", desc: "Synchronisation servomoteurs, palettisation automatisée" },
      { name: "Télémaintenance industrielle sécurisée", desc: "Passerelles VPN industrielles pour télé-assistance immédiate" },
    ],
  },
  {
    slug: "services-informatiques",
    navLabel: "Services Informatiques",
    title: "Services Informatiques & Cybersécurité",
    icon: Code,
    shortDesc: "Développement web & mobile, audits cybersécurité, cloud hybride",
    badge: "Cloud & Cyber",
    subServices: [
      { name: "Développement Web & Applications Métier", desc: "Portails web industriels, ERP/CRM légers, dashboards IoT" },
      { name: "Cybersécurité, Audits & Tests d'intrusion (Pentest)", desc: "Audits de vulnérabilités, protection anti-ransomware" },
      { name: "Hébergement Haute Disponibilité & Cloud", desc: "Serveurs dédiés, sauvegardes externalisées immuables" },
      { name: "Maintenance Applicative & Infogérance", desc: "Gestion de parcs, helpdesk utilisateurs, mises à jour critiques" },
      { name: "Conseil IT & Transformation Digitale", desc: "Urbanisation des systèmes, pilotage de projets tech complexes" },
    ],
  },
];

export default function Navbar() {
  const { t, isRTL } = useLanguage();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [expandedMobileService, setExpandedMobileService] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fermer le dropdown au clic en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fermer au changement de route
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300" ref={navRef}>
      {/* 1. TOPBAR PLEINE LARGEUR */}
      <div className="bg-deep-teal-950 text-ice-white text-xs border-b border-deep-teal-900 hidden lg:block">
        <div className="w-full max-w-[1850px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-2 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <span className="flex items-center gap-2 text-soft-peach font-semibold tracking-wide">
              <MapPin className="w-3.5 h-3.5" />
              Siège Social à Tunis &bull; Déploiements Immédiats dans Toute l&apos;Afrique
            </span>
            <span className="flex items-center gap-2 text-ice-white/80">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              Bureau d&apos;études techniques &amp; Astreinte industrielle 24/7
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="tel:+21671888999"
              className="flex items-center gap-1.5 text-ice-white/90 hover:text-soft-peach transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-soft-peach" />
              <span>+216 71 888 999</span>
            </a>
            <a
              href="mailto:contact@beta-engineering.com"
              className="flex items-center gap-1.5 text-ice-white/90 hover:text-soft-peach transition-colors font-medium"
            >
              <Mail className="w-3.5 h-3.5 text-soft-peach" />
              <span>contact@beta-engineering.com</span>
            </a>
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* 2. BARRE PRINCIPALE PLEINE LARGEUR */}
      <nav
        className={`w-full transition-all duration-300 bg-white/95 backdrop-blur-md border-b ${isScrolled
          ? "py-2.5 shadow-md border-deep-teal-100"
          : "py-3.5 border-deep-teal-50"
          }`}
      >
        <div className="w-full max-w-[1850px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex items-center justify-between gap-4">
          {/* Logo BeTA Engineering */}
          <Link href="/" className="flex items-center flex-shrink-0 group focus:outline-none">
            <div className="relative w-44 sm:w-48 h-11 transition-transform group-hover:scale-[1.02]">
              <Image
                src="/brand/logo.svg"
                alt="BeTA Engineering - Logo Officiel"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Navigation Centrale : Chaque Service a son onglet individuel avec son propre dropdown */}
          <div className="hidden xl:flex items-center gap-1 2xl:gap-2">
            <Link
              href="/"
              className={`px-3 py-2 text-xs 2xl:text-sm font-bold uppercase tracking-wider rounded-lg transition-colors hover:text-deep-teal hover:bg-deep-teal-50 ${pathname === "/" ? "text-deep-teal bg-deep-teal-50/80 font-black" : "text-gray-700"
                }`}
            >
              Accueil
            </Link>

            {/* LES 5 SERVICES INDIVIDUELS DANS LA NAVBAR */}
            {servicesList.map((service) => {
              const Icon = service.icon;
              const isCurrent = pathname === `/services/${service.slug}`;
              const isOpen = activeDropdown === service.slug;

              return (
                <div
                  key={service.slug}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(service.slug)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    onClick={() =>
                      setActiveDropdown(isOpen ? null : service.slug)
                    }
                    className={`flex items-center gap-1 px-2.5 2xl:px-3 py-2 text-xs 2xl:text-sm font-bold tracking-tight rounded-lg transition-all focus:outline-none ${isCurrent || isOpen
                      ? "text-deep-teal bg-deep-teal-50 font-black"
                      : "text-gray-700 hover:text-deep-teal hover:bg-deep-teal-50/60"
                      }`}
                  >
                    <Icon className="w-3.5 h-3.5 text-deep-teal/70" />
                    <span>{service.navLabel}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180 text-deep-teal" : ""
                        }`}
                    />
                  </button>

                  {/* Dropdown Déroulant Spécifique à CE Service */}
                  {isOpen && (
                    <div
                      className={`absolute top-full mt-2 w-[460px] 2xl:w-[500px] bg-white rounded-2xl shadow-card border border-deep-teal-100 p-5 z-50 animate-in fade-in slide-in-from-top-2 duration-150 ${isRTL ? "right-0" : "left-0"
                        }`}
                    >
                      {/* Entête du dropdown */}
                      <div className="flex items-center justify-between pb-3 mb-3 border-b border-deep-teal-50">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-deep-teal text-soft-peach flex items-center justify-center shadow-sm">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-deep-teal uppercase tracking-wider">
                              {service.title}
                            </h4>
                            <span className="text-[10px] text-gray-500 block">
                              {service.shortDesc}
                            </span>
                          </div>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-soft-peach/40 text-deep-teal-950 font-extrabold text-[10px]">
                          {service.badge}
                        </span>
                      </div>

                      {/* Liste des sous-prestations de ce service */}
                      <div className="space-y-1.5">
                        {service.subServices.map((sub, idx) => (
                          <Link
                            key={idx}
                            href={`/services/${service.slug}`}
                            className="group/item flex items-start gap-2.5 p-2 rounded-xl hover:bg-ice-white transition-colors"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-deep-teal mt-0.5 flex-shrink-0 group-hover/item:text-soft-peach-600" />
                            <div>
                              <div className="text-xs font-bold text-gray-800 group-hover/item:text-deep-teal transition-colors">
                                {sub.name}
                              </div>
                              <div className="text-[11px] text-gray-500 leading-tight">
                                {sub.desc}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>

                      {/* Footer du dropdown : Liens d'action rapide */}
                      <div className="mt-4 pt-3 border-t border-deep-teal-50 flex items-center justify-between text-xs font-bold">
                        <Link
                          href={`/services/${service.slug}`}
                          className="text-deep-teal hover:text-soft-peach-600 inline-flex items-center gap-1"
                        >
                          <span>Voir la page complète du service</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                        <Link
                          href={`/devis?service=${service.slug}`}
                          className="px-3 py-1 bg-soft-peach text-deep-teal-950 rounded-lg hover:bg-soft-peach-400 transition-colors shadow-peach text-[11px] font-extrabold uppercase"
                        >
                          Devis rapide
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            <Link
              href="/projets"
              className={`px-3 py-2 text-xs 2xl:text-sm font-bold uppercase tracking-wider rounded-lg transition-colors hover:text-deep-teal hover:bg-deep-teal-50 ${pathname.startsWith("/projets") ? "text-deep-teal bg-deep-teal-50/80 font-black" : "text-gray-700"
                }`}
            >
              Réalisations
            </Link>

            <Link
              href="/a-propos"
              className={`px-3 py-2 text-xs 2xl:text-sm font-bold uppercase tracking-wider rounded-lg transition-colors hover:text-deep-teal hover:bg-deep-teal-50 ${pathname === "/a-propos" ? "text-deep-teal bg-deep-teal-50/80 font-black" : "text-gray-700"
                }`}
            >
              À Propos
            </Link>

            <Link
              href="/contact"
              className={`px-3 py-2 text-xs 2xl:text-sm font-bold uppercase tracking-wider rounded-lg transition-colors hover:text-deep-teal hover:bg-deep-teal-50 ${pathname === "/contact" ? "text-deep-teal bg-deep-teal-50/80 font-black" : "text-gray-700"
                }`}
            >
              Contact
            </Link>
          </div>

          {/* Action Droite : Bouton CTA Devis + Langue + Mobile Menu Button */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              href="/devis"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-soft-peach hover:bg-soft-peach-400 text-deep-teal-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all duration-200 shadow-peach hover:shadow-lg hover:-translate-y-0.5"
            >
              <span>Demander un devis</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <div className="xl:hidden">
              <LanguageSwitcher />
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-deep-teal hover:bg-deep-teal-50 rounded-xl"
              aria-label="Menu principal"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* 3. MENU MOBILE PLEINE LARGEUR AVEC CHACUN DES 5 SERVICES */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-deep-teal-100 px-4 pt-3 pb-8 space-y-2 max-h-[85vh] overflow-y-auto">
            <Link
              href="/"
              className="block px-3 py-2 text-sm font-bold text-deep-teal rounded-lg hover:bg-ice-white"
            >
              Accueil
            </Link>

            {/* Chaque service dans le menu mobile */}
            <div className="space-y-1 pt-1 pb-1 border-y border-gray-100">
              <span className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
                Nos 5 Pôles d&apos;Expertise
              </span>

              {servicesList.map((service) => {
                const Icon = service.icon;
                const isExpanded = expandedMobileService === service.slug;

                return (
                  <div key={service.slug} className="rounded-xl overflow-hidden">
                    <div className="flex items-center justify-between px-3 py-2 hover:bg-deep-teal-50 rounded-lg">
                      <Link
                        href={`/services/${service.slug}`}
                        className="flex items-center gap-2.5 text-sm font-bold text-gray-800 hover:text-deep-teal"
                      >
                        <Icon className="w-4 h-4 text-deep-teal" />
                        <span>{service.title}</span>
                      </Link>
                      <button
                        onClick={() =>
                          setExpandedMobileService(isExpanded ? null : service.slug)
                        }
                        className="p-1 text-gray-400 hover:text-deep-teal"
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""
                            }`}
                        />
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="pl-8 pr-2 py-2 space-y-2 bg-ice-white rounded-lg my-1">
                        {service.subServices.map((sub, i) => (
                          <Link
                            key={i}
                            href={`/services/${service.slug}`}
                            className="block text-xs text-gray-600 hover:text-deep-teal font-medium"
                          >
                            &bull; {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <Link
              href="/projets"
              className="block px-3 py-2 text-sm font-bold text-deep-teal rounded-lg hover:bg-ice-white"
            >
              Réalisations
            </Link>

            <Link
              href="/a-propos"
              className="block px-3 py-2 text-sm font-bold text-deep-teal rounded-lg hover:bg-ice-white"
            >
              À Propos
            </Link>

            <Link
              href="/contact"
              className="block px-3 py-2 text-sm font-bold text-deep-teal rounded-lg hover:bg-ice-white"
            >
              Contact
            </Link>

            <div className="pt-3">
              <Link
                href="/devis"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-soft-peach text-deep-teal-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-peach"
              >
                <span>Demander un devis en ligne</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
