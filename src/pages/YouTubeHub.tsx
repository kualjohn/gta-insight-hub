import { useState } from 'react';
import { ExternalLink, Search, AlertCircle, Youtube } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SectionWrapper } from '@/components/sections/SectionHeader';
import { VideoCard } from '@/components/cards/VideoCard';
import { CTABlock } from '@/components/sections/CTABlock';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { useYouTubeVideos } from '@/hooks/useYouTubeVideos';

const CHANNEL_URL = 'https://www.youtube.com/channel/UCNiL5jVJ7uM89e2S69FrUxQ';

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
      <Skeleton className="h-4 w-32" />
    </div>
  );
}

export default function YouTubeHub() {
  const { videos, isLoading, error, channelUrl } = useYouTubeVideos();
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(9);

  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedVideos = filteredVideos.slice(0, visibleCount);
  const hasMore = filteredVideos.length > visibleCount;

  const loadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <Layout>
      {/* Header */}
      <section className="bg-charcoal text-primary-foreground section-padding py-16">
        <div className="container-wide mx-auto">
          <span className="inline-block text-sm font-medium text-primary mb-4 tracking-wide uppercase">
            YouTube Channel
          </span>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-4">
            GTA Real Estate Videos
          </h1>
          <p className="text-lg text-primary-foreground/70 max-w-2xl mb-8">
            Weekly market updates, selling strategies, and practical advice for GTA homeowners. 
            Subscribe for the latest real estate insights.
          </p>
          <Button variant="gold" size="lg" asChild>
            <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer">
              <Youtube className="w-5 h-5" />
              Subscribe on YouTube
            </a>
          </Button>
        </div>
      </section>

      <SectionWrapper>
        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Videos Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <VideoSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-16 bg-muted/50 rounded-lg">
            <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-serif font-semibold text-xl mb-2">Unable to load videos</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              We couldn't fetch the latest videos from YouTube. Please try again later or visit the channel directly.
            </p>
            <Button variant="gold" asChild>
              <a href={channelUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4" />
                Visit YouTube Channel
              </a>
            </Button>
          </div>
        ) : filteredVideos.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              {searchQuery ? `No videos found for "${searchQuery}"` : 'No videos available'}
            </p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedVideos.map((video) => (
                <VideoCard
                  key={video.videoId}
                  title={video.title}
                  thumbnail={video.thumbnail}
                  videoUrl={video.link}
                  date={formatDate(video.published)}
                />
              ))}
            </div>

            {/* Load More */}
            {hasMore && (
              <div className="text-center mt-10">
                <Button variant="outline" size="lg" onClick={loadMore}>
                  Load More Videos
                </Button>
              </div>
            )}
          </>
        )}
      </SectionWrapper>

      {/* Bottom CTA */}
      <SectionWrapper variant="muted">
        <CTABlock
          variant="primary"
          title="Never Miss an Update"
          subtitle="Subscribe to get weekly market updates and real estate advice delivered to your feed."
          primaryCta={{ text: "Subscribe on YouTube", href: CHANNEL_URL }}
          secondaryCta={{ text: "Book a Call", href: "/contact" }}
        />
      </SectionWrapper>
    </Layout>
  );
}
