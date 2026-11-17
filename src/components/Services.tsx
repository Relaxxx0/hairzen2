import { SERVICES, serviceMessage, waLink } from "../data/site";
import { cssVars } from "../hooks/motion";

export default function Services() {
  return (
    <section id="hizmetler" className="section" aria-labelledby="hizmet-baslik">
      <div className="wrap">
        <div className="section-head">
          <h2 data-reveal="mask" id="hizmet-baslik">Hizmetlerimiz</h2>
          <p data-reveal style={cssVars({ "--i": 1 })}>Saç, sakal ve kadın saç ekiminde yönteminizi saç yapınıza, açıklığın büyüklüğüne ve beklentinize göre birlikte seçeriz.</p>
        </div>
        <div className="pkg-grid" data-reveal="list">
          {SERVICES.map((s, i) => (
            <article className="pkg" key={s.name}>
              <span className="pkg-no">{String(i + 1).padStart(2, "0")}</span>
              <h3>{s.name}</h3>
              <p>{s.text}</p>
              <ul>{s.items.map(it => <li key={it}>{it}</li>)}</ul>
              <a className="pkg-cta" href={waLink(serviceMessage(s.name))} target="_blank" rel="noopener">Detaylı bilgi al</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
