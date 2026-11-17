import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { waLink } from "../data/site";
import { track } from "../analytics";
import { FieldIcon, WhatsAppIcon } from "./Icons";
import { useLang } from "../i18n";

type Field = "name" | "phone" | "kvkk";

interface Props {
  stage: number;
  onStageChange: (n: number) => void;
}

const STAGE_VALUES = [1, 2, 3, 4, 5, 6, 7, 0];

export default function AnalysisForm({ stage, onStageChange }: Props) {
  const { t } = useLang();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [kvkk, setKvkk] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [over, setOver] = useState(false);
  const [errors, setErrors] = useState<Record<Field, boolean>>({ name: false, phone: false, kvkk: false });
  const [sentUrl, setSentUrl] = useState<string | null>(null);
  const [sentCount, setSentCount] = useState(0);
  const refs = {
    name: useRef<HTMLInputElement>(null),
    phone: useRef<HTMLInputElement>(null),
    kvkk: useRef<HTMLInputElement>(null),
  };
  const doneRef = useRef<HTMLDivElement>(null);
  const stageLabel = (n: number) => (n ? t("{n}. evre", { n }) : t("Emin değilim"));
  const photoHint = (n: number) =>
    n === 0 ? t("En az 4 fotoğraf seçin.")
      : n < 4 ? t("{n} fotoğraf seçildi. {m} tane daha ekleyin ya da eksikleri WhatsApp'tan gönderin.", { n, m: 4 - n })
        : t("{n} fotoğraf seçildi.", { n });

  const previews = useMemo(() => files.slice(0, 12).map(f => URL.createObjectURL(f)), [files]);
  useEffect(() => () => previews.forEach(src => URL.revokeObjectURL(src)), [previews]);

  useEffect(() => { if (sentUrl) doneRef.current?.focus(); }, [sentUrl, sentCount]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next = {
      name: name.trim().length <= 1,
      phone: phone.replace(/\D/g, "").length < 10,
      kvkk: !kvkk,
    };
    setErrors(next);
    const firstBad = (Object.keys(next) as Field[]).find(k => next[k]);
    if (firstBad) { refs[firstBad].current?.focus(); return; }

    const text = [
      t("Merhaba, ücretsiz saç analizi talebim:"),
      t("Ad soyad: {v}", { v: name.trim() }),
      t("Telefon: {v}", { v: phone.trim() }),
      t("Norwood evresi: {v}", { v: stageLabel(stage) }),
      files.length ? t("Fotoğraflarımı ({n} adet) bu sohbete ekliyorum.", { n: files.length }) : t("Fotoğraflarımı bu sohbete ekliyorum."),
    ].join("\n");
    const url = waLink(text);
    track("generate_lead", { method: "analysis_form", photos: files.length });
    window.open(url, "_blank", "noopener");
    setSentUrl(url);
    setSentCount(c => c + 1);
  };

  const invalid = (f: Field) => ({
    "aria-invalid": errors[f],
    "aria-describedby": errors[f] ? `e-${f}` : undefined,
  });

  return (
    <section id="analiz" className="section analysis" aria-labelledby="analiz-baslik">
      <div className="wrap analysis-grid">
        <div>
          <h2 data-reveal="mask" id="analiz-baslik">{t("Ücretsiz saç analizi")}</h2>
          <p>{t("Dört açıdan çekilmiş fotoğraf yeterli: önden, tepeden, arkadan ve iki yandan biri. Doktorumuz greft sayınızı, uygun yöntemi ve yeni saç çizginizin taslağını 24 saat içinde size gönderir.")}</p>
          <ol className="photo-steps">
            <li>{t("Saçınızı kurutun, ıslak saç sonucu yanıltır.")}</li>
            <li>{t("Gün ışığında, flaşsız çekin.")}</li>
            <li>{t("Tepe ve arka fotoğrafı için birinden yardım isteyin.")}</li>
          </ol>
        </div>

        <form className="form" id="analysis-form" noValidate data-reveal onSubmit={submit}>
          <div className="field">
            <label htmlFor="f-name">{t("Adınız soyadınız")}</label>
            <div className="control">
              <FieldIcon><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" /></FieldIcon>
              <input id="f-name" name="name" autoComplete="name" placeholder={t("Örn. Ahmet Yılmaz")} required
                ref={refs.name} value={name} onChange={e => setName(e.target.value)} {...invalid("name")} />
            </div>
            <p className="error" id="e-name" hidden={!errors.name}>{t("Adınızı yazın.")}</p>
          </div>
          <div className="field">
            <label htmlFor="f-phone">{t("Telefon (WhatsApp)")}</label>
            <div className="control">
              <FieldIcon><rect x="7" y="2.5" width="10" height="19" rx="2.5" /><path d="M11 18.5h2" /></FieldIcon>
              <input id="f-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+90 5xx xxx xx xx" required
                ref={refs.phone} value={phone} onChange={e => setPhone(e.target.value)} {...invalid("phone")} />
            </div>
            <p className="error" id="e-phone" hidden={!errors.phone}>{t("Size dönebilmemiz için geçerli bir telefon numarası yazın.")}</p>
          </div>
          <div className="field">
            <label htmlFor="f-stage">{t("Norwood evreniz")}</label>
            <div className="control control-select">
              <FieldIcon><path d="M12 3 3 8l9 5 9-5-9-5Z" /><path d="m3 13 9 5 9-5" /></FieldIcon>
              <select id="f-stage" name="stage" value={stage} onChange={e => onStageChange(Number(e.target.value))}>
                {STAGE_VALUES.map(n => <option key={n} value={n}>{stageLabel(n)}</option>)}
              </select>
            </div>
          </div>
          <div className="field">
            <label htmlFor="f-photos">{t("Fotoğraflar")}</label>
            <div className={`drop${over ? " over" : ""}`} id="drop"
              onDragEnter={() => setOver(true)} onDragOver={() => setOver(true)}
              onDragLeave={() => setOver(false)} onDrop={() => setOver(false)}>
              <input id="f-photos" name="photos" type="file" accept="image/*" multiple aria-describedby="photo-hint"
                onChange={e => setFiles(Array.from(e.target.files ?? []))} />
              <span className="drop-ico">
                <FieldIcon><path d="M12 16V4m0 0-4.5 4.5M12 4l4.5 4.5" /><path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" /></FieldIcon>
              </span>
              <b>{t("Fotoğraf seçin ya da buraya sürükleyin")}</b>
              <span>{t("Önden, tepeden, arkadan ve yandan")}</span>
            </div>
            <ul className="thumbs" id="thumbs" aria-hidden="true">
              {previews.map((src, i) => <li key={i}><img src={src} alt="" /></li>)}
            </ul>
            <p className="hint" id="photo-hint">{photoHint(files.length)}</p>
          </div>
          <div className="field check">
            <input id="f-kvkk" name="kvkk" type="checkbox" required
              ref={refs.kvkk} checked={kvkk} onChange={e => setKvkk(e.target.checked)} {...invalid("kvkk")} />
            <label htmlFor="f-kvkk">{t("Fotoğraflarımın yalnızca analiz için kullanılmasını ve KVKK aydınlatma metnini kabul ediyorum.")}</label>
          </div>
          <p className="error" id="e-kvkk" hidden={!errors.kvkk}>{t("Analiz için onay kutusunu işaretleyin.")}</p>
          <button className="btn btn-dark btn-send" type="submit"><WhatsAppIcon />{t("WhatsApp'tan gönder")}</button>
          <p className="hint">{t("Bilgileriniz WhatsApp'ta hazır bir mesaj olarak açılır. Fotoğraflarınızı aynı sohbete ekleyip gönderin.")}</p>
          {sentUrl && (
            <div className="form-done" id="form-done" tabIndex={-1} ref={doneRef} key={sentCount}>
              <svg className="done-check" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="17" /><path d="M12 21l6 6 11-13" /></svg>
              <h3>{t("WhatsApp açıldı")}</h3>
              <p>{t("Hazır mesajı gönderin ve seçtiğiniz fotoğrafları aynı sohbete ekleyin. Doktorumuz inceleyip 24 saat içinde size dönecek. WhatsApp açılmadıysa")} <a id="wa-retry" href={sentUrl} target="_blank" rel="noopener">{t("buraya dokunun")}</a>.</p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
