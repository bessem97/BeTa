"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  Sparkles,
} from "lucide-react";

export default function ContactPage() {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [sujet, setSujet] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom,
          email,
          telephone,
          sujet,
          message,
          website_honeypot: honeypot,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsSuccess(true);
      } else {
        setErrorMessage(data.message || "Une erreur est survenue lors de l'envoi.");
      }
    } catch {
      setErrorMessage("Impossible de joindre le serveur.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-16 py-12 md:py-20 max-w-[1850px] mx-auto px-4 sm:px-8 xl:px-14">
      {/* En-tête */}
      <div className="text-center max-w-4xl mx-auto space-y-4">
        <span className="px-3.5 py-1.5 rounded-full bg-deep-teal/10 text-deep-teal text-xs font-black uppercase tracking-widest inline-flex items-center gap-1.5">
          <Sparkles className="w-4 h-4" />
          <span>Contact Direct Bureau d&apos;Études</span>
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-deep-teal tracking-tight">
          Un Projet, Une Question ? Échangeons Ensemble
        </h1>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
          Nos ingénieurs au Centre Urbain Nord à Tunis sont à votre écoute pour toute demande d&apos;information technique, d&apos;audit ou d&apos;intervention sur site en Tunisie et dans toute l&apos;Afrique.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-start">
        {/* Colonne Gauche : Coordonnées & Accès */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-card border border-deep-teal-100 space-y-6">
            <h2 className="text-2xl font-black text-deep-teal border-b border-deep-teal-50 pb-4">
              Siège Social &amp; Bureau d&apos;Études
            </h2>

            <div className="space-y-6 text-sm text-gray-700">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-deep-teal-50 text-deep-teal flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-deep-teal text-base">Adresse à Tunis</h4>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
                    Immeuble Le Grand Boulevard, Centre Urbain Nord, 1082 Tunis, Tunisie
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-deep-teal-50 text-deep-teal flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-deep-teal text-base">Téléphone Standard</h4>
                  <a
                    href="tel:+21671888999"
                    className="text-xs sm:text-sm font-bold text-deep-teal hover:underline mt-1 block"
                  >
                    +216 71 888 999
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-emerald-800 text-base">WhatsApp Pro Direct</h4>
                  <a
                    href="https://wa.me/21698123456"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm font-bold text-emerald-600 hover:underline mt-1 block"
                  >
                    +216 98 123 456 (Réponse rapide par ingénieur)
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-deep-teal-50 text-deep-teal flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-deep-teal text-base">Courrier Électronique</h4>
                  <a
                    href="mailto:contact@beta-engineering.com"
                    className="text-xs sm:text-sm font-bold text-deep-teal hover:underline mt-1 block"
                  >
                    contact@beta-engineering.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-deep-teal-50 text-deep-teal flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-deep-teal text-base">Horaires d&apos;Ouverture</h4>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">
                    Lundi &ndash; Vendredi : 08h00 &ndash; 18h00<br />
                    Samedi : 08h00 &ndash; 13h00 (Astreinte 24/7)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Colonne Droite : Formulaire */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-card border border-deep-teal-100">
            <h2 className="text-2xl font-black text-deep-teal mb-2">
              Envoyez-nous Votre Demande Technique
            </h2>
            <p className="text-sm text-gray-500 mb-8 font-normal">
              Nos ingénieurs étudient votre besoin et vous répondent sous 24h ouvrées.
            </p>

            {isSuccess ? (
              <div className="p-8 text-center space-y-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-xl font-bold text-emerald-900">
                  Message Transmis avec Succès !
                </h3>
                <p className="text-sm text-emerald-800 leading-relaxed font-normal">
                  Merci <strong>{nom}</strong>. Votre message a bien été transmis à la direction technique de BeTA Engineering. Nous vous recontacterons dans les plus brefs délais.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
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
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                      Votre Nom &amp; Prénom *
                    </label>
                    <input
                      type="text"
                      required
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                      placeholder="M. Nom Prénom"
                      className="w-full px-4 py-3 rounded-xl border border-deep-teal-200 text-sm focus:outline-none focus:ring-2 focus:ring-deep-teal"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                      Email Professionnel *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nom@entreprise.com"
                      className="w-full px-4 py-3 rounded-xl border border-deep-teal-200 text-sm focus:outline-none focus:ring-2 focus:ring-deep-teal"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                      Téléphone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={telephone}
                      onChange={(e) => setTelephone(e.target.value)}
                      placeholder="+216 ... ou +225 ..."
                      className="w-full px-4 py-3 rounded-xl border border-deep-teal-200 text-sm focus:outline-none focus:ring-2 focus:ring-deep-teal"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                      Sujet de la demande *
                    </label>
                    <input
                      type="text"
                      required
                      value={sujet}
                      onChange={(e) => setSujet(e.target.value)}
                      placeholder="Demande d'audit / Chiffrage / Renseignement"
                      className="w-full px-4 py-3 rounded-xl border border-deep-teal-200 text-sm focus:outline-none focus:ring-2 focus:ring-deep-teal"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                    Votre Message Détaillé *
                  </label>
                  <textarea
                    rows={6}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Précisez la nature de votre projet, les puissances ou bandes passantes recherchées, la localisation..."
                    className="w-full px-4 py-3.5 rounded-xl border border-deep-teal-200 text-sm focus:outline-none focus:ring-2 focus:ring-deep-teal"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-9 py-4 bg-deep-teal hover:bg-deep-teal-900 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-teal disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Transmission en cours...</span>
                  ) : (
                    <>
                      <span>Envoyer le Message Direct</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Carte Google Maps Intégrée Tunis (Centre Urbain Nord) Grand Angle */}
      <div className="w-full rounded-3xl overflow-hidden shadow-card border border-deep-teal-100 h-[450px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12768.423984187258!2d10.1983!3d36.8488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd34d618d78077%3A0x647e3a936a282f42!2sCentre%20Urbain%20Nord%2C%20Tunis!5e0!3m2!1sfr!2stn!4v1700000000000!5m2!1sfr!2stn"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Emplacement de BeTA Engineering à Tunis"
        />
      </div>
    </div>
  );
}
