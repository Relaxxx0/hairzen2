/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL: string;
  readonly VITE_GA_ID: string;
  readonly VITE_ADS_ID: string;
  readonly VITE_ADS_LEAD_LABEL: string;
  readonly VITE_SEARCH_CONSOLE_VERIFICATION: string;
  readonly VITE_SENTRY_DSN: string;
  readonly VITE_SENTRY_ENVIRONMENT: string;
  readonly VITE_SENTRY_RELEASE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}