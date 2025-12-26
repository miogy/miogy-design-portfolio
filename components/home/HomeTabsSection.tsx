// components/home/HomeTabsSection.tsx
"use client";

import Link from "next/link";
import { useState } from "react";

type TabKey = "introduction" | "about" | "archive";

const TAB_LABEL: Record<TabKey, string> = {
  introduction: "Introduction",
  about: "About",
  archive: "Archive",
};

export default function HomeTabsSection() {
  const [tab, setTab] = useState<TabKey>("introduction");

  return (
    <section className="mx-auto w-full max-w-6xl px-5 pb-16 pt-14">
      <div className="border-t border-[#e5e5e5] pt-10">
        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {Object.entries(TAB_LABEL).map(([key, label]) => {
            const active = tab === (key as TabKey);
            return (
              <button
                key={key}
                type="button"
                onClick={() => setTab(key as TabKey)}
                className={[
                  "rounded-full border px-4 py-2 text-sm",
                  active
                    ? "border-[#222] bg-[#222] text-white"
                    : "border-[#e5e5e5] bg-white text-[#444] hover:border-[#444]/40",
                ].join(" ")}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="mt-6 rounded-2xl border border-[#e5e5e5] bg-white p-6">
          {tab === "introduction" ? (
            <>
              <p className="text-xs tracking-widest text-[#444]/70">BRIEF</p>
              <h3 className="mt-2 text-lg font-semibold text-[#222]">Designer / Studio operator</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#444]/85">
                I build cohesive visual systems from textile prints to brand graphics—optimized for
                production, product storytelling, and web presentation.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {["Textile & Print", "Key Visual", "Brand OS", "Web Contents"].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-[#e5e5e5] bg-white px-3 py-1 text-xs text-[#444]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <Link href="/about#intro" className="mt-6 inline-flex text-sm font-medium text-[#222]">
                <span className="border-b border-[#222]/70 pb-0.5 hover:border-[#222]">
                  View details
                </span>
              </Link>
            </>
          ) : null}

          {tab === "about" ? (
            <>
              <p className="text-xs tracking-widest text-[#444]/70">VALUES</p>
              <h3 className="mt-2 text-lg font-semibold text-[#222]">Clarity · Consistency · Care</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#444]/85">
                A calm white UI that highlights the work. I aim for clean structure, repeatable
                systems, and high usability across channels.
              </p>

              <Link href="/about" className="mt-6 inline-flex text-sm font-medium text-[#222]">
                <span className="border-b border-[#222]/70 pb-0.5 hover:border-[#222]">
                  Go to About
                </span>
              </Link>
            </>
          ) : null}

          {tab === "archive" ? (
            <>
              <p className="text-xs tracking-widest text-[#444]/70">LEARNING</p>
              <h3 className="mt-2 text-lg font-semibold text-[#222]">Archive & experiments</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#444]/85">
                Personal experiments and learning projects—typography, layout, RAG, automation, and
                visual studies.
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

