import { useState } from "react";
import { FAB_MESSAGE, SOCIAL, waLink } from "../data/site";
import { useScrollFrame } from "../hooks/motion";
import { useLang } from "../i18n";
import { InstagramIcon, WhatsAppIcon } from "./Icons";

/** Floating Instagram and WhatsApp buttons, shown once the intro has scrolled away. */
export default function WhatsAppFab() {
  const { t } = useLang();
  const [show, setShow] = useState(false);
  useScrollFrame(() => {
    const intro = document.getElementById("intro");
    setShow(!intro || intro.getBoundingClientRect().bottom < innerHeight * .4);
  });
  return (
    <>
      <a className={`wa-fab ig-fab${show ? " show" : ""}`} href={SOCIAL.instagram} target="_blank" rel="noopener" aria-label={t("Instagram'da bizi takip edin")}>
        <InstagramIcon />
        <span className="wa-tip">{t("Instagram'da takip edin")}</span>
      </a>
      <a className={`wa-fab${show ? " show" : ""}`} href={waLink(t(FAB_MESSAGE))} target="_blank" rel="noopener" aria-label={t("WhatsApp'tan bize yazın")}>
        <WhatsAppIcon />
        <span className="wa-badge" aria-hidden="true">1</span>
        <span className="wa-tip">{t("Bize yazın")}</span>
      </a>
    </>
  );
}
