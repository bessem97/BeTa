"use client";

import React, { useState, useEffect } from "react";
import { Mail, Check, Trash2, Reply, Clock } from "lucide-react";

interface MessageItem {
  id: string;
  nom: string;
  email: string;
  telephone?: string | null;
  sujet: string;
  message: string;
  lu: boolean;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/messages")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setMessages(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const toggleLu = async (id: string, currentLu: boolean) => {
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lu: !currentLu }),
      });
      if (res.ok) {
        setMessages(
          messages.map((m) => (m.id === id ? { ...m, lu: !currentLu } : m))
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Voulez-vous vraiment supprimer ce message ?")) return;
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setMessages(messages.filter((m) => m.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-deep-teal">
          Messages de Contact Reçus
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Consultez et répondez aux messages laissés par les visiteurs du site.
        </p>
      </div>

      <div className="space-y-4">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-6 rounded-2xl shadow-soft border transition-all ${
                msg.lu
                  ? "bg-white border-deep-teal-100"
                  : "bg-deep-teal-50/50 border-deep-teal-300 shadow-md"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2">
                  {!msg.lu && (
                    <span className="w-2.5 h-2.5 rounded-full bg-soft-peach-600" />
                  )}
                  <h3 className="text-base font-bold text-deep-teal">
                    {msg.sujet}
                  </h3>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(msg.createdAt).toLocaleDateString("fr-FR")} &bull;{" "}
                  {new Date(msg.createdAt).toLocaleTimeString("fr-FR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              <div className="py-4 space-y-3">
                <div className="flex flex-wrap gap-4 text-xs font-semibold text-gray-600">
                  <span>Expéditeur : <strong className="text-deep-teal">{msg.nom}</strong></span>
                  <span>Email : <a href={`mailto:${msg.email}`} className="text-deep-teal hover:underline">{msg.email}</a></span>
                  {msg.telephone && <span>Tél : {msg.telephone}</span>}
                </div>

                <div className="p-4 rounded-xl bg-ice-white text-xs text-gray-700 whitespace-pre-line leading-relaxed">
                  {msg.message}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
                <button
                  onClick={() => toggleLu(msg.id, msg.lu)}
                  className="text-gray-500 hover:text-deep-teal font-medium"
                >
                  {msg.lu ? "Marquer comme non lu" : "Marquer comme lu"}
                </button>

                <div className="flex items-center gap-3">
                  <a
                    href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.sujet)}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-deep-teal text-white font-bold hover:bg-deep-teal-900 transition-all"
                  >
                    <Reply className="w-3.5 h-3.5" />
                    <span>Répondre par email</span>
                  </a>
                  <button
                    onClick={() => deleteMessage(msg.id)}
                    className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-2xl p-10 text-center text-gray-500 shadow-soft border border-deep-teal-100">
            Aucun message de contact dans la boîte de réception.
          </div>
        )}
      </div>
    </div>
  );
}

