// app/page.tsx
import HeroServicesSection from "@/components/home/HeroSection";
import HomeTabsSection from "@/components/home/HomeTabsSection";
import { getHomeHeroItems, loadWorks } from "@/lib/works";

export default function Page() {
  const works = loadWorks();
  const heroItems = getHomeHeroItems(works);

  return (
    <main className="bg-white text-[#444]">
      <HeroServicesSection
        eyebrow="WELCOME!"
        title="Miogy Portfolio."
        intro="A design studio-style portfolio with calm white UI. I work across textile prints, brand graphics, and web presentation."
        ctaLabel="View details"
        ctaHref="/about"
        items={heroItems}
      />
      <HomeTabsSection />
    </main>
  );
}

