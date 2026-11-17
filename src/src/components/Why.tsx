import { WHY } from "../data/site";
import { cssVars } from "../hooks/motion";
import { useLang } from "../i18n";

export default function Why() {
  const { t } = useLang();
  return (
    <section id="neden" className="section why" aria-labelledby="neden-baslik">
      <div className="wrap why-grid">
        <div className="why-head">
          <p className="why-tag" data-reveal><span>#</span>HairzenFarkıyla</p>
          <h2 data-reveal="mask" id="neden-baslik">{t("Neden Hairzen?")}</h2>
          <p data-reveal style={cssVars({ "--i": 1 })}>{t("Saç ekimi bir kez yapılır ve sonucu yıllarca taşınır. Bizi seçen danışanlarımızın en çok önem verdiği beş şey:")}</p>
        </div>
        <ol className="why-list" data-reveal="list">
          {WHY.map((w, i) => (
            <li key={w.title}>
              <span className="why-no">{String(i + 1).padStart(2, "0")}</span>
              <div><h3>{t(w.title)}</h3><p>{t(w.text)}</p></div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
