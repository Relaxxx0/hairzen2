import type { Lang } from "../i18n";

export const LANG_NAMES: Record<Lang, string> = { tr: "Türkçe", en: "English", de: "Deutsch", ar: "العربية" };

/** Official flag artwork (flagcdn.com SVGs, self-hosted in /public/flags). */
export function Flag({ lang }: { lang: Lang }) {
  return <img className="flag" src={`/flags/${lang}.svg`} alt="" aria-hidden="true" />;
}
