import { useRef, useState } from "react";
import { INTERVIEWS } from "../data/site";
import { cssVars } from "../hooks/motion";
import { useLang } from "../i18n";

export default function Interviews() {
  const { t } = useLang();
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const [playing, setPlaying] = useState<number | null>(null);
  const [withControls, setWithControls] = useState<number | null>(null);

  const pauseOthers = (i: number) =>
    videos.current.forEach((v, j) => { if (v && j !== i) v.pause(); });

  const play = (i: number) => {
    pauseOthers(i);
    setWithControls(i);
    videos.current[i]?.play();
  };

  const ended = (i: number) => {
    setPlaying(p => (p === i ? null : p));
    setWithControls(c => (c === i ? null : c));
    videos.current[i]?.load();
  };

  return (
    <section id="roportajlar" className="section interviews" aria-labelledby="roportaj-baslik">
      <div className="wrap">
        <div className="section-head">
          <h2 data-reveal="mask" id="roportaj-baslik">{t("Danışanlarımızla röportajlar")}</h2>
          <p data-reveal style={cssVars({ "--i": 1 })}>{t("Saç ekimi sürecini, operasyon gününü ve sonrasını Doğukan Denli'yle birlikte danışanlarımızın kendi ağzından dinleyin.")}</p>
        </div>
        <div className="vgrid" data-reveal="list">
          {INTERVIEWS.map((v, i) => (
            <figure className={`vcard${playing === i ? " playing" : ""}`} key={v.src}>
              <div className="vcard-media">
                <video src={v.src} poster={v.poster} preload="none" playsInline width={720} height={1280}
                  controls={withControls === i}
                  ref={el => { videos.current[i] = el; }}
                  onPlay={() => { setPlaying(i); pauseOthers(i); }}
                  onEnded={() => ended(i)} />
                <button className="vcard-play" type="button" aria-label={t("Röportaj {n} videosunu oynat", { n: i + 1 })} onClick={() => play(i)}><span /></button>
              </div>
              <figcaption>
                <b>{t("Röportaj {n}", { n: String(i + 1).padStart(2, "0") })}</b>
                <span>{t("Danışanımız deneyimini anlatıyor · {d}", { d: v.duration })}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
