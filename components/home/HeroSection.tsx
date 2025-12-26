// components/home/HeroSection.tsx
"use client";

import Link from "next/link";

export type HeroServiceItem = {
  key?: string;
  href: string;
  title: string;
  description: string;
  imageSrc?: string | null;
};

type Props = {
  eyebrow: string;
  title: string;
  intro: string;
  ctaLabel: string;
  ctaHref: string;
  items: HeroServiceItem[];
};

export default function HeroServicesSection({
  eyebrow,
  title,
  intro,
  ctaLabel,
  ctaHref,
  items,
}: Props) {
  const list = items || [];

  return (
    <section className="mx-auto w-full max-w-6xl px-5 pb-10 pt-12">
      <div className="pb-10 text-center">
        <p className="text-xs tracking-[0.3em] text-[#444]/70">{eyebrow}</p>
        <h1 className="mt-3 text-4xl font-semibold text-[#222]">{title}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#444]/80">
          {intro}
        </p>
        <Link href={ctaHref} className="mt-6 inline-flex text-sm font-medium text-[#222]">
          <span className="border-b border-[#222]/70 pb-0.5 hover:border-[#222]">{ctaLabel}</span>
        </Link>
      </div>

      {/* Cards */}
      <div className="mt-10">
        {/* Desktop: 3 columns */}
        <div className="hidden md:grid md:grid-cols-3 md:gap-0">
          {list.map((item, idx) => (
            <div
              key={item.key || item.href || String(idx)}
              className="min-w-0 border border-[#e5e5e5] bg-white"
            >
              <HeroCard item={item} />
            </div>
          ))}
        </div>

        {/* Mobile: one-by-one scroll */}
        <div className="md:hidden">
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
            {list.map((item, idx) => (
              <div key={item.key || item.href || String(idx)} className="snap-center" style={{ minWidth: "86%" }}>
                <div className="border border-[#e5e5e5] bg-white">
                  <HeroCard item={item} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroCard({ item }: { item: HeroServiceItem }) {
  const hasImage = typeof item.imageSrc === "string" && item.imageSrc.trim().length > 0;

  return (
    <Link href={item.href} className="group block">
      {/* ✅ 비율 스왑 + ✅ height 0 방지 + ✅ min/max 높이로 안정화 */}
      <div
        className={[
          "relative w-full overflow-hidden bg-[#f3f3f3]",
          "aspect-[4/5] md:aspect-[3/4]",
          "min-h-[280px] md:min-h-[320px]",
          "max-h-[560px] md:max-h-[520px]",
        ].join(" ")}
      >
        {hasImage ? (
          <img
            src={item.imageSrc!}
            alt={item.title}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            onError={(e) => {
              // 이미지 404여도 레이아웃 유지 + 깨진 아이콘 숨김
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        ) : null}

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/55" />

        <div className="absolute inset-x-0 bottom-0 p-6 text-white">
          <h3 className="text-xl font-semibold leading-snug">{item.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-white/90">{item.description}</p>
          <div className="mt-5 inline-flex text-sm font-semibold">
            <span className="border-b border-white/70 pb-0.5 group-hover:border-white">Discover</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
