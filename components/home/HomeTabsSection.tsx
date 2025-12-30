// components/home/HomeTabsSection.tsx
// components/home/HomeTabsSection.tsx
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type TabKey = "introduction" | "about" | "archive";

type TabData = {
  key: TabKey;
  label: string;
  kicker: string;
  title: string;
  descriptionLines?: string[];
  description?: string;
  chips?: string[];
  bullets?: string[];
  href: string;
  cta: string;
};

type AboutData = {
  intro: {
    headline: string;
    summary: string;
    coreCompetency: string[];
    skills: string[];
    email?: string;
    links?: { label: string; url: string }[];
  };
};

function cleanList(arr?: string[]) {
  return (arr ?? [])
    .map((s) => String(s ?? "").replace(/^\s*-\s*/, "").trim())
    .filter(Boolean);
}

function splitToLines(text?: string) {
  const t = (text ?? "").trim();
  if (!t) return [];

  // 이미 줄바꿈이 있으면 그대로
  if (t.includes("\n")) {
    return t
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
  }

  // 문장 단위로 가볍게 분리 시도 (너무 과하면 한 줄로)
  const byDa = t.split(/(?<=다)\s+/).map((s) => s.trim()).filter(Boolean);
  if (byDa.length >= 2) return byDa;

  const byDot = t.split(/\. +/).map((s) => s.trim()).filter(Boolean);
  if (byDot.length >= 2) return byDot.map((s) => (s.endsWith(".") ? s : `${s}.`));

  return [t];
}

export default function HomeTabsSection() {
  const [tab, setTab] = useState<TabKey>("introduction");
  const [about, setAbout] = useState<AboutData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const res = await fetch("/api/about", { method: "GET" });
        if (!res.ok) throw new Error(`Failed to load about data (${res.status})`);
        const json = (await res.json()) as AboutData;
        if (alive) setAbout(json);
      } catch (e: any) {
        if (alive) setError(e?.message ?? "Failed to load about data");
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  const tabs: TabData[] = useMemo(() => {
    if (!about) return [];

    return [
      {
        key: "introduction",
        label: "Introduction",
        kicker: "소개",
        title: about.intro.headline,
        descriptionLines: splitToLines(about.intro.summary),
        chips: cleanList(about.intro.skills).slice(0, 6),
        bullets: cleanList(about.intro.coreCompetency),
        href: "/about#intro",
        cta: "View details",
      },
      {
        key: "about",
        label: "About",
        kicker: "ABOUT",
        title: "More about Miogy",
        description:
          "Career timeline, responsibilities, and achievements based on about.json.",
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
    ];
  }, [about]);

  const current = tabs.find((t) => t.key === tab) ?? tabs[0];

  // 로딩/에러 상태(콘텐츠 하드코딩 없이 최소 UI만)
  if (error) {
    return (
      <section className="mx-auto w-full max-w-6xl px-5 pb-16 pt-14">
        <div className="border-t border-[#e5e5e5] pt-10">
          <p className="text-sm text-[#444]/85">Failed to load: {error}</p>
        </div>
      </section>
    );
  }

  if (!about || !tabs.length || !current) {
    return (
      <section className="mx-auto w-full max-w-6xl px-5 pb-16 pt-14">
        <div className="border-t border-[#e5e5e5] pt-10">
          <p className="text-sm text-[#444]/85">Loading…</p>
        </div>
      </section>
    );
  }

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
        <div className="mt-6 bg-white p-6">
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

          {/* Chips */}
          {current.chips?.length ? (
            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
              {current.chips.map((c) => (
                <span key={c} className="text-sm font-medium text-[#444]/80">
                  <span className="text-[#444]/60">#</span> {c}
                </span>
              ))}
            </div>
          ) : null}

          {/* Bullets */}
          {current.bullets?.length ? (
            <ul className="mt-5 grid gap-2 md:grid-cols-2">
              {current.bullets.map((b, idx) => (
                <li
                  key={`${current.key}-bullet-${idx}`}
                  className="rounded-xl border border-[#ededed] bg-[#fafafa] p-3 text-sm leading-relaxed text-[#333]/90"
                >
                  {b}
                </li>
              ))}
            </ul>
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
