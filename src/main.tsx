import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { LangProvider, langFromPath } from "./i18n";
import { initAnalytics } from "./analytics";
import "./styles.css";

initAnalytics();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LangProvider lang={langFromPath(location.pathname)}>
      <App />
    </LangProvider>
  </StrictMode>
);
