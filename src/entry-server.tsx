import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";
import { LANGS, LangProvider, type Lang } from "./i18n";
import { PATHS, headTags } from "./seo";
import { SITE_URL } from "./config";

export { LANGS, PATHS, SITE_URL, headTags };

export const render = (lang: Lang) =>
  renderToString(
    <StrictMode>
      <LangProvider lang={lang}>
        <App />
      </LangProvider>
    </StrictMode>
  );
