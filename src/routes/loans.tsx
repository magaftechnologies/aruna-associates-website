import { createFileRoute } from "@tanstack/react-router";
import { CibilSection, FaqSection, LoanJourneySection, LoanServicesSection } from "@/components/site/sections";
import { EnquirySection } from "@/components/site/enquiry";
import { SiteShell, PageHero } from "@/components/site/layout";
import { images } from "@/data/content";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/loans")({
  head: () => ({
    ...pageSeo(
      "/loans",
      "Loan Solutions — Aruna Associates",
      "Explore home, mortgage, project, MSME, balance transfer and top-up loan options in Hyderabad with Aruna Associates.",
    ),
  }),
  component: Page,
});

function Page() {
  return (
    <SiteShell overlay>
      <PageHero eyebrow="Loan Solutions" title="Financial Solutions For Your Next Step." copy="Guidance across home, mortgage, project and business finance — subject to eligibility and lender requirements." image={images.heroConsultation} />
      <LoanServicesSection full />
      <LoanJourneySection />
      <CibilSection />
      <FaqSection />
      <EnquirySection />
    </SiteShell>
  );
}
