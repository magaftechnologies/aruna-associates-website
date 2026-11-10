import { createFileRoute } from "@tanstack/react-router";
import { ProjectCarousel, ProjectGallery } from "@/components/site/projects";
import { EnquirySection } from "@/components/site/enquiry";
import { SiteShell, PageHero } from "@/components/site/layout";
import { images } from "@/data/content";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/work")({
  head: () => ({
    ...pageSeo(
      "/work",
      "Our Work — Aruna Associates Projects",
      "Explore selected residential construction and interior projects by the Aruna Associates team.",
    ),
  }),
  component: Page,
});

function Page() {
  return (
    <SiteShell overlay>
      <PageHero eyebrow="Our Work" title="Homes Shaped Around Families." copy="A showcase of selected projects and work completed by the Aruna Associates team." image={images.heroHome} />
      <ProjectCarousel />
      <ProjectGallery />
      <EnquirySection />
    </SiteShell>
  );
}
