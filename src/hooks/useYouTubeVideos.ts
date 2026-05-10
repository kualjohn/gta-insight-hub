import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface YouTubeVideo {
  videoId: string;
  title: string;
  link: string;
  published: string;
  thumbnail: string;
  channelName: string;
}

interface UseYouTubeVideosResult {
  videos: YouTubeVideo[];
  isLoading: boolean;
  error: string | null;
  channelUrl: string;
  refetch: () => void;
}

const CHANNEL_URL = 'https://www.youtube.com/@Fawadnissari';

export function useYouTubeVideos(limit?: number): UseYouTubeVideosResult {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVideos = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const params = limit ? `?limit=${limit}` : '';
      const { data, error: fnError } = await supabase.functions.invoke('youtube-feed', {
        body: null,
        method: 'GET',
      });

      // Handle the response properly - invoke returns the data directly
      if (fnError) {
        throw new Error(fnError.message || 'Failed to fetch videos');
      }

      if (data?.success && data?.videos) {
        const fetchedVideos = limit ? data.videos.slice(0, limit) : data.videos;
        setVideos(fetchedVideos);
      } else {
        throw new Error(data?.error || 'Failed to fetch videos');
      }
    } catch (err) {
      console.error('Error fetching YouTube videos:', err);
      setError(err instanceof Error ? err.message : 'Failed to load videos');
      setVideos([]);
    } finally {
      setIsLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  return {
    videos,
    isLoading,
    error,
    channelUrl: CHANNEL_URL,
    refetch: fetchVideos,
  };
}
