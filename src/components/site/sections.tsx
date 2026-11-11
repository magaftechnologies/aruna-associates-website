import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal, SectionHead, Logo } from "./layout";
import { trustMetrics, whatsappLink, whatsappMessages, business, telLink } from "@/data/business";
import { Phone, MapPin, Clock } from "lucide-react";
import {
  intents, loanServices, loanJourney, dreamStory, constructionStages, interiorCategories,
  whyUs, faqs, images,
} from "@/data/content";
import { cn } from "@/lib/utils";

function Counter({ value }: { value: string }) {
  const match = value.match(/^(\d+)(.*)$/);
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState<number | null>(null);
  useEffect(() => {
    if (!match || !ref.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const target = Number(match[1]);
    const io = new IntersectionObserver(([e]) => {
      if (!e?.isIntersecting) return;
      io.disconnect();
      setN(0);
      const t0 = performance.now();
      const tick = (t: number) => { const p = Math.min(1, (t - t0) / 1400); setN(Math.round(target * (1 - Math.pow(1 - p, 3)))); if (p < 1) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      <span className="sr-only">{value}</span>
      <span ref={ref} aria-hidden="true" className="tabular-nums">
        {match && n !== null ? `${n}${match[2]}` : value}
      </span>
    </>
  );
}

export function TrustSection() {
  return (
    <section id="trust" className="bg-ivory py-24 md:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHead eyebrow="Why customers come to us" title="Experience You Can Build On." copy="Practical financial guidance for homeowners, families and businesses across Hyderabad." />
        </div>
        <dl className="grid grid-cols-2 border-l border-t border-border lg:col-span-7">
          {trustMetrics.map((m, k) => (
            <Reveal key={m.label} delay={k * 90} className="border-b border-r border-border p-4 sm:p-6 md:p-10">
              <dt className="sr-only">{m.label}</dt>
              <dd className="font-display text-xl text-charcoal sm:text-4xl xl:text-6xl"><Counter value={m.value} /></dd>
              <dd className="mt-3 text-sm text-muted-foreground">{m.label}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function IntentSection() {
  return (
    <section id="intent" className="bg-ivory pb-24 md:pb-32">
      <div className="container-x">
        <SectionHead eyebrow="Start here" title="What Brings You Here?" />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {intents.map((it, k) => (
            <Reveal key={it.title} delay={k * 80}>
              <Link to={it.to} className="group relative block aspect-[3/4] overflow-hidden bg-charcoal">
                <img src={it.image} alt="" loading="lazy" className="size-full object-cover opacity-85 transition-transform duration-[1200ms] group-hover:scale-105" />
                <div className="absolute inset-0 overlay-bottom" />
                <span className="absolute left-0 top-0 h-1 w-0 bg-gold transition-all duration-700 group-hover:w-full" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="eyebrow text-gold">0{k + 1}</p>
                  <h3 className="mt-3 text-3xl text-ivory">{it.title}</h3>
                  <p className="mt-2 text-sm text-ivory/70">{it.copy}</p>
                  <ArrowUpRight className="mt-5 size-6 text-gold transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LoanServicesSection({ full = false }: { full?: boolean }) {
  return (
    <section id="loans" className="bg-card py-24 md:py-32">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHead eyebrow="Loan Solutions — our core focus" title="Financial Solutions For Your Next Step." copy="Explore the loan categories Aruna Associates can assist customers with, subject to eligibility and lender requirements." />
          {!full && <Button asChild variant="line" size="xl"><Link to="/loans">All loan solutions <ArrowRight /></Link></Button>}
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 md:gap-6 lg:mt-16 lg:grid-cols-3 lg:gap-8">
          {loanServices.map((s, k) => (
            <Reveal key={s.id} delay={(k % 3) * 90} className="h-full">
              <article className="group flex h-full flex-col border border-border bg-ivory transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-soft">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img src={s.image} alt={s.imageAlt} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.035]" />
                  <span className="absolute bottom-0 left-6 grid size-12 translate-y-1/2 place-items-center bg-charcoal text-gold"><s.icon className="size-5" /></span>
                </div>
                <div className="flex flex-1 flex-col p-6 pt-12 md:p-8 md:pt-12">
                  <p className="eyebrow text-gold-deep">Loan solution</p>
                  <h3 className="text-3xl text-charcoal">{s.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{s.copy}</p>
                  <div className="mt-6 flex flex-wrap gap-5 text-sm font-semibold">
                    <Link to="/contact" className="inline-flex items-center gap-2 text-charcoal transition-colors hover:text-gold-deep">Enquire <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></Link>
                    <a href={whatsappLink(`I would like to enquire about ${s.title.replace(/s$/, "")}.`)} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-gold-deep">WhatsApp</a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LoanJourneySection() {
  return (
    <section id="journey" className="bg-charcoal py-20 text-ivory md:py-24">
      <div className="container-x">
        <SectionHead light eyebrow="How it works" title="A Clear Path, Step by Step." />
        <ol className="relative mt-16 grid gap-10 md:grid-cols-5 md:gap-6">
          <span className="absolute left-5 top-0 h-full w-px bg-ivory/15 md:left-0 md:top-5 md:h-px md:w-full" aria-hidden />
          {loanJourney.map((j, k) => (
            <Reveal key={j.title} delay={k * 140} className="relative pl-16 md:pl-0 md:pt-16">
              <li>
                <span className="absolute left-0 top-0 grid size-10 place-items-center border border-gold bg-charcoal font-display text-gold">{k + 1}</span>
                <h3 className="text-3xl">{j.title}</h3>
                <p className="mt-2 text-sm text-ivory/60">{j.copy}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function DreamStorySection() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset["idx"])); }),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);
  return (
    <section id="dream-journey" className="relative bg-charcoal text-ivory" aria-label="Your dream, one journey">
      <div className="sticky top-0 h-[82svh] min-h-[540px] overflow-hidden">
        {dreamStory.map((d, k) => (
          <img key={d.key} src={d.image} alt="" loading="lazy" className={cn("absolute inset-0 size-full scale-105 object-cover transition-all duration-[1400ms]", k === active ? "scale-100 opacity-60" : "opacity-0")} />
        ))}
        <div className="absolute inset-0 overlay-hero" />
        <div className="container-x relative flex h-full flex-col justify-center">
          <p className="eyebrow text-gold">Your Dream. One Journey.</p>
          <p className="font-display mt-6 text-6xl leading-none md:text-[8rem]">
            <span className="text-gold">{String(active + 1).padStart(2, "0")}</span> — {dreamStory[active]!.key.toUpperCase()}
          </p>
          <p className="mt-8 max-w-lg text-lg text-ivory/80">{dreamStory[active]!.copy}</p>
          <div className="mt-12 flex max-w-md gap-2">
            {dreamStory.map((d, k) => <span key={d.key} className={cn("h-0.5 flex-1 transition-colors duration-700", k <= active ? "bg-gold" : "bg-ivory/20")} />)}
          </div>
        </div>
      </div>
      <div className="-mt-[82svh]">
        {dreamStory.map((d, k) => <div key={d.key} data-idx={k} ref={(el) => { refs.current[k] = el; }} className="h-[34svh]" />)}
        <div className="h-[18svh]" />
      </div>
    </section>
  );
}

export function HaveLandSection() {
  return (
    <section id="property" className="relative overflow-hidden bg-ivory py-24 md:py-32">
      <div className="container-x grid items-center gap-12 lg:grid-cols-12">
        <Reveal className="relative lg:col-span-7">
          <img src={images.landPlot} alt="A residential plot in a Hyderabad neighbourhood at sunset" loading="lazy" className="aspect-[4/3] w-full object-cover" />
          <div className="absolute -bottom-8 right-4 hidden w-56 border-4 border-ivory md:block lg:-right-10">
            <img src={images.familyHome} alt="" loading="lazy" className="aspect-square object-cover" />
          </div>
        </Reveal>
        <div className="lg:col-span-5">
          <SectionHead eyebrow="Land owners" title="Already Have Land?" copy="Your land can be the first step toward building the home you've always wanted." />
          <Reveal className="mt-10">
            <p className="flex flex-wrap items-center gap-3 font-display text-2xl text-charcoal">
              {["Land", "Finance", "Construction", "Home"].map((w, k, a) => (
                <span key={w} className="flex items-center gap-3">{w}{k < a.length - 1 && <ArrowRight className="size-5 text-gold-deep" />}</span>
              ))}
            </p>
            <Button asChild variant="ink" size="xl" className="mt-10"><Link to="/contact">Discuss My Property</Link></Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function ConstructionSection() {
  return (
    <section id="construction" className="bg-card py-24 md:py-32">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-2">
          <SectionHead eyebrow="Construction" title="From Your Land to Your Home." copy="Alongside financing, we help customers explore the construction side of their home journey — from early planning to the finishing touches." />
          <Reveal className="grid grid-cols-2 gap-4">
            <img src={images.heroConstruction} alt="A residential home under construction" loading="lazy" className="aspect-[3/4] w-full object-cover" />
            <img src={images.planning} alt="Engineers reviewing house plans on site" loading="lazy" className="mt-12 aspect-[3/4] w-full object-cover" />
          </Reveal>
        </div>
        <div className="mt-16 grid gap-4 md:grid-cols-4 md:gap-5">
          {constructionStages.map((c, k) => (
            <Reveal key={c.title} delay={k * 100} className="border border-border bg-card p-6 md:p-8">
              <p className="eyebrow text-gold-deep">Stage 0{k + 1}</p>
              <h3 className="mt-4 text-3xl text-charcoal">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.copy}</p>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap gap-3">
          <Button asChild variant="ink" size="xl"><Link to="/contact">Discuss Construction</Link></Button>
          <Button asChild variant="line" size="xl"><a href={whatsappLink(whatsappMessages.construction)} target="_blank" rel="noreferrer">WhatsApp</a></Button>
        </div>
      </div>
    </section>
  );
}

export function InteriorsSection() {
  const [i, setI] = useState(0);
  return (
    <section id="interiors" className="bg-charcoal py-24 text-ivory md:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHead light eyebrow="Interiors" title="Designed Beyond the Walls." copy="Interior solutions that complete the home — from a single room to the full residence." />
          <div className="mt-10 flex flex-col" role="tablist" aria-label="Interior categories">
            {interiorCategories.map((c, k) => (
              <button key={c.name} role="tab" aria-selected={k === i} onClick={() => setI(k)} className={cn("flex items-center justify-between border-b border-ivory/10 py-4 text-left font-display text-2xl transition-colors", k === i ? "text-gold" : "text-ivory/50 hover:text-ivory")}>
                {c.name}<ArrowRight className={cn("size-5 transition-opacity", k === i ? "opacity-100" : "opacity-0")} />
              </button>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild variant="gold" size="xl"><Link to="/contact">Discuss Interiors</Link></Button>
            <Button asChild variant="ghostLight" size="xl"><a href={whatsappLink(whatsappMessages.interiors)} target="_blank" rel="noreferrer">WhatsApp</a></Button>
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden lg:col-span-8 lg:aspect-auto lg:min-h-[560px]">
          {interiorCategories.map((c, k) => (
            <img key={c.name} src={c.image} alt={`${c.name} interior`} loading="lazy" className={cn("absolute inset-0 size-full object-cover transition-all duration-1000", k === i ? "scale-100 opacity-100" : "scale-105 opacity-0")} />
          ))}
          <p className="eyebrow absolute bottom-5 left-5 bg-charcoal/70 px-4 py-2 text-ivory">{interiorCategories[i]!.name}</p>
        </div>
      </div>
    </section>
  );
}

export function WhyUsSection() {
  return (
    <section className="bg-ivory py-24 md:py-32">
      <div className="container-x">
        <SectionHead eyebrow="Why Aruna" title="Why Choose Aruna Associates?" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 md:gap-6 lg:mt-16 lg:grid-cols-4 lg:gap-7">
          {whyUs.map((w, k) => (
            <Reveal key={w.title} delay={k * 90} className="group h-full">
              <article className="flex h-full flex-col border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-soft md:p-8">
                <div className="flex items-start justify-between">
                  <p className="font-display text-4xl text-gold-deep">0{k + 1}</p>
                  <ArrowUpRight className="size-5 text-gold-deep transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>
                <h3 className="mt-8 text-2xl text-charcoal">{w.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{w.copy}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="bg-card py-24 md:py-32">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <Reveal className="relative">
          <img src={images.heroConsultation} alt="A financial adviser reviewing documents with a couple" loading="lazy" className="aspect-[4/5] w-full object-cover md:aspect-[5/4]" />
          <div className="absolute -bottom-6 -right-2 bg-charcoal p-5 md:-right-8"><Logo size="lg" /></div>
        </Reveal>
        <div>
          <SectionHead eyebrow="About us" title="More Than Finance. Part of Your Journey." />
          <Reveal className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground">
            <p>Aruna Associates helps customers explore suitable financial solutions — from home loans and mortgage finance to business and project funding — and supports their broader home journey.</p>
            <p>Based in Malkajgiri, Hyderabad, we take time to understand each requirement before suggesting a next step. Where it helps, we also connect the conversation to construction and interiors, so customers can see the whole path from finance to front door.</p>
          </Reveal>
          <Reveal className="mt-10"><Button asChild variant="ink" size="xl"><Link to="/contact">Talk to Aruna Associates</Link></Button></Reveal>
        </div>
      </div>
    </section>
  );
}

export function CibilSection() {
  return (
    <section className="bg-secondary py-20 md:py-24">
      <div className="container-x grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <SectionHead eyebrow="Credit profile" title="Concerned About Your CIBIL Profile?" copy="If you have concerns about your credit profile or have previously faced difficulty obtaining finance, Aruna Associates can help you understand the options that may be available based on your profile and applicable lender criteria." />
        </div>
        <Reveal className="lg:col-span-4 lg:text-right">
          <Button asChild variant="ink" size="xl"><Link to="/contact">Discuss My Requirement</Link></Button>
          <p className="mt-4 text-xs text-muted-foreground">Approval is subject to lender policies and is not guaranteed.</p>
        </Reveal>
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section className="bg-card py-24 md:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4"><SectionHead eyebrow="FAQ" title="Questions, Answered." /></div>
        <Accordion type="single" collapsible className="lg:col-span-8">
          {faqs.map((f, k) => (
            <AccordionItem key={k} value={`f${k}`} className="border-border">
              <AccordionTrigger className="py-6 text-left font-display text-xl font-normal text-charcoal hover:no-underline md:text-2xl">{f.q}</AccordionTrigger>
              <AccordionContent className="pb-6 text-base leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

export function LocationSection() {
  return (
    <section id="location" className="bg-charcoal text-ivory">
      <div className="grid lg:grid-cols-2">
        <div className="container-x py-20 lg:max-w-none lg:px-16 lg:py-28">
          <SectionHead light eyebrow="Visit us" title="Our Office in Malkajgiri." />
          <ul className="mt-10 space-y-6 text-ivory/80">
            <li className="flex gap-4"><MapPin className="size-5 shrink-0 text-gold" /><span>{business.address}<br />{business.city}</span></li>
            <li className="flex gap-4"><Phone className="size-5 shrink-0 text-gold" /><a href={telLink} className="hover:text-gold">{business.phoneDisplay}</a></li>
            <li className="flex gap-4"><Clock className="size-5 shrink-0 text-gold" /><span>{business.serviceArea}</span></li>
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild variant="gold" size="xl"><a href={telLink}>Call Now</a></Button>
            <Button asChild variant="ghostLight" size="xl"><a href={business.mapsUrl} target="_blank" rel="noreferrer">Get Directions</a></Button>
          </div>
        </div>
        <div className="relative min-h-[360px] overflow-hidden bg-charcoal-soft lg:min-h-[520px]">
          <img src={images.landPlot} alt="" loading="lazy" className="absolute inset-0 size-full object-cover opacity-65" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/15 to-charcoal/10" />
          <div className="absolute inset-x-0 bottom-0 p-8 md:p-12">
            <p className="eyebrow text-gold">{business.name}</p>
            <p className="mt-3 max-w-md font-display text-3xl text-ivory md:text-4xl">Old Safilguda, Malkajgiri</p>
            <a href={business.mapsUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex min-h-11 items-center gap-2 border border-ivory/50 px-5 text-sm font-semibold text-ivory transition-colors hover:border-gold hover:text-gold">
              Get Directions <ArrowUpRight className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
