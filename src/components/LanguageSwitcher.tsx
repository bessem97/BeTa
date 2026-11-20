"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Locale } from "@/lib/i18n";
import { Globe, Check } from "lucide-react";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);

  const languages: { code: Locale; label: string; flag: string }[] = [
    { code: "fr", label: "Français", flag: "FR" },
    { code: "en", label: "English", flag: "EN" },
    { code: "ar", label: "العربية", flag: "AR" },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold rounded-lg border border-deep-teal-600/30 bg-deep-teal/5 hover:bg-deep-teal/10 text-deep-teal transition-all focus:outline-none"
        aria-label="Changer de langue"
      >
        <Globe className="w-3.5 h-3.5 text-deep-teal" />
        <span className="uppercase">{language}</span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-card border border-deep-teal-100 py-1.5 z-50">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => {
                  setLanguage(l.code);
                  setOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors ${
                  language === l.code
                    ? "font-bold text-deep-teal bg-deep-teal-50"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span>{l.label}</span>
                {language === l.code && <Check className="w-3.5 h-3.5 text-deep-teal" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

