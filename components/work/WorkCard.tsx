// components/work/WorkCard.tsx
import Link from "next/link";
import Image from "next/image";
import type { WorkItem } from "@/lib/types";

export default function WorkCard({ item }: { item: WorkItem }) {
  return (
    <Link
      href={`/work/${item.slug}`}
      className="group overflow-hidden rounded-2xl border border-[#e5e5e5] bg-white"
    >
      <div className="relative aspect-[4/3] w-full bg-[#f3f3f3]">
        {item.thumb ? (
          <Image
            src={item.thumb}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-[#f6f6f6] to-[#ededed]" />
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-sm font-semibold text-[#222]">{item.title}</h3>
          <span className="text-xs text-[#444]/70">{item.year}</span>
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-[#444]/80">{item.summary}</p>

        <div className="mt-3 text-sm font-medium text-[#222]">
          <span className="border-b border-[#222]/40 pb-0.5 group-hover:border-[#222]">
            View details
          </span>
        </div>
      </div>
    </Link>
  );
}
