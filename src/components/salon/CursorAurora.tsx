import { useEffect, useRef } from "react";

export function CursorAurora() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const surface = ref.current;
    if (!surface) return;
    const media = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    const root = document.documentElement;
    let frame = 0;
    const move = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        surface.style.setProperty("--cursor-angle", `${100 + event.clientX / window.innerWidth * 55}deg`);
        surface.style.setProperty("--cursor-shift", `${event.clientY / window.innerHeight * 20}%`);
        root.style.setProperty("--atmosphere-x", `${(event.clientX / window.innerWidth - 0.5) * 5}%`);
        root.style.setProperty("--atmosphere-y", `${(event.clientY / window.innerHeight - 0.5) * 5}%`);
        surface.dataset['active'] = "true";
      });
    };
    const leave = () => { surface.dataset['active'] = "false"; };
    const scroll = () => { root.style.setProperty("--atmosphere-scroll", `${Math.min(window.scrollY / Math.max(document.documentElement.scrollHeight - window.innerHeight, 1), 1) * 60}%`); };
    const sync = () => {
      window.removeEventListener("pointermove", move);
      if (media.matches) window.addEventListener("pointermove", move, { passive: true });
      else leave();
    };
    sync();
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    media.addEventListener("change", sync);
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", scroll);
      root.style.removeProperty("--atmosphere-x");
      root.style.removeProperty("--atmosphere-y");
      root.style.removeProperty("--atmosphere-scroll");
      media.removeEventListener("change", sync);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, []);
  return <div ref={ref} className="cursor-aurora" aria-hidden />;
}