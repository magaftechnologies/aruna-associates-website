import { createFileRoute } from "@tanstack/react-router";
import { ConstructionSection, HaveLandSection } from "@/components/site/sections";
import { ProjectCarousel } from "@/components/site/projects";
import { EnquirySection } from "@/components/site/enquiry";
import { SiteShell, PageHero } from "@/components/site/layout";
import { images } from "@/data/content";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/construction")({
  head: () => ({
    ...pageSeo(
      "/construction",
      "Home Construction — Aruna Associates",
      "Explore planning, construction, execution and finishing support for your home journey in Hyderabad.",
    ),
  }),
  component: Page,
});

function Page() {
  return (
    <SiteShell overlay>
      <PageHero eyebrow="Construction" title="From Your Land to Your Home." copy="Explore the journey from land and financing to construction." image={images.heroConstruction} />
      <ConstructionSection />
      <HaveLandSection />
      <ProjectCarousel />
      <EnquirySection />
    </SiteShell>
  );
}
