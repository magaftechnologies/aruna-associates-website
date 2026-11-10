import { Link } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { heroSlides } from "@/data/content";
import { whatsappLink } from "@/data/business";
import { cn } from "@/lib/utils";

const DURATION = 5500;

export function HeroCarousel() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const touch = useRef<number | null>(null);
  const n = heroSlides.length;
  const go = useCallback((d: number) => setI((x) => (x + d + n) % n), [n]);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => go(1), DURATION);
    return () => clearTimeout(t);
  }, [i, paused, go]);

  const s = heroSlides[i]!;
  return (
    <section
      id="home"
      className="relative h-[100svh] min-h-[640px] overflow-hidden bg-charcoal"
      aria-roledescription="carousel"
      aria-label="Aruna Associates highlights"
      onTouchStart={(e) => (touch.current = e.touches[0]!.clientX)}
      onTouchEnd={(e) => {
        if (touch.current === null) return;
        const dx = e.changedTouches[0]!.clientX - touch.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touch.current = null;
      }}
    >
      {heroSlides.map((sl, k) => (
        <div key={k} className={cn("absolute inset-0 transition-opacity duration-[1600ms] ease-in-out", k === i ? "opacity-100" : "opacity-0")} aria-hidden={k !== i}>
          <img src={sl.image} alt="" className={cn("size-full object-cover", k === i && "animate-ken-burns")} width={1920} height={1088} fetchPriority={k === 0 ? "high" : "low"} loading={k === 0 ? "eager" : "lazy"} />
        </div>
      ))}
      <div className="absolute inset-0 overlay-hero" />
      <div className="absolute inset-0 overlay-bottom opacity-70" />

      <div className="container-x relative flex h-full flex-col justify-center pb-36 pt-36 md:pb-40 md:pt-40">
        <div key={i} className="max-w-3xl" aria-live="polite">
          <p className="eyebrow flex animate-rise items-center gap-3 text-gold"><span className="h-px w-10 bg-gold" />{s.eyebrow}</p>
          <h1 className="font-display mt-6 animate-rise text-[2.6rem] leading-[1.02] text-ivory [animation-delay:100ms] sm:text-6xl lg:text-[5.2rem]">{s.title}</h1>
          <p className="mt-6 max-w-xl animate-rise text-base leading-relaxed text-ivory/75 [animation-delay:220ms] md:text-lg">{s.copy}</p>
          <div className="mt-9 flex animate-rise flex-wrap gap-3 [animation-delay:340ms]">
            <Button asChild variant="gold" size="xl" className="shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"><Link to={s.primary.to}>{s.primary.label}</Link></Button>
            {"secondary" in s && s.secondary && (
              <Button asChild variant="ghostLight" size="xl" className="transition-all duration-300 hover:-translate-y-0.5"><a href={whatsappLink()} target="_blank" rel="noreferrer">{s.secondary.label}</a></Button>
            )}
          </div>
        </div>
      </div>

      <div className="absolute right-5 top-28 hidden border border-ivory/20 bg-charcoal/40 px-5 py-3 backdrop-blur-sm md:right-10 md:block">
        <p className="eyebrow text-ivory/80">Loans <span className="text-gold">•</span> Construction <span className="text-gold">•</span> Interiors</p>
      </div>

      <div className="absolute inset-x-0 bottom-20 lg:bottom-10">
        <div className="container-x flex items-center gap-5 text-ivory">
          <p className="font-display text-2xl tabular-nums">{String(i + 1).padStart(2, "0")}<span className="mx-2 text-base text-ivory/40">/</span><span className="text-base text-ivory/50">{String(n).padStart(2, "0")}</span></p>
          <div className="flex flex-1 gap-2">
            {heroSlides.map((_, k) => (
              <button key={k} onClick={() => setI(k)} aria-label={`Go to slide ${k + 1}`} className="relative h-6 flex-1">
                <span className="absolute inset-x-0 top-1/2 h-px bg-ivory/25" />
                <span
                  key={`${k}-${i}-${paused}`}
                  className={cn("absolute inset-x-0 top-1/2 h-px bg-gold", k < i ? "scale-x-100" : k === i ? (paused ? "scale-x-50 origin-left" : "animate-progress") : "scale-x-0")}
                  style={{ ["--dur" as string]: `${DURATION}ms` }}
                />
              </button>
            ))}
          </div>
          <div className="flex gap-1">
            <button onClick={() => setPaused((p) => !p)} aria-label={paused ? "Play slideshow" : "Pause slideshow"} className="grid size-11 place-items-center border border-ivory/25 hover:border-gold hover:text-gold">{paused ? <Play className="size-4" /> : <Pause className="size-4" />}</button>
            <button onClick={() => go(-1)} aria-label="Previous slide" className="grid size-11 place-items-center border border-ivory/25 hover:border-gold hover:text-gold"><ChevronLeft className="size-5" /></button>
            <button onClick={() => go(1)} aria-label="Next slide" className="grid size-11 place-items-center border border-ivory/25 hover:border-gold hover:text-gold"><ChevronRight className="size-5" /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
