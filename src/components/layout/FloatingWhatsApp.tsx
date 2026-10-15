"use client";

import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

interface FloatingWhatsAppProps {
  whatsappNumber: string;
  defaultMessage?: string;
}

export function FloatingWhatsApp({
  whatsappNumber,
  defaultMessage,
}: FloatingWhatsAppProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  if (!whatsappNumber) return null;

  const url = buildWhatsAppUrl(whatsappNumber, defaultMessage);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hubungi kami via WhatsApp"
      className={`fixed bottom-20 md:bottom-8 right-5 md:right-8 z-40 inline-flex items-center justify-center w-14 h-14 rounded-full bg-neutral-900 text-white shadow-xl hover:bg-neutral-800 hover:scale-105 active:scale-95 transition-all duration-200 border border-neutral-700 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0 pointer-events-none"
      }`}
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
}
