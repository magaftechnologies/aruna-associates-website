import { createFileRoute } from "@tanstack/react-router";
import { business } from "@/data/business";
import { AboutSection, CibilSection, ConstructionSection, DreamStorySection, FaqSection, HaveLandSection, IntentSection, InteriorsSection, LoanJourneySection, LoanServicesSection, TestimonialsSection, TrustSection, WhyUsSection, LocationSection } from "@/components/site/sections";
import { HeroCarousel } from "@/components/site/hero";
import { ProjectCarousel, ProjectGallery } from "@/components/site/projects";
import { EnquirySection } from "@/components/site/enquiry";
import { SiteShell } from "@/components/site/layout";
import { absoluteSiteUrl, pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => {
    const homeUrl = absoluteSiteUrl("/");
    return {
      ...pageSeo(
      "/",
      "Aruna Associates | Home Loans & Financial Solutions in Hyderabad",
      "Explore home, mortgage, project and MSME loan options with Aruna Associates in Hyderabad, alongside loan transfers, top-ups, construction and interiors.",
      ),
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FinancialService",
          name: business.name,
          telephone: `+91${business.phone}`,
          ...(homeUrl ? { url: homeUrl } : {}),
          address: {
            "@type": "PostalAddress",
            streetAddress: business.address,
            addressLocality: "Malkajgiri",
            addressRegion: "Telangana",
            addressCountry: "IN",
          },
          areaServed: business.serviceArea,
        }),
      }],
    };
  },
  component: Page,
});

function Page() {
  return (
    <SiteShell overlay>
      <HeroCarousel />
      <TrustSection />
      <IntentSection />
      <LoanServicesSection />
      <CibilSection />
      <HaveLandSection />
      <ConstructionSection />
      <div id="work">
        <ProjectCarousel />
        <ProjectGallery />
      </div>
      <InteriorsSection />
      <WhyUsSection />
      <AboutSection />
      <LoanJourneySection />
      <DreamStorySection />
      <TestimonialsSection />
      <FaqSection />
      <EnquirySection />
      <LocationSection />
    </SiteShell>
  );
}
