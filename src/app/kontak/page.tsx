import { MapPin, Clock, Phone, Mail, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SlotOutline } from "@/components/dev/SlotOutline";
import { ContactForm } from "@/components/forms/ContactForm";
import { siteConfig } from "../../../site.config";
import { getPracticeAreas } from "@/lib/content";

export const metadata = {
  title: "Hubungi Kami",
};

export default function KontakPage() {
  const hasAddress = !!siteConfig.address;
  const hasPhone = !!siteConfig.phone;
  const hasEmail = !!siteConfig.email;
  const hasHours = !!siteConfig.openingHours?.days;
  const hasMaps = !!siteConfig.mapsEmbedUrl;
  const hasWhatsApp = !!siteConfig.whatsappNumber;
  const hasContactInfo = hasAddress || hasPhone || hasEmail || hasHours;
  const practiceAreas = getPracticeAreas();

  return (
    <Section>
      <Container>
        <Breadcrumb items={[{ label: "Kontak" }]} />

        <div className="mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Konsultasi & Alamat
          </span>
          <h1 className="font-heading text-4xl font-bold text-neutral-900 mt-2">
            Hubungi Kantor Hukum
          </h1>
          <p className="text-neutral-600 mt-2 max-w-2xl">
            Sampaikan permasalahan hukum Anda atau jadwalkan pertemuan konsultasi secara langsung dengan tim advokat kami.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column — Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            {hasContactInfo ? (
              <div className="p-8 rounded-2xl border border-neutral-200 bg-neutral-50/70 space-y-6">
                <h2 className="font-heading text-xl font-bold text-neutral-900 mb-6">
                  Informasi Kantor
                </h2>

                {hasAddress && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center shrink-0 text-neutral-700 shadow-sm">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 text-sm">Alamat Kantor</h3>
                      <p className="text-neutral-600 text-sm mt-0.5 leading-relaxed">
                        {siteConfig.address}
                      </p>
                    </div>
                  </div>
                )}

                {hasHours && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center shrink-0 text-neutral-700 shadow-sm">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 text-sm">Jam Pelayanan</h3>
                      <p className="text-neutral-600 text-sm mt-0.5">
                        {siteConfig.openingHours!.days}
                        {siteConfig.openingHours!.hours && ` · ${siteConfig.openingHours!.hours}`}
                      </p>
                    </div>
                  </div>
                )}

                {hasPhone && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center shrink-0 text-neutral-700 shadow-sm">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 text-sm">Telepon Kantor</h3>
                      <a
                        href={`tel:${siteConfig.phone}`}
                        className="text-neutral-600 hover:text-neutral-950 text-sm mt-0.5 inline-block font-medium transition-colors"
                      >
                        {siteConfig.phone}
                      </a>
                    </div>
                  </div>
                )}

                {hasWhatsApp && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center shrink-0 text-neutral-700 shadow-sm">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 text-sm">WhatsApp Resmi</h3>
                      <a
                        href={`https://wa.me/${siteConfig.whatsappNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-600 hover:text-neutral-950 text-sm mt-0.5 inline-block font-medium transition-colors"
                      >
                        +{siteConfig.whatsappNumber}
                      </a>
                    </div>
                  </div>
                )}

                {hasEmail && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center shrink-0 text-neutral-700 shadow-sm">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 text-sm">Email Resmi</h3>
                      <a
                        href={`mailto:${siteConfig.email}`}
                        className="text-neutral-600 hover:text-neutral-950 text-sm mt-0.5 inline-block font-medium transition-colors"
                      >
                        {siteConfig.email}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <SlotOutline label="Info Kontak" className="mb-8" />
            )}

            {/* Map Placeholder or Embed */}
            {hasMaps ? (
              <div className="rounded-2xl overflow-hidden border border-neutral-200 shadow-sm">
                <iframe
                  src={siteConfig.mapsEmbedUrl}
                  width="100%"
                  height="260"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi Kantor"
                />
              </div>
            ) : null}
          </div>

          {/* Right Column — Contact Form */}
          <div className="lg:col-span-7">
            {hasWhatsApp ? (
              <div className="p-8 sm:p-10 rounded-2xl border border-neutral-200 bg-white shadow-sm">
                <div className="mb-8">
                  <h2 className="font-heading text-2xl font-bold text-neutral-900">
                    Kirim Pesan Konsultasi
                  </h2>
                  <p className="text-sm text-neutral-600 mt-1">
                    Isi formulir di bawah ini. Pesan akan terformat otomatis dan diteruskan langsung ke WhatsApp tim advokat kami.
                  </p>
                </div>

                <ContactForm
                  whatsappNumber={siteConfig.whatsappNumber}
                  practiceAreas={practiceAreas.map((a) => ({
                    slug: a.slug,
                    title: a.title,
                  }))}
                  privacyPublished={siteConfig.legal?.privacyPublished}
                />
              </div>
            ) : (
              <SlotOutline label="Form Kontak" className="min-h-[300px]" />
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
