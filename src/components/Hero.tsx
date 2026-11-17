import { Fragment, useEffect, useRef, useState } from "react";
import { STAGES, WHATSAPP_NUMBER, type Stage } from "../data/site";
import { cssVars, prefersReducedMotion } from "../hooks/motion";
import { useLang } from "../i18n";

type DotState = "hair" | "plan" | "bare";
interface Dot { x: number; y: number; r: number; nx: number; ny: number }

const RX = 100, RY = 135;
const designedHairline = (nx: number) => -0.86 + 0.36 * nx * nx;

function classify(nx: number, ny: number, s: Stage): DotState {
  const rho = Math.hypot(nx, ny);
  if (rho > s.rim && ny > -0.35) return "hair";
  const front = ny < -1 + s.c + s.t * Math.min(1, Math.abs(nx) / 0.55);
  const vertex = s.v > 0 && Math.hypot(nx, ny - 0.35) < s.v;
  if (!front && !vertex) return "hair";
  if (ny < designedHairline(nx)) return "bare";
  return ny < s.plan ? "plan" : "bare";
}

function seeded(seed: number) {
  return () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
}

const DOTS: Dot[] = (() => {
  const dots: Dot[] = [];
  const rand = seeded(7);
  const step = 8.6;
  for (let y = -RY, r = 0; y <= RY; y += step * 0.866, r++) {
    for (let x = -RX + (r % 2) * step / 2; x <= RX; x += step) {
      const px = x + (rand() - .5) * 3.2;
      const py = y + (rand() - .5) * 3.2;
      const nx = px / RX, ny = py / RY;
      if (Math.hypot(nx, ny) > 0.95) continue;
      dots.push({ x: +px.toFixed(1), y: +py.toFixed(1), r: +(1.9 + rand() * .7).toFixed(2), nx, ny });
    }
  }
  return dots;
})();

const HAIRLINE_D = "M" + Array.from({ length: 25 }, (_, i) => {
  const nx = -0.64 + (1.28 * i) / 24;
  return `${(nx * RX).toFixed(1)} ${(designedHairline(nx) * RY).toFixed(1)}`;
}).join(" L");

const NUM = /\d[\d.,]*/g;
const nums = (str: string) => (str.match(NUM) || []).map(n => Number(n.replace(/[.,]/g, "")));
const ease = (t: number) => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

interface Props {
  stage: number;
  onStageChange: (n: number) => void;
}

