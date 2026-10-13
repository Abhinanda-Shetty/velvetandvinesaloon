import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import interior from "@/assets/salon-interior.jpg";
import products from "@/assets/products.jpg";
import styling from "@/assets/styling-detail.jpg";
import { ease } from "@/data/salon";
import { Reveal } from "./ui";

const principles = [
  { n: "I", title: "Personal, Never Prescribed.", copy: "Every visit opens with a conversation about you — your hair, your routine, your idea of beautiful." },
  { n: "II", title: "Artistry in Every Detail.", copy: "From the first section to the final finish, we work with patience and precision." },
  { n: "III", title: "Luxury That Feels Like You.", copy: "Calm surroundings, attentive service and haircare we genuinely believe in." },
];

export function Experience() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [60, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [120, -40]);

  return (
    <section id="experience" ref={ref} className="relative bg-ivory py-28 text-ink sm:py-36">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:gap-20">
        <div className="relative">
          <motion.div
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
            viewport={{ once: true, margin: "0px", amount: 0.15 }}
            transition={{ duration: 1.4, ease }}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-sm shadow-deep"
          >
            <img src={interior} alt="Velvet & Vine salon interior with burgundy velvet chairs and brass mirrors" loading="lazy" className="h-full w-full object-cover" />
          </motion.div>
          <motion.div style={{ y: y1 }} className="absolute right-0 bottom-6 aspect-square w-[42%] overflow-hidden rounded-sm border-4 border-ivory shadow-deep">
            <img src={products} alt="Premium haircare products on dark marble" loading="lazy" className="h-full w-full object-cover" />
          </motion.div>
          <motion.div style={{ y: y2 }} className="absolute -bottom-12 left-[6%] hidden aspect-[3/4] w-[28%] overflow-hidden rounded-sm border-4 border-ivory shadow-deep sm:block">
            <img src={styling} alt="Stylist finishing a blow-dry with a round brush" loading="lazy" className="h-full w-full object-cover" />
          </motion.div>
        </div>

        <div className="flex flex-col justify-center">
          <Reveal>
            <p className="eyebrow text-wine">The Experience</p>
            <h2 className="display mt-6 text-5xl sm:text-6xl lg:text-7xl">A Little Luxury, <em className="text-wine">Just for You.</em></h2>
            <p className="mt-8 max-w-lg leading-relaxed text-ink/70">
              We believe great hair begins with listening. Each appointment is shaped by a personal consultation, celebrating your individual expression and delivered with attentive, unhurried care — in surroundings designed to let you breathe out.
            </p>
          </Reveal>
          <ol className="mt-12 space-y-8">
            {principles.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.1}>
                <li className="grid grid-cols-[3rem_1fr] gap-4 border-t border-ink/15 pt-6">
                  <span className="display text-2xl italic text-wine">{p.n}</span>
                  <div>
                    <h3 className="display text-3xl">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink/65">{p.copy}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
