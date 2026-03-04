import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const FUB_API_KEY = Deno.env.get("FUB_API_KEY");
    const FUB_X_SYSTEM = Deno.env.get("FUB_X_SYSTEM") || "FawadNissari.ca Portfolio";
    const FUB_SOURCE = Deno.env.get("FUB_SOURCE") || "Website - Portfolio";
    const FUB_ASSIGNED_TO_ID = Deno.env.get("FUB_ASSIGNED_TO_ID");

    if (!FUB_API_KEY) {
      console.error("FUB_API_KEY not configured");
      return new Response(JSON.stringify({ success: true, fallback: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { name, email, phone, message, propertyTitle, propertySlug, propertyStatus, propertyCity } = await req.json();

    if (!name || (!email && !phone)) {
      return new Response(JSON.stringify({ error: "Name and email or phone required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const nameParts = name.trim().split(/\s+/);
    const firstName = nameParts.length > 1 ? nameParts.slice(0, -1).join(" ") : "";
    const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : nameParts[0];

    const personPayload: Record<string, any> = {
      source: FUB_SOURCE,
      system: FUB_X_SYSTEM,
      firstName: firstName || undefined,
      lastName,
      tags: ["Portfolio Lead", `Property: ${propertySlug || "unknown"}`, propertyStatus ? `Status: ${propertyStatus}` : null, propertyCity ? `City: ${propertyCity}` : null].filter(Boolean),
    };

    if (email) personPayload.emails = [{ value: email }];
    if (phone) personPayload.phones = [{ value: phone }];
    if (FUB_ASSIGNED_TO_ID) personPayload.assignedTo = parseInt(FUB_ASSIGNED_TO_ID);

    const authHeader = "Basic " + btoa(FUB_API_KEY + ":");

    const personRes = await fetch("https://api.followupboss.com/v1/events", {
      method: "POST",
      headers: { "Authorization": authHeader, "Content-Type": "application/json", "X-System": FUB_X_SYSTEM, "X-System-Key": FUB_API_KEY },
      body: JSON.stringify({
        source: FUB_SOURCE, system: FUB_X_SYSTEM, type: "General Inquiry",
        person: personPayload, message: message || "",
        description: `Property inquiry for ${propertyTitle || "Unknown"}\n\nProperty: ${propertyTitle}\nURL: https://fawadnissari.ca/portfolio/${propertySlug}\nMessage: ${message || "No message"}\nTimestamp: ${new Date().toISOString()}`,
        property: propertyTitle ? { street: propertyTitle, city: propertyCity || "" } : undefined,
      }),
    });

    if (!personRes.ok) {
      const errorBody = await personRes.text();
      console.error(`FUB API error [${personRes.status}]:`, errorBody);
      return new Response(JSON.stringify({ success: true, fallback: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    await personRes.text();
    return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (error) {
    console.error("FUB lead error:", error);
    return new Response(JSON.stringify({ success: true, fallback: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
