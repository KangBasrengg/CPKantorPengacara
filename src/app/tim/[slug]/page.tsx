import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { getTeamMemberBySlug, getTeamSlugs } from "@/lib/content";
import { Users, GraduationCap, Briefcase, Award } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getTeamSlugs();
  if (slugs.length === 0) {
    return [{ slug: "_none" }];
  }
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const member = getTeamMemberBySlug(slug);
  if (!member) return { title: "Tidak Ditemukan" };
  return { title: `${member.name} | Kantor Hukum Sugiyono` };
}

export default async function TimDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const member = getTeamMemberBySlug(slug);

  if (!member) {
    notFound();
  }

  return (
    <Section>
      <Container>
        <Breadcrumb
          items={[
            { label: "Tim Advokat", href: "/tim" },
            { label: member.name },
          ]}
        />

        <div className="max-w-5xl mx-auto pt-4 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            {/* Left Column: Portrait Card */}
            <div className="md:col-span-5">
              <div className="rounded-2xl border border-neutral-200 overflow-hidden bg-white shadow-sm">
                {member.photo ? (
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                ) : (
                  <div className="placeholder-pattern aspect-[3/4] flex flex-col items-center justify-center p-8 text-center border-b border-neutral-100">
                    <div className="w-24 h-24 rounded-full bg-white shadow-md flex items-center justify-center mb-4">
                      <Users className="w-12 h-12 text-neutral-400" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                      Foto Placeholder
                    </span>
                  </div>
                )}

                <div className="p-6 text-center">
                  <h2 className="font-heading text-xl font-bold text-neutral-900">
                    {member.name}
                  </h2>
                  <p className="text-sm font-medium text-neutral-500 mt-1">
                    {member.title}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Bio & Credentials */}
            <div className="md:col-span-7 space-y-8">
              {/* Header Info */}
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  Profil Advokat
                </span>
                <h1 className="font-heading text-3xl sm:text-4xl font-bold text-neutral-900 mt-1 mb-2">
                  {member.name}
                </h1>
                <p className="text-base text-neutral-600 font-medium">{member.title}</p>
              </div>

              {/* Bio */}
              {member.bio && (
                <div className="p-6 rounded-xl bg-neutral-50 border border-neutral-200">
                  <p className="text-neutral-700 leading-relaxed text-sm sm:text-base">
                    {member.bio}
                  </p>
                </div>
              )}

              {/* Education */}
              {member.education && member.education.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <GraduationCap className="w-5 h-5 text-neutral-800" />
                    <h3 className="font-heading text-lg font-bold text-neutral-900">
                      Riwayat Pendidikan
                    </h3>
                  </div>
                  <ul className="space-y-2.5">
                    {member.education.map((edu, i) => (
                      <li
                        key={i}
                        className="text-sm text-neutral-700 flex items-start gap-3 p-3 rounded-lg border border-neutral-200 bg-white"
                      >
                        <span className="w-2 h-2 rounded-full bg-neutral-900 mt-1.5 shrink-0" />
                        <span>{edu}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Experience */}
              {member.experience && member.experience.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Briefcase className="w-5 h-5 text-neutral-800" />
                    <h3 className="font-heading text-lg font-bold text-neutral-900">
                      Pengalaman Profesional
                    </h3>
                  </div>
                  <ul className="space-y-2.5">
                    {member.experience.map((exp, i) => (
                      <li
                        key={i}
                        className="text-sm text-neutral-700 flex items-start gap-3 p-3 rounded-lg border border-neutral-200 bg-white"
                      >
                        <span className="w-2 h-2 rounded-full bg-neutral-900 mt-1.5 shrink-0" />
                        <span>{exp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Expertise Tags */}
              {member.expertise && member.expertise.length > 0 && (
                <div>
                  <h3 className="font-heading text-lg font-bold text-neutral-900 mb-3">
                    Bidang Keahlian
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {member.expertise.map((skill, i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-1.5 bg-neutral-100 text-neutral-800 rounded-full font-medium border border-neutral-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Credentials / Organisasi */}
              {member.credentials && member.credentials.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Award className="w-5 h-5 text-neutral-800" />
                    <h3 className="font-heading text-lg font-bold text-neutral-900">
                      Keanggotaan & Lisensi
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {member.credentials.map((cred, i) => (
                      <span
                        key={i}
                        className="text-xs px-3.5 py-1.5 bg-neutral-900 text-white rounded-full font-medium"
                      >
                        {cred}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
