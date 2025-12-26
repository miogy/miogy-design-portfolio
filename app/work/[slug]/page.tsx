// app/work/[slug]/page.tsx
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getWorkBySlug, toWorkItem } from "@/lib/works";

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const { slug } = await Promise.resolve(params);

  const raw = await getWorkBySlug(slug);
  if (!raw) return notFound();

  const work = toWorkItem(raw);

  const hasImage = typeof work.thumb === "string" && work.thumb.trim().length > 0;

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-16">
      <p className="text-xs tracking-widest text-[#444]/70">
        {String(work.category).toUpperCase()}
      </p>

      <h1 className="mt-2 text-2xl font-semibold text-[#222]">{work.title}</h1>

      <p className="mt-2 text-sm text-[#444]/80">{work.year}</p>

      {/* ✅ 이미지: year와 summary 사이 */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-[#e5e5e5] bg-white">
        <div className="relative w-full aspect-[16/10] bg-[#f3f3f3]">
          {hasImage ? (
            <Image
              src={work.thumb as string}
              alt={work.title}
              fill
              sizes="(max-width: 768px) 100vw, 960px"
              className="object-cover"
              priority
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs tracking-widest text-[#444]/60">NO IMAGE</span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-[#e5e5e5] bg-white p-6">
        <p className="text-sm leading-relaxed text-[#444]/85">{work.summary}</p>
      </div>

      <Link href="/work" className="mt-8 inline-flex text-sm font-medium text-[#222]">
        <span className="border-b border-[#222]/70 pb-0.5 hover:border-[#222]">
          Back to Work
        </span>
      </Link>
    </main>
  );
}
