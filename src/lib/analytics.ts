// Google Analytics 4 (gtag.js) + optional Google Tag Manager loader + Meta Pixel

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

const measurementId = import.meta.env
  .VITE_LOVABLE_CONNECTOR_GOOGLE_ANALYTICS_API_KEY as string | undefined;

// Optional: set a GTM container id (GTM-XXXXXXX) to also load Tag Manager.
const gtmId = import.meta.env.VITE_GTM_CONTAINER_ID as string | undefined;

// Meta (Facebook) Pixel — base code lives in index.html; we only forward events.
export const metaPixelId = "274236726432965";

export function fbq(...args: unknown[]) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq(...args);
  }
}

let initialized = false;

export function gtag(...args: unknown[]) {
  window.dataLayer = window.dataLayer || [];
  // gtag.js requires the raw arguments object shape (array-like), not a nested array.
  window.dataLayer.push(args);
}

export const gtmContainerId = gtmId;

export function initAnalytics() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;

  window.dataLayer = window.dataLayer || [];

  if (measurementId) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    gtag("js", new Date());
    // We send page_view manually on route changes.
    gtag("config", measurementId, { send_page_view: false });
  }

  if (gtmId) {
    // Order matters: the gtm.start event must be queued BEFORE gtm.js loads.
    window.dataLayer.push({
      "gtm.start": new Date().getTime(),
      event: "gtm.js",
    });

    const gtmScript = document.createElement("script");
    gtmScript.async = true;
    gtmScript.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
    document.head.appendChild(gtmScript);

    // noscript fallback (must live in <body>, never in <head>)
    if (!document.getElementById("gtm-noscript")) {
      const noscript = document.createElement("noscript");
      noscript.id = "gtm-noscript";
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.googletagmanager.com/ns.html?id=${gtmId}`;
      iframe.height = "0";
      iframe.width = "0";
      iframe.style.display = "none";
      iframe.style.visibility = "hidden";
      iframe.title = "Google Tag Manager";
      noscript.appendChild(iframe);
      document.body.insertBefore(noscript, document.body.firstChild);
    }
  }
}

export function trackPageView(path: string, title?: string) {
  const payload = {
    page_path: path,
    page_location: window.location.href,
    page_title: title ?? document.title,
  };

  if (measurementId) {
    gtag("event", "page_view", { ...payload, send_to: measurementId });
  }

  // Always emit to dataLayer so GTM triggers work on SPA route changes.
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "page_view", ...payload });
}

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  gtag("event", name, params);
  window.dataLayer?.push({ event: name, ...params });
}