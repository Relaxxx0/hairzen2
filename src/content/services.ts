import type { Lang } from "../i18n";

export type PageId = "dhi" | "fue" | "beard" | "women" | "prices";
export const PAGE_IDS: PageId[] = ["dhi", "fue", "beard", "women", "prices"];

export const SLUGS: Record<PageId, Record<Lang, string>> = {
  dhi: { tr: "dhi-sac-ekimi", en: "dhi-hair-transplant", de: "dhi-haartransplantation", ar: "dhi" },
  fue: { tr: "fue-sac-ekimi", en: "fue-hair-transplant", de: "fue-haartransplantation", ar: "fue" },
  beard: { tr: "sakal-ekimi", en: "beard-transplant", de: "barttransplantation", ar: "beard" },
  women: { tr: "kadin-sac-ekimi", en: "women-hair-transplant", de: "haartransplantation-frauen", ar: "women" },
  prices: { tr: "sac-ekimi-fiyatlari", en: "hair-transplant-cost-turkey", de: "haartransplantation-tuerkei-kosten", ar: "prices" },
};

export const pagePath = (lang: Lang, id: PageId | null) =>
  (lang === "tr" ? "/" : `/${lang}/`) + (id ? `${SLUGS[id][lang]}/` : "");

export interface ServiceContent {
  title: string;        // <title>
  description: string;  // meta description
  nav: string;          // short name for links
  h1: string;
  intro: string;
  sections: { h2: string; p: string }[];
  steps?: { h2: string; items: string[] };
  faq: { q: string; a: string }[];
  /** Service name used in the WhatsApp message (a key of the translation files). */
  service?: string;
}

type C = Record<Lang, ServiceContent>;

