import { pagePath, pageFromPath } from "../content/services";
import { createContext, useCallback, useContext, useEffect, useMemo, type ReactNode } from "react";
import en from "./en.json";
import de from "./de.json";
import ar from "./ar.json";

export type Lang = "tr" | "en" | "de" | "ar";
export const LANGS: Lang[] = ["tr", "en", "de", "ar"];
const DICT: Record<Exclude<Lang, "tr">, Record<string, string>> = { en, de, ar };
const LOCALE: Record<Lang, string> = { tr: "tr-TR", en: "en-US", de: "de-DE", ar: "en-US" };
const GERMAN = ["DE", "AT", "CH", "LI"];
const ARABIC = ["SA", "AE", "QA", "KW", "BH", "OM", "EG", "JO", "IQ", "LB", "LY", "MA", "DZ", "TN", "SY", "YE", "PS", "SD", "MR"];

export const isLang = (v: unknown): v is Lang => LANGS.includes(v as Lang);
export const langPath = (l: Lang) => (l === "tr" ? "/" : `/${l}/`);
export const langFromPath = (pathname: string): Lang => {
  const seg = pathname.split("/")[1];
  return isLang(seg) ? seg : "tr";
};
const fromCountry = (c: string): Lang =>
  c === "TR" ? "tr" : GERMAN.includes(c) ? "de" : ARABIC.includes(c) ? "ar" : "en";
const store = (k: string, v: string, s: "local" | "session" = "local") => {
  try { (s === "local" ? localStorage : sessionStorage).setItem(k, v); } catch { /* private mode */ }
};

async function detectCountry(): Promise<string | undefined> {
  try {
    return (await (await fetch("https://api.country.is/")).json()).country;
  } catch {
    return (await (await fetch("https://get.geojs.io/v1/ip/country.json")).json()).country;
  }
}

type Vars = Record<string, string | number>;
interface Ctx {
  lang: Lang;
  locale: string;
  t: (key: string, vars?: Vars) => string;
  setLang: (l: Lang) => void;
}
const LangContext = createContext<Ctx | null>(null);

/** The page language comes from the URL (/, /en/, /de/, /ar/); each one is a prerendered page. */
export function LangProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  useEffect(() => {
    if (lang === "ar" && !document.getElementById("ar-font")) {
      document.head.append(Object.assign(document.createElement("link"), {
        id: "ar-font",
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;700&family=Noto+Naskh+Arabic:wght@500;600&display=swap",
      }));
    }
  }, [lang]);

  // First visit to the Turkish home page: send foreign visitors to their language page.
  // The page stays hidden (hz-lang-wait, set in index.html) for at most 1.5 s.
  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("hz-lang-wait")) return;
    let settled = false;
    const reveal = () => { settled = true; root.classList.remove("hz-lang-wait"); };
    const timer = setTimeout(reveal, 1500);
    detectCountry()
      .then(c => {
        if (!c) return;
        const l = fromCountry(String(c).toUpperCase());
        store("hz-geo-lang", l, "session");
        if (!settled && l !== lang) {
          settled = true;
          location.replace(langPath(l) + location.search + location.hash);
        }
      })
      .catch(() => {})
      .finally(() => { clearTimeout(timer); if (!settled) reveal(); });
  }, [lang]);

  const t = useCallback((key: string, vars?: Vars) => {
    let s = (lang !== "tr" && DICT[lang][key]) || key;
    if (vars) s = s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));
    return s;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    store("hz-lang", l);
    if (l !== lang) location.href = pagePath(l, pageFromPath(location.pathname)) + location.hash;
  }, [lang]);

  const value = useMemo(() => ({ lang, locale: LOCALE[lang], t, setLang }), [lang, t, setLang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside <LangProvider>");
  return ctx;
}
