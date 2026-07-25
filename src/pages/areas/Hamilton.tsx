import AreaPage from '../AreaPage';

export default function Hamilton() {
  return (
    <AreaPage
      area={{
        name: 'Hamilton',
        slug: 'hamilton',
        region: 'GTA West · Hamilton Region',
        intro:
          "Hamilton is one of the most dynamic markets in the Greater Toronto Area — a city where revitalized urban neighbourhoods, growing transit links, and relative affordability attract first-time buyers, investors, and move-up buyers alike. From the established streets of the Mountain to the waterfront communities along the lake, Hamilton offers strong value and steady resale demand.",
        costStub:
          "This section will break down the real cost of selling a home in Hamilton — commission, legal fees, staging, mortgage discharge, and every other line item — using current TRREB and RAHB data. Full numbers coming soon.",
        neighbourhoods: ['Ancaster', 'Dundas', 'Stoney Creek', 'Mountain'],
      }}
    />
  );
}
