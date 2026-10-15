import fs from "fs";
import path from "path";
import {
  TeamMemberSchema,
  PracticeAreaSchema,
  HomePageSchema,
  AboutPageSchema,
  type TeamMember,
  type PracticeArea,
  type HomePage,
  type AboutPage,
} from "./schemas";

const CONTENT_DIR = path.join(process.cwd(), "content");

// ─── Generic JSON Loader ──────────────────────────────────────────────────────

function loadJsonFiles<T>(
  dir: string,
  schema: { parse: (data: unknown) => T }
): T[] {
  const fullPath = path.join(CONTENT_DIR, dir);
  if (!fs.existsSync(fullPath)) return [];

  const files = fs
    .readdirSync(fullPath)
    .filter((f) => f.endsWith(".json"));

  return files
    .map((file) => {
      try {
        const raw = fs.readFileSync(path.join(fullPath, file), "utf-8");
        return schema.parse(JSON.parse(raw));
      } catch {
        console.warn(`[content] Failed to parse ${dir}/${file}`);
        return null;
      }
    })
    .filter((item): item is T => item !== null);
}

function loadSingleJson<T>(
  filePath: string,
  schema: { parse: (data: unknown) => T }
): T | null {
  const fullPath = path.join(CONTENT_DIR, filePath);
  if (!fs.existsSync(fullPath)) return null;

  try {
    const raw = fs.readFileSync(fullPath, "utf-8");
    return schema.parse(JSON.parse(raw));
  } catch {
    console.warn(`[content] Failed to parse ${filePath}`);
    return null;
  }
}

// ─── Team Members ─────────────────────────────────────────────────────────────

export function getTeamMembers(): TeamMember[] {
  return loadJsonFiles<TeamMember>("team", TeamMemberSchema)
    .sort((a, b) => a.order - b.order);
}

export function getTeamMemberBySlug(slug: string): TeamMember | null {
  const members = getTeamMembers();
  return members.find((m) => m.slug === slug) ?? null;
}

export function getTeamSlugs(): string[] {
  return getTeamMembers().map((m) => m.slug);
}

// ─── Practice Areas ───────────────────────────────────────────────────────────

export function getPracticeAreas(): PracticeArea[] {
  return loadJsonFiles<PracticeArea>("practice-areas", PracticeAreaSchema)
    .sort((a, b) => a.order - b.order);
}

export function getPracticeAreaBySlug(slug: string): PracticeArea | null {
  const areas = getPracticeAreas();
  return areas.find((a) => a.slug === slug) ?? null;
}

export function getPracticeAreaSlugs(): string[] {
  return getPracticeAreas().map((a) => a.slug);
}

// ─── Pages ────────────────────────────────────────────────────────────────────

export function getHomePage(): HomePage | null {
  return loadSingleJson<HomePage>("pages/home.json", HomePageSchema);
}

export function getAboutPage(): AboutPage | null {
  return loadSingleJson<AboutPage>("pages/about.json", AboutPageSchema);
}
