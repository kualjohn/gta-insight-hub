import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";

const PLACE_ID = "ChIJnUQ_IwJ8BE4RjYxwrqc6azw";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("GOOGLE_PLACES_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Missing API key" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Use the new Places API (v1)
    const url = `https://places.googleapis.com/v1/places/${PLACE_ID}?languageCode=en`;
    const res = await fetch(url, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask":
          "id,displayName,rating,userRatingCount,googleMapsUri,reviews",
      },
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Google Places API error:", res.status, text);
      return new Response(
        JSON.stringify({ error: "Failed to fetch reviews", details: text }),
        {
          status: res.status,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const data = await res.json();

    const reviews = (data.reviews ?? []).map((r: any) => ({
      author: r.authorAttribution?.displayName ?? "Google User",
      authorPhoto: r.authorAttribution?.photoUri ?? null,
      authorUrl: r.authorAttribution?.uri ?? null,
      rating: r.rating ?? 5,
      text: r.text?.text ?? r.originalText?.text ?? "",
      relativeTime: r.relativePublishTimeDescription ?? "",
      publishTime: r.publishTime ?? null,
    }));

    return new Response(
      JSON.stringify({
        name: data.displayName?.text ?? "",
        rating: data.rating ?? null,
        totalReviews: data.userRatingCount ?? 0,
        mapsUrl: data.googleMapsUri ?? `https://search.google.com/local/reviews?placeid=${PLACE_ID}`,
        reviews,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (err) {
    console.error("google-reviews error:", err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});