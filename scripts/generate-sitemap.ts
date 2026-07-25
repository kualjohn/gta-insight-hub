// Runs before `vite dev` and `vite build` (predev/prebuild hooks); writes public/sitemap.xml.

import { readdirSync, statSync, writeFileSync } from "fs";
import { basename, extname, resolve } from "path";

const BASE_URL = "https://fawadnissari.ca";

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
  { path: "/about", changefreq: "monthly", priority: "0.7" },
  { path: "/testimonials", changefreq: "monthly", priority: "0.7" },
  { path: "/staging", changefreq: "monthly", priority: "0.6" },
  { path: "/faq", changefreq: "monthly", priority: "0.6" },
  { path: "/contact", changefreq: "monthly", priority: "0.7" },
  { path: "/portfolio", changefreq: "weekly", priority: "0.8" },
  { path: "/cost-of-selling-a-house-in-milton", changefreq: "monthly", priority: "0.7" },
  { path: "/cost-of-selling-a-house-in-mississauga", changefreq: "monthly", priority: "0.7" },
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
const entries = [...staticEntries, ...areaEntries];

writeFileSync(resolve("public/sitemap.xml"), generateSitemap(entries));
console.log(`sitemap.xml written (${entries.length} entries, ${areaEntries.length} area pages)`);
