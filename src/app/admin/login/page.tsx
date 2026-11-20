"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock, Mail, AlertCircle, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@beta-engineering.com");
  const [password, setPassword] = useState("Admin@2026!BeTA");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("Identifiants incorrects. Veuillez vérifier vos accès.");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch {
      setError("Erreur inattendue lors de la connexion.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#073740] via-deep-teal to-deep-teal-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-deep-teal-100 space-y-6">
        {/* Logo */}
        <div className="text-center space-y-3">
          <div className="relative w-48 h-12 mx-auto">
            <Image
              src="/brand/logo.svg"
              alt="BeTA Engineering"
              fill
              className="object-contain"
            />
          </div>
          <div className="inline-block px-3 py-1 rounded-full bg-deep-teal-50 text-deep-teal text-[11px] font-bold uppercase tracking-wider">
            Espace d&apos;Administration
          </div>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
              Identifiant / Email Admin
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-deep-teal-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-deep-teal"
              />
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
              Mot de passe
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-deep-teal-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-deep-teal"
              />
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-deep-teal-50 border border-deep-teal-100 text-[11px] text-deep-teal-800 space-y-1">
            <div className="font-bold">Identifiants configurés par défaut :</div>
            <div>Email : <span className="font-mono font-bold">admin@beta-engineering.com</span></div>
            <div>Passe : <span className="font-mono font-bold">Admin@2026!BeTA</span></div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-deep-teal hover:bg-deep-teal-900 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm disabled:opacity-50"
          >
            {isLoading ? (
              <span>Authentification...</span>
            ) : (
              <>
                <span>Se Connecter au Tableau de Bord</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

