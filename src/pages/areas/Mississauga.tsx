import AreaPage from '../AreaPage';

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
          "This section will break down the real cost of selling a home in Mississauga — commission, legal fees, staging, and every other line item — using current TRREB data. Full numbers coming soon.",
        neighbourhoods: ['Port Credit', 'Lorne Park', 'Streetsville', 'Erin Mills'],
      }}
    />
  );
}