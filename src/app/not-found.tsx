import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <Section>
      <Container>
        <div className="max-w-lg mx-auto text-center py-16">
          <h1 className="font-heading text-6xl md:text-8xl font-bold text-neutral-200 mb-4">
            404
          </h1>
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-text-primary mb-4">
            Halaman Tidak Ditemukan
          </h2>
          <p className="text-text-secondary mb-8">
            Halaman yang Anda cari tidak tersedia atau telah dipindahkan.
          </p>
          <Button href="/" icon={ArrowLeft} variant="primary">
            Kembali ke Beranda
          </Button>
        </div>
      </Container>
    </Section>
  );
}
