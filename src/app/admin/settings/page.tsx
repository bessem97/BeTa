"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Settings, Save, CheckCircle2, Upload } from "lucide-react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({
    company_name: "BeTA Engineering",
    slogan_fr: "Du réseau à l'automatisme, nous connectons votre performance.",
    slogan_en: "From networks to automation, we connect your performance.",
    slogan_ar: "من الشبكات إلى الأتمتة، نربط أداءكم بالتميز والريادة.",
    phone: "+216 71 888 999",
    whatsapp: "+216 98 123 456",
    email: "contact@beta-engineering.com",
    address: "Immeuble Le Grand Boulevard, Centre Urbain Nord, 1082 Tunis, Tunisie",
    opening_hours: "Lundi - Vendredi : 08h00 - 18h00 | Samedi : 08h00 - 13h00",
    years_experience: "15",
    projects_count: "380",
    clients_count: "160",
    countries_count: "14",
    logo_url: "/brand/logo.svg",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((res) => (res.ok ? res.json() : {}))
      .then((data) => {
        if (data && Object.keys(data).length > 0) {
          setSettings((prev) => ({ ...prev, ...data }));
        }
      })
      .catch(() => {});
  }, []);

  const handleChange = (key: string, val: string) => {
    setSettings((prev) => ({ ...prev, [key]: val }));
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setUploadingLogo(true);
    try {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setSettings((prev) => ({ ...prev, logo_url: data.url }));
        alert("Logo mis à jour avec succès ! N'oubliez pas d'enregistrer.");
      }
    } catch {
      alert("Erreur upload logo");
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccess(false);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-black text-deep-teal">
          Paramètres Généraux du Site
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Configurez les coordonnées de Tunis, les slogans, les compteurs clés et le logo de BeTA Engineering.
        </p>
      </div>

      {success && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Paramètres enregistrés avec succès !</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Identité & Logos */}
        <div className="bg-white rounded-2xl p-6 shadow-soft border border-deep-teal-100 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-deep-teal border-b border-gray-100 pb-2">
            Identité de Marque &amp; Logo
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Nom de la Société
              </label>
              <input
                type="text"
                value={settings.company_name}
                onChange={(e) => handleChange("company_name", e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-deep-teal-200 text-xs focus:ring-2 focus:ring-deep-teal"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Remplacement du Logo
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="text-xs"
                />
                {uploadingLogo && <span className="text-xs font-bold text-deep-teal">Upload...</span>}
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-4">
            <span className="text-xs font-bold text-gray-500">Aperçu du logo actuel :</span>
            <div className="relative w-40 h-10 border p-1 rounded bg-ice-white">
              <Image
                src={settings.logo_url || "/brand/logo.svg"}
                alt="Aperçu logo"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Slogans Multilingues */}
        <div className="bg-white rounded-2xl p-6 shadow-soft border border-deep-teal-100 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-deep-teal border-b border-gray-100 pb-2">
            Slogans Officiels (FR / EN / AR)
          </h2>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Slogan Français
              </label>
              <input
                type="text"
                value={settings.slogan_fr}
                onChange={(e) => handleChange("slogan_fr", e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-deep-teal-200 text-xs focus:ring-2 focus:ring-deep-teal"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Slogan Anglais
              </label>
              <input
                type="text"
                value={settings.slogan_en}
                onChange={(e) => handleChange("slogan_en", e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-deep-teal-200 text-xs focus:ring-2 focus:ring-deep-teal"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Slogan Arabe
              </label>
              <input
                type="text"
                dir="rtl"
                value={settings.slogan_ar}
                onChange={(e) => handleChange("slogan_ar", e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-deep-teal-200 text-xs focus:ring-2 focus:ring-deep-teal font-arabic"
              />
            </div>
          </div>
        </div>

        {/* Coordonnées & Accès */}
        <div className="bg-white rounded-2xl p-6 shadow-soft border border-deep-teal-100 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-deep-teal border-b border-gray-100 pb-2">
            Coordonnées du Siège à Tunis
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Téléphone Fixe
              </label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-deep-teal-200 text-xs focus:ring-2 focus:ring-deep-teal"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Numéro WhatsApp
              </label>
              <input
                type="text"
                value={settings.whatsapp}
                onChange={(e) => handleChange("whatsapp", e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-deep-teal-200 text-xs focus:ring-2 focus:ring-deep-teal"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Email de Contact
              </label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-deep-teal-200 text-xs focus:ring-2 focus:ring-deep-teal"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Horaires d&apos;ouverture
              </label>
              <input
                type="text"
                value={settings.opening_hours}
                onChange={(e) => handleChange("opening_hours", e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-deep-teal-200 text-xs focus:ring-2 focus:ring-deep-teal"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
              Adresse Postale Complète à Tunis
            </label>
            <input
              type="text"
              value={settings.address}
              onChange={(e) => handleChange("address", e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-deep-teal-200 text-xs focus:ring-2 focus:ring-deep-teal"
            />
          </div>
        </div>

        {/* Chiffres Clés de Réassurance */}
        <div className="bg-white rounded-2xl p-6 shadow-soft border border-deep-teal-100 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-deep-teal border-b border-gray-100 pb-2">
            Chiffres Clés du Bandeau Accueil
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Années d&apos;expérience
              </label>
              <input
                type="text"
                value={settings.years_experience}
                onChange={(e) => handleChange("years_experience", e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-deep-teal-200 text-xs focus:ring-2 focus:ring-deep-teal"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Projets réalisés
              </label>
              <input
                type="text"
                value={settings.projects_count}
                onChange={(e) => handleChange("projects_count", e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-deep-teal-200 text-xs focus:ring-2 focus:ring-deep-teal"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Clients B2B
              </label>
              <input
                type="text"
                value={settings.clients_count}
                onChange={(e) => handleChange("clients_count", e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-deep-teal-200 text-xs focus:ring-2 focus:ring-deep-teal"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Pays couverts
              </label>
              <input
                type="text"
                value={settings.countries_count}
                onChange={(e) => handleChange("countries_count", e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-deep-teal-200 text-xs focus:ring-2 focus:ring-deep-teal"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-deep-teal hover:bg-deep-teal-900 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm disabled:opacity-50"
        >
          <Save className="w-4 h-4 text-soft-peach" />
          <span>{isSaving ? "Enregistrement..." : "Enregistrer tous les paramètres"}</span>
        </button>
      </form>
    </div>
  );
}

