import { Layout } from '@/components/layout/Layout';
import { SectionWrapper } from '@/components/sections/SectionHeader';
import { SEOHead } from '@/components/seo/SEOHead';
import { HomeEvaluationForm } from '@/components/forms/HomeEvaluationForm';
import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface AreaNeighbourhood {
  name: string;
  href?: string;
}

export interface AreaConfig {
  name: string;
  slug: string;
  region: string;
  intro: string;
  neighbourhoods: Array<string | AreaNeighbourhood>;
  costStub: string;
  costCtaHref?: string;
  costCtaLabel?: string;
}

export default function AreaPage({ area }: { area: AreaConfig }) {
  return (
    <Layout>
      <SEOHead
        title={`Selling a Home in ${area.name} | ${area.name} Real Estate Advisor`}
        description={`Thinking about selling in ${area.name}? Get a free home evaluation, local market insights, and neighbourhood expertise from Fawad Nissari, your ${area.name} real estate advisor.`}
      />

      {/* Header */}
      <section className="bg-gradient-warm section-padding py-16">
        <div className="container-wide mx-auto">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-primary mb-4 tracking-wide uppercase">
            <MapPin className="w-4 h-4" />
            {area.region}
          </span>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-4">
            Selling a Home in {area.name}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">{area.intro}</p>
        </div>
      </section>

      {/* Cost of Selling stub */}
      <SectionWrapper>
        <div className="max-w-3xl">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4 gold-underline inline-block pb-2">
            Cost of Selling in {area.name}
          </h2>
          <p className="text-muted-foreground mt-4">{area.costStub}</p>
          {area.costCtaHref ? (
            <Link
              to={area.costCtaHref}
              className="inline-flex items-center gap-2 mt-6 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground hover:opacity-90 transition-opacity"
            >
              {area.costCtaLabel ?? 'See the Full Cost Breakdown'}
            </Link>
          ) : (
            <p className="text-sm text-muted-foreground mt-4 italic">
              Detailed cost breakdown coming soon.
            </p>
          )}
        </div>
      </SectionWrapper>

      {/* Neighbourhoods */}
      <SectionWrapper variant="muted">
        <div className="max-w-3xl">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-6 gold-underline inline-block pb-2">
            Neighbourhoods
          </h2>
          <p className="text-muted-foreground mb-6">
            A few of the communities I work in across {area.name}:
          </p>
          <ul className="grid sm:grid-cols-2 gap-3">
            {area.neighbourhoods.map((raw) => {
              const n: AreaNeighbourhood =
                typeof raw === 'string' ? { name: raw } : raw;
              const inner = (
                <>
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                  <span className="font-medium">{n.name}</span>
                </>
              );
              return (
                <li key={n.name}>
                  {n.href ? (
                    <Link
                      to={n.href}
                      className="flex items-center gap-3 bg-card border border-border rounded-lg px-4 py-3 hover:border-primary hover:shadow-sm transition-all"
                    >
                      {inner}
                    </Link>
                  ) : (
                    <div className="flex items-center gap-3 bg-card border border-border rounded-lg px-4 py-3">
                      {inner}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
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
              What's Your {area.name} Home Worth?
            </h2>
            <p className="text-muted-foreground mb-4">
              Get a data-driven Comparative Market Analysis based on real, recent sales in your {area.name} neighbourhood — delivered within 24-48 hours.
            </p>
            <p className="text-muted-foreground">
              No pressure, no obligation. Just honest information about your biggest asset.
            </p>
          </div>
          <HomeEvaluationForm
            source={`area-${area.slug}`}
            addressPlaceholder={`123 Main Street, ${area.name}, ON`}
          />
        </div>
      </SectionWrapper>
    </Layout>
  );
}