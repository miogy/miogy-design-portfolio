// components/work/WorkGrid.tsx
import type { WorkItem } from "@/lib/types";
import WorkCard from "./WorkCard";

export default function WorkGrid({ items }: { items: WorkItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {items.map((item) => (
        <WorkCard key={item.slug} item={item} />
      ))}
    </div>
  );
}
