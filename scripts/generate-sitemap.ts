// Runs before `vite dev` and `vite build` (predev/prebuild hooks); writes public/sitemap.xml.

import { readdirSync, statSync, writeFileSync } from "fs";
import { basename, extname, resolve } from "path";
import { MILTON_NEIGHBOURHOODS } from "../src/pages/areas/milton/neighbourhoods";

const BASE_URL = "https://fawadnissari.ca";
const SUPABASE_URL = "https://pwowsqscpvhlttltziod.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3b3dzcXNjcHZobHR0bHR6aW9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkzNjMwMzEsImV4cCI6MjA4NDkzOTAzMX0.16LXohxAkrZeV2hQAvAI7jum_BnMPo5rHrPcDZnnNWA";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const staticEntries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/market-updates", changefreq: "weekly", priority: "0.9" },
  { path: "/youtube", changefreq: "weekly", priority: "0.9" },
  { path: "/blog", changefreq: "weekly", priority: "0.8" },
  { path: "/insights", changefreq: "weekly", priority: "0.8" },
  { path: "/seller-services", changefreq: "monthly", priority: "0.8" },
  { path: "/seller-guide", changefreq: "monthly", priority: "0.8" },
  { path: "/home-evaluation", changefreq: "monthly", priority: "0.8" },
  { path: "/buyer-guide", changefreq: "monthly", priority: "0.8" },
  { path: "/buyer-tips", changefreq: "monthly", priority: "0.7" },
  { path: "/areas", changefreq: "monthly", priority: "0.7" },
  { path: "/moving-to-milton", changefreq: "monthly", priority: "0.9" },
  { path: "/where-i-work", changefreq: "monthly", priority: "0.7" },
  { path: "/about", changefreq: "monthly", priority: "0.7" },
  { path: "/testimonials", changefreq: "monthly", priority: "0.7" },
  { path: "/staging", changefreq: "monthly", priority: "0.6" },
  { path: "/faq", changefreq: "monthly", priority: "0.6" },
  { path: "/contact", changefreq: "monthly", priority: "0.7" },
  { path: "/portfolio", changefreq: "weekly", priority: "0.8" },
  { path: "/cost-of-selling-a-house-in-milton", changefreq: "monthly", priority: "0.7" },
  { path: "/cost-of-selling-a-house-in-mississauga", changefreq: "monthly", priority: "0.7" },
  { path: "/ontario-land-transfer-tax-guide", changefreq: "monthly", priority: "0.7" },
];

function discoverAreaRoutes(): SitemapEntry[] {
  const areasDir = resolve("src/pages/areas");
  const routes: SitemapEntry[] = [];

  try {
    const files = readdirSync(areasDir);
    for (const file of files) {
      const filePath = resolve(areasDir, file);
      if (!statSync(filePath).isFile()) continue;
      if (extname(file) !== ".tsx") continue;

      const componentName = basename(file, ".tsx");
      // Only include page components (PascalCase file names). Skip utility files like helpers.ts.
      if (!/^[A-Z]/.test(componentName)) continue;

      const slug = componentName.toLowerCase();
      // Off-target city pages are noindex, follow — excluded from the sitemap.
      if (slug === "hamilton" || slug === "burlington") continue;
      routes.push({
        path: `/areas/${slug}`,
        changefreq: "monthly",
        priority: "0.7",
      });
    }
  } catch (err) {
    console.warn("Could not scan src/pages/areas:", err);
  }

  return routes.sort((a, b) => a.path.localeCompare(b.path));
}

function miltonNeighbourhoodRoutes(): SitemapEntry[] {
  return MILTON_NEIGHBOURHOODS.map((n) => ({
    path: `/areas/milton/${n.slug}`,
    changefreq: "monthly" as const,
    priority: "0.6",
  })).sort((a, b) => a.path.localeCompare(b.path));
}

async function fetchSlugs(path: string): Promise<string[]> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
      headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
    });
    if (!res.ok) throw new Error(`${res.status}`);
    const rows = (await res.json()) as Array<{ slug?: string }>;
    return rows.map((r) => r.slug).filter((s): s is string => Boolean(s));
  } catch (err) {
    console.warn(`Could not fetch sitemap rows for ${path}:`, err);
    return [];
  }
}

async function blogPostRoutes(): Promise<SitemapEntry[]> {
  const slugs = await fetchSlugs("blog_posts?select=slug");
  return slugs
    .map((slug) => ({ path: `/blog/${slug}`, changefreq: "monthly" as const, priority: "0.6" }))
    .sort((a, b) => a.path.localeCompare(b.path));
}

function generateSitemap(entries: SitemapEntry[]) {
  const urls = entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n"),
  );

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
  ].join("\n");
}

const areaEntries = discoverAreaRoutes();
const miltonEntries = miltonNeighbourhoodRoutes();
// Mississauga neighbourhood sub-pages are noindex, follow — excluded from the sitemap.
const blogEntries = await blogPostRoutes();
// Portfolio listing pages are indexable — one entry per published listing.
const portfolioEntries = await portfolioRoutes();
// Admin routes (/admin, /admin/login, /admin/**) are intentionally excluded:
// they are private, non-indexable, and disallowed in robots.txt.
const entries = [
  ...staticEntries,
  ...areaEntries,
  ...miltonEntries,
  ...blogEntries,
  ...portfolioEntries,
];

writeFileSync(resolve("public/sitemap.xml"), generateSitemap(entries));
console.log(
  `sitemap.xml written (${entries.length} entries, ${areaEntries.length} area pages, ${miltonEntries.length} Milton neighbourhoods, ${blogEntries.length} blog posts)`,
);
