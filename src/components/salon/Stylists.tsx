import { motion } from "framer-motion";
import { ease, stylists } from "@/data/salon";
import { cn } from "@/lib/utils";
import { LuxButton, SectionHeading } from "./ui";

export function Stylists({ onBook }: { onBook: (name: string) => void }) {
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
              className={cn("group", i === 1 && "md:mt-20")}
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm shadow-deep">
                <img src={s.image} alt={`Portrait of ${s.name}, ${s.role}`} loading="lazy" width={768} height={1024} className="h-full w-full object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
                <span className="absolute top-5 right-5 display text-lg text-gold/80">0{i + 1}</span>
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="eyebrow text-[0.6rem]">{s.role}</p>
                  <h3 className="display mt-2 text-4xl">{s.name}</h3>
                </div>
              </div>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{s.bio}</p>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Specialities">
                {s.specialities.map((sp) => (
                  <li key={sp} className="rounded-sm border border-border px-3 py-1 text-[0.65rem] uppercase tracking-[0.15em] text-sage">{sp}</li>
                ))}
              </ul>
              <LuxButton variant="line" className="mt-6" onClick={() => onBook(s.name)}>Book with {s.name.split(" ")[0]} →</LuxButton>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
