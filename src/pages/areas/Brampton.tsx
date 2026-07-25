import AreaPage from '../AreaPage';

export default function Brampton() {
  return (
    <AreaPage
      area={{
        name: 'Brampton',
        slug: 'brampton',
        region: 'GTA West · Peel Region',
        intro:
          "Brampton is one of Canada's fastest-growing cities — a vibrant, multicultural community where families, first-time buyers, and investors all compete for well-located homes. With strong transit corridors, expanding infrastructure, and a wide range of housing types from detached to townhomes, Brampton remains one of the busiest real estate markets in the western GTA.",
        costStub:
          "This section will break down the real cost of selling a home in Brampton — commission, legal fees, staging, mortgage discharge, and every other line item — using current TRREB data. Full numbers coming soon.",
        neighbourhoods: ['Bramalea', 'Heart Lake', 'Castlemore', 'Fletcher's Meadow'],
      }}
    />
  );
}
