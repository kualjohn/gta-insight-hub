import AreaPage from '../AreaPage';
import { MILTON_NEIGHBOURHOODS } from './milton/neighbourhoods';

export default function Milton() {
  return (
    <AreaPage
      area={{
        name: 'Milton',
        slug: 'milton',
        region: 'GTA West · Halton Region',
        intro:
          "Milton is one of the fastest-growing communities in Canada — a family-first town where new subdivisions, top-rated schools, and Niagara Escarpment trails come together. Buyer demand stays strong across detached homes and townhouses, especially in the newer neighbourhoods along the escarpment.",
        costStub:
          "This section will break down the real cost of selling a home in Milton — commission, legal fees, staging, mortgage discharge, and everything else — using current TRREB data. Full numbers coming soon.",
        neighbourhoods: MILTON_NEIGHBOURHOODS.map((n) => ({
          name: n.name,
          href: `/areas/milton/${n.slug}`,
        })),
      }}
    />
  );
}