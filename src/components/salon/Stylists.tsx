import { motion } from "framer-motion";
import { useState } from "react";
import { RotateCcw, Rotate3D } from "lucide-react";
import { ease, stylists } from "@/data/salon";
import { cn } from "@/lib/utils";
import { LuxButton, SectionHeading } from "./ui";

export function Stylists({ onBook }: { onBook: (name: string) => void }) {
  const [flipped, setFlipped] = useState<string | null>(null);
  return (
    <section id="stylists" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading eyebrow="Our Stylists" title={<>Meet the Hands Behind <em className="text-gold-sheen">the Artistry.</em></>} copy="Distinctive talent. Thoughtful consultations. A shared passion for helping you feel like yourself, at your very best." />
        <div className="mt-20 grid gap-14 md:grid-cols-3 md:gap-8">
          {stylists.map((s, i) => (
            <motion.article
              key={s.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1, ease, delay: i * 0.12 }}
              className={cn("stylist-card group", i === 1 && "md:mt-20")}
              tabIndex={0}
              aria-label={`${s.name}, ${s.role}`}
              onPointerEnter={(event) => { if (event.pointerType === "mouse" && window.matchMedia("(hover: hover)").matches) setFlipped(s.name); }}
              onPointerLeave={(event) => { if (event.pointerType === "mouse" && window.matchMedia("(hover: hover)").matches) setFlipped(null); }}
              onFocus={(event) => { if (event.target === event.currentTarget) setFlipped(s.name); }}
              onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFlipped(null); }}
              onKeyDown={(event) => {
                if (event.target === event.currentTarget && (event.key === "Enter" || event.key === " ")) {
                  event.preventDefault();
                  setFlipped(flipped === s.name ? null : s.name);
                }
                if (event.key === "Escape") setFlipped(null);
              }}
              data-flipped={flipped === s.name}
            >
              <div className="stylist-card-inner">
              <div className="stylist-card-face stylist-card-front overflow-hidden rounded-sm shadow-deep" inert={flipped === s.name} aria-hidden={flipped === s.name}>
                <img src={s.image} alt={`Portrait of ${s.name}, ${s.role}`} loading="lazy" width={768} height={1024} className="h-full w-full object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
                <span className="absolute top-5 right-5 display text-lg text-gold/80">0{i + 1}</span>
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="eyebrow text-[0.6rem]">{s.role}</p>
                  <h3 className="display mt-2 text-3xl lg:text-4xl">{s.name}</h3>
                </div>
                <LuxButton variant="ghost" className="absolute right-4 bottom-24 p-2 md:hidden" aria-label={`View details for ${s.name}`} onClick={() => setFlipped(s.name)}><Rotate3D size={18} /></LuxButton>
              </div>
              <div className="stylist-card-face stylist-card-back rounded-sm border border-gold/30 bg-popover p-6 lg:p-8" inert={flipped !== s.name} aria-hidden={flipped !== s.name}>
              <div className="flex items-center justify-between gap-3"><p className="eyebrow">0{i + 1} · The Artistry</p><LuxButton variant="line" className="p-1" aria-label={`Return to ${s.name}'s portrait`} onClick={() => setFlipped(null)}><RotateCcw size={17} /></LuxButton></div>
              <p className="mt-6 text-xs text-sage">{s.role}</p>
              <h3 className="display mt-3 text-3xl lg:text-4xl">{s.name}</h3>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{s.bio}</p>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Specialities">
                {s.specialities.map((sp) => (
                  <li key={sp} className="border-b border-border py-1 text-[0.65rem] uppercase text-sage">{sp}</li>
                ))}
              </ul>
              <LuxButton variant="line" className="mt-auto self-start pt-6" onClick={() => onBook(s.name)}>Book with {s.name.split(" ")[0]} →</LuxButton>
              </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
