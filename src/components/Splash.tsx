import { useEffect, useMemo, useRef } from "react";
import { prefersReducedMotion } from "../hooks/motion";
import { useLang } from "../i18n";

type Point = [number, number];

interface Shard {
  box: React.CSSProperties;
  img: React.CSSProperties;
  ux: number; uy: number; dist: number; z: number;
  rx: number; ry: number; rz: number; fall: number;
}

interface Spark {
  color: string; glow: string;
  ux: number; uy: number; dist: number; size: number;
}

const COLS = 10, ROWS = 3;
const clamp = (v: number) => Math.min(1, Math.max(0, v));
const span = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
const rnd = (a: number, b: number) => a + Math.random() * (b - a);
const easeIn = (t: number) => t * t * t;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/** Shatters the logo into jittered triangles. */
function makeShards(): Shard[] {
  const pts: Point[][] = [];
  for (let r = 0; r <= ROWS; r++) {
    pts.push([]);
    for (let c = 0; c <= COLS; c++) {
      const edgeX = c === 0 || c === COLS, edgeY = r === 0 || r === ROWS;
      pts[r].push([
        (c / COLS) * 100 + (edgeX ? 0 : rnd(-3.5, 3.5)),
        (r / ROWS) * 100 + (edgeY ? 0 : rnd(-11, 11)),
      ]);
    }
  }
  const shards: Shard[] = [];
  const add = (tri: Point[]) => {
    const xs = tri.map(p => p[0]), ys = tri.map(p => p[1]);
    const bx = Math.min(...xs), by = Math.min(...ys);
    const bw = Math.max(...xs) - bx, bh = Math.max(...ys) - by;
    const cx = (tri[0][0] + tri[1][0] + tri[2][0]) / 3, cy = (tri[0][1] + tri[1][1] + tri[2][1]) / 3;
    const ox = (cx - 50) * 191 / 45, oy = cy - 50;
    const len = Math.hypot(ox, oy) || 1;
    const ang = Math.atan2(oy, ox) + rnd(-.35, .35);
    shards.push({
      box: {
        left: bx + "%", top: by + "%", width: bw + "%", height: bh + "%",
        clipPath: `polygon(${tri.map(p => `${((p[0] - bx) / bw) * 100}% ${((p[1] - by) / bh) * 100}%`).join(",")})`,
      },
      img: { left: (-bx / bw) * 100 + "%", top: (-by / bh) * 100 + "%", width: 10000 / bw + "%", height: 10000 / bh + "%" },
      ux: Math.cos(ang), uy: Math.sin(ang),
      dist: rnd(.22, .55) * (0.7 + len / 260), z: rnd(-120, 260),
      rx: rnd(-220, 220), ry: rnd(-220, 220), rz: rnd(-160, 160), fall: rnd(20, 90),
    });
  };
  for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
    const a = pts[r][c], b = pts[r][c + 1], d = pts[r + 1][c], e = pts[r + 1][c + 1];
    if ((r + c) % 2) { add([a, b, e]); add([a, e, d]); }
    else { add([a, b, d]); add([b, e, d]); }
  }
  return shards;
}

function makeSparks(): Spark[] {
  return Array.from({ length: 36 }, (_, i) => {
    const gold = i % 3 === 0;
    const ang = rnd(0, Math.PI * 2);
    return {
      color: gold ? "#D9B54A" : "#9DB8FF",
      glow: `0 0 10px ${gold ? "rgba(217,181,74,.8)" : "rgba(127,163,255,.8)"}`,
      ux: Math.cos(ang), uy: Math.sin(ang), dist: rnd(.3, .75), size: rnd(.6, 1.6),
    };
  });
}

