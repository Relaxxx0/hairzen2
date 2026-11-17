import { useEffect, useState } from "react";
import { analyticsEnabled, setConsent, storedConsent } from "../analytics";
import { useLang } from "../i18n";

export default function ConsentBanner() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  useEffect(() => { setOpen(analyticsEnabled && storedConsent() === null); }, []);
  if (!open) return null;
  const choose = (v: "granted" | "denied") => { setConsent(v); setOpen(false); };
  return (
    <div className="consent" role="dialog" aria-label={t("Çerez tercihi")}>
      <p>{t("Ziyaretleri ölçmek ve reklamlarımızı iyileştirmek için çerez kullanıyoruz. İzin verirseniz Google Analytics ve Google Ads çerezleri etkinleşir.")}</p>
      <div className="consent-actions">
        <button type="button" className="consent-no" onClick={() => choose("denied")}>{t("Reddet")}</button>
        <button type="button" className="consent-yes" onClick={() => choose("granted")}>{t("Kabul et")}</button>
      </div>
    </div>
  );
}
