import { createFileRoute } from "@tanstack/react-router";
import { InteriorsSection } from "@/components/site/sections";
import { ProjectGallery } from "@/components/site/projects";
import { EnquirySection } from "@/components/site/enquiry";
import { interiorProjects } from "@/data/projects";
import { SiteShell, PageHero } from "@/components/site/layout";
import { images } from "@/data/content";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/interiors")({
  head: () => ({
    ...pageSeo(
      "/interiors",
      "Interior Solutions — Aruna Associates",
      "Explore living room, bedroom, kitchen and full-home interior solutions in Hyderabad.",
    ),
  }),
  component: Page,
});

function Page() {
  return (
    <SiteShell overlay>
      <PageHero eyebrow="Interiors" title="Designed Beyond the Walls." copy="Interior solutions that complete the home, designed around your vision." image={images.heroInterior} />
      <InteriorsSection />
      <ProjectGallery items={interiorProjects} title="Interior Projects" />
      <EnquirySection />
    </SiteShell>
  );
}
