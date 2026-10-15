import type { Metadata } from "next";
import { siteConfig } from "../../site.config";

interface MetadataOptions {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
}

export function constructMetadata({
  title,
  description,
  path = "",
  noIndex = false,
}: MetadataOptions = {}): Metadata {
  const siteName = siteConfig.name || "Kantor Hukum";
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const metaDescription = description || siteConfig.tagline || undefined;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const canonical = baseUrl ? `${baseUrl}${path}` : undefined;

  return {
    title: fullTitle,
    description: metaDescription,
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      title: fullTitle,
      description: metaDescription,
      url: canonical,
      siteName: siteName,
      locale: "id_ID",
      type: "website",
      images: [
        {
          url: "/logo.jpeg",
          width: 800,
          height: 800,
          alt: siteName,
        },
      ],
    },
    twitter: {
      card: "summary",
      title: fullTitle,
      description: metaDescription,
      images: ["/logo.jpeg"],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

// ─── JSON-LD Generators (Data-driven, only when minimum fields exist) ────────

export function generateLegalServiceJsonLd() {
  if (!siteConfig.name) return null;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "";

  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: siteConfig.name,
    ...(siteConfig.shortName && { alternateName: siteConfig.shortName }),
    ...(baseUrl && { url: baseUrl, image: `${baseUrl}/logo.jpeg` }),
    ...(siteConfig.phone && { telephone: siteConfig.phone }),
    ...(siteConfig.email && { email: siteConfig.email }),
    ...(siteConfig.address && {
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.address,
        addressCountry: "ID",
      },
    }),
    ...(siteConfig.openingHours?.days && {
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: siteConfig.openingHours.days,
          ...(siteConfig.openingHours.hours && {
            opens: siteConfig.openingHours.hours.split("-")[0]?.trim(),
            closes: siteConfig.openingHours.hours.split("-")[1]?.trim(),
          }),
        },
      ],
    }),
  };
}

export function generatePersonJsonLd(member: {
  name: string;
  title: string;
  bio?: string;
  photo?: string;
}) {
  if (!member.name) return null;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "";

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: member.name,
    jobTitle: member.title,
    ...(member.bio && { description: member.bio }),
    ...(member.photo && {
      image: member.photo.startsWith("http")
        ? member.photo
        : baseUrl
        ? `${baseUrl}${member.photo}`
        : member.photo,
    }),
    worksFor: siteConfig.name
      ? {
          "@type": "LegalService",
          name: siteConfig.name,
        }
      : undefined,
  };
}

export function generateBreadcrumbJsonLd(
  items: { name: string; item?: string }[]
) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "";

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      ...(crumb.item && {
        item: crumb.item.startsWith("http")
          ? crumb.item
          : `${baseUrl}${crumb.item}`,
      }),
    })),
  };
}
