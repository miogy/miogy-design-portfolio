// app/about/page.tsx (Next.js App Router 기준)
// pages 라우터를 쓰면 components/AboutPage.tsx로 옮겨서 사용해도 OK

import about from "../../data-modules/data-modules/about.json";

type AboutData = {
  intro: {
    headline: string;
    summary: string;
    coreCompetency: string[];
    skills: string[];
    email?: string;
    links?: { label: string; url: string }[];
  };
  experience: Array<{
    company: string;
    position: string;
    employmentType?: string;
    period?: { from?: string; to?: string };
    roleSummary?: string | string[];
    responsibilities?: string[];
    achievements?: string[];
    reasonForLeaving?: string | null;
  }>;
};

function toArray(v?: string | string[]) {
  if (!v) return [];
  return Array.isArray(v) ? v : [v];
}

function cleanBullet(s: string) {
  // "- " 로 시작하는 문자열 정리
  return s.replace(/^\s*-\s*/, "").trim();
}

function formatYM(ym?: string) {
  // "2025-03" -> "2025.03"
  if (!ym) return "";
  const m = ym.match(/^(\d{4})-(\d{2})$/);
  if (!m) return ym;
  return `${m[1]}.${m[2]}`;
}

function formatPeriod(from?: string, to?: string) {
  const f = formatYM(from);
  const t = to ? formatYM(to) : "Present";
  if (!f && !t) return "";
  if (!f) return t;
  return `${f} — ${t}`;
}

function sortByFromDesc(items: AboutData["experience"]) {
  return [...items].sort((a, b) => {
    const af = a.period?.from ?? "";
    const bf = b.period?.from ?? "";
    return bf.localeCompare(af);
  });
}

export default function AboutPage() {
  const data = about as unknown as AboutData;
  const intro = data.intro;
  const exp = sortByFromDesc(data.experience);

  return (
    <main className="mx-auto w-full max-w-6xl px-5 pb-16 pt-10">
      <p className="text-xs tracking-widest text-[#444]/70">ABOUT</p>

      <div className="mt-2 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#222]">About Miogy</h1>
          <p className="mt-2 text-sm text-[#444]/80">{intro.headline}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <a
            href="#intro"
            className="rounded-full border border-[#e5e5e5] bg-white px-3 py-1 text-xs text-[#222] hover:bg-[#f6f6f6]"
          >
            Intro
          </a>
          <a
            href="#career"
            className="rounded-full border border-[#e5e5e5] bg-white px-3 py-1 text-xs text-[#222] hover:bg-[#f6f6f6]"
          >
            Career
          </a>
        </div>
      </div>

      {/* Intro */}
      <section className="mt-8 rounded-2xl border border-[#e5e5e5] bg-white p-6">
        <h2 id="intro" className="text-lg font-semibold text-[#222]">
          Introduction
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-[#444]/85">
          {intro.summary}
        </p>

        {/* Core Competency */}
        <h3 className="mt-8 text-sm font-semibold text-[#222]">Core competency</h3>
        <ul className="mt-3 grid gap-2 md:grid-cols-2">
          {intro.coreCompetency?.map((item, idx) => (
            <li
              key={`${item}-${idx}`}
              className="rounded-xl border border-[#ededed] bg-[#fafafa] p-3 text-sm leading-relaxed text-[#333]/90"
            >
              {item}
            </li>
          ))}
        </ul>

        {/* Skills */}
        <h3 className="mt-8 text-sm font-semibold text-[#222]">Skills</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {intro.skills?.map((s) => (
            <span
              key={s}
              className="rounded-full border border-[#e5e5e5] bg-white px-3 py-1 text-xs text-[#222]"
            >
              {s}
            </span>
          ))}
        </div>

        {/* Contact */}
        <div className="mt-8 rounded-xl border border-[#ededed] bg-[#fafafa] p-4">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs tracking-widest text-[#444]/70">CONTACT</p>
              {intro.email ? (
                <a
                  href={`mailto:${intro.email}`}
                  className="mt-1 inline-block text-sm font-medium text-[#222] hover:underline"
                >
                  {intro.email}
                </a>
              ) : (
                <p className="mt-1 text-sm text-[#444]/80">(email not set)</p>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {(intro.links ?? [])
                .filter((l) => l?.url)
                .map((l) => (
                  <a
                    key={l.label}
                    href={l.url}
                    target={l.url.startsWith("http") ? "_blank" : undefined}
                    rel={l.url.startsWith("http") ? "noreferrer" : undefined}
                    className="rounded-full border border-[#e5e5e5] bg-white px-3 py-1 text-xs text-[#222] hover:bg-[#f6f6f6]"
                  >
                    {l.label}
                  </a>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Career */}
      <section
        id="career"
        className="mt-10 rounded-2xl border border-[#e5e5e5] bg-white p-6"
      >
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-[#222]">Career</h2>
            <p className="mt-2 text-sm text-[#444]/80">
              총 {exp.length}개 경력 항목
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4">
          {exp.map((e, idx) => {
            const periodText = formatPeriod(e.period?.from, e.period?.to);
            const role = toArray(e.roleSummary);
            const responsibilities = (e.responsibilities ?? []).map(cleanBullet);
            const achievements = (e.achievements ?? []).map(cleanBullet);

            return (
              <article
                key={`${e.company}-${e.position}-${idx}`}
                className="rounded-2xl border border-[#ededed] bg-white p-5"
              >
                <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-[#222]">
                      {e.company}
                    </h3>
                    <p className="mt-1 text-sm text-[#444]/85">{e.position}</p>

                    <div className="mt-2 flex flex-wrap gap-2">
                      {e.employmentType ? (
                        <span className="rounded-full border border-[#e5e5e5] bg-[#fafafa] px-2.5 py-1 text-[11px] text-[#333]/90">
                          {e.employmentType}
                        </span>
                      ) : null}
                      {periodText ? (
                        <span className="rounded-full border border-[#e5e5e5] bg-[#fafafa] px-2.5 py-1 text-[11px] text-[#333]/90">
                          {periodText}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  {e.reasonForLeaving ? (
                    <div className="md:max-w-[320px]">
                      <p className="text-xs tracking-widest text-[#444]/70">
                        NOTE
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-[#444]/85">
                        {e.reasonForLeaving}
                      </p>
                    </div>
                  ) : null}
                </div>

                {role.length > 0 ? (
                  <div className="mt-4">
                    <p className="text-xs tracking-widest text-[#444]/70">
                      ROLE
                    </p>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-[#444]/85">
                      {role.map((r, i) => (
                        <li key={`${r}-${i}`}>{cleanBullet(r)}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {responsibilities.length > 0 ? (
                  <div className="mt-4">
                    <p className="text-xs tracking-widest text-[#444]/70">
                      RESPONSIBILITIES
                    </p>
                    <ul className="mt-2 grid gap-2 md:grid-cols-2">
                      {responsibilities.map((r, i) => (
                        <li
                          key={`${r}-${i}`}
                          className="rounded-xl border border-[#ededed] bg-[#fafafa] p-3 text-sm leading-relaxed text-[#333]/90"
                        >
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {achievements.length > 0 ? (
                  <div className="mt-4">
                    <p className="text-xs tracking-widest text-[#444]/70">
                      ACHIEVEMENTS
                    </p>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-[#444]/85">
                      {achievements.map((a, i) => (
                        <li key={`${a}-${i}`}>{a}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
