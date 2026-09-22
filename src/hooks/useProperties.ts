import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Property } from '@/types/property';

// Active listings (for sale / coming soon) always come before sold or leased ones.
export function activeRank(status: string | null): number {
  return status === 'for_sale' || status === 'coming_soon' ? 0 : 1;
}

export function useProperties() {
  return useQuery({
    queryKey: ['properties'],
    queryFn: async (): Promise<Property[]> => {
      const { data, error } = await (supabase as any)
        .from('property_websites')
        .select('*')
        .eq('published', true)
        .order('is_featured', { ascending: false })
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });
      if (error) throw error;
      return ((data || []) as Property[]).sort(
        (a, b) => activeRank(a.status) - activeRank(b.status)
      );
    },
  });
}

export function useProperty(slug: string) {
  return useQuery({
    queryKey: ['property', slug],
    queryFn: async (): Promise<Property | null> => {
      const { data, error } = await (supabase as any)
        .from('property_websites')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .maybeSingle();
      if (error) throw error;
      return data as Property | null;
    },
    enabled: !!slug,
  });
}
