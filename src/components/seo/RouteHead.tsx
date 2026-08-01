import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { MILTON_NEIGHBOURHOOD_MAP } from '@/pages/areas/milton/neighbourhoods';
import { MISSISSAUGA_NEIGHBOURHOOD_MAP } from '@/pages/areas/mississauga/neighbourhoods';

const SITE_URL = 'https://fawadnissari.ca';
const DEFAULT_OG_IMAGE =
  'https://storage.googleapis.com/gpt-engineer-file-uploads/RiDF2UivMiaiiiF7b0hWJpqbExC3/social-images/social-1773159078532-Fawad_pic2.webp';
const SITE_NAME = 'Fawad Nissari | GTA Real Estate';
const HOME_PATH = '/';

type Meta = { title: string; description: string };

const ROUTE_META: Record<string, Meta> = {
  '/': {
    title: 'Fawad Nissari | GTA Real Estate Expert',
    description:
      'Weekly videos, data-backed insights, and proven strategies to help you sell, buy, or invest with confidence in the Greater Toronto Area.',
  },
  '/market-updates': {
    title: 'GTA Market Updates | Fawad Nissari',
    description: 'Weekly Greater Toronto Area market updates, stats, and analysis for buyers, sellers, and investors.',
  },
  '/youtube': {
    title: 'YouTube Hub — GTA Real Estate Videos | Fawad Nissari',
    description: 'Watch weekly GTA real estate videos: market updates, seller tips, buyer advice, and neighbourhood tours.',
  },
  '/blog': {
    title: 'Blog & Insights | Fawad Nissari GTA Real Estate',
    description: 'Articles, market updates, and expert insights on selling, buying, and investing in the Greater Toronto Area.',
  },
  '/insights': {
    title: 'Insights Hub | Fawad Nissari GTA Real Estate',
    description: 'Real estate insights, videos, and articles for the GTA — updated weekly with data-backed analysis.',
  },
  '/seller-services': {
    title: 'Seller Services | Full-Service Home Selling in the GTA',
    description: 'Full-service home selling with free staging, professional media, and paid advertising. 1% listing commission, cancel anytime.',
  },
  '/seller-guide': {
    title: 'Free Seller Guide | Fawad Nissari GTA Real Estate',
    description: 'Download the free GTA seller guide — pricing, staging, negotiation, and closing costs explained.',
  },
  '/home-evaluation': {
    title: 'Free Home Evaluation | GTA Comparative Market Analysis',
    description: 'Get a free, data-driven home evaluation for your GTA property within 24–48 hours. No obligation.',
  },
  '/areas': {
    title: 'GTA Areas We Serve | Fawad Nissari Real Estate',
    description: 'Local real estate expertise across Milton, Mississauga, Oakville, Burlington, Hamilton, and Brampton.',
  },
  '/areas/milton': {
    title: 'Selling a Home in Milton | Milton Real Estate Advisor',
    description: 'Thinking about selling in Milton? Free home evaluation, local market insights, and neighbourhood expertise from Fawad Nissari.',
  },
  '/areas/mississauga': {
    title: 'Selling a Home in Mississauga | Real Estate Advisor',
    description: 'Thinking about selling in Mississauga? Free home evaluation and local market insights from Fawad Nissari.',
  },
  '/areas/oakville': {
    title: 'Selling a Home in Oakville | Oakville Real Estate Advisor',
    description: 'Thinking about selling in Oakville? Free home evaluation and local market insights from Fawad Nissari.',
  },
  '/areas/burlington': {
    title: 'Selling a Home in Burlington | Real Estate Advisor',
    description: 'Thinking about selling in Burlington? Free home evaluation and local market insights from Fawad Nissari.',
  },
  '/areas/hamilton': {
    title: 'Selling a Home in Hamilton | Hamilton Real Estate Advisor',
    description: 'Thinking about selling in Hamilton? Free home evaluation and local market insights from Fawad Nissari.',
  },
  '/areas/brampton': {
    title: 'Selling a Home in Brampton | Brampton Real Estate Advisor',
    description: 'Thinking about selling in Brampton? Free home evaluation and local market insights from Fawad Nissari.',
  },
  '/about': {
    title: 'About Fawad Nissari — Real Estate Market Expert',
    description: 'Learn about Fawad Nissari, a GTA real estate expert with over a decade of experience helping homeowners sell smarter.',
  },
  '/testimonials': {
    title: 'Client Testimonials & Google Reviews | Fawad Nissari',
    description: 'Read real Google reviews and client testimonials from GTA homeowners who worked with Fawad Nissari.',
  },
  '/staging': {
    title: 'Free Home Staging With Every Listing | Fawad Nissari',
    description: 'Full professional home staging — furniture and decor — included free with every listing. Average $4,500 value at no cost.',
  },
  '/faq': {
    title: 'Frequently Asked Questions | Fawad Nissari GTA Real Estate',
    description: 'Answers to common questions about selling, buying, staging, commissions, and working with Fawad Nissari in the GTA.',
  },
  '/contact': {
    title: 'Contact Fawad Nissari | GTA Real Estate Advisor',
    description: 'Get in touch with Fawad Nissari for a free consultation about selling, buying, or investing in the Greater Toronto Area.',
  },
  '/buyer-guide': {
    title: 'First-Time Buyer Guide — Free Download | Fawad Nissari',
    description: 'Free first-time home buyer guide for the GTA — mortgage, closing costs, offers, and inspection tips.',
  },
  '/buyer-tips': {
    title: 'Buyer Tips for the GTA | Fawad Nissari',
    description: 'Practical buying tips for the Greater Toronto Area — offers, financing, inspections, and negotiation.',
  },
  '/portfolio': {
    title: 'Sold Portfolio | Fawad Nissari GTA Real Estate',
    description: 'Recently sold homes across the GTA — see real results, sold prices, and marketing campaigns from Fawad Nissari.',
  },
  '/cost-of-selling-a-house-in-milton': {
    title: 'Cost of Selling a House in Milton (2026 Guide)',
    description: 'Full 2026 breakdown of the real cost of selling a house in Milton — commission, staging, legal fees, and how to save with 1% listing.',
  },
  '/cost-of-selling-a-house-in-mississauga': {
    title: 'Cost of Selling a House in Mississauga (2026)',
    description: 'Full 2026 breakdown of the real cost of selling a house in Mississauga — commission, staging, legal fees, and how to save with 1% listing.',
  },
  '/ontario-land-transfer-tax-guide': {
    title: 'Ontario Land Transfer Tax Rates 2025 + Calculator',
    description: 'Ontario land transfer tax rates for 2025, a free calculator, Toronto\u2019s double tax explained, and the first-time home buyer rebate.',
  },
  '/admin': {
    title: 'Admin Dashboard | Fawad Nissari',
    description: 'Secure admin dashboard for managing blog posts, property listings, and incoming leads.',
  },
  '/admin/login': {
    title: 'Admin Login | Fawad Nissari',
    description: 'Secure admin login for Fawad Nissari real estate content management.',
  },
  '/admin/properties/new': {
    title: 'Add New Property Listing | Fawad Nissari',
    description: 'Create a new property listing with photos, details, and sold pricing for the portfolio.',
  },
  '/admin/blog': {
    title: 'Manage Blog Posts | Fawad Nissari',
    description: 'View, publish, edit, and delete blog posts for the GTA real estate insights hub.',
  },
  '/admin/blog/new': {
    title: 'Create Blog Post | Fawad Nissari',
    description: 'Write and publish a new SEO-optimized blog post for the GTA real estate website.',
  },
  '/admin/blog-drafts': {
    title: 'Blog Drafts | Fawad Nissari',
    description: 'Review and edit AI-generated blog drafts before publishing to the insights hub.',
  },
};

