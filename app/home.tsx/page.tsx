// app/(site)/home.tsx

import Link from "next/link";
import Image from "next/image";

// TODO: 다음 단계에서 실제 submodule JSON 로더로 교체하세요.
// 예: import { getWorks, getHomeIntro } from "@/lib/content";
type WorkCategory = "in-house" | "artist-ip" | "promotion" | "trade" | "archive";

type WorkItem = {
  slug: string;
  title: string;
  year: number;
  category: WorkCategory;
  thumb?: string; // public 기준 경로 (예: "/data/img/works/2025/project/thumb.png")
  summary?: string;
  isRepresentative?: boolean;
};

const CATEGORY_ORDER: WorkCategory[] = ["in-house", "artist-ip", "promotion", "trade"];

const CATEGORY_LABEL: Record<WorkCategory, string> = {
  "in-house": "In-house",
  "artist-ip": "Artist IP",
  promotion: "Promotion",
  trade: "Trade",
  archive: "Archive",
};

function pickRepresentativeByCategory(works: WorkItem[], category: WorkCategory) {
  const byCat = works.filter((w) => w.category === category);
  if (!byCat.length) return null;
  return byCat.find((w) => w.isRepresentative) ?? byCat[0];
}

// 임시 더미 데이터
async function getWorksMock(): Promise<WorkItem[]> {
  return [
    {
      slug: "le-studio-ss25-boho-print",
      title: "LE STUDIO SS25 Boho Print",
      year: 2025,
      category: "in-house",
      thumb: "/placeholder/hero-1.jpg",
      summary: "SS25 무드 기반 프린트 기획 및 적용",
      isRepresentative: true,
    },
    {
      slug: "sunny-jade-ip-series-01",
      title: "Sunny & Jade IP Series 01",
      year: 2025,
      category: "artist-ip",
      thumb: "/placeholder/hero-2.jpg",
      summary: "캐릭터 기반 그래픽/굿즈 시리즈",
      isRepresentative: true,
    },
    {
      slug: "fabric-promo-fw25",
      title: "Fabric Promo FW25",
      year: 2024,
      category: "promotion",
      thumb: "/placeholder/hero-3.jpg",
      summary: "프로모션 룩/비주얼 가이드",
      isRepresentative: true,
    },
    {
      slug: "trade-textile-collection-2024",
      title: "Trade Textile Collection 2024",
      year: 2024,
      category: "trade",
      thumb: "/placeholder/hero-4.jpg",
      summary: "거래처 제안용 컬렉션/프린트 셀렉션",
      isRepresentative: true,
    },
  ];
}

