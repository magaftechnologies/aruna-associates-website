import { createFileRoute } from "@tanstack/react-router";
import { FaqSection, LocationSection } from "@/components/site/sections";
import { EnquirySection } from "@/components/site/enquiry";
import { SiteShell, PageHero } from "@/components/site/layout";
import { images } from "@/data/content";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => ({
    ...pageSeo(
      "/contact",
      "Contact Aruna Associates — Request a Call Back",
      "Call, WhatsApp or send an enquiry to Aruna Associates at Old Safilguda, Malkajgiri, Hyderabad.",
    ),
  }),
  component: Page,
});

function Page() {
  return (
    <SiteShell overlay>
      <PageHero eyebrow="Contact" title="Let's Talk About Your Next Step." copy="Call, WhatsApp or share your requirement — we'll get back to you." image={images.heroConsultation} />
      <EnquirySection />
      <LocationSection />
      <FaqSection />
    </SiteShell>
  );
}
