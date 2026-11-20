"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Award, Briefcase, Building2, Globe } from "lucide-react";

export default function StatCounters() {
  const { t } = useLanguage();

  const stats = [
    {
      value: "15+",
      label: t("stats.experience"),
      icon: Award,
    },
    {
      value: "380+",
      label: t("stats.projects"),
      icon: Briefcase,
    },
    {
      value: "160+",
      label: t("stats.clients"),
      icon: Building2,
    },
    {
      value: "14",
      label: t("stats.countries"),
      icon: Globe,
    },
  ];

  return (
    <div className="w-full bg-white rounded-2xl shadow-soft border border-deep-teal-100 p-6 sm:p-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-deep-teal-100">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className={`flex items-center gap-4 ${idx > 0 ? "pt-4 lg:pt-0 lg:pl-8" : ""}`}
            >
              <div className="w-12 h-12 rounded-xl bg-deep-teal-50 text-deep-teal flex items-center justify-center flex-shrink-0 shadow-sm border border-deep-teal-100">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-extrabold text-deep-teal tracking-tight block">
                  {s.value}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-gray-600 block mt-0.5">
                  {s.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