const DYNAMIC_FALLBACKS: Array<{ test: (p: string) => boolean; meta: Meta }> = [
  {
    test: (p) => p.startsWith('/areas/milton/'),
    meta: {
      title: 'Milton Neighbourhoods | Fawad Nissari GTA Real Estate',
      description:
        'Explore Milton neighbourhoods — local market insights, community snapshots, and free home evaluations from Fawad Nissari.',
    },
  },
  {
    test: (p) => p.startsWith('/areas/mississauga/'),
    meta: {
      title: 'Mississauga Neighbourhoods | Fawad Nissari GTA Real Estate',
      description:
        'Explore Mississauga neighbourhoods — local market insights, community snapshots, and free home evaluations from Fawad Nissari.',
    },
  },
  {
    test: (p) => /^\/admin\/properties\/[^/]+\/edit$/.test(p),
    meta: {
      title: 'Edit Property Listing | Fawad Nissari',
      description: 'Update an existing property listing, photos, and sold pricing.',
    },
  },
  {
    test: (p) => /^\/admin\/blog\/[^/]+\/edit$/.test(p),
    meta: {
      title: 'Edit Blog Post | Fawad Nissari',
      description: 'Update an existing blog post, metadata, and publishing status.',
    },
  },
  {
    test: (p) => p.startsWith('/admin'),
    meta: {
      title: 'Admin Portal | Fawad Nissari',
      description: 'Secure admin portal for managing Fawad Nissari real estate content, property listings, blog posts, and incoming leads.',
    },
  },
];

