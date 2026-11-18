import { useRef } from "react";
import { TIMELINE } from "../data/site";
import { clamp01, cssVars, prefersReducedMotion, useScrollFrame } from "../hooks/motion";
import { useLang } from "../i18n";

export default function Timeline() {
  const { t } = useLang();
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
          <h2 data-reveal="mask" id="surec-baslik">{t("İlk yıl nasıl geçer")}</h2>
          <p data-reveal style={cssVars({ "--i": 1 })}>{t("Saç ekimi bir günde biter ama sonucu bir yılda görünür. Hangi ayda ne olacağını önceden bilen hasta, üçüncü aydaki dökülmeden korkmaz.")}</p>
        </div>
        <ol className="timeline" id="timeline" ref={ref}>
          {TIMELINE.map(x => (
            <li key={x.title} style={cssVars({ "--len": x.len })}>
              <span className="hair" aria-hidden="true" />
              <h3>{t(x.title)}</h3>
              <p>{t(x.text)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
