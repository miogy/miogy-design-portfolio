// components/work/WorkCard.tsx
import Link from "next/link";
import Image from "next/image";
import type { WorkItem } from "@/lib/types";

export default function WorkCard({ item }: { item: WorkItem }) {
  const hasImage = typeof item.thumb === "string" && item.thumb.trim().length > 0;

  return (
    <Link
      href={`/work/${item.slug}`}
      className="group block overflow-hidden rounded-2xl border border-[#e5e5e5] bg-white"
    >
      <div className="relative w-full bg-[#f3f3f3] aspect-[4/5]">
        {hasImage ? (
          <Image
            src={item.thumb as string}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs tracking-widest text-[#444]/60">NO IMAGE</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <p className="text-[11px] tracking-widest text-[#444]/70">
          {String(item.category).toUpperCase()}
        </p>
        <h3 className="mt-2 text-sm font-semibold text-[#222]">{item.title}</h3>
        <p className="mt-1 text-xs text-[#444]/70">{item.year}</p>
      </div>
    </Link>
  );
}
