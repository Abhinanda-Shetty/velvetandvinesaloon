import { lazy, Suspense, useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

const SignatureScene = lazy(() => import("./SignatureScene"));
const sections = [
  { id: "services", selector: "[role='tabpanel'] li, [role='tablist'], h2", side: "right" },
  { id: "stylists", selector: ".stylist-card, h2", side: "left" },
  { id: "experience", selector: "h2, img", side: "right" },
  { id: "reviews", selector: "h2, .review-item", side: "left" },
  { id: "booking", selector: "button[type='submit'], input, h2", side: "right" },
  { id: "contact", selector: "h2, a", side: "left" },
];

export function ScrollScissors() {
  const [enabled, setEnabled] = useState(false);
  const [target, setTarget] = useState("home");
  const [point, setPoint] = useState({ x: 0, y: 0 });
  const x = useSpring(0, { stiffness: 65, damping: 24 });
  const y = useSpring(140, { stiffness: 65, damping: 24 });
  const scale = useSpring(1, { stiffness: 65, damping: 24 });
  const rotate = useSpring(-20, { stiffness: 65, damping: 24 });
  const opacity = useSpring(0, { stiffness: 65, damping: 24 });

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let supported = false;
    try { const canvas = document.createElement("canvas"); supported = !!(canvas.getContext("webgl2") || canvas.getContext("webgl")); } catch { supported = false; }
    const update = () => {
      frame = 0;
      const active = supported && window.innerWidth >= 1024 && !preference.matches;
      setEnabled(active);
      if (!active) return;
      const home = document.getElementById("home")?.getBoundingClientRect();
      const inHero = home && home.bottom > window.innerHeight * 0.55;
      if (inHero) {
        setTarget("home"); x.set(window.innerWidth * 0.74 - 50); y.set(Math.max(120, home.height * 0.28)); scale.set(1); rotate.set(-20); opacity.set(1);
        return;
      }
      const current = sections.map((section) => ({ ...section, element: document.getElementById(section.id) })).find(({ element }) => {
        const rect = element?.getBoundingClientRect();
        return rect && rect.top < window.innerHeight * 0.65 && rect.bottom > window.innerHeight * 0.35;
      });
      if (!current?.element) { opacity.set(0); return; }
      const candidates = Array.from(current.element.querySelectorAll(current.selector));
      const visible = candidates.filter((element) => {
        const box = element.getBoundingClientRect();
        return box.top > 110 && box.top < window.innerHeight * 0.78 && box.width > 0;
      });
      const submit = current.id === "booking" ? visible.find((element) => element.matches("button[type='submit']")) : undefined;
      const focus = submit ?? visible.sort((a, b) => Math.abs(a.getBoundingClientRect().top - window.innerHeight * 0.42) - Math.abs(b.getBoundingClientRect().top - window.innerHeight * 0.42))[0];
      if (!focus) { opacity.set(0.15); return; }
      const rect = focus.getBoundingClientRect();
      const targetX = rect.left + Math.min(rect.width * 0.5, 220);
      const targetY = Math.min(window.innerHeight * 0.78, rect.top + Math.min(rect.height * 0.5, 90));
      // Position outside the content, then aim the blades' local +Y axis at it.
      const centerX = current.side === "left" ? 98 : window.innerWidth - 98;
      const centerY = Math.max(190, Math.min(window.innerHeight - 130, targetY + (current.side === "left" ? 110 : -90)));
      const angle = Math.atan2(targetY - centerY, targetX - centerX) * 180 / Math.PI + 90;
      const previousAngle = rotate.get();
      const shortestAngle = previousAngle + ((angle - previousAngle + 540) % 360 - 180);
      setTarget(current.id);
      setPoint({ x: Math.round(targetX), y: Math.round(targetY) });
      x.set(centerX - 140); y.set(centerY - 160);
      scale.set(0.62); rotate.set(shortestAngle); opacity.set(0.95);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    preference.addEventListener("change", schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); preference.removeEventListener("change", schedule); };
  }, [enabled, x, y, scale, rotate, opacity]);

  if (!enabled) return null;
  return <motion.div aria-hidden="true" data-guide-target={target} data-point-x={point.x} data-point-y={point.y} className="scroll-scissors" style={{ x, y, scale, rotate, opacity }}><Suspense fallback={null}><SignatureScene /></Suspense></motion.div>;
}