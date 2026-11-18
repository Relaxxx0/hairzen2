// Site-wide settings. Fill these in once; everything else reads from here.
// Değerler production'da ortam değişkenlerinden (Vercel/Netlify/ENV) gelebilir.
// Yerel geliştirme için .env.local dosyası oluşturup oraya yazabilirsiniz.

/** Production address without a trailing slash, e.g. "https://www.hairzendogukandenli.com".
 *  Boş bırakılırsa build SITE_URL ortam değişkenine veya Vercel'in production domain'ine düşer. */
export const SITE_URL = import.meta.env.VITE_SITE_URL || "https://www.hairzendogukandenli.com";

/** Google Analytics 4 measurement ID ("G-XXXXXXXXXX"). Boş = analytics kapalı.
 *  NOT: GTM (GTM-XXXXXXX) değil, GA4 Measurement ID (G-XXXXXXXXXX) girin.
 *  GA4: Admin → Data Streams → Web → Measurement ID */
export const GA_ID = import.meta.env.VITE_GA_ID || "";

/** Google Ads tag ID ("AW-XXXXXXXXX") ve lead conversion label. Boş = ads kapalı. */
export const ADS_ID = import.meta.env.VITE_ADS_ID || "";
export const ADS_LEAD_LABEL = import.meta.env.VITE_ADS_LEAD_LABEL || "";

/** Optional Search Console HTML-tag verification code (sadece content="..." değeri).
 *  Örn: google-site-verification=WG5q4IAB60voSxeCsm33Gg4zHwBxGt6rfiJJw1vsLNI → "WG5q4IAB60voSxeCsm33Gg4zHwBxGt6rfiJJw1vsLNI" */
export const SEARCH_CONSOLE_VERIFICATION = import.meta.env.VITE_SEARCH_CONSOLE_VERIFICATION || "WG5q4IAB60voSxeCsm33Gg4zHwBxGt6rfiJJw1vsLNI";

/** Sentry DSN (hata takibi için). Boş = Sentry kapalı. */
export const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN || "";

/** Sentry environment (production, staging, development). */
export const SENTRY_ENVIRONMENT = import.meta.env.VITE_SENTRY_ENVIRONMENT || (import.meta.env.PROD ? "production" : "development");

/** Sentry release version (örn. "1.0.0" veya git commit SHA). */
export const SENTRY_RELEASE = import.meta.env.VITE_SENTRY_RELEASE || "";