import { Pause, Play, Star } from "lucide-react";
import { useState } from "react";
import { testimonials } from "@/data/salon";
import { LuxButton, SectionHeading } from "./ui";

export function Testimonials() {
  const [paused, setPaused] = useState(false);

  return (
    <section id="reviews" className="relative overflow-hidden py-28 sm:py-36" aria-label="Guest testimonials">
      <div className="mx-auto flex max-w-7xl items-end justify-between gap-4 px-6">
        <SectionHeading eyebrow="Reviews" title={<>Words from <em className="text-gold-sheen">Our Guests.</em></>} />
        <LuxButton variant="ghost" className="h-11 w-11 shrink-0 p-0" onClick={() => setPaused((value) => !value)} aria-label={paused ? "Play testimonials" : "Pause testimonials"} title={paused ? "Play testimonials" : "Pause testimonials"} aria-pressed={paused}>
          {paused ? <Play size={16} /> : <Pause size={16} />}
        </LuxButton>
      </div>
      <div className="review-window mt-16" tabIndex={0} aria-label="Scrolling guest reviews">
        <div className="review-track" data-paused={paused}>
          {[0, 1].map((copy) => (
            <div className="review-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>
              {testimonials.map((t) => (
                <figure key={t.name} className="review-item border-y border-border px-7 py-8 sm:px-10">
                  <div className="flex gap-1" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-3.5 w-3.5 fill-gold text-gold" />)}
                  </div>
                  <blockquote className="display mt-7 text-3xl leading-[1.2]">“{t.quote}”</blockquote>
                  <figcaption className="mt-auto pt-8">
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="mt-2 text-xs text-muted-foreground">{t.service}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
