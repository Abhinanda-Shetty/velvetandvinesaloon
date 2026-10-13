import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { LuxButton } from "./ui";

export type CircularCarouselItem = { src: string; alt: string; title: string; subtitle: string };

export function CircularCarousel({ items }: { items: CircularCarouselItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const [offset, setOffset] = useState(0);
  const slides = [...items, ...items];

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.1 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  function step(direction: number) {
    setPaused(true);
    setOffset((value) => value + direction * (360 / slides.length));
  }

  return (
    <div ref={ref} className="experience-carousel" role="region" aria-label="Salon experience gallery" data-paused={paused || !visible} data-reduced={!!reduced}>
      <motion.div className="experience-carousel-stage" initial={reduced ? false : { opacity: 0, y: 45 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 1 }}>
        <div className="experience-carousel-offset" style={{ "--gallery-offset": `${offset}deg` } as CSSProperties}>
          <div className="experience-carousel-ring">
            {slides.map((item, index) => (
              <div className="experience-carousel-slot" key={`${item.title}-${index}`} style={{ "--gallery-angle": `${index * 360 / slides.length}deg` } as CSSProperties} aria-hidden={reduced && index >= items.length ? true : undefined}>
                <figure className="experience-carousel-card" tabIndex={reduced && index >= items.length ? -1 : 0} aria-label={item.title}>
                  <img src={item.src} alt={item.alt} width={1024} height={1280} loading="lazy" decoding="async" />
                  <figcaption>
                    <span className="text-xs text-sage">{item.subtitle}</span>
                    <span className="display mt-2 block text-3xl text-foreground">{item.title}</span>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
      {!reduced && <div className="relative z-10 flex items-center justify-center gap-4">
        <LuxButton variant="ghost" className="h-10 w-10 p-0" onClick={() => step(1)} aria-label="Previous gallery image" title="Previous image"><ArrowLeft size={16} /></LuxButton>
        <LuxButton variant="ghost" className="h-10 w-10 p-0" onClick={() => setPaused((value) => !value)} aria-label={paused ? "Play gallery" : "Pause gallery"} aria-pressed={paused} title={paused ? "Play gallery" : "Pause gallery"}>{paused ? <Play size={14} /> : <Pause size={14} />}</LuxButton>
        <LuxButton variant="ghost" className="h-10 w-10 p-0" onClick={() => step(-1)} aria-label="Next gallery image" title="Next image"><ArrowRight size={16} /></LuxButton>
      </div>}
    </div>
  );
}