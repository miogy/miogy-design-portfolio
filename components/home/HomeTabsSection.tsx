// components/home/HomeTabsSection.tsx
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type TabKey = "introduction" | "about" | "archive";

type AboutLink = { label: string; url: string };

type ExperienceItem = {
  company: string;
  position: string;
  employmentType?: string;
  period?: { from?: string; to?: string };
};

type AboutData = {
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

type TabData = {
  key: TabKey;
  label: string;
};

function cleanList(arr?: string[]) {
  return (arr ?? [])
    .map((s) => String(s ?? "").replace(/^\s*-\s*/, "").trim())
    .filter(Boolean);
}

function parseYM(ym?: string) {
  if (!ym) return null;
  const m = ym.match(/^(\d{4})-(\d{2})$/);
  if (!m) return null;
  const y = Number(m[1]);
  const mm = Number(m[2]);
  if (!Number.isFinite(y) || !Number.isFinite(mm) || mm < 1 || mm > 12) return null;
  return y * 12 + (mm - 1);
}

function nowMonthIndex() {
  const d = new Date();
  return d.getFullYear() * 12 + d.getMonth();
}

function mergeIntervals(intervals: Array<[number, number]>) {
  if (!intervals.length) return [];
  const sorted = intervals
    .map(([s, e]) => [Math.min(s, e), Math.max(s, e)] as [number, number])
    .sort((a, b) => a[0] - b[0]);

  const merged: Array<[number, number]> = [];
  for (const [s, e] of sorted) {
    const last = merged[merged.length - 1];
    if (!last) merged.push([s, e]);
    else if (s <= last[1] + 1) last[1] = Math.max(last[1], e);
    else merged.push([s, e]);
  }
  return merged;
}

function calcTotalCareerMonths(exp: ExperienceItem[]) {
  const intervals: Array<[number, number]> = [];
  for (const e of exp) {
    const s = parseYM(e.period?.from);
    if (s == null) continue;
    const eIdx = parseYM(e.period?.to) ?? nowMonthIndex();
    intervals.push([s, eIdx]);
  }
  const merged = mergeIntervals(intervals);
  let months = 0;
  for (const [s, e] of merged) months += e - s + 1;
  return Math.max(0, months);
}

function formatYearsMonths(totalMonths: number) {
  const y = Math.floor(totalMonths / 12);
  const m = totalMonths % 12;
  if (y <= 0) return `총 ${m}개월`;
  if (m <= 0) return `총 ${y}년`;
  return `총 ${y}년 ${m}개월`;
}

function findLatest(exp: ExperienceItem[]) {
  const sorted = [...exp].sort((a, b) => {
    const af = parseYM(a.period?.from) ?? -Infinity;
    const bf = parseYM(b.period?.from) ?? -Infinity;
    return bf - af;
  });
  return sorted[0] ?? null;
}

function pickPortfolioLink(links?: AboutLink[]) {
  const list = (links ?? []).filter((l) => l?.url);
  return (
    list.find((l) => /pdf|portfolio/i.test(l.label)) ||
    list.find((l) => /pdf/i.test(l.url)) ||
    list[0] ||
    null
  );
}

function StatCard({
  label,
  title,
  sub,
  right,
}: {
  label: string;
  title: string;
  sub?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[#e5e5e5] bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-[#444]/75">{label}</p>
          <p className="mt-2 text-sm font-semibold text-[#222]">{title}</p>
          {sub ? <p className="mt-1 text-xs text-[#444]/70">{sub}</p> : null}
        </div>
        {right ? <div className="mt-0.5">{right}</div> : null}
      </div>
    </div>
  );
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

  const tabs = useMemo<TabData[]>(
    () => [
      { key: "introduction", label: "Introduction" },
      { key: "about", label: "About" },
      { key: "archive", label: "Archive" },
    ],
    []
  );

  if (error) {
    return (
      <section className="mx-auto w-full max-w-6xl px-5 pb-16 pt-14">
        <div className="border-t border-[#e5e5e5] pt-10">
          <p className="text-sm text-[#444]/85">Failed to load: {error}</p>
        </div>
      </section>
    );
  }

  if (!about) {
    return (
      <section className="mx-auto w-full max-w-6xl px-5 pb-16 pt-14">
        <div className="border-t border-[#e5e5e5] pt-10">
          <p className="text-sm text-[#444]/85">Loading…</p>
        </div>
      </section>
    );
  }

  // about.json 기반 데이터
  const skills = cleanList(about.intro.skills);
  const core = cleanList(about.intro.coreCompetency);
  const latest = findLatest(about.experience);
  const totalText = formatYearsMonths(calcTotalCareerMonths(about.experience));
  const portfolio = pickPortfolioLink(about.intro.links);

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

        {/* Content box */}
        <div className="mt-6 rounded-2xl border border-[#e5e5e5] bg-white p-6">
          {/* ✅ Introduction 탭: 프로필 사진 + 짧은 소개(너가 완성할 영역) */}
          {tab === "introduction" ? (
            <>
              <p className="text-xs tracking-widest text-[#444]/70">INTRO</p>
              <h3 className="mt-2 text-lg font-semibold text-[#222]">
                {about.intro.headline}
              </h3>

              <div className="mt-5 flex flex-col gap-5 md:flex-row md:items-start">
                {/* Profile photo placeholder */}
                <div className="shrink-0">
                  {/* 나중에 Image 컴포넌트로 교체하면 됨 */}
                  <div className="h-20 w-20 rounded-2xl border border-[#e5e5e5] bg-[#fafafa]" />
                </div>

                <div className="flex-1">
                  <p className="text-sm leading-relaxed text-[#444]/85">
                    {/* 여기 문장/구성을 너가 “짧은 소개”로 마무리하면 됨 */}
                    {about.intro.summary}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {skills.slice(0, 6).map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-[#e5e5e5] bg-white px-3 py-1 text-xs text-[#222]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <Link
                    href="/about#intro"
                    className="mt-6 inline-flex text-sm font-medium text-[#222]"
                  >
                    <span className="border-b border-[#222]/70 pb-0.5 hover:border-[#222]">
                      View details
                    </span>
                  </Link>
                </div>
              </div>
            </>
          ) : null}

          {/* ✅ About 탭: (네가 말한) 기존 HomeTabsSection “헤드라인+요약+스킬+역량카드”를 여기로 이동 */}
          {tab === "about" ? (
            <>
              <p className="text-xs tracking-widest text-[#444]/70">소개</p>
              <h3 className="mt-2 text-xl font-semibold text-[#222]">
                {about.intro.headline}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-[#444]/85">
                {about.intro.summary}
              </p>

              {/* 사람인 느낌: 상단 요약 카드(읽기 쉬움) */}
              <div className="mt-6 grid gap-3 md:grid-cols-4">
                <StatCard
                  label="경력"
                  title={latest?.company ?? "—"}
                  sub={totalText}
                />
                <StatCard
                  label="최근 포지션"
                  title={latest?.position ?? "—"}
                  sub={
                    latest?.period?.from
                      ? `${latest.period.from}${latest.period.to ? ` — ${latest.period.to}` : ""}`
                      : undefined
                  }
                />
                <StatCard
                  label="연락"
                  title={about.intro.email ?? "—"}
                  right={
                    about.intro.email ? (
                      <a
                        href={`mailto:${about.intro.email}`}
                        className="rounded-full border border-[#e5e5e5] bg-white px-2.5 py-1 text-[11px] text-[#222] hover:bg-[#f6f6f6]"
                      >
                        Mail
                      </a>
                    ) : null
                  }
                />
                <StatCard
                  label="포트폴리오"
                  title={portfolio?.label || "PDF"}
                  right={
                    portfolio?.url ? (
                      <a
                        href={portfolio.url}
                        className="rounded-full border border-[#e5e5e5] bg-white px-2.5 py-1 text-[11px] text-[#222] hover:bg-[#f6f6f6]"
                      >
                        Open
                      </a>
                    ) : null
                  }
                />
              </div>

              {/* skills: 사람인처럼 읽히는 해시태그 라인 */}
              {skills.length ? (
                <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium text-[#444]/80">
                  {skills.map((s) => (
                    <span key={s}>
                      <span className="text-[#444]/55">#</span> {s}
                    </span>
                  ))}
                </div>
              ) : null}

              {/* core competency: 카드형 2열 */}
              {core.length ? (
                <div className="mt-5 grid gap-3 md:grid-cols-2">
                  {core.map((c, idx) => (
                    <div
                      key={`${c}-${idx}`}
                      className="rounded-2xl border border-[#ededed] bg-[#fafafa] px-4 py-3 text-sm leading-relaxed text-[#333]/90"
                    >
                      {c}
                    </div>
                  ))}
                </div>
              ) : null}

              <Link
                href="/about"
                className="mt-6 inline-flex text-sm font-medium text-[#222]"
              >
                <span className="border-b border-[#222]/70 pb-0.5 hover:border-[#222]">
                  Go to About
                </span>
              </Link>
            </>
          ) : null}

          {/* Archive 탭: 간단 유지 */}
          {tab === "archive" ? (
            <>
              <p className="text-xs tracking-widest text-[#444]/70">LEARNING</p>
              <h3 className="mt-2 text-lg font-semibold text-[#222]">
                Archive & experiments
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#444]/85">
                개인 프로젝트와 학습 기록(타이포/레이아웃/RAG/자동화/비주얼 스터디)을 모아둔 아카이브입니다.
              </p>

              <Link
                href="/work?category=archive"
                className="mt-6 inline-flex text-sm font-medium text-[#222]"
              >
                <span className="border-b border-[#222]/70 pb-0.5 hover:border-[#222]">
                  Open Archive
                </span>
              </Link>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}
