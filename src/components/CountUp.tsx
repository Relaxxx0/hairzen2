import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../hooks/motion";

/** Counts from 0 to `value` the first time it scrolls into view. */
export default function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current!;
    if (prefersReducedMotion()) return;
    let raf = 0;
    const io = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const step = (now: number) => {
        const k = Math.min(1, (now - t0) / 1600), e = 1 - Math.pow(1 - k, 3);
        el.textContent = Math.round(value * e).toLocaleString("tr-TR");
        if (k < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, { threshold: .6 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value]);
  return <span ref={ref}>{value.toLocaleString("tr-TR")}</span>;
}
