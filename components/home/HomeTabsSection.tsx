// components/home/HomeTabsSection.tsx
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type TabKey = "introduction" | "about" | "archive";

type TabData = {
  key: TabKey;
  label: string;
  kicker: string;
  title: string;
  description?: string;
  descriptionLines?: string[];
  chips?: string[];
  bullets?: string[];
  href: string;
  cta: string;
};

export default function HomeTabsSection() {
  const tabs = useMemo<TabData[]>(
    () => [
      {
        key: "introduction",
        label: "Introduction",
        kicker: "소개",
        title: "Designer / Studio operator",
        descriptionLines: [
          "패션 텍스타일과 어패럴 그래픽을 바탕으로, 브랜드 전체를 보는 그래픽 디자이너 양미옥입니다.",
          "시즌 기획–디자인–생산 핸들링까지 전 과정을 담당해 왔으며, 웹·UI와 온라인 콘텐츠 디자인 경험을 더해",
          "오프라인 제품 그래픽과 디지털 화면을 하나의 브랜드 경험으로 설계하는 디자이너를 지향합니다."],
        chips: ["Textile & Print", "Key Visual", "Brand OS", "Web Contents"],
        bullets:[
          "시즌 그래픽·패턴 기획 및 핸드드로잉 그래픽, 생산 공정 이해 및 핸들링",
          "프로젝트·일정 관리와 리딩 경험, 부서·협력사와의 원활한 커뮤니케이션",
          "오프라인 매장·행사 지원 등 현장 경험을 바탕으로 한 실사용 관점의 디자인",
          "Adobe, CLO 3D, Figma, 기본 웹 제작 활용가능",
          "새로운 디지털 툴과 프로그램을 빠르게 학습해 업무에 적용하는 적응력"
        ],
        href: "/about#intro",
        cta: "View details",
      },
      {
        key: "about",
        label: "About",
        kicker: "VALUES",
        title: "Clarity · Consistency · Care",
        description:
          "A calm white UI that highlights the work. I aim for clean structure, repeatable systems, and high usability across channels.",
        href: "/about",
        cta: "Go to About",
      },
      {
        key: "archive",
        label: "Archive",
        kicker: "LEARNING",
        title: "Archive & experiments",
        description:
          "Personal experiments and learning projects—typography, layout, RAG, automation, and visual studies.",
        href: "/work?category=archive",
        cta: "Open Archive",
      },
    ],
    []
  );

  const [tab, setTab] = useState<TabKey>("introduction");
  const current = tabs.find((t) => t.key === tab) ?? tabs[0];

  return (
    <section className="mx-auto w-full max-w-6xl px-5 pb-16 pt-14">
      <div className="border-t border-[#e5e5e5] pt-10">
        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {tabs.map((t) => {
            const active = tab === t.key;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => setTab(t.key)}
                className={[
                  "rounded-full border px-4 py-2 text-sm",
                  active
                    ? "border-[#222] bg-[#222] text-white"
                    : "border-[#e5e5e5] bg-white text-[#444] hover:border-[#444]/40",
                ].join(" ")}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="mt-6 rounded-2xl border border-[#e5e5e5] bg-white p-6">
          <p className="text-xs tracking-widest text-[#444]/70">{current.kicker}</p>
          <h3 className="mt-2 text-lg font-semibold text-[#222]">{current.title}</h3>
          
          <p className="mt-3 text-sm leading-relaxed text-[#444]/85">

          {current.descriptionLines?.length ? (
            current.descriptionLines.map((line, idx) => (
              <span key={`${current.key}-desc-${idx}`}>
                {line}
                {idx !== current.descriptionLines!.length - 1 ? <br /> : null}
              </span>
            ))
            ) : (
              <>{current.description}</>
            )}
          </p>

          {current.chips?.length ? (
            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
              {current.chips.map((c) => (
                <span key={c} className="text-sm font-medium text-[#444]/80">
                <span className="text-[#444]/60">#</span>
                 {c}
                </span>
              ))}
            </div>
          ) : null}


          <Link href={current.href} className="mt-6 inline-flex text-sm font-medium text-[#222]">
            <span className="border-b border-[#222]/70 pb-0.5 hover:border-[#222]">
              {current.cta}
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

