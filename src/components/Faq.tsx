import { FAQ } from "../data/site";
import { useLang } from "../i18n";

export default function Faq() {
  const { t } = useLang();
  return (
    <section id="sss" className="section section-tinted" aria-labelledby="sss-baslik">
      <div className="wrap faq-grid">
        <h2 data-reveal="mask" id="sss-baslik">{t("Sık sorulanlar")}</h2>
        <div className="faq" data-reveal="list">
          {FAQ.map(f => (
            <details key={f.q}>
              <summary>{t(f.q)}</summary>
              <p>{t(f.a)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
