import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SectionWrapper } from '@/components/sections/SectionHeader';
import { VideoCard } from '@/components/cards/VideoCard';
import { CTABlock } from '@/components/sections/CTABlock';
import { Button } from '@/components/ui/button';

const categories = ['All', 'Market Updates', 'Selling Advice', 'First-Time Seller Tips', 'GTA Analysis'];

const videos = [
  {
    id: 1,
    title: 'GTA Market Update January 2024: What Sellers Need to Know',
    thumbnail: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=450&fit=crop',
    duration: '12:45',
    category: 'Market Updates',
    date: 'Jan 15, 2024',
  },
  {
    id: 2,
    title: 'Should You Sell in Winter? GTA Real Estate Analysis',
    thumbnail: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=450&fit=crop',
    duration: '8:32',
    category: 'Selling Advice',
    date: 'Jan 10, 2024',
  },
  {
    id: 3,
    title: 'First-Time Seller Mistakes to Avoid in 2024',
    thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=450&fit=crop',
    duration: '15:20',
    category: 'First-Time Seller Tips',
    date: 'Jan 5, 2024',
  },
  {
    id: 4,
    title: 'Mississauga vs Milton: Where Should You Buy?',
    thumbnail: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=450&fit=crop',
    duration: '18:45',
    category: 'GTA Analysis',
    date: 'Dec 28, 2023',
  },
  {
    id: 5,
    title: 'How to Price Your Home Right: A Data-Driven Approach',
    thumbnail: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=450&fit=crop',
    duration: '11:30',
    category: 'Selling Advice',
    date: 'Dec 22, 2023',
  },
  {
    id: 6,
    title: 'December 2023 GTA Market Recap',
    thumbnail: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=450&fit=crop',
    duration: '14:15',
    category: 'Market Updates',
    date: 'Dec 18, 2023',
  },
  {
    id: 7,
    title: 'Understanding Home Inspections: A Seller\'s Guide',
    thumbnail: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=500&fit=crop',
    duration: '9:45',
    category: 'First-Time Seller Tips',
    date: 'Dec 14, 2023',
  },
  {
    id: 8,
    title: 'The Truth About Real Estate Agent Commissions',
    thumbnail: 'https://images.unsplash.com/photo-1600573472591-ee6981cf35b6?w=800&h=450&fit=crop',
    duration: '13:20',
    category: 'Selling Advice',
    date: 'Dec 10, 2023',
  },
  {
    id: 9,
    title: 'Oakville Real Estate: 2024 Outlook',
    thumbnail: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=450&fit=crop',
    duration: '16:00',
    category: 'GTA Analysis',
    date: 'Dec 5, 2023',
  },
];

export default function YouTubeHub() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredVideos = selectedCategory === 'All'
    ? videos
    : videos.filter(video => video.category === selectedCategory);

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
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4" />
              Subscribe on YouTube
            </a>
          </Button>
        </div>
      </section>

      {/* Filter */}
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

        {/* Videos Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <VideoCard key={video.id} {...video} />
          ))}
        </div>
      </SectionWrapper>

      {/* Bottom CTA */}
      <SectionWrapper variant="muted">
        <CTABlock
          variant="primary"
          title="Never Miss an Update"
          subtitle="Subscribe to get weekly market updates and real estate advice delivered to your feed."
          primaryCta={{ text: "Subscribe on YouTube", href: "https://youtube.com" }}
          secondaryCta={{ text: "Book a Call", href: "/contact" }}
        />
      </SectionWrapper>
    </Layout>
  );
}
