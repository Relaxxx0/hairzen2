import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";
import { LANGS, LangProvider, type Lang } from "./i18n";
import { headTags } from "./seo";
import { PAGE_IDS, pagePath, type PageId } from "./content/services";
import { SITE_URL } from "./config";

export { LANGS, PAGE_IDS, pagePath, SITE_URL, headTags };

export const render = (lang: Lang, page: PageId | null) =>
  renderToString(
    <StrictMode>
      <LangProvider lang={lang}>
        <App page={page} />
      </LangProvider>
    </StrictMode>
  );
