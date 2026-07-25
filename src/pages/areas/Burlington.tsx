import AreaPage from '../AreaPage';

export default function Burlington() {
  return (
    <AreaPage
      area={{
        name: 'Burlington',
        slug: 'burlington',
        region: 'GTA West · Halton Region',
        intro:
          "Burlington balances waterfront living, a walkable downtown core, and nature-first neighbourhoods along the escarpment. Consistent demand across detached, townhouse, and condo segments makes it one of the more resilient markets in Halton.",
        costStub:
          "This section will break down the real cost of selling a home in Burlington — commission, legal fees, staging, and every other line item — using current TRREB data. Full numbers coming soon.",
        neighbourhoods: ['Downtown Burlington', 'Aldershot', 'Roseland', 'Millcroft'],
      }}
    />
  );
}