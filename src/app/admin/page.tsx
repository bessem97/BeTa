import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  FileSpreadsheet,
  Mail,
  FolderGit2,
  Clock,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const [
    totalQuotes,
    newQuotes,
    totalMessages,
    unreadMessages,
    totalProjects,
    recentQuotes,
    recentMessages,
  ] = await Promise.all([
    prisma.quoteRequest.count(),
    prisma.quoteRequest.count({ where: { statut: "nouveau" } }),
    prisma.contactMessage.count(),
    prisma.contactMessage.count({ where: { lu: false } }),
    prisma.project.count(),
    prisma.quoteRequest.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  return (
    <div className="space-y-8">
      {/* En-tête */}
      <div>
        <h1 className="text-2xl font-black text-deep-teal">
          Tableau de Bord &bull; BeTA Engineering
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Supervision des demandes de devis, messages et contenus en temps réel.
        </p>
      </div>

      {/* Cartes KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-soft border border-deep-teal-100 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Devis Reçus
            </span>
            <div className="text-3xl font-black text-deep-teal mt-1">
              {totalQuotes}
            </div>
            <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" />
              {newQuotes} nouveau(x) à traiter
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-deep-teal-50 text-deep-teal flex items-center justify-center">
            <FileSpreadsheet className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-soft border border-deep-teal-100 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Messages Contact
            </span>
            <div className="text-3xl font-black text-deep-teal mt-1">
              {totalMessages}
            </div>
            <span className="text-[11px] font-semibold text-amber-600 flex items-center gap-1 mt-1">
              <Clock className="w-3 h-3" />
              {unreadMessages} non lu(s)
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <Mail className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-soft border border-deep-teal-100 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Réalisations Actives
            </span>
            <div className="text-3xl font-black text-deep-teal mt-1">
              {totalProjects}
            </div>
            <span className="text-[11px] font-semibold text-gray-500 mt-1 block">
              Publiées sur le site
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <FolderGit2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-soft border border-deep-teal-100 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Couverture
            </span>
            <div className="text-3xl font-black text-deep-teal mt-1">
              14 Pays
            </div>
            <span className="text-[11px] font-semibold text-deep-teal-600 mt-1 block">
              Tunisie &bull; Panafrique
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-deep-teal text-soft-peach flex items-center justify-center font-bold">
            TN
          </div>
        </div>
      </div>

      {/* Grille : Derniers Devis & Derniers Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Dernières Demandes de Devis */}
        <div className="bg-white rounded-2xl p-6 shadow-soft border border-deep-teal-100 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h2 className="text-base font-bold text-deep-teal flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-soft-peach-600" />
              <span>Dernières Demandes de Devis</span>
            </h2>
            <Link
              href="/admin/quotes"
              className="text-xs font-bold text-deep-teal hover:underline inline-flex items-center gap-1"
            >
              <span>Voir tout</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentQuotes.length > 0 ? (
              recentQuotes.map((q) => (
                <div
                  key={q.id}
                  className="p-3.5 rounded-xl bg-ice-white border border-deep-teal-50 flex items-center justify-between text-xs"
                >
                  <div>
                    <h4 className="font-bold text-deep-teal">
                      {q.nom} {q.societe && `(${q.societe})`}
                    </h4>
                    <p className="text-gray-500 mt-0.5">
                      {q.ville}, {q.pays} &bull; {new Date(q.createdAt).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full font-bold uppercase text-[10px] ${
                      q.statut === "nouveau"
                        ? "bg-amber-100 text-amber-800"
                        : q.statut === "gagne"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {q.statut}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-500 py-4 text-center">
                Aucune demande de devis enregistrée.
              </p>
            )}
          </div>
        </div>

        {/* Derniers Messages de Contact */}
        <div className="bg-white rounded-2xl p-6 shadow-soft border border-deep-teal-100 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h2 className="text-base font-bold text-deep-teal flex items-center gap-2">
              <Mail className="w-4 h-4 text-soft-peach-600" />
              <span>Messages de Contact Récents</span>
            </h2>
            <Link
              href="/admin/messages"
              className="text-xs font-bold text-deep-teal hover:underline inline-flex items-center gap-1"
            >
              <span>Voir tout</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentMessages.length > 0 ? (
              recentMessages.map((m) => (
                <div
                  key={m.id}
                  className="p-3.5 rounded-xl bg-ice-white border border-deep-teal-50 flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      {!m.lu && (
                        <span className="w-2 h-2 rounded-full bg-soft-peach-600" />
                      )}
                      <h4 className="font-bold text-deep-teal">{m.nom}</h4>
                    </div>
                    <p className="text-gray-600 font-medium mt-0.5 truncate max-w-xs">
                      {m.sujet}
                    </p>
                  </div>
                  <span className="text-[11px] text-gray-400">
                    {new Date(m.createdAt).toLocaleDateString("fr-FR")}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-500 py-4 text-center">
                Aucun message reçu pour le moment.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

