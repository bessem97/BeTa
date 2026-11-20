"use client";

import React, { useState, useEffect } from "react";
import {
  FileSpreadsheet,
  Download,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Send,
  XCircle,
  FileText,
  Building,
  MapPin,
  Calendar,
  AlertCircle,
  Eye,
} from "lucide-react";

interface QuoteItem {
  id: string;
  nom: string;
  societe?: string | null;
  email: string;
  telephone: string;
  services: string;
  description: string;
  budget?: string | null;
  delai?: string | null;
  pays: string;
  ville: string;
  fichiers?: string | null;
  statut: string;
  notesInternes?: string | null;
  createdAt: string;
}

export default function AdminQuotesPage() {
  const [quotes, setQuotes] = useState<QuoteItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedQuote, setSelectedQuote] = useState<QuoteItem | null>(null);
  const [notes, setNotes] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/projects"); // fallback if needed or fetch from db
      // On fetch directement la liste
      const quotesRes = await fetch("/api/admin/quotes/export"); // ou api custom
      // Récupérons les quotes
    } catch {
    } finally {
      setLoading(false);
    }
  };

  // Pour une réactivité parfaite, chargeons via client
  useEffect(() => {
    // Appel pour récupérer les devis
    fetch("/api/admin/quotes")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setQuotes(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleStatusChange = async (id: string, newStatut: string) => {
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/admin/quotes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ statut: newStatut }),
      });
      if (res.ok) {
        setQuotes(
          quotes.map((q) => (q.id === id ? { ...q, statut: newStatut } : q))
        );
        if (selectedQuote && selectedQuote.id === id) {
          setSelectedQuote({ ...selectedQuote, statut: newStatut });
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedQuote) return;
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/admin/quotes/${selectedQuote.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notesInternes: notes }),
      });
      if (res.ok) {
        setQuotes(
          quotes.map((q) =>
            q.id === selectedQuote.id ? { ...q, notesInternes: notes } : q
          )
        );
        setSelectedQuote({ ...selectedQuote, notesInternes: notes });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsUpdating(false);
    }
  };

  const filteredQuotes = quotes.filter((q) => {
    const matchesStatus =
      statusFilter === "all" || q.statut === statusFilter;
    const matchesSearch =
      q.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (q.societe && q.societe.toLowerCase().includes(searchTerm.toLowerCase())) ||
      q.pays.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* En-tête avec bouton Export CSV */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-deep-teal">
            Gestion des Demandes de Devis
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Traitez, qualifiez et suivez les demandes des clients en Tunisie et en Afrique.
          </p>
        </div>

        <a
          href="/api/admin/quotes/export"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-deep-teal hover:bg-deep-teal-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm transition-all"
        >
          <Download className="w-4 h-4 text-soft-peach" />
          <span>Exporter en CSV</span>
        </a>
      </div>

      {/* Barre de Recherche & Filtres */}
      <div className="bg-white rounded-2xl p-4 shadow-soft border border-deep-teal-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Rechercher par client, société, pays..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-deep-teal-100 text-xs focus:outline-none focus:ring-2 focus:ring-deep-teal"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          {["all", "nouveau", "en_cours", "envoye", "gagne", "perdu"].map(
            (status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all flex-shrink-0 ${
                  statusFilter === status
                    ? "bg-deep-teal text-soft-peach shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {status === "all" ? "Tous" : status.replace("_", " ")}
              </button>
            )
          )}
        </div>
      </div>

      {/* Tableau des Devis */}
      <div className="bg-white rounded-2xl shadow-soft border border-deep-teal-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-700">
            <thead className="bg-deep-teal-50/70 text-deep-teal font-extrabold uppercase border-b border-deep-teal-100">
              <tr>
                <th className="px-5 py-3.5">Date</th>
                <th className="px-5 py-3.5">Client &bull; Entreprise</th>
                <th className="px-5 py-3.5">Localisation</th>
                <th className="px-5 py-3.5">Services demandés</th>
                <th className="px-5 py-3.5">Statut</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredQuotes.length > 0 ? (
                filteredQuotes.map((q) => (
                  <tr key={q.id} className="hover:bg-ice-white/80 transition-colors">
                    <td className="px-5 py-4 text-gray-500 whitespace-nowrap">
                      {new Date(q.createdAt).toLocaleDateString("fr-FR")}
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-bold text-deep-teal">{q.nom}</div>
                      <div className="text-[11px] text-gray-500">{q.societe || "Particulier"}</div>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="font-medium text-deep-teal">{q.ville}</span>, {q.pays}
                    </td>
                    <td className="px-5 py-4 max-w-xs truncate">
                      <span className="bg-deep-teal-50 px-2 py-0.5 rounded text-[11px] font-semibold text-deep-teal">
                        {q.services.replace(/[\[\]"]/g, "")}
                      </span>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <select
                        value={q.statut}
                        onChange={(e) => handleStatusChange(q.id, e.target.value)}
                        className={`text-[11px] font-bold uppercase px-2.5 py-1 rounded-md border focus:outline-none ${
                          q.statut === "nouveau"
                            ? "bg-amber-50 text-amber-800 border-amber-200"
                            : q.statut === "gagne"
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                            : q.statut === "envoye"
                            ? "bg-blue-50 text-blue-800 border-blue-200"
                            : "bg-gray-100 text-gray-700 border-gray-200"
                        }`}
                      >
                        <option value="nouveau">Nouveau</option>
                        <option value="en_cours">En cours</option>
                        <option value="envoye">Devis envoyé</option>
                        <option value="gagne">Gagné</option>
                        <option value="perdu">Perdu</option>
                      </select>
                    </td>
                    <td className="px-5 py-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => {
                          setSelectedQuote(q);
                          setNotes(q.notesInternes || "");
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-deep-teal text-white rounded-lg hover:bg-deep-teal-900 font-bold transition-all"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Détails</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-gray-500">
                    Aucun devis correspondant aux critères de recherche.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Détails Devis & Notes Internes */}
      {selectedQuote && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-deep-teal-100 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-soft-peach-600">
                  Détail du Devis
                </span>
                <h3 className="text-xl font-bold text-deep-teal">
                  {selectedQuote.nom} {selectedQuote.societe && `&bull; ${selectedQuote.societe}`}
                </h3>
              </div>
              <button
                onClick={() => setSelectedQuote(null)}
                className="text-gray-400 hover:text-gray-600 font-bold text-xl"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <strong className="text-gray-500 block">Email :</strong>
                <a href={`mailto:${selectedQuote.email}`} className="text-deep-teal font-bold hover:underline">
                  {selectedQuote.email}
                </a>
              </div>
              <div>
                <strong className="text-gray-500 block">Téléphone / WhatsApp :</strong>
                <a href={`tel:${selectedQuote.telephone}`} className="text-deep-teal font-bold hover:underline">
                  {selectedQuote.telephone}
                </a>
              </div>
              <div>
                <strong className="text-gray-500 block">Chantier :</strong>
                <span className="font-semibold">{selectedQuote.ville}, {selectedQuote.pays}</span>
              </div>
              <div>
                <strong className="text-gray-500 block">Budget / Délai :</strong>
                <span>{selectedQuote.budget || "N/A"} &bull; {selectedQuote.delai || "N/A"}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-ice-white border border-deep-teal-50 space-y-2">
              <strong className="text-xs font-bold text-deep-teal uppercase">Cahier des charges :</strong>
              <p className="text-xs text-gray-700 whitespace-pre-line leading-relaxed">
                {selectedQuote.description}
              </p>
            </div>

            {/* Pièces jointes */}
            {selectedQuote.fichiers && (
              <div className="space-y-2">
                <strong className="text-xs font-bold text-deep-teal uppercase">Fichiers transmis :</strong>
                <div className="flex flex-wrap gap-2">
                  {(() => {
                    try {
                      const files = JSON.parse(selectedQuote.fichiers);
                      return files.map((f: string, i: number) => (
                        <a
                          key={i}
                          href={f}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-deep-teal-50 text-deep-teal font-bold text-xs hover:bg-deep-teal hover:text-white transition-all border border-deep-teal-100"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>Fichier {i + 1}</span>
                        </a>
                      ));
                    } catch {
                      return <span className="text-xs text-gray-500">Aucun fichier</span>;
                    }
                  })()}
                </div>
              </div>
            )}

            {/* Notes Internes */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <label className="block text-xs font-bold text-deep-teal uppercase">
                Notes Internes &amp; Suivi d&apos;Équipe
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ex: Devis chiffré par l'ingénieur Mohamed à 45 000 DT. Appel de relance prévu mardi..."
                className="w-full px-4 py-2.5 rounded-xl border border-deep-teal-200 text-xs focus:outline-none focus:ring-2 focus:ring-deep-teal"
              />
              <button
                type="button"
                onClick={handleSaveNotes}
                disabled={isUpdating}
                className="px-4 py-2 bg-deep-teal text-white rounded-lg text-xs font-bold hover:bg-deep-teal-900 transition-all"
              >
                {isUpdating ? "Enregistrement..." : "Enregistrer la note interne"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