/** Scroll-driven intro: the logo grows, shatters and reveals #HairzenFarkıyla. */
export default function Splash() {
  const { t } = useLang();
  const shards = useMemo(makeShards, []);
  const sparks = useMemo(makeSparks, []);
  const secRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLParagraphElement>(null);
  const cueRef = useRef<HTMLAnchorElement>(null);
  const shardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sparkRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const sec = secRef.current!, logo = logoRef.current!, glow = glowRef.current!;
    const flash = flashRef.current!, tag = tagRef.current!, cue = cueRef.current!;
    const reduce = prefersReducedMotion();
    let target = 0, cur = 0, raf = 0, exit = 0;

    function render(p: number, now: number) {
      const vmax = Math.max(innerWidth, innerHeight);
      const grow = easeIn(span(p, 0, .42));
      const charge = reduce ? 0 : span(p, .28, .42) * (p < .42 ? 1 : 0);
      const jx = charge ? Math.sin(now / 23) * charge * 4 : 0;
      const jy = charge ? Math.cos(now / 29) * charge * 3 : 0;
      const scale = 1 + grow * 1.9;
      logo.style.transform = `translate3d(${jx}px, ${jy}px, 0) scale(${scale})`;

      const e = span(p, .42, .78), ee = easeOut(e);
      logo.classList.toggle("burst", e > 0);
      if (e > 0) {
        const fade = String(1 - span(e, .4, 1));
        shards.forEach((s, i) => {
          const el = shardRefs.current[i];
          if (!el) return;
          const d = s.dist * vmax * ee / scale;
          el.style.transform =
            `translate3d(${s.ux * d}px, ${s.uy * d + s.fall * e * e}px, ${s.z * ee / scale}px) ` +
            `rotateX(${s.rx * ee}deg) rotateY(${s.ry * ee}deg) rotateZ(${s.rz * ee}deg) scale(${1 - .35 * ee})`;
          el.style.opacity = fade;
        });
      }
      const se = span(p, .41, .7), see = easeOut(se);
      sparks.forEach((s, i) => {
        const el = sparkRefs.current[i];
        if (!el) return;
        const d = s.dist * vmax * see;
        el.style.transform = `translate3d(${s.ux * d}px, ${s.uy * d}px, 0) scale(${s.size * (1 - se * .6)})`;
        el.style.opacity = String(se > 0 ? 1 - se : 0);
      });

      const f = span(p, .39, .53);
      flash.style.opacity = (Math.sin(Math.PI * f) * .85).toFixed(3);
      flash.style.transform = `scale(${.4 + f * 3})`;
      glow.style.opacity = String((.35 + grow * .35) * (1 - ee));
      glow.style.transform = `scale(${1 + grow * 1.2 + ee})`;

      const t = easeOut(span(p, .6, .78));
      const x = span(exit, 0, .7), xe = x * x * (3 - 2 * x);
      tag.style.opacity = String(t * (1 - xe));
      const blur = Math.max((1 - t) * 14, xe * 12);
      tag.style.filter = blur > .05 ? `blur(${blur}px)` : "none";
      tag.style.transform = `translateY(${(1 - t) * 24 + exit * innerHeight * .45}px) scale(${.94 + t * .06 - xe * .08})`;
      cue.style.opacity = String(1 - span(p, 0, .08));
      return charge > 0;
    }

    function measure() {
      const range = sec.offsetHeight - innerHeight;
      const top = -sec.getBoundingClientRect().top;
      target = range > 0 ? clamp(top / range) : 1;
      exit = clamp((top - range) / innerHeight);
    }
    function tick(now: number) {
      cur += (target - cur) * .14;
      if (Math.abs(target - cur) < .0004) cur = target;
      const live = render(cur, now);
      raf = cur !== target || live ? requestAnimationFrame(tick) : 0;
    }
    function wake() { measure(); if (!raf) raf = requestAnimationFrame(tick); }

    addEventListener("scroll", wake, { passive: true });
    addEventListener("resize", wake);
    measure(); cur = target; render(cur, performance.now());
    return () => {
      removeEventListener("scroll", wake);
      removeEventListener("resize", wake);
      cancelAnimationFrame(raf);
    };
  }, [shards, sparks]);

  return (
    <section className="splash" id="intro" aria-label="Hairzen" ref={secRef}>
      <div className="splash-stage">
        <div className="splash-glow" aria-hidden="true" ref={glowRef} />
        <div className="splash-logo" id="splash-logo" ref={logoRef}>
          <img className="splash-whole" src="hairzen-logo.svg" alt="Hairzen" width={191} height={45} />
          {shards.map((s, i) => (
            <div className="shard" aria-hidden="true" key={i} style={s.box} ref={el => { shardRefs.current[i] = el; }}>
              <img src="hairzen-logo.svg" alt="" width={191} height={45} style={s.img} />
            </div>
          ))}
        </div>
        <div className="splash-flash" aria-hidden="true" ref={flashRef} />
        <p className="splash-tag" ref={tagRef}><span>#</span>HairzenFarkıyla</p>
        <a className="splash-skip" href="#icerik">{t("Siteye geç")}</a>
        <a className="splash-cue" href="#icerik" tabIndex={-1} aria-hidden="true" ref={cueRef}><span>{t("Aşağı kaydırın")}</span><i /></a>
        {sparks.map((s, i) => (
          <i className="spark" aria-hidden="true" key={i} style={{ background: s.color, boxShadow: s.glow }} ref={el => { sparkRefs.current[i] = el; }} />
        ))}
      </div>
    </section>
  );
}
