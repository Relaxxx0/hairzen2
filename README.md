# Hairzen – React + TypeScript

Sitenin React (Vite + TypeScript) sürümü. Görünüm, animasyonlar ve WhatsApp bağlantıları ana klasördeki `index.html` sürümüyle aynıdır.

## Çalıştırma

1. [Node.js LTS](https://nodejs.org) kurun (bir kez).
2. Bu klasörde bir terminal açıp:

```bash
npm install      # bağımlılıkları kurar (bir kez)
npm run dev      # geliştirme sunucusu: http://localhost:5173
npm run build    # yayına hazır dosyalar dist/ klasörüne çıkar
npm run preview  # dist/ klasörünü yerelde önizler
```

## Klasör yapısı

```
public/                 logo, fotoğraflar ve röportaj videoları
src/
  main.tsx              giriş noktası
  App.tsx               bölümlerin sırası, Norwood evresi durumu
  styles.css            tüm stiller
  i18n/                 dil sistemi: index.tsx (ülkeye göre dil seçimi), en.json, de.json, ar.json çevirileri
  data/site.ts          metinler, paketler, yorumlar, SSS, WhatsApp numarası, sosyal medya adresleri
  hooks/motion.ts       kaydırma ve görünme animasyonları
  components/           her bölüm ayrı bileşen (Splash, Header, Hero, Doctor, Why, Timeline,
                        Services, Pricing, Quote, Reviews, Interviews, Faq, AnalysisForm,
                        Footer, WhatsAppFab)
```

Metin, paket, yorum veya iletişim bilgisi değiştirmek için çoğu zaman yalnızca `src/data/site.ts` dosyasını düzenlemek yeterlidir.

## Diller

Site, ziyaretçinin ülkesine göre dili kendisi seçer: Türkiye → Türkçe, Almanya/Avusturya/İsviçre → Almanca, Arap ülkeleri → Arapça (sağdan sola), diğer ülkeler → İngilizce. Ülke, ücretsiz `api.country.is` servisinden öğrenilir. Ziyaretçi menüdeki dil seçiciyle dili değiştirebilir; seçimi tarayıcıda saklanır. `?lang=de` gibi bir adresle belirli bir dil zorlanabilir.

Çeviriler `src/i18n/*.json` dosyalarındadır. Anahtar Türkçe metnin kendisi, değer çevirisidir.

## Arama motoru (SEO) ve ölçüm

- `npm run build` her dil için ayrı, önceden üretilmiş bir HTML sayfası çıkarır: `/`, `/en/`, `/de/`, `/ar/` (`scripts/prerender.mjs`). Sayfa başlıkları, açıklamalar, canonical, hreflang, Open Graph ve Schema.org verisi `src/seo.ts` içindedir. `robots.txt` ve `sitemap.xml` de derlemede üretilir.
- Ayarlar tek dosyada: `src/config.ts`
  - `SITE_URL`: alan adınız (örn. `https://www.example.com`). Boşsa Vercel'in yayın adresi kullanılır.
  - `GA_ID`: Google Analytics 4 kimliği (`G-...`).
  - `ADS_ID` ve `ADS_LEAD_LABEL`: Google Ads etiketi (`AW-...`) ve dönüşüm etiketi.
  - `SEARCH_CONSOLE_VERIFICATION`: Search Console HTML etiketi doğrulama kodu (isteğe bağlı).
- Kimlikler girilince çerez onayı penceresi çıkar. Onaydan sonra WhatsApp tıklaması, telefon tıklaması ve analiz formu gönderimi dönüşüm olarak sayılır.
