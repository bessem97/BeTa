"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Upload,
  FileCheck,
  Sparkles,
  AlertCircle,
  Network,
  Zap,
  Cpu,
  Cog,
  Code,
} from "lucide-react";

const availableServices = [
  {
    id: "reseaux",
    title: "Réseaux Informatiques & Télécoms",
    desc: "Câblage optique/cuivre, baies, vidéosurveillance CCTV, Wi-Fi",
    icon: Network,
  },
  {
    id: "electricite-batiment",
    title: "Électricité Bâtiment & Tertiaire",
    desc: "Tableaux électriques, éclairage LED, mise en conformité",
    icon: Zap,
  },
  {
    id: "electricite-industrielle",
    title: "Électricité Industrielle & Tableauterie",
    desc: "Fabrication d'armoires TGBT sur-mesure, puissance, variateurs",
    icon: Cpu,
  },
  {
    id: "automatisme",
    title: "Automatisme & Systèmes SCADA",
    desc: "Automates PLC Siemens/Schneider, IHM, régulation, robotique",
    icon: Cog,
  },
  {
    id: "informatique",
    title: "Services Informatiques & Cybersécurité",
    desc: "Développement web & mobile, audits sécurité, cloud hybride",
    icon: Code,
  },
];

function QuoteFormContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const preSelectedService = searchParams.get("service");

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [delai, setDelai] = useState("");
  const [pays, setPays] = useState("Tunisie");
  const [ville, setVille] = useState("");
  const [nom, setNom] = useState("");
  const [societe, setSociete] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (preSelectedService) {
      const match = availableServices.find(
        (s) =>
          s.id === preSelectedService ||
          preSelectedService.includes(s.id) ||
          s.id.includes(preSelectedService)
      );
      if (match) {
        setSelectedServices([match.title]);
      }
    }
  }, [preSelectedService]);

  const toggleService = (title: string) => {
    if (selectedServices.includes(title)) {
      setSelectedServices(selectedServices.filter((s) => s !== title));
    } else {
      setSelectedServices([...selectedServices, title]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles([...files, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const validateStep = () => {
    setErrorMessage("");
    if (currentStep === 1) {
      if (selectedServices.length === 0) {
        setErrorMessage("Veuillez sélectionner au moins un domaine d'intervention.");
        return false;
      }
    } else if (currentStep === 2) {
      if (description.trim().length < 10) {
        setErrorMessage("Veuillez décrire brièvement vos besoins (min 10 caractères).");
        return false;
      }
    } else if (currentStep === 3) {
      if (!pays.trim() || !ville.trim()) {
        setErrorMessage("Veuillez indiquer le pays et la ville du chantier.");
        return false;
      }
    } else if (currentStep === 4) {
      if (!nom.trim() || !email.trim() || !telephone.trim()) {
        setErrorMessage("Veuillez renseigner votre nom, email et téléphone.");
        return false;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setErrorMessage("Veuillez fournir une adresse email valide.");
        return false;
      }
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, 5));
    }
  };

  const prevStep = () => {
    setErrorMessage("");
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.append("nom", nom);
      formData.append("societe", societe);
      formData.append("email", email);
      formData.append("telephone", telephone);
      formData.append("services", JSON.stringify(selectedServices));
      formData.append("description", description);
      formData.append("budget", budget);
      formData.append("delai", delai);
      formData.append("pays", pays);
      formData.append("ville", ville);
      formData.append("website_honeypot", honeypot);

      files.forEach((file) => {
        formData.append("files", file);
      });

      const res = await fetch("/api/quote", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsSuccess(true);
      } else {
        setErrorMessage(data.message || "Une erreur est survenue lors de l'envoi.");
      }
    } catch {
      setErrorMessage("Impossible de joindre le serveur. Vérifiez votre connexion.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-card border border-emerald-200 text-center space-y-6 animate-in fade-in duration-300">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-extrabold text-deep-teal">
          Demande de Devis Transmise avec Succès !
        </h2>
        <p className="text-sm text-gray-600 max-w-lg mx-auto leading-relaxed">
          Merci <strong>{nom}</strong>. Nos ingénieurs analysent actuellement vos besoins pour votre projet en <strong>{pays}</strong>. Vous recevrez un accusé de réception par email et un chiffrage technique sous 48 heures.
        </p>
        <div className="pt-4">
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-deep-teal text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm hover:bg-deep-teal-900 transition-all"
          >
            Retour à l&apos;accueil
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-card border border-deep-teal-100/80 overflow-hidden">
      {/* Barre de Progression en 5 Étapes */}
      <div className="bg-deep-teal-950 p-6 text-ice-white">
        <div className="flex items-center justify-between mb-3 text-xs font-bold">
          <span className="text-soft-peach uppercase tracking-wider">
            Étape {currentStep} sur 5
          </span>
          <span className="text-ice-white/70">
            {currentStep === 1 && "1. Domaines & Services"}
            {currentStep === 2 && "2. Cahier des charges"}
            {currentStep === 3 && "3. Lieu du chantier"}
            {currentStep === 4 && "4. Vos Coordonnées"}
            {currentStep === 5 && "5. Plans & Validation"}
          </span>
        </div>
        <div className="w-full h-2 bg-deep-teal-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-soft-peach transition-all duration-300"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* Formulaire Multi-Étapes */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-6">
        <input
          type="text"
          name="website_honeypot"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        {errorMessage && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* ÉTAPE 1 : Choix des Services */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-deep-teal">
              Quels sont les services techniques concernés ?
            </h3>
            <p className="text-xs text-gray-500">
              Sélectionnez un ou plusieurs domaines d&apos;intervention.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {availableServices.map((serv) => {
                const isSelected = selectedServices.includes(serv.title);
                const Icon = serv.icon;
                return (
                  <div
                    key={serv.id}
                    onClick={() => toggleService(serv.title)}
                    className={`p-4 rounded-2xl cursor-pointer border-2 transition-all flex items-start gap-3.5 ${
                      isSelected
                        ? "border-deep-teal bg-deep-teal-50 shadow-sm"
                        : "border-deep-teal-100 hover:border-deep-teal-300 bg-white"
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        isSelected
                          ? "bg-deep-teal text-soft-peach"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-sm font-bold text-deep-teal">
                        {serv.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        {serv.desc}
                      </p>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 border ${
                        isSelected
                          ? "bg-deep-teal border-deep-teal text-white"
                          : "border-gray-300 bg-white"
                      }`}
                    >
                      {isSelected && <CheckCircle2 className="w-4 h-4" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ÉTAPE 2 : Description du Projet & Budget */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-deep-teal">
              Décrivez votre projet et vos contraintes
            </h3>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Description détaillée des besoins *
              </label>
              <textarea
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ex: Rénovation du TGBT principal 1600A, tirage de 4 liaisons fibre optique inter-bâtiments et programmation d'un automate Siemens S7-1500..."
                className="w-full px-4 py-3 rounded-xl border border-deep-teal-200 text-sm focus:outline-none focus:ring-2 focus:ring-deep-teal focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Budget estimatif (Optionnel)
                </label>
                <input
                  type="text"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="Ex: 50 000 DT / 15 000 € / À définir"
                  className="w-full px-4 py-3 rounded-xl border border-deep-teal-200 text-sm focus:outline-none focus:ring-2 focus:ring-deep-teal"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Délai souhaité de réalisation
                </label>
                <input
                  type="text"
                  value={delai}
                  onChange={(e) => setDelai(e.target.value)}
                  placeholder="Ex: Urgent (1 mois) / Dans 3 mois"
                  className="w-full px-4 py-3 rounded-xl border border-deep-teal-200 text-sm focus:outline-none focus:ring-2 focus:ring-deep-teal"
                />
              </div>
            </div>
          </div>
        )}

        {/* ÉTAPE 3 : Localisation du Chantier */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-deep-teal">
              Où se situe le chantier ?
            </h3>
            <p className="text-xs text-gray-500">
              Nous intervenons dans toute la Tunisie et sur l&apos;ensemble du continent africain.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Pays d&apos;intervention *
                </label>
                <input
                  type="text"
                  value={pays}
                  onChange={(e) => setPays(e.target.value)}
                  placeholder="Ex: Tunisie, Côte d'Ivoire, Sénégal, Algérie..."
                  className="w-full px-4 py-3 rounded-xl border border-deep-teal-200 text-sm focus:outline-none focus:ring-2 focus:ring-deep-teal"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Ville ou zone industrielle *
                </label>
                <input
                  type="text"
                  value={ville}
                  onChange={(e) => setVille(e.target.value)}
                  placeholder="Ex: Tunis, Sfax, Abidjan, Dakar, Alger..."
                  className="w-full px-4 py-3 rounded-xl border border-deep-teal-200 text-sm focus:outline-none focus:ring-2 focus:ring-deep-teal"
                />
              </div>
            </div>
          </div>
        )}

        {/* ÉTAPE 4 : Coordonnées du Demandeur */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-deep-teal">
              Vos coordonnées professionnelles
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Nom complet *
                </label>
                <input
                  type="text"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  placeholder="Ex: M. Karim Ben Salem"
                  className="w-full px-4 py-3 rounded-xl border border-deep-teal-200 text-sm focus:outline-none focus:ring-2 focus:ring-deep-teal"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Entreprise / Société
                </label>
                <input
                  type="text"
                  value={societe}
                  onChange={(e) => setSociete(e.target.value)}
                  placeholder="Ex: Groupe Industriel..."
                  className="w-full px-4 py-3 rounded-xl border border-deep-teal-200 text-sm focus:outline-none focus:ring-2 focus:ring-deep-teal"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Email professionnel *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="k.bensalem@entreprise.com"
                  className="w-full px-4 py-3 rounded-xl border border-deep-teal-200 text-sm focus:outline-none focus:ring-2 focus:ring-deep-teal"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Numéro de téléphone / WhatsApp *
                </label>
                <input
                  type="tel"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  placeholder="+216 ... ou +225 ..."
                  className="w-full px-4 py-3 rounded-xl border border-deep-teal-200 text-sm focus:outline-none focus:ring-2 focus:ring-deep-teal"
                />
              </div>
            </div>
          </div>
        )}

        {/* ÉTAPE 5 : Pièces Jointes & Confirmation */}
        {currentStep === 5 && (
          <div className="space-y-5">
            <h3 className="text-lg font-bold text-deep-teal">
              Pièces Jointes &amp; Validation Finale
            </h3>
            <p className="text-xs text-gray-500">
              Ajoutez vos schémas, plans de masse, cahiers des charges (PDF, DWG, images jusqu&apos;à 10 Mo).
            </p>

            <div className="border-2 border-dashed border-deep-teal-200 rounded-2xl p-6 text-center hover:border-deep-teal transition-colors bg-ice-white">
              <Upload className="w-8 h-8 text-deep-teal mx-auto mb-2" />
              <p className="text-xs font-bold text-deep-teal">
                Glissez vos documents ici ou cliquez pour parcourir
              </p>
              <p className="text-[11px] text-gray-500 mt-1">
                Formats acceptés : PDF, JPG, PNG, DOCX, ZIP (Max 10 Mo par fichier)
              </p>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="mt-4 inline-block px-4 py-2 bg-white border border-deep-teal-200 text-deep-teal text-xs font-bold rounded-lg cursor-pointer hover:bg-deep-teal-50"
              >
                Sélectionner des fichiers
              </label>
            </div>

            {files.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-deep-teal uppercase">
                  Fichiers sélectionnés ({files.length}) :
                </span>
                {files.map((f, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-deep-teal-50 border border-deep-teal-100 text-xs"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <FileCheck className="w-4 h-4 text-deep-teal flex-shrink-0" />
                      <span className="truncate">{f.name}</span>
                      <span className="text-gray-500">
                        ({(f.size / 1024 / 1024).toFixed(2)} Mo)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(i)}
                      className="text-red-500 hover:text-red-700 font-bold ml-2"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs space-y-1.5">
              <div className="font-bold text-deep-teal">Récapitulatif de votre demande :</div>
              <p><strong>Services :</strong> {selectedServices.join(", ")}</p>
              <p><strong>Lieu :</strong> {ville}, {pays}</p>
              <p><strong>Contact :</strong> {nom} ({email} / {telephone})</p>
            </div>
          </div>
        )}

        {/* Boutons Navigation */}
        <div className="pt-6 border-t border-deep-teal-100 flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-deep-teal-200 text-deep-teal font-bold text-xs uppercase tracking-wider hover:bg-ice-white transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Précédent</span>
            </button>
          ) : <div />}

          {currentStep < 5 ? (
            <button
              type="button"
              onClick={nextStep}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-deep-teal hover:bg-deep-teal-900 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-sm"
            >
              <span>Continuer</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-soft-peach hover:bg-soft-peach-400 text-deep-teal-950 font-extrabold text-xs uppercase tracking-wider transition-all shadow-peach disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Transmission en cours...</span>
              ) : (
                <>
                  <span>Confirmer et Envoyer le Devis</span>
                  <CheckCircle2 className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default function QuotePage() {
  return (
    <div className="py-12 md:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
        <span className="px-3.5 py-1.5 rounded-full bg-deep-teal/10 text-deep-teal text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Bureau d&apos;Études &amp; Devis Gratuit</span>
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-deep-teal tracking-tight">
          Demandez Votre Devis Technique
        </h1>
        <p className="text-sm text-gray-600">
          Chiffrage détaillé sous 48h ouvrées pour vos chantiers en Tunisie et sur l&apos;ensemble du continent africain.
        </p>
      </div>

      <Suspense fallback={<div className="text-center py-20 text-deep-teal">Chargement du formulaire...</div>}>
        <QuoteFormContent />
      </Suspense>
    </div>
  );
}
