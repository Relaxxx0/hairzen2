import { useRef, useState } from "react";
import { NAV } from "../data/site";
import { clamp01, useScrollFrame } from "../hooks/motion";

export default function Header() {
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
        <a className="logo" href="#" aria-label="Hairzen ana sayfa">
          <img src="hairzen-logo.svg" alt="Hairzen" width={191} height={45} />
        </a>
        <nav aria-label="Ana menü">
          <ul className="nav-list">
            {NAV.map(n => <li key={n.href}><a href={n.href}>{n.label}</a></li>)}
          </ul>
        </nav>
        <a className="btn btn-small" href="#analiz">Ücretsiz analiz</a>
      </div>
      <div className="progress" aria-hidden="true" />
    </header>
  );
}