function normalize(pathname: string) {
  if (pathname.length > 1 && pathname.endsWith('/')) return pathname.slice(0, -1);
  return pathname;
}

function toTitleCase(value: string) {
  return value
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function fallbackMetaFor(pathname: string): Meta {
  const path = normalize(pathname);
  if (path === HOME_PATH) return ROUTE_META[HOME_PATH];

  const segments = path.split('/').filter(Boolean);
  const pageName = segments.map(toTitleCase).join(' / ');

  return {
    title: `${pageName} | Fawad Nissari | GTA Real Estate`,
    description: `${pageName} information from Fawad Nissari, a GTA real estate advisor serving Milton, Mississauga, Oakville, Burlington, Brampton, Hamilton, and nearby communities.`,
  };
}

function metaFor(pathname: string): Meta {
  const p = normalize(pathname);
  if (ROUTE_META[p]) return ROUTE_META[p];
  const miltonMatch = p.match(/^\/areas\/milton\/([^/]+)$/);
  if (miltonMatch) {
    const n = MILTON_NEIGHBOURHOOD_MAP[miltonMatch[1]];
    if (n) {
      return {
        title: `Selling a Home in ${n.name}, Milton | Fawad Nissari`,
        description: `Thinking about selling in ${n.name}, Milton? Free home evaluation, local market insights, and neighbourhood expertise from Fawad Nissari.`,
      };
    }
  }
  const missMatch = p.match(/^\/areas\/mississauga\/([^/]+)$/);
  if (missMatch) {
    const n = MISSISSAUGA_NEIGHBOURHOOD_MAP[missMatch[1]];
    if (n) {
      return {
        title: `Selling in ${n.name}, Mississauga | Fawad Nissari`,
        description: `Thinking about selling in ${n.name}, Mississauga? ${n.vibe} — free home evaluation, local sold data, and neighbourhood expertise from Fawad Nissari.`,
      };
    }
  }
  const dyn = DYNAMIC_FALLBACKS.find((d) => d.test(p));
  return dyn ? dyn.meta : fallbackMetaFor(p);
}

/**
 * Single source of truth for per-route <title>, meta description, canonical,
 * and Open Graph / Twitter tags. Lives high in the tree and never unmounts
 * on navigation, so there is no gap where the static index.html default
 * can win the race against a per-page Helmet that is still mounting.
 */
export function RouteHead() {
  const { pathname } = useLocation();
  const path = normalize(pathname);
  const url = `${SITE_URL}${path}`;
  const { title, description } = metaFor(pathname);
  const ogType = path.startsWith('/blog/') ? 'article' : 'website';

  return (
    <Helmet key={path} defer={false}>
      <title key={`title-${path}`}>{title}</title>
      <meta key={`meta-title-${path}`} name="title" content={title} />
      <meta key={`description-${path}`} name="description" content={description} />
      <link key={`canonical-${path}`} rel="canonical" href={url} />
      <meta key={`og-type-${path}`} property="og:type" content={ogType} />
      <meta key={`og-site-name-${path}`} property="og:site_name" content={SITE_NAME} />
      <meta key={`og-title-${path}`} property="og:title" content={title} />
      <meta key={`og-description-${path}`} property="og:description" content={description} />
      <meta key={`og-url-${path}`} property="og:url" content={url} />
      <meta key={`og-image-${path}`} property="og:image" content={DEFAULT_OG_IMAGE} />
      <meta key={`twitter-card-${path}`} name="twitter:card" content="summary_large_image" />
      <meta key={`twitter-title-${path}`} name="twitter:title" content={title} />
      <meta key={`twitter-description-${path}`} name="twitter:description" content={description} />
      <meta key={`twitter-image-${path}`} name="twitter:image" content={DEFAULT_OG_IMAGE} />
    </Helmet>
  );
}