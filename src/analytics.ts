import { ADS_ID, ADS_LEAD_LABEL, GA_ID } from "./config";

declare global {
  interface Window { dataLayer: unknown[]; gtag: (...args: unknown[]) => void }
}

export const analyticsEnabled = Boolean(GA_ID || ADS_ID);
const CONSENT_KEY = "hz-consent";

export const storedConsent = (): "granted" | "denied" | null => {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch { return null; }
};

const consentState = (v: "granted" | "denied") => ({
  ad_storage: v, ad_user_data: v, ad_personalization: v, analytics_storage: v,
});

/** Loads gtag.js (Google Consent Mode v2: nothing is stored until the visitor accepts)
 *  and counts WhatsApp and phone clicks as conversions. */
export function initAnalytics() {
  if (!analyticsEnabled) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag.js expects the arguments object itself.
    window.dataLayer.push(arguments);
  };
  window.gtag("consent", "default", { ...consentState(storedConsent() ?? "denied"), wait_for_update: 500 });
  window.gtag("js", new Date());
  if (GA_ID) window.gtag("config", GA_ID);
  if (ADS_ID) window.gtag("config", ADS_ID);
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID || ADS_ID}`;
  document.head.append(s);

  document.addEventListener("click", e => {
    const a = (e.target as Element | null)?.closest?.("a");
    const href = a?.getAttribute("href") || "";
    if (href.includes("wa.me/")) track("whatsapp_click", { link_text: a?.textContent?.trim().slice(0, 80) || "" });
    else if (href.startsWith("tel:")) track("phone_click");
  }, true);
}

export function setConsent(v: "granted" | "denied") {
  try { localStorage.setItem(CONSENT_KEY, v); } catch { /* private mode */ }
  if (analyticsEnabled) window.gtag("consent", "update", consentState(v));
}

/** Sends a GA4 event and, when configured, a Google Ads lead conversion. */
export function track(name: string, params: Record<string, string | number> = {}) {
  if (!analyticsEnabled) return;
  window.gtag("event", name, params);
  if (ADS_ID && ADS_LEAD_LABEL) window.gtag("event", "conversion", { send_to: `${ADS_ID}/${ADS_LEAD_LABEL}` });
}
