import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { useBlogPost } from "@/hooks/useBlogPosts";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/seo/SEOHead";
import { ShareButtons } from "@/components/blog/ShareButtons";

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

  return (
    <Layout>
      <SEOHead
        title={`${post.title} | Fawad Nissari`}
        description={post.excerpt || post.title}
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
            <span className="text-sm font-medium text-primary uppercase tracking-wider mb-4 block">
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
            className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-serif prose-a:text-primary"
            dangerouslySetInnerHTML={{ __html: post.content_html }}
          />
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
