import Image from "next/image";
import Link from "next/link";
import { type LucideIcon } from "lucide-react";

interface CardProps {
  title: string;
  description?: string;
  image?: string;
  icon?: LucideIcon;
  href?: string;
  className?: string;
  children?: React.ReactNode;
}

export function Card({
  title,
  description,
  image,
  icon: Icon,
  href,
  className = "",
  children,
}: CardProps) {
  const cardContent = (
    <>
      {/* Image / Pattern Placeholder */}
      {image ? (
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-xl">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="placeholder-pattern aspect-[4/3] rounded-t-xl flex items-center justify-center border-b border-neutral-100">
          {Icon && <Icon className="w-12 h-12 text-neutral-400" />}
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        <h3 className="font-heading text-lg font-bold text-neutral-900 mb-2 group-hover:text-neutral-700 transition-colors">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-neutral-600 line-clamp-3 leading-relaxed">
            {description}
          </p>
        )}
        {children}
      </div>
    </>
  );

  const baseClasses = `
    group block rounded-xl border border-neutral-200 bg-white
    transition-all duration-200
    hover:shadow-md hover:border-neutral-300
    ${href ? "cursor-pointer" : ""}
    ${className}
  `.trim();

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {cardContent}
      </Link>
    );
  }

  return <div className={baseClasses}>{cardContent}</div>;
}
