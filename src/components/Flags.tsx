import type { Lang } from "../i18n";

export const LANG_NAMES: Record<Lang, string> = { tr: "Türkçe", en: "English", de: "Deutsch", ar: "العربية" };

const starPoints = (cx: number, cy: number, ro: number, ri: number) => {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? ro : ri;
    const a = (Math.PI / 5) * i - Math.PI / 2;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`);
  }
  return pts.join(" ");
};

function Turkey() {
  return (
    <g>
      <rect width="24" height="18" fill="#E30A17" />
      <path fill="#fff" fillRule="evenodd" d="M9.6 4.4a4.6 4.6 0 1 0 0 9.2 4.6 4.6 0 1 0 0-9.2M12.3 5.7a3.9 3.9 0 1 0 0 7.8 3.9 3.9 0 1 0 0-7.8" />
      <polygon fill="#fff" points={starPoints(16.4, 9, 1.9, 0.78)} />
    </g>
  );
}

function Germany() {
  return (
    <g>
      <rect width="24" height="6" fill="#000" />
      <rect y="6" width="24" height="6" fill="#DD0000" />
      <rect y="12" width="24" height="6" fill="#FFCC00" />
    </g>
  );
}

const US_STRIPES = Array.from({ length: 13 }, (_, i) => ({ y: (i * 18) / 13, h: 18 / 13, red: i % 2 === 0 }));

function English() {
  const dots = [];
  for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) dots.push(<circle key={`${r}-${c}`} cx={1.6 + c * 1.85} cy={2.2 + r * 1.9 + (c % 2 ? 0.45 : 0)} r="0.3" fill="#fff" />);
  return (
    <g>
      {US_STRIPES.map((s, i) => <rect key={i} y={s.y} width="24" height={s.h + 0.05} fill={s.red ? "#B22234" : "#fff"} />)}
      <rect width="9.8" height="9.8" fill="#3C3B6E" />
      {dots}
    </g>
  );
}

function Arabic() {
  return (
    <g>
      <rect width="24" height="18" fill="#006C35" />
      <text x="12" y="7.6" textAnchor="middle" fill="#fff" fontSize="2.7" fontFamily="Tahoma, Arial, sans-serif">لا إله إلا الله</text>
      <text x="12" y="10.6" textAnchor="middle" fill="#fff" fontSize="2.7" fontFamily="Tahoma, Arial, sans-serif">محمد رسول الله</text>
      <path d="M6.5 14.6l10.6-1.1-1.2 1.6-1 2.2h-6.4l-1.4-1.4z" fill="#fff" />
    </g>
  );
}

const FLAGS: Record<Lang, () => JSX.Element> = { tr: Turkey, en: English, de: Germany, ar: Arabic };

export function Flag({ lang }: { lang: Lang }) {
  const F = FLAGS[lang];
  return (
    <svg className="flag" viewBox="0 0 24 18" role="img" aria-label={LANG_NAMES[lang]} focusable="false">
      <F />
    </svg>
  );
}
