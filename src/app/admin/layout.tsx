import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  LayoutDashboard,
  FileSpreadsheet,
  Mail,
  FolderGit2,
  Settings,
  ExternalLink,
  LogOut,
  Shield,
} from "lucide-react";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-[#f0f7f8] flex flex-col md:flex-row">
      {/* Sidebar Admin */}
      <aside className="w-full md:w-64 bg-deep-teal-950 text-ice-white flex flex-col justify-between border-r border-deep-teal-900 flex-shrink-0">
        <div>
          {/* Logo Admin */}
          <div className="p-6 border-b border-deep-teal-900 flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-2">
              <div className="relative w-36 h-9">
                <Image
                  src="/brand/logo-light.svg"
                  alt="BeTA Engineering Admin"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
          </div>

          <div className="px-4 py-3 bg-deep-teal-900/50 text-[11px] font-semibold text-soft-peach flex items-center gap-2">
            <Shield className="w-3.5 h-3.5" />
            <span>Console d&apos;Administration</span>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 text-xs font-semibold">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-ice-white/90 hover:text-soft-peach hover:bg-deep-teal-900 transition-colors"
            >
              <LayoutDashboard className="w-4 h-4 text-soft-peach" />
              <span>Tableau de Bord</span>
            </Link>

            <Link
              href="/admin/quotes"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-ice-white/90 hover:text-soft-peach hover:bg-deep-teal-900 transition-colors"
            >
              <FileSpreadsheet className="w-4 h-4 text-soft-peach" />
              <span>Gestion des Devis</span>
            </Link>

            <Link
              href="/admin/messages"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-ice-white/90 hover:text-soft-peach hover:bg-deep-teal-900 transition-colors"
            >
              <Mail className="w-4 h-4 text-soft-peach" />
              <span>Messages de Contact</span>
            </Link>

            <Link
              href="/admin/projects"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-ice-white/90 hover:text-soft-peach hover:bg-deep-teal-900 transition-colors"
            >
              <FolderGit2 className="w-4 h-4 text-soft-peach" />
              <span>Réalisations &amp; Chantiers</span>
            </Link>

            <Link
              href="/admin/settings"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-ice-white/90 hover:text-soft-peach hover:bg-deep-teal-900 transition-colors"
            >
              <Settings className="w-4 h-4 text-soft-peach" />
              <span>Paramètres du Site</span>
            </Link>
          </nav>
        </div>

        {/* Footer Sidebar */}
        <div className="p-4 border-t border-deep-teal-900 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 text-xs font-medium text-ice-white/70 hover:text-soft-peach rounded-lg hover:bg-deep-teal-900 transition-colors"
          >
            <span>Voir le site public</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <AdminLogoutButton />
        </div>
      </aside>

      {/* Zone de Contenu Principal */}
      <main className="flex-grow p-6 sm:p-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}

