// app/page.tsx
import HeroServicesSection from "@/components/home/HeroSection";
import HomeTabsSection from "@/components/home/HomeTabsSection";
import { buildHeroItemsFromWorks, getWorks } from "@/lib/works";

export default async function Page() {
  const works = await getWorks();
  const heroItems = buildHeroItemsFromWorks(works);

  console.log("[home] works loaded:", works.length);

  return (
    <main className="bg-white text-[#444]">
      <HeroServicesSection
        eyebrow="WELCOME!"
        title="Miogy Portfolio."
        intro="Fashion Graphics | Textile Design | Web/App"
        ctaLabel="View details"
        ctaHref="/work"
        items={heroItems.map((it) => ({
          key: it.key,
          href: it.href,
          title: it.title,
          description: it.description,
          imageSrc: it.imageSrc ?? null, // works.json에서 thumbnail/cover가 들어오면 자동 적용
        }))}
      />

      <HomeTabsSection />
    </main>
  );
}


