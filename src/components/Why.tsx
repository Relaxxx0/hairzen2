import { WHY } from "../data/site";
import { cssVars } from "../hooks/motion";

export default function Why() {
  return (
    <section id="neden" className="section why" aria-labelledby="neden-baslik">
      <div className="wrap why-grid">
        <div className="why-head">
          <p className="why-tag" data-reveal><span>#</span>HairzenFarkıyla</p>
          <h2 data-reveal="mask" id="neden-baslik">Neden Hairzen?</h2>
          <p data-reveal style={cssVars({ "--i": 1 })}>Saç ekimi bir kez yapılır ve sonucu yıllarca taşınır. Bizi seçen danışanlarımızın en çok önem verdiği beş şey:</p>
        </div>
        <ol className="why-list" data-reveal="list">
          {WHY.map((w, i) => (
            <li key={w.title}>
              <span className="why-no">{String(i + 1).padStart(2, "0")}</span>
              <div><h3>{w.title}</h3><p>{w.text}</p></div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
