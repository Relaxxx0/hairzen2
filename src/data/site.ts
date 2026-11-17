export const WHATSAPP_NUMBER = "905052159898";
export const PHONE_DISPLAY = "+90 505 215 98 98";
export const ADDRESS = "Barbaros, Ihlamur Blv., 34746 Ataşehir/İstanbul";

export const waLink = (text?: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const NAV = [
  { href: "#ekimci", label: "Doktorumuz" },
  { href: "#neden", label: "Neden Hairzen" },
  { href: "#surec", label: "İlk yıl" },
  { href: "#hizmetler", label: "Hizmetler" },
  { href: "#fiyat", label: "Fiyatlar" },
  { href: "#yorumlar", label: "Yorumlar" },
  { href: "#sss", label: "Sorular" },
];

export interface Stage {
  c: number; t: number; v: number; rim: number; plan: number;
  grafts: string; text: string;
}

export const STAGES: Record<number, Stage> = {
  1: { c: .07, t: .03, v: 0,   rim: .8,  plan: -2,  grafts: "Ekim gerekmez", text: "Saç çizginiz yerinde. Dökülmeyi durdurmak için ilaç ve PRP çoğu zaman yeterlidir." },
  2: { c: .1,  t: .2,  v: 0,   rim: .8,  plan: 2,   grafts: "800–1.500 greft", text: "Şakaklarda hafif çekilme var. Çoğunlukla tıraşsız DHI ile 4–5 saatte tamamlanır." },
  3: { c: .16, t: .38, v: 0,   rim: .8,  plan: 2,   grafts: "1.500–2.500 greft", text: "Şakaklar belirgin şekilde açılmış. Tek seansta, 5–6 saatte tamamlanır." },
  4: { c: .34, t: .3,  v: .22, rim: .8,  plan: 2,   grafts: "2.500–3.500 greft", text: "Alın ve tepe birlikte açılmış. Genellikle tek seansta, 7–8 saatte tamamlanır." },
  5: { c: .6,  t: .25, v: .34, rim: .82, plan: 2,   grafts: "3.500–4.500 greft", text: "Ön bölge ile tepe arasındaki köprü inceliyor. Tek seansta mümkün; donör yoğunluğunuz belirleyici olur." },
  6: { c: 1.2, t: .1,  v: .45, rim: .84, plan: .3,  grafts: "4.500–5.500 greft", text: "Önden tepeye kadar açık. Önce ön ve orta bölge ekilir, tepe için ikinci seans gerekebilir." },
  7: { c: 1.5, t: 0,   v: .6,  rim: .87, plan: .08, grafts: "5.000+ greft", text: "Yalnızca yanlarda ve ensede saç kalmış. Donör bölge sınırlı olduğu için önceliği ön bölgeye veririz." },
};

export const DOCTOR = {
  name: "Doğukan Denli",
  role: "Saç ekimi alanında deneyimli uzman",
  lead: "Saç çizgisini yüz yapınıza, yaşınıza ve donör bölgenizin kapasitesine göre kendisi tasarlar. İlk görüşmeden 12. ay kontrolüne kadar süreci bizzat takip eder.",
  career: ["Hair Transplantation (FUE/DHI) Training"],
  instagram: "@dogukandenli",
  skills: ["Safir FUE", "DHI", "Saç çizgisi tasarımı", "Tıraşsız ekim", "Sakal ve kaş ekimi", "Kadın saç ekimi"],
};

export const WHY = [
  { title: "Steril Ortam", text: "Operasyonlar hastane standartlarında hazırlanan ameliyathanede yapılır. Her hastada tek kullanımlık sarf malzemeleri ve yeniden sterilize edilmiş cerrahi setler kullanılır." },
  { title: "Uzman Kadro", text: "Saç çizgisini Doğukan Denli kendisi tasarlar. Greftlerin alınması ve yerleştirilmesi boyunca deneyimli ekibi her aşamada yanındadır." },
  { title: "Danışan Memnuniyeti", text: "5.000'i aşkın danışanımızın tavsiyeleri en büyük referansımız. Beklentilerinizi dinler, sonucu baştan sizinle birlikte planlarız." },
  { title: "Son Teknoloji", text: "Safir uçlar, Choi implanter kalemleri ve mikromotor sistemleriyle greftler daha az travmayla alınır ve yerleştirilir." },
  { title: "7/24 Profesyonel Destek", text: "Operasyondan önce de sonra da aklınıza takılan her soru için günün her saati WhatsApp ve telefonla bize ulaşabilirsiniz." },
];

export const TIMELINE = [
  { len: 0, title: "Ekim günü", text: "Lokal anestezi, 6–8 saat. Akşam otele dönersiniz." },
  { len: .08, title: "3. gün", text: "İlk yıkama klinikte yapılır, bandaj çıkar." },
  { len: .12, title: "10. gün", text: "Kabuklar dökülür, işe dönebilirsiniz." },
  { len: .04, title: "1–3. ay", text: "Ekilen saçlar dökülür. Bu şok dökülmesidir ve beklenir; kökler yerinde kalır." },
  { len: .35, title: "4–6. ay", text: "Yeni saçlar ince çıkar, giderek kalınlaşır." },
  { len: .7, title: "9. ay", text: "Sonucun büyük kısmı görünür, saç şekil almaya başlar." },
  { len: 1, title: "12. ay", text: "Son kontrol ve fotoğraflar. Tepe bölgesi 18. aya kadar gelişebilir." },
];

export const SERVICES = [
  { name: "FUE Saç Ekimi", text: "Greftler ense ve yanlardan tek tek alınır, ince kanallara yerleştirilir.", items: ["Geniş açıklıklar için", "Tek seansta yüksek greft", "Safir uçla ince kanal"] },
  { name: "DHI Saç Ekimi", text: "Choi kalemiyle kanal açmadan, greftler doğrudan yerleştirilir.", items: ["Tıraşsız uygulanabilir", "Sık, doğal saç çizgisi", "Daha kısa kabuklanma"] },
  { name: "Sakal Ekimi", text: "Seyrek ya da boş sakal bölgeleri kendi köklerinizle doldurulur.", items: ["Kişiye özel sakal çizgisi", "Lokal anestezi", "Yanak ve bıyık sıklaştırma"] },
  { name: "Kadın Saç Ekimi", text: "Seyrelen bölgeler, mevcut saçlara dokunmadan sıklaştırılır.", items: ["Tıraşsız DHI tekniği", "Ayrım çizgisi sıklaştırma", "Doğal yoğunluk planı"] },
];

export const serviceMessage = (name: string) =>
  `Merhaba, ${name} hakkında detaylı bilgi almak istiyorum. Süreç ve bana uygun yöntem hakkında bilgi verebilir misiniz?`;

const BASE_PACKAGE = ["1 gece 2 gün konaklama", "VIP transfer", "4 seans ücretsiz PRP"];

export const PACKAGES = [
  { name: "Saç Ekimi Operasyonu", items: BASE_PACKAGE },
  { name: "Kök Hücre Saç Ekim Operasyonu", items: [...BASE_PACKAGE, "Kök hücre tedavisi"] },
  { name: "DHI Kök Hücre Saç Ekim Operasyonu", items: [...BASE_PACKAGE, "Kök hücre tedavisi", "DHI tekniğinin uygulanması"] },
  { name: "Saç Ekimi Operasyonu", items: [...BASE_PACKAGE, "6 aylık bakım seti"] },
];

export const packageMessage = (no: number, name: string, items: string[]) =>
  `Merhaba, ${no}. paket olan "${name}" paketinin fiyatı hakkında bilgi almak istiyorum.\nPaket içerikleri: ${items.join(", ")}.`;

export const EXTRAS = ["Sedasyon işlemi", "Sakal alımı", "6 aylık bakım seti"];

export const QUOTE = {
  text: "“Saç çizgisini yüzünüze, yaşınıza ve on yıl sonraki halinize göre çizerim. Bugün genç görünen ama 45 yaşında yapay duran bir çizgi istemem.”",
  author: "Doğukan Denli, saç ekimi uzmanı, 11 yılı aşkın deneyim",
};

export const TESTIMONIALS = [
  { name: "Mehmet Çolak", text: "19.09.2023 tarihinde Hairzenclinic de saç ekimi yaptırdım. Gerçekten bu kadar profesyonel bu kadar güler yüzlü, ilgi ve alakalı başka bir ekip ve saç ekim merkezi daha olamaz, tek kelimeyle harikaydı. En başta Doğukan hoca’ya, Hatice hanım’a ilgi ve alakasından dolayı çok teşekkür ediyorum. Teşekkürler Hairzenclinic ailesi…" },
  { name: "Gülsüm Özlü", text: "Saç ekimi yaptıran arkadaşımın 1. ay kontrolü ve PRP & Lazer uygulaması için onunla birlikte geldim. Çalışanlar gayet ilgili ve nazikti. Her işlemde bütün aşamaları en ince ayrıntısına kadar anlatıp öyle yaptılar. İlginize teşekkürler." },
  { name: "Oğuz Aktolu", text: "Saç ekim operasyonum öncesi çok hastane ve doktor araştırdım ve arkadaşlarımın önerisi ile Hairzenclinic ile tanıştım. Çok ilgili ve güler yüzlü bir ekiple karşılaştım. Operasyon öncesi, operasyon sırasında ve sonrasında çok ilgiliydiler. Operasyonum da çok sağlıklı geçti. Tekrardan tüm Hairzenclinic çalışanlarına ve Doğukan hocaya teşekkür ederim." },
  { name: "Adem Özgün", text: "Saç ekimi deneyimimden 10 gün sonra, şunu gönül rahatlığıyla söyleyebilirim ki, bu klinik, bugüne kadar deneyimlediğim en üst düzey hizmeti sundu. Doğukan Bey ve ekibinin profesyonelliği ve el becerisi, süreci beklediğimden çok daha konforlu ve keyifli hale getirdi. Şimdiden sonuçlardan bağımsız memnunum ve bu yolda beni destekleyen herkese minnettarım. Saç ekimi düşünen herkese tavsiye ederim!" },
];

export const INTERVIEWS = [
  { src: "hairzen1.mp4", poster: "hairzen1.jpg", duration: "1:16" },
  { src: "hairzen2.mp4", poster: "hairzen2.jpg", duration: "1:30" },
  { src: "hairzen3.mp4", poster: "hairzen3.jpg", duration: "1:30" },
];

export const FAQ = [
  { q: "Saç ekimi acıtır mı?", a: "Yalnızca lokal anestezi iğneleri sırasında birkaç dakika sızı hissedersiniz. Sonrasında işlem boyunca film izleyebilir, konuşabilir, öğle yemeği yiyebilirsiniz." },
  { q: "Ekilen saçlar tekrar döker mi?", a: "Greftler ense ve yanlardan alınır. Bu bölgedeki kökler dökülmeye neden olan hormona karşı dayanıklıdır, yeni yerinde de bu özelliğini korur. Ekim yapılmayan mevcut saçlarınız ise dökülmeye devam edebilir; bunun için ilaç ve PRP planı veririz." },
  { q: "Kimler saç ekimi için uygun değil?", a: "Donör bölgesi zayıf olanlar, kontrolsüz diyabet ya da kalp hastalığı olanlar ve dökülmesi henüz durmamış çok genç hastalar. Fotoğraf analizinde uygun olmadığınızı görürsek bunu açıkça söyleriz." },
  { q: "Ne zaman işe dönebilirim?", a: "Masa başı işlerde 3. gün dönebilirsiniz; şapka takmak 10. güne kadar önerilmez. Ağır spor ve yüzme için bir ay beklemek gerekir." },
  { q: "Kadınlara saç ekimi yapıyor musunuz?", a: "Evet. Kadın hastalarda çoğunlukla tıraşsız DHI ile, saç çizgisini indirme ya da ayrım yerini sıklaştırma uygulanır." },
];

export const SOCIAL = {
  instagram: "https://www.instagram.com/hairzenclinic/",
  tiktok: "https://www.tiktok.com/@hairzenclinic",
  youtube: "https://www.youtube.com/@hairzenclinic",
};

export const FAB_MESSAGE = "Merhaba, saç ekimi hakkında bilgi almak istiyorum.";
