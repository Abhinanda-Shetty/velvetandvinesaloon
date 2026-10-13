import { useEffect, useRef } from "react";

export function CursorAurora() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const surface = ref.current;
    if (!surface) return;
    const media = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    let frame = 0;
    const move = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        surface.style.setProperty("--cursor-angle", `${100 + event.clientX / window.innerWidth * 55}deg`);
        surface.style.setProperty("--cursor-shift", `${event.clientY / window.innerHeight * 20}%`);
        surface.dataset['active'] = "true";
      });
    };
    const leave = () => { surface.dataset['active'] = "false"; };
    const sync = () => {
      window.removeEventListener("pointermove", move);
      if (media.matches) window.addEventListener("pointermove", move, { passive: true });
      else leave();
    };
    sync();
    media.addEventListener("change", sync);
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      media.removeEventListener("change", sync);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, []);
  return <div ref={ref} className="cursor-aurora" aria-hidden />;
}