import { SERVICES, serviceMessage, waLink } from "../data/site";
import { cssVars } from "../hooks/motion";
import { useLang } from "../i18n";
import { SERVICE_PAGE, pagePath } from "../content/services";

export default function Services() {
  const { t, lang } = useLang();
  return (
    <section id="hizmetler" className="section" aria-labelledby="hizmet-baslik">
      <div className="wrap">
        <div className="section-head">
          <h2 data-reveal="mask" id="hizmet-baslik">{t("Hizmetlerimiz")}</h2>
          <p data-reveal style={cssVars({ "--i": 1 })}>{t("Saç, sakal ve kadın saç ekiminde yönteminizi saç yapınıza, açıklığın büyüklüğüne ve beklentinize göre birlikte seçeriz.")}</p>
        </div>
        <div className="pkg-grid" data-reveal="list">
          {SERVICES.map((s, i) => (
            <article className="pkg" key={s.name}>
              <span className="pkg-no">{String(i + 1).padStart(2, "0")}</span>
              <h3><a href={pagePath(lang, SERVICE_PAGE[s.name])}>{t(s.name)}</a></h3>
              <p>{t(s.text)}</p>
              <ul>{s.items.map(it => <li key={it}>{t(it)}</li>)}</ul>
              <a className="pkg-cta" href={waLink(serviceMessage(s.name, t))} target="_blank" rel="noopener">{t("Detaylı bilgi al")}</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
