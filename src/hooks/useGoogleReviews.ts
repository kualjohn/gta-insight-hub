import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type GoogleReview = {
  author: string;
  authorPhoto: string | null;
  authorUrl: string | null;
  rating: number;
  text: string;
  relativeTime: string;
  publishTime: string | null;
};

export type GoogleReviewsData = {
  name: string;
  rating: number | null;
  totalReviews: number;
  mapsUrl: string;
  reviews: GoogleReview[];
};

type CacheState =
  | { status: 'idle' }
  | { status: 'loading'; promise: Promise<GoogleReviewsData | null> }
  | { status: 'loaded'; data: GoogleReviewsData | null; error: string | null };

let cache: CacheState = { status: 'idle' };

export function useGoogleReviews(): {
  data: GoogleReviewsData | null;
  loading: boolean;
  error: string | null;
} {
  const [state, setState] = useState<{
    data: GoogleReviewsData | null;
    loading: boolean;
    error: string | null;
  }>(() => {
    if (cache.status === 'loaded') {
      return { data: cache.data, loading: false, error: cache.error };
    }
    if (cache.status === 'loading') {
      return { data: null, loading: true, error: null };
    }
    return { data: null, loading: true, error: null };
  });

  useEffect(() => {
    let cancelled = false;

    if (cache.status === 'loaded') {
      setState({ data: cache.data, loading: false, error: cache.error });
      return;
    }

    if (cache.status === 'idle') {
      const promise = supabase.functions
        .invoke<GoogleReviewsData>('google-reviews', { method: 'GET' })
        .then(({ data, error }) => {
          if (error) throw error;
          return data ?? null;
        })
        .catch((err: any) => {
          console.error('Failed to load Google reviews', err);
          return null;
        });

      cache = { status: 'loading', promise };
    }

    cache.promise
      .then((data) => {
        if (cancelled) return;
        cache = { status: 'loaded', data, error: null };
        setState({ data, loading: false, error: null });
      })
      .catch((err: any) => {
        if (cancelled) return;
        const message = err?.message ?? 'Failed to load reviews';
        cache = { status: 'loaded', data: null, error: message };
        setState({ data: null, loading: false, error: message });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
