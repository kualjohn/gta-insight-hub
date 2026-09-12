import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  published_at: string | null;
  category: string | null;
  featured_image: string | null;
  excerpt: string | null;
  content_html: string | null;
  content_markdown: string | null;
  source_url: string;
  imported_at: string;
  created_at: string;
}

const POSTS_PER_PAGE = 9;

export function useBlogPosts(page: number = 1) {
  return useQuery({
    queryKey: ["blog-posts", page],
    queryFn: async () => {
      // Get total count
      const { count } = await supabase
        .from("blog_posts")
        .select("*", { count: "exact", head: true });

      const totalCount = count || 0;
      const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);
      const offset = (page - 1) * POSTS_PER_PAGE;

      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("published_at", { ascending: false, nullsFirst: false })
        .range(offset, offset + POSTS_PER_PAGE - 1);

      if (error) throw error;

      return {
        posts: (data || []) as BlogPost[],
        totalCount,
        totalPages,
        currentPage: page,
      };
    },
  });
}

export function useBlogPost(slug: string) {
  return useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (error) throw error;
      return data as BlogPost | null;
    },
    enabled: !!slug,
  });
}
