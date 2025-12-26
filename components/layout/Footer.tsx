// components/layout/Footer.tsx
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type FooterGroup = {
  title: string;
  links: { label: string; href: string }[];
};

function IconButton({
  label,
  href,
  children,
}: {
  label: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      aria-label={label}
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#e5e5e5] bg-white text-[#222] hover:border-[#222]/40"
    >
      {children}
    </a>
  );
}

export default function Footer() {
  const groups: FooterGroup[] = useMemo(
    () => [
      {
        title: "CONTACT",
        links: [
          { label: "Project request", href: "/contact" },
          { label: "Interview / Media", href: "/contact" },
          { label: "Email", href: "/contact" },
        ],
      },
      {
        title: "STUDIO",
        links: [
          { label: "Services", href: "/about" },
          { label: "Workflow", href: "/about" },
          { label: "Availability", href: "/contact" },
        ],
      },
      {
        title: "WORK",
        links: [
          { label: "In-house", href: "/work?category=in-house" },
          { label: "Promotion", href: "/work?category=promotion" },
          { label: "Artist IP", href: "/work?category=artist-ip" },
          { label: "Archive", href: "/work?category=archive" },
        ],
      },
      {
        title: "LEGAL",
        links: [
          { label: "Privacy Policy", href: "/contact" },
          { label: "Copyright", href: "/contact" },
          { label: "Terms", href: "/contact" },
        ],
      },
    ],
    []
  );

  const [openKey, setOpenKey] = useState<string | null>(groups[0]?.title ?? null);

  return (
    <footer className="mt-16 w-full border-t border-[#e5e5e5] bg-white">
      <div className="mx-auto w-full max-w-6xl px-5 py-12">
        {/* Top grid (left accordion / right newsletter) */}
        <div className="grid gap-10 md:grid-cols-[1fr_360px]">
          {/* Left: accordion list */}
          <div className="space-y-2">
            {groups.map((g) => {
              const isOpen = openKey === g.title;
              return (
                <div key={g.title} className="border-b border-[#e5e5e5] py-4">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between text-left text-sm font-semibold tracking-widest text-[#444]"
                    onClick={() => setOpenKey(isOpen ? null : g.title)}
                  >
                    <span>{g.title}</span>
                    <span className="text-[#444]/60">{isOpen ? "—" : "+"}</span>
                  </button>

                  {isOpen ? (
                    <ul className="mt-4 space-y-2 text-sm text-[#444]/85">
                      {g.links.map((l) => (
                        <li key={l.label}>
                          <Link href={l.href} className="hover:text-[#222]">
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              );
            })}
          </div>

          {/* Right: newsletter + socials */}
          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold tracking-widest text-[#444]">
                SUBSCRIBE TO OUR UPDATES
              </p>

              <div className="mt-4">
                <label className="block text-xs text-[#444]/70">Email address *</label>
                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="h-11 w-full rounded-full border border-[#e5e5e5] bg-white px-4 text-sm text-[#444] outline-none focus:border-[#222]/40"
                  />
                  <button
                    type="button"
                    className="h-11 shrink-0 rounded-full bg-[#222] px-5 text-sm font-medium text-white"
                  >
                    Subscribe
                  </button>
                </div>

                <p className="mt-3 text-xs leading-relaxed text-[#444]/70">
                  By subscribing, you agree to receive occasional updates. You can unsubscribe
                  anytime.
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold tracking-widest text-[#444]">FOLLOW</p>
              <div className="mt-3 flex items-center gap-2">
                {/* Simple inline icons (no external lib) */}
                <IconButton label="Instagram" href="https://www.instagram.com/">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                    <path
                      d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                    <path
                      d="M17.5 6.5h.01"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </IconButton>

                <IconButton label="X" href="https://x.com/">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M4 4l16 16M20 4L4 20"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </IconButton>

                <IconButton label="Behance" href="https://www.behance.net/">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M4 6h7a3 3 0 0 1 0 6H4V6Z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                    <path
                      d="M4 12h8a3 3 0 0 1 0 6H4v-6Z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                    <path
                      d="M14 10h6M14 16h6"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </IconButton>

                <IconButton label="Pinterest" href="https://www.pinterest.com/">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12c0 4.2 2.6 7.8 6.3 9.2"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                    <path
                      d="M9.5 19.5l1.4-5.8"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M10.7 12.6c-.6-2.6 2.1-4.7 4.5-3.5 2.3 1.1 1.6 5.6-1.3 5.6-1.2 0-2.1-.6-2.4-1.5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </IconButton>
              </div>

              <p className="mt-4 text-xs text-[#444]/70">
                Thank you for visiting. Let’s make something beautiful.
              </p>
            </div>
          </div>
        </div>

        {/* Big logo area */}
        <div className="mt-12 border-t border-[#e5e5e5] pt-10">
          <div className="select-none text-[72px] font-black leading-none tracking-tight text-[#222] md:text-[140px]">
            miogy
          </div>

          <div className="mt-6 flex flex-col gap-2 text-xs text-[#444]/70 md:flex-row md:items-center md:justify-between">
            <p>© MIOGY 2025 · All rights reserved</p>
            <p>SPAIN/SPANISH (layout reference)</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
