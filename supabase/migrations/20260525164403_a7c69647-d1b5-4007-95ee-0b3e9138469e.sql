-- Extensions for scheduled HTTP calls
create extension if not exists pg_cron with schema pg_catalog;
create extension if not exists pg_net with schema extensions;

-- Drafts table
create table if not exists public.youtube_blog_posts (
  id uuid primary key default gen_random_uuid(),
  youtube_video_id text not null unique,
  youtube_title text,
  youtube_description text,
  youtube_published_at timestamptz,
  blog_title text not null,
  content text not null,
  meta_description text,
  focus_keyword text,
  thumbnail_url text,
  tags text[] default '{}',
  category text,
  status text not null default 'draft',
  published_blog_post_id uuid,
  error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published_at timestamptz
);

alter table public.youtube_blog_posts enable row level security;

create policy "Public can read published drafts"
  on public.youtube_blog_posts
  for select
  using (status = 'published');

create or replace function public.update_updated_at_column()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

drop trigger if exists trg_ybp_updated on public.youtube_blog_posts;
create trigger trg_ybp_updated before update on public.youtube_blog_posts
for each row execute function public.update_updated_at_column();

-- Schedule sync every 6 hours
select cron.unschedule('youtube-blog-sync-6h') where exists (
  select 1 from cron.job where jobname = 'youtube-blog-sync-6h'
);

select cron.schedule(
  'youtube-blog-sync-6h',
  '0 */6 * * *',
  $$
  select net.http_post(
    url:='https://pwowsqscpvhlttltziod.supabase.co/functions/v1/youtube-blog-sync',
    headers:='{"Content-Type":"application/json","apikey":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3b3dzcXNjcHZobHR0bHR6aW9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkzNjMwMzEsImV4cCI6MjA4NDkzOTAzMX0.16LXohxAkrZeV2hQAvAI7jum_BnMPo5rHrPcDZnnNWA"}'::jsonb,
    body:='{"source":"cron"}'::jsonb
  );
  $$
);