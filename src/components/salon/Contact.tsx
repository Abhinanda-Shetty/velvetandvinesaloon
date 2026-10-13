import { ArrowUp, Clock, Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { categories, contact, navLinks } from "@/data/salon";
import { Reveal, SectionHeading, Wordmark, scrollToId } from "./ui";

const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`;

export function Contact() {
  return (
    <section id="contact" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading eyebrow="Visit Us" title={<>We'd Love to <em className="text-gold-sheen">Welcome You.</em></>} />
        <div className="mt-16 grid gap-10 md:grid-cols-3">
          <Reveal className="space-y-6">
            <a href={mapUrl} target="_blank" rel="noreferrer" className="group flex gap-4">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-gold" strokeWidth={1.25} />
              <span>
                <span className="display block text-2xl">{contact.address}</span>
                <span className="link-underline mt-2 inline-block text-xs uppercase tracking-[0.2em] text-gold">Get Directions</span>
              </span>
            </a>
            <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="flex items-center gap-4 hover:text-gold">
              <Phone className="h-5 w-5 text-gold" strokeWidth={1.25} /> {contact.phone}
            </a>
            <a href={`mailto:${contact.email}`} className="flex items-center gap-4 break-all hover:text-gold">
              <Mail className="h-5 w-5 shrink-0 text-gold" strokeWidth={1.25} /> {contact.email}
            </a>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex items-center gap-3 eyebrow mb-6"><Clock className="h-4 w-4" strokeWidth={1.25} /> Opening Hours</div>
            <dl className="space-y-3">
              {contact.hours.map(([d, h]) => (
                <div key={d} className="flex justify-between border-b border-border pb-3 text-sm">
                  <dt className="text-muted-foreground">{d}</dt>
                  <dd>{h}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={0.2}>
            <a href={mapUrl} target="_blank" rel="noreferrer" aria-label="Open map to Velvet & Vine" className="group relative block aspect-square overflow-hidden rounded-sm border border-border bg-forest/40">
              <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full opacity-40" aria-hidden>
                {Array.from({ length: 9 }).map((_, i) => <line key={`h${i}`} x1="0" y1={i * 25} x2="200" y2={i * 25 + 12} stroke="var(--gold)" strokeWidth="0.4" />)}
                {Array.from({ length: 9 }).map((_, i) => <line key={`v${i}`} x1={i * 25} y1="0" x2={i * 25 - 10} y2="200" stroke="var(--gold)" strokeWidth="0.4" />)}
                <path d="M0 140 Q60 110 100 120 T200 90" stroke="var(--sage)" strokeWidth="6" fill="none" opacity="0.5" />
              </svg>
              <div className="absolute inset-0 grid place-items-center">
                <span className="relative grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-deep transition-transform duration-500 group-hover:scale-110">
                  <MapPin className="h-6 w-6" />
                </span>
              </div>
              <span className="absolute bottom-4 left-4 eyebrow">Rosewood Lane · London</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const [year, setYear] = useState(2026);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return (
    <footer className="relative border-t border-border pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Wordmark className="text-5xl" />
            <p className="display mt-4 text-2xl italic text-muted-foreground">Where Beauty Becomes an Art Form.</p>
            <div className="mt-8 flex gap-3">
              <a href={contact.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="grid h-11 w-11 place-items-center rounded-full border border-border hover:border-gold hover:text-gold"><Instagram className="h-4 w-4" /></a>
              <a href={contact.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="grid h-11 w-11 place-items-center rounded-full border border-border hover:border-gold hover:text-gold"><Facebook className="h-4 w-4" /></a>
            </div>
          </div>
          <nav aria-label="Footer" className="md:col-span-2">
            <p className="eyebrow mb-5">Explore</p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {navLinks.map((l) => <li key={l.id}><button onClick={() => scrollToId(l.id)} className="link-underline hover:text-foreground">{l.label}</button></li>)}
            </ul>
          </nav>
          <div className="md:col-span-2">
            <p className="eyebrow mb-5">Services</p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {categories.map((c) => <li key={c.id}><button onClick={() => scrollToId("services")} className="link-underline hover:text-foreground">{c.label}</button></li>)}
            </ul>
          </div>
          <div className="space-y-3 text-sm text-muted-foreground md:col-span-3">
            <p className="eyebrow mb-5">Contact</p>
            <p>{contact.address}</p>
            <p><a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="hover:text-foreground">{contact.phone}</a></p>
            <p><a href={`mailto:${contact.email}`} className="break-all hover:text-foreground">{contact.email}</a></p>
          </div>
        </div>
        <div className="hairline mt-16" />
        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-xs text-muted-foreground sm:flex-row">
          <p>© {year} Velvet &amp; Vine Salon. All rights reserved.</p>
          <button onClick={() => scrollToId("home")} className="flex items-center gap-2 uppercase tracking-[0.2em] hover:text-gold" aria-label="Back to top">
            Back to top <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
