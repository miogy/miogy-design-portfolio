// components/home/HeroSection.tsx
import Link from "next/link";
import Image from "next/image";

type HeroCardItem = {
  href: string;
  title: string;
  description: string;
  imageSrc?: string;
};

function ServiceCard({ item }: { item: HeroCardItem }) {
  return (
    <Link href={item.href} className="group block h-full w-full bg-white">
      {/* 4:5 ratio (reference-like) */}
      <div className="relative aspect-[4/5] w-full bg-[#f3f3f3]">
        {item.imageSrc ? (
          <Image
            src={item.imageSrc}
            alt={item.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 85vw, (max-width: 1200px) 45vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-[#f6f6f6] to-[#ededed]" />
        )}

        {/* bottom scrim */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />
        </div>

        {/* bottom overlay text */}
        <div className="absolute inset-x-0 bottom-0 px-7 pb-9 pt-6 text-center text-white md:px-9 md:pb-10">
          <h3 className="text-lg font-semibold leading-snug md:text-xl">{item.title}</h3>

          <p className="mx-auto mt-3 max-w-[36ch] text-sm leading-relaxed text-white/90 md:text-[15px]">
            {item.description}
          </p>

          <div className="mt-6 inline-flex items-center justify-center text-sm font-medium">
            <span className="border-b border-white/80 pb-0.5 group-hover:border-white">
              Discover
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function HeroServicesSection({
  eyebrow = "WELCOME!",
  title = "Miogy Portfolio.",
  intro = "A design studio-style portfolio with calm white UI. I work across textile prints, promotions, artist IP, and learning archives.",
  ctaLabel = "View details",
  ctaHref = "/about",
  items,
}: {
  eyebrow?: string;
  title?: string;
  intro?: string;
  ctaLabel?: string;
  ctaHref?: string;
  items: HeroCardItem[];
}) {
  const list = items.slice(0, 3);

  return (
    <section className="w-full bg-white text-[#444]">
      {/* Text block */}
      <div className="mx-auto w-full max-w-6xl px-5 pt-14">
        <div className="flex flex-col items-center text-center">
          <p className="text-xs tracking-widest text-[#444]/70">{eyebrow}</p>
          <h1 className="mt-3 text-2xl font-semibold text-[#222] md:text-3xl">{title}</h1>

          <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#444]/80 md:text-[15px]">
            {intro}
          </p>

          <Link href={ctaHref} className="mt-5 text-sm font-medium text-[#222]">
            <span className="border-b border-[#222]/70 pb-0.5 hover:border-[#222]">
              {ctaLabel}
            </span>
          </Link>
        </div>
      </div>

      {/* Cards */}
      <div className="mx-auto mt-10 w-full px-5">
        {/* Desktop/tablet: centered row with separators, responsive widths */}
        <div className="hidden md:block">
          <div className="mx-auto w-full max-w-6xl overflow-hidden border border-[#e5e5e5] bg-white">
            <div className="grid grid-cols-3">
              {list.map((item, idx) => (
                <div
                  // key={item.href}
                  key={`${item.href}-${idx}`}
                  className={[
                    "min-w-0",
                    idx !== list.length - 1 ? "border-r border-[#e5e5e5]" : "",
                  ].join(" ")}
                >
                  <ServiceCard item={item} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: horizontal scroll, snap one-by-one */}
        <div className="md:hidden">
          <div className="overflow-hidden border border-[#e5e5e5] bg-white">
            <div
              className={[
                "flex w-full gap-0 overflow-x-auto",
                "snap-x snap-mandatory",
                "scroll-px-5",
              ].join(" ")}
              style={{
                WebkitOverflowScrolling: "touch",
              }}
            >
              {list.map((item, idx) => (
                <div
                  // key={item.href}
                  key={`${item.href}-${idx}`}
                  className={[
                    "snap-center",
                    "shrink-0",
                    "w-[88%]",
                    "border-r border-[#e5e5e5]",
                    idx === list.length - 1 ? "border-r-0" : "",
                  ].join(" ")}
                >
                  <ServiceCard item={item} />
                </div>
              ))}
            </div>
          </div>

          {/* optional small hint spacing */}
          <p className="mt-3 text-center text-xs text-[#444]/60">
            Swipe →
          </p>
        </div>

        {/* <div className="mx-auto mt-10 max-w-6xl border-b border-[#e5e5e5]" /> */}
      </div>
    </section>
  );
}
