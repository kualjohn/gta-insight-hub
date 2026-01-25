const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface YouTubeVideo {
  videoId: string;
  title: string;
  link: string;
  published: string;
  thumbnail: string;
  channelName: string;
}

// Simple in-memory cache
let cachedData: { videos: YouTubeVideo[]; timestamp: number } | null = null;
const CACHE_DURATION_MS = 15 * 60 * 1000; // 15 minutes

const CHANNEL_ID = 'UCNiL5jVJ7uM89e2S69FrUxQ';
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
const CHANNEL_URL = `https://www.youtube.com/channel/${CHANNEL_ID}`;

async function fetchAndParseRSS(): Promise<YouTubeVideo[]> {
  console.log('Fetching YouTube RSS feed...');
  
  const response = await fetch(RSS_URL, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; RSS Reader)',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch RSS feed: ${response.status}`);
  }

  const xmlText = await response.text();
  console.log('RSS feed fetched, parsing...');

  // Parse XML manually (Deno doesn't have DOMParser in edge functions)
  const videos: YouTubeVideo[] = [];

  // Extract channel name
  const channelNameMatch = xmlText.match(/<name>([^<]+)<\/name>/);
  const channelName = channelNameMatch ? channelNameMatch[1] : 'Fawad';

  // Extract all entries
  const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
  let entryMatch;

  while ((entryMatch = entryRegex.exec(xmlText)) !== null) {
    const entry = entryMatch[1];

    // Extract video ID
    const videoIdMatch = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
    const videoId = videoIdMatch ? videoIdMatch[1] : '';

    // Extract title
    const titleMatch = entry.match(/<title>([^<]+)<\/title>/);
    const title = titleMatch ? titleMatch[1] : '';

    // Extract link
    const linkMatch = entry.match(/<link[^>]*href="([^"]+)"/);
    const link = linkMatch ? linkMatch[1] : `https://www.youtube.com/watch?v=${videoId}`;

    // Extract published date
    const publishedMatch = entry.match(/<published>([^<]+)<\/published>/);
    const published = publishedMatch ? publishedMatch[1] : '';

    // Generate thumbnail URL - try maxresdefault first, fallback to hqdefault
    const thumbnail = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;

    if (videoId && title) {
      videos.push({
        videoId,
        title: decodeHTMLEntities(title),
        link,
        published,
        thumbnail,
        channelName,
      });
    }
  }

  console.log(`Parsed ${videos.length} videos from RSS feed`);
  return videos;
}

function decodeHTMLEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const limitParam = url.searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam, 10) : undefined;
    const forceRefresh = url.searchParams.get('refresh') === 'true';

    // Check cache
    const now = Date.now();
    if (!forceRefresh && cachedData && (now - cachedData.timestamp) < CACHE_DURATION_MS) {
      console.log('Returning cached data');
      const videos = limit ? cachedData.videos.slice(0, limit) : cachedData.videos;
      return new Response(
        JSON.stringify({
          success: true,
          videos,
          cached: true,
          channelUrl: CHANNEL_URL,
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Fetch fresh data
    const videos = await fetchAndParseRSS();

    // Sort by published date (newest first)
    videos.sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime());

    // Update cache
    cachedData = { videos, timestamp: now };

    const resultVideos = limit ? videos.slice(0, limit) : videos;

    return new Response(
      JSON.stringify({
        success: true,
        videos: resultVideos,
        cached: false,
        channelUrl: CHANNEL_URL,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error fetching YouTube feed:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch YouTube feed',
        channelUrl: CHANNEL_URL,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
