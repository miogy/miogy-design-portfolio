// app/page.tsx
import HeroServicesSection from "@/components/home/HeroSection";
import HomeTabsSection from "@/components/home/HomeTabsSection";

export default function Page() {
  return (
    <main className="bg-white text-[#444]">
      <HeroServicesSection
        eyebrow="WELCOME!"
        title="Miogy Portfolio."
        intro="A design studio-style portfolio with calm white UI. I work across textile prints, brand graphics, and web presentation."
        ctaLabel="View details"
        ctaHref="/about"
        items={[
          {
            href: "/work/le-studio-ss25-boho-print",
            title: "In-house / Textile Design",
            description: "Seasonal print direction and production-ready artwork for apparel & goods.",
            imageSrc: "/placeholder/hero-1.jpg",
          },
          {
            href: "/work/fabric-promo-fw25",
            title: "Promotion / Key Visual",
            description: "Campaign visuals, POP assets, and consistent brand presentation systems.",
            imageSrc: "/placeholder/hero-3.jpg",
          },
          {
            href: "/work/sunny-jade-ip-series-01",
            title: "Artist IP / Graphic System",
            description: "Character-driven graphics and merch-ready assets for storytelling brand lines.",
            imageSrc: "/placeholder/hero-2.jpg",
          },
        ]}
      />

      <HomeTabsSection />
    </main>
  );
}
