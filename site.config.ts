import { z } from "zod/v4";

// ─── Zod Schemas ──────────────────────────────────────────────────────────────

export const SocialLinksSchema = z.object({
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  twitter: z.string().optional(),
  linkedin: z.string().optional(),
  youtube: z.string().optional(),
  tiktok: z.string().optional(),
});

export const LegalSchema = z.object({
  privacyPublished: z.boolean().default(false),
  disclaimerPublished: z.boolean().default(false),
  credentials: z.array(z.string()).default([]),
});

export const OpeningHoursSchema = z.object({
  days: z.string().optional(),
  hours: z.string().optional(),
});

export const NavItemSchema = z.object({
  label: z.string(),
  href: z.string(),
});

export const FeaturesSchema = z.object({
  analytics: z.boolean().default(false),
  formEndpoint: z.boolean().default(false),
});

export const SiteConfigSchema = z.object({
  name: z.string().default(""),
  shortName: z.string().default(""),
  tagline: z.string().default(""),
  address: z.string().default(""),
  mapsEmbedUrl: z.string().default(""),
  mapsLink: z.string().default(""),
  phone: z.string().default(""),
  whatsappNumber: z.string().default(""),
  whatsappDefaultMessage: z.string().default(""),
  email: z.string().default(""),
  openingHours: OpeningHoursSchema.optional(),
  social: SocialLinksSchema.optional(),
  legal: LegalSchema.optional(),
  nav: z.array(NavItemSchema).default([
    { label: "Beranda", href: "/" },
    { label: "Tentang", href: "/tentang" },
    { label: "Tim", href: "/tim" },
    { label: "Area Praktik", href: "/area-praktik" },
    { label: "Kontak", href: "/kontak" },
  ]),
  features: FeaturesSchema.optional(),
});

export type SiteConfig = z.infer<typeof SiteConfigSchema>;
export type SocialLinks = z.infer<typeof SocialLinksSchema>;
export type NavItem = z.infer<typeof NavItemSchema>;

// ─── Default Site Configuration ───────────────────────────────────────────────

export const siteConfig: SiteConfig = SiteConfigSchema.parse({
  name: "Kantor Hukum Sugiyono, SE., SH., MH & Rekan",
  shortName: "Kantor Hukum Sugiyono",
  tagline: "Advokat & Konsultan Hukum Profesional di Semarang",
  address: "Semarang, Jawa Tengah",
  mapsEmbedUrl: "",
  mapsLink: "",
  phone: "024-845-xxxx",
  whatsappNumber: "6281234567890",
  whatsappDefaultMessage: "Halo Kantor Hukum Sugiyono, saya ingin berkonsultasi mengenai permasalahan hukum.",
  email: "kontak@kantorhukumsugiyono.com",
  openingHours: {
    days: "Senin - Jumat",
    hours: "09:00 - 17:00 WIB",
  },
  social: {
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
  },
  legal: {
    privacyPublished: false,
    disclaimerPublished: false,
    credentials: ["PERADI"],
  },
  nav: [
    { label: "Beranda", href: "/" },
    { label: "Tentang", href: "/tentang" },
    { label: "Tim", href: "/tim" },
    { label: "Area Praktik", href: "/area-praktik" },
    { label: "Kontak", href: "/kontak" },
  ],
  features: {
    analytics: false,
    formEndpoint: false,
  },
});
