import { EXTRAS, PACKAGES, packageMessage, waLink } from "../data/site";
import { cssVars } from "../hooks/motion";
import { useLang } from "../i18n";

export default function Pricing() {
  const { t } = useLang();
  return (
    <section id="fiyat" className="section section-tinted" aria-labelledby="fiyat-baslik">
      <div className="wrap">
        <div className="section-head">
          <h2 data-reveal="mask" id="fiyat-baslik">{t("Saç ekimi fiyatları ve paketler")}</h2>
          <p data-reveal style={cssVars({ "--i": 1 })}><b className="gold-name">{t("Hairzen Klinik")}</b> {t("saçlarınız için size en iyi hizmeti ve tedaviyi sunacaktır. Size uygun paketin güncel fiyatını analiz sonrası yazılı olarak iletiriz.")}</p>
        </div>
        <div className="plan-grid" data-reveal="list">
          {PACKAGES.map((p, i) => (
            <article className="plan" key={i}>
              <span className="plan-no">{i + 1}</span>
              <h3>{t(p.name)}</h3>
              <p className="plan-label">{t("Paket içerikleri")}</p>
              <ul>{p.items.map(it => <li key={it}>{t(it)}</li>)}</ul>
              <a className="plan-cta" href={waLink(packageMessage(i + 1, p.name, p.items, t))} target="_blank" rel="noopener">{t("Fiyat bilgisi al")}</a>
            </article>
          ))}
        </div>
        <div className="extras" data-reveal>
          <h3>{t("Ek hizmetler")}</h3>
          <ul>{EXTRAS.map(e => <li key={e}>{t(e)}</li>)}</ul>
        </div>
      </div>
    </section>
  );
}
