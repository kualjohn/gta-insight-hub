import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { SectionWrapper } from '@/components/sections/SectionHeader';
import { VideoCard } from '@/components/cards/VideoCard';
import { BlogCard } from '@/components/cards/BlogCard';
import { CTABlock } from '@/components/sections/CTABlock';
import { Button } from '@/components/ui/button';
import { SEOHead } from '@/components/seo/SEOHead';
import { NewsletterSignup } from '@/components/forms/NewsletterSignup';
import { useYouTubeVideos } from '@/hooks/useYouTubeVideos';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

const categories = ['All', 'Market Updates', 'Seller Tips', 'Buyer Tips', 'Articles', 'Neighborhoods'];

const articles = [
  {
    id: 1,
    title: 'The Complete Guide to Selling Your First Home in the GTA',
    excerpt: 'Everything first-time sellers need to know about the GTA real estate market, from pricing to closing.',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=500&fit=crop',
    category: 'Seller Tips',
    date: 'Jan 12, 2024',
    slug: 'guide-selling-first-home-gta',
  },
  {
    id: 2,
    title: 'Why Staging Matters: Before and After Transformations',
    excerpt: 'Real examples of how professional staging helped our clients sell faster and for more money.',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=500&fit=crop',
    category: 'Seller Tips',
    date: 'Jan 8, 2024',
    slug: 'why-staging-matters',
  },
  {
    id: 3,
    title: 'Understanding the 2024 GTA Real Estate Forecast',
    excerpt: 'A data-driven look at what sellers and buyers can expect in the Greater Toronto Area this year.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=500&fit=crop',
    category: 'Market Updates',
    date: 'Jan 3, 2024',
    slug: '2024-gta-forecast',
  },
  {
    id: 4,
    title: 'First-Time Buyer Mistakes to Avoid in the GTA',
    excerpt: 'Common pitfalls that first-time buyers face and how to navigate them successfully.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=500&fit=crop',
    category: 'Buyer Tips',
    date: 'Dec 28, 2023',
    slug: 'first-time-buyer-mistakes',
  },
  {
    id: 5,
    title: 'Mississauga Neighborhood Guide: Where to Buy',
    excerpt: 'An in-depth look at Mississauga neighborhoods, from family-friendly areas to urban hotspots.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=500&fit=crop',
    category: 'Neighborhoods',
    date: 'Dec 20, 2023',
    slug: 'mississauga-neighborhood-guide',
  },
  {
    id: 6,
    title: 'How Interest Rate Changes Affect Home Prices',
    excerpt: 'Understanding the relationship between interest rates and the GTA housing market.',
    image: 'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=800&h=500&fit=crop',
    category: 'Market Updates',
    date: 'Dec 15, 2023',
    slug: 'interest-rates-home-prices',
  },
];

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function VideoSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="aspect-video rounded-lg" />
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-6 w-full" />
    </div>
  );
}

export default function Insights() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { videos, isLoading } = useYouTubeVideos(6);

  // Filter articles by category
  const filteredArticles = selectedCategory === 'All' || selectedCategory === 'Market Updates' || selectedCategory === 'Seller Tips' || selectedCategory === 'Buyer Tips' || selectedCategory === 'Neighborhoods'
    ? selectedCategory === 'All'
      ? articles
      : articles.filter(a => a.category === selectedCategory)
    : [];

  // Show videos only for certain categories
  const showVideos = selectedCategory === 'All' || selectedCategory === 'Market Updates' || selectedCategory === 'Seller Tips' || selectedCategory === 'Buyer Tips';

  return (
    <Layout>
      <SEOHead
        title="Insights | Market Updates, Seller Tips & Buyer Guides"
        description="Your unified hub for GTA real estate insights. Market updates, seller tips, buyer tips, articles, and neighborhood guides all in one place."
        canonicalUrl="https://gta-insight-hub.lovable.app/insights"
      />

      {/* Header */}
      <section className="bg-gradient-warm section-padding py-16">
        <div className="container-wide mx-auto">
          <span className="inline-block text-sm font-medium text-primary mb-4 tracking-wide uppercase">
            Knowledge Hub
          </span>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-4">
            Real Estate Insights
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Your one-stop hub for GTA real estate knowledge. Market updates, seller tips, 
            buyer advice, and neighborhood guides — all designed to help you make smarter decisions.
          </p>
        </div>
      </section>

      {/* Filter Buttons */}
      <SectionWrapper>
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'gold' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Videos Section */}
        {showVideos && (
          <div className="mb-12">
            <h2 className="font-serif text-2xl font-bold mb-6">Latest Videos</h2>
            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <VideoSkeleton key={i} />
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.slice(0, selectedCategory === 'All' ? 3 : 6).map((video) => (
                  <VideoCard
                    key={video.videoId}
                    title={video.title}
                    thumbnail={video.thumbnail}
                    videoUrl={video.link}
                    date={formatDate(video.published)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Articles Section */}
        {(selectedCategory === 'All' || selectedCategory === 'Articles' || filteredArticles.length > 0) && (
          <div>
            <h2 className="font-serif text-2xl font-bold mb-6">
              {selectedCategory === 'All' ? 'Featured Articles' : selectedCategory}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(selectedCategory === 'All' ? articles.slice(0, 3) : filteredArticles).map((article) => (
                <BlogCard key={article.id} {...article} />
              ))}
            </div>
          </div>
        )}

        {/* CTA between content */}
        <div className="my-12">
          <CTABlock
            variant="secondary"
            title="Looking for specific advice?"
            subtitle="Book a free call and get personalized insights for your situation."
            primaryCta={{ text: "Book a Call", href: "https://calendly.com/fawadnissari" }}
            secondaryCta={{ text: "Download Seller Guide", href: "/seller-guide" }}
          />
        </div>
      </SectionWrapper>

      {/* Newsletter */}
      <SectionWrapper variant="muted">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl font-bold mb-4">
            Get Weekly Insights
          </h2>
          <p className="text-muted-foreground mb-8">
            Market trends, seller tips, and buyer guidance delivered every Friday. 
            No spam, just value.
          </p>
          <NewsletterSignup />
        </div>
      </SectionWrapper>

      {/* Bottom CTA */}
      <SectionWrapper>
        <CTABlock
          variant="dark"
          title="Ready to Take the Next Step?"
          subtitle="Whether you're buying, selling, or just exploring — I'm here to help."
          primaryCta={{ text: "Book a Call", href: "https://calendly.com/fawadnissari" }}
          secondaryCta={{ text: "Download Seller Guide", href: "/seller-guide" }}
        />
      </SectionWrapper>
    </Layout>
  );
}
