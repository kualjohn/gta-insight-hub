import { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SectionWrapper } from '@/components/sections/SectionHeader';
import { CTABlock } from '@/components/sections/CTABlock';
import { Button } from '@/components/ui/button';
import { BlogCard } from '@/components/cards/BlogCard';
import { Skeleton } from '@/components/ui/skeleton';
import { SEOHead } from '@/components/seo/SEOHead';
import { supabase } from '@/integrations/supabase/client';
import type { BlogPost } from '@/hooks/useBlogPosts';

const areas = ['All', 'Milton', 'Mississauga', 'Oakville', 'Burlington', 'Toronto', 'GTA'];

// Heuristic: a "market update" post mentions market, update, recap, trends, mortgage, taxes, forecast, analysis
const MARKET_KEYWORDS = /(market|update|recap|trend|mortgage|taxes|forecast|analysis|prices?|2025|2026|crash|sales)/i;

function detectArea(post: BlogPost): string {
  const hay = `${post.title} ${post.excerpt ?? ''}`;
  for (const a of areas) {
    if (a !== 'All' && new RegExp(`\\b${a}\\b`, 'i').test(hay)) return a;
  }
  return 'GTA';
}

function formatDate(d: string | null): string {
  if (!d) return '';
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function MarketUpdates() {
  const [selectedArea, setSelectedArea] = useState('All');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('blog_posts')
        .select('*')
        .order('published_at', { ascending: false, nullsFirst: false })
        .limit(100);
      setPosts(((data || []) as BlogPost[]).filter(p => MARKET_KEYWORDS.test(p.title)));
      setLoading(false);
    })();
  }, []);

  const filtered = useMemo(() => {
    if (selectedArea === 'All') return posts;
    return posts.filter(p => detectArea(p) === selectedArea);
  }, [posts, selectedArea]);

  return (
    <Layout>
      <SEOHead
        title="GTA Real Estate Market Updates | Fawad Nissari"
        description="Honest, data-driven market updates and analysis for Milton, Mississauga, Oakville, Burlington and the wider GTA."
      />

      {/* Header */}
      <section className="bg-gradient-warm section-padding py-16">
        <div className="container-wide mx-auto">
          <span className="inline-block text-sm font-medium text-accent mb-4 tracking-wide uppercase">
            Stay Informed
          </span>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-4">
            GTA Real Estate Market Updates
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Honest analysis and real numbers for communities across the Greater Toronto Area —
            no spin, no hype, just what the data shows.
          </p>
        </div>
      </section>

      {/* Filter + Posts */}
      <SectionWrapper>
        <div className="flex flex-wrap gap-2 mb-10">
          {areas.map(area => (
            <Button
              key={area}
              variant={selectedArea === area ? 'gold' : 'outline'}
              size="sm"
              onClick={() => setSelectedArea(area)}
            >
              {area}
            </Button>
          ))}
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <Skeleton key={i} className="h-80 rounded-xl" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">
              No market updates yet for {selectedArea}. Check back soon.
            </p>
            <Button variant="outline" asChild>
              <Link to="/blog">Browse all articles</Link>
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post, index) => (
              <div key={post.id} className="contents">
                <BlogCard
                  title={post.title}
                  excerpt={post.excerpt ?? ''}
                  category={detectArea(post)}
                  date={formatDate(post.published_at)}
                  slug={post.slug}
                  image={post.featured_image ?? undefined}
                />
                {(index + 1) % 6 === 0 && index !== filtered.length - 1 && (
                  <div className="md:col-span-2 lg:col-span-3">
                    <CTABlock
                      variant="secondary"
                      title="Want to discuss these market trends?"
                      subtitle="Book a free consultation to understand what this means for your home."
                      primaryCta={{ text: 'Book a Call', href: 'https://calendly.com/fawadnissari' }}
                      secondaryCta={{ text: 'Watch My Videos', href: '/youtube' }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </SectionWrapper>

      {/* Bottom CTA */}
      <SectionWrapper variant="muted">
        <CTABlock
          variant="dark"
          title="Get Personalized Market Insights"
          subtitle="Wondering what your home is worth in today's market? Let's talk."
          primaryCta={{ text: 'Book a Call', href: 'https://calendly.com/fawadnissari' }}
          secondaryCta={{ text: 'Get Home Evaluation', href: '/home-evaluation' }}
        />
      </SectionWrapper>
    </Layout>
  );
}

