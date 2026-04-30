import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { SectionWrapper } from '@/components/sections/SectionHeader';
import { BlogCard } from '@/components/cards/BlogCard';
import { CTABlock } from '@/components/sections/CTABlock';
import { SEOHead } from '@/components/seo/SEOHead';
import { Skeleton } from '@/components/ui/skeleton';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

export default function Blog() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error } = useBlogPosts(currentPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Layout>
      <SEOHead
        title="Blog | Real Estate Insights & Tips"
        description="Expert real estate articles, market updates, and guides for the GTA market."
        canonicalUrl="https://fawadnissari.ca/blog"
      />

      {/* Header */}
      <section className="bg-gradient-warm section-padding py-16">
        <div className="container-wide mx-auto">
          <span className="inline-block text-sm font-medium text-primary mb-4 tracking-wide uppercase">
            Knowledge Hub
          </span>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-4">
            Real Estate Blog
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            In-depth articles, guides, and analysis to help you make informed decisions
            about buying and selling in the GTA.
          </p>
          {data && data.totalCount > 0 && (
            <p className="text-sm text-muted-foreground mt-2">
              {data.totalCount} articles
            </p>
          )}
        </div>
      </section>

      {/* Blog Grid */}
      <SectionWrapper>
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-[16/10] rounded-lg" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-destructive">Failed to load blog posts.</p>
          </div>
        ) : data && data.posts.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.posts.map((post) => (
                <BlogCard
                  key={post.id}
                  title={post.title}
                  excerpt={post.excerpt || ''}
                  image={post.featured_image || ''}
                  category={post.category || ''}
                  date={post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : ''}
                  slug={post.slug}
                />
              ))}
            </div>

            {/* Pagination */}
            {data.totalPages > 1 && (
              <div className="mt-12">
                <Pagination>
                  <PaginationContent>
                    {currentPage > 1 && (
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() => handlePageChange(currentPage - 1)}
                          className="cursor-pointer"
                        />
                      </PaginationItem>
                    )}
                    {Array.from({ length: data.totalPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => handlePageChange(page)}
                          isActive={page === currentPage}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    {currentPage < data.totalPages && (
                      <PaginationItem>
                        <PaginationNext
                          onClick={() => handlePageChange(currentPage + 1)}
                          className="cursor-pointer"
                        />
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <h2 className="font-serif text-2xl font-bold mb-4">No posts yet</h2>
            <p className="text-muted-foreground">Check back soon for new articles.</p>
          </div>
        )}
      </SectionWrapper>

      {/* Bottom CTA */}
      <SectionWrapper variant="muted">
        <CTABlock
          variant="dark"
          title="Have Questions About Selling?"
          subtitle="Let's discuss your situation and create a plan that works for you."
          primaryCta={{ text: "Book a Call", href: "https://calendly.com/fawadnissari" }}
          secondaryCta={{ text: "Watch My Videos", href: "/youtube" }}
        />
      </SectionWrapper>
    </Layout>
  );
}
