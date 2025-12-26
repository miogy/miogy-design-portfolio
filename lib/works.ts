// 대표 아이템 출력
import fs from "node:fs";
import path from "node:path";

export type WorkCategory = "inhouse" | "promotion" | "artistIp" | "trade" | "archive";
export type HomeHeroKey = "inhouse" | "promotion" | "artistIp";

export type Work = {
  slug: string;
  title: string;
  description?: string;
  category: WorkCategory;
  year?: number;
  thumbnail?: string; // public 기준 URL 권장: "/img/xxx.png" or "/placeholder/hero-1.jpg"
  featured?: {
    homeHeroKey?: HomeHeroKey;
  };
};

export type HeroItem = {
  href: string;
  title: string;
  description: string;
  imageSrc?: string;
};

// 프로젝트에서 works.json의 실제 경로가 다르면 여기만 바꾸면 됨
// 예: "data-modules/content/works/works.json" or "data-modules/works.json"
const WORKS_JSON_RELATIVE_PATH =
  process.env.WORKS_JSON_PATH ?? "data-modules/content/works/works.json";

function resolveWorksJsonPath() {
  return path.join(process.cwd(), WORKS_JSON_RELATIVE_PATH);
}

export function loadWorks(): Work[] {
  const filePath = resolveWorksJsonPath();

  if (!fs.existsSync(filePath)) {
    // 파일이 없으면 빈 배열 반환 (빌드/런타임 크래시 방지)
    return [];
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const parsed = JSON.parse(raw);

  // works.json이 { works: [...] } 형태일 가능성도 커버
  const works: unknown = Array.isArray(parsed) ? parsed : parsed?.works;

  if (!Array.isArray(works)) return [];

  return works as Work[];
}

function heroLabelByKey(key: HomeHeroKey) {
  switch (key) {
    case "inhouse":
      return "In-house / Textile Design";
    case "promotion":
      return "Promotion / Key Visual";
    case "artistIp":
      return "Artist IP / Graphic System";
  }
}

function pickFirstByHeroKey(works: Work[], key: HomeHeroKey): Work | undefined {
  return works.find((w) => w.featured?.homeHeroKey === key);
}

export function getHomeHeroItems(works: Work[]): HeroItem[] {
  const keys: HomeHeroKey[] = ["inhouse", "promotion", "artistIp"];

  const picked = keys.map((key) => {
    const w = pickFirstByHeroKey(works, key);
    if (!w) {
      // fallback (데이터 아직 없을 때도 UI 유지)
      return {
        href: "/work",
        title: heroLabelByKey(key),
        description: "Coming soon.",
        imageSrc: "/placeholder/hero-1.jpg",
      } satisfies HeroItem;
    }

    return {
      href: `/work/${w.slug}`,
      title: heroLabelByKey(key),
      description: w.description ?? w.title,
      imageSrc: w.thumbnail,
    } satisfies HeroItem;
  });

  return picked;
}
