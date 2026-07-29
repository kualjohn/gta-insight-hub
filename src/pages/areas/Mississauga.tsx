import AreaPage from '../AreaPage';
import { MISSISSAUGA_NEIGHBOURHOODS } from './mississauga/neighbourhoods';

export default function Mississauga() {
  return (
    <AreaPage
      area={{
        name: 'Mississauga',
        slug: 'mississauga',
        region: 'GTA West · Peel Region',
        intro:
          "Mississauga is the GTA's most diverse major market — everything from downtown Square One condos to established detached streets in Lorne Park and Streetsville. Strong transit, employment, and school catchments keep demand steady across every property type.",
        costStub:
          "With a median detached price of $1,160,000 in Mississauga (May 2026 TRREB data), the total cost of selling — commission, legal fees, staging, and closing adjustments — adds up quickly. Homes here are averaging 27 days on market and selling at 98% of asking, so pricing and presentation directly affect what you keep. I've published the full line-by-line breakdown, including how a 1% listing commission changes the math.",
        costCtaHref: '/cost-of-selling-a-house-in-mississauga',
        costCtaLabel: 'See the Full Cost Breakdown for Mississauga',
        neighbourhoods: MISSISSAUGA_NEIGHBOURHOODS.map((n) => ({
          name: n.name,
          href: `/areas/mississauga/${n.slug}`,
        })),
      }}
    />
  );
}