import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import en from "./en.json";
import de from "./de.json";
import ar from "./ar.json";

export type Lang = "tr" | "en" | "de" | "ar";
export const LANGS: Lang[] = ["tr", "en", "de", "ar"];
const DICT: Record<Exclude<Lang, "tr">, Record<string, string>> = { en, de, ar };
const LOCALE: Record<Lang, string> = { tr: "tr-TR", en: "en-US", de: "de-DE", ar: "en-US" };
const GERMAN = ["DE", "AT", "CH", "LI"];
const ARABIC = ["SA", "AE", "QA", "KW", "BH", "OM", "EG", "JO", "IQ", "LB", "LY", "MA", "DZ", "TN", "SY", "YE", "PS", "SD", "MR"];

const isLang = (v: unknown): v is Lang => LANGS.includes(v as Lang);
export const fromCountry = (c: string): Lang =>
  c === "TR" ? "tr" : GERMAN.includes(c) ? "de" : ARABIC.includes(c) ? "ar" : "en";
const fromBrowser = (): Lang => {
  const n = (navigator.language || "tr").slice(0, 2).toLowerCase();
  return isLang(n) ? n : "en";
};
const store = (k: string, v: string, s: Storage = localStorage) => { try { s.setItem(k, v); } catch { /* private mode */ } };

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

declare global { interface Window { HZ_INITIAL_LANG?: Lang | null } }

export function LangProvider({ children }: { children: ReactNode }) {
  const initial = window.HZ_INITIAL_LANG;
  const [lang, setLangState] = useState<Lang>(isLang(initial) ? initial : fromBrowser());

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === "ar" ? "rtl" : "ltr";
    if (lang === "ar" && !document.getElementById("ar-font")) {
      const l = Object.assign(document.createElement("link"), {
        id: "ar-font",
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;700&family=Noto+Naskh+Arabic:wght@500;600&display=swap",
      });
      document.head.append(l);
    }
  }, [lang]);

  // First visit: pick the language from the visitor's country, keeping the page hidden for at most 1.5 s.
  useEffect(() => {
    if (isLang(initial)) return;
    let settled = false;
    const reveal = () => { settled = true; document.documentElement.classList.remove("hz-lang-wait"); };
    const timer = setTimeout(reveal, 1500);
    detectCountry()
      .then(c => {
        if (!c) return;
        const l = fromCountry(String(c).toUpperCase());
        store("hz-geo-lang", l, sessionStorage);
        if (!settled) setLangState(l);
      })
      .catch(() => {})
      .finally(() => { clearTimeout(timer); if (!settled) reveal(); });
  }, [initial]);

  const t = useCallback((key: string, vars?: Vars) => {
    let s = (lang !== "tr" && DICT[lang][key]) || key;
    if (vars) s = s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));
    return s;
  }, [lang]);

  const setLang = useCallback((l: Lang) => { store("hz-lang", l); setLangState(l); }, []);

  useEffect(() => {
    document.title = t("Hairzen Saç Ekimi Kliniği, Ataşehir İstanbul");
    document.querySelector('meta[name="description"]')?.setAttribute("content",
      t("Hairzen: FUE, DHI ve Safir FUE ile saç ekimi. Evrenizi görün, 4 fotoğraf gönderin, doktorumuz 24 saat içinde greft planınızı çıkarsın."));
  }, [t]);

  const value = useMemo(() => ({ lang, locale: LOCALE[lang], t, setLang }), [lang, t, setLang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside <LangProvider>");
  return ctx;
}
