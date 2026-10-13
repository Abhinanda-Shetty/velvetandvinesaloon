import { motion, useReducedMotion } from "framer-motion";
import { ease } from "@/data/salon";

// Adapted from React Bits BlurText (MIT):
// https://github.com/DavidHDev/react-bits/blob/main/src/ts-tailwind/TextAnimations/BlurText/BlurText.tsx
export function BlurText({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <span className={className.replace("text-gold-sheen", "")} aria-label={text}>
      {text.split(" ").map((word, index) => (
        <motion.span
          aria-hidden
          key={`${word}-${index}`}
          className={className.includes("text-gold-sheen") ? "inline-block text-gold-sheen" : "inline-block"}
          initial={reduce ? false : { filter: "blur(10px)", opacity: 0, y: 30 }}
          whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, delay: delay + index * 0.12, ease }}
        >
          {word}{index < text.split(" ").length - 1 ? "\u00a0" : ""}
        </motion.span>
      ))}
    </span>
  );
}