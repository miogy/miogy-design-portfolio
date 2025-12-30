// lib/about.ts
import fs from "node:fs/promises";
import path from "node:path";
import { cache } from "react";

/** 링크 타입 */
export type AboutLink = { label: string; url: string };

export type ExperienceItem = {
  company: string;
  position: string;
  employmentType?: string;
  period?: { from?: string; to?: string };
  roleSummary?: string[]; // ✅ 내부에서는 배열로 통일
  responsibilities?: string[];
  achievements?: string[];
  reasonForLeaving?: string | null;
};

export type AboutData = {
  intro: {
    headline: string;
    summary: string;
    coreCompetency: string[];
    skills: string[];
    email?: string;
    links?: AboutLink[];
  };
  experience: ExperienceItem[];
};

async function fileExists(p: string) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function resolveAboutJsonPath() {
  const cwd = process.cwd();
  const candidates = [
    path.join(cwd, "data-modules", "about.json"),
    path.join(cwd, "data-modules", "data-modules", "about.json"),
    path.join(cwd, "data-modules", "content", "about.json"),
    path.join(cwd, "data-modules", "data", "about.json"),
  ];

  for (const p of candidates) {
    if (await fileExists(p)) return p;
  }

  throw new Error(
    `about.json not found. Tried:\n${candidates.map((c) => `- ${c}`).join("\n")}`
  );
}

function toArray(v?: string | string[]) {
  if (!v) return [];
  return Array.isArray(v) ? v : [v];
}

function cleanBullet(s: string) {
  return String(s ?? "").replace(/^\s*-\s*/, "").trim();
}

function cleanLinks(links?: AboutLink[]) {
  return (links ?? [])
    .map((l) => ({
      label: String(l?.label ?? "").trim(),
      url: String(l?.url ?? "").trim(),
    }))
    .filter((l) => l.label && l.url);
}

function normalizeExperience(exp: any[]): ExperienceItem[] {
  return (exp ?? []).map((e) => ({
    company: String(e?.company ?? "").trim(),
    position: String(e?.position ?? "").trim(),
    employmentType: e?.employmentType ? String(e.employmentType).trim() : undefined,
    period: e?.period
      ? { from: e.period.from ? String(e.period.from) : undefined, to: e.period.to ? String(e.period.to) : undefined }
      : undefined,
    roleSummary: toArray(e?.roleSummary).map(cleanBullet).filter(Boolean),
    responsibilities: (e?.responsibilities ?? []).map(cleanBullet).filter(Boolean),
    achievements: (e?.achievements ?? []).map(cleanBullet).filter(Boolean),
    reasonForLeaving: e?.reasonForLeaving ?? null,
  }));
}

/**
 * ✅ About 데이터 읽기 (서버에서만)
 * - Next.js App Router Server Component에서 사용 권장
 * - edge runtime에서는 fs 사용 불가 (About 페이지 runtime='edge' 지정하지 않기)
 */
export const getAbout = cache(async (): Promise<AboutData> => {
  const aboutPath = await resolveAboutJsonPath();
  const raw = await fs.readFile(aboutPath, "utf-8");
  const json = JSON.parse(raw);

  const intro = json?.intro ?? {};
  const experienceRaw = Array.isArray(json?.experience) ? json.experience : [];

  return {
    intro: {
      headline: String(intro?.headline ?? "").trim(),
      summary: String(intro?.summary ?? "").trim(),
      coreCompetency: (intro?.coreCompetency ?? []).map(cleanBullet).filter(Boolean),
      skills: (intro?.skills ?? []).map(cleanBullet).filter(Boolean),
      email: intro?.email ? String(intro.email).trim() : undefined,
      links: cleanLinks(intro?.links),
    },
    experience: normalizeExperience(experienceRaw),
  };
});

export function sortExperienceByFromDesc(exp: ExperienceItem[]) {
  return [...exp].sort((a, b) => (b.period?.from ?? "").localeCompare(a.period?.from ?? ""));
}
