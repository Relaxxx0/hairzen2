import { Component, ErrorInfo, ReactNode } from "react";
import { SENTRY_DSN, SENTRY_ENVIRONMENT, SENTRY_RELEASE } from "../config";
import { useLang } from "../i18n";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Class-based Error Boundary (function components cannot catch render errors).
 * Initializes Sentry on first error if DSN is configured.
 */
export class ErrorBoundary extends Component<Props, State> {
  private sentryInitialized = false;

  state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    this.reportToSentry(error, errorInfo);
  }

  private async reportToSentry(error: Error, errorInfo: ErrorInfo) {
    if (!SENTRY_DSN || this.sentryInitialized) return;

    try {
      // Dynamic import to avoid bundling Sentry if not used
      const Sentry = await import("@sentry/react");
      Sentry.init({
        dsn: SENTRY_DSN,
        environment: SENTRY_ENVIRONMENT,
        release: SENTRY_RELEASE || undefined,
        integrations: [
          Sentry.browserTracingIntegration(),
          Sentry.replayIntegration({
            maskAllText: true,
            blockAllMedia: true,
          }),
        ],
        tracesSampleRate: 0.1,
        replaysOnErrorSampleRate: 1.0,
        replaysSessionSampleRate: 0.1,
        // Don't send PII
        sendDefaultPii: false,
        beforeSend(event) {
          // Scrub sensitive data from exception values
          if (event.exception?.values) {
            event.exception.values.forEach((val) => {
              if (val.stacktrace?.frames) {
                val.stacktrace.frames.forEach((frame) => {
                  frame.vars = undefined; // Remove local variables
                });
              }
            });
          }
          return event;
        },
      });
      this.sentryInitialized = true;

      // Capture the error with component stack
      Sentry.captureException(error, {
        contexts: {
          react: {
            componentStack: errorInfo.componentStack || "",
          },
        },
        tags: {
          errorBoundary: "true",
        },
      });
    } catch {
      // Sentry load failed — fail silently
      console.error("[ErrorBoundary] Sentry init failed", error);
    }
  }

  render() {
    if (this.state.hasError) {
      // If a custom fallback is provided, render it
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      const { t } = useLang();
      return (
        <div
          style={{
            minHeight: "40vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            textAlign: "center",
            background: "#F8FAFD",
            color: "#141A2B",
            fontFamily: '"Onest", "Segoe UI", sans-serif',
          }}
          role="alert"
        >
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#B3261E"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginBottom: "1rem" }}
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <h2 style={{ margin: "0 0 0.5rem", fontSize: "1.5rem", fontFamily: '"Young Serif", Georgia, serif' }}>
            {t("Bir hata oluştu")}
          </h2>
          <p style={{ margin: "0 0 1.5rem", color: "#47506A", maxWidth: "360px" }}>
            {t("Sayfa yüklenirken beklenmeyen bir sorun oluştu. Lütfen sayfayı yenileyin veya daha sonra tekrar deneyin.")}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "0.75rem 1.5rem",
              background: "#2F5BEA",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontSize: "1rem",
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: '"Onest", "Segoe UI", sans-serif',
            }}
          >
            {t("Sayfayı yenile")}
          </button>
          {this.state.error && (
            <details style={{ marginTop: "2rem", textAlign: "left", maxWidth: "480px" }}>
              <summary style={{ cursor: "pointer", color: "#47506A", fontSize: "0.875rem" }}>
                {t("Hata detayları (geliştirici için)")}
              </summary>
              <pre
                style={{
                  marginTop: "0.75rem",
                  padding: "1rem",
                  background: "#0E1B3D",
                  color: "#E6ECF7",
                  borderRadius: "8px",
                  overflow: "auto",
                  fontSize: "0.75rem",
                  lineHeight: 1.5,
                }}
              >
                {this.state.error.message}
                {this.state.errorInfo?.componentStack && `\n\n${this.state.errorInfo.componentStack}`}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Wrapper for async components (Suspense + ErrorBoundary together).
 * Usage: <ErrorBoundary><Suspense fallback={<Loading />}><LazyComponent /></Suspense></ErrorBoundary>
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode
): React.FC<P> {
  return function WithErrorBoundary(props: P) {
    return (
      <ErrorBoundary fallback={fallback}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}