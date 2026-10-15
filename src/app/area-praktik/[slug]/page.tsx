import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Accordion } from "@/components/ui/Accordion";
import { getPracticeAreaBySlug, getPracticeAreaSlugs } from "@/lib/content";
import { siteConfig } from "../../../../site.config";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getPracticeAreaSlugs();
  if (slugs.length === 0) {
    return [{ slug: "_none" }];
  }
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const area = getPracticeAreaBySlug(slug);
  if (!area) return { title: "Tidak Ditemukan" };
  return { title: `${area.title} | Kantor Hukum Sugiyono` };
}

export default async function AreaPraktikDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const area = getPracticeAreaBySlug(slug);

  if (!area) {
    notFound();
  }

  const hasWhatsApp = !!siteConfig.whatsappNumber;
  const whatsAppUrl = hasWhatsApp
    ? buildWhatsAppUrl(
        siteConfig.whatsappNumber,
        `Halo Kantor Hukum Sugiyono, saya ingin berkonsultasi mengenai ${area.title}.`
      )
    : "";

  return (
    <Section>
      <Container>
        <Breadcrumb
          items={[
            { label: "Area Praktik", href: "/area-praktik" },
            { label: area.title },
          ]}
        />

        <div className="max-w-4xl mx-auto pt-4 pb-12">
          {/* Header */}
          <div className="mb-10 pb-8 border-b border-neutral-200">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Spesialisasi Hukum
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-neutral-900 mt-2 mb-4">
              {area.title}
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 leading-relaxed">
              {area.summary}
            </p>
          </div>

          {/* Description */}
          {area.description && (
            <div className="mb-12">
              <h2 className="font-heading text-2xl font-bold text-neutral-900 mb-4">
                Uraian Layanan
              </h2>
              <p className="text-neutral-700 leading-relaxed text-base sm:text-lg">
                {area.description}
              </p>
            </div>
          )}

          {/* Services Checklist */}
          {area.services && area.services.length > 0 && (
            <div className="mb-12 p-8 rounded-2xl bg-neutral-50 border border-neutral-200">
              <h2 className="font-heading text-xl font-bold text-neutral-900 mb-6">
                Cakupan Layanan Advokasi
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {area.services.map((service, i) => (
                  <li key={i} className="flex items-start gap-3 text-neutral-800 text-sm font-medium">
                    <CheckCircle2 className="w-5 h-5 text-neutral-700 mt-0.5 shrink-0" />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Process Steps */}
          {area.process && area.process.length > 0 && (
            <div className="mb-12">
              <h2 className="font-heading text-2xl font-bold text-neutral-900 mb-6">
                Tahapan Penanganan Kasus
              </h2>
              <div className="space-y-4">
                {area.process.map((step) => (
                  <div
                    key={step.step}
                    className="flex gap-4 items-start p-6 rounded-xl border border-neutral-200 bg-white"
                  >
                    <div className="w-9 h-9 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-sm shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-neutral-900 text-base">
                        {step.title}
                      </h3>
                      {step.description && (
                        <p className="text-sm text-neutral-600 mt-1 leading-relaxed">
                          {step.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQs Accordion */}
          {area.faqs && area.faqs.length > 0 && (
            <div className="mb-12">
              <h2 className="font-heading text-2xl font-bold text-neutral-900 mb-6">
                Pertanyaan yang Sering Diajukan (FAQ)
              </h2>
              <Accordion
                items={area.faqs.map((f) => ({
                  question: f.question,
                  answer: f.answer,
                }))}
              />
            </div>
          )}

          {/* Consultation CTA Card */}
          {hasWhatsApp && (
            <div className="p-8 sm:p-10 rounded-2xl bg-neutral-900 text-white text-center">
              <h3 className="font-heading text-2xl font-bold mb-2">
                Konsultasikan Perkara {area.title}
              </h3>
              <p className="text-neutral-300 text-sm sm:text-base mb-6 max-w-xl mx-auto">
                Tim advokat kami siap menganalisis dokumen dan memberikan arahan hukum terbaik untuk Anda.
              </p>
              <Button
                href={whatsAppUrl}
                external
                variant="white"
                icon={MessageCircle}
                size="lg"
              >
                Konsultasi Sekarang
              </Button>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
