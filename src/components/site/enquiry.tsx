import { useState, type FormEvent } from "react";
import { CheckCircle2, AlertCircle, Loader2, Phone, MessageCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHead } from "./layout";
import { requirementOptions } from "@/data/content";
import { business, telLink, whatsappLink } from "@/data/business";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error" | "unconfigured";

export function validatePhone(v: string) {
  return /^(\+?91[\s-]?)?[6-9]\d{9}$/.test(v.replace(/[\s-]/g, ""));
}

const field = "w-full border-b border-charcoal/25 bg-transparent py-3 text-base text-charcoal outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-gold-deep";

export function EnquirySection() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("idle");
    const form = e.currentTarget;
    const data = new FormData(form);
    const errs: Record<string, string> = {};
    if (!String(data.get("name") || "").trim()) errs["name"] = "Please enter your name.";
    if (!validatePhone(String(data.get("phone") || ""))) errs["phone"] = "Please enter a valid 10-digit mobile number.";
    const email = String(data.get("email") || "");
    if (email && !/^\S+@\S+\.\S+$/.test(email)) errs["email"] = "Please check your email address.";
    if (!String(data.get("location") || "").trim()) errs["location"] = "Please tell us your location.";
    if (!data.get("requirement")) errs["requirement"] = "Please choose a requirement.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    const accessKey = import.meta.env["VITE_WEB3FORMS_ACCESS_KEY"];
    if (!accessKey) { setStatus("unconfigured"); return; }

    setStatus("loading");
    const payload = new FormData();
    const fields = [
      ["Full Name", "name"],
      ["Mobile Number", "phone"],
      ["Email", "email"],
      ["Location", "location"],
      ["Requirement", "requirement"],
      ["Approximate Requirement", "amount"],
      ["Message", "message"],
    ] as const;
    for (const [label, key] of fields) payload.append(label, String(data.get(key) ?? ""));
    payload.append("business_name", business.name);
    payload.append("form_source", `${business.name} website enquiry form`);
    payload.append("access_key", accessKey);
    payload.append("subject", `New Website Enquiry — ${business.name}`);
    payload.append("from_name", `${business.name} — Website Enquiry`);
    if (email) payload.append("replyto", email);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: payload,
      });
      const result: unknown = await res.json();
      if (res.ok && typeof result === "object" && result !== null && "success" in result && result.success === true) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch { setStatus("error"); }
  }

  const err = (k: string) => errors[k] && <p id={`${k}-err`} role="alert" className="mt-1 text-xs text-destructive">{errors[k]}</p>;

  return (
    <section id="contact" className="bg-ivory py-24 md:py-32">
      <div className="container-x grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHead eyebrow="Enquire" title="Tell Us What You Need." copy="Share a few details and our team will call you back to understand your requirement." />
          <div className="mt-10 space-y-5 text-sm">
            <a href={telLink} className="flex items-center gap-4 text-charcoal hover:text-gold-deep"><Phone className="size-5 text-gold-deep" />{business.phoneDisplay}</a>
            <a href={whatsappLink()} target="_blank" rel="noreferrer" className="flex items-center gap-4 text-charcoal hover:text-gold-deep"><MessageCircle className="size-5 text-gold-deep" />WhatsApp us</a>
            <a href={business.mapsUrl} target="_blank" rel="noreferrer" className="flex items-start gap-4 text-charcoal hover:text-gold-deep"><MapPin className="size-5 shrink-0 text-gold-deep" />{business.address}, {business.city}</a>
          </div>
        </div>
        <form onSubmit={onSubmit} noValidate className="grid gap-8 border border-border bg-card p-6 sm:grid-cols-2 md:p-10 lg:col-span-7">
          <div><label htmlFor="name" className="eyebrow text-muted-foreground">Full Name *</label><input id="name" name="name" autoComplete="name" required className={field} aria-invalid={!!errors["name"]} aria-describedby="name-err" />{err("name")}</div>
          <div><label htmlFor="phone" className="eyebrow text-muted-foreground">Mobile Number *</label><input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required className={field} aria-invalid={!!errors["phone"]} aria-describedby="phone-err" />{err("phone")}</div>
          <div><label htmlFor="email" className="eyebrow text-muted-foreground">Email (optional)</label><input id="email" name="email" type="email" autoComplete="email" className={field} aria-invalid={!!errors["email"]} aria-describedby="email-err" />{err("email")}</div>
          <div><label htmlFor="enquiry-location" className="eyebrow text-muted-foreground">Location *</label><input id="enquiry-location" name="location" required className={field} aria-invalid={!!errors["location"]} aria-describedby="location-err" />{err("location")}</div>
          <div><label htmlFor="requirement" className="eyebrow text-muted-foreground">Requirement *</label>
            <select id="requirement" name="requirement" required defaultValue="" className={field} aria-invalid={!!errors["requirement"]} aria-describedby="requirement-err">
              <option value="" disabled>Select…</option>
              {requirementOptions.map((o) => <option key={o}>{o}</option>)}
            </select>{err("requirement")}
          </div>
          <div><label htmlFor="amount" className="eyebrow text-muted-foreground">Approximate Requirement</label><input id="amount" name="amount" placeholder="e.g. ₹40 lakh" className={field} /></div>
          <div className="sm:col-span-2"><label htmlFor="message" className="eyebrow text-muted-foreground">Message</label><textarea id="message" name="message" rows={3} className={cn(field, "resize-none")} /></div>
          <div className="sm:col-span-2">
            <Button type="submit" variant="ink" size="xl" disabled={status === "loading"} className="w-full sm:w-auto">
              {status === "loading" ? <><Loader2 className="animate-spin" />Sending...</> : "Submit Enquiry"}
            </Button>
            <div role="status" aria-live="polite" className="mt-5 text-sm">
              {status === "success" && <p className="flex items-center gap-2 text-success"><CheckCircle2 className="size-5" />Thank you — your enquiry has been sent. We'll call you back soon.</p>}
              {status === "error" && <p className="flex items-center gap-2 text-destructive"><AlertCircle className="size-5" />Something went wrong. Please try again, or call / WhatsApp us directly.</p>}
              {status === "unconfigured" && <p className="flex items-center gap-2 text-destructive"><AlertCircle className="size-5" />Online enquiries aren't switched on yet. Please call or WhatsApp us for now.</p>}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
