// app/work/page.tsx
import WorkFilterBar from "@/components/work/WorkFilterBar";
import WorkGrid from "@/components/work/WorkGrid";
import type { CategoryFilter, YearFilter, WorkItem } from "@/lib/types";
import { getWorks, toWorkItems } from "@/lib/works";

type WorkSearchParams = {
  category?: CategoryFilter;
  year?: YearFilter;
};

export default async function WorkPage({
  searchParams,
}: {
  searchParams?: Promise<WorkSearchParams> | WorkSearchParams;
}) {
  const sp = (await Promise.resolve(searchParams)) ?? {};

  const category: CategoryFilter = (sp.category ?? "all") as CategoryFilter;
  const year: YearFilter = (sp.year ?? "all") as YearFilter;

  const worksRaw = await getWorks();
  const works: WorkItem[] = toWorkItems(worksRaw);

  const filtered: WorkItem[] = works.filter((w) => {
    const okCategory = category === "all" ? true : w.category === category;
    const okYear = year === "all" ? true : String(w.year) === String(year);
    return okCategory && okYear;
  });

  // ✅ 문자열 배열로!
  const categories: CategoryFilter[] = [
    "all",
    "in-house",
    "promotion",
    "artist-ip",
    "trade",
    "archive",
  ];

  // ✅ years도 WorkFilterBar 타입(YearFilter[])에 맞추기
  const years: YearFilter[] = [
    "all",
    ...Array.from(new Set(works.map((w) => String(w.year)))).sort(
      (a, b) => Number(b) - Number(a)
    ),
  ] as YearFilter[];

  return (
    <main className="mx-auto w-full max-w-6xl px-5 pb-16 pt-10">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="text-xs tracking-widest text-[#444]/70">WORK</p>
          <h1 className="mt-2 text-2xl font-semibold text-[#222]">
            Selected Works
          </h1>
        </div>
      </div>

      <div className="mt-8">
        <WorkFilterBar categories={categories} years={years} />
      </div>

      <div className="mt-8">
        <WorkGrid items={filtered} />
      </div>
    </main>
  );
}
