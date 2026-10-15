import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

interface SlotOutlineProps {
  label: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Dev-only slot outline component.
 * Shows a dashed border with a label when NEXT_PUBLIC_SHOW_SLOTS=true.
 * Not rendered in production builds.
 */
export function SlotOutline({ label, className = "", children }: SlotOutlineProps) {
  const showSlots = process.env.NEXT_PUBLIC_SHOW_SLOTS === "true";

  if (!showSlots) return null;

  return (
    <div className={`slot-outline ${className}`}>
      {children || <span className="slot-outline__label">SLOT: {label}</span>}
    </div>
  );
}

interface SlotSectionProps {
  label: string;
  background?: "default" | "alt" | "dark";
  className?: string;
}

/**
 * Dev-only slot section component.
 * Wraps Section + Container + SlotOutline, only rendered when NEXT_PUBLIC_SHOW_SLOTS=true.
 */
export function SlotSection({
  label,
  background = "default",
  className = "",
}: SlotSectionProps) {
  const showSlots = process.env.NEXT_PUBLIC_SHOW_SLOTS === "true";

  if (!showSlots) return null;

  return (
    <Section background={background}>
      <Container>
        <SlotOutline label={label} className={className} />
      </Container>
    </Section>
  );
}
