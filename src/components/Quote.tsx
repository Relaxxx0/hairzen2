import { useRef, useState } from "react";
import { QUOTE } from "../data/site";
import { clamp01, prefersReducedMotion, useScrollFrame } from "../hooks/motion";

const WORDS = QUOTE.text.split(/\s+/);

export default function Quote() {
  const ref = useRef<HTMLParagraphElement>(null);
  const [lit, setLit] = useState(0);
  useScrollFrame(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect(), vh = innerHeight;
    const p = prefersReducedMotion() ? 1 : clamp01((vh * .85 - r.top) / (vh * .5));
    setLit(Math.round(p * WORDS.length));
  });

  return (
    <section className="section doctor" aria-labelledby="doktor-baslik">
      <div className="wrap doctor-grid">
        <div>
          <h2 data-reveal="mask" id="doktor-baslik">Saç çizgisini uzmanımız çizer, kanalları uzmanımız açar</h2>
          <blockquote>
            <p className="scrub-words" ref={ref}>
              {WORDS.map((w, i) => (
                <span key={i}><span className={`w${i < lit ? " lit" : ""}`}>{w}</span>{i < WORDS.length - 1 ? " " : ""}</span>
              ))}
            </p>
            <footer>{QUOTE.author}</footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
