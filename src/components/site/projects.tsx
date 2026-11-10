import { Link } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SectionHead, Reveal } from "./layout";
import { projects as allProjects, type Project } from "@/data/projects";
import { cn } from "@/lib/utils";

export function ProjectCarousel({ items = allProjects }: { items?: Project[] }) {
  const [i, setI] = useState(0);
  const [hover, setHover] = useState(false);
  const [open, setOpen] = useState<Project | null>(null);
  const touch = useRef<number | null>(null);
  const n = items.length;
  const go = useCallback((d: number) => setI((x) => (x + d + n) % n), [n]);
  useEffect(() => {
    if (hover || open) return;
    const t = setTimeout(() => go(1), 4500);
    return () => clearTimeout(t);
  }, [i, hover, open, go]);
  const p = items[i]!;
  return (
    <section className="bg-ivory py-24 md:py-32" aria-roledescription="carousel" aria-label="Featured projects">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHead eyebrow="Featured work" title="Our Work" copy="A showcase of selected projects and work completed by the Aruna Associates team." />
          <div className="flex items-center gap-4">
            <p className="font-display text-2xl tabular-nums text-charcoal">{String(i + 1).padStart(2, "0")} <span className="text-base text-muted-foreground">/ {String(n).padStart(2, "0")}</span></p>
            <button onClick={() => go(-1)} aria-label="Previous project" className="grid size-12 place-items-center border border-charcoal/25 hover:bg-charcoal hover:text-ivory"><ChevronLeft className="size-5" /></button>
            <button onClick={() => go(1)} aria-label="Next project" className="grid size-12 place-items-center border border-charcoal/25 hover:bg-charcoal hover:text-ivory"><ChevronRight className="size-5" /></button>
          </div>
        </div>
        <div
          className="mt-12 grid gap-8 lg:grid-cols-12"
          onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
          onTouchStart={(e) => (touch.current = e.touches[0]!.clientX)}
          onTouchEnd={(e) => { if (touch.current === null) return; const dx = e.changedTouches[0]!.clientX - touch.current; if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1); touch.current = null; }}
        >
          <button onClick={() => setOpen(p)} className="group relative aspect-[16/10] overflow-hidden bg-charcoal lg:col-span-8" aria-label={`View ${p.name}`}>
            {items.map((it, k) => (
              <img key={it.id} src={it.images[0]} alt="" loading="lazy" className={cn("absolute inset-0 size-full object-cover transition-all duration-1000 group-hover:scale-[1.03]", k === i ? "opacity-100" : "opacity-0")} />
            ))}
          </button>
          <div key={p.id} className="flex animate-rise flex-col justify-end lg:col-span-4" aria-live="polite">
            <p className="eyebrow text-gold-deep">{p.category}</p>
            <h3 className="mt-4 text-4xl text-charcoal md:text-5xl">{p.name}</h3>
            <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="size-4" />{p.location}</p>
            <p className="mt-6 leading-relaxed text-muted-foreground">{p.description}</p>
            <div className="mt-8 flex gap-1">{items.map((_, k) => <span key={k} className={cn("h-0.5 flex-1", k === i ? "bg-gold" : "bg-border")} />)}</div>
            <Button variant="line" size="xl" className="mt-8 self-start" onClick={() => setOpen(p)}>View Project <ArrowUpRight /></Button>
          </div>
        </div>
      </div>
      <ProjectModal project={open} onClose={() => setOpen(null)} />
    </section>
  );
}

const spans = ["md:col-span-7 md:row-span-2", "md:col-span-5", "md:col-span-5", "md:col-span-4", "md:col-span-8 md:row-span-2", "md:col-span-4", "md:col-span-6", "md:col-span-6"];

export function ProjectGallery({ items = allProjects, title = "Selected Projects" }: { items?: Project[]; title?: string }) {
  const [open, setOpen] = useState<Project | null>(null);
  return (
    <section className="bg-card py-24 md:py-32">
      <div className="container-x">
        <SectionHead eyebrow="Portfolio" title={title} copy="Demo projects shown for this preview — to be replaced with the client's completed work." />
        <div className="mt-14 grid auto-rows-[260px] grid-cols-1 gap-5 md:auto-rows-[240px] md:grid-cols-12 md:gap-6">
          {items.map((p, k) => (
            <Reveal key={p.id} delay={(k % 3) * 80} className={cn(spans[k % spans.length])}>
              <button onClick={() => setOpen(p)} className="group relative size-full overflow-hidden bg-charcoal text-left">
                <img src={p.images[0]} alt={p.name} loading="lazy" className="size-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
                <div className="absolute inset-0 overlay-bottom opacity-80 transition-opacity group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 md:p-6">
                  <div>
                    <p className="eyebrow text-gold">{p.category}</p>
                    <h3 className="mt-2 text-2xl text-ivory">{p.name}</h3>
                    <p className="text-xs text-ivory/60">{p.location}</p>
                  </div>
                  <ArrowUpRight className="size-6 shrink-0 text-gold transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
      <ProjectModal project={open} onClose={() => setOpen(null)} />
    </section>
  );
}

export function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const [img, setImg] = useState(0);
  useEffect(() => setImg(0), [project]);
  return (
    <Dialog open={!!project} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[92vh] max-w-5xl overflow-y-auto rounded-none border-none bg-ivory p-0">
        {project && (
          <div className="grid lg:grid-cols-5">
            <div className="lg:col-span-3">
              <img src={project.images[img]} alt={project.name} className="aspect-[4/3] w-full object-cover" />
              <div className="flex gap-2 p-3">
                {project.images.map((src, k) => (
                  <button key={k} onClick={() => setImg(k)} aria-label={`Show image ${k + 1}`} className={cn("size-16 overflow-hidden border-2", k === img ? "border-gold" : "border-transparent")}>
                    <img src={src} alt="" className="size-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col p-6 md:p-8 lg:col-span-2">
              <p className="eyebrow text-gold-deep">{project.category}</p>
              <DialogTitle className="font-display mt-3 text-4xl font-normal text-charcoal">{project.name}</DialogTitle>
              <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-border py-4 text-sm">
                <div><dt className="text-muted-foreground">Location</dt><dd className="font-semibold">{project.location}</dd></div>
                <div><dt className="text-muted-foreground">Year</dt><dd className="font-semibold">{project.year}</dd></div>
              </dl>
              <DialogDescription className="mt-6 flex-1 text-base leading-relaxed text-muted-foreground">{project.description}</DialogDescription>
              <p className="mt-4 text-xs text-muted-foreground">Demo project for preview purposes.</p>
              <Button asChild variant="ink" size="xl" className="mt-6"><Link to="/contact" onClick={onClose}>Enquire About a Similar Project</Link></Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
