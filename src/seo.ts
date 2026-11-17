import en from "./i18n/en.json";
import de from "./i18n/de.json";
import ar from "./i18n/ar.json";
import { ADDRESS, DOCTOR, FAQ, PHONE_DISPLAY, SOCIAL, WHATSAPP_NUMBER } from "./data/site";
import { SEARCH_CONSOLE_VERIFICATION } from "./config";
import type { Lang } from "./i18n";

const DICT: Record<Lang, Record<string, string>> = { tr: {}, en, de, ar };
const tr = (lang: Lang, s: string) => DICT[lang][s] || s;

export const PATHS: Record<Lang, string> = { tr: "/", en: "/en/", de: "/de/", ar: "/ar/" };
const OG_LOCALE: Record<Lang, string> = { tr: "tr_TR", en: "en_US", de: "de_DE", ar: "ar_AR" };

export const TITLES: Record<Lang, string> = {
  tr: "Saç Ekimi İstanbul Ataşehir | DHI ve Safir FUE | Hairzen",
  en: "Hair Transplant Istanbul | DHI & Sapphire FUE | Hairzen",
  de: "Haartransplantation Istanbul | DHI & Saphir-FUE | Hairzen",
  ar: "زراعة الشعر في إسطنبول | DHI وFUE الياقوتية | Hairzen",
};
const DESCRIPTION_TR = "Hairzen: FUE, DHI ve Safir FUE ile saç ekimi. Evrenizi görün, 4 fotoğraf gönderin, doktorumuz 24 saat içinde greft planınızı çıkarsın.";
export const description = (lang: Lang) => tr(lang, DESCRIPTION_TR);

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

function structuredData(lang: Lang, site: string) {
  const url = site + PATHS[lang];
  const clinic = {
    "@type": "MedicalClinic",
    "@id": site + "/#clinic",
    name: "Hairzen Clinic",
    url,
    logo: site + "/hairzen-logo.svg",
    image: site + "/og-image.png",
    description: description(lang),
    telephone: PHONE_DISPLAY.replace(/\s/g, ""),
    address: {
      "@type": "PostalAddress",
      streetAddress: "Barbaros, Ihlamur Blv.",
      addressLocality: "Ataşehir",
      addressRegion: "İstanbul",
      postalCode: "34746",
      addressCountry: "TR",
    },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`,
    sameAs: [SOCIAL.instagram, SOCIAL.tiktok, SOCIAL.youtube, `https://wa.me/${WHATSAPP_NUMBER}`],
    availableService: ["FUE Saç Ekimi", "DHI Saç Ekimi", "Sakal Ekimi", "Kadın Saç Ekimi"].map(name => ({
      "@type": "MedicalProcedure",
      name: tr(lang, name),
    })),
    employee: {
      "@type": "Person",
      name: DOCTOR.name,
      jobTitle: tr(lang, DOCTOR.role),
      sameAs: `https://www.instagram.com/${DOCTOR.instagram.replace("@", "")}/`,
    },
  };
  const faq = {
    "@type": "FAQPage",
    mainEntity: FAQ.map(f => ({
      "@type": "Question",
      name: tr(lang, f.q),
      acceptedAnswer: { "@type": "Answer", text: tr(lang, f.a) },
    })),
  };
  const page = { "@type": "WebPage", url, name: TITLES[lang], inLanguage: lang, about: { "@id": clinic["@id"] } };
  return JSON.stringify({ "@context": "https://schema.org", "@graph": [clinic, page, faq] }).replace(/</g, "\\u003c");
}

/** Everything that goes into <head> for one language page. `site` has no trailing slash ("" if unknown). */
export function headTags(lang: Lang, site: string) {
  const abs = (p: string) => site + p;
  const tags = [
    `<title>${esc(TITLES[lang])}</title>`,
    `<meta name="description" content="${esc(description(lang))}">`,
    `<link rel="canonical" href="${abs(PATHS[lang])}">`,
    ...(Object.keys(PATHS) as Lang[]).map(l => `<link rel="alternate" hreflang="${l}" href="${abs(PATHS[l])}">`),
    `<link rel="alternate" hreflang="x-default" href="${abs(PATHS.en)}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="Hairzen Clinic">`,
    `<meta property="og:title" content="${esc(TITLES[lang])}">`,
    `<meta property="og:description" content="${esc(description(lang))}">`,
    `<meta property="og:url" content="${abs(PATHS[lang])}">`,
    `<meta property="og:image" content="${abs("/og-image.png")}">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta property="og:image:alt" content="Hairzen">`,
    `<meta property="og:locale" content="${OG_LOCALE[lang]}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<script type="application/ld+json">${structuredData(lang, site)}</script>`,
  ];
  if (SEARCH_CONSOLE_VERIFICATION) tags.push(`<meta name="google-site-verification" content="${esc(SEARCH_CONSOLE_VERIFICATION)}">`);
  return tags.join("\n");
}
