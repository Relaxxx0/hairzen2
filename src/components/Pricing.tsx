import { EXTRAS, PACKAGES, packageMessage, waLink } from "../data/site";
import { cssVars } from "../hooks/motion";

export default function Pricing() {
  return (
    <section id="fiyat" className="section section-tinted" aria-labelledby="fiyat-baslik">
      <div className="wrap">
        <div className="section-head">
          <h2 data-reveal="mask" id="fiyat-baslik">Fiyatlar ve paketler</h2>
          <p data-reveal style={cssVars({ "--i": 1 })}><b className="gold-name">Hairzen Klinik</b> saçlarınız için size en iyi hizmeti ve tedaviyi sunacaktır. Size uygun paketin güncel fiyatını analiz sonrası yazılı olarak iletiriz.</p>
        </div>
        <div className="plan-grid" data-reveal="list">
          {PACKAGES.map((p, i) => (
            <article className="plan" key={i}>
              <span className="plan-no">{i + 1}</span>
              <h3>{p.name}</h3>
              <p className="plan-label">Paket içerikleri</p>
              <ul>{p.items.map(it => <li key={it}>{it}</li>)}</ul>
              <a className="plan-cta" href={waLink(packageMessage(i + 1, p.name, p.items))} target="_blank" rel="noopener">Fiyat bilgisi al</a>
            </article>
          ))}
        </div>
        <div className="extras" data-reveal>
          <h3>Ek hizmetler</h3>
          <ul>{EXTRAS.map(e => <li key={e}>{e}</li>)}</ul>
        </div>
      </div>
    </section>
  );
}
