import { DOCTOR } from "../data/site";
import { cssVars } from "../hooks/motion";
import CountUp from "./CountUp";

export default function Doctor() {
  return (
    <section id="ekimci" className="section ekimci" aria-labelledby="ekimci-baslik">
      <div className="wrap ekimci-grid">
        <figure className="ekimci-photo" data-reveal="photo">
          <img src="ekimci.jpg" srcSet="ekimci-560.jpg 560w, ekimci.jpg 895w" sizes="(max-width: 960px) 92vw, 42vw"
            width={895} height={893} decoding="async"
            alt={`${DOCTOR.name}, operasyon sırasında hastanın saç çizgisini hazırlıyor`} />
        </figure>
        <div className="ekimci-info">
          <p className="ekimci-role" data-reveal>{DOCTOR.role}</p>
          <h2 data-reveal="mask" id="ekimci-baslik">{DOCTOR.name}</h2>
          <p className="ekimci-lead" data-reveal style={cssVars({ "--i": 1 })}>{DOCTOR.lead}</p>
          <dl className="ekimci-facts" data-reveal="list">
            <div>
              <dt>Deneyim</dt>
              <dd className="fact-num"><CountUp value={11} />+<small>yıl</small></dd>
              <dd className="fact-note">2016'dan bu yana saç ekimi</dd>
            </div>
            <div>
              <dt>Hastalar</dt>
              <dd className="fact-num"><CountUp value={5000} />+<small>hasta</small></dd>
              <dd className="fact-note">Her biri kişiye özel saç çizgisi planıyla</dd>
            </div>
            <div>
              <dt>Kariyer</dt>
              <dd>
                <ol className="career">
                  {DOCTOR.career.map(c => <li key={c}><span>{c}</span></li>)}
                </ol>
              </dd>
              <dt className="fact-sub">Instagram</dt>
              <dd className="fact-handle">{DOCTOR.instagram}</dd>
            </div>
            <div>
              <dt>Uzmanlık</dt>
              <dd>
                <ul className="chips">
                  {DOCTOR.skills.map(s => <li key={s}>{s}</li>)}
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
