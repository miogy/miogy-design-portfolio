import fs from "node:fs/promises";
import path from "node:path";

// getWorks()가 반환하는 Work[]를 WorkGrid에서 요구하는 WorkItem[]로 변환
import type { WorkItem, WorkCategory } from "@/lib/types";

export type Work = {
  id?: string;
  slug?: string;
  title?: string;
  description?: string;
  year?: number | string;
  category?: string; // "inhouse" | "promotion" | "artistIP" | "trade" | "archive" ...
  thumbnail?: string; // ex) "/img/2025/xxx.png"
  cover?: string;
  featured?: boolean;
  hero?: boolean;
  heroRank?: number;
};

export type HeroItem = {
  key: string;
  href: string;
  title: string;
  description: string;
  imageSrc?: string | null;
};

async function fileExists(p: string) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function resolveWorksJsonPath() {
  const cwd = process.cwd();
  const candidates = [
    path.join(cwd, "data-modules", "works.json"),
    path.join(cwd, "data-modules", "data-modules", "works.json"), // 현재 로그상 이 케이스
    path.join(cwd, "data-modules", "content", "works.json"),
    path.join(cwd, "data-modules", "data", "works.json"),
  ];

  for (const p of candidates) {
    if (await fileExists(p)) return p;
  }

  throw new Error(
    `works.json not found. Tried:\n${candidates.map((c) => `- ${c}`).join("\n")}`
  );
}

export async function getWorks(): Promise<Work[]> {
  const worksPath = await resolveWorksJsonPath();
  const raw = await fs.readFile(worksPath, "utf-8");
  const json = JSON.parse(raw);

  // works.json 형태가 { works: [...] } / [...] 둘 다 대응
  const list: Work[] = Array.isArray(json)
    ? json
    : Array.isArray(json?.works)
      ? json.works
      : [];

  return list;
}

/** ✅ 상세페이지용: slug로 1개 찾기 */
export async function getWorkBySlug(slug: string): Promise<Work | null> {
  const works = await getWorks();
  return works.find((w) => String(w.slug || w.id || "") === slug) ?? null;
}

function normalizeCategory(c?: string) {
  const v = (c || "").toLowerCase();
  if (v.includes("in") || v.includes("house")) return "inhouse";
  if (v.includes("promo") || v.includes("key")) return "promotion";
  if (v.includes("ip") || v.includes("artist")) return "artistIP";
  if (v.includes("trade")) return "trade";
  if (v.includes("arch")) return "archive";
  return v || "etc";
}

function toNumberYear(y: Work["year"]) {
  const n =
    typeof y === "number" ? y : Number(String(y || "").replace(/[^\d]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

function pickOnePerCategory(works: Work[], category: string) {
  const filtered = works.filter((w) => normalizeCategory(w.category) === category);

  // 1) featured/hero/heroRank 우선
  const featured = filtered
    .slice()
    .sort((a, b) => (a.heroRank ?? 999) - (b.heroRank ?? 999))
    .find((w) => w.featured || w.hero || typeof w.heroRank === "number");

  if (featured) return featured;

  // 2) 없으면 최신연도 우선
  return filtered.slice().sort((a, b) => toNumberYear(b.year) - toNumberYear(a.year))[0];
}

export function buildHeroItemsFromWorks(works: Work[]): HeroItem[] {
  const order = ["inhouse", "promotion", "artistIP"]; // 홈 hero에 보여줄 3개 카테고리
  const picked = order
    .map((cat) => pickOnePerCategory(works, cat))
    .filter(Boolean) as Work[];

  // fallback: 데이터가 부족하면 그냥 상위 3개
  const final = picked.length ? picked : works.slice(0, 3);

  return final.map((w, idx) => {
    const slug = w.slug || w.id || `work-${idx}`;
    const href = `/work/${slug}`;
    const imageSrc = w.cover || w.thumbnail || null;

    return {
      key: String(
        w.id || w.slug || `${normalizeCategory(w.category)}-${toNumberYear(w.year)}-${idx}`
      ),
      href,
      title:
        w.title ||
        (normalizeCategory(w.category) === "inhouse"
          ? "In-house / Textile Design"
          : normalizeCategory(w.category) === "promotion"
            ? "Promotion / Key Visual"
            : "Artist IP / Graphic System"),
      description: w.description || "Coming soon.",
      imageSrc,
    };
  });
}

function toWorkCategory(c?: string): WorkCategory {
  const cat = normalizeCategory(c); // "inhouse" | "promotion" | "artistIP" | "trade" | "archive" | ...
  if (cat === "inhouse") return "in-house";
  if (cat === "promotion") return "promotion";
  if (cat === "artistIP") return "artist-ip";
  if (cat === "trade") return "trade";
  if (cat === "archive") return "archive";
  return "archive"; // ✅ types.ts에 없는 값(etc 등)은 안전하게 archive로 폴백
}

export function toWorkItem(w: Work, idx = 0): WorkItem {
  const slug =
    (w.slug && String(w.slug).trim()) ||
    (w.id && String(w.id).trim()) ||
    `work-${idx}`;

  return {
    slug,
    title: w.title ? String(w.title) : "Untitled",
    year: toNumberYear(w.year) || new Date().getFullYear(),
    category: toWorkCategory(w.category),
    summary: w.description ? String(w.description) : "",
    thumb: w.thumbnail || w.cover || undefined,
  };
}

export function toWorkItems(works: Work[]): WorkItem[] {
  return works.map((w, i) => toWorkItem(w, i));
}
