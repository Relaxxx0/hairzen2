import { useEffect, useRef, type CSSProperties } from "react";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

export const cssVars = (vars: Record<string, string | number>) => vars as CSSProperties;

/** Runs `cb` at most once per animation frame on scroll and on resize. */
export function useScrollFrame(cb: () => void) {
  const saved = useRef(cb);
  saved.current = cb;
  useEffect(() => {
    let ticking = false;
    const run = () => { ticking = false; saved.current(); };
    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(run); }
    };
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", run);
    run();
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", run);
    };
  }, []);
}

type RevealHost = Element & { revealTargets?: Element[] };

/** Adds `.in` to every `[data-reveal]` element once it scrolls into view. */
export function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      for (const en of entries) {
        if (!en.isIntersecting) continue;
        const host = en.target as RevealHost;
        (host.revealTargets || [host]).forEach(el => el.classList.add("in"));
        io.unobserve(host);
      }
    }, { threshold: .18, rootMargin: "0px 0px -6% 0px" });

    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach(el => {
      if (el.dataset.reveal !== "mask") return io.observe(el);
      const host = el.parentElement as RevealHost;
      (host.revealTargets ||= []).push(el);
      io.observe(host);
    });
    return () => io.disconnect();
  }, []);
}
