"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { servicesList } from "./Navbar";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  Lock,
} from "lucide-react";

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-deep-teal-950 text-ice-white pt-20 pb-10 border-t border-deep-teal-900">
      <div className="w-full max-w-[1850px] mx-auto px-4 sm:px-8 xl:px-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-14 border-b border-deep-teal-800/80">
          {/* Colonne 1 & 2 : Marque & Mission */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="inline-block">
              <div className="relative w-56 h-14">
                <Image
                  src="/brand/logo-light.svg"
                  alt="BeTA Engineering - Logo"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>

            <p className="text-sm text-ice-white/80 leading-relaxed max-w-md font-normal">
              Société d&apos;ingénierie et d&apos;intégration technologique basée à Tunis. Conception et fabrication d&apos;armoires électriques industrielles TGBT sur mesure, automatisme SCADA/PLC, réseaux informatiques certifiés et cybersécurité en Tunisie et sur l&apos;ensemble du continent africain.
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-deep-teal-900 text-soft-peach text-xs font-bold border border-deep-teal-700">
                <ShieldCheck className="w-4 h-4 text-soft-peach" />
                Certifications ISO &bull; Normes NF C 15-100 &bull; IEC 61439
              </span>
            </div>
          </div>

          {/* Colonne 3 : Les 5 Services */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-soft-peach mb-5">
              Nos 5 Pôles Techniques
            </h4>
            <ul className="space-y-3 text-xs text-ice-white/80">
              {servicesList.map((serv) => (
                <li key={serv.slug}>
                  <Link
                    href={`/services/${serv.slug}`}
                    className="hover:text-soft-peach hover:translate-x-1 transition-all inline-flex items-center gap-1.5"
                  >
                    <span className="text-soft-peach/60">&bull;</span>
                    <span>{serv.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 4 : Navigation Rapide */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-soft-peach mb-5">
              Navigation Rapide
            </h4>
            <ul className="space-y-3 text-xs text-ice-white/80">
              <li>
                <Link href="/" className="hover:text-soft-peach transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/projets" className="hover:text-soft-peach transition-colors">
                  Réalisations &amp; Chantiers
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="hover:text-soft-peach transition-colors">
                  À Propos de BeTA
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-soft-peach transition-colors">
                  Contact &amp; Accès Tunis
                </Link>
              </li>
              <li>
                <Link
                  href="/devis"
                  className="text-soft-peach font-bold hover:underline inline-flex items-center gap-1"
                >
                  <span>Demander un devis en ligne</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 5 : Coordonnées Tunis & Panafrique */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-soft-peach mb-5">
              Siège Social &bull; Tunis
            </h4>
            <div className="space-y-3 text-xs text-ice-white/80">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-soft-peach flex-shrink-0 mt-0.5" />
                <span>Immeuble Le Grand Boulevard, Centre Urbain Nord, 1082 Tunis, Tunisie</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-soft-peach flex-shrink-0" />
                <a href="tel:+21671888999" className="hover:text-soft-peach">
                  +216 71 888 999
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-soft-peach flex-shrink-0" />
                <a href="mailto:contact@beta-engineering.com" className="hover:text-soft-peach">
                  contact@beta-engineering.com
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-soft-peach flex-shrink-0" />
                <span>Lun &ndash; Ven : 08h00 &ndash; 18h00 (Astreinte 24/7)</span>
              </p>
            </div>
          </div>
        </div>

        {/* Barre Inférieure Légale & Admin */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ice-white/60">
          <p>© {currentYear} BeTA Engineering (Société Didier). Tous droits réservés.</p>

          <div className="flex items-center gap-6">
            <Link href="/mentions-legales" className="hover:text-soft-peach transition-colors">
              Mentions Légales
            </Link>
            <Link href="/politique-confidentialite" className="hover:text-soft-peach transition-colors">
              Politique de Confidentialité
            </Link>
            <Link href="/cgu" className="hover:text-soft-peach transition-colors">
              CGU
            </Link>
            <Link
              href="/admin"
              className="flex items-center gap-1 text-ice-white/40 hover:text-soft-peach transition-colors"
              title="Connexion réservée à l'administration"
            >
              <Lock className="w-3 h-3" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
