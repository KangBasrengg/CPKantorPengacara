import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SlotOutline } from "@/components/dev/SlotOutline";
import { getTeamMembers } from "@/lib/content";
import { Users, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Tim Advokat",
};

export default function TimPage() {
  const members = getTeamMembers();
  const hasMembers = members.length > 0;

  return (
    <Section>
      <Container>
        <Breadcrumb items={[{ label: "Tim Advokat" }]} />

        <div className="mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Profesional Hukum
          </span>
          <h1 className="font-heading text-4xl font-bold text-neutral-900 mt-2">
            Tim Advokat & Konsultan
          </h1>
          <p className="text-neutral-600 mt-2 max-w-2xl">
            Didukung oleh para praktisi hukum berpengalaman yang siap memberikan pendampingan hukum berintegritas dan terpercaya.
          </p>
        </div>

        {hasMembers ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {members.map((member) => (
              <Link
                key={member.slug}
                href={`/tim/${member.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white hover:shadow-lg hover:border-neutral-300 transition-all overflow-hidden"
              >
                <div>
                  {/* Photo or SVG Pattern Placeholder */}
                  {member.photo ? (
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={member.photo}
                        alt={member.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="placeholder-pattern aspect-[3/4] flex flex-col items-center justify-center p-6 text-center border-b border-neutral-100">
                      <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center mb-3">
                        <Users className="w-10 h-10 text-neutral-400" />
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                        Foto Placeholder
                      </span>
                    </div>
                  )}

                  {/* Info */}
                  <div className="p-6">
                    <span className="text-xs font-medium text-neutral-500 uppercase tracking-wide">
                      {member.title}
                    </span>
                    <h2 className="font-heading text-xl font-bold text-neutral-900 group-hover:text-neutral-700 transition-colors mt-1 mb-2">
                      {member.name}
                    </h2>
                    {member.bio && (
                      <p className="text-sm text-neutral-600 line-clamp-2 leading-relaxed">
                        {member.bio}
                      </p>
                    )}

                    {member.expertise && member.expertise.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {member.expertise.slice(0, 3).map((skill, i) => (
                          <span
                            key={i}
                            className="text-xs px-2.5 py-1 bg-neutral-100 text-neutral-700 rounded-full font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold text-neutral-800 group-hover:bg-neutral-100 transition-colors">
                  <span>Lihat Profil Lengkap</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <SlotOutline label="Daftar Tim" className="min-h-[200px]" />
        )}
      </Container>
    </Section>
  );
}
