import { FAQ } from "../data/site";

export default function Faq() {
  return (
    <section id="sss" className="section section-tinted" aria-labelledby="sss-baslik">
      <div className="wrap faq-grid">
        <h2 data-reveal="mask" id="sss-baslik">Sık sorulanlar</h2>
        <div className="faq" data-reveal="list">
          {FAQ.map(f => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
