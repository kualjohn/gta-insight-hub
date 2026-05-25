import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

const CHANNEL_ID = "UCNiL5jVJ7uM89e2S69FrUxQ";
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

const SYSTEM_PROMPT = `You are an expert real estate content writer for Fawad Nissari, a GTA real estate agent based in Milton, Ontario. Your job is to convert YouTube video transcripts into rich, SEO-optimized blog posts.

Format every blog post with:
- An SEO-optimized H1 title (not the exact video title — rewrite it for search intent)
- A compelling meta description (150-160 characters)
- An introduction paragraph that hooks the reader
- Multiple H2 and H3 subheadings breaking up the content
- Natural keyword integration throughout (do not keyword stuff)
- A conclusion with a clear call to action directing readers to book a call at https://calendly.com/fawadnissari/30min
- A suggested focus keyword for SEO
- A suggested category (one of: Market Updates, Buying, Selling, Investing, Home Values, Neighbourhoods)

Write in a conversational, direct tone. The agent's name is Fawad. Content covers GTA real estate market updates, buying, selling, and home values in Milton, Mississauga, and Brampton. Never sound like AI-generated content. Write like a knowledgeable local real estate expert talking directly to homeowners and buyers.

Return STRICTLY valid JSON (no markdown fences) with this shape:
{
  "blog_title": "string",
  "meta_description": "string (150-160 chars)",
  "focus_keyword": "string",
  "category": "string",
  "content_html": "string — full blog post body as semantic HTML using <h2>, <h3>, <p>, <ul>, <li>, <strong>, <a>. Do NOT include <h1> (the title is rendered separately). Do NOT include <html>, <head>, or <body> tags."
}`;

function getSupabase() {
  return createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );
}

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80);
}

interface VideoMeta {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnail: string;
  tags: string[];
}

function decodeXmlEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

interface RssEntry {
  id: string;
  title: string;
  description: string;
  published: string;
  thumbnail: string;
}

async function fetchRecentVideos(limit = 15): Promise<RssEntry[]> {
  const res = await fetch(RSS_URL);
  const xml = await res.text();
  const entries = xml.split("<entry>").slice(1);
  return entries.slice(0, limit).map((e) => {
    const id = e.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1] || "";
    const title = decodeXmlEntities((e.match(/<title>([\s\S]*?)<\/title>/)?.[1] || "").trim());
    const published = e.match(/<published>([^<]+)<\/published>/)?.[1] || "";
    const description = decodeXmlEntities(
      (e.match(/<media:description>([\s\S]*?)<\/media:description>/)?.[1] || "").trim()
    );
    const thumbnail = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
    return { id, title, description, published, thumbnail };
  }).filter((v) => v.id);
}

async function fetchVideoMetadata(videoId: string): Promise<VideoMeta | null> {
  // Primary: YouTube Data API if key present
  const apiKey = Deno.env.get("YOUTUBE_API_KEY");
  if (apiKey) {
    try {
      const r = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=${apiKey}`);
      const j = await r.json();
      const snip = j.items?.[0]?.snippet;
      if (snip && snip.title) {
        return {
          id: videoId,
          title: snip.title,
          description: snip.description || "",
          publishedAt: snip.publishedAt,
          thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
          tags: snip.tags || [],
        };
      }
    } catch (e) {
      console.error("YouTube API meta error", e);
    }
  }
  // Fallback: RSS feed (always has the real title + media:description)
  const entries = await fetchRecentVideos(50);
  const match = entries.find((e) => e.id === videoId);
  if (match && match.title) {
    return {
      id: videoId,
      title: match.title,
      description: match.description,
      publishedAt: match.published,
      thumbnail: match.thumbnail,
      tags: [],
    };
  }
  return null;
}

/**
 * Fetch transcript via the free unofficial youtube-transcript.com endpoint.
 * Returns { text, source } where source describes which method succeeded.
 */
async function fetchTranscript(videoId: string): Promise<{ text: string; source: string }> {
  try {
    const r = await fetch(
      `https://www.youtube-transcript.com/api/transcript?video_id=${videoId}`,
      { headers: { "User-Agent": "Mozilla/5.0", Accept: "application/json" } }
    );
    if (!r.ok) {
      console.warn(`youtube-transcript.com returned ${r.status} for ${videoId}`);
      return { text: "", source: "fallback_metadata" };
    }
    const j = await r.json();
    // Endpoint typically returns an array of { text, start, dur } or { transcript: [...] }
    const segments: any[] = Array.isArray(j) ? j : (j.transcript || j.data || []);
    if (!Array.isArray(segments) || segments.length === 0) {
      return { text: "", source: "fallback_metadata" };
    }
    const text = segments
      .map((s) => (typeof s === "string" ? s : s.text || ""))
      .filter(Boolean)
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
    if (!text) return { text: "", source: "fallback_metadata" };
    return { text, source: "youtube-transcript.com" };
  } catch (e) {
    console.error("fetchTranscript error", e);
    return { text: "", source: "fallback_metadata" };
  }
}

