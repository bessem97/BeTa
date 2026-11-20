"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  FolderGit2,
  Plus,
  Trash2,
  Upload,
  CheckCircle2,
  Star,
  MapPin,
  Calendar,
} from "lucide-react";

interface ProjectItem {
  id: string;
  slug: string;
  titre: string;
  description: string;
  client: string;
  lieu: string;
  pays: string;
  date: string;
  serviceId: string;
  statut: string;
  misEnAvant: boolean;
  service: { id: string; titre: string };
  images: { id: string; url: string }[];
}

interface ServiceSimple {
  id: string;
  titre: string;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [services, setServices] = useState<ServiceSimple[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  // Formulaire d'ajout
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [client, setClient] = useState("");
  const [lieu, setLieu] = useState("");
  const [pays, setPays] = useState("Tunisie");
  const [date, setDate] = useState(new Date().getFullYear().toString());
  const [serviceId, setServiceId] = useState("");
  const [statut, setStatut] = useState("Terminé");
  const [misEnAvant, setMisEnAvant] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }

      // Charger les services
      const sRes = await fetch("/api/admin/settings"); // ou endpoint dédié
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setImageUrl(data.url);
      } else {
        alert("Erreur lors de l'upload de l'image");
      }
    } catch {
      alert("Erreur d'upload");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceId) {
      alert("Veuillez sélectionner un service de rattachement.");
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titre,
          description,
          client,
          lieu,
          pays,
          date,
          serviceId,
          statut,
          misEnAvant,
          images: imageUrl ? [imageUrl] : ["/images/projects/deploiement-fibre-campus-tunis.webp"],
        }),
      });

      if (res.ok) {
        setShowAddModal(false);
        // Réinitialiser
        setTitre("");
        setDescription("");
        setClient("");
        setLieu("");
        setImageUrl("");
        loadData();
      } else {
        alert("Erreur lors de la création du projet");
      }
    } catch {
      alert("Erreur serveur");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Voulez-vous supprimer ce projet ?")) return;
    try {
      const res = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProjects(projects.filter((p) => p.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-deep-teal">
            Gestion des Projets &amp; Réalisations
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Ajoutez, modifiez ou mettez en avant les chantiers livrés par BeTA Engineering.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-deep-teal hover:bg-deep-teal-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm transition-all"
        >
          <Plus className="w-4 h-4 text-soft-peach" />
          <span>Ajouter une réalisation</span>
        </button>
      </div>

      {/* Grille des Projets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-2xl overflow-hidden shadow-soft border border-deep-teal-100 flex flex-col justify-between"
          >
            <div>
              <div className="relative w-full h-44 bg-deep-teal-900">
                <Image
                  src={p.images[0]?.url || "/images/projects/deploiement-fibre-campus-tunis.webp"}
                  alt={p.titre}
                  fill
                  className="object-cover"
                />
                {p.misEnAvant && (
                  <span className="absolute top-3 right-3 p-1.5 rounded-lg bg-soft-peach text-deep-teal-950 font-bold text-[10px] flex items-center gap-1 shadow-md">
                    <Star className="w-3 h-3 fill-deep-teal-950" />
                    <span>À la Une</span>
                  </span>
                )}
                <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-deep-teal/90 text-ice-white text-[10px] font-semibold">
                  {p.service?.titre}
                </span>
              </div>

              <div className="p-5 space-y-2">
                <h3 className="text-sm font-bold text-deep-teal line-clamp-1">{p.titre}</h3>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <MapPin className="w-3.5 h-3.5 text-deep-teal" />
                  <span>{p.lieu} ({p.pays})</span>
                  <Calendar className="w-3.5 h-3.5 text-deep-teal ml-2" />
                  <span>{p.date}</span>
                </div>
                <p className="text-xs text-gray-600 line-clamp-2 mt-2 leading-relaxed">
                  {p.description}
                </p>
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                {p.statut}
              </span>
              <button
                onClick={() => handleDeleteProject(p.id)}
                className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50"
                title="Supprimer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Ajout Projet */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-deep-teal-100 max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-lg font-bold text-deep-teal">
                Nouvelle Réalisation / Chantier
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">
                  Titre du Projet *
                </label>
                <input
                  type="text"
                  required
                  value={titre}
                  onChange={(e) => setTitre(e.target.value)}
                  placeholder="Ex: Câblage Fibre Optique 10G & 8 Baies 42U"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-deep-teal-200 focus:outline-none focus:ring-2 focus:ring-deep-teal"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 uppercase mb-1">
                    Client
                  </label>
                  <input
                    type="text"
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                    placeholder="Ex: Groupe Industriel..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-deep-teal-200 focus:outline-none focus:ring-2 focus:ring-deep-teal"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 uppercase mb-1">
                    Pôle de rattachement *
                  </label>
                  <select
                    value={serviceId}
                    onChange={(e) => setServiceId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-deep-teal-200 focus:outline-none focus:ring-2 focus:ring-deep-teal"
                  >
                    <option value="">Sélectionner un service</option>
                    {projects
                      .map((p) => p.service)
                      .filter((v, i, a) => Boolean(v && a.findIndex((t) => t?.id === v?.id) === i))
                      .map((s) => (
                        <option key={s!.id} value={s!.id}>{s!.titre}</option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 uppercase mb-1">
                    Ville
                  </label>
                  <input
                    type="text"
                    value={lieu}
                    onChange={(e) => setLieu(e.target.value)}
                    placeholder="Tunis / Abidjan..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-deep-teal-200 focus:outline-none focus:ring-2 focus:ring-deep-teal"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 uppercase mb-1">
                    Pays
                  </label>
                  <input
                    type="text"
                    value={pays}
                    onChange={(e) => setPays(e.target.value)}
                    placeholder="Tunisie"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-deep-teal-200 focus:outline-none focus:ring-2 focus:ring-deep-teal"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 uppercase mb-1">
                    Année
                  </label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="2025"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-deep-teal-200 focus:outline-none focus:ring-2 focus:ring-deep-teal"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">
                  Description Détaillée des Travaux
                </label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Détails techniques, équipements installés, contraintes résolues..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-deep-teal-200 focus:outline-none focus:ring-2 focus:ring-deep-teal"
                />
              </div>

              {/* Upload Image Projet avec Sharp */}
              <div className="space-y-1.5">
                <label className="block font-bold text-gray-700 uppercase">
                  Image du Projet (Conversion WebP automatique)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="text-xs"
                  />
                  {uploadingImage && <span className="text-deep-teal font-bold">Optimisation Sharp en cours...</span>}
                </div>
                {imageUrl && (
                  <p className="text-[11px] text-emerald-600 font-bold">
                    ✓ Image uploadée et optimisée : {imageUrl}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="misenavant"
                  checked={misEnAvant}
                  onChange={(e) => setMisEnAvant(e.target.checked)}
                  className="w-4 h-4 rounded text-deep-teal"
                />
                <label htmlFor="misenavant" className="font-bold text-deep-teal cursor-pointer">
                  Mettre en avant sur la page d&apos;accueil
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border rounded-xl hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 bg-deep-teal text-white rounded-xl font-bold hover:bg-deep-teal-900 disabled:opacity-50"
                >
                  {isSubmitting ? "Création..." : "Enregistrer le projet"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

