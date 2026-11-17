import { TESTIMONIALS } from "../data/site";
import { cssVars } from "../hooks/motion";
import { StarIcon } from "./Icons";
import { useLang } from "../i18n";

function Cards() {
  const { t } = useLang();
  return (
    <>
      {TESTIMONIALS.map(x => (
        <figure className="tcard" key={x.name}>
          <figcaption>
            <span className="tcard-avatar" aria-hidden="true">{x.name[0]}</span>
            <span><b>{x.name}</b><small>{t("Hairzen danışanı")}</small></span>
          </figcaption>
          <div className="tcard-stars" role="img" aria-label={t("5 üzerinden 5 yıldız")}>
            {[0, 1, 2, 3, 4].map(i => <StarIcon key={i} />)}
          </div>
          <blockquote><p>{t(x.text)}</p></blockquote>
        </figure>
      ))}
    </>
  );
}

export default function Reviews() {
  const { t } = useLang();
  return (
    <section id="yorumlar" className="section reviews" aria-labelledby="yorum-baslik">
      <div className="wrap reviews-head">
        <h2 data-reveal="mask" id="yorum-baslik">{t("Danışanlarımız ne diyor?")}</h2>
        <p data-reveal style={cssVars({ "--i": 1 })}>{t("Hairzen'de saç ekimi yaptıran ya da kontrollerine gelen danışanlarımızın kendi sözleriyle deneyimleri.")}</p>
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
