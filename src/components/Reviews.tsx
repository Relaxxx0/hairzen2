import { TESTIMONIALS } from "../data/site";
import { cssVars } from "../hooks/motion";
import { StarIcon } from "./Icons";

function Cards() {
  return (
    <>
      {TESTIMONIALS.map(t => (
        <figure className="tcard" key={t.name}>
          <figcaption>
            <span className="tcard-avatar" aria-hidden="true">{t.name[0]}</span>
            <span><b>{t.name}</b><small>Hairzen danışanı</small></span>
          </figcaption>
          <div className="tcard-stars" role="img" aria-label="5 üzerinden 5 yıldız">
            {[0, 1, 2, 3, 4].map(i => <StarIcon key={i} />)}
          </div>
          <blockquote><p>{t.text}</p></blockquote>
        </figure>
      ))}
    </>
  );
}

export default function Reviews() {
  return (
    <section id="yorumlar" className="section reviews" aria-labelledby="yorum-baslik">
      <div className="wrap reviews-head">
        <h2 data-reveal="mask" id="yorum-baslik">Danışanlarımız ne diyor?</h2>
        <p data-reveal style={cssVars({ "--i": 1 })}>Hairzen'de saç ekimi yaptıran ya da kontrollerine gelen danışanlarımızın kendi sözleriyle deneyimleri.</p>
      </div>
      <div className="marquee" data-reveal>
        <div className="marquee-track">
          <div className="marquee-group"><Cards /></div>
          <div className="marquee-group" aria-hidden="true"><Cards /></div>
        </div>
      </div>
    </section>
  );
}
