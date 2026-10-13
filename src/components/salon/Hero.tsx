import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { lazy, Suspense, useEffect, useState } from "react";
import heroImg from "@/assets/hero.jpg";
import { ease } from "@/data/salon";
import { LuxButton, scrollToId } from "./ui";

const SignatureScene = lazy(() => import("./SignatureScene"));

function canRender3D() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (window.innerWidth < 768) return false;
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

const lines = ["Your Beauty.", "Our Artistry."];

export function Hero() {
  const reduce = useReducedMotion();
  const [show3D, setShow3D] = useState(false);
  const { scrollY } = useScroll();
  const imgY = useTransform(scrollY, [0, 800], [0, reduce ? 0 : 80]);

  useEffect(() => setShow3D(canRender3D()), []);

  return (
    <section id="home" className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-6 lg:grid-cols-12 lg:gap-6">
        <div className="relative z-10 lg:col-span-6">
          <motion.p className="eyebrow" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8, ease }}>
            Independent Hair &amp; Beauty • United Kingdom
          </motion.p>
          <h1 className="display mt-8 text-[clamp(3.5rem,9vw,8.5rem)]">
            {lines.map((line, li) => (
              <span key={line} className="block overflow-hidden pb-2">
                <motion.span
                  className={li === 1 ? "block italic text-gold-sheen" : "block"}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.5 + li * 0.15, duration: 1.1, ease }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.9, ease }}>
            <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
              Discover a more personal kind of luxury. Thoughtful consultations, exceptional artistry, and beauty experiences designed around you.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <LuxButton onClick={() => scrollToId("booking")}>Reserve Your Experience</LuxButton>
              <LuxButton variant="ghost" onClick={() => scrollToId("services")}>Discover Our Services</LuxButton>
            </div>
          </motion.div>
        </div>

        <div className="relative lg:col-span-6 lg:pl-10">
          <motion.div
            style={{ y: imgY }}
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: "inset(0% 0 0 0)" }}
            transition={{ delay: 0.7, duration: 1.4, ease }}
            className="relative ml-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-sm shadow-deep lg:max-w-none"
          >
            <motion.img
              src={heroImg}
              alt="Model with long, glossy auburn waves in a dark velvet salon setting"
              width={1024}
              height={1344}
              className="h-full w-full object-cover"
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.7, duration: 2, ease }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
            <p className="absolute bottom-6 left-6 display text-2xl italic text-foreground/90">An invitation to feel extraordinary.</p>
          </motion.div>
          <div className="absolute -top-6 -left-4 hidden h-40 w-px bg-gradient-to-b from-transparent via-gold to-transparent lg:block" />

          {show3D && (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -left-36 bottom-[-4rem] h-[340px] w-[340px] xl:-left-44 xl:h-[400px] xl:w-[400px]"
              initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 1.4, duration: 2, ease }}
            >
              <Suspense fallback={null}>
                <SignatureScene />
              </Suspense>
            </motion.div>
          )}
        </div>
      </div>

      <button
        onClick={() => scrollToId("services")}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground sm:flex"
        aria-label="Scroll to services"
      >
        Scroll to discover
        <span className="relative h-12 w-px overflow-hidden bg-border">
          <span className="animate-scrollcue absolute inset-x-0 top-0 h-1/2 bg-gold" />
        </span>
      </button>
    </section>
  );
}
