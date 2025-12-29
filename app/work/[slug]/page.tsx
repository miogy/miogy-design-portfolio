// app/work/[slug]/page.tsx
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getWorkBySlug, toWorkItem, cleanStringArray, cleanLinks } from "@/lib/works";

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const { slug } = await Promise.resolve(params);

  const raw = await getWorkBySlug(slug);
  if (!raw) return notFound();

  // 리스트용 정규화(카테고리/연도/썸네일 등)
  const work = toWorkItem(raw);

  // 상세용 확장 필드
  const coverSrc = raw.cover || raw.thumbnail || work.thumb || "";
  const gallery = cleanStringArray(raw.gallery);
  const roles = cleanStringArray(raw.roles);
  const tools = cleanStringArray(raw.tools);
  const links = cleanLinks(raw.links);
  const content = raw.content ?? [];

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-16">
      <p className="text-xs tracking-widest text-[#444]/70">
        {String(work.category).toUpperCase()}
      </p>
      <h1 className="mt-2 text-2xl font-semibold text-[#222]">{work.title}</h1>
      <p className="mt-2 text-sm text-[#444]/80">{work.year}</p>

      {/* cover 이미지 */}
      {coverSrc ? (
        <div className="mt-8 overflow-hidden rounded-2xl border border-[#e5e5e5] bg-white">
          <div className="relative aspect-[16/10] w-full">
            <Image
              src={coverSrc}
              alt={work.title}
              fill
              sizes="(max-width: 768px) 100vw, 1024px"
              className="object-cover"
              unoptimized
              priority
            />
          </div>
        </div>
      ) : null}

      {/* 상세 본문 */}
      <div className="mt-8 bg-white p-6 text-center">
        {/* (description이 있으면 상단에 한 줄 요약으로 사용) */}
        {raw.description ? (
          <p className="text-sm leading-relaxed text-[#222]/85">{raw.description}</p>
        ) : null}

        {/* content 블록 렌더링 */}
        {content.length ? (
          <div className={raw.description ? "mt-6" : ""}>
            {content.map((block, i) => {
              if (!block) return null;

              if (block.type === "paragraph") {
                return (
                  <p key={`p-${i}`} className="mt-4 text-sm leading-relaxed text-[#444]/85">
                    {block.text}
                  </p>
                );
              }

              if (block.type === "bullets") {
                const items = (block.items ?? []).map((t) => String(t).trim()).filter(Boolean);
                if (!items.length) return null;

                return (
                  <div key={`bwrap-${i}`} className="mt-4">
              <ul className="inline-block list-disc space-y-2 pl-5 text-left text-sm text-[#444]/85">
                {items.map((t, j) => (
                  <li key={`bi-${i}-${j}`}>{t}</li>
                ))}
              </ul>
            </div>
                );
              }

              return null;
            })}
          </div>
        ) : (
          // content가 비어있으면 work.summary(=description 기반)라도 보여줌
          work.summary ? (
            <p className="mt-4 text-sm leading-relaxed text-[#444]/85">{work.summary}</p>
          ) : null
        )}
      </div>

      {/* gallery */}
      {gallery.length ? (
        <section className="mt-10">
          <h2 className="text-xs tracking-widest text-[#444]/70">COLORWAY</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            {gallery.map((src, idx) => (
              <div
                key={`g-${idx}-${src}`}
                className="overflow-hidden rounded-2xl border border-[#e5e5e5] bg-white"
              >
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={src}
                    alt={`${work.title} gallery ${idx + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 512px"
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* meta (roles / tools / client / links) */}
      {(raw.client || roles.length || tools.length || links.length) ? (
        <div className="mt-10 text-center">
    <section className="inline-block w-full max-w-3xl rounded-2xl border border-[#e5e5e5] bg-white p-6 text-left">
      <h2 className="text-xs tracking-widest text-[#444]/70">META</h2>

      <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
        {raw.client ? (
          <div>
            <p className="text-xs tracking-widest text-[#444]/70">CLIENT</p>
            <p className="mt-2 text-sm text-[#222]">{raw.client}</p>
          </div>
        ) : null}

        {roles.length ? (
          <div>
            <p className="text-xs tracking-widest text-[#444]/70">ROLES</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {roles.map((r) => (
                <span
                  key={`role-${r}`}
                  className="rounded-full border border-[#000]/10 bg-white px-3 py-1 text-xs text-[#222]"
                >
                  {r}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        {tools.length ? (
          <div>
            <p className="text-xs tracking-widest text-[#444]/70">TOOLS</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {tools.map((t) => (
                <span
                  key={`tool-${t}`}
                  className="rounded-full border border-[#000]/10 bg-white px-3 py-1 text-xs text-[#222]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        {links.length ? (
          <div className="md:col-span-2">
            <p className="text-xs tracking-widest text-[#444]/70">LINKS</p>
            <div className="mt-3 flex flex-col gap-2">
              {links.map((l) => (
                <a
                  key={`link-${l.url}`}
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[#222]"
                >
                  <span className="border-b border-[#222]/60 pb-0.5 hover:border-[#222]">
                    {l.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  </div>
      ) : null}

      <Link href="/work" className="mt-10 inline-flex text-sm font-medium text-[#222]">
        <span className="border-b border-[#222]/70 pb-0.5 hover:border-[#222]">
          Back to Work
        </span>
      </Link>
    </main>
  );
}
