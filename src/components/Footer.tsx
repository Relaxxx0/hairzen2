import { useState, type KeyboardEvent } from "react";
import { ADDRESS, PHONE_DISPLAY, SOCIAL, WHATSAPP_NUMBER, waLink } from "../data/site";
import { ClockIcon, InstagramIcon, PhoneIcon, TikTokIcon, WhatsAppIcon, YouTubeIcon } from "./Icons";
import { useLang } from "../i18n";

const ADDRESS_Q = encodeURIComponent(ADDRESS).replace(/%2F/g, "/");

function LocationCard() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(o => !o);
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); }
  };
  return (
    <div className="loc">
      <div className="loc-card" role="button" tabIndex={0} aria-expanded={open}
        aria-label={t(open ? "Konum kartını kapat" : "Konum kartını aç")} onClick={toggle} onKeyDown={onKey}>
        <span className="loc-map" aria-hidden="true">
          <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice">
            <rect width="320" height="200" fill="#111d3e" />
            <g fill="rgba(255,255,255,.07)" stroke="rgba(255,255,255,.12)"><rect x="22" y="108" width="52" height="54" rx="6" /><rect x="128" y="34" width="42" height="40" rx="6" /><rect x="262" y="58" width="34" height="68" rx="6" /><rect x="250" y="150" width="58" height="44" rx="6" /><rect x="10" y="150" width="28" height="30" rx="5" /><rect x="200" y="14" width="44" height="22" rx="5" /></g>
            <g stroke="rgba(255,255,255,.22)" strokeLinecap="round"><path d="M0 90h320" strokeWidth="5" /><path d="M0 146h300" strokeWidth="4" /><path d="M106 0v200M236 0v170" strokeWidth="3" /><path d="M58 0v90M168 90v110M196 0v44" strokeWidth="1.5" /><path d="M0 60h140M180 120h140" strokeWidth="1.2" /></g>
          </svg>
          <iframe loading="lazy" src={`https://www.google.com/maps?q=${ADDRESS_Q}&z=15&hl=tr&output=embed`}
            title={t("Hairzen Klinik konumu, Google Haritalar")} tabIndex={-1} referrerPolicy="no-referrer-when-downgrade" />
        </span>
        <span className="loc-info"><b>{t("Ataşehir, İstanbul")}</b><small>{ADDRESS}</small></span>
      </div>
      <a className="loc-dir" href={`https://www.google.com/maps/search/?api=1&query=${ADDRESS_Q}`} target="_blank" rel="noopener">{t("Google Haritalar'da yol tarifi al")}</a>
    </div>
  );
}

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-cols">
          <div className="footer-brand">
            <a className="logo logo-footer" href="#intro" aria-label={t("Hairzen, sayfanın başına dön")}>
              <img src="/hairzen-logo.svg" alt="Hairzen" width={191} height={45} />
            </a>
            <p>{t("2016'dan bu yana 5.000'i aşkın danışana saç ekimi. Saç çizginiz, Doğukan Denli tarafından size özel tasarlanır.")}</p>
            <ul className="social">
              <li><a href={SOCIAL.instagram} target="_blank" rel="noopener" aria-label="Instagram: hairzenclinic"><InstagramIcon /></a></li>
              <li><a href={SOCIAL.tiktok} target="_blank" rel="noopener" aria-label="TikTok: hairzenclinic"><TikTokIcon /></a></li>
              <li><a href={SOCIAL.youtube} target="_blank" rel="noopener" aria-label="YouTube: hairzenclinic"><YouTubeIcon /></a></li>
              <li><a href={waLink()} target="_blank" rel="noopener" aria-label="WhatsApp"><WhatsAppIcon /></a></li>
            </ul>
          </div>
          <nav aria-label={t("Hizmetler")}>
            <h3>{t("Hizmetler")}</h3>
            <ul>
              {["FUE Saç Ekimi", "DHI Saç Ekimi", "Sakal Ekimi", "Kadın Saç Ekimi"].map(s => <li key={s}><a href="#hizmetler">{t(s)}</a></li>)}
            </ul>
          </nav>
          <nav aria-label={t("Kurumsal")}>
            <h3>{t("Kurumsal")}</h3>
            <ul>
              <li><a href="#ekimci">{t("Doktorumuz")}</a></li>
              <li><a href="#neden">{t("Neden Hairzen")}</a></li>
              <li><a href="#fiyat">{t("Fiyatlar")}</a></li>
              <li><a href="#yorumlar">{t("Danışan yorumları")}</a></li>
              <li><a href="#roportajlar">{t("Röportajlar")}</a></li>
              <li><a href="#sss">{t("Sık sorulanlar")}</a></li>
            </ul>
          </nav>
          <div>
            <h3>{t("İletişim")}</h3>
            <ul className="contact">
              <li><PhoneIcon /><a href={`tel:+${WHATSAPP_NUMBER}`}>{PHONE_DISPLAY}</a></li>
              <li><WhatsAppIcon /><a href={waLink()} target="_blank" rel="noopener">{t("WhatsApp'tan yazın")}</a></li>
              <li><ClockIcon /><span>{t("Pazartesi–Cumartesi, 08:00–19:00")}</span></li>
            </ul>
            <LocationCard />
          </div>
        </div>
        <div className="footer-bottom">
          <p>© <span id="year">{new Date().getFullYear()}</span> {t("Hairzen Clinic. Tüm hakları saklıdır.")}</p>
          <p>{t("Sonuçlar kişiden kişiye değişir. Bu sayfadaki bilgiler muayenenin yerini tutmaz.")}</p>
        </div>
      </div>
    </footer>
  );
}