const dhi: C = {
  tr: {
    title: "DHI Saç Ekimi İstanbul | Tıraşsız Saç Ekimi | Hairzen", nav: "DHI saç ekimi", service: "DHI Saç Ekimi",
    description: "İstanbul Ataşehir'de DHI saç ekimi: Choi kalemiyle kanal açmadan, çoğu zaman tıraşsız uygulanan yöntem. Ücretsiz analiz ve DHI saç ekimi fiyatları için yazın.",
    h1: "İstanbul'da DHI saç ekimi",
    intro: "DHI yönteminde greftler Choi implanter kalemiyle, önceden kanal açmadan doğrudan yerleştirilir. Yöntem tıraşsız uygulanabildiği için mevcut saçınızı kestirmek istemiyorsanız ilk tercihtir.",
    sections: [
      { h2: "DHI saç ekimi kimlere uygun?", p: "Şakaklarda ya da alın çizgisinde çekilme olan, saç çizgisini sık ve doğal görünmesini isteyen ve tıraşsız saç ekimi tercih eden danışanlar için uygundur. Geniş açıklıklarda FUE ile birlikte planlanabilir." },
      { h2: "Tıraşsız saç ekimi nasıl olur?", p: "Greftler ense ve yanlardan alınır, ekim bölgesindeki mevcut saçlar kısaltılmadan Choi kalemiyle yerleştirilir. Kabuklanma süresi daha kısadır ve işe dönüş genellikle daha çabuktur." },
      { h2: "DHI ve FUE arasındaki fark", p: "FUE'de önce safir uçla ince kanallar açılır, greftler sonra bu kanallara yerleştirilir. DHI'da kanal açma ve yerleştirme tek adımda yapılır. Hangisinin size uygun olduğunu fotoğraf analizinden sonra birlikte seçeriz." },
    ],
    steps: { h2: "DHI saç ekimi süreci", items: ["Ücretsiz fotoğraf analizi ve greft planı", "Saç çizgisinin alnınıza kalemle çizilmesi ve onayınız", "Lokal anestezi ve greftlerin alınması", "Choi kalemiyle doğrudan yerleştirme", "3. gün klinikte ilk yıkama, 12 ay boyunca kontrol"] },
    faq: [
      { q: "DHI saç ekimi kaç saat sürer?", a: "Greft sayısına göre değişir; şakak çekilmelerinde genellikle 4–5 saat, daha geniş açıklıklarda 7–8 saate kadar sürer." },
      { q: "DHI saç ekimi fiyatları nasıl belirlenir?", a: "Fiyat; greft sayısına, seçilen pakete ve ek hizmetlere göre belirlenir. Fotoğraflarınızı gönderdikten sonra size uygun paketin fiyatını yazılı olarak iletiriz." },
      { q: "Tıraşsız saç ekimi herkese uygulanabilir mi?", a: "Her zaman değil. Çok geniş açıklıklarda tıraşlı FUE daha uygun olabilir. Bunu analizden sonra açıkça söyleriz." },
    ],
  },
  en: {
    title: "DHI Hair Transplant in Turkey, Istanbul | Unshaven | Hairzen", nav: "DHI hair transplant", service: "DHI Saç Ekimi",
    description: "DHI hair transplant in Istanbul, Turkey: grafts placed with the Choi pen without opening channels, often without shaving. Free analysis and package cost within 24 hours.",
    h1: "DHI hair transplant in Istanbul, Turkey",
    intro: "With DHI, grafts are placed directly with a Choi implanter pen, without opening channels first. Because it can be done without shaving, it is the first choice if you don't want to cut your existing hair.",
    sections: [
      { h2: "Who is DHI suitable for?", p: "Patients with receding temples or hairline who want a dense, natural hairline and prefer an unshaven transplant. For larger bald areas it can be planned together with FUE." },
      { h2: "How does an unshaven transplant work?", p: "Grafts are taken from the back and sides and placed with the Choi pen without cutting the existing hair in the recipient area. Scabbing is shorter and most patients return to work sooner." },
      { h2: "DHI vs FUE", p: "In FUE, fine channels are opened first with sapphire blades and the grafts are placed afterwards. In DHI, opening and placing happen in one step. We choose the right method together after your photo analysis." },
    ],
    steps: { h2: "The DHI process", items: ["Free photo analysis and graft plan", "Your hairline is drawn on your forehead and you approve it", "Local anaesthesia and graft extraction", "Direct placement with the Choi pen", "First wash at the clinic on day 3, follow-up for 12 months"] },
    faq: [
      { q: "How long does a DHI hair transplant take?", a: "It depends on the number of grafts: usually 4–5 hours for receding temples and up to 7–8 hours for larger areas." },
      { q: "How much does a DHI hair transplant in Turkey cost?", a: "The cost depends on the number of grafts, the package and any extras. After you send your photos, we send you the cost of the package that suits you in writing." },
      { q: "Is an unshaven transplant possible for everyone?", a: "Not always. For very large bald areas, shaven FUE may be better. We will tell you openly after the analysis." },
    ],
  },
  de: {
    title: "DHI Haartransplantation Türkei, Istanbul | Ohne Rasur | Hairzen", nav: "DHI-Haartransplantation", service: "DHI Saç Ekimi",
    description: "DHI-Haartransplantation in Istanbul, Türkei: Grafts werden mit dem Choi-Stift ohne Kanalöffnung eingesetzt, oft ohne Rasur. Kostenlose Analyse und Kosten in 24 Stunden.",
    h1: "DHI-Haartransplantation in Istanbul, Türkei",
    intro: "Bei der DHI-Methode werden die Grafts mit einem Choi-Implanter direkt eingesetzt, ohne vorher Kanäle zu öffnen. Da sie ohne Rasur möglich ist, ist sie die erste Wahl, wenn Sie Ihr vorhandenes Haar nicht kürzen möchten.",
    sections: [
      { h2: "Für wen eignet sich DHI?", p: "Für Patienten mit Geheimratsecken oder zurückweichendem Haaransatz, die einen dichten, natürlichen Haaransatz wünschen und eine Transplantation ohne Rasur bevorzugen. Bei größeren kahlen Stellen kann sie mit FUE kombiniert werden." },
      { h2: "Wie funktioniert eine Haartransplantation ohne Rasur?", p: "Die Grafts werden am Hinterkopf und an den Seiten entnommen und mit dem Choi-Stift eingesetzt, ohne das vorhandene Haar im Empfängerbereich zu kürzen. Die Krustenphase ist kürzer, die Rückkehr zur Arbeit meist schneller." },
      { h2: "DHI oder FUE?", p: "Bei FUE werden zuerst feine Kanäle mit Saphirklingen geöffnet und die Grafts danach eingesetzt. Bei DHI geschieht beides in einem Schritt. Welche Methode zu Ihnen passt, entscheiden wir gemeinsam nach der Fotoanalyse." },
    ],
    steps: { h2: "Ablauf der DHI-Haartransplantation", items: ["Kostenlose Fotoanalyse und Graft-Plan", "Der Haaransatz wird auf Ihre Stirn gezeichnet und von Ihnen bestätigt", "Lokalanästhesie und Entnahme der Grafts", "Direktes Einsetzen mit dem Choi-Stift", "Erste Haarwäsche in der Klinik am 3. Tag, Nachsorge über 12 Monate"] },
    faq: [
      { q: "Wie lange dauert eine DHI-Haartransplantation?", a: "Das hängt von der Graft-Anzahl ab: bei Geheimratsecken meist 4–5 Stunden, bei größeren Bereichen bis zu 7–8 Stunden." },
      { q: "Was kostet eine DHI-Haartransplantation in der Türkei?", a: "Die Kosten hängen von der Graft-Anzahl, dem Paket und den Zusatzleistungen ab. Nach Erhalt Ihrer Fotos senden wir Ihnen die Kosten des passenden Pakets schriftlich zu." },
      { q: "Ist eine Transplantation ohne Rasur für jeden möglich?", a: "Nicht immer. Bei sehr großen kahlen Stellen kann FUE mit Rasur besser sein. Das sagen wir Ihnen nach der Analyse offen." },
    ],
  },
  ar: {
    title: "زراعة الشعر بتقنية DHI في تركيا، إسطنبول | بدون حلاقة | Hairzen", nav: "زراعة الشعر بتقنية DHI", service: "DHI Saç Ekimi",
    description: "زراعة الشعر بتقنية DHI في إسطنبول، تركيا: تُزرع البصيلات بقلم Choi دون فتح قنوات، وغالبًا بدون حلاقة. تحليل مجاني وتكلفة الباقة خلال 24 ساعة.",
    h1: "زراعة الشعر بتقنية DHI في إسطنبول، تركيا",
    intro: "في تقنية DHI تُزرع البصيلات مباشرة بقلم Choi دون فتح قنوات مسبقًا. ولأنها ممكنة بدون حلاقة، فهي الخيار الأول إذا كنت لا ترغب في قص شعرك الحالي.",
    sections: [
      { h2: "لمن تناسب تقنية DHI؟", p: "للمرضى الذين يعانون من انحسار الصدغين أو خط الشعر ويرغبون في خط شعر كثيف وطبيعي ويفضلون الزراعة بدون حلاقة. في المساحات الكبيرة يمكن دمجها مع FUE." },
      { h2: "كيف تتم الزراعة بدون حلاقة؟", p: "تُؤخذ البصيلات من مؤخرة الرأس والجانبين وتُزرع بقلم Choi دون قص الشعر الموجود في منطقة الزراعة. فترة القشور أقصر والعودة إلى العمل أسرع غالبًا." },
      { h2: "الفرق بين DHI وFUE", p: "في FUE تُفتح قنوات دقيقة أولًا بالشفرة الياقوتية ثم تُزرع البصيلات. في DHI يتم الفتح والزرع في خطوة واحدة. نختار الطريقة المناسبة لك معًا بعد تحليل الصور." },
    ],
    steps: { h2: "مراحل زراعة الشعر بتقنية DHI", items: ["تحليل مجاني للصور وخطة البصيلات", "رسم خط الشعر على جبهتك وموافقتك عليه", "تخدير موضعي واستخراج البصيلات", "الزرع المباشر بقلم Choi", "الغسل الأول في العيادة في اليوم الثالث ومتابعة لمدة 12 شهرًا"] },
    faq: [
      { q: "كم تستغرق زراعة الشعر بتقنية DHI؟", a: "يعتمد ذلك على عدد البصيلات: عادةً 4–5 ساعات لانحسار الصدغين وحتى 7–8 ساعات للمساحات الأكبر." },
      { q: "ما تكلفة زراعة الشعر بتقنية DHI في تركيا؟", a: "تعتمد التكلفة على عدد البصيلات والباقة والخدمات الإضافية. بعد إرسال صورك نرسل لك تكلفة الباقة المناسبة كتابيًا." },
      { q: "هل الزراعة بدون حلاقة ممكنة للجميع؟", a: "ليس دائمًا. في المساحات الصلعاء الكبيرة جدًا قد تكون FUE مع الحلاقة أفضل، وسنخبرك بذلك بوضوح بعد التحليل." },
    ],
  },
};
import { fue } from "./fue";
import { beard } from "./beard";
import { women } from "./women";
import { prices } from "./prices";

export const CONTENT: Record<PageId, C> = { dhi, fue, beard, women, prices };

/** Which service page a URL points to (null = the home page). */
export const pageFromPath = (pathname: string): PageId | null => {
  const segs = pathname.split("/").filter(Boolean);
  const lang = (["en", "de", "ar"].includes(segs[0]) ? segs.shift() : "tr") as Lang;
  return PAGE_IDS.find(id => SLUGS[id][lang] === segs[0]) ?? null;
};

/** Service card name on the home page -> its own page. */
export const SERVICE_PAGE: Record<string, PageId> = {
  "FUE Saç Ekimi": "fue", "DHI Saç Ekimi": "dhi", "Sakal Ekimi": "beard", "Kadın Saç Ekimi": "women",
};
