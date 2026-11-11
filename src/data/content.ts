import { Home, Landmark, Building2, Briefcase, ArrowLeftRight, TrendingUp, type LucideIcon } from "lucide-react";
import heroHome from "@/assets/hero-home.webp";
import heroFamily from "@/assets/hero-family.webp";
import heroConstruction from "@/assets/hero-construction.webp";
import heroInterior from "@/assets/hero-interior.webp";
import heroConsultation from "@/assets/hero-consultation.webp";
import landPlot from "@/assets/land-plot.webp";
import bedroom from "@/assets/interior-bedroom.webp";
import kitchen from "@/assets/interior-kitchen.webp";
import dining from "@/assets/interior-dining.webp";
import familyHome from "@/assets/project-family-home.webp";
import villaTall from "@/assets/project-villa-tall.webp";
import planning from "@/assets/construction-planning.webp";

export const images = {
  heroHome, heroFamily, heroConstruction, heroInterior, heroConsultation,
  landPlot, bedroom, kitchen, dining, familyHome, villaTall, planning,
};

export type Cta = { label: string; to: string; whatsapp?: boolean };

export const heroSlides = [
  {
    image: heroHome,
    eyebrow: "Home Loans & Mortgage Solutions",
    title: "Home Loans & Financial Solutions for Your Next Step.",
    copy: "Home Loans, Mortgage Solutions and guidance for your next step toward owning or building a home.",
    primary: { label: "Get a Loan Consultation", to: "/contact" },
    secondary: { label: "WhatsApp Us", to: "", whatsapp: true },
  },
  {
    image: heroFamily,
    eyebrow: "Finance",
    title: "From Finance to Your Front Door.",
    copy: "Explore suitable financial options and take the next step toward your dream home.",
    primary: { label: "Explore Loan Solutions", to: "/loans" },
  },
  {
    image: heroConstruction,
    eyebrow: "Construction",
    title: "Have Land? Let's Build Your Dream.",
    copy: "Explore the journey from land and financing to construction.",
    primary: { label: "Discuss Your Project", to: "/construction" },
  },
  {
    image: heroInterior,
    eyebrow: "Interiors",
    title: "Complete Your Home With Spaces You Love.",
    copy: "Construction and interior solutions designed around your vision.",
    primary: { label: "Explore Our Work", to: "/work" },
  },
  {
    image: heroConsultation,
    eyebrow: "Aruna Associates",
    title: "Experience. Guidance. A Clearer Way Forward.",
    copy: "Aruna Associates helps customers navigate their financial and home journey.",
    primary: { label: "Talk to Aruna Associates", to: "/contact" },
  },
] satisfies { image: string; eyebrow: string; title: string; copy: string; primary: Cta; secondary?: Cta }[];

export const intents = [
  { title: "Buy a Home", copy: "Explore suitable home financing options.", image: heroFamily, to: "/loans" },
  { title: "Build on Your Land", copy: "Explore financing and construction pathways.", image: landPlot, to: "/construction" },
  { title: "Property-backed Finance", copy: "Explore mortgage and property-backed financing options.", image: heroConsultation, to: "/loans" },
  { title: "Build & Complete", copy: "Construction and interior solutions.", image: heroInterior, to: "/interiors" },
];

export type LoanService = {
  id: string;
  title: string;
  copy: string;
  icon: LucideIcon;
  image: string;
  imageAlt: string;
};

export const loanServices: LoanService[] = [
  { id: "home", title: "Home Loans", icon: Home, image: heroFamily, imageAlt: "A family arriving at their new home", copy: "Guidance on financing a ready, under-construction or resale home, matched to your profile and lender criteria." },
  { id: "mortgage", title: "Mortgage Loans", icon: Landmark, image: heroConsultation, imageAlt: "A financial adviser reviewing documents with a couple", copy: "Explore finance against residential or commercial property you already own, for personal or business needs." },
  { id: "project", title: "Project Loans", icon: Building2, image: heroConstruction, imageAlt: "A residential building under construction at sunset", copy: "Support in understanding financing options for residential and small-scale construction projects." },
  { id: "msme", title: "MSME Loans", icon: Briefcase, image: planning, imageAlt: "Two construction professionals reviewing building plans at a site", copy: "Explore working capital and business finance options for small and medium enterprises." },
  { id: "bt", title: "Loan Balance Transfer", icon: ArrowLeftRight, image: heroHome, imageAlt: "A modern home exterior at sunset", copy: "Review whether moving an existing loan to another lender could suit your current requirement." },
  { id: "topup", title: "Top-Up Loans", icon: TrendingUp, image: familyHome, imageAlt: "A contemporary family home exterior", copy: "Understand additional funding options on an existing home loan, subject to lender eligibility." },
];

