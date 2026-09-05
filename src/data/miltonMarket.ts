/**
 * Single source of truth for Milton market figures (TRREB Market Watch).
 * Used by /cost-of-selling-a-house-in-milton and /moving-to-milton so both
 * pages always show the same numbers. Update here and both pages follow.
 */

export const MILTON_MARKET_PERIOD = 'June 2026';
export const MILTON_MARKET_SOURCE = 'TRREB Market Watch';

export type MiltonPricePoint = {
  type: string;
  price: string;
  yoy: string;
  meta: string;
  /** average days on market */
  dom: string;
  /** sale-price to list-price ratio */
  ratio: string;
  note: string;
};

export const MILTON_PRICES_BY_TYPE: MiltonPricePoint[] = [
  {
    type: 'Detached',
    price: '$1,160,000',
    yoy: '▼ $24,000 vs June 2025',
    meta: '259 sales · 26 days avg · 98% SP/LP',
    dom: '26 days',
    ratio: '98%',
    note: 'Slight discount to list — room to negotiate',
  },
  {
    type: 'Semi-Detached',
    price: '$865,000',
    yoy: '▼ $102,500 vs June 2025',
    meta: '17 sales · 25 days avg · 100% SP/LP',
    dom: '25 days',
    ratio: '100%',
    note: 'At asking, slightly slower than towns',
  },
  {
    type: 'Townhouse',
    price: '$810,000',
    yoy: '▼ $60,000 vs June 2025',
    meta: '77 sales · 16 days avg · 100% SP/LP',
    dom: '16 days',
    ratio: '100%',
    note: 'Selling at full asking — most competitive segment',
  },
  {
    type: 'Condo Townhouse',
    price: '$651,500',
    yoy: '▼ $78,500 vs June 2025',
    meta: '22 sales · 37 days avg · 96% SP/LP',
    dom: '37 days',
    ratio: '96%',
    note: 'Buyers negotiating 4% below ask — pricing critical',
  },
  {
    type: 'Condo Apartment',
    price: '$465,000',
    yoy: '▼ $108,500 vs June 2025',
    meta: '27 sales · 39 days avg · 96% SP/LP',
    dom: '39 days',
    ratio: '96%',
    note: 'Slowest segment — inventory high, patience needed',
  },
];
