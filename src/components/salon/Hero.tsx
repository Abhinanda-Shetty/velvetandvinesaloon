import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Scissors } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { ease } from "@/data/salon";
import { LuxButton, scrollToId } from "./ui";
import { BlurText } from "./BlurText";

export function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const imgY = useTransform(scrollY, [0, 800], [0, reduce ? 0 : 80]);

  return (
    <section id="home" className="relative flex min-h-[min(850px,90svh)] items-center overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-28">
      <motion.img src={heroImg} alt="Glossy auburn waves styled at Velvet & Vine" width={1024} height={1344} style={{ y: imgY }} className="absolute inset-0 h-[115%] w-full object-cover object-[65%_35%]" initial={reduce ? false : { scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 2, ease }} />
      <div className="hero-shade absolute inset-0" />
      <div className="mx-auto grid w-full max-w-7xl items-center gap-6 px-6 lg:grid-cols-12">
        <div className="relative z-10 lg:col-span-8">
          <motion.p className="eyebrow flex items-center gap-3" initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8, ease }}>
            <motion.span aria-hidden animate={reduce ? {} : { rotate: [0, -12, 0] }} transition={{ duration: 4, repeat: Infinity }}><Scissors size={20} strokeWidth={1.25} /></motion.span>
            Independent Hair &amp; Beauty
          </motion.p>
          <h1 className="display mt-7 text-6xl sm:text-7xl lg:text-8xl xl:text-9xl">
            <BlurText text="Velvet & Vine" className="block" delay={0.3} />
            <BlurText text="Salon" className="block pb-3 italic text-gold-sheen" delay={0.6} />
          </h1>
          <motion.div initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.9, ease }}>
            <p className="display mt-5 text-3xl italic">Your beauty. Our artistry.</p>
            <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
              Discover a more personal kind of luxury. Thoughtful consultations, exceptional artistry, and beauty experiences designed around you.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <LuxButton onClick={() => scrollToId("booking")}>Reserve Your Experience</LuxButton>
              <LuxButton variant="ghost" onClick={() => scrollToId("services")}>Discover Our Services</LuxButton>
            </div>
          </motion.div>
        </div>

      </div>

      <LuxButton variant="line"
        onClick={() => scrollToId("services")}
        className="absolute bottom-5 left-6 p-0 text-muted-foreground"
        aria-label="Scroll to services"
      >
        <motion.span animate={reduce ? {} : { y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity }}><ArrowDown size={18} /></motion.span>
      </LuxButton>
    </section>
  );
}
