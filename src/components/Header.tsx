import { useEffect, useRef, useState } from "react";
import { NAV } from "../data/site";
import { clamp01, useScrollFrame } from "../hooks/motion";
import { LANGS, useLang } from "../i18n";
import { Flag, LANG_NAMES } from "./Flags";

function LangMenu() {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => { if (!box.current?.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDown); document.removeEventListener("keydown", onKey); };
  }, [open]);

  return (
    <div className={`lang-menu${open ? " open" : ""}`} ref={box}>
      <button type="button" className="lang-btn" aria-haspopup="listbox" aria-expanded={open} aria-label={t("Dil")} onClick={() => setOpen(o => !o)}>
        <Flag lang={lang} />
        <span>{lang.toUpperCase()}</span>
        <svg className="lang-caret" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 4.5 6 7.5 9 4.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
      </button>
      {open && (
        <ul className="lang-list" role="listbox" aria-label={t("Dil")}>
          {LANGS.map(l => (
            <li key={l} role="option" aria-selected={l === lang}>
              <button type="button" className="lang-opt" onClick={() => { setLang(l); setOpen(false); }}>
                <Flag lang={l} />
                <span className="lang-name">{LANG_NAMES[l]}</span>
                <span className="lang-code">{l.toUpperCase()}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Header({ base = "" }: { base?: string }) {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const [compact, setCompact] = useState(false);

  useScrollFrame(() => {
    const root = document.documentElement;
    setCompact(scrollY > 40);
    ref.current?.style.setProperty("--read", clamp01(scrollY / (root.scrollHeight - innerHeight)).toFixed(4));
  });

  return (
    <header className={`site-header${compact ? " compact" : ""}`} ref={ref}>
      <div className="wrap header-row">
        <a className="logo" href={base || "#"} aria-label={t("Hairzen ana sayfa")}>
          <img src="/hairzen-logo.svg" alt="Hairzen" width={191} height={45} />
        </a>
        <nav aria-label={t("Ana menü")}>
          <ul className="nav-list">
            {NAV.map(n => <li key={n.href}><a href={base + n.href}>{t(n.label)}</a></li>)}
          </ul>
        </nav>
        <LangMenu />
        <a className="btn btn-small" href={base + "#analiz"}>{t("Ücretsiz analiz")}</a>
      </div>
      <div className="progress" aria-hidden="true" />
    </header>
  );
}
