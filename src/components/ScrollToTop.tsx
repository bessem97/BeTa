"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Retour en haut de page"
      className="fixed bottom-6 left-6 z-40 flex items-center justify-center w-11 h-11 bg-deep-teal text-ice-white rounded-full shadow-md hover:bg-deep-teal-900 hover:text-soft-peach transition-all duration-300 border border-deep-teal-600 focus:outline-none focus:ring-2 focus:ring-soft-peach"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}

