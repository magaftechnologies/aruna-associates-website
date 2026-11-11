import { createFileRoute } from "@tanstack/react-router";
import { AboutSection, DreamStorySection, TrustSection, WhyUsSection } from "@/components/site/sections";
import { SiteShell, PageHero } from "@/components/site/layout";
import { images } from "@/data/content";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => ({
    ...pageSeo(
      "/about",
      "About Aruna Associates — Malkajgiri, Hyderabad",
      "Learn how Aruna Associates in Malkajgiri, Hyderabad guides customers through financial solutions and their wider home journey.",
    ),
  }),
  component: Page,
});

function Page() {
  return (
    <SiteShell overlay>
      <PageHero eyebrow="About" title="More Than Finance. Part of Your Journey." copy="A Hyderabad team guiding customers from finance to front door." image={images.heroFamily} />
      <AboutSection />
      <TrustSection />
      <WhyUsSection />
      <DreamStorySection />
    </SiteShell>
  );
}
