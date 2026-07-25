import { useParams, Link, Navigate } from 'react-router-dom';
import { MapPin, ArrowLeft } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SectionWrapper } from '@/components/sections/SectionHeader';
import { HomeEvaluationForm } from '@/components/forms/HomeEvaluationForm';
import { MILTON_NEIGHBOURHOOD_MAP } from './neighbourhoods';

export default function MiltonNeighbourhood() {
  const { slug } = useParams<{ slug: string }>();
  const n = slug ? MILTON_NEIGHBOURHOOD_MAP[slug] : undefined;

  if (!n) return <Navigate to="/areas/milton" replace />;

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-warm section-padding py-16">
        <div className="container-wide mx-auto">
          <Link
            to="/areas/milton"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Milton
          </Link>
          <span className="inline-flex items-center gap-2 text-sm font-medium text-primary mb-4 tracking-wide uppercase">
            <MapPin className="w-4 h-4" />
            {n.name} · Milton, ON
          </span>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-4">
            Selling a Home in {n.name}, Milton
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">{n.intro}</p>
        </div>
      </section>

      {/* Neighbourhood snapshot */}
      <SectionWrapper>
        <div className="max-w-3xl">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-6 gold-underline inline-block pb-2">
            {n.name} Snapshot
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 mt-6">
            <div className="bg-card border border-border rounded-lg p-5">
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
                Neighbourhood vibe
              </p>
              <p className="font-medium">{n.vibe}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-5">
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
                Typical housing
              </p>
              <p className="font-medium">{n.housing}</p>
            </div>
          </div>
          <div className="mt-8">
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-3">
              Landmarks & anchors
            </p>
            <ul className="grid sm:grid-cols-2 gap-3">
              {n.landmarks.map((l) => (
                <li
                  key={l}
                  className="flex items-center gap-3 bg-card border border-border rounded-lg px-4 py-3"
                >
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                  <span className="font-medium">{l}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionWrapper>

      {/* Recent sales placeholder */}
      <SectionWrapper variant="muted">
        <div className="max-w-3xl">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4 gold-underline inline-block pb-2">
            Recent Sales in {n.name}
          </h2>
          <p className="text-muted-foreground mt-4">
            A detailed breakdown of recent {n.name} sold prices, days on market, and sale-to-list ratios
            — pulled straight from TRREB — will live here.
          </p>
          <p className="text-sm text-muted-foreground mt-4 italic">
            Neighbourhood-specific sold data coming soon.
          </p>
        </div>
      </SectionWrapper>

      {/* CMA Form CTA */}
      <SectionWrapper>
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <span className="inline-block text-sm font-medium text-primary mb-4 tracking-wide uppercase">
              Free Home Evaluation
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4">
              What's Your {n.name} Home Worth?
            </h2>
            <p className="text-muted-foreground mb-4">
              Get a data-driven Comparative Market Analysis based on real, recent {n.name} sales —
              delivered within 24-48 hours.
            </p>
            <p className="text-muted-foreground">
              No pressure, no obligation. Just honest information about your biggest asset.
            </p>
          </div>
          <HomeEvaluationForm
            source={`neighbourhood-milton-${n.slug}`}
            addressPlaceholder={`123 Main Street, ${n.name}, Milton, ON`}
          />
        </div>
      </SectionWrapper>
    </Layout>
  );
}