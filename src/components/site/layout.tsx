import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Menu, X, Phone, MessageCircle, Send, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { business, whatsappLink, telLink, disclaimer } from "@/data/business";
import { cn } from "@/lib/utils";
import logo from "@/assets/brand/aruna-associates-logo.webp";

// Official Aruna Associates logo (transparent version of the client's artwork).
export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg"; light?: boolean }) {
  const h = size === "sm" ? "h-12 md:h-14" : size === "lg" ? "h-28" : "h-14 md:h-16";
  return <img src={logo} alt="Aruna Associates" width={511} height={571} className={cn("w-auto select-none", h)} draggable={false} />;
}

const nav = [
  { to: "/", label: "Home" },
  { to: "/loans", label: "Loan Solutions" },
  { to: "/construction", label: "Construction" },
  { to: "/interiors", label: "Interiors" },
  { to: "/work", label: "Our Work" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("/");
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(nav.find((item) => item.to === pathname)?.to ?? "");
      return;
    }

    const sectionToNav: Record<string, string> = {
      home: "/",
      intent: "/",
      trust: "/",
      loans: "/loans",
      property: "/construction",
      construction: "/construction",
      interiors: "/interiors",
      work: "/work",
      about: "/about",
      contact: "/contact",
      location: "/contact",
    };
    const sections = Object.keys(sectionToNav)
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    if (!sections.length) return;

    const updateActiveSection = () => {
      const marker = window.innerHeight * 0.3;
      const current = sections.filter((section) => section.getBoundingClientRect().top <= marker).at(-1);
      setActiveSection(current ? sectionToNav[current.id] ?? "/" : "/");
    };
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateActiveSection);
    };
    updateActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const light = overlay && !scrolled && !open;
  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 border-b transition-all duration-500", light ? "border-transparent bg-transparent py-2" : "border-charcoal/10 bg-ivory/95 py-1.5 shadow-soft backdrop-blur")}>
      <div className="container-x flex items-center justify-between gap-6">
        <Link to="/" aria-label="Aruna Associates home" onClick={() => setOpen(false)}>
          <Logo size="sm" />
        </Link>
        <nav className="hidden items-center gap-7 xl:flex" aria-label="Main">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} aria-current={activeSection === n.to ? pathname === "/" ? "location" : "page" : false} className={cn("relative py-2 text-[0.8rem] font-semibold tracking-wide transition-colors after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform hover:after:scale-x-100", light ? "text-ivory/85 hover:text-gold" : "text-charcoal/75 hover:text-charcoal", activeSection === n.to && (light ? "!text-gold after:scale-x-100" : "!text-gold-deep after:scale-x-100"))} activeOptions={{ exact: true }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant={light ? "gold" : "ink"} size="lg" className="hidden rounded-sm sm:inline-flex">
            <Link to="/contact">Get a Consultation</Link>
          </Button>
          <button className={cn("grid size-11 place-items-center xl:hidden", light ? "text-ivory" : "text-charcoal")} onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"}>
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>
      <div className={cn("grid overflow-hidden transition-all duration-500 xl:hidden", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
        <nav className="min-h-0" aria-label="Mobile">
          <ul className="container-x flex flex-col py-4">
            {nav.map((n) => (
              <li key={n.to} className="border-b border-border">
                <Link to={n.to} aria-current={activeSection === n.to ? pathname === "/" ? "location" : "page" : false} onClick={() => setOpen(false)} className={cn("block py-4 font-display text-2xl transition-colors", activeSection === n.to ? "text-gold-deep" : "text-charcoal")}>{n.label}</Link>
              </li>
            ))}
            <li className="pt-5">
              <Button asChild variant="ink" size="xl" className="w-full"><Link to="/contact" onClick={() => setOpen(false)}>Get a Consultation</Link></Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-gold/30 bg-charcoal text-ivory lg:hidden">
      <a href={telLink} className="flex flex-col items-center gap-1 py-3 text-xs font-semibold"><Phone className="size-5 text-gold" />Call</a>
      <a href={whatsappLink()} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-1 border-x border-ivory/10 py-3 text-xs font-semibold"><MessageCircle className="size-5 text-gold" />WhatsApp</a>
      <Link to="/contact" className="flex flex-col items-center gap-1 bg-gold py-3 text-xs font-semibold text-charcoal"><Send className="size-5" />Enquire</Link>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-charcoal pb-24 pt-20 text-ivory/80 lg:pb-10">
      <div className="container-x grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo size="lg" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory/60">Loan and financial solutions, with construction and interiors support for your broader home journey.</p>
          <p className="eyebrow mt-8 text-gold">Dream → Finance → Build → Design → Live</p>
        </div>
        <div className="md:col-span-3">
          <p className="eyebrow mb-5 text-ivory/50">Explore</p>
          <ul className="space-y-3 text-sm">
            {nav.slice(1).map((n) => <li key={n.to}><Link to={n.to} className="hover:text-gold">{n.label}</Link></li>)}
          </ul>
        </div>
        <div className="md:col-span-4">
          <p className="eyebrow mb-5 text-ivory/50">Visit & Contact</p>
          <p className="flex gap-3 text-sm leading-relaxed"><MapPin className="mt-0.5 size-4 shrink-0 text-gold" />{business.address}, {business.city}</p>
          <p className="mt-3 text-sm"><a href={telLink} className="hover:text-gold">{business.phoneDisplay}</a></p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="gold" size="lg" className="rounded-sm"><a href={whatsappLink()} target="_blank" rel="noreferrer">WhatsApp Us</a></Button>
            <Button asChild variant="ghostLight" size="lg" className="rounded-sm"><a href={business.mapsUrl} target="_blank" rel="noreferrer">Get Directions</a></Button>
          </div>
        </div>
      </div>
      <div className="container-x mt-16 border-t border-ivory/10 pt-8">
        <p className="max-w-4xl text-xs leading-relaxed text-ivory/45">{disclaimer}</p>
        <p className="mt-4 text-xs text-ivory/40">© {new Date().getFullYear()} {business.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}

export function SiteShell({ children, overlay = false }: { children: ReactNode; overlay?: boolean }) {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-gold focus:px-4 focus:py-2 focus:text-charcoal">Skip to content</a>
      <SiteHeader overlay={overlay} />
      <main id="main">{children}</main>
      <SiteFooter />
      <MobileBar />
    </>
  );
}

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { el.classList.add("is-visible"); io.disconnect(); } }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={cn("reveal", className)} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

export function SectionHead({ eyebrow, title, copy, light = false, center = false }: { eyebrow: string; title: string; copy?: string; light?: boolean; center?: boolean }) {
  return (
    <Reveal className={cn("max-w-3xl", center && "mx-auto text-center")}>
      <p className={cn("eyebrow flex items-center gap-3", center && "justify-center", light ? "text-gold" : "text-gold-deep")}><span className="h-px w-8 bg-current" />{eyebrow}</p>
      <h2 className={cn("mt-5 text-4xl leading-[1.05] md:text-6xl", light ? "text-ivory" : "text-charcoal")}>{title}</h2>
      {copy && <p className={cn("mt-6 text-base leading-relaxed md:text-lg", light ? "text-ivory/70" : "text-muted-foreground")}>{copy}</p>}
    </Reveal>
  );
}

export function PageHero({ eyebrow, title, copy, image }: { eyebrow: string; title: string; copy: string; image: string }) {
  return (
    <section className="relative flex min-h-[72vh] items-end overflow-hidden bg-charcoal">
      <img src={image} alt="" className="absolute inset-0 size-full animate-ken-burns object-cover" />
      <div className="absolute inset-0 overlay-hero" />
      <div className="absolute inset-0 overlay-bottom" />
      <div className="container-x relative pb-16 pt-40 md:pb-24">
        <p className="eyebrow flex items-center gap-3 text-gold"><span className="h-px w-8 bg-gold" />{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl animate-rise text-5xl leading-[1.02] text-ivory md:text-7xl">{title}</h1>
        <p className="mt-6 max-w-xl animate-rise text-lg text-ivory/75 [animation-delay:150ms]">{copy}</p>
      </div>
    </section>
  );
}
