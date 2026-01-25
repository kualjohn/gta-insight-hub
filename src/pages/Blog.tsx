import { useState } from 'react';
import { Search } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SectionWrapper } from '@/components/sections/SectionHeader';
import { BlogCard } from '@/components/cards/BlogCard';
import { CTABlock, DownloadCTA } from '@/components/sections/CTABlock';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const categories = ['All', 'Seller Tips', 'Market Updates', 'GTA Advice', 'Staging'];

const blogs = [
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
    category: 'Staging',
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
    title: 'How to Choose the Right Real Estate Agent',
    excerpt: 'What to look for when selecting an agent, the questions to ask, and red flags to avoid.',
    image: 'https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?w=800&h=500&fit=crop',
    category: 'GTA Advice',
    date: 'Dec 28, 2023',
    slug: 'choose-right-agent',
  },
  {
    id: 5,
    title: '10 Home Improvements That Add Value Before Selling',
    excerpt: 'Smart upgrades that offer the best return on investment when preparing your home for sale.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=500&fit=crop',
    category: 'Seller Tips',
    date: 'Dec 22, 2023',
    slug: 'home-improvements-add-value',
  },
  {
    id: 6,
    title: 'The Psychology of Home Staging: What Buyers Want to See',
    excerpt: 'Understanding buyer psychology to present your home in the most appealing way possible.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=450&fit=crop',
    category: 'Staging',
    date: 'Dec 18, 2023',
    slug: 'psychology-home-staging',
  },
];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBlogs = blogs
    .filter(blog => selectedCategory === 'All' || blog.category === selectedCategory)
    .filter(blog => 
      searchQuery === '' || 
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <Layout>
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
        </div>
      </section>

      {/* Search & Filter */}
      <SectionWrapper>
        <div className="flex flex-col lg:flex-row gap-4 justify-between mb-10">
          <div className="flex flex-wrap gap-2">
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
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Blog Grid with Sidebar */}
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="grid md:grid-cols-2 gap-8">
              {filteredBlogs.map((blog) => (
                <BlogCard key={blog.id} {...blog} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <DownloadCTA />
          </div>
        </div>
      </SectionWrapper>

      {/* Bottom CTA */}
      <SectionWrapper variant="muted">
        <CTABlock
          variant="dark"
          title="Have Questions About Selling?"
          subtitle="Let's discuss your situation and create a plan that works for you."
          primaryCta={{ text: "Book a Call", href: "/contact" }}
          secondaryCta={{ text: "Watch My Videos", href: "/youtube" }}
        />
      </SectionWrapper>
    </Layout>
  );
}
