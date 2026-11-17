import { useRef } from "react";
import { TIMELINE } from "../data/site";
import { clamp01, cssVars, prefersReducedMotion, useScrollFrame } from "../hooks/motion";

export default function Timeline() {
  const ref = useRef<HTMLOListElement>(null);
  useScrollFrame(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect(), vh = innerHeight;
    const p = prefersReducedMotion() ? 1 : clamp01((vh * .9 - r.top) / (vh * .75));
    el.style.setProperty("--p", p.toFixed(3));
  });

  return (
    <section id="surec" className="section section-tinted" aria-labelledby="surec-baslik">
      <div className="wrap">
        <div className="section-head">
          <h2 data-reveal="mask" id="surec-baslik">İlk yıl nasıl geçer</h2>
          <p data-reveal style={cssVars({ "--i": 1 })}>Saç ekimi bir günde biter ama sonucu bir yılda görünür. Hangi ayda ne olacağını önceden bilen hasta, üçüncü aydaki dökülmeden korkmaz.</p>
        </div>
        <ol className="timeline" id="timeline" ref={ref}>
          {TIMELINE.map(t => (
            <li key={t.title} style={cssVars({ "--len": t.len })}>
              <span className="hair" aria-hidden="true" />
              <h3>{t.title}</h3>
              <p>{t.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
