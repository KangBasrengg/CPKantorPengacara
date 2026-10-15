import Link from "next/link";
import {
  Scale,
  ShieldCheck,
  Briefcase,
  Users,
  ArrowRight,
  MessageCircle,
  Phone,
  CheckCircle2,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { getHomePage, getPracticeAreas, getTeamMembers } from "@/lib/content";
import { siteConfig } from "../../site.config";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export default function HomePage() {
  const pageData = getHomePage();
  const practiceAreas = getPracticeAreas();
  const teamMembers = getTeamMembers();

  const whatsAppUrl = siteConfig.whatsappNumber
    ? buildWhatsAppUrl(siteConfig.whatsappNumber, siteConfig.whatsappDefaultMessage)
    : "";

  return (
    <>
      {/* ─── Hero Section ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-neutral-50 via-white to-white py-20 md:py-28 border-b border-neutral-200">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-6 text-xs font-semibold tracking-wide uppercase bg-neutral-100 text-neutral-800 rounded-full border border-neutral-200">
              <Scale className="w-4 h-4 text-neutral-600" />
              <span>Advokat & Konsultan Hukum · Semarang</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 tracking-tight leading-[1.15] mb-6">
              {pageData?.hero?.heading || "Pendampingan Hukum Berintegritas & Profesional"}
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto mb-10">
              {pageData?.hero?.subheading ||
                "Memberikan pembelaan serta solusi hukum terpercaya dan berkeadilan bagi individu maupun korporasi."}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {siteConfig.whatsappNumber && (
                <Button
                  href={whatsAppUrl}
                  external
                  icon={MessageCircle}
                  size="lg"
                  variant="primary"
                  className="w-full sm:w-auto"
                >
                  Konsultasi via WhatsApp
                </Button>
              )}
              <Button
                href="/area-praktik"
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                Lihat Area Praktik
              </Button>
            </div>

            {/* Credibility Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-12 mt-12 border-t border-neutral-200 text-left">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-neutral-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm text-neutral-900">Lisensi Resmi</h4>
                  <p className="text-xs text-neutral-500">Terdaftar di PERADI</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-neutral-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm text-neutral-900">Kerahasiaan Terjamin</h4>
                  <p className="text-xs text-neutral-500">Menjunjung tinggi etika profesi</p>
                </div>
              </div>
              <div className="col-span-2 sm:col-span-1 flex items-start gap-3">
                <Briefcase className="w-5 h-5 text-neutral-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm text-neutral-900">Solutif & Strategis</h4>
                  <p className="text-xs text-neutral-500">Litigasi & non-litigasi</p>
                </div>
              </div>
            </div>
          </div>
        </Container>

        {/* Subtle Decorative Pattern */}
        <div className="absolute inset-0 -z-10 placeholder-pattern opacity-20 pointer-events-none" />
      </section>

      {/* ─── Area Praktik Section ─────────────────────────────────────────── */}
      {practiceAreas.length > 0 && (
        <Section background="alt">
          <Container>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  Layanan Hukum
                </span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mt-1">
                  Bidang Praktik Kami
                </h2>
              </div>
              <Link
                href="/area-praktik"
                className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-900 hover:text-neutral-600 transition-colors"
              >
                <span>Semua Area Praktik</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {practiceAreas.map((area) => (
                <Link
                  key={area.slug}
                  href={`/area-praktik/${area.slug}`}
                  className="group flex flex-col justify-between p-6 bg-white rounded-xl border border-neutral-200 hover:border-neutral-300 hover:shadow-md transition-all"
                >
                  <div>
                    <div className="w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center mb-5 group-hover:bg-neutral-900 group-hover:text-white transition-colors text-neutral-700">
                      <Scale className="w-6 h-6" />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-neutral-900 mb-2 group-hover:text-neutral-700 transition-colors">
                      {area.title}
                    </h3>
                    <p className="text-sm text-neutral-600 leading-relaxed line-clamp-3">
                      {area.summary}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center gap-1 text-xs font-semibold text-neutral-800 group-hover:translate-x-1 transition-transform">
                    <span>Pelajari Layanan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* ─── Pendekatan Kami ──────────────────────────────────────────────── */}
      {pageData?.approach && pageData.approach.length > 0 && (
        <Section>
          <Container>
            <div className="max-w-2xl mx-auto text-center mb-14">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Nilai Utama
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mt-1">
                Pendekatan Profesional Kami
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pageData.approach.map((item, index) => (
                <div
                  key={index}
                  className="p-8 rounded-xl border border-neutral-200 bg-neutral-50/50 hover:bg-white hover:shadow-md transition-all text-left"
                >
                  <div className="w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-sm mb-5">
                    0{index + 1}
                  </div>
                  <h3 className="font-heading text-xl font-bold text-neutral-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* ─── Profil Advokat Utama ─────────────────────────────────────────── */}
      {teamMembers.length > 0 && (
        <Section background="alt">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  Kepemimpinan
                </span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mt-1">
                  Advokat & Pendiri Kantor
                </h2>
              </div>

              {teamMembers.slice(0, 1).map((member) => (
                <div
                  key={member.slug}
                  className="bg-white rounded-2xl border border-neutral-200 p-8 md:p-10 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
                >
                  {/* Portrait Placeholder with SVG Pattern */}
                  <div className="md:col-span-5">
                    <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-neutral-200 placeholder-pattern flex flex-col items-center justify-center p-6 text-center">
                      <div className="w-24 h-24 rounded-full bg-white shadow-md flex items-center justify-center mb-4">
                        <Users className="w-12 h-12 text-neutral-400" />
                      </div>
                      <span className="text-xs uppercase tracking-wider font-semibold text-neutral-500">
                        Asset Foto Placeholder
                      </span>
                    </div>
                  </div>

                  {/* Bio Info */}
                  <div className="md:col-span-7">
                    <div className="inline-block px-3 py-1 bg-neutral-100 rounded-full text-xs font-medium text-neutral-800 mb-3">
                      {member.title}
                    </div>
                    <h3 className="font-heading text-2xl sm:text-3xl font-bold text-neutral-900 mb-4">
                      {member.name}
                    </h3>
                    <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                      {member.bio}
                    </p>

                    {/* Expertise Pills */}
                    {member.expertise && member.expertise.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                          Keahlian Utama:
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {member.expertise.map((skill, idx) => (
                            <span
                              key={idx}
                              className="text-xs px-2.5 py-1 bg-neutral-100 text-neutral-700 rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <Link
                      href={`/tim/${member.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 hover:text-neutral-600 transition-colors"
                    >
                      <span>Lihat Profil & Riwayat Lengkap</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* ─── Tahapan Kerja (How It Works) ─────────────────────────────────── */}
      {pageData?.howItWorks && pageData.howItWorks.length > 0 && (
        <Section>
          <Container>
            <div className="max-w-2xl mx-auto text-center mb-14">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Alur Penanganan
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mt-1">
                Tahapan Konsultasi Hukum
              </h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              {pageData.howItWorks.map((step) => (
                <div
                  key={step.step}
                  className="flex gap-5 items-start p-6 rounded-xl border border-neutral-200 bg-white hover:border-neutral-300 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-sm shrink-0">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-neutral-900 mb-1">
                      {step.title}
                    </h3>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* ─── CTA Penutup ──────────────────────────────────────────────────── */}
      <section className="bg-neutral-900 text-white py-16 md:py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              {pageData?.ctaHeading || "Butuh Konsultasi Hukum Segera?"}
            </h2>
            <p className="text-neutral-300 text-base md:text-lg mb-8 max-w-xl mx-auto">
              Hubungi kami untuk mengatur jadwal konsultasi langsung di kantor atau melalui WhatsApp resmi kantor kami.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {siteConfig.whatsappNumber && (
                <Button
                  href={whatsAppUrl}
                  external
                  variant="white"
                  icon={MessageCircle}
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Konsultasi via WhatsApp
                </Button>
              )}
              {siteConfig.phone && (
                <Button
                  href={`tel:${siteConfig.phone}`}
                  variant="outline"
                  icon={Phone}
                  size="lg"
                  className="w-full sm:w-auto border-neutral-700 text-white hover:bg-neutral-800"
                >
                  {siteConfig.phone}
                </Button>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
