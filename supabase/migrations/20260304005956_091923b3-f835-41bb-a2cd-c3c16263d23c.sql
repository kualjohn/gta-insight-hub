CREATE TABLE public.property_websites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  status text NOT NULL DEFAULT 'for_sale',
  property_type text,
  price numeric,
  city text,
  neighbourhood text,
  beds integer,
  baths integer,
  sqft integer,
  lot_size text,
  thumbnail_image text,
  hero_image text,
  gallery_images jsonb DEFAULT '[]'::jsonb,
  description text,
  tagline text,
  sold_tagline text,
  video_url text,
  tour_3d_url text,
  floorplan_url text,
  brochure_url text,
  is_featured boolean DEFAULT false,
  published boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.property_websites ENABLE ROW LEVEL SECURITY;

-- Public can read published properties
CREATE POLICY "Anyone can read published properties"
  ON public.property_websites
  FOR SELECT
  USING (published = true);
