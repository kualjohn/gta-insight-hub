import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { useBlogPost } from "@/hooks/useBlogPosts";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/seo/SEOHead";
import { ShareButtons } from "@/components/blog/ShareButtons";

const MILTON_RELOCATION_SLUGS = [
  "Is-Milton-a-Good-Area-to-Live--A-Comprehensive-Milton-Real-Estate-Guide",
  "Pros-and-Cons-of-Living-in-Milton-Is-It-the-Right-Place-for-You-",
];



/**
 * The page header already renders the single <h1> (the post title), so any
 * <h1> inside the stored article HTML would create duplicates. Demote them
 * to <h2> and drop a leading heading that just repeats the post title.
 */
function normalizeHeadings(html: string, title: string): string {
  let out = html.replace(/<(\/?)h1(\s|>)/gi, (_m, slash, tail) => `<${slash}h2${tail}`);
  const norm = (s: string) => s.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
  out = out.replace(/^\s*<h2[^>]*>([\s\S]*?)<\/h2>/i, (match, inner) =>
    norm(inner) === norm(title) ? '' : match,
  );
  return out;
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, error } = useBlogPost(slug || "");

  if (isLoading) {
    return (
      <Layout>
        <article className="container-wide mx-auto px-4 py-12 max-w-3xl">
          <Skeleton className="h-8 w-32 mb-8" />
          <Skeleton className="h-12 w-full mb-4" />
          <Skeleton className="h-6 w-48 mb-8" />
          <Skeleton className="aspect-video w-full mb-8 rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </article>
      </Layout>
    );
  }

  if (error || !post) {
    return (
      <Layout>
        <div className="container-wide mx-auto px-4 py-24 text-center">
          <h1 className="font-serif text-3xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The blog post you're looking for doesn't exist.
          </p>
          <Link to="/blog">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const formattedDate = post.published_at
    ? format(new Date(post.published_at), "MMMM d, yyyy")
    : null;

  const canonicalUrl = `https://fawadnissari.ca/blog/${post.slug}`;
  const rawExcerpt = (post.excerpt || "").replace(/\s+/g, " ").trim();
  const metaDescription = (
    rawExcerpt.length >= 50
      ? rawExcerpt
      : `${post.title} — GTA real estate insights, market data, and practical advice from Fawad Nissari.`
  ).slice(0, 158);
  const metaTitle = `${post.title} | Fawad Nissari`.slice(0, 60);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title.slice(0, 110),
    description: metaDescription,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
    url: canonicalUrl,
    ...(post.featured_image ? { image: [post.featured_image] } : {}),
    ...(post.published_at ? { datePublished: post.published_at } : {}),
    ...(post.published_at ? { dateModified: post.published_at } : {}),
    ...(post.category ? { articleSection: post.category } : {}),
    author: {
      "@type": "Person",
      name: "Fawad Nissari",
      url: "https://fawadnissari.ca/about",
    },
    publisher: {
      "@type": "Organization",
      name: "Fawad Nissari | GTA Real Estate",
      url: "https://fawadnissari.ca",
    },
  };

  return (
    <Layout>
      <SEOHead
        title={metaTitle}
        description={metaDescription}
        canonicalUrl={canonicalUrl}
        ogType="article"
        ogImage={post.featured_image || undefined}
        articlePublishedTime={post.published_at || undefined}
        jsonLd={articleSchema}
      />
      <article className="container-wide mx-auto px-4 py-12 max-w-3xl">
        {/* Back link */}
        <Link
          to="/blog"
          className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8 group"
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-8">
          {post.category && (
            <span className="text-sm font-medium text-accent uppercase tracking-wider mb-4 block">
              {post.category}
            </span>
          )}
          <h1 className="font-serif text-3xl md:text-5xl font-bold mb-4 text-balance">
            {post.title}
          </h1>
          {formattedDate && (
            <p className="text-muted-foreground">{formattedDate}</p>
          )}
        </header>

        {/* Featured Image */}
        {post.featured_image && (
          <div className="mb-10 rounded-xl overflow-hidden">
            <img
              src={post.featured_image}
              alt={post.title}
              className="w-full aspect-video object-cover"
            />
          </div>
        )}

        {/* Content */}
        {post.content_html && (
          <div
            className="blog-content prose prose-invert prose-lg max-w-none prose-headings:font-serif prose-a:text-accent"
            dangerouslySetInnerHTML={{ __html: normalizeHeadings(post.content_html, post.title) }}
          />
        )}

        {MILTON_RELOCATION_SLUGS.includes(post.slug) && (
          <aside className="mt-10 rounded-xl border border-border bg-card p-6">
            <p className="brand-label text-accent mb-2">Relocating to Milton?</p>
            <h2 className="font-serif text-2xl mb-2">Read the full Moving to Milton guide</h2>
            <p className="text-muted-foreground mb-4">
              Commute times to Toronto, GO train and highway access, cost of living, the best
              neighbourhoods for newcomers, school boards, and current home prices by type.
            </p>
            <Link to="/moving-to-milton" className="brand-label text-accent hover:underline">
              Open the Moving to Milton guide →
            </Link>
          </aside>
        )}



        <ShareButtons
          title={post.title}
          url={typeof window !== "undefined" ? window.location.href : `https://fawadnissari.ca/blog/${slug}`}
          excerpt={post.excerpt || undefined}
        />
      </article>
    </Layout>
  );
}
