import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { useState } from "react";
import { ease, testimonials } from "@/data/salon";
import { cn } from "@/lib/utils";
import { Reveal } from "./ui";

export function Testimonials() {
  const [[i, dir], setState] = useState([0, 1]);
  const go = (d: number) => setState(([cur]) => [(cur + d + testimonials.length) % testimonials.length, d]);
  const t = testimonials[i] ?? testimonials[0]!;

  return (
    <section id="reviews" className="relative py-28 sm:py-36" aria-roledescription="carousel" aria-label="Guest testimonials">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="flex items-end justify-between gap-6 border-b border-border pb-8">
          <div>
            <p className="eyebrow">Reviews</p>
            <h2 className="display mt-6 text-5xl sm:text-6xl">Words from <em className="text-gold-sheen">Our Guests.</em></h2>
          </div>
          <span className="display hidden text-7xl text-gold/30 sm:block">0{i + 1}<span className="text-3xl">/0{testimonials.length}</span></span>
        </Reveal>

        <div
          className="relative mt-14 min-h-[300px] outline-none"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") go(1);
            if (e.key === "ArrowLeft") go(-1);
          }}
          aria-live="polite"
        >
          <span aria-hidden className="display pointer-events-none absolute -top-16 -left-2 text-[12rem] leading-none text-wine/60">“</span>
          <AnimatePresence mode="wait" custom={dir}>
            <motion.figure
              key={i}
              custom={dir}
              initial={{ opacity: 0, x: dir * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -40 }}
              transition={{ duration: 0.6, ease }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) go(1);
                if (info.offset.x > 60) go(-1);
              }}
              className="relative cursor-grab active:cursor-grabbing"
            >
              <div className="flex gap-1" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-gold text-gold" />)}
              </div>
              <blockquote className="display mt-8 text-3xl leading-[1.15] sm:text-5xl">{t.quote}</blockquote>
              <figcaption className="mt-10 flex items-center gap-4">
                <span className="h-px w-12 bg-gold" />
                <span className="text-sm font-semibold tracking-wide">{t.name}</span>
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{t.service}</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-12 flex items-center gap-4">
          <button onClick={() => go(-1)} aria-label="Previous testimonial" className="grid h-12 w-12 place-items-center rounded-full border border-gold/40 transition-colors hover:bg-gold hover:text-primary-foreground">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button onClick={() => go(1)} aria-label="Next testimonial" className="grid h-12 w-12 place-items-center rounded-full border border-gold/40 transition-colors hover:bg-gold hover:text-primary-foreground">
            <ArrowRight className="h-4 w-4" />
          </button>
          <div className="ml-4 flex gap-2">
            {testimonials.map((_, k) => (
              <button key={k} onClick={() => setState([k, k > i ? 1 : -1])} aria-label={`Show testimonial ${k + 1}`} aria-current={k === i} className={cn("h-px transition-all duration-500", k === i ? "w-10 bg-gold" : "w-5 bg-muted-foreground/40")} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
