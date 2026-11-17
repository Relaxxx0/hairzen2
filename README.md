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
  data/site.ts          metinler, paketler, yorumlar, SSS, WhatsApp numarası, sosyal medya adresleri
  hooks/motion.ts       kaydırma ve görünme animasyonları
  components/           her bölüm ayrı bileşen (Splash, Header, Hero, Doctor, Why, Timeline,
                        Services, Pricing, Quote, Reviews, Interviews, Faq, AnalysisForm,
                        Footer, WhatsAppFab)
```

Metin, paket, yorum veya iletişim bilgisi değiştirmek için çoğu zaman yalnızca `src/data/site.ts` dosyasını düzenlemek yeterlidir.
