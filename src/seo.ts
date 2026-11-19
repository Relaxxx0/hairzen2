import en from "./i18n/en.json";
import de from "./i18n/de.json";
import ar from "./i18n/ar.json";
import { ADDRESS, DOCTOR, FAQ, PHONE_DISPLAY, SOCIAL, WHATSAPP_NUMBER } from "./data/site";
import { SEARCH_CONSOLE_VERIFICATION } from "./config";
import type { Lang } from "./i18n";
import { CONTENT, pagePath, type PageId } from "./content/services";

const DICT: Record<Lang, Record<string, string>> = { tr: {}, en, de, ar };
const tr = (lang: Lang, s: string) => DICT[lang][s] || s;

export const PATHS: Record<Lang, string> = { tr: "/", en: "/en/", de: "/de/", ar: "/ar/" };
const OG_LOCALE: Record<Lang, string> = { tr: "tr_TR", en: "en_US", de: "de_DE", ar: "ar_AR" };

export const TITLES: Record<Lang, string> = {
  tr: "Saç Ekimi İstanbul Ataşehir | DHI ve Safir FUE | Hairzen",
  en: "Hair Transplant Turkey, Istanbul | DHI & Sapphire FUE | Hairzen",
  de: "Haartransplantation Türkei, Istanbul | DHI & Saphir-FUE | Hairzen",
  ar: "زراعة الشعر في تركيا، إسطنبول | DHI وFUE الياقوتية | Hairzen",
};
const DESCRIPTIONS: Record<Lang, string> = {
  tr: "İstanbul Anadolu yakası, Ataşehir'de FUE, DHI ve Safir FUE ile saç ekimi. Saç ekimi fiyatları için 4 fotoğraf gönderin, 24 saat içinde greft planınızı alın.",
  en: "Hair transplant in Istanbul, Turkey with FUE, DHI and Sapphire FUE. Send 4 photos for a free analysis and get your graft plan and package cost within 24 hours.",
  de: "Haartransplantation in Istanbul, Türkei mit FUE, DHI und Saphir-FUE. Senden Sie 4 Fotos für eine kostenlose Analyse und erhalten Sie Graft-Plan und Kosten in 24 Stunden.",
  ar: "زراعة الشعر في إسطنبول، تركيا بتقنيات FUE وDHI وFUE الياقوتية. أرسل 4 صور لتحليل مجاني واحصل على خطة البصيلات وتكلفة الباقة خلال 24 ساعة.",
};
export const description = (lang: Lang) => DESCRIPTIONS[lang];

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

function structuredData(lang: Lang, site: string, pageId: PageId | null) {
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
  const content = pageId ? CONTENT[pageId][lang] : null;
  const faqItems = content ? content.faq : FAQ.map(f => ({ q: tr(lang, f.q), a: tr(lang, f.a) }));
  const faq = {
    "@type": "FAQPage",
    mainEntity: faqItems.map(f => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const pageUrl = site + pagePath(lang, pageId);
  const page = {
    "@type": "WebPage", url: pageUrl, name: content ? content.title : TITLES[lang], inLanguage: lang,
    about: content && pageId !== "prices" ? { "@type": "MedicalProcedure", name: content.nav } : { "@id": clinic["@id"] },
    provider: content ? { "@id": clinic["@id"] } : undefined,
  };
  const graph: object[] = [clinic, page, faq];

  // SiteNavigationElement — Google menü linklerini "site navigasyonu" olarak anlasın diye
  // Anchor linkler (#ekimci) yerine GERÇEK ayrı sayfa URL'lerini veriyoruz (sitelink için)
  const servicePages: { id: PageId; labelKey: string }[] = [
    { id: "fue", labelKey: "FUE Saç Ekimi" },
    { id: "dhi", labelKey: "DHI Saç Ekimi" },
    { id: "beard", labelKey: "Sakal Ekimi" },
    { id: "women", labelKey: "Kadın Saç Ekimi" },
    { id: "prices", labelKey: "Fiyatlar" },
  ];
  const navItems = servicePages.map((sp, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: tr(lang, sp.labelKey),
    item: url + pagePath(lang, sp.id).replace(/^\//, ""), // leading slash kaldır (url zaten / ile bitiyor)
  }));
  graph.push({
    "@type": "SiteNavigationElement",
    name: "Ana Menü",
    url: url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    navigationItems: navItems,
  });

  if (content) graph.push({
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Hairzen", item: url },
      { "@type": "ListItem", position: 2, name: content.nav, item: pageUrl },
    ],
  });
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
}

/** Everything that goes into <head> for one page. `site` has no trailing slash ("" if unknown). */
export function headTags(lang: Lang, site: string, pageId: PageId | null = null) {
  const abs = (p: string) => site + p;
  const content = pageId ? CONTENT[pageId][lang] : null;
  const title = content ? content.title : TITLES[lang];
  const desc = content ? content.description : description(lang);
  const path = pagePath(lang, pageId);
  const tags = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(desc)}">`,
    `<link rel="canonical" href="${abs(path)}">`,
    ...(Object.keys(PATHS) as Lang[]).map(l => `<link rel="alternate" hreflang="${l}" href="${abs(pagePath(l, pageId))}">`),
    `<link rel="alternate" hreflang="x-default" href="${abs(pagePath("en", pageId))}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="Hairzen Clinic">`,
    `<meta property="og:title" content="${esc(title)}">`,
    `<meta property="og:description" content="${esc(desc)}">`,
    `<meta property="og:url" content="${abs(path)}">`,
    `<meta property="og:image" content="${abs("/og-image.png")}">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta property="og:image:alt" content="Hairzen">`,
    `<meta property="og:locale" content="${OG_LOCALE[lang]}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<script type="application/ld+json">${structuredData(lang, site, pageId)}</script>`,
  ];
  if (SEARCH_CONSOLE_VERIFICATION) tags.push(`<meta name="google-site-verification" content="${esc(SEARCH_CONSOLE_VERIFICATION)}">`);
  return tags.join("\n");
}
