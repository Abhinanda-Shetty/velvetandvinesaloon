import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import { categories, ease, type Service } from "@/data/salon";
import { cn } from "@/lib/utils";
import { Reveal, SectionHeading } from "./ui";

function ServiceItem({ s, onBook }: { s: Service; onBook: (s: Service) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <li className="group relative border-b border-border">
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-wine/0 via-wine/20 to-wine/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="flex items-center gap-4 px-2 py-6 sm:px-4">
        <button className="flex flex-1 items-start gap-4 text-left sm:pointer-events-none" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
          <div className="flex-1">
            <h3 className="display text-2xl sm:text-3xl">
              <span className="bg-[linear-gradient(var(--gold),var(--gold))] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-700 group-hover:bg-[length:100%_1px]">{s.name}</span>
            </h3>
            <p className={cn("mt-2 max-w-md text-sm text-muted-foreground sm:block", open ? "block" : "hidden")}>{s.description}</p>
            <p className="mt-1 text-[0.7rem] uppercase tracking-[0.2em] text-sage">{s.minutes} minutes</p>
          </div>
          <ChevronDown className={cn("mt-2 h-4 w-4 text-gold transition-transform sm:hidden", open && "rotate-180")} />
        </button>
        <div className="flex flex-col items-end gap-2">
          <span className="display text-3xl text-gold">£{s.price}</span>
          <button onClick={() => onBook(s)} className="flex items-center gap-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-foreground/80 transition-colors hover:text-gold" aria-label={`Book ${s.name}`}>
            Book <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </li>
  );
}

export function Services({ onBook }: { onBook: (s: Service) => void }) {
  const [active, setActive] = useState(categories[0].id);
  const cat = categories.find((c) => c.id === active)!;

  return (
    <section id="services" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading eyebrow="The Menu" title={<>The Art of Feeling <em className="text-gold-sheen">Your Best.</em></>} copy="Every service begins with understanding you. Explore our signature treatments, thoughtfully tailored to your style." />

        <Reveal className="mt-14">
          <div role="tablist" aria-label="Service categories" className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">
            {categories.map((c) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={active === c.id}
                onClick={() => setActive(c.id)}
                className={cn(
                  "relative shrink-0 rounded-sm px-5 py-3 text-[0.7rem] uppercase tracking-[0.22em] transition-colors",
                  active === c.id ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {active === c.id && <motion.span layoutId="cat-pill" className="absolute inset-0 -z-10 rounded-sm bg-primary" transition={{ duration: 0.5, ease }} />}
                {c.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7" role="tabpanel">
            <AnimatePresence mode="wait">
              <motion.ul key={cat.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.45, ease }} className="border-t border-border">
                {cat.services.map((s) => <ServiceItem key={s.name} s={s} onBook={onBook} />)}
              </motion.ul>
            </AnimatePresence>
            <p className="mt-6 text-xs italic text-muted-foreground">Prices are indicative. Colour services may require a consultation.</p>
          </div>
          <div className="relative hidden lg:col-span-5 lg:block">
            <div className="sticky top-28 aspect-[4/5] overflow-hidden rounded-sm shadow-deep">
              <AnimatePresence mode="popLayout">
                <motion.img key={cat.id} src={cat.image} alt={`${cat.label} at Velvet & Vine`} loading="lazy" className="absolute inset-0 h-full w-full object-cover" initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.9, ease }} />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="eyebrow">{cat.label}</p>
                <p className="display mt-2 text-3xl italic">{cat.intro}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
