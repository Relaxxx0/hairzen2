import { useRef, useState } from "react";
import { NAV } from "../data/site";
import { clamp01, useScrollFrame } from "../hooks/motion";
import { LANGS, useLang, type Lang } from "../i18n";

export default function Header({ base = "" }: { base?: string }) {
  const { t, lang, setLang } = useLang();
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
        <select className="lang-select" id="lang-select" aria-label={t("Dil")} value={lang} onChange={e => setLang(e.target.value as Lang)}>
          {LANGS.map(l => <option key={l} value={l}>{l.toUpperCase()}</option>)}
        </select>
        <a className="btn btn-small" href={base + "#analiz"}>{t("Ücretsiz analiz")}</a>
      </div>
      <div className="progress" aria-hidden="true" />
    </header>
  );
}
