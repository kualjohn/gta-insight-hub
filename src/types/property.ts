export type PropertyStatus = 'for_sale' | 'sold' | 'coming_soon' | 'leased';

export interface Property {
  id: string;
  title: string;
  slug: string;
  status: PropertyStatus;
  property_type: string | null;
  price: number | null;
  city: string | null;
  neighbourhood: string | null;
  beds: number | null;
  baths: number | null;
  sqft: number | null;
  lot_size: string | null;
  thumbnail_image: string | null;
  hero_image: string | null;
  gallery_images: string[];
  description: string | null;
  tagline: string | null;
  sold_tagline: string | null;
  video_url: string | null;
  tour_3d_url: string | null;
  floorplan_url: string | null;
  brochure_url: string | null;
  is_featured: boolean;
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export const statusLabel: Record<PropertyStatus, string> = {
  for_sale: 'For Sale',
  sold: 'Sold',
  coming_soon: 'Coming Soon',
  leased: 'Leased',
};

export function formatPrice(price: number | null): string {
  if (!price) return '';
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(price);
}
