import { motion, useReducedMotion } from "framer-motion";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { ease } from "@/data/salon";
import { cn } from "@/lib/utils";

export function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "gold" | "ghost" | "line" };

export const LuxButton = forwardRef<HTMLButtonElement, BtnProps>(function LuxButton(
  { variant = "gold", className, children, ...props },
  ref,
) {
  const base =
    "group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-sm px-7 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.24em] transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] disabled:opacity-50 disabled:pointer-events-none";
  const styles = {
    gold: "bg-primary text-primary-foreground hover:-translate-y-0.5 hover:shadow-deep",
    ghost: "border border-gold/40 text-foreground hover:border-gold hover:bg-gold/10",
    line: "px-0 py-2 text-gold link-underline",
  };
  return (
    <button ref={ref} className={cn(base, styles[variant], className)} {...props}>
      {children}
    </button>
  );
});

export function Reveal({ children, delay = 0, className, y = 28 }: { children: ReactNode; delay?: number; className?: string; y?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ eyebrow, title, copy, align = "left" }: { eyebrow: string; title: ReactNode; copy?: string; align?: "left" | "center" }) {
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <p className="eyebrow mb-6">{eyebrow}</p>
      <h2 className="display text-5xl sm:text-6xl lg:text-7xl">{title}</h2>
      {copy && <p className={cn("mt-6 max-w-xl text-base leading-relaxed text-muted-foreground", align === "center" && "mx-auto")}>{copy}</p>}
    </Reveal>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("display flex items-baseline gap-1 text-2xl tracking-tight", className)}>
      Velvet <em className="text-gold-sheen font-light">&amp;</em> Vine
    </span>
  );
}
