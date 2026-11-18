import { FAB_MESSAGE, serviceMessage, waLink } from "../data/site";
import { CONTENT, PAGE_IDS, pagePath, type PageId } from "../content/services";
import { langPath, useLang } from "../i18n";
import { WhatsAppIcon } from "./Icons";
import Pricing from "./Pricing";

/** One crawlable page per service (DHI, FUE, beard, women, prices) in every language. */
export default function ServicePage({ page }: { page: PageId }) {
  const { t, lang } = useLang();
  const c = CONTENT[page][lang];
  const home = langPath(lang);
  const message = c.service ? serviceMessage(c.service, t) : t(FAB_MESSAGE);
  return (
    <>
      <section className="svc-hero">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <a href={home}>Hairzen</a> <span aria-hidden="true">/</span> <span>{c.nav}</span>
          </nav>
          <h1>{c.h1}</h1>
          <p className="svc-lead">{c.intro}</p>
          <div className="svc-actions">
            <a className="btn" href={waLink(message)} target="_blank" rel="noopener"><WhatsAppIcon /> {t("Bize yazın")}</a>
            <a className="svc-line" href={home + "#analiz"}>{t("Ücretsiz analiz")}</a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap svc-body">
          {c.sections.map(s => (
            <div key={s.h2} data-reveal>
              <h2>{s.h2}</h2>
              <p>{s.p}</p>
            </div>
          ))}
          {c.steps && (
            <div className="svc-steps-box" data-reveal>
              <h2>{c.steps.h2}</h2>
              <ol className="svc-steps">{c.steps.items.map(s => <li key={s}>{s}</li>)}</ol>
            </div>
          )}
        </div>
      </section>

      {page === "prices" && <Pricing />}

      <section className="section section-tinted" aria-labelledby="svc-sss">
        <div className="wrap faq-grid">
          <h2 id="svc-sss">{t("Sık sorulanlar")}</h2>
          <div className="faq">
            {c.faq.map(f => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="svc-diger">
        <div className="wrap">
          <h2 id="svc-diger">{t("Hizmetlerimiz")}</h2>
          <ul className="svc-links">
            {PAGE_IDS.filter(id => id !== page).map(id => (
              <li key={id}><a href={pagePath(lang, id)}>{CONTENT[id][lang].nav}</a></li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
