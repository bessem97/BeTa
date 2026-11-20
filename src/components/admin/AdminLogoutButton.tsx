"use client";

import React from "react";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function AdminLogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className="w-full flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-red-300 hover:text-red-100 hover:bg-red-950/40 rounded-lg transition-colors"
    >
      <LogOut className="w-3.5 h-3.5" />
      <span>Déconnexion</span>
    </button>
  );
}

