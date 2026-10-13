import { lazy, Suspense, useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

const SignatureScene = lazy(() => import("./SignatureScene"));
const sections = ["services", "stylists", "experience", "reviews", "booking", "contact"];

export function ScrollScissors() {
  const [enabled, setEnabled] = useState(false);
  const [target, setTarget] = useState("home");
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
      const current = sections.map((id) => ({ id, element: document.getElementById(id) })).find(({ element }) => {
        const rect = element?.getBoundingClientRect();
        return rect && rect.top < window.innerHeight * 0.65 && rect.bottom > window.innerHeight * 0.35;
      });
      if (!current?.element) { opacity.set(0); return; }
      const heading = current.element.querySelector("h2");
      const rect = (heading || current.element).getBoundingClientRect();
      setTarget(current.id);
      x.set(window.innerWidth - 132);
      y.set(Math.max(130, Math.min(window.innerHeight - 260, rect.top + rect.height / 2 - 160)));
      scale.set(0.44); rotate.set(-85); opacity.set(0.85);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    preference.addEventListener("change", schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); preference.removeEventListener("change", schedule); };
  }, [x, y, scale, rotate, opacity]);

  if (!enabled) return null;
  return <motion.div aria-hidden="true" data-guide-target={target} className="scroll-scissors" style={{ x, y, scale, rotate, opacity }}><Suspense fallback={null}><SignatureScene /></Suspense></motion.div>;
}