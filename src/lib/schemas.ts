import { z } from "zod/v4";

// ─── Team Member Schema ───────────────────────────────────────────────────────

export const TeamMemberSchema = z.object({
  slug: z.string(),
  name: z.string(),
  title: z.string(),
  photo: z.string().optional(),
  bio: z.string().optional(),
  education: z.array(z.string()).optional(),
  experience: z.array(z.string()).optional(),
  expertise: z.array(z.string()).optional(),
  credentials: z.array(z.string()).optional(),
  order: z.number().default(0),
});

export type TeamMember = z.infer<typeof TeamMemberSchema>;

// ─── Practice Area Schema ─────────────────────────────────────────────────────

export const PracticeAreaFAQSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

export const PracticeAreaProcessSchema = z.object({
  step: z.number(),
  title: z.string(),
  description: z.string().optional(),
});

export const PracticeAreaSchema = z.object({
  slug: z.string(),
  title: z.string(),
  summary: z.string(),
  icon: z.string().optional(),
  description: z.string().optional(),
  services: z.array(z.string()).optional(),
  process: z.array(PracticeAreaProcessSchema).optional(),
  faqs: z.array(PracticeAreaFAQSchema).optional(),
  order: z.number().default(0),
});

export type PracticeArea = z.infer<typeof PracticeAreaSchema>;
export type PracticeAreaFAQ = z.infer<typeof PracticeAreaFAQSchema>;

// ─── Page Section Schemas ─────────────────────────────────────────────────────

export const HeroSectionSchema = z.object({
  heading: z.string().optional(),
  subheading: z.string().optional(),
  ctaText: z.string().optional(),
  ctaHref: z.string().optional(),
  backgroundImage: z.string().optional(),
});

export const ApproachItemSchema = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.string().optional(),
});

export const HowItWorksStepSchema = z.object({
  step: z.number(),
  title: z.string(),
  description: z.string(),
});

export const HomePageSchema = z.object({
  hero: HeroSectionSchema.optional(),
  approach: z.array(ApproachItemSchema).optional(),
  howItWorks: z.array(HowItWorksStepSchema).optional(),
  ctaHeading: z.string().optional(),
  ctaText: z.string().optional(),
});

export type HomePage = z.infer<typeof HomePageSchema>;

export const AboutSectionSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
});

export const AboutPageSchema = z.object({
  profile: AboutSectionSchema.optional(),
  vision: AboutSectionSchema.optional(),
  mission: AboutSectionSchema.optional(),
  values: z.array(z.object({
    title: z.string(),
    description: z.string(),
  })).optional(),
  legality: AboutSectionSchema.optional(),
  relatedUnits: z.array(z.object({
    name: z.string(),
    description: z.string().optional(),
    url: z.string().optional(),
  })).optional(),
});

export type AboutPage = z.infer<typeof AboutPageSchema>;
