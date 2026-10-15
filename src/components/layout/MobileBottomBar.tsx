"use client";

import { Phone, MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

interface MobileBottomBarProps {
  phone?: string;
  whatsappNumber?: string;
  whatsappDefaultMessage?: string;
}

export function MobileBottomBar({
  phone,
  whatsappNumber,
  whatsappDefaultMessage,
}: MobileBottomBarProps) {
  const hasPhone = !!phone;
  const hasWhatsApp = !!whatsappNumber;

  if (!hasPhone && !hasWhatsApp) return null;

  const whatsAppUrl = hasWhatsApp
    ? buildWhatsAppUrl(whatsappNumber!, whatsappDefaultMessage)
    : "";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-neutral-200 shadow-xl">
      <div className="grid grid-cols-2 divide-x divide-neutral-200">
        {hasPhone ? (
          <a
            href={`tel:${phone}`}
            className="flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-neutral-800 hover:bg-neutral-50 transition-colors"
            aria-label="Telepon"
          >
            <Phone className="w-4 h-4 text-neutral-600" />
            <span>Telepon</span>
          </a>
        ) : (
          <div />
        )}
        {hasWhatsApp ? (
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-white bg-neutral-900 hover:bg-neutral-800 transition-colors"
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