export const loanJourney = [
  { title: "Understand", copy: "Tell us what you need." },
  { title: "Explore", copy: "Review suitable financing possibilities." },
  { title: "Guide", copy: "Understand the next steps and documentation." },
  { title: "Apply", copy: "Proceed based on applicable lender requirements." },
  { title: "Move Forward", copy: "Take the next step toward your goal." },
];

export const dreamStory = [
  { key: "Dream", copy: "Every home begins as a picture in someone's mind — a place for family, for comfort, for the years ahead.", image: heroHome },
  { key: "Finance", copy: "The right financial solution turns that picture into a plan you can act on.", image: heroConsultation },
  { key: "Property", copy: "A plot or a ready home — the place where your plan finds its ground.", image: landPlot },
  { key: "Build", copy: "Planning, structure and execution take shape, one stage at a time.", image: heroConstruction },
  { key: "Design", copy: "Interiors that reflect how you want to live, not just how a room should look.", image: heroInterior },
  { key: "Live", copy: "The door opens. The journey becomes home.", image: heroFamily },
];

export const constructionStages = [
  { title: "Planning", copy: "Understanding your land, requirement and budget before anything begins." },
  { title: "Construction", copy: "Structured progress from foundation to frame." },
  { title: "Execution", copy: "Coordinated work across trades and stages." },
  { title: "Finishing", copy: "Final detailing that makes the house ready to live in." },
];

export const interiorCategories = [
  { name: "Living Room", image: heroInterior },
  { name: "Bedroom", image: bedroom },
  { name: "Kitchen", image: kitchen },
  { name: "Full Home", image: dining },
];

export const whyUs = [
  { title: "15+ Years of Experience", copy: "Guidance shaped by more than 15 years of experience and built around customer requirements." },
  { title: "55 Banking & Non-banking Connections", copy: "Explore lending options through our banking and non-banking institution connections, where applicable." },
  { title: "Personalized Guidance", copy: "Understand the requirement before suggesting the next step." },
  { title: "Home Journey Support", copy: "Finance, construction and interiors under one broader journey." },
];

export const faqs = [
  { q: "What types of loan solutions do you assist with?", a: "We assist customers in exploring Home Loans, Mortgage Loans, Project Loans, MSME Loans, Loan Balance Transfers and Top-Up Loans. The options available to you depend on your profile and the applicable lender's criteria." },
  { q: "Can I enquire if I already own land?", a: "Yes. If you own land and are considering building on it, you can discuss both the financing and construction side of your plan with us." },
  { q: "Can I enquire about construction requirements?", a: "Yes. Share your land details and requirement, and we can discuss the possible next steps for your project." },
  { q: "Do you assist with mortgage-related requirements?", a: "Yes. We help customers understand property-backed financing options. Eligibility, loan amount and terms are decided by the lender." },
  { q: "What documents may be required?", a: "Typically identity and address proof, income documents, bank statements and property papers. The exact list varies by lender and loan type — we will guide you once we understand your requirement." },
  { q: "Can I enquire if I have concerns about my CIBIL profile?", a: "Yes. We can help you understand which options may be available based on your profile and applicable lender criteria. We cannot guarantee approval." },
  { q: "How can I contact Aruna Associates?", a: "Call or WhatsApp us, fill in the enquiry form on this website, or visit our office in Old Safilguda, Malkajgiri." },
  { q: "Which areas do you serve?", a: "We primarily serve customers in Hyderabad and surrounding areas." },
];

export const requirementOptions = [
  "Home Loan", "Mortgage Loan", "Project Loan", "MSME Loan", "Balance Transfer", "Top-Up Loan", "Construction", "Interiors", "Other",
];
