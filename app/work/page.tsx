// app/work/page.tsx
import WorkFilterBar from "@/components/work/WorkFilterBar";
import WorkGrid from "@/components/work/WorkGrid";
import { WORKS, WORK_CATEGORIES, YEARS } from "@/lib/mockData";
import type { WorkCategory } from "@/lib/types";

export default function WorkPage({
  searchParams,
}: {
  searchParams: { category?: WorkCategory; year?: string };
}) {
  const category = (searchParams.category ?? "in-house") as WorkCategory;
  const year = searchParams.year ?? "all";

  const filtered = WORKS.filter((w) => {
    const okCategory = w.category === category;
    const okYear = year === "all" ? true : String(w.year) === year;
    return okCategory && okYear;
  });

  return (
    <main className="mx-auto w-full max-w-6xl px-5 pb-16 pt-10">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="text-xs tracking-widest text-[#444]/70">WORK</p>
          <h1 className="mt-2 text-2xl font-semibold text-[#222]">Selected Works</h1>
        </div>
      </div>

      <div className="mt-8">
        <WorkFilterBar categories={WORK_CATEGORIES} years={YEARS} />
      </div>

      <div className="mt-8">
        <WorkGrid items={filtered} />
      </div>
    </main>
  );
}
