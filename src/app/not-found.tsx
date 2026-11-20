import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, HelpCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-card border border-deep-teal-100 text-center space-y-6">
        <div className="text-6xl font-black text-deep-teal font-display">
          404
        </div>
        <h1 className="text-2xl font-extrabold text-deep-teal">
          Page Non Trouvée
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          Le document technique ou la page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-deep-teal text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm hover:bg-deep-teal-900 transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Accueil</span>
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-deep-teal-50 text-deep-teal font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-deep-teal-100 transition-all"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Assistance</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

