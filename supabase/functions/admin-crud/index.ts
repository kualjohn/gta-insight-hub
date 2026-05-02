import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-admin-token, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
};

function getSupabaseAdmin() {
  const url = Deno.env.get("SUPABASE_URL")!;
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  return createClient(url, key);
}

const encoder = new TextEncoder();

function base64UrlEncode(value: Uint8Array): string {
  let binary = "";
  value.forEach((byte) => binary += String.fromCharCode(byte));
  return btoa(binary).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function base64UrlDecode(value: string): string {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  return atob(padded);
}

function timingSafeEqual(a: string, b: string): boolean {
  const left = encoder.encode(a);
  const right = encoder.encode(b);
  if (left.length !== right.length) return false;
  let result = 0;
  for (let i = 0; i < left.length; i++) result |= left[i] ^ right[i];
  return result === 0;
}

async function verifyAdmin(req: Request): Promise<boolean> {
  const token = req.headers.get("x-admin-token");
  const secret = Deno.env.get("ADMIN_PASSWORD");
  if (!token || !secret) return false;

  const [header, payload, signature] = token.split(".");
  if (!header || !payload || !signature) return false;

  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const expected = await crypto.subtle.sign("HMAC", key, encoder.encode(`${header}.${payload}`));
  if (!timingSafeEqual(signature, base64UrlEncode(new Uint8Array(expected)))) return false;

  try {
    const claims = JSON.parse(base64UrlDecode(payload));
    const now = Math.floor(Date.now() / 1000);
    return claims.sub === "admin" && claims.scope === "property-admin" && typeof claims.exp === "number" && claims.exp > now;
  } catch {
    return false;
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (!(await verifyAdmin(req))) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabase = getSupabaseAdmin();
  const url = new URL(req.url);
  const action = url.searchParams.get("action");

  try {
    // ---- Upload image ----
    if (req.method === "POST" && action === "upload") {
      const formData = await req.formData();
      const file = formData.get("file") as File;
      const folder = formData.get("folder") as string || "general";
      if (!file) throw new Error("No file provided");

      const ext = file.name.split(".").pop() || "jpg";
      const fileName = `${folder}/${crypto.randomUUID()}.${ext}`;

      const { data, error } = await supabase.storage
        .from("property-images")
        .upload(fileName, file, { contentType: file.type, upsert: false });
      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from("property-images")
        .getPublicUrl(data.path);

      return new Response(JSON.stringify({ url: urlData.publicUrl }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (req.method === "GET" && action === "list") {
      const { data, error } = await supabase.from("property_websites").select("*").order("sort_order", { ascending: true });
      if (error) throw error;
      return new Response(JSON.stringify(data), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (req.method === "GET" && action === "get") {
      const id = url.searchParams.get("id");
      const { data, error } = await supabase.from("property_websites").select("*").eq("id", id).single();
      if (error) throw error;
      return new Response(JSON.stringify(data), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (req.method === "POST" && action === "create") {
      const body = await req.json();
      const { data, error } = await supabase.from("property_websites").insert(body).select().single();
      if (error) throw error;
      return new Response(JSON.stringify(data), { status: 201, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (req.method === "PUT" && action === "update") {
      const id = url.searchParams.get("id");
      const body = await req.json();
      const { data, error } = await supabase.from("property_websites").update(body).eq("id", id).select().single();
      if (error) throw error;
      return new Response(JSON.stringify(data), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (req.method === "DELETE" && action === "delete") {
      const id = url.searchParams.get("id");
      const { error } = await supabase.from("property_websites").delete().eq("id", id);
      if (error) throw error;
      return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (req.method === "POST" && action === "check-slug") {
      const { slug, excludeId } = await req.json();
      let query = supabase.from("property_websites").select("id").eq("slug", slug);
      if (excludeId) query = query.neq("id", excludeId);
      const { data, error } = await query;
      if (error) throw error;
      return new Response(JSON.stringify({ exists: (data?.length || 0) > 0 }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    return new Response(JSON.stringify({ error: "Unknown action" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (error) {
    console.error("Admin CRUD error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
