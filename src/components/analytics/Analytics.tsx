import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initAnalytics, trackPageView, trackEvent } from "@/lib/analytics";

/**
 * Loads GA4 (and GTM if configured), tracks SPA page views,
 * and auto-tracks conversion clicks (Book a Call, phone, email).
 */
export const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    initAnalytics();
  }, []);

  // SPA page views
  useEffect(() => {
    const path = location.pathname + location.search;
    const timer = window.setTimeout(() => trackPageView(path), 60);
    return () => window.clearTimeout(timer);
  }, [location.pathname, location.search]);

  // Global conversion click tracking
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest?.("a") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href") || "";
      const label = (anchor.textContent || "").trim().slice(0, 80);

      if (href.includes("calendly.com")) {
        trackEvent("book_a_call", {
          link_url: href,
          link_text: label,
          page_path: window.location.pathname,
        });
      } else if (href.startsWith("tel:")) {
        trackEvent("phone_click", { link_url: href, page_path: window.location.pathname });
      } else if (href.startsWith("mailto:")) {
        trackEvent("email_click", { link_url: href, page_path: window.location.pathname });
      }
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
};