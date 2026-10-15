import type { MetadataRoute } from "next";
import { getTeamSlugs, getPracticeAreaSlugs } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  if (!baseUrl) {
    // If no domain configured, return empty sitemap per PRD
    return [];
  }

  const routes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tentang/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kontak/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Team routes: only include if team members exist
  const teamSlugs = getTeamSlugs();
  if (teamSlugs.length > 0) {
    routes.push({
      url: `${baseUrl}/tim/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
    for (const slug of teamSlugs) {
      routes.push({
        url: `${baseUrl}/tim/${slug}/`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  // Practice area routes: only include if practice areas exist
  const practiceAreaSlugs = getPracticeAreaSlugs();
  if (practiceAreaSlugs.length > 0) {
    routes.push({
      url: `${baseUrl}/area-praktik/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
    for (const slug of practiceAreaSlugs) {
      routes.push({
        url: `${baseUrl}/area-praktik/${slug}/`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return routes;
}
