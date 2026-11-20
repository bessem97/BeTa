"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { ShieldCheck } from "lucide-react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const consent = localStorage.getItem("beta_cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("beta_cookie_consent", "accepted");
    setVisible(false);
  };

  const refuse = () => {
    localStorage.setItem("beta_cookie_consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-deep-teal-950/95 text-ice-white backdrop-blur-md border-t border-deep-teal-700 shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-soft-peach flex-shrink-0" />
          <p className="text-sm text-ice-white/90">
            {t("cookie.text")}{" "}
            <Link href="/politique-confidentialite" className="underline text-soft-peach hover:text-white">
              {t("footer.privacy")}
            </Link>
            .
          </p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={refuse}
            className="px-4 py-2 text-xs font-semibold text-ice-white hover:text-soft-peach transition-colors border border-deep-teal-600 rounded-lg hover:bg-deep-teal-800"
          >
            {t("cookie.refuse")}
          </button>
          <button
            onClick={accept}
            className="px-5 py-2 text-xs font-bold bg-soft-peach text-deep-teal-950 rounded-lg hover:bg-soft-peach-400 transition-colors shadow-peach"
          >
            {t("cookie.accept")}
          </button>
        </div>
      </div>
    </div>
  );
}

