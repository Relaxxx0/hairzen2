import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import { LangProvider, langFromPath } from "./i18n";
import { initAnalytics } from "./analytics";
import { pageFromPath } from "./content/services";
import "./styles.css";

initAnalytics();

const container = document.getElementById("root")!;
const app = (
  <StrictMode>
    <LangProvider lang={langFromPath(location.pathname)}>
      <App page={pageFromPath(location.pathname)} />
    </LangProvider>
  </StrictMode>
);
// Prerendered pages are taken over as they are (no re-draw), which keeps mobile loading fast.
if (container.hasChildNodes()) hydrateRoot(container, app);
else createRoot(container).render(app);
