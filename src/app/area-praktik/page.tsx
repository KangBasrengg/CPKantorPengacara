import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SlotOutline } from "@/components/dev/SlotOutline";
import { getPracticeAreas } from "@/lib/content";
import { Scale, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Bidang Praktik Hukum",
};

export default function AreaPraktikPage() {
  const areas = getPracticeAreas();
  const hasAreas = areas.length > 0;

  return (
    <Section>
      <Container>
        <Breadcrumb items={[{ label: "Area Praktik" }]} />

        <div className="mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Layanan Spesialisasi
          </span>
          <h1 className="font-heading text-4xl font-bold text-neutral-900 mt-2">
            Area Praktik & Layanan Hukum
          </h1>
          <p className="text-neutral-600 mt-2 max-w-2xl">
            Kami menangani beragam permasalahan hukum dengan keahlian mendalam dan strategi advokasi yang terukur.
          </p>
        </div>

        {hasAreas ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {areas.map((area) => (
              <Link
                key={area.slug}
                href={`/area-praktik/${area.slug}`}
                className="group flex flex-col justify-between p-8 rounded-2xl border border-neutral-200 bg-white hover:shadow-lg hover:border-neutral-300 transition-all"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-neutral-100 group-hover:bg-neutral-900 group-hover:text-white flex items-center justify-center mb-6 text-neutral-700 transition-colors">
                    <Scale className="w-6 h-6" />
                  </div>

                  <h2 className="font-heading text-xl font-bold text-neutral-900 group-hover:text-neutral-700 transition-colors mb-3">
                    {area.title}
                  </h2>
                  <p className="text-sm text-neutral-600 leading-relaxed line-clamp-3">
                    {area.summary}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-neutral-100 flex items-center gap-1.5 text-xs font-semibold text-neutral-800 group-hover:text-neutral-950 transition-colors">
                  <span>Pelajari Selengkapnya</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <SlotOutline label="Daftar Area Praktik" className="min-h-[200px]" />
        )}
      </Container>
    </Section>
  );
}
