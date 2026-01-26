import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import prerender from '@prerenderer/rollup-plugin';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode === "production" && prerender({
      routes: [
        '/',
        '/market-updates',
        '/youtube',
        '/seller-services',
        '/seller-guide',
        '/home-evaluation',
        '/buyer-guide',
        '/buyer-tips',
        '/areas',
        '/about',
        '/testimonials',
        '/staging',
        '/blog',
        '/insights',
        '/faq',
        '/contact',
      ],
      renderer: '@prerenderer/renderer-puppeteer',
      rendererOptions: {
        // Give the SPA time to fully render + fetch dynamic content
        // so the generated HTML contains real text content in View Source.
        renderAfterTime: 8000,
        headless: true,
        timeout: 60000,
        launchOptions: {
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
        },
      },
      postProcess(renderedRoute) {
        // Replace any localhost URLs with production domain
        renderedRoute.html = renderedRoute.html.replace(
          /(https?:\/\/)?(localhost|127\.0\.0\.1)(:\d+)?/gi,
          'https://fawadnissari.ca'
        );
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
