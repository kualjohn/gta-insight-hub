import AreaPage from '../AreaPage';

export default function Oakville() {
  return (
    <AreaPage
      area={{
        name: 'Oakville',
        slug: 'oakville',
        region: 'GTA West · Halton Region',
        intro:
          "Oakville is an upscale lakeside community known for top-rated schools, mature tree-lined streets, and one of the strongest property value stories in the GTA. Presentation and pricing strategy matter more here than almost anywhere else — buyers expect polish.",
        costStub:
          "This section will break down the real cost of selling a home in Oakville — commission, legal fees, staging, and every other cost — using current TRREB data. Full numbers coming soon.",
        neighbourhoods: ['Old Oakville', 'Bronte', 'Glen Abbey', 'Joshua Creek'],
      }}
    />
  );
}