export default function Hero({ stage, onStageChange }: Props) {
  const { t, locale } = useLang();
  const heroRef = useRef<HTMLElement>(null);
  const hairRef = useRef<SVGPathElement>(null);
  const penRef = useRef<SVGCircleElement>(null);
  const graftsRef = useRef<HTMLParagraphElement>(null);
  const dotRefs = useRef<(SVGCircleElement | null)[]>([]);
  const states = useRef<(DotState | undefined)[]>([]);
  const applied = useRef(0);
  const tokens = useRef({ draw: 0, count: 0, len: 0 });
  const [started, setStarted] = useState(false);
  const [ready, setReady] = useState(false);
  const [intro, setIntro] = useState(true);

  useEffect(() => {
    const path = hairRef.current!;
    tokens.current.len = Math.ceil(path.getTotalLength());
    path.style.setProperty("--len", String(tokens.current.len));
    path.style.visibility = "hidden";
  }, []);

  useEffect(() => {
    const hero = heroRef.current!;
    const io = new IntersectionObserver(en => {
      if (!en[0].isIntersecting) return;
      io.disconnect();
      setStarted(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setReady(true)));
      setTimeout(() => setIntro(false), 2600);
    }, { threshold: .35 });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const hero = heroRef.current!;
    if (prefersReducedMotion() || !matchMedia("(hover: hover)").matches) return;
    const move = (e: PointerEvent) => {
      const r = hero.getBoundingClientRect();
      hero.style.setProperty("--mx", ((e.clientX - r.left) / r.width - .5).toFixed(3));
      hero.style.setProperty("--my", ((e.clientY - r.top) / r.height - .5).toFixed(3));
    };
    const leave = () => { hero.style.setProperty("--mx", "0"); hero.style.setProperty("--my", "0"); };
    hero.addEventListener("pointermove", move);
    hero.addEventListener("pointerleave", leave);
    return () => { hero.removeEventListener("pointermove", move); hero.removeEventListener("pointerleave", leave); };
  }, []);

  useEffect(() => {
    if (!started || applied.current === stage) return;
    const first = applied.current === 0;
    applied.current = stage;
    const reduce = prefersReducedMotion();
    const s = STAGES[stage];
    const tk = tokens.current;
    const grafts = t(s.grafts);
    const fmt = (n: number) => n.toLocaleString(locale);
    const hairFill = getComputedStyle(document.documentElement).getPropertyValue("--hair").trim();

    DOTS.forEach((d, i) => {
      const el = dotRefs.current[i];
      if (!el) return;
      const prev = states.current[i];
      const next = classify(d.nx, d.ny, s);
      if (!first && !reduce && prev && prev !== next && el.animate) {
        const delay = ((d.ny + 1) / 2) * 260;
        if (next === "plan") {
          el.animate(
            [{ transform: "scale(0)" }, { transform: "scale(1.8)", offset: .6 }, { transform: "scale(1)" }],
            { duration: 520, delay, easing: "cubic-bezier(.3,1.4,.5,1)", fill: "backwards" });
        } else if (prev === "hair") {
          el.animate(
            [{ fill: hairFill, stroke: "none", transform: "none", opacity: 1 },
             { fill: hairFill, stroke: "none", transform: "translateY(7px) scale(.3)", opacity: 0, offset: .55 },
             { opacity: 0, transform: "scale(.6)", offset: .56 },
             { opacity: 1, transform: "none" }],
            { duration: 700, delay, easing: "ease-in", fill: "backwards" });
        } else if (next === "hair") {
          el.animate(
            [{ transform: "translateY(-6px) scale(.2)", opacity: 0 }, { transform: "none", opacity: 1 }],
            { duration: 450, delay, easing: "cubic-bezier(.2,.8,.2,1)", fill: "backwards" });
        }
      }
      states.current[i] = next;
      el.setAttribute("class", next);
    });

    // Count the graft estimate up or down to the new value.
    const gEl = graftsRef.current!;
    const countToken = ++tk.count;
    const to = nums(grafts), from = nums(gEl.textContent || "");
    if (reduce || !to.length) gEl.textContent = grafts;
    else {
      const parts = grafts.split(NUM);
      const t0 = performance.now();
      const frame = (now: number) => {
        if (countToken !== tk.count) return;
        const k = Math.min(1, (now - t0) / 650), e = 1 - Math.pow(1 - k, 3);
        gEl.textContent = parts.map((p, j) => j < to.length ? p + fmt(Math.round((from[j] || 0) + (to[j] - (from[j] || 0)) * e)) : p).join("");
        if (k < 1) requestAnimationFrame(frame); else gEl.textContent = grafts;
      };
      requestAnimationFrame(frame);
    }

    // Draw the planned hairline with the marker pen.
    const path = hairRef.current!, pen = penRef.current!;
    const drawToken = ++tk.draw;
    const visible = stage > 1;
    path.style.visibility = visible ? "visible" : "hidden";
    pen.classList.remove("on");
    if (!visible) return;
    if (reduce) { path.style.strokeDashoffset = "0"; return; }
    path.style.strokeDashoffset = String(tk.len);
    const delay = first ? 1500 : 120;
    let t0: number | null = null;
    const frame = (now: number) => {
      if (drawToken !== tk.draw) return;
      if (t0 === null) t0 = now + delay;
      const k = Math.min(1, Math.max(0, (now - t0) / 1000));
      if (k > 0) pen.classList.add("on");
      const e = ease(k);
      path.style.strokeDashoffset = String(tk.len * (1 - e));
      const p = path.getPointAtLength(tk.len * e);
      pen.setAttribute("cx", p.x.toFixed(1));
      pen.setAttribute("cy", p.y.toFixed(1));
      if (k < 1) requestAnimationFrame(frame);
      else setTimeout(() => drawToken === tk.draw && pen.classList.remove("on"), 350);
    };
    requestAnimationFrame(frame);
  }, [stage, started, t, locale]);

  // Language switch: show the current estimate in the new language without re-animating.
  useEffect(() => {
    if (graftsRef.current) graftsRef.current.textContent = t(STAGES[stage].grafts);
  }, [t]);

  const s = STAGES[stage];
  return (
    <section className={`hero${started ? " go" : ""}`} aria-labelledby="hero-baslik" ref={heroRef}>
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <h1 id="hero-baslik">
            {["Saç çizginizi", "önce birlikte", "çizelim."].map((line, i) => (
              <Fragment key={i}>
                <span className="line" style={cssVars({ "--i": i })}><span>{t(line)}</span></span>{i < 2 ? " " : ""}
              </Fragment>
            ))}
          </h1>
          <p className="lead hero-in" style={cssVars({ "--i": 0 })}>{t("Ekimden önce doktorunuz yeni saç çizginizi alnınıza kalemle çizer, siz aynada onaylarsınız. Greft sayısı, yöntem ve fiyat bu çizgiye göre netleşir. Haritada evrenizi seçin, size ne kadar greft gerekebileceğini görün.")}</p>
          <div className="hero-actions hero-in" style={cssVars({ "--i": 1 })}>
            <a className="btn" href="#analiz">{t("Fotoğraflarımı gönder")}</a>
            <a className="link-light" href={`https://wa.me/${WHATSAPP_NUMBER}`} rel="noopener">{t("WhatsApp'tan yazın")}</a>
          </div>
          <p className="hero-note hero-in" style={cssVars({ "--i": 2 })}>{t("Doktor değerlendirmesi 24 saat içinde gelir. Ön görüşme ücretsizdir.")}</p>
        </div>

        <div className="scalp-panel" id="scalp-panel">
          <figure className="scalp-figure">
            <svg id="scalp" className={[intro && "intro", ready && "ready"].filter(Boolean).join(" ")} viewBox="-120 -150 240 300" role="img"
              aria-labelledby={started ? undefined : "scalp-title"}
              aria-label={started ? t("Norwood {n}. evre: {g}. {t}", { n: stage, g: t(s.grafts), t: t(s.text) }) : undefined}>
              <title id="scalp-title">{t("Tepeden kafa derisi haritası")}</title>
              <g className="ears">
                <ellipse cx="-104" cy="-6" rx="12" ry="24" />
                <ellipse cx="104" cy="-6" rx="12" ry="24" />
              </g>
              <text className="orient" x="0" y="-146">{t("Alın")}</text>
              <text className="orient" x="0" y="158">{t("Ense")}</text>
              <ellipse className="skin" cx="0" cy="0" rx="100" ry="135" />
              <g id="follicles">
                {DOTS.map((d, i) => (
                  <circle key={i} cx={d.x} cy={d.y} r={d.r} style={cssVars({ "--k": ((d.ny + 1) / 2).toFixed(3) })}
                    ref={el => { dotRefs.current[i] = el; }} />
                ))}
              </g>
              <path id="hairline" className="marker" d={HAIRLINE_D} ref={hairRef} />
              <circle id="pen" className="pen" r="4.5" cx="0" cy="0" ref={penRef} />
            </svg>
            <figcaption className="legend">
              <span><i className="dot dot-hair" />{t("Mevcut saç")}</span>
              <span><i className="dot dot-plan" />{t("Ekilecek bölge")}</span>
              <span><i className="dot dot-bare" />{t("Açık kalan")}</span>
            </figcaption>
          </figure>

          <fieldset className="stages">
            <legend>{t("Norwood evreniz")}</legend>
            <div className="stage-row" id="stage-row">
              {[1, 2, 3, 4, 5, 6, 7].map(n => (
                <Fragment key={n}>
                  <input type="radio" name="stage-pick" id={`stage-${n}`} value={n} checked={stage === n} onChange={() => onStageChange(n)} />
                  <label htmlFor={`stage-${n}`} aria-label={t("{n}. evre", { n })}>{n}</label>
                </Fragment>
              ))}
            </div>
          </fieldset>

          <div className="estimate" aria-live="polite">
            <p className="estimate-grafts" id="est-grafts" ref={graftsRef} />
            <p key={started ? stage : 0} className={`estimate-text${started ? " swap" : ""}`} id="est-text">{t(s.text)}</p>
          </div>
        </div>
      </div>
      <p className="wrap disclaimer">{t("Harita bilgilendirme amaçlıdır. Kesin greft sayısını donör bölgenizin yoğunluğu belirler; bunu ancak muayene ya da fotoğraf analizi gösterir.")}</p>
    </section>
  );
}
