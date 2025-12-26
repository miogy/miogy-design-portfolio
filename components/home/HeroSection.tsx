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
    <Link
      href={item.href}
      className="group relative overflow-hidden border border-[#e5e5e5] bg-white"
    >
      <div className="relative aspect-[4/3] w-full bg-[#f3f3f3]">
        {item.imageSrc ? (
          <Image
            src={item.imageSrc}
            alt={item.title}
            fill
            priority
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-[#f6f6f6] to-[#ededed]" />
        )}

        {/* bottom scrim */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />
        </div>

        {/* bottom overlay text (center like reference) */}
        <div className="absolute inset-x-0 bottom-0 p-6 text-center text-white">
          <h3 className="text-base font-semibold leading-snug md:text-lg">{item.title}</h3>
          <p className="mx-auto mt-2 max-w-[34ch] text-sm leading-relaxed text-white/90">
            {item.description}
          </p>

          <div className="mt-4 inline-flex items-center justify-center gap-2 text-sm font-medium">
            <span className="border-b border-white/80 pb-0.5 transition-all duration-300 group-hover:border-white">
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
  intro = "I create textile & graphic systems that work across product and screen—covering in-house design, promotions, artist IP, and learning archives.",
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
  return (
    <section className="mx-auto w-full max-w-6xl px-5 pt-14">
      {/* Text block */}
      <div className="flex flex-col items-center text-center">
        <p className="text-xs tracking-widest text-[#444]/70">{eyebrow}</p>
        <h1 className="mt-3 text-2xl font-semibold text-[#222] md:text-3xl">{title}</h1>

        <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#444]/80 md:text-[15px]">
          {intro}
        </p>

        <Link href={ctaHref} className="mt-5 text-sm font-medium text-[#222]">
          <span className="border-b border-[#222]/70 pb-0.5 hover:border-[#222]">{ctaLabel}</span>
        </Link>
      </div>

      {/* Cards row (3 columns, no gap like reference) */}
      <div className="mt-10 overflow-hidden border border-[#e5e5e5]">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {items.slice(0, 3).map((item) => (
            <ServiceCard key={item.href} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
