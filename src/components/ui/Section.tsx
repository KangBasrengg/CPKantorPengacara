interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  background?: "default" | "alt" | "dark";
}

const bgClasses = {
  default: "bg-white",
  alt: "bg-neutral-50 border-y border-neutral-200/80",
  dark: "bg-neutral-900 text-white",
};

export function Section({
  children,
  className = "",
  id,
  background = "default",
}: SectionProps) {
  return (
    <section
      id={id}
      className={`py-16 md:py-24 ${bgClasses[background]} ${className}`}
    >
      {children}
    </section>
  );
}
