import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface BlurTextProps {
  text: string;
  className?: string;
}

export function BlurText({ text, className }: BlurTextProps) {
  const ref = useRef<HTMLHeadingElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");

  return (
    <h1 ref={ref} className={cn("text-balance", className)}>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className="mr-[0.25em] inline-block last:mr-0"
          initial={{
            opacity: 0,
            y: reduceMotion ? 0 : 50,
            filter: reduceMotion ? "blur(0px)" : "blur(10px)",
          }}
          animate={
            isInView
              ? {
                  opacity: [0, 0.5, 1],
                  y: reduceMotion ? 0 : [50, -5, 0],
                  filter: reduceMotion
                    ? "blur(0px)"
                    : ["blur(10px)", "blur(5px)", "blur(0px)"],
                }
              : undefined
          }
          transition={{
            duration: reduceMotion ? 0.01 : 0.35,
            delay: reduceMotion ? 0 : index * 0.1,
            ease: "easeOut",
          }}
        >
          {word}
        </motion.span>
      ))}
    </h1>
  );
}
