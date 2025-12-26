// components/work/WorkFilterBar.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { CategoryFilter, YearFilter } from "@/lib/types";

function unique<T>(arr: T[]) {
  return Array.from(new Set(arr));
}

function categoryLabel(c: CategoryFilter) {
  switch (c) {
    case "all":
      return "All";
    case "in-house":
      return "In-house";
    case "promotion":
      return "Promotion";
    case "artist-ip":
      return "Artist IP";
    case "trade":
      return "Trade";
    case "archive":
      return "Archive";
    default:
      return String(c);
  }
}

export default function WorkFilterBar({
  categories,
  years,
}: {
  categories: CategoryFilter[];
  years: YearFilter[];
}) {
  const router = useRouter();
  const sp = useSearchParams();

  const activeCategory = (sp.get("category") ?? "all") as CategoryFilter;
  const activeYear = (sp.get("year") ?? "all") as YearFilter;

  const safeCategories = unique(categories.filter(Boolean));
  const safeYears = unique(years.filter(Boolean));

  const setQuery = (next: Partial<{ category: CategoryFilter; year: YearFilter }>) => {
    const params = new URLSearchParams(sp.toString());
    if (next.category) params.set("category", next.category);
    if (next.year) params.set("year", next.year);
    router.push(`/work?${params.toString()}`);
  };

  return (
    <div className="border-t border-[#000]/10 pt-8">
      <div className="flex items-start justify-between gap-10">
        {/* LEFT: CATEGORY */}
        <div className="min-w-[220px]">
          <p className="text-xs tracking-widest text-[#444]/70">CATEGORY</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {safeCategories.map((c) => {
              const active = activeCategory === c;
              return (
                <button
                  key={`cat-${c}`}
                  type="button"
                  onClick={() => setQuery({ category: c })}
                  className={[
                    "rounded-full border px-4 py-2 text-sm",
                    active
                      ? "border-[#111] bg-[#111] text-white"
                      : "border-[#000]/15 bg-white text-[#222] hover:border-[#000]/25",
                  ].join(" ")}
                >
                  {categoryLabel(c)}
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT: YEAR */}
        <div className="min-w-[220px] text-right">
          <p className="text-xs tracking-widest text-[#444]/70">YEAR</p>
          <div className="mt-4 flex flex-wrap justify-end gap-2">
            {safeYears.map((y) => {
              const active = activeYear === y;
              const label = y === "all" ? "All" : String(y);
              return (
                <button
                  key={`year-${String(y)}`}
                  type="button"
                  onClick={() => setQuery({ year: y })}
                  className={[
                    "rounded-full border px-4 py-2 text-sm",
                    active
                      ? "border-[#111] bg-[#111] text-white"
                      : "border-[#000]/15 bg-white text-[#222] hover:border-[#000]/25",
                  ].join(" ")}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