export default async function Home() {
  // TODO: submodule 데이터로 교체
  const works = await getWorksMock();

  const heroItems = CATEGORY_ORDER.map((cat) => pickRepresentativeByCategory(works, cat)).filter(
    Boolean
  ) as WorkItem[];

  return (
    <main className="min-h-screen bg-white text-[#444]">
      {/* HERO */}
      <section className="mx-auto w-full max-w-6xl px-5 pt-10">
        <div className="flex items-end justify-between gap-6 border-b border-[#e5e5e5] pb-5">
          <div>
            <p className="text-xs tracking-widest text-[#444]/70">MIOGY STUDIO PORTFOLIO</p>
            <h1 className="mt-2 text-2xl font-semibold leading-tight text-[#444]">
              Selected Works
              <span className="ml-2 text-[#444]/60">(by category)</span>
            </h1>
          </div>

          <Link
            href="/work"
            className="inline-flex items-center justify-center rounded-full border border-[#e5e5e5] bg-white px-4 py-2 text-sm text-[#444] hover:border-[#444]/40"
          >
            View all work
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {heroItems.map((item) => (
            <Link
              key={item.slug}
              href={`/work/${item.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-[#e5e5e5] bg-white"
            >
              <div className="relative aspect-[16/10] w-full bg-[#f7f7f7]">
                {item.thumb ? (
                  <Image
                    src={item.thumb}
                    alt={`${item.title} thumbnail`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                ) : null}

                {/* overlay info */}
                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full border border-[#e5e5e5] bg-white/90 px-3 py-1 text-xs">
                      {CATEGORY_LABEL[item.category]}
                    </span>
                    <span className="text-xs text-white/0">.</span>
                  </div>

                  <div className="mt-3 rounded-2xl border border-[#e5e5e5] bg-white/90 p-4 backdrop-blur">
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="text-base font-semibold leading-snug text-[#444]">
                        {item.title}
                      </h2>
                      <span className="text-xs text-[#444]/70">{item.year}</span>
                    </div>
                    {item.summary ? (
                      <p className="mt-2 line-clamp-2 text-sm text-[#444]/80">{item.summary}</p>
                    ) : null}
                    <div className="mt-3 text-sm font-medium text-[#222]">
                      Open details <span className="ml-1 inline-block transition-transform group-hover:translate-x-0.5">→</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* TABS (CSS-only, no JS) */}
      <section className="mx-auto w-full max-w-6xl px-5 pb-16 pt-12">
        <div className="border-t border-[#e5e5e5] pt-8">
          <div className="grid gap-6 md:grid-cols-[240px_1fr]">
            {/* left: tabs */}
            <div className="md:sticky md:top-6">
              <p className="text-xs tracking-widest text-[#444]/70">OVERVIEW</p>

              {/* radio tabs */}
              <div className="mt-4 space-y-2">
                <div className="relative">
                  <input
                    id="tab-intro"
                    name="home-tabs"
                    type="radio"
                    defaultChecked
                    className="peer hidden"
                  />
                  <label
                    htmlFor="tab-intro"
                    className="flex cursor-pointer items-center justify-between rounded-xl border border-[#e5e5e5] bg-white px-4 py-3 text-sm hover:border-[#444]/40 peer-checked:border-[#222] peer-checked:text-[#222]"
                  >
                    Introduction
                    <span className="text-[#444]/50">+</span>
                  </label>

                  <div className="mt-3 hidden rounded-2xl border border-[#e5e5e5] bg-white p-5 peer-checked:block">
                    <p className="text-sm leading-relaxed text-[#444]/85">
                      미오기(MIOGY)는 패션/텍스타일 기반의 그래픽과 브랜드 운영 경험을 바탕으로,
                      제품과 화면에서 동시에 설득력 있는 비주얼 시스템을 만듭니다.
                    </p>

                    <div className="mt-4 border-t border-[#e5e5e5] pt-4">
                      <p className="text-xs tracking-widest text-[#444]/70">CORE</p>
                      <ul className="mt-2 space-y-1 text-sm text-[#444]/85">
                        <li>• Textile & Print direction</li>
                        <li>• Graphic system & key visual</li>
                        <li>• Brand operation & web contents</li>
                      </ul>

                      <Link
                        href="/about#intro"
                        className="mt-4 inline-flex items-center justify-center rounded-full bg-[#222] px-4 py-2 text-sm text-white"
                      >
                        Read more
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <input id="tab-about" name="home-tabs" type="radio" className="peer hidden" />
                  <label
                    htmlFor="tab-about"
                    className="flex cursor-pointer items-center justify-between rounded-xl border border-[#e5e5e5] bg-white px-4 py-3 text-sm hover:border-[#444]/40 peer-checked:border-[#222] peer-checked:text-[#222]"
                  >
                    About
                    <span className="text-[#444]/50">+</span>
                  </label>

                  <div className="mt-3 hidden rounded-2xl border border-[#e5e5e5] bg-white p-5 peer-checked:block">
                    <p className="text-sm leading-relaxed text-[#444]/85">
                      작업 가치, 커리어, 대표 프로젝트 카드로 정리된 소개 페이지로 이동합니다.
                    </p>
                    <Link
                      href="/about"
                      className="mt-4 inline-flex items-center justify-center rounded-full bg-[#222] px-4 py-2 text-sm text-white"
                    >
                      Go to About
                    </Link>
                  </div>
                </div>

                <div className="relative">
                  <input id="tab-archive" name="home-tabs" type="radio" className="peer hidden" />
                  <label
                    htmlFor="tab-archive"
                    className="flex cursor-pointer items-center justify-between rounded-xl border border-[#e5e5e5] bg-white px-4 py-3 text-sm hover:border-[#444]/40 peer-checked:border-[#222] peer-checked:text-[#222]"
                  >
                    Archive
                    <span className="text-[#444]/50">+</span>
                  </label>

                  <div className="mt-3 hidden rounded-2xl border border-[#e5e5e5] bg-white p-5 peer-checked:block">
                    <p className="text-sm leading-relaxed text-[#444]/85">
                      학습/실험을 통해 스킬을 확장하는 개인 작업(Archive) 섹션으로 이동합니다.
                    </p>
                    <Link
                      href="/work?category=archive"
                      className="mt-4 inline-flex items-center justify-center rounded-full bg-[#222] px-4 py-2 text-sm text-white"
                    >
                      Open Archive
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* right: optional featured note */}
            <div className="rounded-2xl border border-[#e5e5e5] bg-white p-6">
              <p className="text-xs tracking-widest text-[#444]/70">NOTE</p>
              <h3 className="mt-2 text-lg font-semibold text-[#444]">
                Minimal layout, maximum clarity.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#444]/85">
                전체 배경은 white, 텍스트는 #444, 주요 버튼/로고는 #222, 구분선은 라이트 그레이로
                고정합니다. 데이터(artworks-contents)는 배포 후에도 submodule 업데이트로 계속 확장됩니다.
              </p>

              <div className="mt-6 border-t border-[#e5e5e5] pt-5">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full border border-[#e5e5e5] px-3 py-1 text-xs">
                    Next.js
                  </span>
                  <span className="rounded-full border border-[#e5e5e5] px-3 py-1 text-xs">
                    Codespaces
                  </span>
                  <span className="rounded-full border border-[#e5e5e5] px-3 py-1 text-xs">
                    Submodule data
                  </span>
                  <span className="rounded-full border border-[#e5e5e5] px-3 py-1 text-xs">
                    White UI
                  </span>
                </div>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/work"
                    className="inline-flex items-center justify-center rounded-full border border-[#e5e5e5] bg-white px-4 py-2 text-sm text-[#444] hover:border-[#444]/40"
                  >
                    Explore work
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-full bg-[#222] px-4 py-2 text-sm text-white"
                  >
                    Contact miogy
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* 4. 스크롤 투 탑 버튼 */}
        {/* <ScrollToTopButton /> */}

    </main>
  );
}
