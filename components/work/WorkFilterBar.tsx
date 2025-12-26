// components/work/WorkFilterBar.tsx
"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { WorkCategory } from "@/lib/types";

export default function WorkFilterBar({
  categories,
  years,
}: {
  categories: { key: WorkCategory; label: string }[];
  years: number[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const activeCategory = (sp.get("category") as WorkCategory | null) ?? "in-house";
  const activeYear = sp.get("year") ?? "all";

  const yearOptions = useMemo(() => ["all", ...years.map((y) => String(y))], [years]);

  function setQuery(next: { category?: string; year?: string }) {
    const params = new URLSearchParams(sp.toString());
    if (next.category) params.set("category", next.category);
    if (next.year) params.set("year", next.year);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-col gap-4 border-b border-[#e5e5e5] pb-6 md:flex-row md:items-end md:justify-between">
      {/* Left category buttons */}
      <div>
        <p className="text-xs tracking-widest text-[#444]/70">CATEGORY</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {categories.map((c) => {
            const active = activeCategory === c.key;
            return (
              <button
                key={c.key}
                type="button"
                onClick={() => setQuery({ category: c.key })}
                className={[
                  "rounded-full border px-4 py-2 text-sm",
                  active
                    ? "border-[#222] bg-[#222] text-white"
                    : "border-[#e5e5e5] bg-white text-[#444] hover:border-[#444]/40",
                ].join(" ")}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Right year filter */}
      <div className="md:text-right">
        <p className="text-xs tracking-widest text-[#444]/70">YEAR</p>
        <div className="mt-3 flex flex-wrap gap-2 md:justify-end">
          {yearOptions.map((y) => {
            const active = activeYear === y;
            return (
              <button
                key={y}
                type="button"
                onClick={() => setQuery({ year: y })}
                className={[
                  "rounded-full border px-4 py-2 text-sm",
                  active
                    ? "border-[#222] bg-[#222] text-white"
                    : "border-[#e5e5e5] bg-white text-[#444] hover:border-[#444]/40",
                ].join(" ")}
              >
                {y === "all" ? "All" : y}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
