"use client";

import React, { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const [phone, setPhone] = useState("+21698123456");

  useEffect(() => {
    // Si un paramètre personnalisé a été enregistré
    fetch("/api/admin/settings")
      .then((res) => (res.ok ? res.json() : {}))
      .then((data: any) => {
        if (data?.whatsapp) {
          setPhone(data.whatsapp.replace(/[^0-9]/g, ""));
        }
      })
      .catch(() => {});
  }, []);

  const message = encodeURIComponent(
    "Bonjour BeTA Engineering, je souhaite échanger avec vous concernant un projet technique en Tunisie / Afrique."
  );

  return (
    <a
      href={`https://wa.me/${phone.replace(/[^0-9]/g, "")}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter BeTA Engineering sur WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-300"
    >
      <MessageCircle className="w-8 h-8 fill-white" />
      <span className="absolute -top-1 -right-1 flex h-4 w-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
      </span>
    </a>
  );
}

