import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SlotOutline } from "@/components/dev/SlotOutline";
import { getAboutPage } from "@/lib/content";
import { ShieldCheck, Award, Target, Compass } from "lucide-react";

export const metadata = {
  title: "Tentang Kami",
};

export default function TentangPage() {
  const pageData = getAboutPage();

  const hasProfile = !!pageData?.profile?.content;
  const hasVision = !!pageData?.vision?.content;
  const hasMission = !!pageData?.mission?.content;
  const hasValues = !!pageData?.values?.length;
  const hasLegality = !!pageData?.legality?.content;

  return (
    <Section>
      <Container>
        <Breadcrumb items={[{ label: "Tentang Kami" }]} />

        <div className="max-w-4xl mx-auto pt-4 pb-12">
          {/* Page Heading */}
          <div className="mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Profil Kantor
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-neutral-900 mt-2 tracking-tight">
              Tentang Kantor Hukum Sugiyono & Rekan
            </h1>
          </div>

          {/* Profile Overview */}
          {hasProfile ? (
            <div className="mb-14 p-8 sm:p-10 bg-neutral-50 rounded-2xl border border-neutral-200">
              <h2 className="font-heading text-2xl font-bold text-neutral-900 mb-4">
                {pageData!.profile!.title || "Dedikasi untuk Keadilan dan Kepastian Hukum"}
              </h2>
              <p className="text-neutral-700 leading-relaxed text-base sm:text-lg">
                {pageData!.profile!.content}
              </p>
            </div>
          ) : (
            <SlotOutline label="Profil" className="mb-8" />
          )}

          {/* Visi & Misi Grid */}
          {(hasVision || hasMission) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
              {hasVision && (
                <div className="p-8 rounded-2xl border border-neutral-200 bg-white shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-neutral-900 text-white flex items-center justify-center mb-5">
                    <Compass className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-neutral-900 mb-3">
                    {pageData!.vision!.title || "Visi"}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed text-sm">
                    {pageData!.vision!.content}
                  </p>
                </div>
              )}

              {hasMission && (
                <div className="p-8 rounded-2xl border border-neutral-200 bg-white shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-neutral-900 text-white flex items-center justify-center mb-5">
                    <Target className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-neutral-900 mb-3">
                    {pageData!.mission!.title || "Misi"}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed text-sm">
                    {pageData!.mission!.content}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Nilai-Nilai Utama */}
          {hasValues && (
            <div className="mb-14">
              <h2 className="font-heading text-2xl font-bold text-neutral-900 mb-8">
                Nilai-Nilai Fundamental
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {pageData!.values!.map((val, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-xl border border-neutral-200 bg-white hover:border-neutral-300 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <ShieldCheck className="w-5 h-5 text-neutral-800 shrink-0" />
                      <h4 className="font-heading font-bold text-neutral-900 text-base">
                        {val.title}
                      </h4>
                    </div>
                    <p className="text-sm text-neutral-600 leading-relaxed pl-8">
                      {val.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Legalitas & Keanggotaan */}
          {hasLegality && (
            <div className="p-8 rounded-2xl border border-neutral-200 bg-neutral-900 text-white flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-neutral-800 flex items-center justify-center shrink-0">
                <Award className="w-7 h-7 text-neutral-200" />
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold mb-1">
                  {pageData!.legality!.title || "Legalitas Resmi & Keanggotaan"}
                </h3>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {pageData!.legality!.content}
                </p>
              </div>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
