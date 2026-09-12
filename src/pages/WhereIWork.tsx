import { Link } from 'react-router-dom';
import { MapPin, Phone } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SectionWrapper } from '@/components/sections/SectionHeader';
import { Button } from '@/components/ui/button';

const CALENDLY_URL = 'https://calendly.com/fawadnissari';

export default function WhereIWork() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-warm section-padding py-16">
        <div className="container-wide mx-auto max-w-3xl">
          <span className="inline-flex items-center gap-2 brand-label text-accent mb-4">
            <MapPin className="w-4 h-4" />
            Service Region
          </span>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-5">
            Where I Work: Milton and the West GTA
          </h1>
          <p className="text-lg text-muted-foreground">
            I'm a Milton-based broker, and Milton is where I spend most of my week. I also list and
            sell across Mississauga, Oakville and the wider Greater Toronto Area, because the people
            I work with rarely move in a straight line — they move between these places.
          </p>
        </div>
      </section>

      {/* Milton */}
      <SectionWrapper>
        <div className="max-w-3xl space-y-4">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold gold-underline inline-block pb-2">
            Milton
          </h2>
          <p className="text-muted-foreground">
            Milton is home base. I live here, my listings are concentrated here, and it's the market
            I can speak about street by street rather than in generalities. That matters more in
            Milton than in most towns, because the housing stock changes so quickly as you move
            across it. Old Milton is a historic main-street neighbourhood of century homes and
            infill. Dorset Park, Bronte Meadows and Timberlea are established, tree-lined and
            largely 1970s and 1980s construction. Hawthorne Village, Harrison, Scott, Coates, Ford,
            Willmott, Bowes, Cobban and Walker are newer, denser and built in phases, so two homes
            a few hundred metres apart can attract completely different buyers.
          </p>
          <p className="text-muted-foreground">
            That local detail is the whole job when you're selling. Which pocket buyers are
            actively searching, which school catchment a family is really paying for, whether a
            back-splits rear yard or a new-build layout is the stronger selling point — those
            decisions get made before a listing ever goes live, and they're the difference between a
            fast sale and a stale one. I handle the pricing conversation, the staging, the
            photography and the campaign for every Milton listing personally.
          </p>
          <p className="text-muted-foreground">
            If you're starting there, the{' '}
            <Link to="/areas/milton" className="text-accent hover:underline">
              Milton real estate page
            </Link>{' '}
            has the neighbourhood-by-neighbourhood breakdown, and the{' '}
            <Link to="/moving-to-milton" className="text-accent hover:underline">
              Moving to Milton guide
            </Link>{' '}
            covers commuting, schools and cost of living for anyone relocating in.
          </p>
        </div>
      </SectionWrapper>

      {/* Mississauga */}
      <SectionWrapper variant="muted">
        <div className="max-w-3xl space-y-4">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold gold-underline inline-block pb-2">
            Mississauga
          </h2>
          <p className="text-muted-foreground">
            Mississauga is the city most of my Milton clients came from, and the one a lot of them
            still own property in. It's really a collection of very different markets under one
            name: the condo towers and transit density of City Centre, the mature detached streets
            of Lorne Park, Mineola and Clarkson, the family subdivisions of Meadowvale, Churchill
            Meadows, Erin Mills and Streetsville, and the older, more affordable pockets in
            Malton and Cooksville.
          </p>
          <p className="text-muted-foreground">
            Because the segments behave so differently, I treat a Mississauga listing as its own
            pricing exercise rather than applying a city-wide assumption. A townhouse near a future
            LRT stop, a detached home on a large Lorne Park lot and a two-bedroom condo downtown are
            three separate buyer pools with three separate marketing plans. You can see how I break
            the city down on the{' '}
            <Link to="/areas/mississauga" className="text-accent hover:underline">
              Mississauga real estate page
            </Link>
            , and the{' '}
            <Link to="/cost-of-selling-a-house-in-mississauga" className="text-accent hover:underline">
              cost of selling in Mississauga
            </Link>{' '}
            guide walks through what actually comes off the top at closing.
          </p>
        </div>
      </SectionWrapper>

      {/* Oakville */}
      <SectionWrapper>
        <div className="max-w-3xl space-y-4">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold gold-underline inline-block pb-2">
            Oakville
          </h2>
          <p className="text-muted-foreground">
            Oakville sits directly south of Milton, and it's a common next step for families trading
            up. It's a presentation-driven market. Buyers here compare finishes, landscaping and
            staging as closely as they compare square footage, and a home that photographs poorly
            can sit while a near-identical one down the street moves quickly. That's a large part of
            why I include full professional staging with every listing rather than treating it as an
            upsell.
          </p>
          <p className="text-muted-foreground">
            The town runs from the historic downtown and the lakefront streets of Old Oakville and
            Bronte through to Glen Abbey, River Oaks, Joshua Creek and the newer communities north
            of Dundas. Each attracts a distinct buyer — heritage-home purchasers, golf-course
            families, executives relocating for work north of the QEW — and the listing strategy
            changes accordingly. If you own in Oakville and are weighing a move, I'll give you the
            honest read on where your specific pocket stands rather than a town-wide average.
          </p>
        </div>
      </SectionWrapper>

      {/* Wider GTA */}
      <SectionWrapper variant="muted">
        <div className="max-w-3xl space-y-4">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold gold-underline inline-block pb-2">
            The wider GTA
          </h2>
          <p className="text-muted-foreground">
            Beyond those three, I regularly work in Brampton and Etobicoke, and I take referrals
            elsewhere in the Greater Toronto Area when a client is moving within my region. Brampton
            has become a natural companion market to Milton — similar buyer profiles, similar
            growth pressure, a lot of families comparing the two directly. Etobicoke bridges the
            west GTA and the city itself, which makes it the usual landing spot for people who want
            Toronto access without downtown pricing.
          </p>
          <p className="text-muted-foreground">
            I'd rather be genuinely useful in a handful of markets than thinly present in twenty. If
            your move is well outside the west GTA, I'll say so and connect you with an agent I
            trust in that market instead of stretching to take the listing.
          </p>
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper>
        <div className="max-w-3xl">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4">
            Not sure if your area is covered?
          </h2>
          <p className="text-muted-foreground mb-6">
            Book a free consultation call. Tell me where the property is and where you're heading,
            and I'll tell you straight whether I'm the right person for it.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="accent" size="lg" asChild>
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                <Phone className="w-5 h-5" />
                Book a Call
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/areas">Browse all areas</Link>
            </Button>
          </div>
        </div>
      </SectionWrapper>
    </Layout>
  );
}
