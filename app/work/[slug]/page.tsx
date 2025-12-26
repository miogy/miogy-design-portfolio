// app/work/[slug]/page.tsx
import { WORKS } from "@/lib/mockData";
import Link from "next/link";

export default function WorkDetailPage({ params }: { params: { slug: string } }) {
  const work = WORKS.find((w) => w.slug === params.slug);

  if (!work) {
    return (
      <main className="mx-auto w-full max-w-6xl px-5 py-16">
        <h1 className="text-2xl font-semibold text-[#222]">Not found</h1>
        <p className="mt-3 text-sm text-[#444]/80">This work does not exist yet.</p>
        <Link href="/work" className="mt-6 inline-flex text-sm font-medium text-[#222]">
          <span className="border-b border-[#222]/70 pb-0.5 hover:border-[#222]">Back to Work</span>
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-16">
      <p className="text-xs tracking-widest text-[#444]/70">{work.category.toUpperCase()}</p>
      <h1 className="mt-2 text-2xl font-semibold text-[#222]">{work.title}</h1>
      <p className="mt-2 text-sm text-[#444]/80">{work.year}</p>

      <div className="mt-8 rounded-2xl border border-[#e5e5e5] bg-white p-6">
        <p className="text-sm leading-relaxed text-[#444]/85">{work.summary}</p>
        <p className="mt-4 text-xs text-[#444]/60">
          (Next: connect real images + full description from artworks-contents)
        </p>
      </div>

      <Link href="/work" className="mt-8 inline-flex text-sm font-medium text-[#222]">
        <span className="border-b border-[#222]/70 pb-0.5 hover:border-[#222]">Back to Work</span>
      </Link>
    </main>
  );
}
