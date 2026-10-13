import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ease, navLinks } from "@/data/salon";
import { cn } from "@/lib/utils";
import { LuxButton, Wordmark, scrollToId } from "./ui";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6"
    >
      <nav
        aria-label="Main"
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between rounded-md px-5 py-3 transition-all duration-700",
          scrolled ? "glass" : "border border-transparent",
        )}
      >
        <button onClick={() => go("home")} aria-label="Velvet & Vine — back to top">
          <Wordmark />
        </button>
        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.slice(1).map((l) => (
            <li key={l.id}>
              <button onClick={() => go(l.id)} className="link-underline text-[0.72rem] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground">
                {l.label}
              </button>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <LuxButton onClick={() => go("booking")} className="hidden px-5 py-3 sm:inline-flex">Book an Appointment</LuxButton>
          <button onClick={() => setOpen(true)} className="p-2 text-foreground lg:hidden" aria-label="Open menu" aria-expanded={open}>
            <Menu className="h-6 w-6" strokeWidth={1.25} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            className="fixed inset-0 z-50 flex flex-col bg-background/95 px-8 py-6 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between">
              <Wordmark />
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2" autoFocus>
                <X className="h-6 w-6" strokeWidth={1.25} />
              </button>
            </div>
            <ul className="mt-16 space-y-6">
              {navLinks.map((l, i) => (
                <motion.li key={l.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i, duration: 0.6, ease }}>
                  <button onClick={() => go(l.id)} className="display text-5xl">{l.label}</button>
                </motion.li>
              ))}
            </ul>
            <LuxButton onClick={() => go("booking")} className="mt-auto w-full">Book an Appointment</LuxButton>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