async function generateBlogWithClaude(meta: VideoMeta, transcript: string) {
  const apiKey = Deno.env.get("LOVABLE_API_KEY");
  if (!apiKey) throw new Error("LOVABLE_API_KEY missing");

  const userContent = `Video title: ${meta.title}
Published: ${meta.publishedAt}
Tags: ${meta.tags.join(", ") || "(none)"}

Video description:
${meta.description || "(no description)"}

${transcript ? `Transcript:\n${transcript}` : "Note: No transcript available. Use the description and title to write the blog post, expanding with your real estate expertise."}`;

  const r = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userContent },
      ],
      response_format: { type: "json_object" },
    }),
  });
  if (!r.ok) {
    const t = await r.text();
    throw new Error(`Lovable AI ${r.status}: ${t}`);
  }
  const j = await r.json();
  const text = j.choices?.[0]?.message?.content || "";
  // Strip code fences if any
  const cleaned = text.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/i, "").trim();
  const parsed = JSON.parse(cleaned);
  return parsed as {
    blog_title: string;
    meta_description: string;
    focus_keyword: string;
    category: string;
    content_html: string;
  };
}

async function processVideo(supabase: any, video: { id: string; title?: string; published?: string }) {
  // Skip if already exists
  const { data: existing } = await supabase
    .from("youtube_blog_posts")
    .select("id")
    .eq("youtube_video_id", video.id)
    .maybeSingle();
  if (existing) return { id: video.id, skipped: true };

  const meta = await fetchVideoMetadata(video.id);
  if (!meta || !meta.title) throw new Error("Could not fetch video metadata (missing title)");

  const { text: transcript, source: transcriptSource } = await fetchTranscript(video.id);
  console.log(`Video ${video.id}: transcript source = ${transcriptSource} (${transcript.length} chars)`);
  console.log(`Video ${video.id}: title="${meta.title}" desc=${meta.description.length} chars`);
  const ai = await generateBlogWithClaude(meta, transcript);

  const { data, error } = await supabase
    .from("youtube_blog_posts")
    .insert({
      youtube_video_id: video.id,
      youtube_title: meta.title,
      youtube_description: meta.description,
      youtube_published_at: meta.publishedAt || video.published,
      blog_title: ai.blog_title,
      content: ai.content_html,
      meta_description: ai.meta_description,
      focus_keyword: ai.focus_keyword,
      category: ai.category,
      thumbnail_url: meta.thumbnail,
      tags: meta.tags,
      transcript_source: transcriptSource,
      status: "draft",
    })
    .select()
    .single();
  if (error) throw error;
  return { id: video.id, draftId: data.id, created: true, transcriptSource };
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabase = getSupabase();
    let body: any = {};
    try { body = await req.json(); } catch (_) {}
    const targetVideoId: string | undefined = body.videoId;
    const force: boolean = !!body.force; // regenerate even if exists

    const results: any[] = [];

    if (targetVideoId) {
      // Single video processing (used by regenerate)
      if (force) {
        await supabase.from("youtube_blog_posts").delete().eq("youtube_video_id", targetVideoId);
      }
      const meta = await fetchVideoMetadata(targetVideoId);
      if (!meta) throw new Error("Could not fetch video metadata");
      try {
        const res = await processVideo(supabase, {
          id: targetVideoId,
          title: meta.title,
          published: meta.publishedAt,
        });
        results.push(res);
      } catch (e: any) {
        results.push({ id: targetVideoId, error: e.message });
      }
    } else {
      // Poll RSS for new videos
      const videos = await fetchRecentVideos(15);
      for (const v of videos) {
        try {
          const res = await processVideo(supabase, v);
          results.push(res);
        } catch (e: any) {
          console.error(`Failed video ${v.id}`, e);
          results.push({ id: v.id, error: e.message });
        }
      }
    }

    return new Response(JSON.stringify({ success: true, results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e: any) {
    console.error("youtube-blog-sync error", e);
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});