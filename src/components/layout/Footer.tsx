import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, Phone, Mail } from "lucide-react";
import type { SiteConfig } from "../../../site.config";

interface FooterProps {
  config: SiteConfig;
}

export function Footer({ config }: FooterProps) {
  const hasAddress = !!config.address;
  const hasPhone = !!config.phone;
  const hasEmail = !!config.email;
  const hasHours = !!config.openingHours?.days;
  const hasSocial = config.social && Object.values(config.social).some(Boolean);
  const hasContactInfo = hasAddress || hasPhone || hasEmail || hasHours;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-neutral-300" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/logo.jpeg"
                alt={config.name || "Logo"}
                width={44}
                height={44}
                className="rounded-full bg-white p-0.5"
              />
              <span className="font-heading font-semibold text-white text-lg">
                {config.shortName || "Kantor Hukum Sugiyono"}
              </span>
            </Link>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
              {config.tagline ||
                "Layanan advokasi dan konsultasi hukum profesional dengan dedikasi tinggi, berintegritas, dan terpercaya."}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Navigasi
            </h3>
            <ul className="space-y-2.5">
              {config.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info (only if data exists) */}
          {hasContactInfo && (
            <div>
              <h3 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-4">
                Kontak
              </h3>
              <ul className="space-y-3">
                {hasAddress && (
                  <li className="flex items-start gap-3 text-sm">
                    <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-neutral-500" />
                    <span>{config.address}</span>
                  </li>
                )}
                {hasHours && (
                  <li className="flex items-start gap-3 text-sm">
                    <Clock className="w-4 h-4 mt-0.5 shrink-0 text-neutral-500" />
                    <span>
                      {config.openingHours!.days}
                      {config.openingHours!.hours && `, ${config.openingHours!.hours}`}
                    </span>
                  </li>
                )}
                {hasPhone && (
                  <li className="flex items-start gap-3 text-sm">
                    <Phone className="w-4 h-4 mt-0.5 shrink-0 text-neutral-500" />
                    <a
                      href={`tel:${config.phone}`}
                      className="hover:text-white transition-colors"
                    >
                      {config.phone}
                    </a>
                  </li>
                )}
                {hasEmail && (
                  <li className="flex items-start gap-3 text-sm">
                    <Mail className="w-4 h-4 mt-0.5 shrink-0 text-neutral-500" />
                    <a
                      href={`mailto:${config.email}`}
                      className="hover:text-white transition-colors"
                    >
                      {config.email}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Social Links (only if data exists) */}
        {hasSocial && (
          <div className="border-t border-neutral-800 py-4 flex justify-center gap-4">
            {Object.entries(config.social!).map(([key, url]) =>
              url ? (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-500 hover:text-white transition-colors capitalize text-sm"
                  aria-label={key}
                >
                  {key}
                </a>
              ) : null
            )}
          </div>
        )}

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 py-6 text-center text-xs text-neutral-500">
          <p>
            &copy; {currentYear} {config.name || "Kantor Hukum"}
          </p>
        </div>
      </div>
    </footer>
  );
}
